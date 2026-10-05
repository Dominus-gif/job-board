import { describe, expect, it } from "vitest";
import robots from "./robots";

/**
 * Link preview cards broke once and nothing noticed, because nothing here is
 * wired up to notice.
 *
 * The Open Graph image was served from /api/og, and robots.txt carried
 * `Disallow: /api/` under the `*` group to keep crawlers out of the JSON
 * endpoints. Twitter, Slack, LinkedIn and the rest read robots.txt before
 * fetching an image, so they declined to request a file the server was happily
 * serving, and every shared link rendered without a card. The server returned
 * 200 the whole time, which is why no uptime or status check would ever have
 * caught it.
 *
 * These tests encode the two things that have to stay true: the preview
 * crawlers can reach the image, and the API routes that are not the image stay
 * closed to the general crawler.
 */

type Rule = { userAgent?: string | string[]; allow?: string | string[]; disallow?: string | string[] };

const rules = (): Rule[] => {
  const r = robots().rules;
  return (Array.isArray(r) ? r : [r]) as Rule[];
};

const list = (v: string | string[] | undefined): string[] => (v == null ? [] : Array.isArray(v) ? v : [v]);

/** The group a crawler obeys: its own named group if it has one, else `*`. */
function groupFor(agent: string): Rule | undefined {
  const named = rules().find((rule) =>
    list(rule.userAgent).some((ua) => ua.toLowerCase() === agent.toLowerCase()),
  );
  return named ?? rules().find((rule) => list(rule.userAgent).includes("*"));
}

/** robots.txt precedence: the longest matching path wins. */
function allowed(agent: string, path: string): boolean {
  const group = groupFor(agent);
  if (!group) return true;
  const match = (patterns: string[]) =>
    patterns.filter((p) => path.startsWith(p)).sort((a, b) => b.length - a.length)[0];
  const a = match(list(group.allow));
  const d = match(list(group.disallow));
  if (a && d) return a.length >= d.length;
  if (d) return false;
  return true;
}

const PREVIEW_BOTS = ["Twitterbot", "facebookexternalhit", "LinkedInBot", "Slackbot", "Discordbot", "WhatsApp"];

describe("robots.txt", () => {
  it("lets every link-preview crawler fetch the Open Graph image", () => {
    for (const bot of PREVIEW_BOTS) {
      for (const path of ["/og.png", "/api/og"]) {
        // /og.png is where the image lives now; /api/og still redirects to it
        // for cards a platform cached before the move.
        expect(allowed(bot, path), `${bot} must be able to fetch ${path} or shared links show no card`).toBe(true);
      }
    }
  });

  it("lets link-preview crawlers fetch the pages people share", () => {
    for (const bot of PREVIEW_BOTS) {
      for (const path of ["/", "/jobs", "/posts/remote-product-manager-jobs", "/work-from-anywhere-jobs"]) {
        expect(allowed(bot, path), `${bot} blocked from ${path}`).toBe(true);
      }
    }
  });

  it("still allows the Open Graph image for a crawler with no group of its own", () => {
    // Longest-match: "/api/og" beats "/api/". Googlebot falls through to `*`.
    expect(allowed("Googlebot", "/api/og")).toBe(true);
  });

  it("keeps the other API routes closed to the general crawler", () => {
    for (const path of ["/api/search", "/api/ingest", "/api/interest", "/api/job-status"]) {
      expect(allowed("Googlebot", path), `${path} should stay disallowed`).toBe(false);
    }
  });

  it("still blocks the AI training crawlers everywhere", () => {
    for (const bot of ["GPTBot", "CCBot", "ClaudeBot", "Google-Extended"]) {
      expect(allowed(bot, "/"), `${bot} should be blocked`).toBe(false);
      expect(allowed(bot, "/jobs"), `${bot} should be blocked`).toBe(false);
    }
  });

  it("publishes the sitemap", () => {
    expect(robots().sitemap).toContain("/sitemap.xml");
  });
});
