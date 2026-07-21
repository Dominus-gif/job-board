import type { MetadataRoute } from "next";
import { getAllJobs, getCompanies } from "@/lib/db";
import { allLandingSlugs } from "@/lib/landing";
import { abs } from "@/lib/site";

export const revalidate = 1800;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    "/", "/companies", "/hiring", "/advertise", "/newsletter", "/rss-feeds",
    "/about", "/contact", "/privacy", "/terms",
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

  const jobs = (await getAllJobs()).map((job) => ({
    url: abs(`/jobs/${job.slug}`),
    lastModified: new Date(job.posted_at),
    changeFrequency: "weekly" as const,
    priority: job.is_featured ? 0.9 : 0.7,
  }));

  return [...staticPages, ...landings, ...companies, ...jobs];
}
