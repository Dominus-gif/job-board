/**
 * Figures behind the remote DevOps, SRE and platform engineering guide.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-devops.ts
 *
 * Counted by job TITLE inside the software engineering family, with the same
 * "DevOps / SRE / platform / infra" rule scripts/report-fields.ts uses for the
 * software engineering guide, so the two articles agree. Prints the matched
 * titles so the cohort can be checked by eye before a number is published.
 */
import { getAllJobs, getRegionalJobs } from "../src/lib/db";
import { broadRegions } from "../src/lib/geo";
import { salaryMidpointUsd } from "../src/lib/salary";
import { FAMILIES, JUNIOR_TITLE, baseTitle, inFamily } from "../src/lib/title-families";

const OPS = /\b(devops|site reliability|sre|platform engineer|infrastructure engineer|cloud engineer)\b/i;
const pct = (n: number, d: number) => (d ? ((n / d) * 100).toFixed(1) : "0.0");
const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

async function main() {
  const ww = await getAllJobs();
  const reg = await getRegionalJobs();
  const all = [...ww, ...reg];
  const swe = FAMILIES.find((f) => f.key === "swe")!;
  const sweJobs = all.filter((j) => inFamily(swe, j.title));
  const ops = sweJobs.filter((j) => OPS.test(j.title));
  console.log(`board ${all.length} · software engineering ${sweJobs.length} · devops/sre/platform/infra ${ops.length} (${pct(ops.length, sweJobs.length)}% of SWE, ${pct(ops.length, all.length)}% of board)`);

  const parts: [string, RegExp][] = [
    ["Platform", /\bplatform engineer/i],
    ["SRE", /\b(site reliability|sre)\b/i],
    ["DevOps", /\bdevops\b/i],
    ["Infrastructure", /\binfrastructure engineer/i],
    ["Cloud", /\bcloud engineer/i],
  ];
  for (const [name, re] of parts) console.log(`  ${name.padEnd(15)} ${ops.filter((j) => re.test(j.title)).length}`);

  const worldwide = ops.filter((j) => j.scope === "worldwide");
  console.log(`worldwide ${worldwide.length} (${pct(worldwide.length, ops.length)}%) vs board ${pct(ww.length, all.length)}%`);
  for (const j of worldwide) console.log(`   WW: ${j.title} · ${j.company_name}`);

  const regions = new Map<string, number>();
  for (const j of ops) for (const r of broadRegions(j)) regions.set(r, (regions.get(r) ?? 0) + 1);
  console.log("regions:", [...regions].sort((a, b) => b[1] - a[1]).map(([r, n]) => `${r} ${n} (${pct(n, ops.length)}%)`).join(" · "));

  const junior = ops.filter((j) => JUNIOR_TITLE.test(j.title));
  const senior = ops.filter((j) => /\b(senior|sr\.?|staff|principal|lead)\b/i.test(j.title));
  console.log(`junior titles ${junior.length} · senior/staff/principal/lead ${senior.length} (${pct(senior.length, ops.length)}%)`);
  for (const j of junior) console.log(`   JR: ${j.title} · ${j.company_name}`);

  const pay = ops.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const q = (p: number) => pay[Math.min(pay.length - 1, Math.floor(pay.length * p))];
  if (pay.length >= 15) console.log(`USD ranges ${pay.length} (${pct(pay.length, ops.length)}%): p25 ${money(q(0.25))} · median ${money(q(0.5))} · p75 ${money(q(0.75))}`);
  else console.log(`USD ranges ${pay.length}: too few for a median`);
  const usPay = ops.filter((j) => broadRegions(j).includes("United States")).map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  if (usPay.length >= 15) console.log(`US-located with USD range ${usPay.length}: median ${money(usPay[Math.floor(usPay.length / 2)])}`);

  const skills = new Map<string, number>();
  for (const j of ops) for (const s of j.skills ?? []) skills.set(s, (skills.get(s) ?? 0) + 1);
  console.log("skills:", [...skills].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([s, n]) => `${s} ${n} (${pct(n, ops.length)}%)`).join(" · "));

  const employers = new Map<string, number>();
  for (const j of ops) employers.set(j.company_name, (employers.get(j.company_name) ?? 0) + 1);
  console.log(`employers ${employers.size}:`, [...employers].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([c, n]) => `${c} ${n}`).join(" · "));

  const titles = new Map<string, number>();
  for (const j of ops) titles.set(baseTitle(j.title), (titles.get(baseTitle(j.title)) ?? 0) + 1);
  console.log("titles:", [...titles].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([t, n]) => `${t} ${n}`).join(" · "));
}
main();
