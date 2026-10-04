/**
 * Figures behind the remote job tier list and the work-from-anywhere guides.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-tiers.ts
 *
 * Counted by TITLE. The category filter cannot be used for field sizes: it
 * files anything it cannot classify under "Product". See report-pm.ts.
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));
function stat(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const median = m.length ? (m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2)) : null;
  return { n: jobs.length, disclosed: m.length, median };
}

const FAMILIES: [string, RegExp][] = [
  ["AI / ML / applied AI", /\b(machine learning|ml engineer|applied ai|ai engineer|ai research|deep learning|nlp engineer|computer vision|research scientist)\b/i],
  ["Data (eng/sci/analyst)", /\b(data engineer|data scientist|data analyst|analytics engineer|bi analyst)\b/i],
  ["DevOps / SRE / platform", /\b(devops|site reliability|\bsre\b|platform engineer|infrastructure engineer|cloud engineer)\b/i],
  ["Backend engineer", /\b(backend engineer|back[- ]end engineer|backend developer|server[- ]side engineer)\b/i],
  ["Frontend / web dev", /\b(frontend engineer|front[- ]end engineer|frontend developer|web developer|ui engineer)\b/i],
  ["Full-stack engineer", /\b(full[- ]?stack engineer|full[- ]?stack developer)\b/i],
  ["Software engineer (any)", /\b(software engineer|software developer|backend engineer|frontend engineer|full[- ]?stack engineer|platform engineer)\b/i],
  ["Security", /\b(security engineer|security analyst|appsec|infosec|penetration test|security architect)\b/i],
  ["Product manager", /\b(product manager|product owner|product lead|head of product)\b/i],
  ["Designer", /\b(product designer|ux designer|ui designer|design lead|graphic designer|brand designer)\b/i],
  ["Account executive", /\b(account executive|enterprise ae|sales executive)\b/i],
  ["Sales (all titles)", /\b(account executive|sales manager|account manager|sales development|\bsdr\b|\bbdr\b|sales director|head of sales|sales engineer|sales executive)\b/i],
  ["Marketing", /\b(marketing manager|growth marketer|content marketer|performance marketing|demand generation|marketing lead|seo manager)\b/i],
  ["Customer support / success", /\b(customer support|support specialist|customer success|support engineer|technical support)\b/i],
  ["Finance / accounting", /\b(accountant|financial analyst|controller|finance manager|bookkeep|payroll)\b/i],
  ["Management (any 'manager')", /\bmanager\b/i],
  ["Recruiting / HR / people", /\b(recruiter|talent acquisition|people operations|\bhr\b|human resources)\b/i],
  ["Content writing", /\b(content writer|copywriter|technical writer|content specialist|editor)\b/i],
  ["Data entry", /\b(data entry|data entry clerk|typist)\b/i],
  ["Virtual assistant", /\b(virtual assistant|executive assistant|administrative assistant)\b/i],
  ["Project / program mgmt", /\b(project manager|program manager|scrum master|delivery manager)\b/i],
  ["QA / test", /\b(qa engineer|quality assurance|test engineer|sdet)\b/i],
];

async function main() {
  const all = await getSearchableJobs();
  const ww = all.filter((j) => j.scope === "worldwide");
  const b = stat(all);
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`BOARD ${all.length} listings, ${ww.length} work-from-anywhere (${pct(ww.length, all.length)}%), ${b.disclosed} publish pay\n`);
  console.log("  family                        roles   w-f-a           pay n   median");
  for (const [label, re] of FAMILIES) {
    const g = all.filter((j) => re.test(j.title));
    const s = stat(g);
    const w = g.filter((j) => j.scope === "worldwide").length;
    console.log(
      `  ${label.padEnd(28)} ${String(s.n).padStart(5)}  ${String(w).padStart(4)} ${("(" + pct(w, s.n) + "%)").padStart(8)}  ${String(s.disclosed).padStart(5)}  ${money(s.median).padStart(10)}`,
    );
  }

  console.log("\n=== ENTRY-LEVEL: is there a way in? ===");
  const JUN = /\b(junior|entry[- ]level|associate|graduate|intern|apprentice|trainee|\bjr\b)\b/i;
  const jun = all.filter((j) => JUN.test(j.title));
  console.log(`  junior-ish titles: ${jun.length} of ${all.length} (${pct(jun.length, all.length)}%), worldwide ${jun.filter((j) => j.scope === "worldwide").length}`);
  const junFam = new Map<string, number>();
  for (const j of jun) for (const [label, re] of FAMILIES) if (re.test(j.title)) junFam.set(label, (junFam.get(label) ?? 0) + 1);
  for (const [l, n] of [...junFam].sort((a, b) => b[1] - a[1]).slice(0, 8)) console.log(`     ${l.padEnd(28)} ${n}`);

  console.log("\n=== WORK-FROM-ANYWHERE BY FAMILY (what is actually portable) ===");
  const rows = FAMILIES.map(([label, re]) => {
    const g = all.filter((j) => re.test(j.title));
    const w = g.filter((j) => j.scope === "worldwide").length;
    return { label, n: g.length, w, share: g.length ? w / g.length : 0 };
  }).filter((r) => r.n >= 25).sort((a, b) => b.share - a.share);
  for (const r of rows) console.log(`  ${r.label.padEnd(28)} ${pct(r.w, r.n).padStart(5)}%  (${r.w} of ${r.n})`);
}

main();

/** Headline facts about the work-from-anywhere board, counted directly.
 *
 *  Each fact is counted on its own with its denominator printed next to it,
 *  rather than bucketing every role into exclusive families. An earlier version
 *  did bucket them and the bucketing silently misbehaved, which is a good reason
 *  to prefer the dull version when the output is going into published prose.
 */
