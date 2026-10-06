/**
 * Turn an aggregator export into a list of employer career boards we can poll.
 *
 *   npx tsx scripts/import-leads.ts <export.json> [--write]
 *
 * The export it was built for (remotejobs.com, 1,950 rows) could not be
 * imported directly, for reasons worth recording because they will be true of
 * the next one too:
 *
 *   - Every row had an EMPTY location. This board classifies every listing as
 *     work-from-anywhere or region-locked from the location text, so rows
 *     without it cannot be classified, cannot be filtered, and cannot honestly
 *     appear on a board whose entire promise is that distinction.
 *   - 93% of apply links were aggregator tracking URLs. We publish that every
 *     listing links to the employer's own application page.
 *   - 37 titles were explicitly hybrid or on-site, which the filter exists to
 *     remove.
 *
 * So the export is used as a LEAD LIST instead: pull the employer and their ATS
 * board out of each apply URL, verify the board answers, and add it to the
 * company allow-list. The nightly ingest then reads the employer's own API,
 * which supplies the location, the real description and a first-party apply
 * link — and the usual filter runs over all of it.
 *
 * Nothing here writes a job. It writes employers, and the pipeline does the rest.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { AtsProvider, Company } from "../src/lib/types";

interface Row {
  title: string;
  description: string;
  apply_url: string;
  company: string;
  salary: string;
  location: string;
  type: string;
}

interface Lead {
  provider: AtsProvider;
  token: string;
  name: string;
  rows: number;
}

/**
 * Pull the employer's own board out of an apply URL.
 *
 * Two of these are multi-tenant endpoints rather than company boards, and
 * treating them as tokens would create a company called "embed":
 *   smartrecruiters.com/oneclick-ui/company/Endava/publication/...
 *   job-boards.greenhouse.io/embed/job_app?for=axonius
 */
