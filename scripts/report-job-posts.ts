/**
 * Figures behind "How to Write a Remote Job Post Candidates Trust": what the
 * employers on the board actually put in a remote job post.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-job-posts.ts
 *
 * Reads the employer's own text from the capture files (job-content.json and
 * job-content-generic.json, written by verify-and-enrich.ts and
 * enrich-generic.ts). They are gitignored, so this only runs on a machine that
 * has captured. The board's listing records carry short excerpts, and almost
 * everything measured here (hours, leave, equipment, the hiring process)
 * lives in the part of a post the excerpt cuts off.
 *
 * Counted per employer as well as per listing: one employer with dozens of
 * near-identical posts would otherwise decide a "share of listings" on its
 * own. Each pattern prints sample matches so it can be checked by eye before a
 * number from it goes into published prose.
 */
import { existsSync, readFileSync } from "node:fs";
import { getSearchableJobs } from "../src/lib/db";
import { analyzeRemote } from "../src/lib/toolkit/remote-analyzer";
import { applicantAreas } from "../src/lib/seo/job-location";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1)) + "%";
const plain = (h: string) =>
  String(h)
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&amp;|&#39;|&quot;|&rsquo;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function readCapture(name: string): Record<string, { html: string }> {
  const path = `src/lib/generated/${name}`;
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
}

const hasPay = (j: Job) => j.salary != null && (j.salary.min != null || j.salary.max != null);

/** Things a candidate needs to know about a remote job that the location line cannot tell them. */
const SIGNALS: [string, RegExp][] = [
  [
    "async named as a way of working",
    /\b(async(hronous)?[- ](first|by default|communication|culture|work(ing)?|environment|collaboration|team|company)|work(ing)? (asynchronously|async)|asynchronous(ly)? (across|with))\b/i,
  ],
  [
    "hiring steps described",
    /\b(our (interview|hiring|recruitment) process (is|consists|includes|involves|looks|will)|(interview|hiring) process (consists|includes|involves) of|(the|our) (interview|hiring) (process|stages)( typically)? (are|is):|(\d|two|three|four|five|six) (stages|steps|rounds|interviews)( of interviews)?|take[- ]home (task|assignment|exercise|project|challenge)|(paid|work) trial)\b/i,
  ],
  [
    "in-person meetups or travel stated",
    /\b(off-?sites?|retreats?|team (meet-?ups?|gatherings?|summits?|weeks?)|company (meet-?ups?|gatherings?|summits?|offsites?)|in[- ]person (gatherings?|meet-?ups?|team events?)|travel (up to )?\d{1,2} ?%|\d{1,2} ?% (of the time )?travel|travel (\d|once|twice|a few times|several times) (a|per) (year|quarter))\b/i,
  ],
  ["number of leave days stated", /\b(\d{1,2}\+? (working |business |paid )?(days|weeks) (of )?(paid )?(vacation|holidays?|annual leave|pto|time off|leave))\b/i],
  ["unlimited or flexible leave", /\b(unlimited (pto|vacation|paid time off|time off|holidays?)|flexible (pto|time off|vacation|paid time off)|uncapped (pto|vacation|leave))\b/i],
  [
    "equipment or home-office support",
    /\b(home[- ]office (stipend|budget|allowance|setup|equipment)|(equipment|hardware|setup) (stipend|budget|allowance)|(laptop|equipment|hardware) (is |will be )?(provided|supplied)|we (will )?(provide|send) (you )?(a |with a )?(laptop|macbook|equipment)|co-?working (space )?(stipend|allowance|budget|membership)|workspace (stipend|allowance|budget)|wfh (stipend|allowance|budget)|remote[- ]work(ing)? (stipend|allowance|budget))\b/i,
  ],
  ["take-home task or work trial", /\b(take[- ]home (task|assignment|exercise|project|challenge|test)|(paid|work) trial)\b/i],
];

