import type { Company, Job, RawJob } from "../types";
import { jobSlug, slugify, stableSuffix } from "../slug";
import { baselineInterest, IN_DEMAND_THRESHOLD } from "../interest";
import { sanitizeDescription, toText } from "./text";
import { filterJob } from "./filter";
import { enrich } from "./enrich";
import { dedupeRaw } from "./dedupe";
import { ingestAll } from "./ingest";
import { ingestFeeds } from "./feeds";
import { resolveLogo } from "./logo";

export { filterJob } from "./filter";
export { enrich, extractSkills, classifyCategory, extractBenefits, parseSalary, formatSalary } from "./enrich";
export { ingestAll, ADAPTERS } from "./ingest";
export { dedupeRaw } from "./dedupe";
export { resolveLogo, placeholderLogo } from "./logo";

const DAY = 24 * 60 * 60 * 1000;

export interface PipelineReport {
  fetched: number;
  deduped: number;
  accepted: number;
  rejected: number;
  jobs: Job[];
  rejections: { title: string; company: string; reason: string }[];
}

/**
 * Convert a single accepted RawJob into a published Job record
 * (runs Stage C enrichment). `slugSeed` keeps slugs deterministic in tests.
 */
export function toPublishedJob(raw: RawJob, opts: { slugSeed?: number } = {}): Job {
  const enriched = enrich(raw);
  const postedAt = raw.posted_at ? new Date(raw.posted_at) : new Date();
  const expiresAt = new Date(postedAt.getTime() + 60 * DAY); // spec: +60 days
  const companySlug = slugify(raw.company_name);
  // external_id is "provider:token:atsJobId" — recover the parts for liveness.
  const [, boardToken, ...idParts] = raw.external_id.split(":");
  const atsJobId = idParts.join(":");
  // Deterministic slug so the same posting keeps a stable URL across re-fetches.
  const slugSeed = opts.slugSeed ?? stableSuffix(raw.external_id);

  return {
    id: raw.external_id,
    slug: jobSlug(raw.title, raw.company_name, slugSeed),
    title: raw.title,
    company_name: raw.company_name,
    company_slug: companySlug,
    company_logo: raw.company_logo || resolveLogo({ domain: raw.company_domain, name: raw.company_name }),
    company_domain: raw.company_domain,
    description_html: sanitizeDescription(raw.description_html || ""),
    apply_url: raw.apply_url,
    posted_at: postedAt.toISOString(),
    expires_at: expiresAt.toISOString(),
    location: "Anywhere in the World",
    employment_type: raw.employment_type || "Full-Time",
    salary: enriched.salary,
    category: enriched.category,
    skills: enriched.skills,
    benefits: enriched.benefits,
    is_featured: false,
    source: "ats",
    provider: raw.provider,
    board_token: boardToken || undefined,
    ats_job_id: atsJobId || undefined,
    status: "published",
    is_active: true,
    verified: true, // cleared the worldwide filter in this pipeline
    interest: baselineInterest(raw.external_id),
    in_demand: baselineInterest(raw.external_id) >= IN_DEMAND_THRESHOLD,
  };
}

/**
 * Run the full pipeline over a set of raw jobs (Stages B + C + dedupe).
 * Kept separate from network ingest so it is trivially unit-testable.
 */
export function runPipeline(rawJobs: RawJob[]): PipelineReport {
  const deduped = dedupeRaw(rawJobs);
  const jobs: Job[] = [];
  const rejections: PipelineReport["rejections"] = [];

  for (const raw of deduped) {
    const verdict = filterJob(raw);
    if (!verdict.accepted) {
      rejections.push({ title: raw.title, company: raw.company_name, reason: verdict.reason });
      continue;
    }
    jobs.push(toPublishedJob(raw));
  }

  return {
    fetched: rawJobs.length,
    deduped: deduped.length,
    accepted: jobs.length,
    rejected: rejections.length,
    jobs,
    rejections,
  };
}

/**
 * End-to-end: poll ATS boards for the allow-list AND the remote-job aggregator
 * feeds, then run the pipeline (filter + enrich + dedupe) over everything.
 */
export async function ingestAndProcess(companies: Company[]): Promise<PipelineReport> {
  const [atsRaw, feedRaw] = await Promise.all([ingestAll(companies), ingestFeeds()]);
  return runPipeline([...atsRaw, ...feedRaw]);
}

/** Exposed for tests / admin tooling. */
export { toText };
