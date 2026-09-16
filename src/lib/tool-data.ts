/**
 * Server-side data for the tools that are built on our own listings.
 *
 * Each loader returns a compact, serialisable payload the page hands to a
 * client component, so the numbers stay current with every rebuild while the
 * browser does the filtering. Nothing here leaves the worker except the
 * aggregates and the per-listing figures listed below.
 */
import { getAllJobs, getRegionalJobs } from "./db";
import { BROAD_REGIONS, broadRegions } from "./geo";
import { CATEGORIES } from "./taxonomy";
import type { Job } from "./types";

async function board(): Promise<Job[]> {
  const [w, r] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  return [...w, ...r];
}

const DAY = 86_400_000;
const ageDays = (j: Job, now: number) => Math.max(0, (now - Date.parse(j.posted_at)) / DAY);

function usdMidpoint(j: Job): number | null {
  const { min, max, currency } = j.salary;
  if (currency !== "USD") return null;
  const lo = min && min > 0 ? min : null;
  const hi = max && max > 0 ? max : null;
  if (lo == null && hi == null) return null;
  const mid = lo != null && hi != null ? (lo + hi) / 2 : (lo ?? hi)!;
  // Hourly or obviously broken figures would distort an annual comparison.
  return mid >= 10_000 && mid <= 1_000_000 ? Math.round(mid) : null;
}

/* ------------------------------------------------------------------------ */
/* Salary band estimator                                                     */
/* ------------------------------------------------------------------------ */

export const LEVELS = ["Entry", "Mid", "Senior", "Staff / lead", "Manager", "Director+"] as const;

export function seniorityOf(title: string): number {
  const t = title.toLowerCase();
  if (/\b(?:vp|vice president|director|head of|chief|cto|cfo|coo|ceo|general manager)\b/.test(t)) return 5;
  if (/\b(?:manager|mgr)\b/.test(t) && !/\b(?:account|product|program|project|success|partner|community|marketing|territory|office)\s+manager\b/.test(t)) return 4;
  if (/\b(?:staff|principal|lead|architect|distinguished)\b/.test(t)) return 3;
  if (/\b(?:senior|sr\.?)\b/.test(t)) return 2;
  if (/\b(?:intern|internship|graduate|junior|jr\.?|entry[- ]level|trainee|apprentice|associate)\b/.test(t)) return 0;
  return 1;
}

export interface SalaryBandData {
  categories: string[];
  regions: string[];
  levels: string[];
  /** [categoryIndex, regionBitmask, levelIndex, usdMidpoint, worldwide 0|1] */
  rows: [number, number, number, number, number][];
  totalListings: number;
}

export async function salaryBandData(): Promise<SalaryBandData> {
  const jobs = await board();
  const categories = [...CATEGORIES];
  const regions = [...BROAD_REGIONS];
  const rows: SalaryBandData["rows"] = [];
  for (const j of jobs) {
    const mid = usdMidpoint(j);
    if (mid == null) continue;
    const cat = categories.indexOf(j.category);
    if (cat < 0) continue;
    let mask = 0;
    for (const r of broadRegions(j)) mask |= 1 << regions.indexOf(r);
    rows.push([cat, mask, seniorityOf(j.title), mid, j.scope === "worldwide" ? 1 : 0]);
  }
  return { categories, regions, levels: [...LEVELS], rows, totalListings: jobs.length };
}

/* ------------------------------------------------------------------------ */
/* Company remote score                                                      */
/* ------------------------------------------------------------------------ */

export interface CompanyStat {
  name: string;
  slug: string;
  roles: number;
  worldwide: number;
  withPay: number;
  last30: number;
  last7: number;
  /** Number of roles per broad region (index into `regions`). */
  regionCounts: number[];
  /** Distinct categories hiring. */
  categories: number;
  medianAge: number;
}

export interface CompanyScoreData {
  regions: string[];
  companies: CompanyStat[];
  boardCompanies: number;
  minRoles: number;
}

export const MIN_COMPANY_ROLES = 3;

export async function companyScoreData(): Promise<CompanyScoreData> {
  const jobs = await board();
  const now = Date.now();
  const regions = [...BROAD_REGIONS];
  const byCo = new Map<string, Job[]>();
  for (const j of jobs) {
    const list = byCo.get(j.company_slug) ?? [];
    list.push(j);
    byCo.set(j.company_slug, list);
  }
  const companies: CompanyStat[] = [];
  for (const [slug, list] of byCo) {
    // One or two openings say little about a company's remote policy, and
    // company pages only become indexable at three listings.
    if (list.length < MIN_COMPANY_ROLES) continue;
    const regionCounts = regions.map(() => 0);
    for (const j of list) for (const r of broadRegions(j)) regionCounts[regions.indexOf(r)]++;
    const ages = list.map((j) => ageDays(j, now)).sort((a, b) => a - b);
    companies.push({
      name: list[0].company_name,
      slug,
      roles: list.length,
      worldwide: list.filter((j) => j.scope === "worldwide").length,
      withPay: list.filter((j) => j.salary && (j.salary.min != null || j.salary.max != null)).length,
      last30: ages.filter((a) => a <= 30).length,
      last7: ages.filter((a) => a <= 7).length,
      regionCounts,
      categories: new Set(list.map((j) => j.category)).size,
      medianAge: Math.round(ages[Math.floor(ages.length / 2)] ?? 0),
    });
  }
  companies.sort((a, b) => b.roles - a.roles || a.name.localeCompare(b.name));
  return { regions, companies, boardCompanies: byCo.size, minRoles: MIN_COMPANY_ROLES };
}

/* ------------------------------------------------------------------------ */
/* Search link builder                                                       */
/* ------------------------------------------------------------------------ */

export interface SearchCounts {
  total: number;
  worldwide: number;
  byCategory: Record<string, number>;
  withPay: number;
  newThisWeek: number;
}

export async function searchCounts(): Promise<SearchCounts> {
  const jobs = await board();
  const now = Date.now();
  const byCategory: Record<string, number> = {};
  for (const j of jobs) byCategory[j.category] = (byCategory[j.category] ?? 0) + 1;
  return {
    total: jobs.length,
    worldwide: jobs.filter((j) => j.scope === "worldwide").length,
    byCategory,
    withPay: jobs.filter((j) => usdMidpoint(j) != null).length,
    newThisWeek: jobs.filter((j) => ageDays(j, now) <= 7).length,
  };
}
