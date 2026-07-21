import type { RawJob } from "../types";
import { slugify } from "../slug";

/**
 * Deduplicate raw jobs across sources before publishing (spec section 3).
 * Two jobs collide when they share the same normalized (company + title).
 * The first occurrence wins; later duplicates are dropped.
 */
export function dedupeRaw(jobs: RawJob[]): RawJob[] {
  const seen = new Set<string>();
  const out: RawJob[] = [];
  for (const job of jobs) {
    const key = `${slugify(job.company_name)}::${slugify(job.title)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(job);
  }
  return out;
}
