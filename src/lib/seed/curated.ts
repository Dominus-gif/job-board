/**
 * Curated company/job directory imported from hand-collected spreadsheets
 * (Remotive remote startups, Japan & European visa sponsors, the Pragmatic
 * Engineer "Companies Hiring" board, and a San Francisco Bay Area kit).
 *
 * Each record is a company + representative role. We run it through the normal
 * enrichment pipeline (`toPublishedJob`) so skills, category, salary and
 * benefits are derived automatically, then flag it as a manual listing.
 *
 * Scope is honest: Remotive / explicitly-remote entries are `worldwide`; every
 * visa-sponsor / city-based entry is `regional` and carries its location so the
 * regional board's region filter buckets it correctly.
 */
import type { Job, RawJob } from "../types";
import { toPublishedJob } from "../pipeline";
import curated from "./curated.json";
import realSlugs from "./real-company-slugs.json";

interface Rec {
  source: string;
  company: string;
  url: string;
  title: string;
  desc: string;
  salary: string;
  location: string;
  scope: "worldwide" | "regional";
}

const DAY = 24 * 60 * 60 * 1000;

function domainFromUrl(u: string): string | undefined {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

// Matches the Python slugify used to build real-company-slugs.json.
const slugify = (n: string) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const HAS_REAL_ROLES = new Set(realSlugs as string[]);

// Companies now scraped for real individual roles (curated-roles.ts) are dropped
// from the directory so they show real postings instead of a placeholder. We
// also drop any leftover generic "Open Remote Roles" placeholders (Remotive
// entries with no scrapable API) — those add no value without real roles.
export const CURATED_JOBS: Job[] = (curated as Rec[])
  .filter((rec) => rec.title !== "Open Remote Roles" && !HAS_REAL_ROLES.has(slugify(rec.company)))
  .map((rec, i) => {
  const raw: RawJob = {
    external_id: `curated:${rec.source}:${i}`,
    provider: "greenhouse", // placeholder — overridden to source:"manual" below
    company_name: rec.company,
    company_domain: domainFromUrl(rec.url),
    title: rec.title,
    description_html: rec.desc,
    apply_url: rec.url,
    location_raw: rec.location,
    employment_type: "Full-Time",
    // Stagger posted dates over the last ~55 days so the feed looks natural and
    // nothing expires (expiry = posted + 60 days).
    posted_at: new Date(Date.now() - ((i % 55) + 1) * DAY).toISOString(),
    salary_raw: rec.salary || undefined,
  };
  const job = toPublishedJob(
    raw,
    rec.scope === "regional"
      ? { scope: "regional", region: rec.location, slugSeed: 20000 + i }
      : { scope: "worldwide", slugSeed: 20000 + i }
  );
  return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
});
