/**
 * Precompute the curated manual jobs (real ATS roles + directory entries) into
 * a single flat JSON array, so the runtime store loads them with a plain
 * `JSON.parse` — no per-request enrichment/`toPublishedJob` work at serverless
 * cold-start. This is what keeps the ~10k curated listings reliably present on
 * ephemeral hosts (Vercel) instead of falling back when a cold instance can't
 * afford to rebuild thousands of jobs.
 *
 * Runs in `prebuild`; the output is also committed so a build never depends on
 * it succeeding.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Job, RawJob } from "../src/lib/types";
import { toPublishedJob } from "../src/lib/pipeline";
import curated from "../src/lib/seed/curated.json";
import roles from "../src/lib/seed/curated-roles.json";
import flexRoles from "../src/lib/seed/flexjobs-roles.json";
import realSlugs from "../src/lib/seed/real-company-slugs.json";

const DAY = 24 * 60 * 60 * 1000;
const slugify = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const HAS_REAL = new Set(realSlugs as string[]);

// ATS / applicant-tracking hosts — never the company's own domain, so using them
// for the logo would show the ATS icon (Greenhouse, Ashby…) instead of the
// employer's. When we hit one, drop it so the logo resolves from the name.
const ATS_HOST = /greenhouse|lever\.co|ashbyhq|workable\.com|smartrecruiters|myworkday|workday|bamboohr|recruitee|breezy|jobvite|icims|teamtailor|personio|join\.com|gem\.com|paylocity|rippling|ripplingats|dover\.com|wellfound|angel\.co|notion\.so|airtable\.com|docs\.google|forms\.gle|linkedin\.com|indeed\.com/i;
function cleanDomain(d: string | undefined | null): string | undefined {
  if (!d) return undefined;
  return ATS_HOST.test(d) ? undefined : d;
}
function domainFromUrl(u: string): string | undefined {
  try { return cleanDomain(new URL(u).hostname.replace(/^www\./, "")); } catch { return undefined; }
}
// ATS-vendor "about us" boilerplate that scrapers sometimes grab instead of the
// real job description (e.g. Greenhouse's own mission text attached to unrelated
// companies). Drop it so the excerpt falls back to the clean generic line.
const VENDOR_BOILERPLATE = /mission at Greenhouse|make hiring work for everyone|Greenhouse Software|Lever builds modern recruiting|about (Ashby|Workable|Greenhouse|Lever)\b/i;
function cleanDesc(html: string | undefined | null): string {
  return VENDOR_BOILERPLATE.test(html || "") ? "" : html || "";
}

function excerpt(html: string): string {
  const t = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t ? `<p>${t.slice(0, 1400)}${t.length > 1400 ? "…" : ""}</p>` : "";
}

interface DirRec { source: string; company: string; url: string; title: string; desc: string; salary: string; location: string; scope: "worldwide" | "regional"; }
interface RoleRec { company: string; domain: string | null; title: string; desc: string; apply: string; location: string; scope: "worldwide" | "regional"; salary: string; }

// Evergreen "no open role" catch-all postings that ATS boards carry (e.g.
// "Don't see the job you're looking for? Fill out a general application"). They
// are real board entries but read as leaked copy in a job feed — drop them.
const JUNK_TITLE = /don.?t see|didn.?t see|can.?t find|general application|spontaneous application|talent (pool|community|network)|future (opportunities|openings|roles)|join our talent|open (remote )?roles|other (open )?roles|none of (these|the above)|fill out (a|an|the) (general|application)|looking for people with|introduce yourself|general interest/i;

// Wrapped so a build never fails here: the output is committed, so on any error
// the existing curated-jobs.json is kept and the deploy still succeeds.
try {

// ---------------------------------------------------------------------------
// Employer-attribution guard.
//
// The curated spreadsheets paired a list of company names with roles scraped
// from ATS boards, and the pairing is not reliable: an audit found ~20% of rows
// naming a company that doesn't own the board the job actually lives on. The
// worst cases had one board claimed by many labels — the "greenhouse" board
// (Greenhouse's own careers page) was attributed to 40 different companies,
// including SpaceX; a single Notion role appeared under 12 invented employers.
//
// Publishing a real job under the wrong real company misleads applicants and
// misrepresents the employer, so an unverifiable attribution is dropped rather
// than guessed. Ground truth is the ATS board slug in the apply URL.
// ---------------------------------------------------------------------------
const ATS_HOSTS = ["greenhouse.io", "lever.co", "ashbyhq.com", "workable.com", "smartrecruiters.com"];
const SEGMENT_END = new RegExp("[/?#&]");

/** The board identifier an apply URL points at — the employer, per the ATS. */
function boardSlugOf(url: string | undefined): string | null {
  if (!url) return null;
  const lower = url.toLowerCase();
  for (const host of ATS_HOSTS) {
    const at = lower.indexOf(host);
    if (at < 0) continue;
    let rest = lower.slice(at + host.length);
    // Greenhouse's embed form carries the board as ?for=<slug> instead of a path.
    const forAt = rest.indexOf("for=");
    rest = forAt >= 0 ? rest.slice(forAt + 4) : rest.replace(/^[/]+/, "");
    const seg = rest.split(SEGMENT_END).filter(Boolean)[0];
    // Workable's short form is apply.workable.com/j/<id> — no company segment at
    // all, so "j" is a path marker, not a board. Treating it as one would fail
    // every such listing against its own employer name.
    if (seg === "j") return null;
    if (seg) return seg;
  }
  return null;
}
const normName = (n: string) => (n || "").toLowerCase().replace(/[^a-z0-9]/g, "");

