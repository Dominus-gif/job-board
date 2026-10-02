/**
 * The figures behind the "Remote product manager jobs" guide.
 *
 * Deliberately title-based, not category-based. The board's `Product` category
 * cannot be used for this: classifyCategory falls back to "Product" when a
 * listing matches no keyword at all (src/lib/pipeline/enrich.ts), so that bucket
 * is mostly unclassifiable listings — teachers, nurses, warehouse supervisors —
 * and quoting its size as "the product field" would be quoting a bug.
 *
 * A product manager is identified by title here, with the adjacent roles that
 * share the word "product" excluded by name: a Product Designer, a Product
 * Marketing Manager and a Product Engineer are not product managers, and all
 * three are common enough to move the numbers.
 *
 * Run it against the data production serves, not a fresh live capture, or the
 * counts will not match the board a reader is looking at:
 *
 *   git checkout -- src/lib/generated/     # npm run build rewrites the snapshot
 *   ANYWHERE_LIVE=false npx tsx scripts/report-pm.ts
 *
 * As published on 2 October 2026 that prints: board 4,066, product manager roles
 * 130, work-from-anywhere 3, 46 of 130 disclosing pay, median $234,375.
 */
import { getSearchableJobs } from "../src/lib/db";
import { jobRegions } from "../src/lib/region";
import { salaryMidpointUsd } from "../src/lib/salary";
import type { Job } from "../src/lib/types";

/** Roles that own a product: the PM ladder, plus product ownership. */
const IS_PM =
  /\b(product manager|product managers|product management|product owner|product lead|head of product|director,? of product|vp,? of product|vice president,? of product|chief product officer|product director)\b/i;

/** Shares the word, not the job. */
const NOT_PM = /\b(product designer|product marketing|product engineer|product analyst|product support|product specialist|product operations|production)\b/i;

const isPm = (j: Job) => IS_PM.test(j.title) && !NOT_PM.test(j.title);

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));

function stats(jobs: Job[]) {
  const mids = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const at = (q: number) => (mids.length ? mids[Math.min(mids.length - 1, Math.floor(mids.length * q))] : null);
  const mid = mids.length ? (mids.length % 2 ? mids[(mids.length - 1) / 2] : Math.round((mids[mids.length / 2 - 1] + mids[mids.length / 2]) / 2)) : null;
  return { n: jobs.length, disclosed: mids.length, p25: at(0.25), median: mid, p75: at(0.75), low: mids[0] ?? null, high: mids[mids.length - 1] ?? null };
}

const money = (n: number | null) => (n == null ? "n/a" : "$" + n.toLocaleString("en-US"));

/** Seniority, read off the title. */
const LADDER: [string, RegExp][] = [
  ["Chief / VP / Head", /\b(chief product officer|vp,? of product|vice president,? of product|head of product|product director|director,? of product)\b/i],
  ["Group / Principal / Staff", /\b(group product manager|principal product manager|staff product manager|lead product manager|product lead)\b/i],
  ["Senior", /\bsenior product (manager|owner)\b|\bsr\.? product (manager|owner)\b/i],
  ["Associate / Junior", /\b(associate product manager|junior product manager|apm)\b/i],
];

