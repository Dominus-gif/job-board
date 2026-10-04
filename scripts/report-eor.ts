/**
 * Figures behind the "Contractor, employee or employer of record?" guide.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-eor.ts
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));
function med(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  if (!m.length) return { n: 0, median: null as number | null };
  return { n: m.length, median: m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2) };
}

const text = (j: Job) => `${j.title} ${j.description_html || ""}`.toLowerCase();

const PATTERNS: [string, RegExp][] = [
  ["employer of record / EOR", /\b(employer of record|\beor\b)\b/],
  ["named EOR vendors", /\b(deel|remote\.com|oyster|velocity global|globalization partners|g-p\b|papaya global|rippling eor|multiplier)\b/],
  ["contractor / self-employed", /\b(independent contractor|as a contractor|contractor basis|self-employed|b2b contract|freelance)\b/],
  ["local entity / subsidiary", /\b(local entity|our entity|legal entity|subsidiary)\b/],
  ["umbrella / PEO", /\b(umbrella company|\bpeo\b|professional employer organi)\b/],
  ["must have own company", /\b(own company|your own business|invoice us|issue invoices|registered business)\b/],
  ["benefits mentioned", /\b(health insurance|private medical|pension|401\(?k\)?|retirement plan)\b/],
  ["equity mentioned", /\b(equity|stock options|rsus?)\b/],
  ["paid leave mentioned", /\b(paid time off|\bpto\b|annual leave|holiday allowance|vacation days)\b/],
];

async function main() {
  const all = await getSearchableJobs();
  const ww = all.filter((j) => j.scope === "worldwide");
  const withDesc = all.filter((j) => (j.description_html || "").length > 200);
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`BOARD ${all.length} listings, ${ww.length} work-from-anywhere`);
  console.log(`listings with a usable description: ${withDesc.length} (${pct(withDesc.length, all.length)}%)\n`);

  console.log("=== EMPLOYMENT TYPE AS ADVERTISED ===");
  const byType = new Map<string, Job[]>();
  for (const j of all) {
    if (!byType.has(j.employment_type)) byType.set(j.employment_type, []);
    byType.get(j.employment_type)!.push(j);
  }
  for (const [t, jobs] of [...byType].sort((a, b) => b[1].length - a[1].length)) {
    const m = med(jobs);
    const w = jobs.filter((j) => j.scope === "worldwide").length;
    console.log(`  ${t.padEnd(12)} ${String(jobs.length).padStart(5)} (${pct(jobs.length, all.length).padStart(5)}%)  worldwide ${String(w).padStart(3)} (${pct(w, jobs.length)}%)  pay n=${String(m.n).padStart(3)} median ${money(m.median)}`);
  }

  console.log("\n=== HOW LISTINGS DESCRIBE THE ARRANGEMENT (searching descriptions) ===");
  for (const [label, re] of PATTERNS) {
    const hits = withDesc.filter((j) => re.test(text(j)));
    const w = hits.filter((j) => j.scope === "worldwide").length;
    console.log(`  ${label.padEnd(26)} ${String(hits.length).padStart(4)} listings (${pct(hits.length, withDesc.length).padStart(5)}% of described)  of which worldwide: ${w}`);
  }

  console.log("\n=== THE SAME, RESTRICTED TO WORK-FROM-ANYWHERE ROLES ===");
  const wwDesc = ww.filter((j) => (j.description_html || "").length > 200);
  console.log(`  (${wwDesc.length} worldwide listings have a usable description)`);
  for (const [label, re] of PATTERNS) {
    const hits = wwDesc.filter((j) => re.test(text(j)));
    console.log(`  ${label.padEnd(26)} ${String(hits.length).padStart(3)} (${pct(hits.length, wwDesc.length).padStart(5)}%)`);
  }

  console.log("\n=== EMPLOYERS WHOSE LISTINGS MENTION EOR OR CONTRACTOR TERMS ===");
  const eorRe = /\b(employer of record|\beor\b|independent contractor|contractor basis)\b/;
  const co = new Map<string, number>();
  for (const j of withDesc) if (eorRe.test(text(j))) co.set(j.company_name, (co.get(j.company_name) ?? 0) + 1);
  for (const [c, n] of [...co].sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${c.padEnd(26)} ${n}`);
  console.log(`  distinct employers: ${co.size}`);

  console.log("\n=== CONTRACT ROLES: WHO AND WHERE ===");
  const contract = all.filter((j) => j.employment_type === "Contract");
  const cco = new Map<string, number>();
  for (const j of contract) cco.set(j.company_name, (cco.get(j.company_name) ?? 0) + 1);
  for (const [c, n] of [...cco].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`  ${c.padEnd(26)} ${n}`);
  const cLoc = new Map<string, number>();
  for (const j of contract) cLoc.set(j.location, (cLoc.get(j.location) ?? 0) + 1);
  console.log(`  top locations: ${[...cLoc].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l, n]) => `${l.slice(0, 26)} (${n})`).join(", ")}`);
}

main();
