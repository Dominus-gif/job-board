/**
 * Retire listings whose apply link is gone.
 *
 * The board trusts the feed: a job stays until it drops out of the next
 * scrape. That is right for the ATS boards we poll, but it is wrong for the
 * ~3,500 listings that came from one-off imports and aggregator feeds we no
 * longer re-read. Those sit here indefinitely, and the first thing a visitor
 * learns is that the employer closed the role weeks ago.
 *
 * Why this is a sweep and not a check-on-view: querying the employer on every
 * page view is what got us rate-limited before (see src/lib/liveness.ts), and
 * a rate-limited ATS breaks the ingest that feeds the whole board. A scheduled
 * sweep spends a fixed, small budget of requests and writes a verdict the
 * runtime just reads.
 *
 * The rules it works to, in order of how much damage getting them wrong does:
 *
 *   1. Only 404 and 410 count as dead, plus a posting that gets BOUNCED to the
 *      board it lived on — Greenhouse answers a removed posting with a 200 at
 *      /acme?error=true, so status alone is not enough. A 403, a 429, a 5xx or
 *      a timeout is us being blocked or the host being unwell — never the job
 *      being gone.
 *   2. Two consecutive dead readings before a job is retired. One bad night
 *      should not empty a company's page.
 *   3. A circuit breaker on how many came back ALIVE, not on how many came back
 *      dead. Under 40% success means we are being blocked, and nothing is
 *      written. A ceiling on the dead share would have refused the first real
 *      sweep, which legitimately finds a large backlog.
 *   4. A budget per run, oldest-checked first, so every listing comes round
 *      again on a predictable cycle without ever hammering anyone.
 *
 * Usage: npx tsx scripts/check-liveness.ts [--budget 1500] [--dry]
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

type Verdict = "alive" | "dead" | "unknown";

interface Record_ {
  /** ISO timestamp of the last completed check. */
  at: string;
  /** Consecutive dead readings. Retired at DEAD_STRIKES. */
  strikes: number;
  last: Verdict;
}

type Ledger = Record<string, Record_>;

const LEDGER_PATH = join(process.cwd(), "src", "lib", "generated", "job-liveness.json");
const DEAD_STRIKES = 2;
const CONCURRENCY = 10;
const PER_HOST_GAP_MS = 250;
const TIMEOUT_MS = 10_000;
/**
 * The floor for "we can still reach the internet". Below this we are being
 * blocked, and a 404 read while blocked means nothing. Deliberately a test on
 * the ALIVE share rather than a ceiling on the dead share: a first sweep of a
 * board holding years of one-off imports genuinely finds a large backlog, and
 * a ceiling would refuse to do the job it was written for.
 */
const MIN_ALIVE_RATIO = 0.4;
/** Below this age a posting is almost certainly still up; do not spend a request. */
const MIN_AGE_DAYS = 7;

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const BUDGET = Number(args[args.indexOf("--budget") + 1]) || 1500;

function loadLedger(): Ledger {
  if (!existsSync(LEDGER_PATH)) return {};
  try {
    return JSON.parse(readFileSync(LEDGER_PATH, "utf8")) as Ledger;
  } catch {
    return {};
  }
}

/**
 * Did this request get bounced from a posting to the board it lived on?
 *
 * That is how several ATSs report a removed posting: Greenhouse answers
 * /acme/jobs/123 with a 200 at /acme?error=true, so status alone says the
 * listing is fine when it is not.
 *
 * The comparison has to be between the ORIGINAL url and the final one. An
 * earlier version tested the final url alone and called anything ending in
 * /careers dead — which flagged the directory-style listings that legitimately
 * point at a company's careers page and never redirected at all. A listing is
 * only bounced if it started deeper than it ended.
 */
function bouncedToRoot(originalUrl: string, finalUrl: string): boolean {
  try {
    const from = new URL(originalUrl);
    const to = new URL(finalUrl);
    const fromDepth = from.pathname.split("/").filter(Boolean).length;
    const toDepth = to.pathname.split("/").filter(Boolean).length;
    if (toDepth >= fromDepth) return false; // never went anywhere shallower
    if (to.searchParams.get("error")) return true; // Greenhouse says so outright
    return toDepth <= 1;
  } catch {
    return false;
  }
}

const lastHitAt = new Map<string, number>();
async function politeDelay(host: string) {
  const last = lastHitAt.get(host) ?? 0;
  const wait = last + PER_HOST_GAP_MS - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHitAt.set(host, Date.now());
}

