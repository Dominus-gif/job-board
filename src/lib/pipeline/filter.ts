import type { FilterResult, JobScope, RawJob } from "../types";
import { ANYWHERE_LOCATION_TOKENS, ANYWHERE_SIGNALS, DISQUALIFYING_PHRASES, ONSITE_PHRASES, REMOTE_SIGNALS } from "./dictionaries";
import { containsPhrase, firstMatch, toText } from "./text";
import { applicantAreas } from "../seo/job-location";

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
  if (worldwide.accepted) {
    // The filter reads the location and the description. A title like
    // "Senior Sales Engineer - UK" says the rest.
    const titled = titleNamesRegion(job.title);
    if (titled) return { scope: "regional", region: titled, reason: `Title names a place ("${titled}").` };
    // So does a location line that names one. The filter accepts on a global
    // phrase anywhere in the record, and employers put "work from anywhere" or
    // "anywhere in the world" in the company copy of every posting, so on 26
    // October 2026 91 of the 255 roles it accepted from the ATS feeds were
    // located "Remote, AMER", "North America", "Remote, APAC" or "Spain":
    // Supabase's "Customer Solution Architect (AU, NZ, SG)" among them. The
    // location is the employer's statement about this role; the company copy
    // is about the company.
    const places = applicantAreas(job.location_raw || "", "regional");
    if (places.length) {
      const region = (job.location_raw || "").trim().replace(/\s*;\s*/g, " · ");
      return { scope: "regional", region, reason: `Location names a place (${places.map((p) => p.name).join(", ")}).` };
    }
    return { scope: "worldwide", reason: worldwide.reason };
  }

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
  /\b(?:\d\+?\s*days?\s*(?:a|per)\s*week\s*(?:in|at)\s*(?:the\s*)?office|in[- ]office\s*\d\s*days?|hybrid\s*(?:work\s*model|schedule|setup)|must\s*be\s*(?:able\s*to\s*)?commute|within\s*commuting\s*distance|relocation\s*(?:is\s*)?required)\b/i;

/**
 * "Hybrid role" only when the sentence goes on to say where or how often. On
 * its own it as often means a job of two halves: "a genuinely hybrid role:
 * you'll build detection systems while also owning…", "this hybrid role will
 * focus on both commercial and consumer insights".
 */
const HYBRID_ROLE =
  /\bhybrid\s*(?:role|position)\b(?=[^.]{0,80}\b(?:office|onsite|on-site|in[- ]person|days?\s*(?:a|per)\s*week|based\s*(?:in|at|out\s*of)|located\s*(?:in|at)|commut))/i;

/*
 * The forms the statement above missed, found by running it over the
 * employers' full postings rather than the 500-character excerpts the board
 * stores. OpenAI's "hybrid work model of 3 days in the office" was caught only
 * once the whole text was read; these were not caught at all:
 *
 *   "hybrid working from our London office"
 *   "work onsite in our Guatemala City (Zone 10) office, Monday-Friday"
 *   "This is an in-person role. Our team comes together in the office Monday
 *    through Thursday"
 *   "in our Shoreditch office 3 days a week"
 *
 * Each still needs an attendance statement: a place of work that is an
 * office, a count of days, or the employer's own workplace tag. So "you're
 * welcome to use our Berlin office", "we meet in person at our annual
 * retreat" and "hybrid cloud" all stay untouched.
 */
