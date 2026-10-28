/**
 * Location checker for /tools/remote-job-location-checker.
 *
 * Reads the location line of a remote job ("Remote - EMEA", "US or Canada",
 * "UTC-3 to UTC+3") and answers one question: can someone in a given country
 * apply? Countries named in the line come from applicantAreas, the same
 * matcher the job pages use, so the tool and the board read a location the
 * same way. Region labels are expanded here, to country lists, because the
 * board only needs to know that "EMEA" is in Europe while a reader in Nigeria
 * needs to know it includes them.
 *
 * Region membership has a core and an edge. The core is uncontroversial
 * ("DACH" is Germany, Austria and Switzerland). The edge is where employers
 * genuinely differ: whether "Europe" includes Turkey, whether "North America"
 * includes Mexico, whether "EMEA" hires in Russia. An edge match is reported
 * as unclear rather than guessed.
 */
import { applicantAreas } from "../seo/job-location";

export interface Country {
  code: string;
  name: string;
}

/** Country names match the ones applicantAreas emits, so a named country maps back to its code. */
export const COUNTRIES: Country[] = [
  ["AF", "Afghanistan"], ["AL", "Albania"], ["DZ", "Algeria"], ["AD", "Andorra"], ["AO", "Angola"],
  ["AR", "Argentina"], ["AM", "Armenia"], ["AU", "Australia"], ["AT", "Austria"], ["AZ", "Azerbaijan"],
  ["BH", "Bahrain"], ["BD", "Bangladesh"], ["BY", "Belarus"], ["BE", "Belgium"], ["BJ", "Benin"],
  ["BO", "Bolivia"], ["BA", "Bosnia and Herzegovina"], ["BW", "Botswana"], ["BR", "Brazil"], ["BG", "Bulgaria"],
  ["KH", "Cambodia"], ["CM", "Cameroon"], ["CA", "Canada"], ["CL", "Chile"], ["CN", "China"],
  ["CO", "Colombia"], ["CR", "Costa Rica"], ["CI", "Côte d'Ivoire"], ["HR", "Croatia"], ["CU", "Cuba"],
  ["CY", "Cyprus"], ["CZ", "Czechia"], ["DK", "Denmark"], ["DO", "Dominican Republic"], ["EC", "Ecuador"],
  ["EG", "Egypt"], ["SV", "El Salvador"], ["EE", "Estonia"], ["ET", "Ethiopia"], ["FI", "Finland"],
  ["FR", "France"], ["GE", "Georgia"], ["DE", "Germany"], ["GH", "Ghana"], ["GR", "Greece"],
  ["GT", "Guatemala"], ["HN", "Honduras"], ["HK", "Hong Kong"], ["HU", "Hungary"], ["IS", "Iceland"],
  ["IN", "India"], ["ID", "Indonesia"], ["IR", "Iran"], ["IQ", "Iraq"], ["IE", "Ireland"],
  ["IL", "Israel"], ["IT", "Italy"], ["JM", "Jamaica"], ["JP", "Japan"], ["JO", "Jordan"],
  ["KZ", "Kazakhstan"], ["KE", "Kenya"], ["XK", "Kosovo"], ["KW", "Kuwait"], ["KG", "Kyrgyzstan"],
  ["LV", "Latvia"], ["LB", "Lebanon"], ["LT", "Lithuania"], ["LU", "Luxembourg"], ["MG", "Madagascar"],
  ["MY", "Malaysia"], ["MT", "Malta"], ["MU", "Mauritius"], ["MX", "Mexico"], ["MD", "Moldova"],
  ["MN", "Mongolia"], ["ME", "Montenegro"], ["MA", "Morocco"], ["MZ", "Mozambique"], ["NP", "Nepal"],
  ["NL", "Netherlands"], ["NZ", "New Zealand"], ["NI", "Nicaragua"], ["NG", "Nigeria"], ["MK", "North Macedonia"],
  ["NO", "Norway"], ["OM", "Oman"], ["PK", "Pakistan"], ["PS", "Palestine"], ["PA", "Panama"],
  ["PY", "Paraguay"], ["PE", "Peru"], ["PH", "Philippines"], ["PL", "Poland"], ["PT", "Portugal"],
  ["PR", "Puerto Rico"], ["QA", "Qatar"], ["RO", "Romania"], ["RU", "Russia"], ["RW", "Rwanda"],
  ["SA", "Saudi Arabia"], ["SN", "Senegal"], ["RS", "Serbia"], ["SG", "Singapore"], ["SK", "Slovakia"],
  ["SI", "Slovenia"], ["ZA", "South Africa"], ["KR", "South Korea"], ["ES", "Spain"], ["LK", "Sri Lanka"],
  ["SE", "Sweden"], ["CH", "Switzerland"], ["TW", "Taiwan"], ["TZ", "Tanzania"], ["TH", "Thailand"],
  ["TT", "Trinidad and Tobago"], ["TN", "Tunisia"], ["TR", "Turkey"], ["UG", "Uganda"], ["UA", "Ukraine"],
  ["AE", "United Arab Emirates"], ["GB", "United Kingdom"], ["US", "United States"], ["UY", "Uruguay"], ["UZ", "Uzbekistan"],
  ["VE", "Venezuela"], ["VN", "Vietnam"], ["ZM", "Zambia"], ["ZW", "Zimbabwe"],
].map(([code, name]) => ({ code, name }));

