import type { MetadataRoute } from "next";
import { getAllJobs, getRegionalJobs, getCompanies } from "@/lib/db";
import { allLandingSlugs, canonicalLandingSlug, resolveLanding, WFA_HUB_SLUGS } from "@/lib/landing";
import { getAllPosts } from "@/lib/posts";
import { TOOLS } from "@/lib/tools";
import { abs, FEATURES } from "@/lib/site";
import { jobIsIndexable, companyIsIndexable, landingIsIndexable } from "@/lib/seo/indexing";

export const revalidate = 1800;

/**
 * The sitemap is a claim: "these URLs are worth your crawl budget and worth
 * ranking." It used to list all 12,797 pages the site can render, most of them
 * a template around 33 words, and that claim is what the AdSense review was
 * judging.
 *
 * It now lists only what clears the bar in src/lib/seo/indexing.ts — the same
 * predicates the pages themselves use for their robots tag, so a URL is never
 * submitted here and then served with `noindex`. Everything excluded is still
 * on the site, still linked, still reachable; it just is not offered as a
 * search destination.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // SEO discovery hubs — fresh, high-value internal-linking pages.
  const HUBS = ["/find-remote-jobs", "/remote-jobs-categories", "/remote-jobs-programming-support-design", "/trending-remote-jobs"];

  // Honest changefreq per page type so Google trusts the signal: content hubs
  // update often; static/legal pages rarely do.
  const DAILY = new Set(["/", "/jobs", "/companies", "/remote-regional-jobs", ...HUBS]);
  const WEEKLY = new Set(["/tools", "/posts", "/hiring", "/rss-feeds"]);
  const staticFreq = (path: string): "daily" | "weekly" | "monthly" =>
    DAILY.has(path) ? "daily" : WEEKLY.has(path) ? "weekly" : "monthly";

  const staticPages = [
    "/", "/jobs", "/companies", "/hiring", "/rss-feeds", "/remote-regional-jobs", "/tools", "/posts",
    ...HUBS,
    "/about", "/how-it-works", "/faq", "/contact", "/privacy", "/terms",
    ...(FEATURES.advertise ? ["/advertise"] : []),
    ...(FEATURES.newsletter ? ["/newsletter"] : []),
  ].map((path) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency: staticFreq(path),
    priority: path === "/" ? 1 : HUBS.includes(path) ? 0.8 : 0.6,
  }));

  // The /jobs?category= and /jobs?region= facets used to be listed here as
  // long-tail surfaces. They were dropped: each one is the same result set as a
  // dedicated landing page (/remote-backend-jobs, /remote-jobs-in-europe) that
  // has its own copy and FAQ, so Search Console reported them as "Duplicate,
  // Google chose different canonical". The facets stay linked from the board's
  // own filters; they are just not submitted as separate destinations.

  const posts = getAllPosts().map((p) => ({
    url: abs(`/posts/${p.slug}`),
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tools = TOOLS.map((t) => ({
    url: abs(`/tools/${t.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // The work-from-anywhere cluster hubs are declared daily rather than hourly:
  // their listings turn over on the nightly rebuild, and an honest interval is
  // worth more than an optimistic one.
  //
  // A landing page is submitted only when the page itself would allow indexing:
  // it is the canonical slug (not an alias pointing somewhere else) and it has
  // enough results to be worth ranking. Both tests match [landing]/page.tsx, so
  // a URL is never listed here and then served noindex or with a canonical
  // pointing elsewhere.
  const wfaHubs = new Set(WFA_HUB_SLUGS);
  const landingSlugs = await allLandingSlugs();
  const landingEntries = await Promise.all(
    landingSlugs.map(async (slug) => {
      if (canonicalLandingSlug(slug) !== slug) return null;
      const view = await resolveLanding(slug);
      if (!view || !landingIsIndexable(view.jobs.length)) return null;
      return {
        url: abs(`/${slug}`),
        lastModified: now,
        changeFrequency: (wfaHubs.has(slug) ? "daily" : "hourly") as "daily" | "hourly",
        priority: 0.8,
      };
    }),
  );
  const landings = landingEntries.filter((e): e is NonNullable<typeof e> => e !== null);

  const companies = (await getCompanies())
    .filter((c) => companyIsIndexable(c.jobCount))
    .map((c) => ({
      url: abs(`/companies/${c.slug}`),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));

  // A listing is listed here when it carries enough of its own description to
  // be a destination — see jobIsIndexable. Worldwide and regional alike.
  const [worldwide, regional] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  const jobs = [...worldwide, ...regional]
    .filter((job) => jobIsIndexable(job))
    .map((job) => ({
      url: abs(`/jobs/${job.slug}`),
      lastModified: new Date(job.posted_at),
      changeFrequency: "weekly" as const,
      priority: job.is_featured ? 0.9 : 0.7,
    }));

  return [...staticPages, ...landings, ...companies, ...posts, ...tools, ...jobs];
}
