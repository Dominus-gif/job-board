/**
 * Location keyword matrix.
 *
 * One entry per EXISTING hub at /remote-jobs-in-<slug>. Nothing here creates a
 * URL — the whole point is the opposite. "work from home jobs nyc" and "remote
 * jobs new york" are the same search intent over the same listings, so giving
 * each its own page would be a set of near-duplicates competing with each other
 * (and reading as doorway pages). Instead every variant is covered ON the one
 * canonical hub: in its title, its description, its FAQ answers, and in the
 * anchor text that points at it from elsewhere on the site.
 *
 * `variants` are therefore phrases to cover, not routes to build. `aliases` are
 * the abbreviations people actually type. `match` is what lets a job listing
 * find its own city hub.
 */

export interface LocationSeo {
  /** Hub slug suffix — the page is `/remote-jobs-in-${slug}`. */
  slug: string;
  cityName: string;
  /** Abbreviations used in queries ("NYC", "SF"). May be empty. */
  aliases: string[];
  /** Search phrases this hub should cover on-page. First is the primary. */
  variants: string[];
  /** Matches a job's raw location string to this hub (listing-page backlink). */
  match?: RegExp;
}

export const LOCATION_SEO: LocationSeo[] = [
  {
    slug: "usa",
    cityName: "the United States",
    aliases: ["US", "USA"],
    variants: ["remote jobs usa", "work from home jobs usa", "remote jobs in the us", "fully remote jobs usa"],
    match: /united states|\busa\b|\bu\.s\.?\b|\bus\b/i,
  },
  {
    slug: "europe",
    cityName: "Europe",
    aliases: ["EU"],
    variants: ["remote jobs europe", "work from home jobs europe", "remote jobs in the eu", "fully remote jobs europe"],
    match: /\beurope\b|\beu\b|emea/i,
  },
  {
    slug: "uk",
    cityName: "the United Kingdom",
    aliases: ["UK"],
    variants: ["remote jobs uk", "work from home jobs uk", "work from home uk", "fully remote jobs uk"],
    match: /united kingdom|\buk\b|england|scotland|wales/i,
  },
  {
    slug: "germany",
    cityName: "Germany",
    aliases: ["DE"],
    variants: ["remote jobs germany", "work from home jobs germany", "remote jobs in germany"],
    match: /germany|deutschland/i,
  },
  {
    slug: "canada",
    cityName: "Canada",
    aliases: ["CA"],
    variants: ["remote jobs canada", "work from home jobs canada", "remote jobs in canada", "fully remote jobs canada"],
    match: /\bcanada\b/i,
  },
  {
    slug: "the-bay-area",
    cityName: "the Bay Area",
    aliases: ["SF", "San Francisco"],
    variants: [
      "remote jobs san francisco",
      "work from home jobs sf",
      "work from home san francisco",
      "remote jobs sf",
      "san francisco bay area remote jobs",
    ],
    match: /san francisco|bay area|palo alto|mountain view|menlo|santa clara|sunnyvale|cupertino|redwood|san jose|berkeley|oakland/i,
  },
  {
    slug: "new-york",
    cityName: "New York",
    aliases: ["NYC", "NY"],
    variants: [
      "remote jobs new york",
      "work from home jobs new york",
      "work from home jobs nyc",
      "work from home nyc",
      "remote jobs in nyc",
      "fully remote jobs new york",
    ],
    match: /new york|\bnyc\b|manhattan|brooklyn/i,
  },
  {
    slug: "london",
    cityName: "London",
    aliases: [],
    variants: ["remote jobs london", "work from home jobs london", "remote jobs in london", "fully remote jobs london"],
    match: /\blondon\b/i,
  },
  {
    slug: "berlin",
    cityName: "Berlin",
    aliases: [],
    variants: ["remote jobs berlin", "work from home jobs berlin", "remote jobs in berlin"],
    match: /berlin|munich|hamburg|frankfurt/i,
  },
  {
    slug: "amsterdam",
    cityName: "Amsterdam",
    aliases: ["NL"],
    variants: ["remote jobs amsterdam", "work from home jobs amsterdam", "remote jobs netherlands"],
    match: /amsterdam|netherlands|rotterdam|utrecht|the hague/i,
  },
  {
    slug: "japan",
    cityName: "Japan",
    aliases: [],
    variants: ["remote jobs japan", "work from home jobs japan", "remote jobs tokyo", "fully remote jobs japan"],
    match: /japan|tokyo|osaka|kyoto|yokohama/i,
  },
  {
    slug: "india",
    cityName: "India",
    aliases: [],
    variants: ["remote jobs india", "work from home jobs india", "work from home india", "fully remote jobs india"],
    match: /\bindia\b|mumbai|delhi|hyderabad|pune|chennai|gurgaon|noida/i,
  },
  {
    slug: "singapore",
    cityName: "Singapore",
    aliases: ["SG"],
    variants: ["remote jobs singapore", "work from home jobs singapore", "remote jobs in sg"],
    match: /singapore/i,
  },
  {
    slug: "australia",
    cityName: "Australia",
    aliases: ["AU"],
    variants: ["remote jobs australia", "work from home jobs australia", "remote jobs in australia"],
    match: /australia|sydney|melbourne|brisbane|perth/i,
  },
  {
    slug: "seattle",
    cityName: "Seattle",
    aliases: [],
    variants: ["remote jobs seattle", "work from home jobs seattle", "remote jobs in seattle", "fully remote seattle"],
    match: /seattle|bellevue|redmond|kirkland/i,
  },
  {
    slug: "toronto",
    cityName: "Toronto",
    aliases: ["GTA"],
    variants: ["remote jobs toronto", "work from home jobs toronto", "remote jobs in toronto"],
    match: /toronto|ontario|waterloo|ottawa/i,
  },
  {
    slug: "austin",
    cityName: "Austin",
    aliases: ["ATX"],
    variants: ["remote jobs austin", "work from home jobs austin", "remote jobs atx"],
    match: /austin/i,
  },
  {
    slug: "los-angeles",
    cityName: "Los Angeles",
    aliases: ["LA"],
    variants: ["remote jobs los angeles", "work from home jobs la", "remote jobs la", "work from home los angeles"],
    match: /los angeles|santa monica|pasadena|culver city|el segundo/i,
  },
  {
    slug: "chicago",
    cityName: "Chicago",
    aliases: [],
    variants: ["remote jobs chicago", "work from home jobs chicago", "remote jobs in chicago"],
    match: /chicago/i,
  },
  {
    slug: "boston",
    cityName: "Boston",
    aliases: [],
    variants: ["remote jobs boston", "work from home jobs boston", "remote jobs in boston"],
    match: /boston|cambridge, ma|somerville/i,
  },
  {
    slug: "vancouver",
    cityName: "Vancouver",
    aliases: ["YVR"],
    variants: ["remote jobs vancouver", "work from home jobs vancouver", "remote jobs in vancouver"],
    match: /vancouver/i,
  },
  {
    slug: "paris",
    cityName: "Paris",
    aliases: [],
    variants: ["remote jobs paris", "work from home jobs paris", "remote jobs france"],
    match: /paris|france/i,
  },
  {
    slug: "madrid",
    cityName: "Madrid",
    aliases: [],
    variants: ["remote jobs madrid", "work from home jobs madrid", "remote jobs spain", "remote jobs barcelona"],
    match: /madrid|barcelona|spain/i,
  },
  {
    slug: "dublin",
    cityName: "Dublin",
    aliases: [],
    variants: ["remote jobs dublin", "work from home jobs dublin", "remote jobs ireland"],
    match: /dublin|ireland/i,
  },
  {
    slug: "bengaluru",
    cityName: "Bengaluru",
    aliases: ["Bangalore", "BLR"],
    variants: ["remote jobs bengaluru", "work from home jobs bangalore", "remote jobs bangalore", "work from home bengaluru"],
    match: /bangalore|bengaluru/i,
  },
];

