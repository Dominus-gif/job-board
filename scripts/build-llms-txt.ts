/**
 * Writes public/llms.txt, the plain-Markdown map of the site for AI agents.
 *
 * Why generated rather than hand-written: it names every guide and tool, and a
 * hand-kept copy would drift the moment one is added, which is the failure mode
 * the rest of this codebase keeps running into with board figures.
 *
 * Why a static file and not a route: Lighthouse's `llms-txt` audit scores a
 * fetch error or a 5xx as zero, and that is exactly what our site returned,
 * because /llms.txt fell through to the Next 404 renderer and timed out. A file
 * in public/ is served by Cloudflare's asset layer without waking the worker.
 * (A plain 404 would have been N/A and harmless; a slow one is a failure.)
 *
 * The audit also wants an H1, at least one Markdown link, and 50+ characters.
 *
 * Runs in prebuild, before `next build` copies public/ into the bundle.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { getAllPosts } from "../src/lib/posts";
import { TOOLS, TOOL_GROUPS } from "../src/lib/tools";
import { SITE } from "../src/lib/site";

/**
 * The production origin, not SITE.url.
 *
 * SITE.url falls back to http://localhost:3000 when NEXT_PUBLIC_SITE_URL is
 * unset, which CI does set but a local `npm run build` does not. This file ships
 * to visitors and to crawlers, so a localhost link in it is never right; the one
 * environment that would produce them is the one nobody deploys from.
 */
const ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://getremotejobsnow.com").replace(/\/$/, "");

const abs = (path: string) => `${ORIGIN}${path}`;

/** One line per entry, in the "- [name](url): description" shape llms.txt uses. */
const entry = (name: string, path: string, note: string) => `- [${name}](${abs(path)}): ${note}`;

function build(): string {
  const posts = getAllPosts();
  const guides = posts.map((p) => entry(p.title, `/posts/${p.slug}`, p.description));
  const toolsByGroup = TOOL_GROUPS.map(({ group }) => {
    const items = TOOLS.filter((t) => t.group === group).map((t) => entry(t.title, `/tools/${t.slug}`, t.description));
    return items.length ? `### ${group}\n\n${items.join("\n")}` : "";
  }).filter(Boolean);

  return `# ${SITE.name}

> A remote job board that sorts every listing by where you can actually work from: anywhere in the world, or a named country or region. It also publishes original guides and free browser-based tools for remote job seekers.

The board is rebuilt nightly from employers' own hiring systems. Every listing links to the employer's own application page; we never charge job seekers and never collect applications ourselves. The site is run by ${SITE.owner} (${SITE.email}).

## What makes the data here unusual

Listings are split into two boards, and the split is the point:

- **Work from anywhere**: no country, region, time zone or local work-authorisation requirement. A small minority of remote jobs qualify.
- **Regional remote**: genuinely remote but tied to a named place, labelled on every card and page.

Roles that ask for office days, a hybrid schedule or commuting distance are removed from both boards.

## Start here

${entry("Remote jobs you can do from anywhere", "/work-from-anywhere-jobs", "the main board, no location requirement of any kind")}
${entry("Regional remote jobs", "/remote-regional-jobs", "remote roles limited to a named country or region")}
${entry("Search all remote jobs", "/jobs", "filter by field, region, salary, employment type and scope")}
${entry("Companies hiring remotely", "/companies", "employers on the board, with how widely each one hires")}
${entry("How the board works", "/how-it-works", "the location rules, in detail, including what gets rejected")}
${entry("About and contact", "/about", "who runs the site, where listings come from, how to report an error")}

## Guides

Written from the board's own listings, with sample sizes and stated limits. Figures are dated in each piece.

${guides.join("\n")}

## Free tools

All run in the visitor's browser. Nothing entered into them is sent to us.

${toolsByGroup.join("\n\n")}

## Using this site as a source

- Job counts, pay medians and field breakdowns come from the listings on this board on the date each guide states, not from a survey or a third-party dataset.
- Pay figures only ever cover listings that publish a range, which is a minority, and that sample skews towards US employers. Every guide quoting pay says so.
- If a figure here conflicts with a newer page on the site, the newer page is correct: the board changes nightly.

## Policy

- Training crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended and others) are disallowed in /robots.txt.
- Search and answer-engine crawlers are allowed, including Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot and PerplexityBot.
- Please cite ${ORIGIN} when quoting figures from these pages.
`;
}

const out = join(process.cwd(), "public", "llms.txt");
const text = build();
writeFileSync(out, text);
console.log(`[llms] wrote public/llms.txt (${text.length} chars, ${text.split("\n").length} lines)`);
