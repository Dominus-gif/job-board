/**
 * Go to the source for every listing: is this role still open, is it the role
 * we say it is, and what does the employer actually say about it?
 *
 * Why this exists: 68% of the board carried under 50 words of description,
 * because the imports captured a ~200-character excerpt and nothing more. No
 * cap change recovers that — the text was never there. The only fix is to ask
 * the employer's own board, which is what this does.
 *
 * It works BOARD-first, not listing-first. 6,897 of our 9,824 listings live on
 * five ATS platforms, and those platforms publish the whole board as JSON. So
 * 759 requests cover 70% of the site, instead of 6,897 — and each one answers
 * three questions at once:
 *
 *   1. Is our listing still on that board?      absent -> the role is gone
 *   2. Is it the role our page claims?          title mismatch -> we are wrong
 *   3. What is the full description?            -> replaces the excerpt
 *
 * and hands back a fourth for free: every role on the board we do NOT have.
 *
 * Safety rules, in order of how much damage getting them wrong does:
 *
 *   1. A listing is only retired on a definitive board response that does not
 *      contain it. A network error, a 403, a 5xx or an adapter that cannot
 *      parse the response is never a verdict — those are us failing, not the
 *      job ending.
 *   2. A circuit breaker on the share of boards that answered. Below the floor
 *      nothing is written at all, because a run that cannot reach the internet
 *      would otherwise "discover" that the entire board is dead.
 *   3. Title matching is deliberately loose. Employers re-title roles, and a
 *      re-title is not a wrong listing; only a title with almost nothing in
 *      common counts as a mismatch.
 *
 * Usage: npx tsx scripts/verify-and-enrich.ts [--boards 200] [--dry]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const OUT_CONTENT = join(process.cwd(), "src", "lib", "generated", "job-content.json");
const OUT_VERDICTS = join(process.cwd(), "src", "lib", "generated", "job-verdicts.json");
const RETIRED_PATH = join(process.cwd(), "src", "lib", "generated", "retired-jobs.json");

const CONCURRENCY = Number(process.env.ENRICH_CONCURRENCY) || 6;
const PER_HOST_GAP_MS = 350;
const TIMEOUT_MS = 20_000;
/** Below this share of boards answering, the run is us being blocked. */
const MIN_BOARD_SUCCESS = 0.5;
/** Stored description ceiling. The bundle inlines this; see build-curated.ts. */
const STORE_CHARS = 4000;

const UA = "getremotejobsnow-ingest/1.0 (+https://getremotejobsnow.com)";

type Platform = "ashby" | "greenhouse" | "lever" | "smartrecruiters" | "workable";

interface BoardJob {
  /** The id as it appears in an apply URL for this platform. */
  id: string;
  title: string;
  descriptionHtml: string;
  location?: string;
  applyUrl?: string;
}

export interface ContentRecord {
  title: string;
  html: string;
  chars: number;
  at: string;
}