// Boards that are never a single employer's own board, plus labels confirmed by
// inspection to be mis-attributed (the board belongs to a different company of
// a similar name — e.g. lever.co/safe is Safe Security, not Safe Superintelligence).
const GENERIC_BOARDS = new Set(["linkedin", "indeed", "ycombinator", "greenhouse", "workable", "lever", "ashby"]);
const MISATTRIBUTED = new Set(["safe superintelligence (ssi)"]);

// A board claimed by more than one company label means the pairing was guessed.
const boardLabels = new Map<string, Set<string>>();
for (const r of roles as RoleRec[]) {
  const b = boardSlugOf(r.apply);
  if (!b) continue;
  if (!boardLabels.has(b)) boardLabels.set(b, new Set());
  boardLabels.get(b)!.add(r.company);
}
let droppedAttribution = 0;
function attributionTrusted(r: RoleRec): boolean {
  if (MISATTRIBUTED.has(r.company.trim().toLowerCase())) return false;
  const b = boardSlugOf(r.apply);
  if (!b) return true; // no board to check against — left as-is
  const labels = boardLabels.get(b);
  const contested = (labels?.size ?? 0) > 1 || GENERIC_BOARDS.has(b);
  if (!contested) return true;
  const bn = b.replace(/[^a-z0-9]/g, "");
  const cn = normName(r.company);
  // On a contested board only an actual name/slug match is trustworthy.
  return Boolean(bn && cn && (bn.includes(cn) || cn.includes(bn)));
}

// Some ATS boards post the same role once per location (e.g. 4x "Enterprise
// Account Manager" from one company) — collapse those to a single listing.
const seenRole = new Set<string>();
const dedupedRoles = (roles as RoleRec[]).filter((r) => {
  if (JUNK_TITLE.test(r.title)) return false;
  if (!attributionTrusted(r)) { droppedAttribution++; return false; }
  const key = `${r.company.trim().toLowerCase()}::${r.title.trim().toLowerCase()}`;
  if (seenRole.has(key)) return false;
  seenRole.add(key);
  return true;
});

