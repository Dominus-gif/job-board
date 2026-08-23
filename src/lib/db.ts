/**
 * Data-access layer.
 *
 * All reads go through the LIVE store (`store.ts`), which polls the ATS
 * allow-list and caches accepted jobs. Every page/route uses these functions
 * and never touches the store directly — so this file is the single seam to
 * swap for Postgres (replace the bodies with SQL; keep the async signatures).
 */
import type { Category, Company, Job, JobSubmission, Subscriber } from "./types";
import { companies as allowList, loadJobs, isLive, getSnapshotPool } from "./store";
import { IN_DEMAND_THRESHOLD, runtimeInterest } from "./interest";

export { isLive } from "./store";

const subscribers: Subscriber[] = [];
const submissions: JobSubmission[] = [];
const SUBSCRIBER_BASELINE = 12480;

/** Ranking: paid featured first, then organically in-demand, then most recent. */
function byRank(a: Job, b: Job): number {
  if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
  if (a.in_demand !== b.in_demand) return a.in_demand ? -1 : 1;
  if (a.in_demand && b.in_demand && a.interest !== b.interest) return b.interest - a.interest;
  return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
}

/** Fold live candidate-interest into each job before ranking. */
function applyInterest(job: Job): Job {
  const interest = job.interest + runtimeInterest(job.slug);
  return { ...job, interest, in_demand: interest >= IN_DEMAND_THRESHOLD };
}

/* -------------------------------- queries -------------------------------- */

/** Every published job (worldwide + regional), interest-folded and ranked. */
async function allPublished(): Promise<Job[]> {
  const jobs = await loadJobs();
  return jobs.filter((j) => j.status === "published").map(applyInterest).sort(byRank);
}

/** The main board: only truly worldwide, location-independent roles. */
export async function getAllJobs(): Promise<Job[]> {
  return (await allPublished()).filter((j) => j.scope === "worldwide");
}

/** Every published job (worldwide + regional), ranked — for the /jobs search page. */
export async function getSearchableJobs(): Promise<Job[]> {
  return allPublished();
}

/** The "Remote — regional" board: genuinely remote, but region-locked roles. */
export async function getRegionalJobs(): Promise<Job[]> {
  return (await allPublished()).filter((j) => j.scope === "regional");
}

export async function getRegionalCount(): Promise<number> {
  return (await loadJobs()).filter((j) => j.scope === "regional").length;
}

/** Look up any job by slug (worldwide OR regional). */
export async function getJobBySlug(slug: string): Promise<Job | undefined> {
  const jobs = await loadJobs();
  const job = jobs.find((j) => j.slug === slug);
  return job ? applyInterest(job) : undefined;
}

/**
 * Inactive / archived listings: jobs the deployment has known (the build
 * snapshot) that are no longer live — removed, stopped, or expired. Marked
 * inactive so the UI can show "no longer accepting applications".
 */
export async function getArchivedJobs(): Promise<Job[]> {
  const active = new Set((await loadJobs()).map((j) => j.slug));
  const seen = new Set<string>();
  const out: Job[] = [];
  for (const j of getSnapshotPool()) {
    if (active.has(j.slug) || seen.has(j.slug)) continue;
    seen.add(j.slug);
    out.push({ ...j, is_active: false, status: "expired" });
  }
  return out.sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
}

export async function getArchivedCount(): Promise<number> {
  return (await getArchivedJobs()).length;
}

/** Is a specific slug in the archive (removed/stopped/expired)? */
export async function isArchived(slug: string): Promise<boolean> {
  const active = new Set((await loadJobs()).map((j) => j.slug));
  if (active.has(slug)) return false;
  return getSnapshotPool().some((j) => j.slug === slug);
}

export async function getJobsByCategory(category: Category): Promise<Job[]> {
  return (await getAllJobs()).filter((j) => j.category === category);
}

export async function getJobsBySkill(skill: string): Promise<Job[]> {
  const s = skill.toLowerCase();
  return (await getAllJobs()).filter((j) => j.skills.some((k) => k.toLowerCase() === s));
}

