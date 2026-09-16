/**
 * What this page knows that the employer's posting does not.
 *
 * Every listing here is, in its description, somebody else's writing — we
 * republish an excerpt and link to the source. On its own that is a page a
 * visitor could have reached without us, which is exactly the judgement the
 * AdSense review made about the site.
 *
 * This module is the answer: a reader arriving at a listing gets the numbers
 * only a board holds. What comparable roles pay and how this one sits among
 * them, how many others are open and who is hiring, how fresh this posting is
 * next to the rest, which of its skills are actually in demand, and precisely
 * where an applicant has to live. None of it is on the employer's page, none
 * of it is scraped, and all of it is computed from the board's own corpus.
 *
 * Everything here is measured, never estimated. Where the corpus has too small
 * a sample to say something true, the field is omitted rather than filled with
 * a confident-sounding guess — a made-up benchmark would be worse than none.
 * The payload is deliberately compact (binned distributions, not raw rows) so
 * it can travel to the interactive panel on every job page.
 */
import type { Job } from "./types";
import { getAllJobs, getRegionalJobs } from "./db";
import { applicantAreas } from "./seo/job-location";
import { skillLabel, skillSlug } from "./landing";
import { categoryToSlug } from "./taxonomy";
import { binValues, quantile, type Bin } from "./stats";

export { compactMoney } from "./stats";

/** Below this many comparable salaries, a percentile is noise. Say nothing. */
const MIN_SALARY_SAMPLE = 12;
/** Below this many listings, a "roles open" count is not worth printing. */
const MIN_COUNT_TO_REPORT = 3;
const DAY = 86_400_000;

export interface SalaryContext {
  /** Where this role's midpoint sits among comparable roles, 0-100. */
  percentile: number;
  /** The 25th and 75th percentile midpoints for the comparison set. */
  typicalLow: number;
  typicalHigh: number;
  currency: string;
  sample: number;
  category: string;
  /** This listing's own midpoint. */
  value: number;
}

export interface Benchmark {
  low: number;
  high: number;
  median: number;
  currency: string;
  sample: number;
  category: string;
}

export interface PayDistribution {
  bins: Bin[];
  median: number;
  p25: number;
  p75: number;
  /** 101 evenly spaced quantiles (0–100) so the panel can place any figure. */
  quantiles: number[];
  sample: number;
  /** Share of this category's listings that publish pay, 0-100. */
  publishedShare: number;
}

export interface JobInsights {
  /** Present when the listing states a salary AND we have enough to compare it to. */
  salary?: SalaryContext;
  /** Present when the listing states NO salary but the category has a usable range. */
  benchmark?: Benchmark;
  /** Category pay spread, when there's enough data to draw it. */
  pay?: PayDistribution;
  /** Other roles open right now in the same category, same scope. */
  comparable: number;
  /** The same category in the other scope (worldwide vs region-locked). */
  otherScope: number;
  /** Roles in this category posted in the last seven days. */
  newThisWeek: number;
  categoryTotal: number;
  categoryHref: string;
  /** Employers with the most open roles in this category and scope. */
  topCompanies: { name: string; slug: string; count: number; isThis: boolean }[];
  /** The listing's skills, with how many other open roles ask for each. */
  skills: { skill: string; label: string; openings: number; share: number; href: string }[];
  /** Where an applicant has to be. Same resolver the JobPosting markup uses. */
  eligibility: { worldwide: boolean; areas: string[] };
  /** How this posting's age compares to the board. */
  age: { days: number; medianDays: number; fresherThan: number; buckets: { label: string; count: number; from: number; to: number }[] };
}

/* ------------------------------------------------------------------------ */
/* Corpus statistics, computed once per worker and reused.                   */
/* ------------------------------------------------------------------------ */

interface Corpus {
  salaryByCategory: Map<string, number[]>;
  countByCategoryScope: Map<string, number>;
  countByCategory: Map<string, number>;
  paidByCategory: Map<string, number>;
  countBySkill: Map<string, number>;
  countByCategorySkill: Map<string, number>;
  companiesByCategoryScope: Map<string, Map<string, { name: string; count: number }>>;
  newByCategory: Map<string, number>;
  ages: number[];
  medianAgeDays: number;
}

