/**
 * Figures behind the LinkedIn and upskilling guides.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-skills.ts
 *
 * The question both guides need answered is the same one: which words do
 * employers actually use, and which skills do they actually name? Advice about
 * profiles and courses is worth very little without that, and it is the one
 * thing a job board can answer from its own data.
 */
import { getSearchableJobs, getAllSkills } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));

function median(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  if (!m.length) return { n: 0, med: null as number | null };
  return { n: m.length, med: m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2) };
}

async function main() {
  const all = await getSearchableJobs();
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}   BOARD ${all.length} listings\n`);

  console.log("=== SKILLS EMPLOYERS NAME, MOST COMMON FIRST ===");
  const skills = await getAllSkills();
  console.log("  skill              listings   share   pay n   median");
  for (const { skill, count } of skills.slice(0, 25)) {
    const g = all.filter((j) => j.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));
    const m = median(g);
    console.log(
      `  ${skill.padEnd(18)} ${String(count).padStart(5)}  ${pct(count, all.length).padStart(5)}%  ${String(m.n).padStart(5)}  ${money(m.med).padStart(10)}`,
    );
  }
  console.log(`  distinct skills named across the board: ${skills.length}`);

  console.log("\n=== TITLE LANGUAGE: the word employers use vs the one people search ===");
  const PAIRS: [string, RegExp, string, RegExp][] = [
    ["product designer", /\bproduct designer\b/i, "ux designer", /\bux designer\b/i],
    ["software engineer", /\bsoftware engineer\b/i, "programmer", /\bprogrammer\b/i],
    ["account executive", /\baccount executive\b/i, "salesperson", /\bsales ?person\b/i],
    ["customer success", /\bcustomer success\b/i, "customer service", /\bcustomer service\b/i],
    ["data scientist", /\bdata scientist\b/i, "data analyst", /\bdata analyst\b/i],
    ["engineering manager", /\bengineering manager\b/i, "tech lead", /\btech lead\b/i],
  ];
  for (const [a, ra, b, rb] of PAIRS) {
    console.log(`  ${a.padEnd(20)} ${String(all.filter((j) => ra.test(j.title)).length).padStart(4)}   vs   ${b.padEnd(18)} ${all.filter((j) => rb.test(j.title)).length}`);
  }

  console.log("\n=== SENIORITY WORDS IN TITLES ===");
  const LEVELS: [string, RegExp][] = [
    ["senior", /\bsenior\b/i],
    ["staff", /\bstaff\b/i],
    ["principal", /\bprincipal\b/i],
    ["lead", /\blead\b/i],
    ["head of", /\bhead of\b/i],
    ["director", /\bdirector\b/i],
    ["junior/entry/graduate", /\b(junior|entry[- ]level|graduate|associate|intern)\b/i],
  ];
  for (const [label, re] of LEVELS) {
    const g = all.filter((j) => re.test(j.title));
    const m = median(g);
    console.log(`  ${label.padEnd(24)} ${String(g.length).padStart(5)} (${pct(g.length, all.length).padStart(5)}%)  pay n=${String(m.n).padStart(3)} median ${money(m.med)}`);
  }

  console.log("\n=== WHAT A PROFILE LOCATION HAS TO MATCH ===");
  const ww = all.filter((j) => j.scope === "worldwide").length;
  console.log(`  listings naming no location at all : ${ww} (${pct(ww, all.length)}%)`);
  console.log(`  listings naming a country or region: ${all.length - ww} (${pct(all.length - ww, all.length)}%)`);

  console.log("\n=== CERTIFICATIONS AND DEGREES, AS NAMED IN TITLES ===");
  const CERTS: [string, RegExp][] = [
    ["AWS", /\baws\b/i],
    ["certified (any)", /\bcertified\b/i],
    ["CPA", /\bcpa\b/i],
    ["PMP", /\bpmp\b/i],
    ["Salesforce", /\bsalesforce\b/i],
    ["Kubernetes", /\bkubernetes\b/i],
    ["security clearance", /\bclearance\b/i],
  ];
  for (const [label, re] of CERTS) {
    console.log(`  ${label.padEnd(22)} ${all.filter((j) => re.test(j.title)).length} in titles`);
  }
}

main();
