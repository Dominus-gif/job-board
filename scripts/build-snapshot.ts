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
import { writeFileSync } from "node:fs";
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

async function main() {
  try {
    const report = await ingestAndProcess(companies as any);
    const all = [...report.jobs, ...report.regional].map(lean);
    if (all.length > 0) {
      writeFileSync(OUT, JSON.stringify(all));
      console.log(`[snapshot] wrote ${all.length} jobs (${report.jobs.length} worldwide + ${report.regionalCount} regional).`);
    } else {
      console.warn("[snapshot] ingest returned 0 jobs — keeping existing snapshot.");
    }
  } catch (err) {
    console.warn("[snapshot] failed — keeping existing snapshot:", (err as Error)?.message);
  }
  process.exit(0); // never fail the build
}

main();