const plain = (h: string) =>
  String(h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

/* ------------------------------------------------------------------ */
/* Board addressing                                                    */
/* ------------------------------------------------------------------ */

interface Addr {
  platform: Platform;
  org: string;
  /** The posting id inside that board, taken from the apply URL. */
  id: string;
}

export function addressOf(applyUrl: string): Addr | null {
  let u: URL;
  try {
    u = new URL(applyUrl);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^www\./, "");
  const seg = u.pathname.split("/").filter(Boolean);
  if (host === "jobs.ashbyhq.com" && seg[1]) return { platform: "ashby", org: seg[0], id: seg[1] };
  if (host.endsWith("greenhouse.io") && seg[0]) {
    // /<board>/jobs/<id>  or  /embed/job_app?for=<board>&token=<id>
    const id = seg[2] ?? u.searchParams.get("gh_jid") ?? "";
    return id ? { platform: "greenhouse", org: seg[0], id } : null;
  }
  if (host === "jobs.lever.co" && seg[1]) return { platform: "lever", org: seg[0], id: seg[1] };
  if (host === "jobs.smartrecruiters.com" && seg[1]) return { platform: "smartrecruiters", org: seg[0], id: seg[1] };
  if (host === "apply.workable.com" && seg[2]) return { platform: "workable", org: seg[0], id: seg[2] };
  return null;
}

/* ------------------------------------------------------------------ */
/* Fetching                                                            */
/* ------------------------------------------------------------------ */

const lastHitAt = new Map<string, number>();
async function politeDelay(host: string) {
  const last = lastHitAt.get(host) ?? 0;
  const wait = last + PER_HOST_GAP_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHitAt.set(host, Date.now());
}

async function getJson(url: string): Promise<{ status: number; data: unknown }> {
  const host = new URL(url).hostname;
  await politeDelay(host);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: "application/json" },
      signal: ctrl.signal,
      redirect: "follow",
    });
    if (!res.ok) return { status: res.status, data: null };
    return { status: res.status, data: await res.json() };
  } catch {
    return { status: 0, data: null };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Every open role on one board.
 *
 * Returns null when the board could not be read — distinct from an empty array,
 * which means the board answered and has no open roles. Only the empty-array
 * case may retire anything.
 */
async function fetchBoard(platform: Platform, org: string): Promise<BoardJob[] | null> {
  const enc = encodeURIComponent(org);
  if (platform === "ashby") {
    const { status, data } = await getJson(`https://api.ashbyhq.com/posting-api/job-board/${enc}?includeCompensation=true`);
    if (status !== 200 || !data) return null;
    const jobs = (data as { jobs?: unknown[] }).jobs;
    if (!Array.isArray(jobs)) return null;
    return jobs.map((j) => {
      const x = j as Record<string, unknown>;
      return {
        id: String(x.id ?? ""),
        title: String(x.title ?? ""),
        descriptionHtml: String(x.descriptionHtml ?? x.descriptionPlain ?? ""),
        location: String(x.location ?? ""),
        applyUrl: String(x.applyUrl ?? x.jobUrl ?? ""),
      };
    });
  }

  if (platform === "greenhouse") {
    // `content=true` returns the full description with the board listing, so
    // one request covers every role instead of one request per role.
    const { status, data } = await getJson(`https://boards-api.greenhouse.io/v1/boards/${enc}/jobs?content=true`);
    if (status !== 200 || !data) return null;
    const jobs = (data as { jobs?: unknown[] }).jobs;
    if (!Array.isArray(jobs)) return null;
    return jobs.map((j) => {
      const x = j as Record<string, unknown>;
      return {
        id: String(x.id ?? ""),
        title: String(x.title ?? ""),
        descriptionHtml: String(x.content ?? ""),
        location: String((x.location as { name?: string })?.name ?? ""),
        applyUrl: String(x.absolute_url ?? ""),
      };
    });
  }

  if (platform === "lever") {
    const { status, data } = await getJson(`https://api.lever.co/v0/postings/${enc}?mode=json`);
    if (status !== 200 || !Array.isArray(data)) return null;
    return (data as unknown[]).map((j) => {
      const x = j as Record<string, unknown>;
      const lists = Array.isArray(x.lists) ? (x.lists as Record<string, unknown>[]) : [];
      const body =
        String(x.description ?? "") +
        lists.map((l) => `<h3>${String(l.text ?? "")}</h3>${String(l.content ?? "")}`).join("") +
        String(x.additional ?? "");
      return {
        id: String(x.id ?? ""),
        title: String(x.text ?? ""),
        descriptionHtml: body,
        location: String((x.categories as { location?: string })?.location ?? ""),
        applyUrl: String(x.hostedUrl ?? x.applyUrl ?? ""),
      };
    });
  }

  if (platform === "smartrecruiters") {
    const { status, data } = await getJson(`https://api.smartrecruiters.com/v1/companies/${enc}/postings?limit=100`);
    if (status !== 200 || !data) return null;
    const content = (data as { content?: unknown[] }).content;
    if (!Array.isArray(content)) return null;
    // The list endpoint has no description; fetch each posting's ad.
    const out: BoardJob[] = [];
    for (const j of content as Record<string, unknown>[]) {
      const id = String(j.id ?? "");
      const detail = await getJson(`https://api.smartrecruiters.com/v1/companies/${enc}/postings/${id}`);
      const sections = ((detail.data as Record<string, unknown>)?.jobAd as Record<string, unknown>)?.sections as
        | Record<string, { title?: string; text?: string }>
        | undefined;
      const body = sections
        ? Object.values(sections)
            .map((s) => (s?.title ? `<h3>${s.title}</h3>` : "") + String(s?.text ?? ""))
            .join("")
        : "";
      out.push({
        id,
        title: String(j.name ?? ""),
        descriptionHtml: body,
        location: String((j.location as { city?: string })?.city ?? ""),
      });
    }
    return out;
  }

  // Workable
  const { status, data } = await getJson(`https://apply.workable.com/api/v1/widget/accounts/${enc}?details=true`);
  if (status !== 200 || !data) return null;
  const jobs = (data as { jobs?: unknown[] }).jobs;
  if (!Array.isArray(jobs)) return null;
  return jobs.map((j) => {
    const x = j as Record<string, unknown>;
    return {
      id: String(x.shortcode ?? ""),
      title: String(x.title ?? ""),
      descriptionHtml: [x.description, x.requirements, x.benefits].map((v) => String(v ?? "")).join(""),
      location: String(x.location ?? ""),
      applyUrl: String(x.url ?? x.application_url ?? ""),
    };
  });
}

/* ------------------------------------------------------------------ */
/* Title matching                                                      */
/* ------------------------------------------------------------------ */

const STOP = new Set(["the", "and", "for", "of", "a", "an", "to", "in", "at", "remote", "m", "f", "d", "w"]);
const words = (s: string) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((t) => t.length > 1 && !STOP.has(t))
  );