async function worldwideFacts() {
  const all = await getSearchableJobs();
  const ww = all.filter((j) => j.scope === "worldwide");
  const share = (n: number) => `${n} of ${ww.length} = ${((n / ww.length) * 100).toFixed(1)}%`;
  const count = (re: RegExp) => ww.filter((j) => re.test(j.title)).length;

  console.log(`\n=== THE WORK-FROM-ANYWHERE BOARD (${ww.length} roles) ===`);
  console.log(`  engineer-titled            ${share(count(/engineer/i))}`);
  console.log(`  manager/director/head/lead ${share(count(/\b(manager|director|head of|lead|vp|chief)\b/i))}`);
  console.log(`  sales-titled               ${share(count(/\b(sales|account executive|account manager|sdr|bdr)\b/i))}`);
  console.log(`  support-titled             ${share(count(/\b(support|customer success)\b/i))}`);

  const JUN = /\b(junior|entry[- ]level|associate|graduate|intern|apprentice|trainee)\b/i;
  const jun = ww.filter((j) => JUN.test(j.title));
  console.log(`  entry-level titles         ${share(jun.length)}`);
  const junCo = new Map<string, number>();
  for (const j of jun) junCo.set(j.company_name, (junCo.get(j.company_name) ?? 0) + 1);
  console.log(`     by employer: ${[...junCo].map(([c, n]) => `${c} ${n}`).join(", ")}`);

  const co = new Map<string, number>();
  for (const j of ww) co.set(j.company_name, (co.get(j.company_name) ?? 0) + 1);
  const ranked = [...co].sort((a, b) => b[1] - a[1]);
  console.log(`  employers                  ${ranked.length}`);
  console.log(`  largest employer           ${ranked[0][0]} with ${share(ranked[0][1])}`);
  console.log(`  top 4 employers            ${share(ranked.slice(0, 4).reduce((n, [, v]) => n + v, 0))}`);
  console.log(`  employers posting only 1   ${ranked.filter(([, n]) => n === 1).length}`);
  console.log(`  board excluding Canonical  ${ww.length - ranked[0][1]} roles from ${ranked.length - 1} employers`);
}
worldwideFacts();
