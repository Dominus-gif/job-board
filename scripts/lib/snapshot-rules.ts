/**
 * What gets into snapshot.json, the ATS half of the board. Kept apart from
 * build-snapshot.ts, which runs an ingest the moment it is imported, so the
 * rules can be tested.
 */
import { atsAddress } from "../../src/lib/ats-address";
import { plainTextOf } from "../../src/lib/seo/description-completeness";

/**
 * Platforms whose board API hands the ingest the whole posting: Greenhouse's
 * `content=true`, Ashby's `descriptionHtml`, and Lever's parts, which the
 * adapter puts back together. SmartRecruiters' board endpoint carries no
 * description at all, so its roles still need a capture.
 */
const WHOLE_POSTING_PROVIDERS = new Set(["greenhouse", "ashby", "lever"]);

/** Below this a "posting" is more likely an error page than a job, as in src/lib/job-description.ts. */
export const MIN_FEED_CHARS = 400;

/**
 * The feed's own text, for a role nothing has captured.
 *
 * Why this exists: from 7 October to 26 October 2026 the snapshot could not be
 * rewritten at all. Only captured roles survived dropIncompleteDescriptions,
 * and the capture sweep (verify-and-enrich.ts) only captures listings already
 * on the board, so a role new to the feed, or one that had expired and come
 * back, never got a capture and never got in. Each fresh ingest came out at a
 * few hundred roles against a floor set by the old file, the old file was
 * kept, and its roles expired one by one: Canonical went from 141 roles to 24
 * while its own board had 314 open, and the work-from-anywhere board from about
 * 190 to 61 while the feeds held 282.
 *
 * A capture was never what made these pages complete. The job page fetches the
 * employer's whole posting at render time from the same API (see
 * job-description.ts), so a role on an addressable board whose ingest already
 * returned the whole posting is in the same position as a captured one.
 */
export function feedPosting(job: { provider?: string; apply_url: string; description_html: string }): string | null {
  if (!job.provider || !WHOLE_POSTING_PROVIDERS.has(job.provider)) return null;
  if (!atsAddress(job.apply_url)) return null; // the page could not fetch it to render
  return plainTextOf(job.description_html).length >= MIN_FEED_CHARS ? job.description_html : null;
}

/**
 * Still open, by the board's 60-day rule.
 *
 * The runtime drops expired roles anyway, but they used to be written to the
 * snapshot, and they counted towards its floor: on 26 October the committed
 * file held 578 roles, 328 of them already expired, so every fresh run had to
 * reach 404 to be accepted. Counting only open roles keeps the floor about what
 * the site actually shows.
 */
export function isOpen(job: { expires_at: string }, now = Date.now()): boolean {
  return Date.parse(job.expires_at) > now;
}
