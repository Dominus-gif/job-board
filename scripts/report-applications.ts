/**
 * Figures behind the remote resume and cover letter guides: what the
 * employers on the board ask applicants for, in their own words.
 *
 *   git checkout -- src/lib/generated/
 *   ANYWHERE_LIVE=false npx tsx scripts/report-applications.ts
 *
 * Uses the employer's full text where a capture holds it (job-content*.json,
 * gitignored, so this runs only on a machine that has captured) and otherwise
 * the listing's own description when that is long enough to be the whole post.
 * Counted per listing and per employer, like scripts/report-job-posts.ts, so
 * one employer with dozens of near-identical posts cannot decide a share.
 * Prints sample matches for each pattern so it can be checked by eye.
 */
import { existsSync, readFileSync } from "node:fs";
import { getSearchableJobs } from "../src/lib/db";

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

const SIGNALS: [string, RegExp][] = [
  ["mentions a cover letter", /\bcover (letter|note)s?\b/i],
  ["cover letter optional / not needed", /\b(cover letters? (is |are )?(optional|not required|not necessary|not needed)|no cover letters?|(don't|do not) (need|require) a cover letter|skip the cover letter)\b/i],
  ["written communication asked for", /\b(written (communication|communicator|english)|strong writer|excellent writ(ing|er)|clear(ly)? (in )?writ(ing|ten)|communicate (clearly )?in writing)\b/i],
  ["async named", /\b(async(hronous)?[- ](first|by default|communication|culture|work(ing)?|environment|collaboration|team|company)|work(ing)? (asynchronously|async)|asynchronous(ly)?)\b/i],
  ["self-direction asked for", /\b(self[- ](starter|motivated|directed|driven|managed)|work(s|ing)? independently|high (degree of )?autonomy|minimal (supervision|direction)|own(ing)? your (time|schedule|work))\b/i],
  ["prior remote experience asked for", /\b((previous|prior|proven) (experience )?(working )?(remote(ly)?|in a remote|in a distributed)|experience (working )?(remote(ly)?|in a (fully )?(remote|distributed) (team|environment|company)))\b/i],
  ["portfolio or work samples", /\b(portfolio|github profile|code samples?|writing samples?|work samples?|case stud(y|ies) of your work)\b/i],
  ["resume / CV asked for by name", /\b(resume|résumé|cv)\b/i],
  ["application questions / screening", /\b(application questions|screening questions|answer (a few|the following|some) questions)\b/i],
];

async function main() {
  const content = { ...readCapture("job-content.json"), ...readCapture("job-content-generic.json") };
  const all = await getSearchableJobs();
  const texts: { job: (typeof all)[number]; text: string }[] = [];
  for (const j of all) {
    const captured = content[j.apply_url]?.html;
    const text = plain(captured ?? j.description_html ?? "");
    if (text.length >= 1500) texts.push({ job: j, text });
  }
  const employers = new Set(texts.map((t) => t.job.company_name));
  console.log(`DATE ${new Date().toISOString().slice(0, 10)} · board ${all.length} · with full text ${texts.length} from ${employers.size} employers`);
  for (const [name, re] of SIGNALS) {
    const hits = texts.filter((t) => re.test(t.text));
    const emp = new Set(hits.map((t) => t.job.company_name));
    console.log(`${name.padEnd(40)} listings ${String(hits.length).padStart(5)} (${pct(hits.length, texts.length)}) · employers ${emp.size} (${pct(emp.size, employers.size)})`);
    for (const h of hits.slice(0, 3)) {
      const m = h.text.match(re)!;
      const i = Math.max(0, (m.index ?? 0) - 60);
      console.log(`     ${h.job.company_name}: …${h.text.slice(i, i + 150)}…`);
    }
  }
}
main();