const DAYS = String.raw`(?:\d|one|two|three|four|five)\+?\s*days?\s*(?:a|per|each)\s*week`;
const OFFICE_PLACE = String.raw`(?:the\s*|our\s*)?(?:[\w'’&.()-]+\s+){0,4}?(?:office|offices|hq|headquarters|studio|hub|campus)\b`;
const MORE_OFFICE_STATEMENTS: RegExp[] = [
  // "3 days a week in our London office", "two days per week at our NYC HQ"
  new RegExp(String.raw`\b${DAYS}\s*(?:in|at|from)\s*${OFFICE_PLACE}`, "i"),
  // "our Shoreditch office 3 days a week", "onsite 2 days a week", "in-office three days"
  new RegExp(String.raw`\b(?:office|hq|headquarters|onsite|on-site|in[- ]office)\s*${DAYS}`, "i"),
  new RegExp(String.raw`\bin[- ]office\s*(?:one|two|three|four|five)\s*days?\b`, "i"),
  // "hybrid working policy", "on a hybrid basis", "a hybrid arrangement"
  /\bhybrid\s*(?:work(?:ing)?\s*(?:model|policy|arrangement|schedule|setup|pattern|environment)|job|arrangement|basis)\b/i,
  // "hybrid working from our London office"
  new RegExp(String.raw`\bhybrid\s*work(?:ing)?\s*(?:from|at|in)\s*${OFFICE_PLACE}`, "i"),
  // "work onsite in our Guatemala City (Zone 10) office", "based on-site at our campus"
  new RegExp(String.raw`\b(?:work|working|based|located)\s*(?:onsite|on-site|on\s*site|in[- ]office|in[- ]person)\s*(?:in|at|from|out\s*of)\s*${OFFICE_PLACE}`, "i"),
  // "required to work from our Austin office", "expected to be in the office",
  // but not "if the posting is specified as onsite, you are required to work
  // from an office", which is boilerplate about other postings.
  new RegExp(String.raw`(?<!\bif\b[^.;]{0,80})\b(?:required|expected)\s*to\s*(?:work|be)\s*(?:from|in|at)\s*${OFFICE_PLACE}`, "i"),
  // "This is an in-person role", but not "you prefer an in-person role over remote"
  /\b(?:this|it|the\s*role|the\s*position)\s*is\s*an?\s*(?:fully\s*)?in[- ]person\s*(?:role|position|job)\b/i,
  // "in the office Monday through Thursday", "in our Paris office, Monday to Friday"
  new RegExp(
    String.raw`\b(?:in|at)\s*${OFFICE_PLACE},?\s*(?:on\s*)?(?:monday|tuesday|wednesday)s?\s*(?:through|to|thru|-|–|and)\s*(?:wednesday|thursday|friday)s?\b`,
    "i",
  ),
  // "work Tuesdays through Thursdays from our HQ"
  new RegExp(
    String.raw`\b(?:monday|tuesday|wednesday)s?\s*(?:through|to|thru|-|–|and)\s*(?:wednesday|thursday|friday)s?\s*(?:from|in|at)\s*${OFFICE_PLACE}`,
    "i",
  ),
];

/**
 * "Fully remote or hybrid position" offers remote work; it is not an
 * attendance requirement. Read naively it trips "hybrid position" and would
 * have dropped one of the few work-from-anywhere roles on the board.
 */
const REMOTE_ALTERNATIVE = /\b(?:fully\s+)?remote\s*(?:or|\/|and)\s*hybrid\b|\bhybrid\s*(?:or|\/)\s*(?:fully\s+)?remote\b/g;

/**
 * The workplace tags employers add to their own postings for LinkedIn. They
 * are set per posting and usually agree with the location ("#LI-Remote" on a
 * "Remote U.S." role, "#LI-Hybrid" on the Dublin one at the same company), so
 * an onsite or hybrid tag is the employer's own statement. It does not count
 * when the same posting also carries a remote tag, or when the location says
 * remote: one employer stamps "#LI-Onsite" on every posting, its remote ones
 * included.
 */
const OFFICE_TAG = /#li-(?:onsite|hybrid)\b/i;
const REMOTE_TAG = /#li-remote\b/i;

/**
 * The description states an attendance requirement.
 *
 * Pass the location when you have it: a location line that itself offers
 * remote work ("Remote, US", "New York, NY / Remote") wins over the
 * description. Run over the employers' full postings, those listings mostly
 * tripped on company-wide copy ("we operate a hybrid work model with offices
 * in 8 cities") or on terms for people who live near an office ("employees
 * local to NYC are expected in Tuesday to Thursday"), neither of which is a
 * condition on the role being offered.
 */
export function descriptionRequiresOffice(html: string | undefined | null, location?: string | null): boolean {
  if (REMOTE_OPTION.test(String(location || ""))) return false;
  const text = toText(String(html || "")).replace(REMOTE_ALTERNATIVE, "remote");
  if (OFFICE_STATEMENT.test(text) || HYBRID_ROLE.test(text) || MORE_OFFICE_STATEMENTS.some((re) => re.test(text))) return true;
  return OFFICE_TAG.test(text) && !REMOTE_TAG.test(text);
}

/** Either test, for callers that have the whole record. */
export function statesOfficeRequirement(location: string | undefined | null, descriptionHtml?: string | null): boolean {
  return locationRequiresOffice(location) || descriptionRequiresOffice(descriptionHtml, location);
}


/* -------------------------------------------------------------------------- */
/* Titles that name a place                                                    */
/* -------------------------------------------------------------------------- */

