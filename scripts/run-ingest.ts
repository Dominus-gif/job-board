/**
 * CLI runner for the ingestion pipeline: `npm run ingest`.
 *
 * By default it runs the pipeline over the bundled seed jobs (offline, no
 * network). Pass `--live` to actually poll the company allow-list's ATS boards.
 *
 *   npm run ingest            # offline dry-run over seed data
 *   npm run ingest -- --live  # hit real ATS APIs for the allow-list
 */
import { runPipeline, ingestAndProcess } from "../src/lib/pipeline";
import type { RawJob } from "../src/lib/types";
import seed from "../src/lib/seed/raw-jobs.json";
import companies from "../src/lib/seed/companies.json";

async function main() {
  const live = process.argv.includes("--live");
  const report = live
    ? await ingestAndProcess(companies as any)
    : runPipeline(seed as RawJob[]);

  console.log(`\n${live ? "LIVE" : "OFFLINE"} ingestion report`);
  console.log("─".repeat(40));
  console.log(`fetched : ${report.fetched}`);
  console.log(`deduped : ${report.deduped}`);
  console.log(`accepted: ${report.accepted}`);
  console.log(`rejected: ${report.rejected}`);

  if (report.rejections.length) {
    console.log("\nRejections:");
    for (const r of report.rejections.slice(0, 20)) {
      console.log(`  ✗ ${r.title} @ ${r.company} — ${r.reason}`);
    }
  }

  console.log("\nAccepted (first 20):");
  for (const j of report.jobs.slice(0, 20)) {
    console.log(`  ✓ [${j.category}] ${j.title} @ ${j.company_name} — ${j.skills.join(", ") || "no skills"}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
