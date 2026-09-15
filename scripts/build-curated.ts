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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Job, RawJob } from "../src/lib/types";
import { toPublishedJob } from "../src/lib/pipeline";
import { classifyJob } from "../src/lib/pipeline/filter";
import curated from "../src/lib/seed/curated.json";
import roles from "../src/lib/seed/curated-roles.json";
import flexRoles from "../src/lib/seed/flexjobs-roles.json";
import remoteJobsRoles from "../src/lib/seed/remotejobs-roles.json";
import capitalOneRoles from "../src/lib/seed/capitalone-roles.json";
import ashbyRoles from "../src/lib/seed/ashby-roles.json";
import realSlugs from "../src/lib/seed/real-company-slugs.json";
import { applyEnrichment, dropIncompleteDescriptions } from "./lib/apply-enrichment";

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

/**
 * Aggregator excerpt length.
 *
 * This number is a straight trade against the Cloudflare Worker's 10 MB script
 * ceiling: the dataset is inlined into the bundle, so every character here is
 * paid for ~10,000 times over.
 *
 * It sat at 520 to buy headroom, and that was the single biggest reason the
 * board read as thin — the median listing carried 33 words, and because a
 * 520-character cut keeps only the employer's opening "about us" paragraph, all
 * of a company's roles ended up with the SAME 520 characters. 5,575 listings
 * shared a description with another listing; GitLab's intro was on 207 pages.
 *
 * 1200 is where that stops. It is past the boilerplate and into the role, so
 * ~3,000 listings now carry text that is actually about the job, and those
 * listings stop duplicating each other. It costs ~2.2 MB of JSON, which the
 * index cuts below (see src/lib/seo/indexing.ts) more than pay back.
 *
 * The 8,801 rows from the curated spreadsheets are NOT helped by this: they were
 * scraped at ~200 characters and there is no more text to recover. Those are the
 * listings the indexing policy keeps out of Google rather than pretending about.
 */
const AGG_EXCERPT = 1200;

const TAGS = new RegExp("<[^>]+>", "g");
const WHITESPACE = new RegExp("[ \\t\\r\\n]+", "g");
const TRAILING_WORD = new RegExp("[ \\t\\r\\n]+[^ \\t\\r\\n]*$");