const BY_SLUG = new Map(LOCATION_SEO.map((l) => [l.slug, l]));

/**
 * Does a phrase use one of this location's abbreviations? Word-bounded on
 * purpose: "LA" appears inside "los angeles", and a substring test would call
 * "remote jobs los angeles" an abbreviation variant.
 */
const WORD_SPLIT = new RegExp("[^a-z0-9]+");

export function containsAlias(phrase: string, aliases: string[]): boolean {
  const lower = phrase.toLowerCase();
  const words = lower.split(WORD_SPLIT).filter(Boolean);
  return aliases.some((a) => {
    const alias = a.toLowerCase();
    // A multi-word alias ("San Francisco") is a phrase; a single one is a word,
    // compared against the split rather than searched for, so "LA" does not
    // match inside "los angeles".
    return alias.includes(" ") ? lower.includes(alias) : words.includes(alias);
  });
}

/** Look up the matrix entry for a hub slug ("new-york" or the full hub path). */
export function locationSeoFor(slug: string): LocationSeo | undefined {
  return BY_SLUG.get(slug.replace(/^remote-jobs-in-/, ""));
}

export const hubPath = (loc: LocationSeo) => `/remote-jobs-in-${loc.slug}`;

/** Title Case a variant phrase for use as a visible label. */
export function titleCaseVariant(phrase: string, loc: LocationSeo): string {
  const upper = new Set(["usa", "us", "uk", "eu", "sf", "nyc", "ny", "la", "sg", "au", "de", "nl", "ca", "atx", "gta", "yvr", "blr"]);
  return phrase
    .split(" ")
    .map((w) => (upper.has(w) ? w.toUpperCase() : w))
    .join(" ")
    .replace(/^./, (c) => c.toUpperCase());
}