export async function getJobsByBenefit(benefitSlug: string): Promise<Job[]> {
  return (await getAllJobs()).filter((j) => j.benefits.some((b) => b.slug === benefitSlug));
}

export async function getJobsByEmploymentType(type: Job["employment_type"]): Promise<Job[]> {
  return (await getAllJobs()).filter((j) => j.employment_type === type);
}

export async function getJobsWhere(pred: (j: Job) => boolean): Promise<Job[]> {
  return (await getAllJobs()).filter(pred);
}

export async function getSimilarJobs(job: Job, limit = 4): Promise<Job[]> {
  const all = await getAllJobs();
  return all
    .filter((j) => j.slug !== job.slug)
    .map((j) => {
      let score = 0;
      if (j.category === job.category) score += 3;
      score += j.skills.filter((s) => job.skills.includes(s)).length;
      if (j.company_slug === job.company_slug) score += 2;
      return { j, score };
    })
    .sort((a, b) => b.score - a.score || byRank(a.j, b.j))
    .slice(0, limit)
    .map((x) => x.j);
}

export async function getAllSkills(): Promise<{ skill: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const j of await getAllJobs()) for (const s of j.skills) counts.set(s, (counts.get(s) ?? 0) + 1);
  return [...counts.entries()].map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count);
}

/* ------------------------------- companies ------------------------------- */

/**
 * Every company we have at least one role for (worldwide OR regional) — not just
 * the curated allow-list. Allow-list companies keep their rich profile (rating,
 * reviews, founded…); companies discovered via feeds get a minimal profile from
 * the job data. `worldwideCount` lets pages show the split.
 */
export type CompanyListing = Company & { jobCount: number; worldwideCount: number };

export async function getCompanies(): Promise<CompanyListing[]> {
  const jobs = await allPublished();
  const allow = new Map(allowList.map((c) => [c.slug, c]));
  const map = new Map<string, CompanyListing>();
  for (const j of jobs) {
    if (!j.company_slug) continue;
    let entry = map.get(j.company_slug);
    if (!entry) {
      const a = allow.get(j.company_slug);
      entry = a
        ? { ...a, jobCount: 0, worldwideCount: 0 }
        : { slug: j.company_slug, name: j.company_name, domain: j.company_domain, logo: j.company_logo, jobCount: 0, worldwideCount: 0 };
      map.set(j.company_slug, entry);
    }
    entry.jobCount++;
    if (j.scope === "worldwide") entry.worldwideCount++;
  }
  return [...map.values()].sort((a, b) => b.jobCount - a.jobCount || a.name.localeCompare(b.name));
}

export async function getCompanyBySlug(slug: string): Promise<CompanyListing | undefined> {
  return (await getCompanies()).find((c) => c.slug === slug);
}

/** All of a company's roles — worldwide and regional. */
export async function getJobsByCompany(slug: string): Promise<Job[]> {
  return (await allPublished()).filter((j) => j.company_slug === slug);
}

/* ------------------------------ pagination ------------------------------- */

export const PAGE_SIZE = 20;

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, totalPages, total: items.length };
}

/* ---------------------------- mutations (demo) --------------------------- */

export function addSubscriber(email: string): { ok: boolean; message: string } {
  const clean = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) return { ok: false, message: "Enter a valid email address." };
  if (subscribers.some((s) => s.email === clean)) return { ok: true, message: "You're already subscribed!" };
  subscribers.push({ email: clean, created_at: new Date().toISOString() });
  return { ok: true, message: "Subscribed! Check your inbox for the weekly digest." };
}

export function getSubscriberCount(): number {
  return SUBSCRIBER_BASELINE + subscribers.length;
}

export function addSubmission(input: Omit<JobSubmission, "id" | "created_at" | "status">): JobSubmission {
  const submission: JobSubmission = {
    ...input,
    id: `sub_${Date.now().toString(36)}`,
    created_at: new Date().toISOString(),
    status: "pending",
  };
  submissions.push(submission);
  return submission;
}

export function getCompanyAllowList(): Company[] {
  return allowList;
}