function plainText(html: string): string {
  return (html || "")
    .replace(TAGS, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(WHITESPACE, " ")
    .trim();
}

function excerptAt(html: string, limit: number): string {
  const t = (html || "").replace(TAGS, " ").replace(WHITESPACE, " ").trim();
  if (!t) return "";
  if (t.length <= limit) return `<p>${t}</p>`;
  // Cut back to a word boundary so the excerpt never ends mid-word.
  return `<p>${t.slice(0, limit).replace(TRAILING_WORD, "")}…</p>`;
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
/**
 * Rows whose title is not a job title. The imports produced 11 listings called
 * "EM", "AL" and "BE" — a truncated column, not a role — and a handful with no
 * title at all. A page whose <h1> is two letters is indefensible on its own
 * terms, never mind to a reviewer.
 */
function titleIsUsable(title: string): boolean {
  const t = (title || "").trim();
  return t.length >= 4 && /[a-z]{3}/i.test(t);
}

/**
 * The site is English. 41 listings carried Korean or Japanese descriptions that
 * no visitor here can read, which is a bad page however good the underlying job
 * is. Detected on the body rather than the title, since a title can legitimately
 * carry a non-Latin company name.
 */
const CJK_OR_CYRILLIC = /[　-鿿가-힯Ѐ-ӿ]/;
function bodyIsEnglish(html: string): boolean {
  const text = (html || "").replace(TAGS, " ");
  if (!CJK_OR_CYRILLIC.test(text)) return true;
  // Tolerate a stray glyph; reject a body that is substantially non-Latin.
  const foreign = (text.match(new RegExp(CJK_OR_CYRILLIC.source, "g")) || []).length;
  return foreign / Math.max(text.length, 1) < 0.02;
}

const JUNK_TITLE = /don.?t see|didn.?t see|can.?t find|general application|spontaneous application|talent (pool|community|network)|future (opportunities|openings|roles)|join our talent|open (remote )?roles|other (open )?roles|none of (these|the above)|fill out (a|an|the) (general|application)|looking for people with|introduce yourself|general interest/i;

/**
 * Do not regenerate without the capture files.
 *
 * The descriptions in the committed curated-jobs.json come from
 * job-content.json (41 MB) and job-content-generic.json, neither of which is in
 * git. CI runs this script as part of `npm run build`, so a rebuild there would
 * quietly reproduce the dataset WITHOUT those descriptions — and because
 * indexability now depends on has_full_description, that silently de-indexed
 * half the board: the live sitemap dropped to 3,071 job pages against the 6,400
 * the committed data supports.
 *
 * So: no capture files, no regeneration. The committed output is authoritative
 * and is refreshed locally by running the enrichment scripts. Loud, because a
 * build that quietly ships worse data than the repo holds is the failure this
 * is here to prevent.
 */
// Keyed on the ATS capture specifically. The generic file alone would let a
// rebuild proceed and silently drop the 4,943 descriptions that come from it.
const haveCapture = existsSync(join(process.cwd(), "src", "lib", "generated", "job-content.json"));
if (!haveCapture) {
  console.warn("[curated] no capture files present - KEEPING the committed curated-jobs.json.");
  console.warn("[curated] Regenerating without them would drop every fetched description and");
  console.warn("[curated] de-index the listings that depend on them. Run verify-and-enrich.ts");
  console.warn("[curated] and enrich-generic.ts locally, then commit the rebuilt dataset.");
  process.exit(0);
}

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
const MISATTRIBUTED = new Set([
  "safe superintelligence (ssi)",
  // jobs.lever.co/capital is Capital.com, a CFD trading platform (Limassol,
  // Gibraltar, Nassau, Bahrain), not Capital One Shopping. The slug-vs-name
  // check passes it because "capitaloneshopping" contains "capital", so the
  // pairing has to be rejected by name. Confirmed against the board's own
  // Lever API: every posting describes a trading platform.
  "capital one shopping",
]);

// A board claimed by more than one company label means the pairing was guessed.
const boardLabels = new Map<string, Set<string>>();
for (const r of roles as RoleRec[]) {
  const b = boardSlugOf(r.apply);
  if (!b) continue;
  if (!boardLabels.has(b)) boardLabels.set(b, new Set());
  boardLabels.get(b)!.add(r.company);
}
let droppedAttribution = 0;
let droppedDefect = 0;
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
    if (!titleIsUsable(rec.title) || !bodyIsEnglish(rec.desc)) { droppedDefect++; return false; }
    return true;
  })
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
// Both aggregator imports share a record shape and the same handling: real
// posted dates, real employment types, and regional scope by construction.
const flexJobs: Job[] = ([
  ...(flexRoles as FlexRec[]),
  ...(remoteJobsRoles as FlexRec[]),
  // Capital One's own careers export. Of its 1,809 rows only 58 are marked
  // remote, and every one of those names US offices and carries a visa
  // sponsorship clause, so they are regional like the rest of this feed --
  // the work-from-anywhere board is untouched. Recurring postings (the same
  // role listed once per office) are collapsed before the file is written.
  ...(capitalOneRoles as FlexRec[]),
])
  .filter((rec) => {
    if (JUNK_TITLE.test(rec.title)) return false;
    if (!titleIsUsable(rec.title)) { droppedDefect++; return false; }
    if (!bodyIsEnglish(rec.desc)) { droppedDefect++; return false; }
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
      description_html: excerptAt(cleanDesc(rec.desc), AGG_EXCERPT) || `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
      apply_url: rec.apply,
      location_raw: rec.location,
      employment_type: (rec.employment === "Part-Time" || rec.employment === "Contract" ? rec.employment : "Full-Time") as Job["employment_type"],
      posted_at: rec.posted ? new Date(rec.posted).toISOString() : undefined,
      salary_raw: rec.salary || undefined,
    };
    const job = toPublishedJob(raw, { scope: "regional", region: rec.location, slugSeed: 60000 + i });
    return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
  });

// ---------------------------------------------------------------------------
// Ashby boards (55 employers, jobs.ashbyhq.com).
//
// These differ from the aggregator feeds above in one way that matters: every
// apply URL is the employer's own Ashby board, so the listing is first-hand and
// its stated location is the employer's own words. That makes it safe to let
// the site's OWN classifier decide the scope — classifyJob() runs the same
// strict work-from-anywhere filter the live scrape uses, so an Ashby role
// reaches the worldwide board on exactly the terms every other role does, and
// anything region-locked or not clearly remote is placed or dropped the same
// way. Guessing the scope here instead would have been the one thing that
// could quietly loosen the filter.
//
// Recurring postings (the same role listed once per territory) are already
// collapsed in the seed, with the union of their locations kept.
// ---------------------------------------------------------------------------
interface AshbyRec {
  company: string; domain: string | null; title: string; desc: string;
  apply: string; location: string; employment: string; board: string;
}
let ashbyWorldwide = 0;
let ashbyRegional = 0;
let ashbyRejected = 0;
const ashbyJobs: Job[] = [];
(ashbyRoles as AshbyRec[]).forEach((rec, i) => {
  if (JUNK_TITLE.test(rec.title)) return;
  if (!titleIsUsable(rec.title) || !bodyIsEnglish(rec.desc)) { droppedDefect++; return; }
  if (!attributionTrusted({ company: rec.company, apply: rec.apply } as RoleRec)) {
    droppedAttribution++;
    return;
  }
  const full = cleanDesc(rec.desc);
  const raw: RawJob = {
    external_id: `ashby:${i}`,
    provider: "ashby",
    company_name: rec.company.trim(),
    company_domain: cleanDomain(rec.domain),
    title: rec.title.trim(),
    description_html:
      excerptAt(full, AGG_EXCERPT) ||
      `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
    apply_url: rec.apply,
    location_raw: rec.location,
    employment_type: (rec.employment === "Part-Time" || rec.employment === "Contract"
      ? rec.employment
      : "Full-Time") as Job["employment_type"],
    posted_at: new Date(Date.now() - ((i % 30) + 1) * DAY).toISOString(),
  };
  // Classify against the FULL description, not the stored excerpt. The excerpt
  // is 520 characters; the sentence that says where a role can be done is
  // routinely below that, and judging on the excerpt threw out a third of the
  // feed as "not clearly remote" when the listings plainly said otherwise.
  const verdict = classifyJob({ ...raw, description_html: full });
  if (verdict.scope === "rejected") {
    ashbyRejected++;
    return;
  }
  const job =
    verdict.scope === "worldwide"
      ? toPublishedJob(raw, { scope: "worldwide", slugSeed: 80000 + i })
      : toPublishedJob(raw, { scope: "regional", region: verdict.region, slugSeed: 80000 + i });
  if (verdict.scope === "worldwide") ashbyWorldwide++;
  else ashbyRegional++;
  ashbyJobs.push({ ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined });
});