async function probe(url: string): Promise<Verdict> {
  let host: string;
  try {
    host = new URL(url).hostname;
  } catch {
    return "unknown";
  }
  await politeDelay(host);

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    // HEAD first; some boards answer 405 to it, in which case fall back to GET.
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "getremotejobsnow-liveness/1.0 (+https://getremotejobsnow.com)" },
    });
    if (res.status === 405 || res.status === 501) {
      await politeDelay(host);
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "user-agent": "getremotejobsnow-liveness/1.0 (+https://getremotejobsnow.com)" },
      });
    }
    if (res.status === 404 || res.status === 410) return "dead";
    if (res.ok && bouncedToRoot(url, res.url)) return "dead";
    if (res.ok) return "alive";
    // 403, 429, 5xx: us being blocked or them being unwell. Not a verdict.
    return "unknown";
  } catch {
    return "unknown";
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const { getSearchableJobs } = await import("../src/lib/db");
  const jobs = await getSearchableJobs();
  const ledger = loadLedger();
  const now = Date.now();

  const candidates = jobs
    .filter((j) => {
      if (!j.apply_url?.startsWith("http")) return false;
      const ageDays = (now - new Date(j.posted_at).getTime()) / 86_400_000;
      return ageDays >= MIN_AGE_DAYS;
    })
    // Oldest-checked first, never-checked before that, so coverage rotates.
    .sort((a, b) => {
      const at = ledger[a.apply_url]?.at ?? "";
      const bt = ledger[b.apply_url]?.at ?? "";
      return at.localeCompare(bt);
    })
    .slice(0, BUDGET);

  console.log(`[liveness] ${jobs.length} listings, ${candidates.length} to check this run (budget ${BUDGET})`);

  const results: { url: string; verdict: Verdict; host: string }[] = [];
  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < candidates.length) {
        const job = candidates[cursor++];
        const verdict = await probe(job.apply_url);
        let host = "?";
        try { host = new URL(job.apply_url).hostname; } catch { /* keep ? */ }
        results.push({ url: job.apply_url, verdict, host });
        if (results.length % 200 === 0) console.log(`[liveness]   ${results.length}/${candidates.length}`);
      }
    })
  );

  const tally = results.reduce<Record<Verdict, number>>(
    (acc, r) => ({ ...acc, [r.verdict]: acc[r.verdict] + 1 }),
    { alive: 0, dead: 0, unknown: 0 }
  );
  const decided = tally.alive + tally.dead;
  const deadRatio = decided > 0 ? tally.dead / decided : 0;
  console.log(`[liveness] alive ${tally.alive}  dead ${tally.dead}  unknown ${tally.unknown}  (dead ${(deadRatio * 100).toFixed(1)}% of decided)`);

  // Where the dead ones are concentrated. A systemic fault spreads evenly; a
  // genuine backlog clusters in the sources we no longer re-scrape.
  const deadByHost = new Map<string, number>();
  for (const r of results) if (r.verdict === "dead") deadByHost.set(r.host, (deadByHost.get(r.host) ?? 0) + 1);
  const top = [...deadByHost.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  if (top.length) console.log(`[liveness] dead by host: ${top.map(([h, n]) => `${h}=${n}`).join("  ")}`);
  for (const r of results.filter((x) => x.verdict === "dead").slice(0, 3)) {
    console.log(`[liveness]   e.g. dead: ${r.url.slice(0, 96)}`);
  }

  // The breaker is for "we cannot reach anything", not for "the board has a
  // backlog". A real backlog still returns plenty of 200s alongside the 404s;
  // an egress or DNS failure returns almost none. So the test is on how many
  // came back ALIVE, not on the dead share — which on a first sweep of a board
  // carrying years of one-off imports is legitimately high.
  const aliveRatio = decided > 0 ? tally.alive / decided : 0;
  if (decided >= 40 && aliveRatio < MIN_ALIVE_RATIO) {
    console.error(
      `[liveness] ABORTED: only ${(aliveRatio * 100).toFixed(1)}% of decided checks came back alive, below the ${MIN_ALIVE_RATIO * 100}% floor. We are being blocked, so the 404s mean nothing. Nothing written.`
    );
    process.exitCode = 1;
    return;
  }


  const at = new Date().toISOString();
  let retired = 0;
  let revived = 0;
  for (const { url, verdict } of results) {
    const prev = ledger[url];
    if (verdict === "unknown") {
      // Record that we looked, so the rotation moves on, but change nothing.
      ledger[url] = { at, strikes: prev?.strikes ?? 0, last: "unknown" };
      continue;
    }
    if (verdict === "dead") {
      const strikes = (prev?.strikes ?? 0) + 1;
      ledger[url] = { at, strikes, last: "dead" };
      if (strikes >= DEAD_STRIKES && (prev?.strikes ?? 0) < DEAD_STRIKES) retired++;
    } else {
      if ((prev?.strikes ?? 0) >= DEAD_STRIKES) revived++;
      ledger[url] = { at, strikes: 0, last: "alive" };
    }
  }

  const totalRetired = Object.values(ledger).filter((r) => r.strikes >= DEAD_STRIKES).length;
  console.log(`[liveness] newly retired ${retired}, came back ${revived}, retired in total ${totalRetired}`);

  if (DRY) {
    console.log("[liveness] --dry: ledger not written");
    return;
  }
  mkdirSync(dirname(LEDGER_PATH), { recursive: true });
  writeFileSync(LEDGER_PATH, JSON.stringify(ledger));
  console.log(`[liveness] wrote ${Object.keys(ledger).length} records to ${LEDGER_PATH}`);
}

main().catch((err) => {
  console.error("[liveness] failed:", err);
  process.exitCode = 1;
});