const BY_NAME = new Map(COUNTRIES.map((c) => [c.name, c.code]));
export const countryName = (code: string) => COUNTRIES.find((c) => c.code === code)?.name ?? code;

const EU = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE".split(" ");
const EUROPE_NON_EU = "GB IS NO CH AL BA ME MK RS XK MD UA AD".split(" ");
const EUROPE = [...EU, ...EUROPE_NON_EU];
const EUROPE_EDGE = "TR GE AM AZ RU BY".split(" ");
const MIDDLE_EAST = "AE SA QA KW BH OM JO LB IL IQ IR PS".split(" ");
const NORTH_AFRICA = "DZ EG MA TN".split(" ");
const SUB_SAHARAN = "AO BJ BW CM CI ET GH KE MG MU MZ NG RW SN ZA TZ UG ZM ZW".split(" ");
const LATAM = "MX GT HN SV NI CR PA CU DO PR CO VE EC PE BO BR PY UY AR CL".split(" ");
const SOUTHEAST_ASIA = "SG MY ID TH VN PH KH".split(" ");
const SOUTH_ASIA = "IN PK BD LK NP AF".split(" ");
const EAST_ASIA = "JP KR CN HK TW MN".split(" ");
const CENTRAL_ASIA = "KZ KG UZ".split(" ");

interface Region {
  /** The label as a reader would write it, shown back in the answer. */
  label: string;
  /** Matched against the space-padded, lowercased line. */
  pattern: RegExp;
  core: string[];
  edge?: string[];
  /** One line on what employers usually mean, shown when the region matches. */
  note: string;
}

