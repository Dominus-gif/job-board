import type { FilterResult, JobScope, RawJob } from "../types";
import { ANYWHERE_LOCATION_TOKENS, ANYWHERE_SIGNALS, DISQUALIFYING_PHRASES, ONSITE_PHRASES, REMOTE_SIGNALS } from "./dictionaries";
import { containsPhrase, firstMatch, toText } from "./text";

/**
 * Stage B — the "Work From Anywhere" filter (spec section 3B).
 *
 * Rule of thumb: PRECISION OVER RECALL. The entire brand promise is that every
 * listing is truly location-independent, so when in doubt we reject.
 *
 * Decision order:
 *   1. Any disqualifying phrase (location OR description) => REJECT.
 *   2. An explicit "anywhere" signal (location OR description) => ACCEPT.
 *   3. A clean anywhere-location token with no disqualifiers => ACCEPT.
 *   4. Otherwise (ambiguous) => REJECT.
 */
export function filterJob(job: RawJob): FilterResult {
  const location = (job.location_raw || "").toLowerCase().trim();
  const descText = toText(job.description_html || "");
  const haystack = `${location} \n ${descText}`;

  // 1. Hard disqualifiers anywhere in the record.
  const disqualifier = firstMatch(haystack, DISQUALIFYING_PHRASES);
  if (disqualifier) {
    return {
      accepted: false,
      reason: `Disqualified: found location/timezone restriction "${disqualifier}".`,
      matched: disqualifier,
    };
  }

  // 2. Explicit positive "work from anywhere" signal.
  const signal = firstMatch(haystack, ANYWHERE_SIGNALS);
  if (signal) {
    return {
      accepted: true,
      reason: `Accepted: explicit global-remote signal "${signal}".`,
      matched: signal,
    };
  }

  // 3. Location field alone reads as anywhere (and nothing disqualified above).
  const locToken = ANYWHERE_LOCATION_TOKENS.find((t) => containsPhrase(location, t) || location.includes(t));
  if (locToken) {
    return {
      accepted: true,
      reason: `Accepted: location field reads as global-remote ("${locToken}").`,
      matched: locToken,
    };
  }

  // 4. Ambiguous — reject to protect the brand promise.
  return {
    accepted: false,
    reason: "Rejected: no explicit worldwide signal and location is ambiguous.",
  };
}

export interface Classification {
  scope: JobScope | "rejected";
  region?: string; // for regional roles, the location/region string
  reason: string;
}

/**
 * Classify a job into three buckets:
 *   - "worldwide": passes the strict Work-From-Anywhere filter (main board).
 *   - "regional":  a genuinely remote role, but restricted to a country/region
 *                  (e.g. "Remote, US") — shown on the clearly-labelled regional board.
 *   - "rejected":  on-site/hybrid or not clearly remote — never shown.
 *
 * The worldwide bucket uses `filterJob` unchanged, so the main promise is intact.
 */
export function classifyJob(job: RawJob): Classification {
  const worldwide = filterJob(job);
  if (worldwide.accepted) return { scope: "worldwide", reason: worldwide.reason };

  const location = (job.location_raw || "").toLowerCase().trim();
  const descText = toText(job.description_html || "");
  const haystack = `${location} \n ${descText}`;

  // On-site / hybrid → not remote at all → rejected.
  const onsite = firstMatch(haystack, ONSITE_PHRASES);
  if (onsite) return { scope: "rejected", reason: `On-site/hybrid ("${onsite}").` };

  // Remote (per the location, description, or an inherently-remote feed source)
  // but region-locked → regional board.
  const feedProvider = ["remotive", "jobicy", "arbeitnow", "himalayas", "workingnomads", "remoteok"].includes(job.provider);
  const remote = feedProvider || firstMatch(haystack, REMOTE_SIGNALS);
  if (remote) {
    const region = (job.location_raw || "").trim().replace(/\s*;\s*/g, " · ") || "Remote";
    return { scope: "regional", region, reason: "Remote, but restricted to a region." };
  }

  return { scope: "rejected", reason: "Not clearly a remote role." };
}

/* -------------------------------------------------------------------------- */
/* Office-based listings that never went through classifyJob                   */
/* -------------------------------------------------------------------------- */

/**
 * A role whose own words put it in an office is not a remote job, and has no
 * business on either board.
 *
 * classifyJob already rejects these, but the hand-curated seeds in
 * scripts/build-curated.ts set their scope directly and so never met it. That
 * left 187 listings on the regional board saying "Hybrid - London", "SF Office"
 * or "3 days a week in the office" on a site whose whole promise is remote
 * work. None reached the worldwide board, which has its own stricter filter.
 *
 * Deliberately narrow. The location test needs an office word with no remote
 * option beside it, so "Montreal, QC (Remote/Hybrid)" and "… (Hybrid); United
 * States (Remote)" stay: both offer a remote arrangement. The description test
 * wants an explicit statement of attendance, not a passing mention, so "hybrid
 * cloud" and "a hybrid approach to testing" are untouched.
 */
const OFFICE_WORD = /\b(hybrid|office|on[- ]?site|onsite|in[- ]?person)\b/i;
const REMOTE_OPTION = /\b(remote|anywhere|work from home|wfh|distributed|telecommute)\b/i;

/** The location names an office or a hybrid arrangement and offers no remote option. */
export function locationRequiresOffice(location: string | undefined | null): boolean {
  const s = String(location || "");
  return OFFICE_WORD.test(s) && !REMOTE_OPTION.test(s);
}

/** The description states an attendance requirement in so many words. */
const OFFICE_STATEMENT =
  /\b(?:\d\+?\s*days?\s*(?:a|per)\s*week\s*(?:in|at)\s*(?:the\s*)?office|in[- ]office\s*\d\s*days?|hybrid\s*(?:role|position|work\s*model|schedule|setup)|must\s*be\s*(?:able\s*to\s*)?commute|within\s*commuting\s*distance|relocation\s*(?:is\s*)?required)\b/i;

export function descriptionRequiresOffice(html: string | undefined | null): boolean {
  return OFFICE_STATEMENT.test(toText(String(html || "")));
}

/** Either test, for callers that have the whole record. */
export function statesOfficeRequirement(location: string | undefined | null, descriptionHtml?: string | null): boolean {
  return locationRequiresOffice(location) || descriptionRequiresOffice(descriptionHtml);
}
