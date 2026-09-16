/**
 * Broad regions for a listing, with city names counted as well as countries.
 *
 * `jobRegions` (src/lib/region.ts) drives the /jobs region filter and only
 * recognises country and region names, so "San Francisco" or "London" fall into
 * "Other". For statistics that would undercount the US and UK badly, so the
 * data-backed tools use this wider matcher instead.
 */
import { jobRegions } from "./region";
import type { Job } from "./types";

export const BROAD_REGIONS = [
  "Worldwide",
  "United States",
  "Canada",
  "Latin America",
  "Europe",
  "UK",
  "India",
  "Asia-Pacific",
  "Middle East",
  "Africa",
] as const;
export type BroadRegion = (typeof BROAD_REGIONS)[number];

const CITY_RULES: [RegExp, BroadRegion][] = [
  [/san francisco|bay area|new york|\bnyc\b|seattle|austin|boston|chicago|los angeles|denver|atlanta|miami|dallas|houston|washington,? d\.?c|philadelphia|san diego|san jose|palo alto|mountain view|menlo park|san mateo|sunnyvale|redwood city|santa clara|salt lake|portland|nashville|raleigh|phoenix|minneapolis|pittsburgh|detroit|\b(?:ca|ny|tx|wa|ma|il|co|ga|fl|nc|va|nj|pa|ut|or|az|mn|oh|mi)\b|california|texas|florida|colorado|massachusetts|illinois|virginia|georgia, us|utah|oregon|arizona|new jersey/, "United States"],
  [/london|manchester|edinburgh|glasgow|bristol|cambridge, uk|oxford|belfast|leeds/, "UK"],
  [/berlin|munich|münchen|hamburg|frankfurt|paris|amsterdam|rotterdam|madrid|barcelona|lisbon|porto|dublin|stockholm|copenhagen|oslo|helsinki|warsaw|krakow|prague|vienna|zurich|geneva|brussels|milan|rome|athens|budapest|bucharest|sofia|tallinn|riga|vilnius|belgrade|belgium|switzerland|austria|denmark|norway|finland|czech|hungary|greece|bulgaria|croatia|serbia|ukraine|lithuania|latvia|slovakia|slovenia|luxembourg/, "Europe"],
  [/toronto|vancouver|montreal|ottawa|calgary|waterloo|british columbia|ontario|quebec/, "Canada"],
  [/sydney|melbourne|brisbane|perth|auckland|tokyo|osaka|seoul|korea|hong kong|taiwan|taipei|manila|jakarta|kuala lumpur|malaysia|bangkok|thailand|ho chi minh|hanoi|shanghai|beijing|china/, "Asia-Pacific"],
  [/pune|chennai|gurgaon|gurugram|noida|kolkata|ahmedabad/, "India"],
  [/s[aã]o paulo|buenos aires|bogot[aá]|mexico city|santiago|lima|peru|uruguay|costa rica|montevideo|medell[ií]n|guatemala|rio de janeiro/, "Latin America"],
  [/tel aviv|abu dhabi|riyadh|doha|turkey|t[uü]rkiye|istanbul|cairo/, "Middle East"],
  [/cape town|johannesburg|lagos|nairobi|south africa/, "Africa"],
];

const FROM_JOB_REGIONS: Record<string, BroadRegion | undefined> = {
  "United States": "United States",
  "North America": "United States",
  UK: "UK",
  Canada: "Canada",
  Europe: "Europe",
  "Latin America": "Latin America",
  India: "India",
  "Asia-Pacific": "Asia-Pacific",
  "Middle East": "Middle East",
  Africa: "Africa",
  Worldwide: "Worldwide",
};

/** Regions a listing is open to. Empty when a regional listing names nowhere we recognise. */
export function broadRegions(job: Pick<Job, "location" | "scope">): BroadRegion[] {
  if (job.scope === "worldwide") return ["Worldwide"];
  const out = new Set<BroadRegion>();
  for (const r of jobRegions(job.location)) {
    const m = FROM_JOB_REGIONS[r];
    if (m && m !== "Worldwide") out.add(m);
  }
  const s = ` ${job.location.toLowerCase()} `;
  for (const [re, region] of CITY_RULES) if (re.test(s)) out.add(region);
  return [...out];
}
