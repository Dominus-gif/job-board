/**
 * Figures behind the software engineering, data & ML, and marketing guides.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-fields.ts [swe|data|mkt]
 *
 * Counted by job TITLE. The category filter cannot size a field: it files
 * anything it cannot classify under "Product". See scripts/report-pm.ts.
 * Each cohort prints its matched titles so it can be checked by eye before a
 * number from it goes into published prose.
 */
import { getSearchableJobs } from "../src/lib/db";
import { salaryMidpointUsd } from "../src/lib/salary";
import { applicantAreas } from "../src/lib/seo/job-location";
import type { Job } from "../src/lib/types";
import { FAMILIES } from "../src/lib/title-families";

/** The is/not rules come from the shared module, so this report and the
 *  remote field explorer can never disagree about what a field contains. */
function rulesOf(key: string): { is: RegExp; not: RegExp } {
  const f = FAMILIES.find((x) => x.key === key);
  if (!f) throw new Error(`no family ${key}`);
  return { is: f.is, not: f.not ?? /$^/ };
}

const pct = (n: number, d: number) => (d === 0 ? "0.0" : ((n / d) * 100).toFixed(1));
const money = (n: number | null) => (n == null ? "n/a" : "$" + Math.round(n).toLocaleString("en-US"));

function stats(jobs: Job[]) {
  const m = jobs.map((j) => salaryMidpointUsd(j.salary)).filter((n): n is number => n != null).sort((a, b) => a - b);
  const at = (q: number) => (m.length ? m[Math.min(m.length - 1, Math.floor(m.length * q))] : null);
  const median = m.length ? (m.length % 2 ? m[(m.length - 1) / 2] : Math.round((m[m.length / 2 - 1] + m[m.length / 2]) / 2)) : null;
  return { n: jobs.length, disclosed: m.length, p25: at(0.25), median, p75: at(0.75) };
}

interface Field {
  key: string;
  label: string;
  is: RegExp;
  not: RegExp;
  parts: [string, RegExp][];
}

const JUNIOR = /\b(junior|jr\.?|associate|graduate|entry[- ]level|intern|internship|apprentice|trainee)\b/i;
const SENIOR = /\b(senior|sr\.?)\b/i;
const STAFF = /\b(staff|principal|lead|architect|distinguished)\b/i;
const MANAGER = /\b(manager|head of|director|vp|vice president|chief)\b/i;

const FIELDS: Field[] = [
  {
    key: "swe",
    ...rulesOf("swe"),
    label: "Software engineering",
    parts: [
      ["Backend", /\b(back[- ]?end|backend|golang|rust engineer|java engineer|python engineer|api)\b/i],
      ["Frontend", /\b(front[- ]?end|frontend|web (engineer|developer)|ui engineer)\b/i],
      ["Full-stack", /\bfull[- ]?stack\b/i],
      ["Mobile", /\b(ios|android|mobile)\b/i],
      ["DevOps / SRE / platform / infra", /\b(devops|site reliability|sre|platform engineer|infrastructure engineer|cloud engineer)\b/i],
      ["Security", /\bsecurity engineer\b/i],
      ["QA / test", /\b(qa engineer|test engineer|sdet)\b/i],
      ["Engineering management", /\b(engineering manager|head of engineering|director of engineering|vp of engineering)\b/i],
    ],
  },
  {
    key: "data",
    ...rulesOf("data"),
    label: "Data & machine learning",
    parts: [
      ["Machine learning / AI engineering", /\b(machine learning|ml engineer|mlops|ai engineer|applied ai|deep learning|computer vision|nlp|llm)\b/i],
      ["Research scientist / engineer", /\b(research (scientist|engineer)|applied scientist)\b/i],
      ["Data science", /\b(data scientist|decision scientist|statistician)\b/i],
      ["Data engineering", /\b(data engineer|analytics engineer|data architect)\b/i],
      ["Data / BI analysis", /\b(data analyst|bi (analyst|developer|engineer)|business intelligence)\b/i],
      ["Quant", /\bquantitative (researcher|analyst)\b/i],
    ],
  },
  {
    key: "mkt",
    ...rulesOf("marketing"),
    label: "Marketing",
    parts: [
      ["Product marketing", /\bproduct marketing\b/i],
      ["Growth / performance / paid", /\b(growth|performance marketing|paid (media|social|search)|ppc|sem|acquisition)\b/i],
      ["Content / SEO / copy", /\b(content|seo|copywriter|editorial)\b/i],
      ["Demand gen / lifecycle / email", /\b(demand gen|lifecycle|email marketing|crm|marketing automation|marketing operations|marketing ops)\b/i],
      ["Brand / comms / PR / social", /\b(brand|communications|public relations|pr manager|social media|community)\b/i],
      ["Field / partner / event", /\b(field marketing|partner marketing|event)\b/i],
    ],
  },
];

