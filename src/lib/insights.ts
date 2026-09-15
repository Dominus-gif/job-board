/**
 * What this page knows that the employer's posting does not.
 *
 * Every listing here is, in its description, somebody else's writing — we
 * republish an excerpt and link to the source. On its own that is a page a
 * visitor could have reached without us, which is exactly the judgement the
 * AdSense review made about the site.
 *
 * This module is the answer: a reader arriving at a listing gets the numbers
 * only a board holds. What comparable roles pay, how this one sits against
 * them, how many others are open right now, which of the skills it asks for is
 * actually in demand, and precisely where they have to live to be eligible.
 * None of it is on the employer's page, none of it is scraped, and all of it is
 * computed from the board's own corpus — so it costs no bundle weight and is
 * different on every listing.
 *
 * Everything here is measured, never estimated. Where the corpus has too small
 * a sample to say something true, the field is omitted rather than filled with
 * a confident-sounding guess — a made-up benchmark would be worse than none.
 */
import type { Job } from "./types";
import { getAllJobs, getRegionalJobs } from "./db";
import { applicantAreas } from "./seo/job-location";
import { skillLabel } from "./landing";

/** Below this many comparable salaries, a percentile is noise. Say nothing. */
const MIN_SALARY_SAMPLE = 12;
/** Below this many listings, a "roles open" count is not worth printing. */
const MIN_COUNT_TO_REPORT = 3;

export interface SalaryContext {
  /** Where this role's midpoint sits among comparable roles, 0-100. */
  percentile: number;
  /** The 25th and 75th percentile midpoints for the comparison set. */
  typicalLow: number;
  typicalHigh: number;
  currency: string;
  sample: number;
  category: string;
}

export interface Benchmark {
  low: number;
  high: number;
  median: number;
  currency: string;
  sample: number;
  category: string;
}

export interface JobInsights {
  /** Present when the listing states a salary AND we have enough to compare it to. */
  salary?: SalaryContext;
  /** Present when the listing states NO salary but the category has a usable range. */
  benchmark?: Benchmark;
  /** Other roles open right now in the same category, same scope. */
  comparable: number;
  /** The listing's skills, with how many other open roles ask for each. */
  skills: { skill: string; label: string; openings: number }[];
  /** Where an applicant has to be. Same resolver the JobPosting markup uses. */
  eligibility: { worldwide: boolean; areas: string[] };
  /** How this posting's age compares to the board. */
  age: { days: number; medianDays: number };
}

/* ------------------------------------------------------------------------ */
/* Corpus statistics, computed once per worker and reused.                   */
/* ------------------------------------------------------------------------ */

interface Corpus {
  /** Sorted salary midpoints per category, USD-comparable rows only. */
  salaryByCategory: Map<string, number[]>;
  /** Open roles per category+scope key. */
  countByCategoryScope: Map<string, number>;
  /** Open roles per skill. */
  countBySkill: Map<string, number>;
  /** Median age of a listing on the board, in days. */
  medianAgeDays: number;
}

let corpusPromise: Promise<Corpus> | null = null;

const midpoint = (j: Job): number | null => {
  const { min, max } = j.salary;
  if (min == null || max == null || min <= 0 || max <= 0) return null;
  return Math.round((min + max) / 2);
};

async function buildCorpus(): Promise<Corpus> {
  const [worldwide, regional] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  const all = [...worldwide, ...regional];

  const salaryByCategory = new Map<string, number[]>();
  const countByCategoryScope = new Map<string, number>();
  const countBySkill = new Map<string, number>();
  const ages: number[] = [];
  const now = Date.now();

  for (const j of all) {
    // Salaries are only comparable within one currency; the board is
    // overwhelmingly USD and mixing EUR/GBP rows in would shift the percentile
    // by the exchange rate rather than by the job.
    const mid = midpoint(j);
    if (mid != null && j.salary.currency === "USD") {
      const arr = salaryByCategory.get(j.category) ?? [];
      arr.push(mid);
      salaryByCategory.set(j.category, arr);
    }

    const key = `${j.category}|${j.scope}`;
    countByCategoryScope.set(key, (countByCategoryScope.get(key) ?? 0) + 1);

    for (const s of j.skills) countBySkill.set(s, (countBySkill.get(s) ?? 0) + 1);

    const age = (now - Date.parse(j.posted_at)) / 86_400_000;
    if (Number.isFinite(age) && age >= 0) ages.push(age);
  }

  for (const arr of salaryByCategory.values()) arr.sort((a, b) => a - b);
  ages.sort((a, b) => a - b);

  return {
    salaryByCategory,
    countByCategoryScope,
    countBySkill,
    medianAgeDays: ages.length ? Math.round(ages[Math.floor(ages.length / 2)]) : 0,
  };
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

  let salary: SalaryContext | undefined;
  let benchmark: Benchmark | undefined;
  if (catSalaries.length >= MIN_SALARY_SAMPLE) {
    if (mid != null && job.salary.currency === "USD") {
      salary = {
        percentile: percentileOf(catSalaries, mid),
        typicalLow: at(catSalaries, 0.25),
        typicalHigh: at(catSalaries, 0.75),
        currency: "USD",
        sample: catSalaries.length,
        category: job.category,
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
  }

  // "Comparable" excludes this listing itself.
  const comparable = Math.max(0, (c.countByCategoryScope.get(`${job.category}|${job.scope}`) ?? 1) - 1);

  const skills = job.skills
    .map((s) => ({ skill: s, label: skillLabel(s), openings: Math.max(0, (c.countBySkill.get(s) ?? 1) - 1) }))
    .filter((s) => s.openings >= MIN_COUNT_TO_REPORT)
    .sort((a, b) => b.openings - a.openings)
    .slice(0, 6);

  const areas = applicantAreas(job.location, job.scope)
    .map((a) => a.name)
    .filter((n) => n !== "Worldwide");

  return {
    salary,
    benchmark,
    comparable,
    skills,
    eligibility: { worldwide: job.scope === "worldwide", areas },
    age: {
      days: Math.max(0, Math.round((Date.now() - Date.parse(job.posted_at)) / 86_400_000)),
      medianDays: c.medianAgeDays,
    },
  };
}

/** "$120k" / "$1.2k" — compact, for inline benchmark figures. */
export function compactMoney(n: number, currency = "USD"): string {
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "";
  if (n >= 1000) return `${sym}${Math.round(n / 1000)}k`;
  return `${sym}${n}`;
}
