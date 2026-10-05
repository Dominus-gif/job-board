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

/**
 * The crawlers that fetch a page to build a link preview card.
 *
 * They get their own group because of how robots.txt precedence works: a
 * crawler that matches a named user-agent group ignores the "*" group
 * completely. Without this, these bots inherited `Disallow: /api/` from "*",
 * and our Open Graph image is served from /api/og — so Twitter, Slack and the
 * rest were refusing to fetch the image before they ever asked the server for
 * it. The result was a link with no preview card, which is exactly what was
 * reported. The server had always been answering these bots with a valid
 * 1200x630 PNG; they were just never allowed to ask.
 *
 * These are preview fetchers, not indexers and not AI training crawlers, and
 * they only ever fetch a URL somebody has already chosen to share.
 */
const PREVIEW_CRAWLERS = [
  "Twitterbot",
  "facebookexternalhit",
  "LinkedInBot",
  "Slackbot",
  "Slackbot-LinkExpanding",
  "Discordbot",
  "TelegramBot",
  "WhatsApp",
  "redditbot",
  "Applebot",
  "Mastodon",
  "Pinterestbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // /api/og is the Open Graph image. It is allowed explicitly as well as by
      // the group above, because crawlers without a named group here resolve
      // conflicting rules by longest match, and "/api/og" beats "/api/".
      { userAgent: "*", allow: ["/", "/api/og"], disallow: ["/api/"] },
      { userAgent: PREVIEW_CRAWLERS, allow: "/" },
      { userAgent: AI_CRAWLERS, disallow: "/" },
    ],
    sitemap: abs("/sitemap.xml"),
    host: abs("/"),
  };
}
