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
import { feedPosting, isOpen } from "./lib/snapshot-rules";
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

/**
 * How many open jobs the currently-committed snapshot holds (0 if none/invalid).
 * Expired ones do not count: see isOpen for how they held the floor out of reach.
 */
function existingCount(): number {
  try {
    if (existsSync(OUT)) return (JSON.parse(readFileSync(OUT, "utf8")) as Job[]).filter((j) => isOpen(j)).length;
  } catch {
    /* ignore a malformed/partial file */
  }
  return 0;
}

async function main() {
  try {
    const report = await ingestAndProcess(companies as any);
    const all = [...report.jobs, ...report.regional];
    // The same enrichment the curated build runs. Both halves of the board have
    // to get it: enriching only one left GitLab's opening paragraph on 204
    // snapshot pages while the curated half was already fixed. It runs BEFORE
    // the excerpt cut, because the feed's own text is only usable whole.
    const enrich = applyEnrichment(all as unknown as Parameters<typeof applyEnrichment>[0], feedPosting);
    if (enrich.available > 0) {
      console.log(
        `[snapshot] ${enrich.enriched} of ${all.length} jobs carry the employer's own description ` +
          `(${enrich.enriched - enrich.fromFeed} captured, ${enrich.fromFeed} from the feed's own posting)`,
      );
      console.log(`[snapshot] ${enrich.strippedWords} words of repeated company template removed`);
    }

    // Same rule as the curated half: publish only what we can describe.
    const excerpts = all.map(lean);
    const { kept, report: dropReport } = dropIncompleteDescriptions(excerpts as unknown as Parameters<typeof dropIncompleteDescriptions>[0]);
    if (dropReport.dropped > 0) {
      console.log(
        `[snapshot] ${dropReport.dropped} job(s) cannot be described completely — ` +
          (process.env.KEEP_INCOMPLETE === "1" ? "kept (KEEP_INCOMPLETE=1)" : "removed")
      );
    }
    const describable = (process.env.KEEP_INCOMPLETE === "1" ? excerpts : kept) as unknown as Job[];
    const publishable = describable.filter((j) => isOpen(j));
    if (publishable.length < describable.length) {
      console.log(`[snapshot] ${describable.length - publishable.length} job(s) already past the 60-day rule — not written`);
    }

    // Kept so the snapshot has one writer. The feed's own text means a run
    // without the capture files no longer loses descriptions, but the deploy
    // build is not where the snapshot should change: the description refresh
    // (enrich.yml) rewrites and commits it, so the committed file is exactly
    // what the site serves, and figures counted from it match the live board.
    const haveCapture = existsSync(join(process.cwd(), "src", "lib", "generated", "job-content.json"));
    if (!haveCapture) {
      console.warn("[snapshot] no capture files — keeping the committed snapshot.json");
      process.exit(0);
    }

    const existing = existingCount();
    const floor = Math.max(50, Math.floor(existing * 0.7));
    if (publishable.length >= floor) {
      writeFileSync(OUT, JSON.stringify(publishable));
      const worldwide = publishable.filter((j) => j.scope === "worldwide").length;
      console.log(`[snapshot] wrote ${publishable.length} jobs (${worldwide} worldwide + ${publishable.length - worldwide} regional).`);
    } else {
      console.warn(`[snapshot] fresh ingest ${publishable.length} < floor ${floor} (existing ${existing} open) — keeping existing snapshot.`);
    }
  } catch (err) {
    console.warn("[snapshot] failed — keeping existing snapshot:", (err as Error)?.message);
  }
  process.exit(0); // never fail the build
}

main();