async function main() {
  const which = process.argv[2];
  const all = await getSearchableJobs();
  const wwAll = all.filter((j) => j.scope === "worldwide").length;
  const board = stats(all);
  console.log(`DATE ${new Date().toISOString().slice(0, 10)}   BOARD ${all.length} listings, ${wwAll} work-from-anywhere (${pct(wwAll, all.length)}%)`);
  console.log(`BOARD pay: ${board.disclosed} of ${board.n} publish (${pct(board.disclosed, board.n)}%), median ${money(board.median)}\n`);

  for (const f of FIELDS) {
    if (which && which !== f.key) continue;
    const jobs = all.filter((j) => f.is.test(j.title) && !f.not.test(j.title));
    const ww = jobs.filter((j) => j.scope === "worldwide");
    const s = stats(jobs);
    console.log("=".repeat(96));
    console.log(`${f.label.toUpperCase()}: ${jobs.length} roles (${pct(jobs.length, all.length)}% of board), ${ww.length} work-from-anywhere (${pct(ww.length, jobs.length)}% of the field)`);
    console.log(`  pay: ${s.disclosed} of ${s.n} publish (${pct(s.disclosed, s.n)}%)  p25 ${money(s.p25)}  median ${money(s.median)}  p75 ${money(s.p75)}`);

    console.log(`\n  -- sample of matched titles (first 45; WW = work-from-anywhere) --`);
    for (const j of jobs.slice(0, 45)) console.log(`    ${j.scope === "worldwide" ? "WW " : "   "}${j.title.slice(0, 62).padEnd(64)}${j.company_name.slice(0, 22)}`);
    const near = all.filter((j) => f.is.test(j.title) && f.not.test(j.title));
    console.log(`  excluded by the NOT rule (${near.length}): ${near.slice(0, 10).map((j) => j.title.slice(0, 38)).join(" | ")}`);

    console.log(`\n  -- sub-disciplines (overlap allowed) --`);
    for (const [label, re] of f.parts) {
      const g = jobs.filter((j) => re.test(j.title));
      const gs = stats(g);
      const w = g.filter((j) => j.scope === "worldwide").length;
      console.log(`    ${label.padEnd(34)} ${String(g.length).padStart(4)} roles  ${String(w).padStart(3)} w-f-a  pay n=${String(gs.disclosed).padStart(3)}  median ${money(gs.median)}`);
    }

    console.log(`\n  -- level, read from the title --`);
    const lv: [string, (j: Job) => boolean][] = [
      ["Junior / entry / associate / intern", (j) => JUNIOR.test(j.title)],
      ["Senior", (j) => SENIOR.test(j.title) && !STAFF.test(j.title)],
      ["Staff / principal / lead / architect", (j) => STAFF.test(j.title)],
      ["Manager / head / director / VP", (j) => MANAGER.test(j.title)],
    ];
    for (const [label, fn] of lv) {
      const g = jobs.filter(fn);
      const gs = stats(g);
      console.log(`    ${label.padEnd(38)} ${String(g.length).padStart(4)} (${pct(g.length, jobs.length).padStart(5)}%)  pay n=${String(gs.disclosed).padStart(3)}  median ${money(gs.median)}`);
    }

    console.log(`\n  -- where (country resolved from the location text) --`);
    const country = new Map<string, number>();
    let none = 0;
    for (const j of jobs) {
      const areas = [...new Set(applicantAreas(j.location, j.scope).map((a) => a.name))];
      if (!areas.length) { none++; continue; }
      for (const a of areas) country.set(a, (country.get(a) ?? 0) + 1);
    }
    for (const [c, n] of [...country].sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(`    ${c.padEnd(22)} ${String(n).padStart(4)}  ${pct(n, jobs.length)}%`);
    console.log(`    ${"no country named".padEnd(22)} ${String(none).padStart(4)}  ${pct(none, jobs.length)}%`);

    console.log(`\n  -- employers --`);
    const co = new Map<string, Job[]>();
    for (const j of jobs) { if (!co.has(j.company_name)) co.set(j.company_name, []); co.get(j.company_name)!.push(j); }
    const ranked = [...co].sort((a, b) => b[1].length - a[1].length);
    const top5 = ranked.slice(0, 5).reduce((n, [, v]) => n + v.length, 0);
    console.log(`    ${co.size} employers for ${jobs.length} roles; top 5 hold ${top5} (${pct(top5, jobs.length)}%)`);
    for (const [c, js] of ranked.slice(0, 12)) console.log(`      ${c.padEnd(28)} ${String(js.length).padStart(3)}  ${js.filter((j) => j.scope === "worldwide").length} w-f-a`);
    const wwCo = new Map<string, number>();
    for (const j of ww) wwCo.set(j.company_name, (wwCo.get(j.company_name) ?? 0) + 1);
    console.log(`    work-from-anywhere roles come from ${wwCo.size} employers: ${[...wwCo].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c} ${n}`).join(", ") || "none"}`);

    console.log(`\n  -- skills named (from the description) --`);
    const sk = new Map<string, number>();
    for (const j of jobs) for (const x of j.skills) sk.set(x, (sk.get(x) ?? 0) + 1);
    console.log("    " + [...sk].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([x, n]) => `${x} ${n} (${pct(n, jobs.length)}%)`).join(" · "));

    const days = jobs.map((j) => Math.round((Date.now() - new Date(j.posted_at).getTime()) / 86400000)).sort((a, b) => a - b);
    if (days.length) console.log(`\n  -- freshness: median ${days[Math.floor(days.length / 2)]}d old; ${days.filter((d) => d <= 7).length} of ${days.length} posted within 7 days`);
    console.log();
  }
}

main();