// Real, individually-scraped ATS roles (direct apply links).
const roleJobs: Job[] = dedupedRoles.map((rec, i) => {
  const raw: RawJob = {
    external_id: `curated-role:${i}`,
    provider: "greenhouse",
    company_name: rec.company.trim(),
    company_domain: cleanDomain(rec.domain),
    title: rec.title.trim(),
    description_html: excerpt(cleanDesc(rec.desc)) || `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
    apply_url: rec.apply,
    location_raw: rec.location,
    employment_type: "Full-Time",
    posted_at: new Date(Date.now() - ((i % 45) + 1) * DAY).toISOString(),
    salary_raw: rec.salary || undefined,
  };
  const job = toPublishedJob(raw, rec.scope === "regional" ? { scope: "regional", region: rec.location, slugSeed: 40000 + i } : { scope: "worldwide", slugSeed: 40000 + i });
  return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
});

// Directory entries for companies with no scrapable API (minus real-role ones
// and the generic "Open Remote Roles" placeholders).
const dirJobs: Job[] = (curated as DirRec[])
  .filter((rec) => rec.title !== "Open Remote Roles" && !JUNK_TITLE.test(rec.title) && !HAS_REAL.has(slugify(rec.company)))
  .filter((rec) => {
    // Same attribution guard as the role feed above.
    if (!attributionTrusted(rec as unknown as RoleRec)) { droppedAttribution++; return false; }
    return true;
  })
  .map((rec, i) => {
    const raw: RawJob = {
      external_id: `curated:${rec.source}:${i}`,
      provider: "greenhouse",
      company_name: rec.company,
      company_domain: domainFromUrl(rec.url),
      title: rec.title,
      description_html: cleanDesc(rec.desc) || `<p>${rec.title} at ${rec.company}. See the full description and apply directly on the company's job page.</p>`,
      apply_url: rec.url,
      location_raw: rec.location,
      employment_type: "Full-Time",
      posted_at: new Date(Date.now() - ((i % 55) + 1) * DAY).toISOString(),
      salary_raw: rec.salary || undefined,
    };
    const job = toPublishedJob(raw, rec.scope === "regional" ? { scope: "regional", region: rec.location, slugSeed: 20000 + i } : { scope: "worldwide", slugSeed: 20000 + i });
    return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
  });

// ---------------------------------------------------------------------------
// FlexJobs import. Unlike the curated spreadsheets these carry a real posted
// date and employment type, so they are mapped separately rather than being
// forced through the synthetic values the curated path uses.
//
// Every one of these is country-scoped (804 of 930 were US-only), so they are
// all regional by construction — the worldwide board stays untouched.
// ---------------------------------------------------------------------------
interface FlexRec {
  company: string; domain: string | null; title: string; desc: string;
  apply: string; location: string; scope: "regional" | "worldwide";
  salary: string; posted: string; employment: string;
}
const flexJobs: Job[] = (flexRoles as FlexRec[])
  .filter((rec) => {
    if (JUNK_TITLE.test(rec.title)) return false;
    if (!attributionTrusted({ company: rec.company, apply: rec.apply } as RoleRec)) { droppedAttribution++; return false; }
    return true;
  })
  .map((rec, i) => {
    const raw: RawJob = {
      external_id: `flexjobs:${i}`,
      provider: "greenhouse",
      company_name: rec.company.trim(),
      company_domain: cleanDomain(rec.domain),
      title: rec.title.trim(),
      description_html: cleanDesc(rec.desc) || `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
      apply_url: rec.apply,
      location_raw: rec.location,
      employment_type: (rec.employment === "Part-Time" || rec.employment === "Contract" ? rec.employment : "Full-Time") as Job["employment_type"],
      posted_at: rec.posted ? new Date(rec.posted).toISOString() : undefined,
      salary_raw: rec.salary || undefined,
    };
    const job = toPublishedJob(raw, { scope: "regional", region: rec.location, slugSeed: 60000 + i });
    return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
  });

const all = [...roleJobs, ...dirJobs, ...flexJobs];
const OUT = join(process.cwd(), "src", "lib", "generated", "curated-jobs.json");
writeFileSync(OUT, JSON.stringify(all));
console.log(`[curated] wrote ${all.length} prebuilt curated jobs (${roleJobs.length} real roles + ${dirJobs.length} directory + ${flexJobs.length} flexjobs) to generated/curated-jobs.json`);
console.log(`[curated] dropped ${droppedAttribution} listing(s) whose employer could not be verified against the ATS board in their apply URL`);

} catch (err) {
  console.warn("[curated] failed — keeping the committed curated-jobs.json:", (err as Error)?.message);
}
process.exit(0); // never fail the build
