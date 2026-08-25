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

// Some ATS boards post the same role once per location (e.g. 4x "Enterprise
// Account Manager" from one company) — collapse those to a single listing.
const seenRole = new Set<string>();
const dedupedRoles = (roles as RoleRec[]).filter((r) => {
  if (JUNK_TITLE.test(r.title)) return false;
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
    description_html: excerpt(rec.desc) || `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
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
  .map((rec, i) => {
    const raw: RawJob = {
      external_id: `curated:${rec.source}:${i}`,
      provider: "greenhouse",
      company_name: rec.company,
      company_domain: domainFromUrl(rec.url),
      title: rec.title,
      description_html: rec.desc,
      apply_url: rec.url,
      location_raw: rec.location,
      employment_type: "Full-Time",
      posted_at: new Date(Date.now() - ((i % 55) + 1) * DAY).toISOString(),
      salary_raw: rec.salary || undefined,
    };
    const job = toPublishedJob(raw, rec.scope === "regional" ? { scope: "regional", region: rec.location, slugSeed: 20000 + i } : { scope: "worldwide", slugSeed: 20000 + i });
    return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
  });

const all = [...roleJobs, ...dirJobs];
const OUT = join(process.cwd(), "src", "lib", "generated", "curated-jobs.json");
writeFileSync(OUT, JSON.stringify(all));
console.log(`[curated] wrote ${all.length} prebuilt curated jobs (${roleJobs.length} real roles + ${dirJobs.length} directory) to generated/curated-jobs.json`);
