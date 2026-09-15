/**
 * Capture descriptions for the listings the ATS board sweep cannot reach.
 *
 * verify-and-enrich.ts covers the 63% of the board that sits on five ATS
 * platforms with public board APIs. The rest — 2,971 listings across 1,565
 * hosts — has no such shortcut, and a per-host adapter for 1,565 hosts is not a
 * thing anyone should build.
 *
 * So this tries three general routes, cheapest first, and records honestly
 * which listings none of them reach:
 *
 *   1. A Greenhouse job wearing a custom hostname. `?gh_jid=` in the URL says
 *      the posting is Greenhouse's; the board slug is either in the path or
 *      guessable from the company. A guess is only accepted when that board
 *      actually contains that job id, so a wrong guess cannot attach the wrong
 *      description to a listing.
 *   2. JobPosting JSON-LD embedded in the page. Job sites publish it for Google
 *      for Jobs, so where it exists it is both authoritative and complete.
 *   3. Rippling's public board API, which covers one of the larger hosts.
 *
 * What none of them reach is a JS-rendered applicant-tracking SPA — iCIMS,
 * Workday, careerpuck and friends — where the description arrives from an
 * internal XHR after page load. Reading those needs a headless browser per
 * host, and at 1,500 hosts that is a scraping operation, not a feature. Those
 * listings are reported rather than guessed at, and validate-descriptions.ts
 * decides what happens to them.
 *
 * Usage: npx tsx scripts/enrich-generic.ts [--budget 3000] [--dry]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { setMaxListeners } from "node:events";

// Each in-flight fetch attaches an abort listener; at this concurrency Node's
// default ceiling of 10 warns on every request.
setMaxListeners(64);

/**
 * Generic captures go in their own file rather than into job-content.json.
 *
 * Two reasons. Checkpointing: this run takes about forty minutes and the first
 * attempt died at 2,000 of 2,969 having written nothing, so it now saves as it
 * goes — and saving a 41 MB file every couple of hundred listings is not a
 * thing to do. Resumability: a re-run skips what either file already has.
 */
const GENERIC_PATH = join(process.cwd(), "src", "lib", "generated", "job-content-generic.json");
const CONTENT_PATH = join(process.cwd(), "src", "lib", "generated", "job-content.json");
/** Save every this many listings, so a crash costs minutes not the whole run. */
const CHECKPOINT_EVERY = 150;
const REPORT_PATH = join(process.cwd(), "src", "lib", "generated", "unreachable-descriptions.json");

const CONCURRENCY = Number(process.env.GENERIC_CONCURRENCY) || 8;
const PER_HOST_GAP_MS = 500;
const TIMEOUT_MS = 15_000;
const MIN_USABLE = 600; // characters of plain text

const UA = "Mozilla/5.0 (compatible; getremotejobsnow/1.0; +https://getremotejobsnow.com)";

interface ContentRecord {
  title: string;
  html: string;
  chars: number;
  at: string;
}