export const REGIONS: Region[] = [
  { label: "EMEA", pattern: /\bemea\b/, core: [...EUROPE, ...MIDDLE_EAST, ...NORTH_AFRICA, ...SUB_SAHARAN], edge: [...EUROPE_EDGE, ...CENTRAL_ASIA], note: "Europe, the Middle East and Africa. Many employers can only pay people in the countries where they have an entity or an employer-of-record partner, so a listing may cover fewer than all of them." },
  { label: "EU", pattern: /\b(eu|european union)\b/, core: EU, note: "The 27 member states of the European Union. The UK, Norway and Switzerland are not in it." },
  { label: "EEA", pattern: /\b(eea|european economic area)\b/, core: [...EU, "IS", "NO"], note: "The EU plus Iceland, Liechtenstein and Norway. Switzerland and the UK are not in it." },
  { label: "Europe", pattern: /\beurope(an)?\b(?! union)(?! economic)/, core: EUROPE, edge: EUROPE_EDGE, note: "Usually the EU, the UK, Switzerland and Norway, and often the Balkans and Ukraine. Turkey, the Caucasus, Russia and Belarus vary by employer." },
  { label: "UK & Ireland", pattern: /\b(uk (and|&) ireland|uk&i|ukandi)\b/, core: ["GB", "IE"], note: "The United Kingdom and the Republic of Ireland." },
  { label: "DACH", pattern: /\bdach\b/, core: ["DE", "AT", "CH"], note: "Germany, Austria and Switzerland, the German-speaking markets." },
  { label: "Benelux", pattern: /\bbenelux\b/, core: ["BE", "NL", "LU"], note: "Belgium, the Netherlands and Luxembourg." },
  { label: "Nordics", pattern: /\b(nordics?|scandinavia(n)?)\b/, core: ["DK", "FI", "IS", "NO", "SE"], note: "Denmark, Finland, Iceland, Norway and Sweden. \"Scandinavia\" strictly means Denmark, Norway and Sweden, but job ads use the two interchangeably." },
  { label: "CEE", pattern: /\b(cee|central (and|&) eastern europe|eastern europe|central europe)\b/, core: "PL CZ SK HU RO BG HR SI EE LV LT RS BA ME MK AL XK MD UA".split(" "), note: "Central and Eastern Europe, the region many employers use for engineering hubs." },
  { label: "Middle East", pattern: /\b(middle east)\b/, core: MIDDLE_EAST, edge: ["TR", "EG"], note: "The Gulf states, the Levant, Iraq and Iran. Turkey and Egypt are included by some employers." },
  { label: "MENA", pattern: /\bmena\b/, core: [...MIDDLE_EAST, ...NORTH_AFRICA], edge: ["TR"], note: "The Middle East and North Africa." },
  { label: "GCC", pattern: /\b(gcc|gulf)\b/, core: ["AE", "SA", "QA", "KW", "BH", "OM"], note: "The six Gulf Cooperation Council states." },
  { label: "Africa", pattern: /(?<!(south|saharan) )\bafrica\b/, core: [...NORTH_AFRICA, ...SUB_SAHARAN], note: "The whole continent, unless the line says sub-Saharan or names countries." },
  { label: "Sub-Saharan Africa", pattern: /\bsub[- ]?saharan\b/, core: SUB_SAHARAN, note: "Africa south of the Sahara, which leaves out Algeria, Egypt, Morocco and Tunisia." },
  { label: "North America", pattern: /\b(north america|namer|na only|n\. america)\b/, core: ["US", "CA"], edge: ["MX"], note: "The United States and Canada. Mexico is geographically North American, and some employers include it." },
  { label: "LATAM", pattern: /\b(latam|latin america|south america|central america)\b/, core: LATAM, note: "Mexico, Central and South America and the Spanish- and Portuguese-speaking Caribbean." },
  { label: "Americas", pattern: /\b(americas|amer)\b/, core: ["US", "CA", ...LATAM], edge: ["JM", "TT"], note: "North, Central and South America." },
  { label: "APAC", pattern: /\b(apac|asia[- ]pacific)\b/, core: [...EAST_ASIA, ...SOUTHEAST_ASIA, ...SOUTH_ASIA, "AU", "NZ"], edge: CENTRAL_ASIA, note: "East, Southeast and South Asia plus Australia and New Zealand. Some employers count India separately, and some leave out China." },
  { label: "Asia", pattern: /(?<!(southeast|south east) )\basia\b(?![- ]pacific)/, core: [...EAST_ASIA, ...SOUTHEAST_ASIA, ...SOUTH_ASIA], edge: CENTRAL_ASIA, note: "East, Southeast and South Asia." },
  { label: "Southeast Asia", pattern: /\b(southeast asia|south east asia|sea region|asean)\b/, core: SOUTHEAST_ASIA, note: "Singapore, Malaysia, Indonesia, Thailand, Vietnam, the Philippines and their neighbours." },
  { label: "ANZ", pattern: /\b(anz|australia (and|&) new zealand)\b/, core: ["AU", "NZ"], note: "Australia and New Zealand." },
];

/** Phrases that put no place on the role. Checked after places, because a named place wins. */
const WORLDWIDE = /\b(anywhere|worldwide|world wide|global(ly)?|all locations|any location|no location (restriction|requirement)s?|location independent|international)\b/;

/** Work authorisation and citizenship: a border even when the line names none. */
const AUTHORISATION = /\b((authori[sz]ed|eligible|permitted|right) to work in|work (permit|authori[sz]ation)|citizens? (of|only)|citizenship|security clearance|(unable|not able) to sponsor|(no|without) (visa )?sponsorship|sponsorship (is )?not available)\b/i;

/** UTC offsets for the abbreviations that turn up in job ads. Matched case-sensitively, in capitals. */
const ZONES: Record<string, number> = {
  UTC: 0, GMT: 0, WET: 0, BST: 1, CET: 1, CEST: 2, EET: 2, EEST: 3, MSK: 3,
  EST: -5, EDT: -4, CST: -6, CDT: -5, MST: -7, MDT: -6, PST: -8, PDT: -7, ET: -5, PT: -8, CT: -6, MT: -7,
  BRT: -3, ART: -3, IST: 5.5, PKT: 5, SGT: 8, HKT: 8, JST: 9, KST: 9, AEST: 10, AEDT: 11, NZST: 12,
};
const ZONE = `(${Object.keys(ZONES).sort((a, b) => b.length - a.length).join("|")})`;
const OFFSET = "([+\\-−–]\\s*\\d{1,2}(?:[:.]\\d{2})?)";

