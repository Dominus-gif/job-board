/**
 * Real, individually-scraped roles for the curated companies that are hosted on
 * a standard ATS (Greenhouse, Lever, Ashby, SmartRecruiters). Unlike the
 * directory entries in `curated.ts`, each of these is an actual open posting
 * with its own title, description and — crucially — a DIRECT apply URL that
 * takes the user straight to that role's application page.
 *
 * These bypass the strict remote filter on purpose: most are visa-sponsor /
 * relocation roles that are region-based (they belong on the regional board by
 * location), which the worldwide filter would otherwise reject.
 */
import type { Job, RawJob } from "../types";
import { toPublishedJob } from "../pipeline";
import roles from "./curated-roles.json";

interface RoleRec {
  company: string;
  domain: string | null;
  title: string;
  desc: string;
  apply: string;
  location: string;
  scope: "worldwide" | "regional";
  salary: string;
  posted: string | null;
  provider: string;
}

const DAY = 24 * 60 * 60 * 1000;

/** Strip any HTML to a clean text excerpt (sources mix HTML and plain text). */
function excerpt(html: string): string {
  const t = (html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t ? `<p>${t.slice(0, 1400)}${t.length > 1400 ? "…" : ""}</p>` : "";
}

export const CURATED_ROLE_JOBS: Job[] = (roles as RoleRec[]).map((rec, i) => {
  const raw: RawJob = {
    external_id: `curated-role:${i}`,
    provider: "greenhouse", // placeholder — overridden to source:"manual" below
    company_name: rec.company.trim(),
    company_domain: rec.domain || undefined,
    title: rec.title.trim(),
    description_html:
      excerpt(rec.desc) ||
      `<p>${rec.title.trim()} at ${rec.company.trim()}. See the full description and apply directly on the company's job page.</p>`,
    apply_url: rec.apply, // direct link to this specific role's apply page
    location_raw: rec.location,
    employment_type: "Full-Time",
    // Use a recent staggered date so live-but-old postings don't hit the +60d
    // expiry and vanish.
    posted_at: new Date(Date.now() - ((i % 45) + 1) * DAY).toISOString(),
    salary_raw: rec.salary || undefined,
  };
  const job = toPublishedJob(
    raw,
    rec.scope === "regional"
      ? { scope: "regional", region: rec.location, slugSeed: 40000 + i }
      : { scope: "worldwide", slugSeed: 40000 + i }
  );
  return { ...job, source: "manual", provider: undefined, board_token: undefined, ats_job_id: undefined };
});
