/**
 * Job store.
 *
 * Reliability model (works on ephemeral serverless like Vercel):
 *   1. A build-time SNAPSHOT of every job (generated/snapshot.json) is the
 *      always-available baseline — bundled with the deployment, so a fresh
 *      serverless instance instantly has the full list and never collapses to
 *      the 10-job seed.
 *   2. loadJobs() returns cached/baseline data IMMEDIATELY and refreshes live in
 *      the background — a page render never blocks on (or fails because of) a
 *      slow live scrape.
 *   3. Live scrapes upgrade the cache when they succeed (real apply links, fresh
 *      listings); on failure the baseline/last-good data is kept.
 *
 * `db.ts` is the only consumer.
 */
import type { Company, Job, RawJob } from "./types";
import { ingestAndProcess, toPublishedJob } from "./pipeline";
import { resolveLogo } from "./pipeline/logo";
import companiesSeed from "./seed/companies.json";
import rawSeedJobs from "./seed/raw-jobs.json";
import snapshotJobs from "./generated/snapshot.json";
import { NORDHARTON_COMPANY, NORDHARTON_JOBS } from "./seed/nordharton";

const TTL_MS = Number(process.env.ANYWHERE_CACHE_TTL_MS ?? 30 * 60 * 1000); // 30 min
const LIVE_ENABLED = process.env.ANYWHERE_LIVE !== "false";
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

/** IDs promoted to paid/featured placements (spec: manual). Seed-only demo. */
const FEATURED_IDS = new Set(["seed:gitlab:1", "seed:close:8"]);

export const companies: Company[] = [...(companiesSeed as Company[]), NORDHARTON_COMPANY].map((c) => ({
  ...c,
  logo: resolveLogo({ domain: c.domain, name: c.name }),
}));

/**
 * Always-present, hand-curated featured jobs (e.g. NordHarton). Merged into the
 * baseline and every live result so they never depend on a scrape and stay
 * pinned. Kept separate from the ATS allow-list so ingest never tries to fetch
 * a board for them.
 */
const MANUAL_JOBS: Job[] = [...NORDHARTON_JOBS];

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

/**
 * Always-available baseline: the build-time snapshot of real jobs, or (if the
 * snapshot is empty, e.g. the build had no network) the small bundled seed.
 */
const snapshot = withOverrides([...MANUAL_JOBS, ...(snapshotJobs as Job[])]);
const baseline: Job[] = snapshot.length > 0 ? snapshot : withOverrides([...MANUAL_JOBS, ...processSeed()]);

interface Cache {
  jobs: Job[];
  at: number;
  live: boolean;
}
let cache: Cache | null = null;
let inflight: Promise<Job[]> | null = null;
let lastGoodLive: Job[] | null = null;

const RETRY_MS = 3 * 60 * 1000; // after a failed/empty live pull, retry in ~3 min

// Age a cache entry so it expires after `ms` instead of the full TTL.
function agedAt(ms: number): number {
  return Date.now() - TTL_MS + ms;
}

/** Perform an actual live scrape; keep baseline/last-good on failure. */
async function refresh(): Promise<Job[]> {
  if (LIVE_ENABLED) {
    try {
      const report = await ingestAndProcess(companies);
      const jobs = withOverrides([...MANUAL_JOBS, ...report.jobs, ...report.regional]);
      if (jobs.length > 0) {
        console.log(`[store] live ingest ok: ${report.jobs.length} worldwide + ${report.regionalCount} regional (from ${report.fetched} fetched).`);
        lastGoodLive = jobs;
        cache = { jobs, at: Date.now(), live: true };
        return jobs;
      }
      console.warn(`[store] live ingest returned 0 jobs (fetched ${report.fetched}) — keeping baseline.`);
    } catch (err) {
      console.warn("[store] live ingest failed — keeping baseline:", (err as Error)?.message);
    }
  }
  // Never downgrade to the tiny seed: keep last-good-live, else the snapshot.
  const fallback = lastGoodLive ?? baseline;
  cache = { jobs: fallback, at: agedAt(RETRY_MS), live: !!lastGoodLive };
  return fallback;
}

/** Kick a background live refresh (non-blocking); at most one at a time. */
function scheduleBackgroundRefresh(): void {
  if (!LIVE_ENABLED || IS_BUILD || inflight) return;
  inflight = refresh().finally(() => {
    inflight = null;
  });
}

/**
 * Return jobs immediately (cache → last-good → snapshot), and refresh live in
 * the background. Never blocks a request on a live scrape, so a slow/failed
 * scrape can't collapse the board or time out a serverless function.
 */
export async function loadJobs(): Promise<Job[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.jobs;

  // At build time, block on a live scrape so prerendered pages get full, fresh
  // data (with complete descriptions). If it fails, refresh() falls back to the
  // snapshot, so the build still succeeds.
  if (IS_BUILD) {
    if (!inflight) inflight = refresh().finally(() => { inflight = null; });
    return inflight;
  }

  // At runtime, serve the snapshot/last-good immediately and refresh live in the
  // background — never block a request on a scrape (this is what previously let
  // a slow/failed scrape collapse the board to seed on Vercel).
  if (!cache) cache = { jobs: lastGoodLive ?? baseline, at: agedAt(RETRY_MS), live: !!lastGoodLive };
  scheduleBackgroundRefresh();
  return cache.jobs;
}

/** Whether the current data came from a live scrape (vs. the snapshot). */
export async function isLive(): Promise<boolean> {
  await loadJobs();
  return cache?.live ?? false;
}

/** Force a blocking live pull (used by the cron endpoint and the scheduler). */
export async function forceRefresh(): Promise<Job[]> {
  if (!inflight) {
    inflight = refresh().finally(() => {
      inflight = null;
    });
  }
  return inflight;
}
