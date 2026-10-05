/**
 * Figures behind the "Remote design jobs" guide.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-design.ts
 *
 * Counted by job TITLE. The category filter cannot size a field: it files
 * anything it cannot classify under "Product". See scripts/report-pm.ts.
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import { applicantAreas } from "../src/lib/seo/job-location";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));

function stats(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const at = (q: number) => (m.length ? m[Math.min(m.length - 1, Math.floor(m.length * q))] : null);
  const median = m.length ? (m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2)) : null;
  return { n: jobs.length, disclosed: m.length, p25: at(0.25), median, p75: at(0.75), low: m[0] ?? null, high: m[m.length - 1] ?? null };
}

/** Anything that designs the product or the brand. */
const IS_DESIGN =
  /\b(product designer|ux designer|ui designer|ux\/ui|ui\/ux|experience designer|interaction designer|visual designer|graphic designer|brand designer|design lead|design manager|head of design|design director|designer|ux researcher|design system)\b/i;

/** Shares the word, different job. */
const NOT_DESIGN =
  /\b(design engineer|designated|design verification|chip design|hardware design|mechanical design|circuit design|cad|electrical engineer|firmware|pcb|rf engineer)\b/i;

const isDesign = (j: Job) => IS_DESIGN.test(j.title) && !NOT_DESIGN.test(j.title);

const DISCIPLINES: [string, RegExp][] = [
  ["Product designer", /\bproduct designer\b/i],
  ["UX / UI designer", /\b(ux designer|ui designer|ux\/ui|ui\/ux|user experience designer|interaction designer)\b/i],
  ["Visual / graphic / brand", /\b(visual designer|graphic designer|brand designer|motion designer)\b/i],
  ["UX research", /\b(ux researcher|user researcher|design research)\b/i],
  ["Design systems", /\bdesign system/i],
  ["Design leadership", /\b(design lead|design manager|head of design|design director|vp of design|principal designer)\b/i],
];

const LEVELS: [string, RegExp][] = [
  ["Head / Director / VP", /\b(head of design|design director|director of design|vp of design|chief design)\b/i],
  ["Lead / Principal / Staff", /\b(design lead|lead designer|principal designer|staff designer|design manager)\b/i],
  ["Senior", /\bsenior\b|\bsr\.?\b/i],
  ["Junior / Associate / Graduate", /\b(junior|associate|graduate|entry[- ]level|intern)\b/i],
];

async function main() {
  const all = await getSearchableJobs();
  const design = all.filter(isDesign);
  const ww = design.filter((j) => j.scope === "worldwide");
  const s = stats(design);
  const board = stats(all);

  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`BOARD ${all.length} listings, ${all.filter((j) => j.scope === "worldwide").length} work-from-anywhere`);
  console.log(`DESIGN ${design.length} roles (${pct(design.length, all.length)}% of board), ${ww.length} work-from-anywhere (${pct(ww.length, design.length)}%)\n`);

  console.log("=== EVERY MATCHED TITLE (verify the cohort by eye) ===");
  for (const j of design) console.log(`  ${j.scope === "worldwide" ? "WW " : "   "}${j.title.slice(0, 58).padEnd(60)}${j.company_name.slice(0, 24)}`);

  const near = all.filter((j) => IS_DESIGN.test(j.title) && NOT_DESIGN.test(j.title));
  console.log(`\n  excluded as not-design (${near.length}): ${near.slice(0, 8).map((j) => j.title.slice(0, 40)).join(" | ")}`);

  console.log("\n=== PAY ===");
  console.log(`  design     : n=${s.disclosed} of ${s.n} publish (${pct(s.disclosed, s.n)}%)  p25 ${money(s.p25)}  median ${money(s.median)}  p75 ${money(s.p75)}  range ${money(s.low)}-${money(s.high)}`);
  console.log(`  whole board: n=${board.disclosed} of ${board.n} (${pct(board.disclosed, board.n)}%)  median ${money(board.median)}`);

  console.log("\n=== BY DISCIPLINE ===");
  for (const [label, re] of DISCIPLINES) {
    const g = design.filter((j) => re.test(j.title));
    const gs = stats(g);
    const w = g.filter((j) => j.scope === "worldwide").length;
    console.log(`  ${label.padEnd(26)} ${String(gs.n).padStart(3)} roles  ${String(w).padStart(2)} w-f-a  pay n=${String(gs.disclosed).padStart(2)}  median ${money(gs.median)}`);
  }

  console.log("\n=== BY LEVEL ===");
  for (const [label, re] of LEVELS) {
    const g = design.filter((j) => re.test(j.title));
    const gs = stats(g);
    console.log(`  ${label.padEnd(30)} ${String(gs.n).padStart(3)} roles, pay n=${String(gs.disclosed).padStart(2)}, median ${money(gs.median)}`);
  }
  const unlevelled = design.filter((j) => !LEVELS.some(([, re]) => re.test(j.title)));
  console.log(`  ${"No level in the title".padEnd(30)} ${String(unlevelled.length).padStart(3)} roles, pay n=${stats(unlevelled).disclosed}, median ${money(stats(unlevelled).median)}`);

  console.log("\n=== WHERE (country, resolved from the location text) ===");
  const country = new Map<string, number>();
  let none = 0;
  for (const j of design) {
    const areas = [...new Set(applicantAreas(j.location, j.scope).map((a) => a.name))];
    if (!areas.length) { none++; continue; }
    for (const a of areas) country.set(a, (country.get(a) ?? 0) + 1);
  }
  for (const [c, n] of [...country].sort((a, b) => b[1] - a[1])) console.log(`  ${c.padEnd(20)} ${String(n).padStart(3)}  ${pct(n, design.length)}%`);
  console.log(`  ${"no country named".padEnd(20)} ${String(none).padStart(3)}  ${pct(none, design.length)}%`);

  console.log("\n=== EMPLOYERS ===");
  const co = new Map<string, Job[]>();
  for (const j of design) {
    if (!co.has(j.company_name)) co.set(j.company_name, []);
    co.get(j.company_name)!.push(j);
  }
  console.log(`  ${co.size} employers for ${design.length} roles`);
  for (const [c, jobs] of [...co].sort((a, b) => b[1].length - a[1].length).slice(0, 10)) {
    console.log(`    ${c.padEnd(26)} ${jobs.length}${jobs.some((j) => j.scope === "worldwide") ? "  (incl. work-from-anywhere)" : ""}`);
  }

  console.log("\n=== SKILLS ===");
  const sk = new Map<string, number>();
  for (const j of design) for (const x of j.skills) sk.set(x, (sk.get(x) ?? 0) + 1);
  for (const [x, n] of [...sk].sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(`  ${x.padEnd(16)} ${n}  (${pct(n, design.length)}%)`);

  console.log("\n=== FRESHNESS ===");
  const days = design.map((j) => Math.round((Date.now() - new Date(j.posted_at).getTime()) / 86400000)).sort((a, b) => a - b);
  if (days.length) {
    console.log(`  median ${days[Math.floor(days.length / 2)]}d, newest ${days[0]}d, oldest ${days[days.length - 1]}d`);
    console.log(`  posted within 7 days: ${days.filter((d) => d <= 7).length} of ${days.length}`);
  }
}

main();
