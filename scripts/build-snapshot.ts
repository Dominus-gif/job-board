/**
 * Build-time job snapshot.
 *
 * Runs the full ingest once and writes every published job (worldwide +
 * regional) to src/lib/generated/snapshot.json. This snapshot is bundled with
 * the deployment and used as the store's fallback, so on ephemeral hosts like
 * Vercel — where a fresh serverless instance can't keep live state and a
 * runtime scrape may time out — the site always serves the full list instead of
 * collapsing to the 10-job seed.
 *
 * Non-fatal: if the ingest fails or returns nothing, the existing snapshot is
 * kept and the build still succeeds.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Job } from "../src/lib/types";
import { ingestAndProcess } from "../src/lib/pipeline";
import companies from "../src/lib/seed/companies.json";

const OUT = join(process.cwd(), "src", "lib", "generated", "snapshot.json");

/**
 * The snapshot is a *fallback* used when a live scrape isn't available. Cards
 * don't need the description and prerendered job pages get the full description
 * from the build's own live fetch, so we keep only a short excerpt here — this
 * cuts the file from ~9MB to well under 2MB (committable + light to bundle).
 */
function lean(job: Job): Job {
  const text = (job.description_html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const excerpt = text ? `<p>${text.slice(0, 600)}${text.length > 600 ? "…" : ""}</p>` : "";
  return { ...job, description_html: excerpt };
}

/** How many jobs the currently-committed snapshot holds (0 if none/invalid). */
function existingCount(): number {
  try {
    if (existsSync(OUT)) return (JSON.parse(readFileSync(OUT, "utf8")) as unknown[]).length;
  } catch {
    /* ignore a malformed/partial file */
  }
  return 0;
}

async function main() {
  try {
    const report = await ingestAndProcess(companies as any);
    const all = [...report.jobs, ...report.regional].map(lean);
    // Never clobber a good committed snapshot with a materially smaller one. On
    // a flaky build (Vercel egress hiccup, ATS rate limit) a partial scrape can
    // return a handful of jobs; keeping the committed file guarantees the
    // deployment always bundles the full baseline. Only overwrite when the fresh
    // scrape is at least 70% of what we already have (and non-trivial).
    const existing = existingCount();
    const floor = Math.max(50, Math.floor(existing * 0.7));
    if (all.length >= floor) {
      writeFileSync(OUT, JSON.stringify(all));
      console.log(`[snapshot] wrote ${all.length} jobs (${report.jobs.length} worldwide + ${report.regionalCount} regional).`);
    } else {
      console.warn(`[snapshot] fresh ingest ${all.length} < floor ${floor} (existing ${existing}) — keeping existing snapshot.`);
    }
  } catch (err) {
    console.warn("[snapshot] failed — keeping existing snapshot:", (err as Error)?.message);
  }
  process.exit(0); // never fail the build
}

main();
