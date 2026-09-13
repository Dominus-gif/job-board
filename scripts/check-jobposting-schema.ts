/**
 * Measure every published listing's JobPosting JSON-LD against Google's
 * requirements, and report what we deliberately do not mark up.
 *
 * Run after touching src/lib/jsonld.ts or src/lib/seo/job-location.ts:
 *   npx tsx scripts/check-jobposting-schema.ts
 *
 * A clean run prints no violations. Anything it lists is something Search
 * Console will eventually list too.
 */
const OK = new Set(["FULL_TIME","PART_TIME","CONTRACTOR","TEMPORARY","INTERN","VOLUNTEER","PER_DIEM","OTHER"]);
const AREA_TYPES = new Set(["Country","State","City","AdministrativeArea"]);

async function run() {
  const { getSearchableJobs } = await import("../src/lib/db");
  const { jobPostingJsonLd } = await import("../src/lib/jsonld");
  const jobs = (await getSearchableJobs()) as any[];
  const now = Date.now();
  const bad: Record<string, string[]> = {};
  const flag = (k: string, slug: string) => ((bad[k] ||= []).push(slug));
  let emitted = 0, omitted = 0;
  const omitReason = new Map<string, number>();

  for (const j of jobs) {
    const d = jobPostingJsonLd(j) as any;
    if (!d) {
      omitted++;
      const t = String(j.description_html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      const r = /roles hiring for\s*:|see the full description and apply directly/i.test(t)
        ? "company directory pointer, not one job"
        : t.length < 120
          ? "thin/absent description"
          : "no resolvable applicant area";
      omitReason.set(r, (omitReason.get(r) || 0) + 1);
      continue;
    }
    emitted++;
    // Google's required set.
    if (!d.title) flag("REQUIRED title missing", j.slug);
    if (!d.description) flag("REQUIRED description missing", j.slug);
    if (!d.hiringOrganization?.name) flag("REQUIRED hiringOrganization.name missing", j.slug);
    if (!Number.isFinite(Date.parse(d.datePosted))) flag("REQUIRED datePosted unparseable", j.slug);
    const areas = Array.isArray(d.applicantLocationRequirements) ? d.applicantLocationRequirements : [d.applicantLocationRequirements];
    if (!d.jobLocation && areas.filter(Boolean).length === 0) flag("REQUIRED neither jobLocation nor applicantLocationRequirements", j.slug);
    for (const a of areas) {
      if (!a || !AREA_TYPES.has(a["@type"])) flag(`area @type invalid: ${a && a["@type"]}`, j.slug);
      if (!a?.name || /remote|hybrid|anywhere in the world|office|\bhq\b/i.test(a.name)) flag(`area name not a place: ${a?.name}`, j.slug);
    }
    if (d.jobLocationType && d.jobLocationType !== "TELECOMMUTE") flag("jobLocationType not TELECOMMUTE", j.slug);
    if (!OK.has(d.employmentType)) flag(`employmentType invalid: ${d.employmentType}`, j.slug);
    if (d.validThrough != null) {
      const vt = Date.parse(d.validThrough);
      if (!Number.isFinite(vt)) flag("validThrough unparseable", j.slug);
      else if (vt < now) flag("validThrough already past", j.slug);
    }
    const text = String(d.description).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (text.toLowerCase() === String(d.title).toLowerCase()) flag("description equals title", j.slug);
    if (!/<p|<br|<ul|<li|\n/i.test(d.description)) flag("description has no paragraph breaks", j.slug);
    if (/[!*]/.test(d.title)) flag("title has ! or *", j.slug);
    if (d.hiringOrganization?.logo && !/^https?:\/\//.test(d.hiringOrganization.logo)) flag("logo not an http url", j.slug);
    if (d.baseSalary) {
      const v = d.baseSalary.value || {};
      if (!/^[A-Z]{3}$/.test(d.baseSalary.currency || "")) flag("baseSalary currency invalid", j.slug);
      if (!(v.minValue > 0) || !(v.maxValue > 0) || v.maxValue < v.minValue) flag("baseSalary bounds invalid", j.slug);
      if (!["HOUR","DAY","WEEK","MONTH","YEAR"].includes(v.unitText)) flag("baseSalary unitText invalid", j.slug);
    }
    try { JSON.parse(JSON.stringify(d)); } catch { flag("not serialisable", j.slug); }
  }

  console.log(`jobs ${jobs.length}   JobPosting emitted ${emitted} (${((emitted/jobs.length)*100).toFixed(1)}%)   omitted ${omitted}`);
  for (const [k, n] of omitReason) console.log(`   omitted because: ${k} — ${n}`);
  const keys = Object.keys(bad);
  console.log(keys.length ? "\nVIOLATIONS:" : "\nNo violations against Google's JobPosting requirements.");
  for (const k of keys) console.log(`  ${String(bad[k].length).padStart(5)}  ${k}\n          e.g. ${bad[k].slice(0,3).join(", ")}`);
}
run();
