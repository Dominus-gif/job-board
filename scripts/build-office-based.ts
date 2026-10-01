/**
 * Lists the committed listings whose own description states an office
 * attendance requirement, so the runtime can drop them by id.
 *
 * Why a generated list rather than a check in the serving path: the location
 * test is a short string and runs per request happily (see dropOnsite in
 * store.ts), but the description test would scan every stored excerpt on every
 * isolate boot, and Workers CPU is the one budget this site is short of.
 *
 * Why not do it in build-curated.ts, where the same test already runs: that
 * script keeps the committed curated-jobs.json untouched unless the enrichment
 * capture files are present, which they are not in CI. So its filtering never
 * reaches production. This one reads the committed data directly and costs
 * nothing but a file read.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Job } from "../src/lib/types";
import { descriptionRequiresOffice, locationRequiresOffice } from "../src/lib/pipeline/filter";

const read = (rel: string): Job[] => {
  try {
    const raw = JSON.parse(readFileSync(join(process.cwd(), rel), "utf8"));
    return Array.isArray(raw) ? (raw as Job[]) : ((raw?.jobs ?? []) as Job[]);
  } catch {
    return [];
  }
};

const rows = [...read("src/lib/generated/curated-jobs.json"), ...read("src/lib/generated/snapshot.json")];
const ids = new Set<string>();
let byLocation = 0;
let byDescription = 0;
for (const j of rows) {
  if (!j?.id) continue;
  if (locationRequiresOffice(j.location)) {
    // Already dropped at runtime by location, but listing it here keeps the
    // generated file a complete picture of what the board excludes and why.
    if (!ids.has(j.id)) byLocation++;
    ids.add(j.id);
  } else if (descriptionRequiresOffice(j.description_html)) {
    if (!ids.has(j.id)) byDescription++;
    ids.add(j.id);
  }
}

const OUT = join(process.cwd(), "src", "lib", "generated", "office-based.json");
writeFileSync(OUT, JSON.stringify([...ids].sort()) + "\n");
console.log(
  `[office] ${ids.size} office-based listing(s) across ${rows.length} record(s): ` +
    `${byLocation} by location, ${byDescription} by a stated attendance requirement`,
);