function parseBoard(url: string): { provider: AtsProvider; token: string } | null {
  const sr = url.match(/smartrecruiters\.com\/oneclick-ui\/company\/([^/?#]+)/i);
  if (sr) return { provider: "smartrecruiters", token: sr[1] };

  const ghEmbed = url.match(/greenhouse\.io\/embed\/job_app\?[^#]*\bfor=([^&#]+)/i);
  if (ghEmbed) return { provider: "greenhouse", token: ghEmbed[1] };

  const pairs: [RegExp, AtsProvider][] = [
    [/jobs\.ashbyhq\.com\/([^/?#]+)/i, "ashby"],
    [/(?:boards|job-boards)\.greenhouse\.io\/([^/?#]+)/i, "greenhouse"],
    [/jobs\.lever\.co\/([^/?#]+)/i, "lever"],
    [/([a-z0-9-]+)\.workable\.com/i, "workable"],
    [/apply\.workable\.com\/([^/?#]+)/i, "workable"],
    [/jobs\.smartrecruiters\.com\/([^/?#]+)/i, "smartrecruiters"],
  ];
  for (const [re, provider] of pairs) {
    const m = url.match(re);
    if (m && m[1] && !["embed", "oneclick-ui"].includes(m[1].toLowerCase())) {
      return { provider, token: m[1] };
    }
  }
  return null;
}

/**
 * Employers we will not list, decided before any of them are fetched.
 *
 * Staffing agencies and recruiters are excluded because the board is a list of
 * employers hiring, and a reader clicking an agency listing is not applying to
 * the company named on the card. The MLM-adjacent insurance recruiters in
 * particular are what our own scam guides warn people about, so carrying their
 * postings would contradict the site in both directions.
 */
const AGENCY = /\b(agency|agencies|staffing|recruit(ing|ment|ers?)?|talent (solutions|partners|group)|consultancy|placement|headhunt|outsourc)\b/i;
const UNNAMED = /^(the company|company|confidential|undisclosed|n\/?a|private|client)$/i;
/** Named outfits that are agencies without saying so in the name. */
const AGENCY_BY_NAME = /\b(ao garcia|globe life|american income|primerica|destination careers|limitless)\b/i;

function rejectReason(name: string): string | null {
  const n = name.trim();
  if (!n) return "no company name";
  if (UNNAMED.test(n)) return "unnamed employer";
  if (AGENCY.test(n)) return "agency or recruiter";
  if (AGENCY_BY_NAME.test(n)) return "known agency";
  return null;
}

const API: Record<AtsProvider, (t: string) => string> = {
  greenhouse: (t) => `https://boards-api.greenhouse.io/v1/boards/${t}/jobs`,
  lever: (t) => `https://api.lever.co/v0/postings/${t}?mode=json&limit=1`,
  ashby: (t) => `https://api.ashbyhq.com/posting-api/job-board/${t}`,
  workable: (t) => `https://${t}.workable.com/spi/v3/jobs`,
  smartrecruiters: (t) => `https://api.smartrecruiters.com/v1/companies/${t}/postings?limit=1`,
} as Record<AtsProvider, (t: string) => string>;

/** Does this board answer, and does it have anything on it? */
async function verify(lead: Lead): Promise<{ ok: boolean; jobs: number; note: string }> {
  const url = API[lead.provider]?.(lead.token);
  if (!url) return { ok: false, jobs: 0, note: "no adapter" };
  try {
    const r = await fetch(url, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) return { ok: false, jobs: 0, note: `HTTP ${r.status}` };
    const data: unknown = await r.json();
    const count =
      Array.isArray(data) ? data.length
      : typeof data === "object" && data
        ? (() => {
            const d = data as Record<string, unknown>;
            for (const k of ["jobs", "content", "data", "postings"]) {
              if (Array.isArray(d[k])) return (d[k] as unknown[]).length;
            }
            return typeof d.totalFound === "number" ? d.totalFound : 0;
          })()
        : 0;
    return { ok: count > 0, jobs: count, note: count > 0 ? "ok" : "board is empty" };
  } catch (e) {
    return { ok: false, jobs: 0, note: String((e as Error).message).slice(0, 40) };
  }
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function main() {
  const file = process.argv[2];
  const write = process.argv.includes("--write");
  if (!file) throw new Error("usage: tsx scripts/import-leads.ts <export.json> [--write]");

  const rows: Row[] = JSON.parse(readFileSync(file, "utf-8"));
  console.log(`read ${rows.length} rows\n`);

  // ---- 1. group rows into candidate boards --------------------------------
  const leads = new Map<string, Lead>();
  const rejected = new Map<string, number>();
  let noBoard = 0;

  for (const row of rows) {
    const board = parseBoard(row.apply_url || "");
    if (!board) { noBoard++; continue; }
    const reason = rejectReason(row.company || "");
    if (reason) { rejected.set(reason, (rejected.get(reason) ?? 0) + 1); continue; }
    const key = `${board.provider}:${board.token.toLowerCase()}`;
    const existing = leads.get(key);
    if (existing) existing.rows++;
    else leads.set(key, { provider: board.provider, token: board.token, name: row.company.trim(), rows: 1 });
  }

  console.log(`  rows on an ATS we can read      : ${rows.length - noBoard}`);
  console.log(`  rows on an ATS we cannot read   : ${noBoard}`);
  for (const [reason, n] of [...rejected].sort((a, b) => b[1] - a[1])) {
    console.log(`  rejected, ${reason.padEnd(22)}: ${n}`);
  }
  console.log(`  candidate employer boards       : ${leads.size}\n`);

  // ---- 2. drop the ones we already have -----------------------------------
  const seedPath = join(process.cwd(), "src/lib/seed/companies.json");
  const seed: Company[] = JSON.parse(readFileSync(seedPath, "utf-8"));
  const have = new Set(seed.map((c) => `${c.provider}:${(c.board_token ?? c.slug).toLowerCase()}`));
  const fresh = [...leads.values()].filter((l) => !have.has(`${l.provider}:${l.token.toLowerCase()}`));
  console.log(`  already in the allow-list       : ${leads.size - fresh.length}`);
  console.log(`  new to verify                   : ${fresh.length}\n`);

  // ---- 3. verify each board actually answers ------------------------------
  const good: Lead[] = [];
  const bad: { lead: Lead; note: string }[] = [];
  let i = 0;
  const workers = Array.from({ length: 6 }, async () => {
    while (i < fresh.length) {
      const lead = fresh[i++];
      const v = await verify(lead);
      if (v.ok) { good.push(lead); process.stdout.write("."); }
      else { bad.push({ lead, note: v.note }); process.stdout.write("x"); }
    }
  });
  await Promise.all(workers);
  console.log(`\n\n  boards that answer with jobs    : ${good.length}`);
  console.log(`  boards that did not             : ${bad.length}`);
  const notes = new Map<string, number>();
  for (const b of bad) notes.set(b.note, (notes.get(b.note) ?? 0) + 1);
  for (const [n, c] of [...notes].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`     ${String(c).padStart(4)}  ${n}`);

  // ---- 4. write them into the allow-list ----------------------------------
  const additions: Company[] = good
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((l) => ({
      slug: slugify(l.name) || slugify(l.token),
      name: l.name,
      provider: l.provider,
      board_token: l.token,
      logo: "",
    }));

  // A slug collision would silently merge two employers into one page.
  const bySlug = new Map<string, Company>();
  const existingSlugs = new Set(seed.map((c) => c.slug));
  const collisions: string[] = [];
  for (const c of additions) {
    if (existingSlugs.has(c.slug) || bySlug.has(c.slug)) { collisions.push(c.slug); continue; }
    bySlug.set(c.slug, c);
  }
  const final = [...bySlug.values()];
  console.log(`\n  ready to add                    : ${final.length}`);
  if (collisions.length) console.log(`  skipped, slug already taken     : ${collisions.length} (${collisions.slice(0, 5).join(", ")})`);

  console.log(`\n  first 15:`);
  for (const c of final.slice(0, 15)) console.log(`     ${c.name.padEnd(30)} ${c.provider}:${c.board_token}`);

  if (write) {
    writeFileSync(seedPath, JSON.stringify([...seed, ...final], null, 2) + "\n");
    console.log(`\n  WROTE ${final.length} employers into src/lib/seed/companies.json (now ${seed.length + final.length})`);
  } else {
    console.log(`\n  dry run — pass --write to update src/lib/seed/companies.json`);
  }
}

main();
