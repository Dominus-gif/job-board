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
import { CURATED_JOBS } from "./seed/curated";
import { CURATED_ROLE_JOBS } from "./seed/curated-roles";

const TTL_MS = Number(process.env.ANYWHERE_CACHE_TTL_MS ?? 30 * 60 * 1000); // 30 min
const LIVE_ENABLED = process.env.ANYWHERE_LIVE !== "false";
const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

/** IDs promoted to paid/featured placements (spec: manual). Seed-only demo. */
const FEATURED_IDS = new Set(["seed:gitlab:1", "seed:close:8"]);

export const companies: Company[] = [...(companiesSeed as Company[]), NORDHARTON_COMPANY].map((c) => ({
  ...c,
  logo: resolveLogo({ domain: c.domain, name: c.name }),
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

/**
 * Always-present, hand-curated featured jobs (e.g. NordHarton). CRITICAL: these
 * are unioned into every served result *after* the live/baseline decision (see
 * `serve()`), and are NEVER counted when deciding whether a live scrape
 * succeeded or whether the snapshot is present. Counting them there once let a
 * fully-failed scrape look "successful" (length ≥ 3) and collapse the whole
 * board to just these few jobs. Kept out of the ATS allow-list so ingest never
 * fetches a board for them.
 */
const manualJobs: Job[] = withOverrides([...NORDHARTON_JOBS, ...CURATED_ROLE_JOBS, ...CURATED_JOBS]);

/** Union the always-on manual jobs onto a set of real (scraped/snapshot) jobs. */
function serve(realJobs: Job[]): Job[] {
  return [...manualJobs, ...realJobs];
}

/**
 * Always-available baseline of REAL jobs: the build-time snapshot, or (only if
 * the snapshot is genuinely empty) the small bundled seed. Manual jobs are NOT
 * part of the baseline — they're added at `serve()` time.
 */
const snapshot = withOverrides(snapshotJobs as Job[]);
const baseline: Job[] = snapshot.length > 0 ? snapshot : processSeed();

/**
 * Floor a live scrape must clear to REPLACE the baseline. A healthy scrape
 * returns ~1000 jobs; a partially-failed one (Vercel egress hiccup, ATS rate
 * limit, cold DNS) can return a handful. Accepting those would shrink the board,
 * so we only trust a live result that's at least half the baseline (min 100).
 * This — plus the committed snapshot — is what guarantees the board can never
 * collapse to a near-empty list again.
 */
const LIVE_FLOOR = Math.max(100, Math.floor(baseline.length * 0.5));

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
      const live = withOverrides([...report.jobs, ...report.regional]);
      // Only trust a live result that's comprehensive — never let a partial or
      // empty scrape replace the full baseline (this is the collapse guard).
      if (live.length >= LIVE_FLOOR) {
        console.log(`[store] live ingest ok: ${report.jobs.length} worldwide + ${report.regionalCount} regional (from ${report.fetched} fetched).`);
        lastGoodLive = live;
        cache = { jobs: live, at: Date.now(), live: true };
        return live;
      }
      console.warn(`[store] live ingest returned ${live.length} jobs (< floor ${LIVE_FLOOR}, fetched ${report.fetched}) — keeping baseline.`);
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
 * Real (scraped/snapshot) jobs, served immediately (cache → last-good →
 * snapshot) with a background live refresh. Never blocks a request on a live
 * scrape, so a slow/failed scrape can't collapse the board or time out a
 * serverless function. Manual jobs are added by the public `loadJobs()` wrapper.
 */
async function loadRealJobs(): Promise<Job[]> {
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

/** Public read: the real jobs plus the always-on manual (featured) jobs. */
export async function loadJobs(): Promise<Job[]> {
  return serve(await loadRealJobs());
}

/**
 * Every job the deployment has ever known (the raw build snapshot). Used to
 * surface listings that have since been removed/stopped on the archive page.
 */
export function getSnapshotPool(): Job[] {
  return snapshotJobs as Job[];
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
  return serve(await inflight);
}
