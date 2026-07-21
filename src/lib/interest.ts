/**
 * Candidate interest signal.
 *
 * When enough people show interest in a listing it gets promoted ("In demand")
 * and floated toward the top — a free, organic counterpart to paid featuring.
 *
 * Runtime interest lives in-memory (demo). Each job also carries a deterministic
 * baseline so the feature is visible immediately without waiting for clicks; the
 * README documents swapping this for a persisted counter.
 */
const runtime = new Map<string, number>();

/** Interest above this (baseline + clicks) marks a listing "In demand". */
export const IN_DEMAND_THRESHOLD = 25;

/** Stable baseline interest for a job, derived from its id (0–44). */
export function baselineInterest(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = (h ^ id.charCodeAt(i)) * 16777619;
  return Math.abs(h) % 45;
}

/** Register one new interest click; returns the new runtime count. */
export function addInterest(slug: string): number {
  const n = (runtime.get(slug) ?? 0) + 1;
  runtime.set(slug, n);
  return n;
}

export function runtimeInterest(slug: string): number {
  return runtime.get(slug) ?? 0;
}
