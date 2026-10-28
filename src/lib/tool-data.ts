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
import { salaryMidpointUsd } from "./salary";
import { applicantAreas } from "./seo/job-location";
import { FAMILIES, JUNIOR_TITLE, baseTitle, inFamily } from "./title-families";
import { openCountries } from "./toolkit/location-check";

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

/* ------------------------------------------------------------------------ */
/* Remote field explorer                                                     */
/* ------------------------------------------------------------------------ */

/** Below this many published ranges a median is an anecdote, not a rate. */
export const MIN_PAY_SAMPLE = 15;

export interface FieldStat {
  key: string;
  label: string;
  roles: number;
  worldwide: number;
  junior: number;
  withPay: number;
  /** USD midpoint median, or null when fewer than MIN_PAY_SAMPLE ranges. */
  medianPay: number | null;
  fresh7: number;
  countries: [string, number][];
  employers: [string, number][];
  titles: [string, number][];
}

export interface FieldExplorerData {
  asOf: string;
  total: number;
  worldwide: number;
  junior: number;
  withPay: number;
  /** Listings whose title fits none of the families. */
  unassigned: number;
  fields: FieldStat[];
}

const top = (m: Map<string, number>, n: number): [string, number][] => [...m].sort((a, b) => b[1] - a[1]).slice(0, n);
const bump = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);

function median(values: number[]): number | null {
  if (values.length < MIN_PAY_SAMPLE) return null;
  const v = [...values].sort((a, b) => a - b);
  return v.length % 2 ? v[(v.length - 1) / 2] : Math.round((v[v.length / 2 - 1] + v[v.length / 2]) / 2);
}

/**
 * Size, reach and openness of each job family, counted by TITLE with the same
 * rules as the field guides (lib/title-families), so a figure here and the
 * same figure in an article always agree. Each family is matched on its own
 * rules, so a title that fits two families counts in both.
 */
export async function fieldExplorerData(): Promise<FieldExplorerData> {
  const jobs = await board();
  const now = Date.now();
  const fields: FieldStat[] = FAMILIES.map((f) => {
    const g = jobs.filter((j) => inFamily(f, j.title));
    const countries = new Map<string, number>();
    const employers = new Map<string, number>();
    const titles = new Map<string, number>();
    const pay: number[] = [];
    for (const j of g) {
      for (const a of new Set(applicantAreas(j.location, j.scope).map((x) => x.name))) bump(countries, a);
      bump(employers, j.company_name);
      bump(titles, baseTitle(j.title));
      const mid = salaryMidpointUsd(j.salary);
      if (mid != null) pay.push(mid);
    }
    return {
      key: f.key,
      label: f.label,
      roles: g.length,
      worldwide: g.filter((j) => j.scope === "worldwide").length,
      junior: g.filter((j) => JUNIOR_TITLE.test(j.title)).length,
      withPay: pay.length,
      medianPay: median(pay),
      fresh7: g.filter((j) => ageDays(j, now) <= 7).length,
      countries: top(countries, 5),
      employers: top(employers, 5),
      titles: top(titles, 5),
    };
  }).filter((f) => f.roles > 0);

  return {
    asOf: new Date(now).toISOString().slice(0, 10),
    total: jobs.length,
    worldwide: jobs.filter((j) => j.scope === "worldwide").length,
    junior: jobs.filter((j) => JUNIOR_TITLE.test(j.title)).length,
    withPay: jobs.filter((j) => salaryMidpointUsd(j.salary) != null).length,
    unassigned: jobs.filter((j) => !FAMILIES.some((f) => inFamily(f, j.title))).length,
    fields,
  };
}

/* ------------------------------------------------------------------------ */
/* Job title finder                                                          */
/* ------------------------------------------------------------------------ */

export interface TitleFinderData {
  asOf: string;
  total: number;
  /** [base title, listings, of which work-from-anywhere], most common first. */
  titles: [string, number, number][];
}

/** Every title on the board reduced to the job it names, with counts. */
export async function titleFinderData(): Promise<TitleFinderData> {
  const jobs = await board();
  const counts = new Map<string, [number, number]>();
  for (const j of jobs) {
    const b = baseTitle(j.title);
    if (!b) continue;
    const c = counts.get(b) ?? [0, 0];
    c[0]++;
    if (j.scope === "worldwide") c[1]++;
    counts.set(b, c);
  }
  return {
    asOf: new Date().toISOString().slice(0, 10),
    total: jobs.length,
    titles: [...counts].map(([t, [n, w]]) => [t, n, w] as [string, number, number]).sort((a, b) => b[1] - a[1]),
  };
}

/* ------------------------------------------------------------------------ */
/* Homepage insights                                                         */
/* ------------------------------------------------------------------------ */

export interface HomeInsightsData {
  asOf: string;
  total: number;
  worldwide: number;
  withPay: number;
  swe: number;
  sweJunior: number;
  productDesigner: number;
  uxDesigner: number;
}

/**
 * Four live figures for the homepage, counted the same way as the guides they
 * link to. Recomputed on every rebuild, so the homepage never quotes a stale
 * number.
 */
export async function homeInsights(): Promise<HomeInsightsData> {
  const jobs = await board();
  const swe = FAMILIES.find((f) => f.key === "swe")!;
  const sweJobs = jobs.filter((j) => inFamily(swe, j.title));
  const bases = jobs.map((j) => baseTitle(j.title));
  return {
    asOf: new Date().toISOString().slice(0, 10),
    total: jobs.length,
    worldwide: jobs.filter((j) => j.scope === "worldwide").length,
    withPay: jobs.filter((j) => salaryMidpointUsd(j.salary) != null).length,
    swe: sweJobs.length,
    sweJunior: sweJobs.filter((j) => JUNIOR_TITLE.test(j.title)).length,
    productDesigner: bases.filter((b) => b.includes("product designer")).length,
    uxDesigner: bases.filter((b) => /\bux designer\b|\bui\/ux designer\b|\bux\/ui designer\b/.test(b)).length,
  };
}

/* ------------------------------------------------------------------------ */
/* Remote job location checker                                               */
/* ------------------------------------------------------------------------ */

export interface LocationCheckerData {
  asOf: string;
  total: number;
  worldwide: number;
  /** Per country code: [region-locked roles open to it, its top employers by those roles]. */
  countries: Record<string, [number, string[]]>;
}

/**
 * How many listings on the board each country can apply to, read with the
 * same rules as the checker itself, so the count beside a verdict and the
 * verdict can never disagree. Only clear inclusions count: a listing for
 * "North America" is not counted for Mexico.
 */
export async function locationCheckerData(): Promise<LocationCheckerData> {
  const jobs = await board();
  const per = new Map<string, Map<string, number>>();
  for (const j of jobs) {
    if (j.scope === "worldwide") continue;
    for (const c of openCountries(j.location)) {
      const m = per.get(c) ?? new Map<string, number>();
      m.set(j.company_name, (m.get(j.company_name) ?? 0) + 1);
      per.set(c, m);
    }
  }
  const countries: LocationCheckerData["countries"] = {};
  for (const [c, m] of per) {
    const n = [...m.values()].reduce((a, b) => a + b, 0);
    countries[c] = [n, [...m].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name]) => name)];
  }
  return {
    asOf: new Date().toISOString().slice(0, 10),
    total: jobs.length,
    worldwide: jobs.filter((j) => j.scope === "worldwide").length,
    countries,
  };
}
