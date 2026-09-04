/**
 * Shared building blocks for the SEO hub / discovery pages
 * (/find-remote-jobs, /remote-jobs-categories, /remote-jobs-programming-support-design,
 * /trending-remote-jobs) and the counted geo pages.
 *
 * All counts come from real query results (getSearchableJobs = worldwide +
 * regional, ranked), so the pages change as inventory shifts — no placeholder
 * content, per Google's programmatic-pages policy.
 */
import type { Job, Category } from "./types";
import { CATEGORIES, categoryToSlug } from "./taxonomy";

/** Popular location pages to cross-link from every hub (must exist in landing.ts GEO_PAGES). */
export const POPULAR_LOCATIONS: { slug: string; label: string }[] = [
  { slug: "remote-jobs-in-usa", label: "USA" },
  { slug: "remote-jobs-in-europe", label: "Europe" },
  { slug: "remote-jobs-in-uk", label: "UK" },
  { slug: "remote-jobs-in-canada", label: "Canada" },
  { slug: "remote-jobs-in-india", label: "India" },
  { slug: "remote-jobs-in-the-bay-area", label: "Bay Area" },
  { slug: "remote-jobs-in-new-york", label: "New York" },
  { slug: "remote-jobs-in-london", label: "London" },
  { slug: "remote-jobs-in-berlin", label: "Berlin" },
  { slug: "remote-jobs-in-toronto", label: "Toronto" },
  { slug: "remote-jobs-in-singapore", label: "Singapore" },
  { slug: "remote-jobs-in-australia", label: "Australia" },
];

/** The SEO hub pages, cross-linked from each other and the footer. */
export const HUB_LINKS: { href: string; label: string; desc: string }[] = [
  { href: "/find-remote-jobs", label: "Find Remote Jobs", desc: "Guided search across every category and location" },
  { href: "/remote-jobs-categories", label: "Popular Categories", desc: "Every category, ranked by open roles" },
  { href: "/remote-jobs-programming-support-design", label: "Programming, Support & Design", desc: "Multi-category roundup" },
  { href: "/trending-remote-jobs", label: "Trending This Week", desc: "Freshly posted, in-demand roles" },
];

/** Path to a category's landing page. */
export function categoryHref(category: Category): string {
  return `/remote-${categoryToSlug(category)}-jobs`;
}

/** Group a job set by category (every category present, in taxonomy order). */
export function groupByCategory(jobs: Job[]): Map<Category, Job[]> {
  const map = new Map<Category, Job[]>();
  for (const c of CATEGORIES) map.set(c, []);
  for (const j of jobs) map.get(j.category)?.push(j);
  return map;
}

/** Categories that have at least one job, most jobs first (keeps hubs fresh). */
export function categoriesByCount(jobs: Job[]): { category: Category; jobs: Job[] }[] {
  const map = groupByCategory(jobs);
  return CATEGORIES.map((category) => ({ category, jobs: map.get(category)! }))
    .filter((g) => g.jobs.length > 0)
    .sort((a, b) => b.jobs.length - a.jobs.length);
}

/** Top N category labels present in a job set (for meta descriptions). */
export function topCategoryLabels(jobs: Job[], n = 3): Category[] {
  return categoriesByCount(jobs).slice(0, n).map((g) => g.category);
}

/**
 * "Trending" = posted in the last `days` days, ranked by recency and skill
 * specificity (more listed skills ⇒ a more specific, higher-signal role).
 * Falls back to the most-recent jobs when too few are genuinely new, so the
 * page always renders real results (never thin/empty).
 */
export function trendingJobs(jobs: Job[], days = 7, limit = 20): { jobs: Job[]; freshCount: number } {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  const isFresh = (j: Job) => new Date(j.posted_at).getTime() >= cutoff;
  const score = (j: Job) => new Date(j.posted_at).getTime() + Math.min(j.skills.length, 8) * 12 * 60 * 60 * 1000;
  const fresh = jobs.filter(isFresh).sort((a, b) => score(b) - score(a));
  if (fresh.length >= limit) return { jobs: fresh.slice(0, limit), freshCount: fresh.length };
  // Top up with the most-recent remaining jobs so the list is always full.
  const rest = jobs
    .filter((j) => !isFresh(j))
    .sort((a, b) => new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime());
  return { jobs: [...fresh, ...rest].slice(0, limit), freshCount: fresh.length };
}