let corpusPromise: Promise<Corpus> | null = null;

const midpoint = (j: Job): number | null => {
  const { min, max } = j.salary;
  if (min == null || max == null || min <= 0 || max <= 0) return null;
  return Math.round((min + max) / 2);
};

const bump = <K>(m: Map<K, number>, k: K, by = 1) => m.set(k, (m.get(k) ?? 0) + by);

async function buildCorpus(): Promise<Corpus> {
  const [worldwide, regional] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  const all = [...worldwide, ...regional];

  const c: Corpus = {
    salaryByCategory: new Map(),
    countByCategoryScope: new Map(),
    countByCategory: new Map(),
    paidByCategory: new Map(),
    countBySkill: new Map(),
    countByCategorySkill: new Map(),
    companiesByCategoryScope: new Map(),
    newByCategory: new Map(),
    ages: [],
    medianAgeDays: 0,
  };
  const now = Date.now();

  for (const j of all) {
    // Salaries are only comparable within one currency; the board is
    // overwhelmingly USD and mixing EUR/GBP rows in would shift the percentile
    // by the exchange rate rather than by the job.
    const mid = midpoint(j);
    if (mid != null && j.salary.currency === "USD") {
      const arr = c.salaryByCategory.get(j.category) ?? [];
      arr.push(mid);
      c.salaryByCategory.set(j.category, arr);
    }
    if (j.salary && (j.salary.min != null || j.salary.max != null)) bump(c.paidByCategory, j.category);

    const key = `${j.category}|${j.scope}`;
    bump(c.countByCategoryScope, key);
    bump(c.countByCategory, j.category);

    const cos = c.companiesByCategoryScope.get(key) ?? new Map<string, { name: string; count: number }>();
    const entry = cos.get(j.company_slug) ?? { name: j.company_name, count: 0 };
    entry.count++;
    cos.set(j.company_slug, entry);
    c.companiesByCategoryScope.set(key, cos);

    for (const s of j.skills) {
      bump(c.countBySkill, s);
      bump(c.countByCategorySkill, `${j.category}|${s}`);
    }

    const age = (now - Date.parse(j.posted_at)) / DAY;
    if (Number.isFinite(age) && age >= 0) {
      c.ages.push(age);
      if (age <= 7) bump(c.newByCategory, j.category);
    }
  }

  for (const arr of c.salaryByCategory.values()) arr.sort((a, b) => a - b);
  c.ages.sort((a, b) => a - b);
  c.medianAgeDays = c.ages.length ? Math.round(c.ages[Math.floor(c.ages.length / 2)]) : 0;
  return c;
}

function corpus(): Promise<Corpus> {
  corpusPromise ??= buildCorpus().catch((err) => {
    // Never let a stats failure take down a job page — the listing itself is
    // the page's job, and this section is additional.
    corpusPromise = null;
    throw err;
  });
  return corpusPromise;
}

/** Value at a percentile of a pre-sorted array. */
function at(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor(sorted.length * p)))];
}

/** What share of `sorted` this value is at or above, as a 0-100 percentile. */
function percentileOf(sorted: number[], value: number): number {
  if (!sorted.length) return 0;
  let below = 0;
  for (const v of sorted) {
    if (v < value) below++;
    else break;
  }
  return Math.round((below / sorted.length) * 100);
}

const AGE_BUCKETS: { label: string; from: number; to: number }[] = [
  { label: "Under 3 days", from: 0, to: 3 },
  { label: "3–7 days", from: 3, to: 7 },
  { label: "1–2 weeks", from: 7, to: 14 },
  { label: "2–4 weeks", from: 14, to: 30 },
  { label: "1–1.5 months", from: 30, to: 45 },
  { label: "Over 1.5 months", from: 45, to: Infinity },
];

/* ------------------------------------------------------------------------ */