function decode(s: string): string {
  return String(s || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;|&apos;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
const plain = (h: string) => decode(decode(h)).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const lastHitAt = new Map<string, number>();
async function politeDelay(host: string) {
  const last = lastHitAt.get(host) ?? 0;
  const wait = last + PER_HOST_GAP_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHitAt.set(host, Date.now());
}

async function get(url: string, json: boolean): Promise<{ status: number; body: string | null }> {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return { status: 0, body: null };
  }
  await politeDelay(host);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { "user-agent": UA, accept: json ? "application/json" : "text/html,application/xhtml+xml" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    if (!res.ok) return { status: res.status, body: null };
    return { status: res.status, body: await res.text() };
  } catch {
    return { status: 0, body: null };
  } finally {
    clearTimeout(timer);
  }
}

/* -- 1. Greenhouse behind a custom hostname ------------------------------ */

/** Board slugs worth trying for a gh_jid URL, most reliable first. */
function greenhouseCandidates(applyUrl: string, companySlug: string, companyName: string): string[] {
  const out: string[] = [];
  try {
    const u = new URL(applyUrl);
    const forParam = u.searchParams.get("for");
    if (forParam) out.push(forParam);
    // app.careerpuck.com/job-board/<board>/job/<id>
    const seg = u.pathname.split("/").filter(Boolean);
    const boardIdx = seg.indexOf("job-board");
    if (boardIdx >= 0 && seg[boardIdx + 1]) out.push(seg[boardIdx + 1]);
    // The employer's own domain is often the board slug: bill.com -> bill
    out.push(u.hostname.replace(/^www\./, "").split(".")[0]);
  } catch {
    /* fall through to the name-derived guesses */
  }
  out.push(companySlug.replace(/-/g, ""));
  out.push(companySlug);
  out.push(companyName.toLowerCase().replace(/[^a-z0-9]/g, ""));
  return [...new Set(out.filter(Boolean))];
}

async function viaGreenhouseJid(
  applyUrl: string,
  companySlug: string,
  companyName: string
): Promise<{ title: string; html: string } | null> {
  let jid: string | null = null;
  try {
    const u = new URL(applyUrl);
    jid = u.searchParams.get("gh_jid") ?? u.searchParams.get("token");
    if (!jid) {
      // bill.com/job?6101561004&gh_jid=... style, id as a bare key
      const bare = [...u.searchParams.keys()].find((k) => /^\d{6,}$/.test(k));
      jid = bare ?? null;
    }
  } catch {
    return null;
  }
  if (!jid) return null;

  for (const board of greenhouseCandidates(applyUrl, companySlug, companyName)) {
    const { body } = await get(
      `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(board)}/jobs/${encodeURIComponent(jid)}`,
      true
    );
    if (!body) continue;
    try {
      const j = JSON.parse(body) as { title?: string; content?: string };
      // The board answered for THIS id, so the guess is confirmed rather than assumed.
      if (j?.content && plain(j.content).length > MIN_USABLE) {
        return { title: String(j.title ?? ""), html: decode(decode(j.content)) };
      }
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

/* -- 2. JobPosting JSON-LD embedded in the page -------------------------- */

function fromJsonLd(html: string): { title: string; html: string } | null {
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(m[1].trim());
    } catch {
      continue;
    }
    const nodes: unknown[] = Array.isArray(parsed)
      ? parsed
      : ((parsed as { "@graph"?: unknown[] })?.["@graph"] ?? [parsed]);
    for (const n of nodes) {
      const x = n as Record<string, unknown>;
      if (x?.["@type"] !== "JobPosting") continue;
      const desc = String(x.description ?? "");
      if (plain(desc).length > MIN_USABLE) return { title: String(x.title ?? ""), html: decode(decode(desc)) };
    }
  }
  return null;
}

/* -- 3. Rippling ---------------------------------------------------------- */

async function viaRippling(applyUrl: string): Promise<{ title: string; html: string } | null> {
  try {
    const u = new URL(applyUrl);
    if (u.hostname !== "ats.rippling.com") return null;
    const seg = u.pathname.split("/").filter(Boolean); // /<board>/jobs/<uuid>
    const [board, , id] = seg;
    if (!board || !id) return null;
    const { body } = await get(`https://api.rippling.com/platform/api/ats/v1/board/${encodeURIComponent(board)}/jobs`, true);
    if (!body) return null;
    const list = JSON.parse(body) as { items?: Record<string, unknown>[] } | Record<string, unknown>[];
    const arr = Array.isArray(list) ? list : (list.items ?? []);
    const hit = arr.find((j) => String(j.uuid ?? j.id ?? "") === id);
    if (!hit) return null;
    const html = String(hit.jobDescription ?? hit.description ?? "");
    return plain(html).length > MIN_USABLE ? { title: String(hit.name ?? hit.title ?? ""), html: decode(decode(html)) } : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------------ */

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
  const budget = Number(argv[argv.indexOf("--budget") + 1]) || Infinity;

  const { getSearchableJobs } = await import("../src/lib/db");
  const { atsAddress } = await import("../src/lib/ats-address");
  const jobs = await getSearchableJobs();
  const atsContent = loadJson<Record<string, ContentRecord>>(CONTENT_PATH, {});
  const content = loadJson<Record<string, ContentRecord>>(GENERIC_PATH, {});
  const failed = new Set(loadJson<{ url: string }[]>(REPORT_PATH, []).map((u) => u.url));

  const todo = jobs
    .filter((j) => !atsAddress(j.apply_url))
    .filter((j) => !atsContent[j.apply_url] && !content[j.apply_url] && !failed.has(j.apply_url))
    .filter((j) => j.apply_url?.startsWith("http"))
    .slice(0, budget);

  if (failed.size) console.log(`[generic] skipping ${failed.size} already known to be unreachable`);

  console.log(`[generic] ${jobs.length} listings, ${todo.length} without a captured description and not on an ATS board`);

  const wins = { greenhouse: 0, jsonld: 0, rippling: 0 };
  const unreachable: { url: string; host: string; slug: string }[] = [];
  const priorUnreachable = loadJson<{ url: string; host: string; slug: string }[]>(REPORT_PATH, []);
  let done = 0;
  let cursor = 0;

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < todo.length) {
        const job = todo[cursor++];
        let got: { title: string; html: string } | null = null;

        got = await viaGreenhouseJid(job.apply_url, job.company_slug ?? "", job.company_name ?? "");
        if (got) wins.greenhouse++;

        if (!got) {
          got = await viaRippling(job.apply_url);
          if (got) wins.rippling++;
        }

        if (!got) {
          const { body } = await get(job.apply_url, false);
          if (body) {
            got = fromJsonLd(body);
            if (got) wins.jsonld++;
          }
        }

        if (got) {
          content[job.apply_url] = {
            title: got.title || job.title,
            html: got.html,
            chars: plain(got.html).length,
            at: new Date().toISOString(),
          };
        } else {
          let host = "?";
          try {
            host = new URL(job.apply_url).hostname;
          } catch {
            /* keep ? */
          }
          unreachable.push({ url: job.apply_url, host, slug: job.slug });
        }

        if (++done % 200 === 0) console.log(`[generic]   ${done}/${todo.length}`);
        if (!dry && done % CHECKPOINT_EVERY === 0) {
          writeJson(GENERIC_PATH, content);
          writeJson(REPORT_PATH, [...priorUnreachable, ...unreachable]);
        }
      }
    })
  );

  const captured = wins.greenhouse + wins.jsonld + wins.rippling;
  console.log(`[generic] captured ${captured} of ${todo.length}`);
  console.log(`[generic]   greenhouse behind a custom host: ${wins.greenhouse}`);
  console.log(`[generic]   JobPosting JSON-LD on the page : ${wins.jsonld}`);
  console.log(`[generic]   rippling board API             : ${wins.rippling}`);
  console.log(`[generic] unreachable: ${unreachable.length}`);

  const byHost = new Map<string, number>();
  for (const u of unreachable) byHost.set(u.host, (byHost.get(u.host) ?? 0) + 1);
  console.log(`[generic] unreachable across ${byHost.size} hosts; worst:`);
  for (const [h, n] of [...byHost].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`[generic]     ${String(n).padStart(4)}  ${h}`);

  if (dry) {
    console.log("[generic] --dry: nothing written");
    return;
  }
  writeJson(GENERIC_PATH, content);
  writeJson(REPORT_PATH, [...priorUnreachable, ...unreachable]);
  console.log(`[generic] generic content records now ${Object.keys(content).length}`);
  console.log(`[generic] unreachable recorded: ${priorUnreachable.length + unreachable.length}`);
}

main();