async function main() {
  const content = { ...readCapture("job-content.json"), ...readCapture("job-content-generic.json") };
  const all = await getSearchableJobs();
  const employers = new Set(all.map((j) => j.company_name));
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}   BOARD ${all.length} listings from ${employers.size} employers`);

  // ---- pay, from the listing itself (no capture needed) ----
  const byEmployer = new Map<string, { n: number; pay: number }>();
  for (const j of all) {
    const e = byEmployer.get(j.company_name) ?? { n: 0, pay: 0 };
    e.n++;
    if (hasPay(j)) e.pay++;
    byEmployer.set(j.company_name, e);
  }
  const emps = [...byEmployer.values()];
  const paid = all.filter(hasPay).length;
  console.log(`\nPAY: ${paid} of ${all.length} listings state a range (${pct(paid, all.length)})`);
  console.log(`  employers: every listing states pay ${emps.filter((e) => e.pay === e.n).length}; none does ${emps.filter((e) => e.pay === 0).length}; some do ${emps.filter((e) => e.pay > 0 && e.pay < e.n).length}`);
  const usOpen = all.filter((j) => applicantAreas(j.location, j.scope).some((a) => a.name === "United States"));
  const usPaid = usOpen.filter(hasPay).length;
  console.log(`  open to the US: ${usPaid} of ${usOpen.length} (${pct(usPaid, usOpen.length)}); not: ${paid - usPaid} of ${all.length - usOpen.length} (${pct(paid - usPaid, all.length - usOpen.length)})`);
  const ratios = all
    .filter((j) => j.salary?.currency === "USD" && j.salary.min && j.salary.max && j.salary.max > j.salary.min)
    .map((j) => j.salary.max! / j.salary.min!)
    .sort((a, b) => a - b);
  const q = (p: number) => ratios[Math.min(ratios.length - 1, Math.floor(ratios.length * p))].toFixed(2);
  console.log(`  USD ranges with a top and bottom: ${ratios.length}; top / bottom p25 ${q(0.25)}, median ${q(0.5)}, p75 ${q(0.75)}; at least double: ${ratios.filter((r) => r >= 2).length}`);

  // ---- the location line ----
  const bare = all.filter((j) => j.scope === "regional" && /^\s*remote\s*$/i.test(j.location));
  console.log(`\nLOCATION: ${bare.length} region-locked listings give their location as just "Remote"`);

  // ---- the employer's own text ----
  const cap = all.filter((j) => content[j.apply_url]);
  const text = new Map(cap.map((j) => [j.id, plain(content[j.apply_url].html)]));
  const capEmployers = new Set(cap.map((j) => j.company_name));
  console.log(`\nTEXT: ${cap.length} listings (${pct(cap.length, all.length)}) from ${capEmployers.size} employers have the employer's captured description`);
  const words = cap.map((j) => text.get(j.id)!.split(" ").length).sort((a, b) => a - b);
  console.log(`  words p25 ${words[Math.floor(words.length * 0.25)]}, median ${words[Math.floor(words.length / 2)]}, p75 ${words[Math.floor(words.length * 0.75)]}`);

  const bareWithText = bare.filter((j) => text.has(j.id));
  const bareRestricted = bareWithText.filter((j) => analyzeRemote(text.get(j.id)!).signals.some((s) => s.kind === "restriction" || s.kind === "timezone"));
  console.log(`  of the bare "Remote" listings with text (${bareWithText.length}), the description names a location or hours condition in ${bareRestricted.length}`);

  const tzHits = cap.filter((j) => analyzeRemote(text.get(j.id)!).signals.some((s) => s.kind === "timezone"));
  console.log(`  a time zone or working-hours condition (the analyzer's rules): ${tzHits.length} ${pct(tzHits.length, cap.length)}, ${new Set(tzHits.map((j) => j.company_name)).size} employers`);
  for (const j of tzHits.slice(0, 6)) console.log(`     > [${j.company_name}] ${analyzeRemote(text.get(j.id)!).signals.find((s) => s.kind === "timezone")!.snippet.slice(0, 130)}`);

  for (const [label, re] of SIGNALS) {
    const hit = cap.filter((j) => re.test(text.get(j.id)!));
    const hitEmployers = new Set(hit.map((j) => j.company_name));
    console.log(`\n  ${label}: ${hit.length} listings (${pct(hit.length, cap.length)}), ${hitEmployers.size} of ${capEmployers.size} employers (${pct(hitEmployers.size, capEmployers.size)})`);
    const step = Math.max(1, Math.floor(hit.length / 5));
    for (const j of hit.filter((_, i) => i % step === 0).slice(0, 5)) {
      const t = text.get(j.id)!;
      const i = t.match(re)!.index ?? 0;
      console.log(`     > [${j.company_name}] ${t.slice(Math.max(0, i - 60), i + 80)}`);
    }
  }
}

main();