/**
 * The insight set for one listing. Returns null only if the corpus could not be
 * read at all, in which case the caller simply renders no section.
 */
export async function jobInsights(job: Job): Promise<JobInsights | null> {
  let c: Corpus;
  try {
    c = await corpus();
  } catch {
    return null;
  }

  const catSalaries = c.salaryByCategory.get(job.category) ?? [];
  const mid = midpoint(job);
  const categoryTotal = c.countByCategory.get(job.category) ?? 0;

  let salary: SalaryContext | undefined;
  let benchmark: Benchmark | undefined;
  let pay: PayDistribution | undefined;
  if (catSalaries.length >= MIN_SALARY_SAMPLE) {
    if (mid != null && job.salary.currency === "USD") {
      salary = {
        percentile: percentileOf(catSalaries, mid),
        typicalLow: at(catSalaries, 0.25),
        typicalHigh: at(catSalaries, 0.75),
        currency: "USD",
        sample: catSalaries.length,
        category: job.category,
        value: mid,
      };
    } else {
      benchmark = {
        low: at(catSalaries, 0.25),
        high: at(catSalaries, 0.75),
        median: at(catSalaries, 0.5),
        currency: "USD",
        sample: catSalaries.length,
        category: job.category,
      };
    }
    pay = {
      bins: binValues(catSalaries, 12, undefined, undefined, 10_000),
      median: quantile(catSalaries, 0.5),
      p25: quantile(catSalaries, 0.25),
      p75: quantile(catSalaries, 0.75),
      quantiles: Array.from({ length: 101 }, (_, i) => quantile(catSalaries, i / 100)),
      sample: catSalaries.length,
      publishedShare: categoryTotal ? Math.round(((c.paidByCategory.get(job.category) ?? 0) / categoryTotal) * 100) : 0,
    };
  }

  // "Comparable" excludes this listing itself.
  const key = `${job.category}|${job.scope}`;
  const comparable = Math.max(0, (c.countByCategoryScope.get(key) ?? 1) - 1);
  const otherScope = c.countByCategoryScope.get(`${job.category}|${job.scope === "worldwide" ? "regional" : "worldwide"}`) ?? 0;

  const topCompanies = [...(c.companiesByCategoryScope.get(key)?.entries() ?? [])]
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count, isThis: slug === job.company_slug }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 5);

  const skills = job.skills
    .map((s) => ({
      skill: s,
      label: skillLabel(s),
      openings: Math.max(0, (c.countBySkill.get(s) ?? 1) - 1),
      share: categoryTotal ? Math.round(((c.countByCategorySkill.get(`${job.category}|${s}`) ?? 0) / categoryTotal) * 100) : 0,
      href: `/${skillSlug(s)}`,
    }))
    .filter((s) => s.openings >= MIN_COUNT_TO_REPORT)
    .sort((a, b) => b.openings - a.openings)
    .slice(0, 6);

  const areas = applicantAreas(job.location, job.scope)
    .map((a) => a.name)
    .filter((n) => n !== "Worldwide");

  const days = Math.max(0, (Date.now() - Date.parse(job.posted_at)) / DAY);
  const older = c.ages.length ? c.ages.filter((a) => a > days).length : 0;

  return {
    salary,
    benchmark,
    pay,
    comparable,
    otherScope,
    newThisWeek: c.newByCategory.get(job.category) ?? 0,
    categoryTotal,
    categoryHref: `/remote-${categoryToSlug(job.category)}-jobs`,
    topCompanies,
    skills,
    eligibility: { worldwide: job.scope === "worldwide", areas },
    age: {
      days: Math.round(days),
      medianDays: c.medianAgeDays,
      fresherThan: c.ages.length ? Math.round((older / c.ages.length) * 100) : 0,
      buckets: AGE_BUCKETS.map((b) => ({
        ...b,
        to: Number.isFinite(b.to) ? b.to : 60,
        count: c.ages.filter((a) => a >= b.from && a < b.to).length,
      })),
    },
  };
}
