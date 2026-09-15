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
import { applyEnrichment, dropIncompleteDescriptions } from "./lib/apply-enrichment";
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
    // The same enrichment the curated build runs. Both halves of the board have
    // to get it: enriching only one left GitLab's opening paragraph on 204
    // snapshot pages while the curated half was already fixed.
    const enrich = applyEnrichment(all as unknown as Parameters<typeof applyEnrichment>[0]);
    if (enrich.available > 0) {
      console.log(`[snapshot] ${enrich.enriched} of ${enrich.available} jobs carry the employer's own description`);
      console.log(`[snapshot] ${enrich.strippedWords} words of repeated company template removed`);
    }

    // Same rule as the curated half: publish only what we can describe.
    const { kept, report: dropReport } = dropIncompleteDescriptions(all as unknown as Parameters<typeof dropIncompleteDescriptions>[0]);
    if (dropReport.dropped > 0) {
      console.log(
        `[snapshot] ${dropReport.dropped} job(s) cannot be described completely — ` +
          (process.env.DROP_INCOMPLETE === "1" ? "dropped" : "kept, held out of the index")
      );
    }
    const publishable = (process.env.DROP_INCOMPLETE === "1" ? kept : all) as unknown as typeof all;

    // Same guard as build-curated: without the capture files this run would
    // publish excerpt-only jobs and lose every fetched description the
    // committed snapshot carries.
    const haveCapture = existsSync(join(process.cwd(), "src", "lib", "generated", "job-content.json"));
    if (!haveCapture) {
      console.warn("[snapshot] no capture files — keeping the committed snapshot.json");
      process.exit(0);
    }

    const existing = existingCount();
    const floor = Math.max(50, Math.floor(existing * 0.7));
    if (publishable.length >= floor) {
      writeFileSync(OUT, JSON.stringify(publishable));
      console.log(`[snapshot] wrote ${publishable.length} jobs (${report.jobs.length} worldwide + ${report.regionalCount} regional).`);
    } else {
      console.warn(`[snapshot] fresh ingest ${publishable.length} < floor ${floor} (existing ${existing}) — keeping existing snapshot.`);
    }
  } catch (err) {
    console.warn("[snapshot] failed — keeping existing snapshot:", (err as Error)?.message);
  }
  process.exit(0); // never fail the build
}

main();