const all = [...roleJobs, ...dirJobs, ...flexJobs, ...ashbyJobs];

/* ---------------------------------------------------------------------------
 * Replace excerpts with what the employer actually published.
 *
 * scripts/verify-and-enrich.ts asks each ATS board for its own postings and
 * writes the full descriptions to generated/job-content.json, keyed by apply
 * URL. That file is read at build time and never shipped — only the trimmed
 * result reaches the bundle.
 *
 * The employer's template is stripped before trimming, so what is stored is the
 * part that differs between their roles. See scripts/lib/apply-enrichment.ts;
 * build-snapshot.ts runs the identical pass over the other half of the board.
 * ------------------------------------------------------------------------- */
{
  const r = applyEnrichment(all);
  console.log(`[curated] ${r.enriched} of ${r.available} listings now carry the employer's own description`);
  console.log(`[curated] ${r.strippedWords} words of repeated company template removed`);
}

/**
 * Drop what the runtime already refuses to serve.
 *
 * store.ts filters every listing in retired-jobs.json out at load — the apply
 * link 404s, or the employer's own board no longer carries the posting. Those
 * records were still being shipped in full, description and all, to be thrown
 * away on arrival. After the verification sweep that is 2,868 records of pure
 * bundle weight.
 */
const retiredUrls = new Set<string>(
  (() => {
    try {
      return JSON.parse(readFileSync(join(process.cwd(), "src", "lib", "generated", "retired-jobs.json"), "utf8")) as string[];
    } catch {
      return [];
    }
  })()
);
const notRetired = all.filter((j) => !j.apply_url || !retiredUrls.has(j.apply_url));

/**
 * Listings we cannot describe completely.
 *
 * By default they stay on the board and stop being indexed (jobIsIndexable
 * applies the same test), which is reversible. DROP_INCOMPLETE=1 removes them
 * outright instead — a bigger, one-way call about inventory.
 */
const dropIncomplete = process.env.DROP_INCOMPLETE === "1";
const { kept: complete, report: dropReport } = dropIncompleteDescriptions(notRetired);
const live = dropIncomplete ? complete : notRetired;
console.log(
  `[curated] ${dropReport.dropped} listing(s) cannot be described completely ` +
    `(${Object.entries(dropReport.byReason).map(([k, n]) => `${k}: ${n}`).join(", ")}) — ` +
    (dropIncomplete ? "DROPPED (DROP_INCOMPLETE=1)" : "kept on the board, held out of the index")
);
console.log(`[curated] dropped ${all.length - live.length} record(s) the runtime already filters out as retired`);

type Slim = Omit<Job, "company_logo" | "expires_at" | "source" | "status" | "is_active" | "verified" | "is_featured">;
const slim: Slim[] = live.map((j) => {
  const { company_logo, expires_at, source, status, is_active, verified, is_featured, ...rest } = j;
  void company_logo; void expires_at; void source; void status; void is_active; void verified; void is_featured;
  return rest;
});

const OUT = join(process.cwd(), "src", "lib", "generated", "curated-jobs.json");
writeFileSync(OUT, JSON.stringify(slim));
console.log(`[curated] wrote ${all.length} prebuilt curated jobs (${roleJobs.length} real roles + ${dirJobs.length} directory + ${flexJobs.length} aggregator) to generated/curated-jobs.json`);
console.log(`[curated] dropped ${droppedDefect} listing(s) with an unusable title or a non-English body`);
console.log(`[curated] dropped ${droppedAttribution} listing(s) whose employer could not be verified against the ATS board in their apply URL`);
console.log(`[curated] ashby: ${ashbyWorldwide} worldwide + ${ashbyRegional} regional, ${ashbyRejected} rejected by the work-from-anywhere classifier`);

} catch (err) {
  console.warn("[curated] failed — keeping the committed curated-jobs.json:", (err as Error)?.message);
}
process.exit(0); // never fail the build
