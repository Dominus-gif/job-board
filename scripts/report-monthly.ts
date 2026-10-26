/**
 * Figures behind the monthly remote hiring report (from October 2026).
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-monthly.ts
 *
 * Counted from the committed dataset, which is what the site serves. Fields
 * are sized by job TITLE through src/lib/title-families.ts, never by the
 * category filter, which files anything it cannot place under Product (the
 * September report had to be corrected for exactly that). Regions come from
 * the same location resolver as the job pages, so a city-only location such as
 * "San Francisco" counts as the United States rather than as unclassifiable.
 *
 * Pay medians use ranges quoted in US dollars only, as in September, and none
 * is quoted from fewer than 15 published ranges.
 */
import { getSearchableJobs } from "../src/lib/db";
import { applicantAreas } from "../src/lib/seo/job-location";
import { FAMILIES, inFamily, JUNIOR_TITLE } from "../src/lib/title-families";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1)) + "%";
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));
const MIN_SAMPLE = 15;

/** Midpoints of US-dollar ranges, sorted. */
function usdMidpoints(jobs: Job[]): number[] {
  return jobs
    .filter((j) => j.salary?.currency === "USD" && (j.salary.min != null || j.salary.max != null))
    .map((j) => ((j.salary.min ?? j.salary.max!) + (j.salary.max ?? j.salary.min!)) / 2)
    .sort((a, b) => a - b);
}

function quartiles(m: number[]) {
  if (!m.length) return { n: 0, p25: null, median: null, p75: null };
  const at = (q: number) => m[Math.min(m.length - 1, Math.floor(m.length * q))];
  const median = m.length % 2 ? m[(m.length - 1) / 2] : (m[m.length / 2 - 1] + m[m.length / 2]) / 2;
  return { n: m.length, p25: at(0.25), median, p75: at(0.75) };
}

const hasRange = (j: Job) => j.salary != null && (j.salary.min != null || j.salary.max != null);

/** The report's region buckets, from the resolver's country and region names. */
const BUCKET: Record<string, string> = {
  "United States": "United States",
  "United Kingdom": "United Kingdom",
  Canada: "Canada",
  India: "India",
  Americas: "MULTI",
  "North America": "MULTI",
};
for (const c of ["Europe", "Germany", "Spain", "Ireland", "France", "Poland", "Netherlands", "Sweden", "Portugal", "Romania", "Italy", "Czechia", "Switzerland", "Ukraine", "Bulgaria", "Serbia", "Latvia", "Hungary", "Estonia", "Austria", "Belgium", "Lithuania", "Cyprus", "Denmark", "Slovenia", "Iceland", "Finland", "Malta", "Norway", "Greece", "Croatia", "Slovakia", "Luxembourg", "Armenia", "Turkey", "Georgia", "Moldova", "Bosnia and Herzegovina", "North Macedonia", "Albania", "Montenegro", "Belarus"]) BUCKET[c] = "Europe (excluding the UK)";
for (const c of ["Asia-Pacific", "Singapore", "Japan", "Philippines", "Australia", "South Korea", "Malaysia", "Hong Kong", "China", "Taiwan", "Pakistan", "Bangladesh", "Thailand", "New Zealand", "Indonesia", "Vietnam", "Sri Lanka", "Nepal"]) BUCKET[c] = "Asia-Pacific";
for (const c of ["Latin America", "South America", "Mexico", "Brazil", "Argentina", "Colombia", "Costa Rica", "Guatemala", "Peru", "Dominican Republic", "Uruguay", "Chile", "Ecuador", "Panama"]) BUCKET[c] = "Latin America";
for (const c of ["Middle East", "Israel", "United Arab Emirates", "Saudi Arabia", "Qatar", "Jordan"]) BUCKET[c] = "Middle East";
for (const c of ["Africa", "South Africa", "Egypt", "Nigeria", "Kenya", "Ghana", "Morocco"]) BUCKET[c] = "Africa";

