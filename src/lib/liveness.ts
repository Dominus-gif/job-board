import type { Job } from "./types";

/**
 * Liveness.
 *
 * We TRUST THE FEED: a job is "live" as long as it's present in the current
 * ingest. The scheduler re-scrapes every source hourly and drops any posting
 * that's gone, so removed jobs disappear automatically — and a job that isn't
 * in the store renders the "not active anymore" page (handled in the job route,
 * where `getJobBySlug` returns undefined).
 *
 * We deliberately do NOT re-query each ATS single-posting endpoint on every job
 * view: that hammered the ATS APIs (triggering rate-limits that then broke the
 * main ingest) and produced false "no longer accepting" states. Keeping this as
 * a one-liner makes it trivial to re-enable a stricter check later if needed.
 */
export async function verifyJobLive(_job: Job): Promise<boolean> {
  return true;
}
