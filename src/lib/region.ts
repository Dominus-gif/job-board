import type { Job } from "./types";

/**
 * Map a raw location string to the region(s) it belongs to, so region-locked
 * jobs can be filtered by broad region. A job can match several (e.g.
 * "Remote, Canada; Remote, US" → Canada + United States).
 */
export function jobRegions(location: string): string[] {
  const s = ` ${location.toLowerCase()} `;
  const out = new Set<string>();
  const add = (re: RegExp, label: string) => {
    if (re.test(s)) out.add(label);
  };
  add(/worldwide|anywhere/, "Worldwide");
  add(/united kingdom|\buk\b|england|scotland|wales/, "UK");
  add(/united states|\busa\b|\bu\.s\.?\b|\bus\b/, "United States");
  add(/\bcanada\b/, "Canada");
  add(/europe|\beu\b|emea|germany|france|spain|portugal|netherlands|poland|ireland|italy|sweden|nordic|dach|estonia|romania/, "Europe");
  add(/north america|\bnamer\b|\bamer\b/, "North America");
  add(/latin america|latam|brazil|mexico|argentina|colombia|chile/, "Latin America");
  add(/\bindia\b|bangalore|bengaluru|mumbai|delhi|hyderabad/, "India");
  add(/apac|\basia\b|australia|singapore|japan|philippines|new zealand|indonesia|vietnam/, "Asia-Pacific");
  add(/middle east|\buae\b|emirates|dubai|saudi|qatar|israel/, "Middle East");
  add(/africa|nigeria|kenya|egypt/, "Africa");
  if (out.size === 0) out.add("Other");
  return [...out];
}

/** Distinct regions across a set of jobs, most common first. */
export function availableRegions(jobs: Job[]): string[] {
  const counts = new Map<string, number>();
  for (const j of jobs) for (const r of jobRegions(j.location)) counts.set(r, (counts.get(r) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([r]) => r);
}
