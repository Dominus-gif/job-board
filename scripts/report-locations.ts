/**
 * Figures behind the region-labels guide and the remote job location checker.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-locations.ts
 *
 * Reads every location line on the board with the checker's own rules
 * (src/lib/toolkit/location-check.ts), so a figure in the guide and the count
 * the tool shows a reader can never disagree.
 */
import { getAllJobs, getRegionalJobs } from "../src/lib/db";
import { REGIONS, countryName, openCountries, parseTimezone, placesIn } from "../src/lib/toolkit/location-check";

const pct = (n: number, d: number) => ((n / d) * 100).toFixed(1);

async function main() {
  const ww = await getAllJobs();
  const reg = await getRegionalJobs();
  const total = ww.length + reg.length;
  console.log(`board ${total} · worldwide ${ww.length} (${pct(ww.length, total)}%) · regional ${reg.length}`);
  console.log(`employers ${new Set([...ww, ...reg].map((j) => j.company_name)).size}`);

  let regionOnly = 0, countryOnly = 0, both = 0, none = 0, singleCountry = 0, tz = 0;
  const label = new Map<string, number>();
  const noneSamples = new Map<string, number>();
  for (const j of reg) {
    const places = placesIn(j.location, "");
    const r = places.filter((p) => p.kind === "region");
    const c = places.filter((p) => p.kind === "country");
    if (r.length && c.length) both++;
    else if (r.length) regionOnly++;
    else if (c.length) countryOnly++;
    else {
      none++;
      noneSamples.set(j.location, (noneSamples.get(j.location) ?? 0) + 1);
    }
    if (!r.length && c.length === 1) singleCountry++;
    for (const p of r) label.set(p.label, (label.get(p.label) ?? 0) + 1);
    if (parseTimezone(j.location)) tz++;
  }
  console.log(`regional: region label only ${regionOnly} · countries only ${countryOnly} (one country ${singleCountry}, ${pct(singleCountry, reg.length)}%) · both ${both} · no place ${none}`);
  console.log(`location line with a time-zone window: ${tz}`);
  console.log("region labels:", [...label].sort((a, b) => b[1] - a[1]).map(([l, n]) => `${l} ${n}`).join(" · "));
  console.log("no-place samples:", [...noneSamples].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([l, n]) => `${n}× "${l}"`).join(" · "));

  const per = new Map<string, number>();
  for (const j of reg) for (const c of openCountries(j.location)) per.set(c, (per.get(c) ?? 0) + 1);
  console.log("open to (regional, clear inclusion):", [...per].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([c, n]) => `${countryName(c)} ${n}`).join(" · "));
  for (const c of ["US", "GB", "CA", "DE", "IN", "BR", "MX", "NG", "PH", "PK", "ZA", "PL", "AR", "KE", "EG", "TR"]) {
    const n = per.get(c) ?? 0;
    console.log(`  ${countryName(c).padEnd(16)} regional ${String(n).padStart(5)} · with worldwide ${n + ww.length} (${pct(n + ww.length, total)}% of board)`);
  }
  const emea = REGIONS.find((r) => r.label === "EMEA")!;
  console.log(`EMEA core countries: ${emea.core.length}; edge ${emea.edge?.length ?? 0}`);
}
main();
