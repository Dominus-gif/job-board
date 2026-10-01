/**
 * The board's search: the filter set, the query parser, the predicate and the
 * sort. Lifted out of src/app/jobs/page.tsx so the page is not the only thing
 * that can run a search.
 *
 * Two callers now depend on it being one implementation rather than two: the
 * /jobs page itself, and the read-only search exposed to AI agents
 * (src/app/api/search/route.ts and src/components/AgentTools.tsx). An agent that
 * answered from its own copy of this logic would quietly disagree with the page
 * a person is looking at, and the disagreement would show up as wrong counts in
 * someone's chat window rather than as a failing test. So there is no second
 * copy.
 */
import type { Job } from "@/lib/types";
import { SALARY_BANDS, salaryMidpointUsd } from "@/lib/salary";
import { jobRegions } from "@/lib/region";
import { CATEGORIES } from "@/lib/taxonomy";

export interface JobFilters {
  q: string;
  type: string;
  salary: string;
  region: string;
  category: string;
  scope: string;
  /** Only listings that publish a salary ("disclosed"). */
  disc: boolean;
  sort: string;
  page: number;
}

export const TYPES = ["Full-Time", "Part-Time", "Contract"] as const;
export const REGIONS = [
  "United States",
  "Europe",
  "UK",
  "Asia-Pacific",
  "Canada",
  "India",
  "Latin America",
  "Middle East",
  "Worldwide",
] as const;
export const SORTS = ["newest", "salary"] as const;

export type SearchParamRecord = Record<string, string | string[] | undefined>;

/**
 * Read filters off a query string, keeping only values this board recognises.
 *
 * Everything unknown becomes the empty default rather than an error: a crawler
 * or a hand-edited URL asking for `category=Wizardry` gets the unfiltered board,
 * not a 400, and never reaches the predicate below with a value it would have to
 * guess about.
 */
export function parseFilters(sp: SearchParamRecord): JobFilters {
  const g = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  return {
    q: g("q").trim(),
    type: (TYPES as readonly string[]).includes(g("type")) ? g("type") : "",
    salary: SALARY_BANDS.some((b) => b.id === g("salary")) ? g("salary") : "",
    region: (REGIONS as readonly string[]).includes(g("region")) ? g("region") : "",
    category: (CATEGORIES as readonly string[]).includes(g("category")) ? g("category") : "",
    scope: g("scope") === "worldwide" || g("scope") === "regional" ? g("scope") : "",
    disc: g("disc") === "1",
    sort: (SORTS as readonly string[]).includes(g("sort")) ? g("sort") : "",
    page: Math.max(1, Number(g("page")) || 1),
  };
}

export function filterJobs(jobs: Job[], f: JobFilters): Job[] {
  const floor = SALARY_BANDS.find((b) => b.id === f.salary)?.min ?? 0;
  const q = f.q.toLowerCase();
  return jobs.filter((j) => {
    if (q && !`${j.title} ${j.company_name} ${j.category} ${j.skills.join(" ")}`.toLowerCase().includes(q)) return false;
    if (f.type && j.employment_type !== f.type) return false;
    if (f.scope && j.scope !== f.scope) return false;
    if (f.category && j.category !== f.category) return false;
    if (f.region && !jobRegions(j.location).includes(f.region)) return false;
    const mid = salaryMidpointUsd(j.salary);
    if (f.disc && mid == null) return false;
    if (floor > 0 && (mid == null || mid < floor)) return false;
    return true;
  });
}

/**
 * Reorder filtered results. Relevance ("") keeps the store's ranked order.
 * Featured listings are paid placement and stay at the top under every sort;
 * the chosen sort orders them among themselves and the rest below them.
 */
export function sortJobs(jobs: Job[], sort: string): Job[] {
  const featuredFirst = (a: Job, b: Job) => Number(b.is_featured) - Number(a.is_featured);
  if (sort === "newest") {
    return [...jobs].sort(
      (a, b) => featuredFirst(a, b) || new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime(),
    );
  }
  if (sort === "salary") {
    return [...jobs].sort(
      (a, b) => featuredFirst(a, b) || (salaryMidpointUsd(b.salary) ?? -1) - (salaryMidpointUsd(a.salary) ?? -1),
    );
  }
  return jobs;
}

/** Build a /jobs URL from the active filters plus overrides (resets page). */
export function searchUrl(f: JobFilters, changes: Partial<JobFilters> = {}, keepPage = false): string {
  const m = { ...f, ...changes };
  const sp = new URLSearchParams();
  if (m.q) sp.set("q", m.q);
  if (m.type) sp.set("type", m.type);
  if (m.salary) sp.set("salary", m.salary);
  if (m.region) sp.set("region", m.region);
  if (m.category) sp.set("category", m.category);
  if (m.scope) sp.set("scope", m.scope);
  if (m.disc) sp.set("disc", "1");
  if (m.sort) sp.set("sort", m.sort);
  if (keepPage && m.page > 1) sp.set("page", String(m.page));
  const s = sp.toString();
  return s ? `/jobs?${s}` : "/jobs";
}
