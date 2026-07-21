/**
 * Live job store.
 *
 * The source of truth is LIVE ATS data: on demand it polls the company
 * allow-list, runs the ingestion pipeline, and caches the accepted jobs for a
 * short TTL. This is what makes apply links real and keeps the board current —
 * a posting removed upstream simply stops appearing on the next refresh
 * ("auto-unpublish", spec section 8).
 *
 * If live fetching is disabled (ANYWHERE_LIVE=false) or fails/returns nothing
 * (offline, blocked network), it falls back to the bundled seed so the app
 * still renders. `db.ts` is the only consumer.
 */
import type { Company, Job, RawJob } from "./types";
import { ingestAndProcess, toPublishedJob } from "./pipeline";
import { resolveLogo } from "./pipeline/logo";
import companiesSeed from "./seed/companies.json";
import rawSeedJobs from "./seed/raw-jobs.json";

const TTL_MS = Number(process.env.ANYWHERE_CACHE_TTL_MS ?? 30 * 60 * 1000); // 30 min
const LIVE_ENABLED = process.env.ANYWHERE_LIVE !== "false";

/** IDs promoted to paid/featured placements (spec: manual). Seed-only demo. */
const FEATURED_IDS = new Set(["seed:gitlab:1", "seed:close:8"]);

export const companies: Company[] = (companiesSeed as Company[]).map((c) => ({
  ...c,
  logo: c.logo || resolveLogo({ domain: c.domain, name: c.name }),
}));

function withOverrides(jobs: Job[]): Job[] {
  const now = Date.now();
  return jobs
    .map((job) => ({ ...job, is_featured: FEATURED_IDS.has(job.id) || job.is_featured }))
    .filter((job) => new Date(job.expires_at).getTime() > now); // expiry handling
}

function processSeed(): Job[] {
  return withOverrides(
    (rawSeedJobs as RawJob[]).map((raw, i) => {
      const job = toPublishedJob(raw, { slugSeed: 1000 + i });
      return { ...job, is_featured: FEATURED_IDS.has(raw.external_id) };
    })
  );
}

interface Cache {
  jobs: Job[];
  at: number;
  live: boolean;
}
let cache: Cache | null = null;
let inflight: Promise<Job[]> | null = null;

async function refresh(): Promise<Job[]> {
  if (LIVE_ENABLED) {
    try {
      const report = await ingestAndProcess(companies);
      const jobs = withOverrides(report.jobs);
      if (jobs.length > 0) {
        console.log(`[store] live ingest ok: ${jobs.length} jobs (from ${report.fetched} fetched).`);
        cache = { jobs, at: Date.now(), live: true };
        return jobs;
      }
      console.warn(`[store] live ingest returned 0 jobs (fetched ${report.fetched}) — using seed. Check network access to ATS APIs.`);
    } catch (err) {
      console.warn("[store] live ingest failed — using seed:", (err as Error)?.message);
    }
  } else {
    console.log("[store] ANYWHERE_LIVE=false — using seed data.");
  }
  const seed = processSeed();
  cache = { jobs: seed, at: Date.now(), live: false };
  return seed;
}

/** All active jobs, from cache when fresh, else a (de-duplicated) refresh. */
export async function loadJobs(): Promise<Job[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.jobs;
  if (!inflight) {
    inflight = refresh().finally(() => {
      inflight = null;
    });
  }
  return inflight;
}

/** Whether the current data came from live ATS boards (vs. seed fallback). */
export async function isLive(): Promise<boolean> {
  await loadJobs();
  return cache?.live ?? false;
}

/** Force a fresh pull (used by the cron endpoint). */
export async function forceRefresh(): Promise<Job[]> {
  cache = null;
  return loadJobs();
}