/**
 * Ten locations for the homepage block, ordered by how much search volume the
 * phrase family tends to carry rather than by how many jobs we hold.
 */
export const TOP_LOCATION_SLUGS = [
  "usa",
  "new-york",
  "the-bay-area",
  "uk",
  "seattle",
  "canada",
  "london",
  "india",
  "austin",
  "los-angeles",
];

export interface LocationAnchor {
  href: string;
  /** Anchor text — an exact variant phrase, not a bare place name. */
  label: string;
  cityName: string;
}

/**
 * Anchors for the "Popular locations" block. Each hub appears twice: once under
 * its primary variant and once under an alternate, so the page sends both
 * phrasings rather than the same one repeatedly. Exact-match anchor text is the
 * part of this that actually moves a variant query.
 */
export function popularLocationAnchors(): LocationAnchor[] {
  const out: LocationAnchor[] = [];
  for (const slug of TOP_LOCATION_SLUGS) {
    const loc = BY_SLUG.get(slug);
    if (!loc) continue;
    const primary = loc.variants[0];
    // Prefer an abbreviation for the alternate ("work from home jobs nyc"): the
    // hub's own title and h1 never contain it, so a link is the only place that
    // phrasing exists. Falls back to a work-from-home phrasing, which the title
    // also lacks.
    const alt =
      loc.variants.find((v, i) => i > 0 && containsAlias(v, loc.aliases)) ??
      loc.variants.find((v, i) => i > 0 && v.startsWith("work from home")) ??
      loc.variants[1] ??
      primary;
    out.push({ href: hubPath(loc), label: titleCaseVariant(primary, loc), cityName: loc.cityName });
    if (alt !== primary) out.push({ href: hubPath(loc), label: titleCaseVariant(alt, loc), cityName: loc.cityName });
  }
  return out;
}

/**
 * The city hub a listing belongs to, or undefined for a worldwide role.
 * Ordered most-specific-first: a job in Seattle should reach the Seattle hub,
 * not the United States one, so cities are tested before their countries.
 */
const MATCH_ORDER = [...LOCATION_SEO].sort((a, b) => {
  const broad = new Set(["usa", "europe", "uk", "canada", "india", "australia", "japan", "germany"]);
  return Number(broad.has(a.slug)) - Number(broad.has(b.slug));
});

export function cityHubForLocation(location: string | undefined): LocationSeo | undefined {
  if (!location) return undefined;
  if (/anywhere|worldwide/i.test(location)) return undefined;
  return MATCH_ORDER.find((l) => l.match?.test(location));
}
