/**
 * The figures behind the Day 8 guide refresh: remote salary negotiation,
 * account executives vs engineers, and async-first companies.
 *
 * Run it against the data production serves, not a fresh live capture, or the
 * counts will not match the board a reader is looking at:
 *
 *   git checkout -- src/lib/generated/     # npm run build rewrites the snapshot
 *   ANYWHERE_LIVE=false npx tsx scripts/report-batch2.ts
 *
 * Role families are counted by job TITLE, never by the category filter:
 * classifyCategory falls back to "Product" for anything it cannot place, so
 * category counts are not field sizes. See scripts/report-pm.ts.
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null | undefined) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));

function stats(jobs: Job[]) {
  const mids = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const at = (q: number) => (mids.length ? mids[Math.min(mids.length - 1, Math.floor(mids.length * q))] : null);
  const median = mids.length
    ? mids.length % 2
      ? mids[(mids.length - 1) / 2]
      : Math.round((mids[mids.length / 2 - 1] + mids[mids.length / 2]) / 2)
    : null;
  return { n: jobs.length, disclosed: mids.length, p25: at(0.25), median, p75: at(0.75), low: mids[0] ?? null, high: mids[mids.length - 1] ?? null };
}

/** Role families, by title. Order matters only for reading. */
const FAMILIES: [string, RegExp][] = [
  ["Account executive", /\b(account executive|enterprise ae|sales executive)\b/i],
  ["Sales (any)", /\b(account executive|sales manager|account manager|sales development|sdr|bdr|sales director|head of sales|sales lead|sales engineer|sales executive)\b/i],
  ["Software engineer (any)", /\b(software engineer|software developer|backend engineer|back[- ]end engineer|frontend engineer|front[- ]end engineer|full[- ]?stack engineer|platform engineer)\b/i],
  ["Backend engineer", /\b(backend engineer|back[- ]end engineer|backend developer)\b/i],
  ["Frontend engineer", /\b(frontend engineer|front[- ]end engineer|frontend developer)\b/i],
  ["DevOps / SRE", /\b(devops|site reliability|sre|infrastructure engineer|platform engineer)\b/i],
  ["Designer", /\b(product designer|ux designer|ui designer|design lead|graphic designer)\b/i],
  ["Customer support", /\b(customer support|support specialist|customer success|support engineer)\b/i],
  ["Marketing", /\b(marketing manager|growth marketer|content marketer|performance marketing|demand generation|marketing lead)\b/i],
  ["Data", /\b(data engineer|data scientist|data analyst|analytics engineer)\b/i],
  ["Product manager", /\b(product manager|product owner|product lead|head of product)\b/i],
];