/** Named groups of zones employers write instead of numbers. */
const ZONE_GROUPS: [RegExp, string, number, number][] = [
  [/\b(us|u\.s\.|united states) (time ?zones?|hours|business hours)\b/i, "US time zones", -10, -4],
  [/\bnorth american? (time ?zones?|hours)\b/i, "North American time zones", -10, -3.5],
  [/\b(european|europe|eu) (time ?zones?|hours|business hours)\b/i, "European time zones", 0, 3],
  [/\bamericas? (time ?zones?|hours)\b/i, "Americas time zones", -10, -3],
];

export interface TimezoneRule {
  label: string;
  lo: number;
  hi: number;
}

function toHours(s: string): number {
  const t = s.replace(/[−–]/g, "-").replace(/\s+/g, "");
  const m = t.match(/^([+-])(\d{1,2})(?:[:.](\d{2}))?$/);
  if (!m) return NaN;
  const h = Number(m[2]) + (m[3] ? Number(m[3]) / 60 : 0);
  return m[1] === "-" ? -h : h;
}

/** The time-zone window a line asks for, in UTC hours, or null when it names none. */
export function parseTimezone(line: string): TimezoneRule | null {
  // "UTC-3 to UTC+3", "GMT+1 - GMT+5", "between UTC-5 and UTC+1"
  const range = line.match(new RegExp(`(?:UTC|GMT)\\s*${OFFSET}\\s*(?:to|and|-|–|—|through)\\s*(?:UTC|GMT)?\\s*${OFFSET}`, "i"));
  if (range) {
    const a = toHours(range[1]);
    const b = toHours(range[2]);
    if (Number.isFinite(a) && Number.isFinite(b)) return { label: range[0].trim(), lo: Math.min(a, b), hi: Math.max(a, b) };
  }
  // "CET ± 3 hours", "UTC+1 +/- 2", "EST plus or minus 3"
  const pm = line.match(new RegExp(`\\b${ZONE}\\s*${OFFSET}?\\s*(?:±|\\+\\/-|\\+-|plus or minus|\\+\\/−)\\s*(\\d{1,2})\\b`));
  if (pm) {
    const centre = ZONES[pm[1]] + (pm[2] ? toHours(pm[2]) : 0);
    const n = Number(pm[3]);
    return { label: pm[0].trim(), lo: centre - n, hi: centre + n };
  }
  // "within 4 hours of EST", "up to 3 hours from CET"
  const within = line.match(new RegExp(`(?:within|up to|no more than)\\s*\\+?(\\d{1,2})\\s*(?:hours?|hrs?|h)\\s*(?:of|from)\\s*${ZONE}\\s*${OFFSET}?`, "i"));
  if (within && ZONES[within[2].toUpperCase()] !== undefined) {
    const centre = ZONES[within[2].toUpperCase()] + (within[3] ? toHours(within[3]) : 0);
    const n = Number(within[1]);
    return { label: within[0].trim(), lo: centre - n, hi: centre + n };
  }
  for (const [re, label, lo, hi] of ZONE_GROUPS) if (re.test(line)) return { label, lo, hi };
  return null;
}

export type Inclusion = "yes" | "edge" | "no";

export interface PlaceMatch {
  label: string;
  kind: "country" | "region";
  includes: Inclusion;
  note?: string;
}

export interface LocationCheck {
  verdict: "open" | "closed" | "unclear";
  headline: string;
  reasons: string[];
  places: PlaceMatch[];
  worldwide: boolean;
  timezone: (TimezoneRule & { fits: boolean | null }) | null;
  authorisation: string | null;
}

/** Countries and regions a line names, with whether each includes `code`. */
export function placesIn(line: string, code: string): PlaceMatch[] {
  const hay = ` ${line.toLowerCase().replace(/\s+/g, " ")} `;
  const out: PlaceMatch[] = [];
  for (const r of REGIONS) {
    if (!r.pattern.test(hay)) continue;
    // "Europe" also matches inside "European Union"; keep the more specific label only.
    if (r.label === "Europe" && out.some((p) => p.label === "EU" || p.label === "EEA")) continue;
    const includes: Inclusion = r.core.includes(code) ? "yes" : r.edge?.includes(code) ? "edge" : "no";
    out.push({ label: r.label, kind: "region", includes, note: r.note });
  }
  for (const a of applicantAreas(line, "regional")) {
    if (a["@type"] !== "Country") continue;
    const c = BY_NAME.get(a.name);
    if (!c || out.some((p) => p.label === a.name)) continue;
    out.push({ label: a.name, kind: "country", includes: c === code ? "yes" : "no" });
  }
  return out;
}