function regionOf(j: Job): string {
  const buckets = new Set<string>();
  const unknown: string[] = [];
  for (const a of applicantAreas(j.location, "regional")) {
    const b = BUCKET[a.name];
    if (b) buckets.add(b);
    else unknown.push(a.name);
  }
  if (unknown.length) console.warn(`  [unbucketed area] ${unknown.join(", ")} <- "${j.location}"`);
  if (buckets.has("MULTI") || buckets.size > 1) return "More than one region";
  return [...buckets][0] ?? "Location we could not classify";
}

/** Level named in the title, in the September report's order of precedence. */
function levelOf(title: string): string {
  if (/\b(director|vp|vice president|head of|chief|svp|evp)\b/i.test(title)) return "Director and above";
  if (/\bmanager\b/i.test(title)) return "Manager";
  if (/\b(staff|principal|lead|architect|distinguished)\b/i.test(title)) return "Staff or lead";
  if (/\b(senior|sr\.?)\b/i.test(title)) return "Senior";
  if (JUNIOR_TITLE.test(title)) return "Entry";
  return "Mid";
}

async function main() {
  const all = await getSearchableJobs();
  const now = Date.now();
  const ww = all.filter((j) => j.scope === "worldwide");
  const regional = all.filter((j) => j.scope === "regional");
  const employers = new Map<string, Job[]>();
  for (const j of all) employers.set(j.company_name, [...(employers.get(j.company_name) ?? []), j]);
  const wwEmployers = new Map<string, number>();
  for (const j of ww) wwEmployers.set(j.company_name, (wwEmployers.get(j.company_name) ?? 0) + 1);
  const wwRanked = [...wwEmployers].sort((a, b) => b[1] - a[1]);
  const topShare = (k: number) => wwRanked.slice(0, k).reduce((n, [, c]) => n + c, 0);

  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`TOTAL ${all.length} listings from ${employers.size} employers`);
  console.log(`  sources: ${JSON.stringify(all.reduce((m: Record<string, number>, j) => ((m[j.source] = (m[j.source] ?? 0) + 1), m), {}))}`);
  console.log(`WORLDWIDE ${ww.length} (${pct(ww.length, all.length)}) from ${wwEmployers.size} employers; region-locked ${regional.length} from ${new Set(regional.map((j) => j.company_name)).size}`);
  console.log(`  top 4 hold ${topShare(4)} (${pct(topShare(4), ww.length)}), top 5 ${topShare(5)} (${pct(topShare(5), ww.length)})`);
  console.log(`  by employer: ${wwRanked.map(([c, n]) => `${c} ${n}`).join(", ")}`);

  console.log(`\nREGIONS (region-locked roles, ${regional.length})`);
  const reg = new Map<string, number>();
  for (const j of regional) reg.set(regionOf(j), (reg.get(regionOf(j)) ?? 0) + 1);
  for (const [r, n] of [...reg].sort((a, b) => b[1] - a[1])) console.log(`  ${r.padEnd(34)} ${String(n).padStart(5)}  ${pct(n, regional.length)}`);

  console.log(`\nFIELDS (by title, counted independently; median only from ${MIN_SAMPLE}+ USD ranges)`);
  for (const f of FAMILIES) {
    const js = all.filter((j) => inFamily(f, j.title));
    const w = js.filter((j) => j.scope === "worldwide").length;
    const q = quartiles(usdMidpoints(js));
    console.log(`  ${f.label.padEnd(32)} ${String(js.length).padStart(5)}  ww ${String(w).padStart(3)} (${pct(w, js.length).padStart(6)})  pay n=${String(q.n).padStart(3)} median ${q.n >= MIN_SAMPLE ? money(q.median) : "-"}`);
  }

  console.log(`\nPAY`);
  const anyRange = all.filter(hasRange).length;
  const usd = quartiles(usdMidpoints(all));
  console.log(`  any currency: ${anyRange} of ${all.length} (${pct(anyRange, all.length)}); USD ranges ${usd.n} (${pct(usd.n, all.length)})`);
  console.log(`  USD median ${money(usd.median)}, middle half ${money(usd.p25)} to ${money(usd.p75)}`);
  for (const r of ["United States", "Europe (excluding the UK)", "United Kingdom", "Canada", "India", "Asia-Pacific", "Latin America"]) {
    const q = quartiles(usdMidpoints(regional.filter((j) => regionOf(j) === r)));
    console.log(`  ${r.padEnd(28)} USD ranges ${String(q.n).padStart(4)}  median ${q.n >= MIN_SAMPLE ? money(q.median) : "-"}`);
  }
  const wq = quartiles(usdMidpoints(ww));
  console.log(`  worldwide: USD ranges ${wq.n}, median ${wq.n >= MIN_SAMPLE ? money(wq.median) : "-"} (any currency ${ww.filter(hasRange).length})`);
  console.log(`  by level:`);
  for (const lv of ["Entry", "Mid", "Senior", "Staff or lead", "Manager", "Director and above"]) {
    const js = all.filter((j) => levelOf(j.title) === lv);
    const q = quartiles(usdMidpoints(js));
    console.log(`    ${lv.padEnd(20)} roles ${String(js.length).padStart(5)}  with USD pay ${String(q.n).padStart(4)}  median ${q.n >= MIN_SAMPLE ? money(q.median) : "-"}  middle half ${q.n >= MIN_SAMPLE ? `${money(q.p25)} to ${money(q.p75)}` : "-"}`);
  }

  console.log(`\nEMPLOYERS`);
  const ranked = [...employers].sort((a, b) => b[1].length - a[1].length);
  for (const [c, js] of ranked.slice(0, 10)) console.log(`  ${c.padEnd(26)} ${String(js.length).padStart(4)}  ww ${js.filter((j) => j.scope === "worldwide").length}`);
  const one = ranked.filter(([, js]) => js.length === 1).length;
  const ten = ranked.filter(([, js]) => js.length >= 10).length;
  console.log(`  exactly one role: ${one} of ${employers.size} (${pct(one, employers.size)}); ten or more: ${ten}`);

  console.log(`\nSKILLS`);
  const top = (js: Job[], k: number) => {
    const m = new Map<string, number>();
    for (const j of js) for (const s of j.skills) m.set(s, (m.get(s) ?? 0) + 1);
    return [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([s, n]) => `${s} ${n} (${pct(n, js.length)})`).join(", ");
  };
  console.log(`  board: ${top(all, 8)}`);
  console.log(`  worldwide: ${top(ww, 8)}`);

  console.log(`\nEMPLOYMENT TYPE ${JSON.stringify(all.reduce((m: Record<string, number>, j) => ((m[j.employment_type] = (m[j.employment_type] ?? 0) + 1), m), {}))}`);

  console.log(`\nFRESHNESS`);
  const ages = all.map((j) => (now - Date.parse(j.posted_at)) / 864e5).sort((a, b) => a - b);
  console.log(`  median ${Math.round(ages[Math.floor(ages.length / 2)])} days; within 7 days ${ages.filter((a) => a <= 7).length} (${pct(ages.filter((a) => a <= 7).length, all.length)}); within 30 days ${ages.filter((a) => a <= 30).length} (${pct(ages.filter((a) => a <= 30).length, all.length)}); oldest ${Math.round(ages[ages.length - 1])} days`);
  const stamps = new Map<string, number>();
  for (const j of all) stamps.set(j.posted_at, (stamps.get(j.posted_at) ?? 0) + 1);
  const batched = [...stamps.values()].filter((n) => n >= 10).reduce((a, b) => a + b, 0);
  console.log(`  listings sharing an exact timestamp with 9+ others: ${batched} (${pct(batched, all.length)})`);
}

main();
