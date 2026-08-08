import type { MetadataRoute } from "next";
import { getAllJobs, getRegionalJobs, getCompanies } from "@/lib/db";
import { allLandingSlugs } from "@/lib/landing";
import { abs, FEATURES } from "@/lib/site";

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    "/", "/companies", "/hiring", "/rss-feeds", "/remote-regional-jobs",
    "/about", "/contact", "/privacy", "/terms",
    ...(FEATURES.advertise ? ["/advertise"] : []),
    ...(FEATURES.newsletter ? ["/newsletter"] : []),
  ].map((path) => ({ url: abs(path), lastModified: now, changeFrequency: "daily" as const, priority: path === "/" ? 1 : 0.6 }));

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

  return [...staticPages, ...landings, ...companies, ...jobs];
}