const fmtOffset = (h: number) => {
  const sign = h < 0 ? "−" : "+";
  const abs = Math.abs(h);
  const mins = Math.round((abs % 1) * 60);
  return `UTC${sign}${Math.floor(abs)}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
};

/**
 * Can someone in `code`, working at UTC offset `offset` (hours, or null when
 * unknown), apply for a role with this location line?
 */
export function checkLocation(line: string, code: string, offset: number | null): LocationCheck {
  const text = line.trim();
  const you = countryName(code);
  const empty: LocationCheck = { verdict: "unclear", headline: "", reasons: [], places: [], worldwide: false, timezone: null, authorisation: null };
  if (!text) return { ...empty, headline: "Paste a location line to check it." };

  const places = placesIn(text, code);
  const worldwide = WORLDWIDE.test(text.toLowerCase());
  const tz = parseTimezone(text);
  const timezone = tz ? { ...tz, fits: offset == null ? null : offset >= tz.lo && offset <= tz.hi } : null;
  const auth = text.match(AUTHORISATION)?.[0] ?? null;
  const reasons: string[] = [];

  let verdict: LocationCheck["verdict"];
  if (places.length) {
    const yes = places.filter((p) => p.includes === "yes");
    const edge = places.filter((p) => p.includes === "edge");
    if (yes.length) {
      verdict = "open";
      reasons.push(`${yes.map((p) => p.label).join(" and ")} ${yes.length > 1 ? "include" : "includes"} ${you}.`);
    } else if (edge.length) {
      verdict = "unclear";
      reasons.push(`${edge.map((p) => p.label).join(" and ")} sometimes ${edge.length > 1 ? "include" : "includes"} ${you} and sometimes not. Ask the recruiter before you apply.`);
    } else {
      verdict = "closed";
      reasons.push(`The line names ${places.map((p) => p.label).join(", ")}, and ${you} is not in ${places.length > 1 ? "any of them" : "it"}.`);
    }
    if (worldwide) reasons.push("It also says anywhere or global, but where a listing names places, the places are the rule. That is how our board reads it too.");
  } else if (worldwide) {
    verdict = "open";
    reasons.push("The line puts no country or region on the role.");
  } else if (timezone) {
    verdict = "unclear";
  } else {
    verdict = "unclear";
    reasons.push("The line names no place. \"Remote\" on its own does not say where you may live, so the answer is in the description. Paste it into the remote job description analyzer, or ask.");
  }

  if (timezone) {
    const window = `${fmtOffset(timezone.lo)} to ${fmtOffset(timezone.hi)}`;
    if (timezone.fits === false) {
      verdict = "closed";
      reasons.push(`It asks for ${timezone.label} (${window}), and ${fmtOffset(offset!)} is outside that window.`);
    } else if (timezone.fits === true) {
      if (verdict === "unclear" && !places.length) verdict = "open";
      reasons.push(`It asks for ${timezone.label} (${window}), and ${fmtOffset(offset!)} is inside it.`);
    } else {
      reasons.push(`It asks for ${timezone.label} (${window}). Set your time zone to check it.`);
    }
  }

  if (auth) reasons.push(`It mentions "${auth}": that is a legal requirement, so check you meet it for the country it names.`);

  const headline =
    verdict === "open"
      ? `Open to people in ${you}, on what the line says.`
      : verdict === "closed"
        ? `Not open to people in ${you}, on what the line says.`
        : `Unclear for ${you}: worth asking before you spend time on it.`;
  return { verdict, headline, reasons, places, worldwide, timezone, authorisation: auth };
}

/**
 * The countries a board listing is open to, for counting. Worldwide listings
 * are counted separately by the caller; this reads only the regional ones and
 * returns codes whose inclusion is not in doubt.
 */
export function openCountries(location: string): string[] {
  const out = new Set<string>();
  for (const p of placesIn(location, "")) {
    if (p.kind === "country") {
      const c = BY_NAME.get(p.label);
      if (c) out.add(c);
    } else {
      for (const c of REGIONS.find((r) => r.label === p.label)?.core ?? []) out.add(c);
    }
  }
  return [...out];
}