/**
 * The region a job title restricts the role to, or null.
 *
 * The worldwide filter reads the location field and the description, so a
 * listing whose ATS location says "Remote - Global" passes even when its own
 * title says otherwise. 28 of 232 roles on the worldwide board were titled
 * "Senior Sales Engineer - UK", "Account Executive (EMEA)", "Payroll Specialist
 * Lead - France" or "IoT Solutions Architecture Manager (Americas only)". Those
 * pages are the ones we ask Google to index, and they contradict the promise
 * the board is built on.
 *
 * Only unambiguous tokens are listed. Short forms are matched case-sensitively,
 * so "US" and "UK" do not fire on ordinary words, and country names that double
 * as personal names (Jordan, Georgia, Chad) are left out entirely: a false
 * positive here quietly demotes a genuinely global role.
 */
const REGION_TOKENS: [RegExp, string][] = [
  // Multi-country regions, as employers write them.
  [/\bEMEA\b/, "EMEA"],
  [/\bAPAC\b/, "Asia-Pacific"],
  [/\bLATAM\b/, "Latin America"],
  [/\bAMER\b/, "Americas"],
  [/\bANZ\b/, "Australia & New Zealand"],
  [/\bDACH\b/, "DACH"],
  [/\bMENA\b/, "Middle East & North Africa"],
  [/\bBenelux\b/i, "Benelux"],
  [/\bNordics?\b/i, "Nordics"],
  [/\bEastern Europe\b/i, "Eastern Europe"],
  [/\bWestern Europe\b/i, "Western Europe"],
  [/\bNorth America\b/i, "North America"],
  [/\bLatin America\b/i, "Latin America"],
  [/\bSouth America\b/i, "South America"],
  [/\bMiddle East\b/i, "Middle East"],
  [/\bAmericas\b/i, "Americas"],
  [/\bEurope(?:an)?\b/i, "Europe"],
  [/\bAfrica\b/i, "Africa"],
  // Countries and the forms that appear in titles.
  [/\bUnited States\b/i, "United States"],
  [/\bUnited Kingdom\b/i, "UK"],
  [/\b(?:USA|U\.S\.A?\.?)\b/, "United States"],
  [/\bUS\b/, "United States"],
  [/\bUK\b/, "UK"],
  [/\bUAE\b/, "UAE"],
  [/\bCanada\b/i, "Canada"],
  [/\bIndia\b/i, "India"],
  [/\bFrance\b/i, "France"],
  [/\bGermany\b/i, "Germany"],
  [/\bSpain\b/i, "Spain"],
  [/\bPortugal\b/i, "Portugal"],
  [/\bItaly\b/i, "Italy"],
  [/\bIreland\b/i, "Ireland"],
  [/\bNetherlands\b/i, "Netherlands"],
  [/\bBelgium\b/i, "Belgium"],
  [/\bPoland\b/i, "Poland"],
  [/\bRomania\b/i, "Romania"],
  [/\bSweden\b/i, "Sweden"],
  [/\bNorway\b/i, "Norway"],
  [/\bDenmark\b/i, "Denmark"],
  [/\bFinland\b/i, "Finland"],
  [/\bSwitzerland\b/i, "Switzerland"],
  [/\bAustria\b/i, "Austria"],
  [/\bAustralia\b/i, "Australia"],
  [/\bNew Zealand\b/i, "New Zealand"],
  [/\bJapan\b/i, "Japan"],
  [/\bSingapore\b/i, "Singapore"],
  [/\bBrazil\b/i, "Brazil"],
  [/\bMexico\b/i, "Mexico"],
  [/\bArgentina\b/i, "Argentina"],
  [/\bColombia\b/i, "Colombia"],
  [/\bPhilippines\b/i, "Philippines"],
  [/\bNigeria\b/i, "Nigeria"],
  [/\bKenya\b/i, "Kenya"],
  [/\bSouth Africa\b/i, "South Africa"],
  [/\bIsrael\b/i, "Israel"],
  // Cities only where the city implies the country beyond doubt.
  [/\bLondon\b/i, "UK"],
  [/\bBerlin\b/i, "Germany"],
  [/\bBangalore\b|\bBengaluru\b/i, "India"],
  [/\bToronto\b/i, "Canada"],
  [/\bSydney\b/i, "Australia"],
  [/\bDubai\b/i, "UAE"],
];

export function titleNamesRegion(title: string | undefined | null): string | null {
  const t = String(title || "");
  if (!t) return null;
  for (const [re, label] of REGION_TOKENS) if (re.test(t)) return label;
  return null;
}
