import type { FilterResult, RawJob } from "../types";
import { ANYWHERE_LOCATION_TOKENS, ANYWHERE_SIGNALS, DISQUALIFYING_PHRASES } from "./dictionaries";
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
