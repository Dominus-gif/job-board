import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

/**
 * Cloudflare's "Managed robots.txt" used to prepend an AI-crawler blocklist to
 * this file, but it also intercepted /robots.txt on the www host before the
 * Worker ran — so www served Cloudflare's block with no Sitemap directive while
 * the apex served ours with one. Turning the managed file off made this route
 * authoritative on both hosts; these rules carry the blocklist it was adding,
 * so nothing is lost.
 *
 * Note this blocks AI *training* crawlers only. Googlebot and
 * Mediapartners-Google (the AdSense crawler) are covered by the "*" group and
 * stay allowed — Google-Extended governs AI training, not search indexing.
 */
const AI_CRAWLERS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  "CloudflareBrowserRenderingCrawler",
  "Google-Extended",
  "GPTBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, disallow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
