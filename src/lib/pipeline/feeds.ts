import type { EmploymentType, RawJob } from "../types";

/**
 * Remote-job aggregator feeds (spec: "all the remote job listings from
 * different sites"). Unlike ATS adapters these are not per-company — each is a
 * single global feed indexing many boards. Every job still passes through the
 * same strict Work-From-Anywhere filter, so only genuinely global roles survive.
 *
 * To add a feed: write a fetcher returning RawJob[] and add it to FEEDS.
 */
const UA = { "User-Agent": "getremotejobsnow.com/0.1 (+https://getremotejobsnow.com)" };

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { headers: UA, cache: "no-store", signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function empType(raw?: string): EmploymentType | undefined {
  if (!raw) return undefined;
  const s = raw.toLowerCase();
  if (s.includes("part")) return "Part-Time";
  if (s.includes("contract") || s.includes("freelance") || s.includes("temporary")) return "Contract";
  if (s.includes("full")) return "Full-Time";
  return undefined;
}

function money(min?: number, max?: number): string | undefined {
  if (!min && !max) return undefined;
  const a = min || max!;
  const b = max || min!;
  return `$${a.toLocaleString("en-US")} - $${b.toLocaleString("en-US")} USD`;
}

/* ------------------------------- Remotive -------------------------------- */
async function remotive(): Promise<RawJob[]> {
  const data = await getJson("https://remotive.com/api/remote-jobs?limit=1000");
  if (!data?.jobs) return [];
  return data.jobs.map((j: any): RawJob => ({
    external_id: `remotive::${j.id}`,
    provider: "remotive",
    company_name: j.company_name,
    company_logo: j.company_logo || undefined,
    title: j.title,
    description_html: j.description || "",
    apply_url: j.url,
    location_raw: j.candidate_required_location || "",
    posted_at: j.publication_date,
    employment_type: empType(j.job_type),
    salary_raw: typeof j.salary === "string" && j.salary ? j.salary : undefined,
  }));
}

/* -------------------------------- Jobicy --------------------------------- */
async function jobicy(): Promise<RawJob[]> {
  const data = await getJson("https://jobicy.com/api/v2/remote-jobs?count=100");
  if (!data?.jobs) return [];
  return data.jobs.map((j: any): RawJob => ({
    external_id: `jobicy::${j.id}`,
    provider: "jobicy",
    company_name: j.companyName,
    company_logo: j.companyLogo || undefined,
    title: j.jobTitle,
    description_html: j.jobDescription || j.jobExcerpt || "",
    apply_url: j.url,
    location_raw: j.jobGeo || "",
    posted_at: j.pubDate,
    employment_type: empType(Array.isArray(j.jobType) ? j.jobType[0] : j.jobType),
    salary_raw: money(j.salaryMin, j.salaryMax),
  }));
}

/* ------------------------------- Arbeitnow ------------------------------- */
async function arbeitnow(): Promise<RawJob[]> {
  const data = await getJson("https://www.arbeitnow.com/api/job-board-api");
  if (!data?.data) return [];
  return data.data
    .filter((j: any) => j.remote)
    .map((j: any): RawJob => ({
      external_id: `arbeitnow::${j.slug}`,
      provider: "arbeitnow",
      company_name: j.company_name,
      title: j.title,
      description_html: j.description || "",
      apply_url: j.url,
      location_raw: j.location || "",
      posted_at: j.created_at ? new Date(j.created_at * 1000).toISOString() : undefined,
      employment_type: empType((j.job_types || [])[0]),
    }));
}

// Verified aggregator feeds only. RemoteOK was removed for source quality.
/* ------------------------------- Himalayas ------------------------------- */
// himalayas.app/jobs/api — structured remote jobs with explicit location and
// timezone restrictions, so we can accept only the genuinely worldwide ones.
async function himalayas(): Promise<RawJob[]> {
  const data = await getJson("https://himalayas.app/jobs/api?limit=100");
  if (!data?.jobs) return [];
  return data.jobs.map((j: any): RawJob => {
    const locs: string[] = j.locationRestrictions || [];
    const tz: string[] = j.timezoneRestrictions || [];
    // Only mark as worldwide when there are no location AND no timezone limits.
    const location = locs.length === 0 && tz.length === 0 ? "Worldwide" : [...locs, ...tz].join(", ");
    return {
      external_id: `himalayas::${j.guid || j.applicationLink}`,
      provider: "himalayas",
      company_name: j.companyName,
      company_logo: j.companyLogo || undefined,
      title: j.title,
      description_html: j.description || j.excerpt || "",
      apply_url: j.applicationLink,
      location_raw: location,
      posted_at: j.pubDate,
      employment_type: empType(j.employmentType),
      salary_raw: money(j.minSalary, j.maxSalary),
    };
  });
}

/* ----------------------------- Working Nomads --------------------------- */
// workingnomads.com/api/exposed_jobs — curated remote jobs; the filter keeps
// only the location-independent ones.
async function workingnomads(): Promise<RawJob[]> {
  const data = await getJson("https://www.workingnomads.com/api/exposed_jobs/");
  const jobs = Array.isArray(data) ? data : data?.jobs;
  if (!Array.isArray(jobs)) return [];
  return jobs.map((j: any): RawJob => ({
    external_id: `workingnomads::${j.url}`,
    provider: "workingnomads",
    company_name: j.company_name,
    title: j.title,
    description_html: j.description || "",
    apply_url: j.url,
    location_raw: j.location || "",
    posted_at: j.pub_date,
  }));
}

// Verified aggregator feeds. RemoteOK was removed for source quality. Every
// job still passes the strict worldwide filter before it can be published.
const FEEDS: (() => Promise<RawJob[]>)[] = [remotive, jobicy, arbeitnow, himalayas, workingnomads];

/** Run every aggregator feed; a failing feed yields [] and never aborts. */
export async function ingestFeeds(): Promise<RawJob[]> {
  const batches = await Promise.all(FEEDS.map((f) => f().catch(() => [])));
  return batches.flat();
}