/**
 * Is the board's title the same role as ours?
 *
 * Loose on purpose. Employers rewrite titles — "Senior Engineer" becomes
 * "Senior Software Engineer (Platform)" — and that is the same job, not a wrong
 * listing. A mismatch means the two titles share almost nothing, which is what
 * happens when an import paired a role with the wrong row.
 */
export function titlesMatch(ours: string, theirs: string): boolean {
  const a = words(ours);
  const b = words(theirs);
  if (a.size === 0 || b.size === 0) return true; // nothing to judge on — don't act
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  return shared / Math.min(a.size, b.size) >= 0.4;
}

/* ------------------------------------------------------------------ */

function loadJson<T>(path: string, fallback: T): T {
  try {
    return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(path: string, value: unknown) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(value));
}

async function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry");
  const boardBudget = Number(argv[argv.indexOf("--boards") + 1]) || Infinity;

  const { getSearchableJobs } = await import("../src/lib/db");
  const jobs = await getSearchableJobs();

  // Group our listings by the board they live on.
  const byBoard = new Map<string, { platform: Platform; org: string; rows: { url: string; title: string }[] }>();
  let addressable = 0;
  for (const j of jobs) {
    const addr = addressOf(j.apply_url);
    if (!addr) continue;
    addressable++;
    const key = `${addr.platform}:${addr.org}`;
    const entry = byBoard.get(key) ?? { platform: addr.platform, org: addr.org, rows: [] };
    entry.rows.push({ url: j.apply_url, title: j.title });
    byBoard.set(key, entry);
  }

  const boards = [...byBoard.values()].slice(0, boardBudget);
  console.log(
    `[enrich] ${jobs.length} listings, ${addressable} on ATS boards, ${byBoard.size} boards total, checking ${boards.length}`
  );

  const content = loadJson<Record<string, ContentRecord>>(OUT_CONTENT, {});
  const verdicts: Record<string, "verified" | "gone" | "mismatch"> = {};
  const discovered: { platform: string; org: string; title: string; url: string; chars: number }[] = [];
  let boardsOk = 0;
  let boardsFailed = 0;
  let enriched = 0;
  let gone = 0;
  let mismatched = 0;

  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < boards.length) {
        const board = boards[cursor++];
        const list = await fetchBoard(board.platform, board.org);
        if (list === null) {
          boardsFailed++;
          continue;
        }
        boardsOk++;
        const byId = new Map(list.map((b) => [b.id, b]));

        for (const row of board.rows) {
          const addr = addressOf(row.url)!;
          const hit = byId.get(addr.id);
          if (!hit) {
            // The board answered and this posting is not on it.
            verdicts[row.url] = "gone";
            gone++;
            continue;
          }
          if (!titlesMatch(row.title, hit.title)) {
            verdicts[row.url] = "mismatch";
            mismatched++;
            continue;
          }
          verdicts[row.url] = "verified";
          const text = plain(hit.descriptionHtml);
          if (text.length > 200) {
            content[row.url] = {
              title: hit.title,
              html: hit.descriptionHtml.slice(0, STORE_CHARS * 3),
              chars: text.length,
              at: new Date().toISOString(),
            };
            enriched++;
          }
        }

        // Roles on this board we do not carry.
        const ours = new Set(board.rows.map((r) => addressOf(r.url)!.id));
        for (const b of list) {
          if (ours.has(b.id)) continue;
          discovered.push({
            platform: board.platform,
            org: board.org,
            title: b.title,
            url: b.applyUrl || "",
            chars: plain(b.descriptionHtml).length,
          });
        }

        const done = boardsOk + boardsFailed;
        if (done % 25 === 0) console.log(`[enrich]   ${done}/${boards.length} boards`);
      }
    })
  );

  const reach = boardsOk / Math.max(boardsOk + boardsFailed, 1);
  console.log(
    `[enrich] boards answered ${boardsOk}, failed ${boardsFailed} (${(reach * 100).toFixed(1)}% reachable)`
  );
  console.log(`[enrich] verified ${Object.values(verdicts).filter((v) => v === "verified").length}, gone ${gone}, title mismatch ${mismatched}`);
  console.log(`[enrich] full descriptions captured for ${enriched} listings`);
  console.log(`[enrich] roles on those boards we do not carry: ${discovered.length}`);

  if (reach < MIN_BOARD_SUCCESS) {
    console.error(
      `[enrich] ABORT: only ${(reach * 100).toFixed(1)}% of boards answered (floor ${MIN_BOARD_SUCCESS * 100}%). ` +
        `Writing nothing — a run that cannot reach the boards would read as every job being gone.`
    );
    process.exit(0);
  }

  const lens = Object.values(content).map((c) => c.chars).sort((a, b) => a - b);
  if (lens.length) {
    const p = (x: number) => lens[Math.floor(lens.length * x)];
    console.log(`[enrich] captured description chars: p25=${p(0.25)} p50=${p(0.5)} p75=${p(0.75)} max=${lens[lens.length - 1]}`);
  }

  if (dry) {
    console.log("[enrich] --dry: nothing written");
    return;
  }

  writeJson(OUT_CONTENT, content);
  writeJson(OUT_VERDICTS, verdicts);

  // Fold gone + mismatch into the retirement list the store already reads.
  const retired = new Set(loadJson<string[]>(RETIRED_PATH, []));
  const before = retired.size;
  for (const [url, v] of Object.entries(verdicts)) if (v === "gone" || v === "mismatch") retired.add(url);
  writeJson(RETIRED_PATH, [...retired]);

  console.log(`[enrich] wrote ${Object.keys(content).length} content records`);
  console.log(`[enrich] retired list ${before} -> ${retired.size}`);
  writeJson(join(process.cwd(), "src", "lib", "generated", "discovered-roles.json"), discovered.slice(0, 4000));
  console.log(`[enrich] wrote ${Math.min(discovered.length, 4000)} discovered roles for review`);
}

main();