async function main() {
  const all = await getSearchableJobs();
  const pm = all.filter(isPm);
  const today = new Date().toISOString().slice(0, 10);

  console.log(`DATE ${today}   BOARD ${all.length} listings   PRODUCT MANAGER ROLES ${pm.length} (${pct(pm.length, all.length)}%)\n`);

  console.log("=== EVERY MATCHED TITLE (verify the cohort by eye) ===");
  for (const j of pm) console.log(`  ${j.scope === "worldwide" ? "WW " : "   "}${j.title.slice(0, 60).padEnd(62)}${j.company_name.slice(0, 24)}`);

  console.log("\n=== EXCLUDED BY NAME, for the record ===");
  const nearMiss = all.filter((j) => IS_PM.test(j.title) && NOT_PM.test(j.title));
  for (const j of nearMiss.slice(0, 12)) console.log(`  ${j.title.slice(0, 70)}`);
  console.log(`  (${nearMiss.length} excluded)`);
  const adjacent = all.filter((j) => /\bproduct\b/i.test(j.title) && !isPm(j));
  console.log(`  listings with "product" in the title that are NOT product managers: ${adjacent.length}`);

  console.log("\n=== SCOPE ===");
  const ww = pm.filter((j) => j.scope === "worldwide");
  const boardWw = all.filter((j) => j.scope === "worldwide").length;
  console.log(`  product managers, work-from-anywhere : ${ww.length} of ${pm.length} = ${pct(ww.length, pm.length)}%`);
  console.log(`  whole board, work-from-anywhere      : ${boardWw} of ${all.length} = ${pct(boardWw, all.length)}%`);
  console.log(`  the worldwide ones:`);
  for (const j of ww) console.log(`    ${j.title.slice(0, 50).padEnd(52)}${j.company_name.padEnd(22)}${money(salaryMidpointUsd(j.salary))}`);

  console.log("\n=== PAY (USD midpoints; only listings that publish a range) ===");
  const s = stats(pm);
  console.log(`  product managers : n=${s.disclosed} of ${s.n} disclose (${pct(s.disclosed, s.n)}%)`);
  console.log(`     p25 ${money(s.p25)}   median ${money(s.median)}   p75 ${money(s.p75)}   range ${money(s.low)}-${money(s.high)}`);
  const b = stats(all);
  console.log(`  whole board      : n=${b.disclosed} of ${b.n} (${pct(b.disclosed, b.n)}%)  median ${money(b.median)}`);
  console.log(`  by seniority:`);
  for (const [label, re] of LADDER) {
    const g = pm.filter((j) => re.test(j.title));
    const gs = stats(g);
    console.log(`    ${label.padEnd(28)} ${String(gs.n).padStart(3)} roles, ${String(gs.disclosed).padStart(2)} with pay, median ${money(gs.median)}`);
  }
  const rest = pm.filter((j) => !LADDER.some(([, re]) => re.test(j.title)));
  const rs = stats(rest);
  console.log(`    ${"Unlevelled / plain PM".padEnd(28)} ${String(rs.n).padStart(3)} roles, ${String(rs.disclosed).padStart(2)} with pay, median ${money(rs.median)}`);

  console.log("\n=== WHERE THEY ARE (location text, grouped by hand-ish) ===");
  const loc = new Map<string, number>();
  for (const j of pm) loc.set(j.location, (loc.get(j.location) ?? 0) + 1);
  for (const [l, n] of [...loc].sort((a, b) => b[1] - a[1]).slice(0, 18)) console.log(`  ${String(n).padStart(3)}  ${l.slice(0, 60)}`);

  console.log("\n=== EMPLOYERS ===");
  const co = new Map<string, Job[]>();
  for (const j of pm) {
    if (!co.has(j.company_name)) co.set(j.company_name, []);
    co.get(j.company_name)!.push(j);
  }
  console.log(`  ${co.size} distinct employers for ${pm.length} roles`);
  for (const [c, jobs] of [...co].sort((a, b) => b[1].length - a[1].length).slice(0, 12)) {
    console.log(`    ${c.padEnd(26)} ${jobs.length} role(s)${jobs.some((j) => j.scope === "worldwide") ? "  (incl. work-from-anywhere)" : ""}`);
  }

  console.log("\n=== EMPLOYMENT TYPE ===");
  const t = new Map<string, number>();
  for (const j of pm) t.set(j.employment_type, (t.get(j.employment_type) ?? 0) + 1);
  for (const [k, n] of [...t].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(12)} ${n} (${pct(n, pm.length)}%)`);

  console.log("\n=== SKILLS LISTED ===");
  const sk = new Map<string, number>();
  for (const j of pm) for (const x of j.skills) sk.set(x, (sk.get(x) ?? 0) + 1);
  for (const [x, n] of [...sk].sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${x.padEnd(16)} ${n}  (${pct(n, pm.length)}% of PM roles)`);

  console.log("\n=== COMPARISON: worldwide share by role family (title-based) ===");
  const fam: [string, RegExp][] = [
    ["Product manager", IS_PM],
    ["Software engineer", /\b(software engineer|backend engineer|frontend engineer|full[- ]?stack engineer)\b/i],
    ["Designer", /\b(product designer|ux designer|ui designer|design(er)? lead)\b/i],
    ["Customer support", /\b(customer support|support specialist|customer success)\b/i],
    ["Sales / account", /\b(account executive|sales manager|account manager)\b/i],
    ["Data", /\b(data engineer|data scientist|data analyst)\b/i],
  ];
  for (const [label, re] of fam) {
    const g = all.filter((j) => re.test(j.title) && (label !== "Product manager" || !NOT_PM.test(j.title)));
    const w = g.filter((j) => j.scope === "worldwide").length;
    console.log(`  ${label.padEnd(20)} ${String(g.length).padStart(4)} roles, ${String(w).padStart(3)} work-from-anywhere (${pct(w, g.length)}%)`);
  }
}

main();

/* The geography and freshness numbers the guide quotes. */
async function extra() {
  const all = await getSearchableJobs();
  const pm = all.filter(isPm);
  const reg = new Map<string, number>();
  for (const j of pm) for (const r of jobRegions(j.location)) reg.set(r, (reg.get(r) ?? 0) + 1);
  console.log("\n=== PM BY REGION (jobRegions buckets) ===");
  for (const [r, n] of [...reg].sort((a, b) => b[1] - a[1])) console.log(`  ${r.padEnd(18)} ${String(n).padStart(3)}  ${pct(n, pm.length)}%`);
  const unclassified = pm.filter((j) => jobRegions(j.location).includes("Other"));
  console.log(`  listings whose location text we could not place: ${unclassified.length}`);
  console.log(`  sample of those: ${[...new Set(unclassified.map((j) => j.location))].slice(0, 8).join(" | ")}`);

  const days = pm.map((j) => Math.round((Date.now() - new Date(j.posted_at).getTime()) / 86400000)).sort((a, b) => a - b);
  console.log(`\n=== FRESHNESS (days since posted) ===`);
  console.log(`  median ${days[Math.floor(days.length / 2)]}d   newest ${days[0]}d   oldest ${days[days.length - 1]}d`);
  console.log(`  posted within 7 days: ${days.filter((d) => d <= 7).length} of ${days.length}`);
  console.log(`  posted within 30 days: ${days.filter((d) => d <= 30).length} of ${days.length}`);
}
extra();