async function main() {
  const all = await getSearchableJobs();
  const ww = all.filter((j) => j.scope === "worldwide");
  const b = stats(all);
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`BOARD ${all.length} listings, ${ww.length} work-from-anywhere (${pct(ww.length, all.length)}%)`);
  console.log(`PAY   ${b.disclosed} of ${all.length} publish a range (${pct(b.disclosed, all.length)}%), median ${money(b.median)}`);
  console.log(`      ${pct(all.length - b.disclosed, all.length)}% publish no number`);
  console.log(`EMPLOYERS ${new Set(all.map((j) => j.company_name)).size}\n`);

  console.log("=== ROLE FAMILIES BY TITLE ===");
  console.log("  family                      roles   w-f-a    pay n   p25        median     p75");
  for (const [label, re] of FAMILIES) {
    const g = all.filter((j) => re.test(j.title));
    const s = stats(g);
    const w = g.filter((j) => j.scope === "worldwide").length;
    console.log(
      `  ${label.padEnd(26)} ${String(s.n).padStart(5)}  ${String(w).padStart(4)} ${("(" + pct(w, s.n) + "%)").padStart(8)}  ${String(s.disclosed).padStart(4)}  ` +
        `${money(s.p25).padStart(9)}  ${money(s.median).padStart(9)}  ${money(s.p75).padStart(9)}`,
    );
  }

  console.log("\n=== AE vs ENGINEER, the comparison the guide is built on ===");
  const ae = all.filter((j) => FAMILIES[0][1].test(j.title));
  const eng = all.filter((j) => FAMILIES[2][1].test(j.title));
  const salesAll = all.filter((j) => FAMILIES[1][1].test(j.title));
  console.log(`  account executive titles : ${ae.length}`);
  console.log(`  all sales titles         : ${salesAll.length}`);
  console.log(`  software engineer titles : ${eng.length}`);
  console.log(`  ratio engineer:AE        : ${(eng.length / Math.max(1, ae.length)).toFixed(2)} to 1`);
  const aes = stats(ae), engs = stats(eng);
  console.log(`  AE pay      : n=${aes.disclosed} p25 ${money(aes.p25)} median ${money(aes.median)} p75 ${money(aes.p75)}`);
  console.log(`  Engineer pay: n=${engs.disclosed} p25 ${money(engs.p25)} median ${money(engs.median)} p75 ${money(engs.p75)}`);

  console.log("\n=== CATEGORY COUNTS (for reference only — Product is a catch-all) ===");
  const cat = new Map<string, Job[]>();
  for (const j of all) {
    if (!cat.has(j.category)) cat.set(j.category, []);
    cat.get(j.category)!.push(j);
  }
  for (const [c, jobs] of [...cat].sort((a, b) => b[1].length - a[1].length)) {
    const s = stats(jobs);
    console.log(`  ${c.padEnd(22)} ${String(jobs.length).padStart(5)}  pay n=${String(s.disclosed).padStart(4)}  median ${money(s.median)}`);
  }

  console.log("\n=== EMPLOYERS WITH THE MOST WORK-FROM-ANYWHERE ROLES (the async-first guide) ===");
  const byCo = new Map<string, Job[]>();
  for (const j of ww) {
    if (!byCo.has(j.company_name)) byCo.set(j.company_name, []);
    byCo.get(j.company_name)!.push(j);
  }
  const ranked = [...byCo].sort((a, b) => b[1].length - a[1].length);
  console.log(`  ${byCo.size} employers share the ${ww.length} work-from-anywhere roles`);
  for (const [c, jobs] of ranked.slice(0, 15)) {
    const total = all.filter((j) => j.company_name === c).length;
    const s = stats(jobs);
    console.log(
      `  ${c.padEnd(24)} ${String(jobs.length).padStart(3)} w-f-a of ${String(total).padStart(3)} total  ` +
        `${pct(jobs.length, total).padStart(5)}% of its roles  pay n=${s.disclosed}${s.median ? " median " + money(s.median) : ""}`,
    );
  }
  const top4 = ranked.slice(0, 4).reduce((n, [, j]) => n + j.length, 0);
  console.log(`  top 4 employers hold ${top4} of ${ww.length} worldwide roles = ${pct(top4, ww.length)}%`);

  console.log("\n=== PAY: WORLDWIDE vs REGIONAL ===");
  const w = stats(ww), r = stats(all.filter((j) => j.scope === "regional"));
  console.log(`  worldwide: n=${w.disclosed} of ${w.n} (${pct(w.disclosed, w.n)}%) median ${money(w.median)}`);
  console.log(`  regional : n=${r.disclosed} of ${r.n} (${pct(r.disclosed, r.n)}%) median ${money(r.median)}`);

  console.log("\n=== DISCLOSURE BY EMPLOYER SIZE (does transparency track scale?) ===");
  const sizes: [string, (n: number) => boolean][] = [
    ["1 role", (n) => n === 1],
    ["2-5 roles", (n) => n >= 2 && n <= 5],
    ["6-20 roles", (n) => n >= 6 && n <= 20],
    ["21+ roles", (n) => n > 20],
  ];
  const countByCo = new Map<string, number>();
  for (const j of all) countByCo.set(j.company_name, (countByCo.get(j.company_name) ?? 0) + 1);
  for (const [label, test] of sizes) {
    const g = all.filter((j) => test(countByCo.get(j.company_name) ?? 0));
    const s = stats(g);
    console.log(`  ${label.padEnd(12)} ${String(s.n).padStart(5)} roles, ${pct(s.disclosed, s.n).padStart(5)}% publish pay, median ${money(s.median)}`);
  }
}

main();
