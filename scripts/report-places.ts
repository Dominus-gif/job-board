/**
 * Figures behind the location guides: Bay Area, Seattle, London, Germany,
 * Canada and Latin America, plus the "online jobs" piece.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-places.ts
 *
 * The matching rules are copied from the landing pages in src/lib/landing.ts on
 * purpose. A guide that counted a place differently from the job list it links
 * to would be contradicting the site one click away.
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import { jobRegions } from "../src/lib/region";
import type { Job } from "../src/lib/types";

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));

function stats(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const at = (q: number) => (m.length ? m[Math.min(m.length - 1, Math.floor(m.length * q))] : null);
  const median = m.length ? (m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2)) : null;
  return { n: jobs.length, disclosed: m.length, p25: at(0.25), median, p75: at(0.75) };
}

/** Exactly the patterns the city landing pages use. */
const CITY: Record<string, RegExp> = {
  "Bay Area": /san francisco|bay area|palo alto|mountain view|menlo|santa clara|sunnyvale|cupertino|redwood|san jose|berkeley|oakland/i,
  Seattle: /seattle|bellevue|redmond|kirkland/i,
  London: /london|england|\buk\b|united kingdom/i,
};

/** Country and continent pages match on the resolved region instead. */
const REGION: Record<string, string> = {
  Germany: "Europe",
  Canada: "Canada",
  "Latin America": "Latin America",
};

/** Germany needs its own text match: the region bucket is the whole continent. */
const GERMANY = /germany|deutschland|berlin|munich|münchen|hamburg|frankfurt|cologne|köln|stuttgart|düsseldorf/i;
const LATAM =
  /latin america|latam|brazil|brasil|mexico|argentina|colombia|chile|peru|uruguay|costa rica|south america|são paulo|sao paulo|buenos aires|bogot|mexico city/i;
const CANADA = /canada|toronto|vancouver|montreal|ottawa|calgary|winnipeg|edmonton|\bon\b, canada/i;

const FIELDS: [string, RegExp][] = [
  ["Software engineering", /\b(software engineer|software developer|backend|frontend|full[- ]?stack|platform engineer)\b/i],
  ["Sales", /\b(account executive|sales|account manager|\bsdr\b|\bbdr\b)\b/i],
  ["Support / success", /\b(customer support|customer success|support engineer|technical support)\b/i],
  ["Product", /\b(product manager|product owner|product lead)\b/i],
  ["Design", /\bdesigner\b|\bdesign lead\b/i],
  ["Data / AI", /\b(data engineer|data scientist|data analyst|machine learning|applied ai)\b/i],
  ["Marketing", /\b(marketing|growth|content|seo)\b/i],
  ["Finance / legal / HR", /\b(finance|accountant|controller|payroll|legal|counsel|recruiter|people ops|human resources)\b/i],
];

function report(label: string, matched: Job[], all: Job[], ww: Job[]) {
  const s = stats(matched);
  const inWw = matched.filter((j) => j.scope === "worldwide").length;
  console.log(`\n${"=".repeat(68)}\n${label.toUpperCase()}`);
  console.log(`  listings matching this place : ${s.n} (${pct(s.n, all.length)}% of the board)`);
  console.log(`  of those, work-from-anywhere : ${inWw}`);
  console.log(`  pay: ${s.disclosed} publish (${pct(s.disclosed, s.n)}%)  p25 ${money(s.p25)}  median ${money(s.median)}  p75 ${money(s.p75)}`);

  const co = new Map<string, number>();
  for (const j of matched) co.set(j.company_name, (co.get(j.company_name) ?? 0) + 1);
  console.log(`  employers: ${co.size}`);
  console.log(
    `  top: ${[...co].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([c, n]) => `${c} (${n})`).join(", ") || "none"}`,
  );

  console.log(`  fields:`);
  for (const [name, re] of FIELDS) {
    const g = matched.filter((j) => re.test(j.title));
    if (!g.length) continue;
    const gs = stats(g);
    console.log(`    ${name.padEnd(22)} ${String(gs.n).padStart(4)}  ${pct(gs.n, s.n).padStart(5)}%  pay n=${String(gs.disclosed).padStart(3)} median ${money(gs.median)}`);
  }

  const days = matched.map((j) => Math.round((Date.now() - new Date(j.posted_at).getTime()) / 86400000)).sort((a, b) => a - b);
  if (days.length) console.log(`  freshness: median ${days[Math.floor(days.length / 2)]}d, within 7d: ${days.filter((d) => d <= 7).length}`);
}

async function main() {
  const all = await getSearchableJobs();
  const ww = all.filter((j) => j.scope === "worldwide");
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}`);
  console.log(`BOARD ${all.length} listings, ${ww.length} work-from-anywhere (${pct(ww.length, all.length)}%)`);
  const b = stats(all);
  console.log(`BOARD PAY ${b.disclosed} publish (${pct(b.disclosed, all.length)}%), median ${money(b.median)}`);

  const regional = all.filter((j) => j.scope === "regional");

  for (const [label, re] of Object.entries(CITY)) {
    report(label, regional.filter((j) => re.test(j.location)), all, ww);
  }
  report("Germany", regional.filter((j) => GERMANY.test(j.location)), all, ww);
  report("Canada", regional.filter((j) => CANADA.test(j.location) || jobRegions(j.location).includes("Canada")), all, ww);
  report("Latin America", regional.filter((j) => LATAM.test(j.location) || jobRegions(j.location).includes("Latin America")), all, ww);

  // The "online jobs" piece is about what the phrase actually returns.
  console.log(`\n${"=".repeat(68)}\nONLINE / WORK-FROM-HOME SEARCH TERMS`);
  const TERMS: [string, RegExp][] = [
    ["data entry", /\bdata entry\b/i],
    ["typing", /\btypist|typing\b/i],
    ["virtual assistant", /\bvirtual assistant\b/i],
    ["transcription", /\btranscription|transcriber\b/i],
    ["online tutor", /\b(tutor|teacher|instructor)\b/i],
    ["survey / microtask", /\bsurvey|microtask|clickwork\b/i],
    ["customer service", /\b(customer service|customer support)\b/i],
    ["freelance writer", /\b(writer|copywriter|content writer)\b/i],
    ["moderator", /\bmoderat/i],
    ["annotator / AI training", /\b(annotator|data annotation|ai trainer|labell?er)\b/i],
  ];
  for (const [term, re] of TERMS) {
    const g = all.filter((j) => re.test(j.title));
    const gs = stats(g);
    console.log(`  ${term.padEnd(24)} ${String(gs.n).padStart(4)} roles  ${String(g.filter((j) => j.scope === "worldwide").length).padStart(3)} w-f-a  pay n=${String(gs.disclosed).padStart(3)} median ${money(gs.median)}`);
  }
  const entry = all.filter((j) => /\b(junior|entry[- ]level|graduate|associate|intern|no experience)\b/i.test(j.title));
  console.log(`  entry-level titles anywhere on the board: ${entry.length} (${pct(entry.length, all.length)}%)`);
}

main();
