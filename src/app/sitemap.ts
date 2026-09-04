import type { MetadataRoute } from "next";
import { getAllJobs, getRegionalJobs, getCompanies } from "@/lib/db";
import { allLandingSlugs } from "@/lib/landing";
import { getAllPosts } from "@/lib/posts";
import { TOOLS } from "@/lib/tools";
import { CATEGORIES } from "@/lib/taxonomy";
import { abs, FEATURES } from "@/lib/site";

export const revalidate = 1800;

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
    "/about", "/contact", "/privacy", "/terms",
    ...(FEATURES.advertise ? ["/advertise"] : []),
    ...(FEATURES.newsletter ? ["/newsletter"] : []),
  ].map((path) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency: staticFreq(path),
    priority: path === "/" ? 1 : HUBS.includes(path) ? 0.8 : 0.6,
  }));

  // Indexable /jobs filter facets (category + region) — long-tail SEO surfaces.
  const REGION_FACETS = ["United States", "Europe", "UK", "Asia-Pacific", "Canada", "India"];
  const jobFacets = [
    ...CATEGORIES.map((c) => `/jobs?category=${encodeURIComponent(c)}`),
    ...REGION_FACETS.map((r) => `/jobs?region=${encodeURIComponent(r)}`),
  ].map((path) => ({ url: abs(path), lastModified: now, changeFrequency: "daily" as const, priority: 0.6 }));

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

  const landings = (await allLandingSlugs()).map((slug) => ({
    url: abs(`/${slug}`),
    lastModified: now,
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  const companies = (await getCompanies()).map((c) => ({
    url: abs(`/companies/${c.slug}`),
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  // Every listing gets its own indexable URL — worldwide and regional alike.
  const [worldwide, regional] = await Promise.all([getAllJobs(), getRegionalJobs()]);
  const jobs = [...worldwide, ...regional].map((job) => ({
    url: abs(`/jobs/${job.slug}`),
    lastModified: new Date(job.posted_at),
    changeFrequency: "weekly" as const,
    priority: job.is_featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...jobFacets, ...landings, ...companies, ...posts, ...tools, ...jobs];
}
