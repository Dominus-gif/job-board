/**
 * Refreshes the NordHarton featured listings from https://nordharton.com/careers.
 *
 * NordHarton is a featured partner without an applicant-tracking system we can
 * read, so its roles used to be typed into src/lib/seed/nordharton.ts by hand.
 * They drifted: the careers page listed 8 roles against our 3, and our dates
 * were fixed offsets ("21 days ago" forever) rather than what the page said.
 *
 * This runs in `prebuild`, so the nightly rebuild re-reads the careers page and
 * writes src/lib/generated/nordharton.json, which the seed module turns into
 * listings. Roles the page no longer lists disappear; new ones appear.
 *
 * Dates. The careers page says "Posted 4 days ago", "Posted 2 weeks ago". We
 * convert that to a date on the day we read it, and never move a known role's
 * date later unless the gap is bigger than the label's own rounding (a repost),
 * so a role labelled "2 weeks ago" for seven days in a row keeps one date.
 *
 * Failure is always soft: if the page cannot be read or parsed, the previous
 * JSON is left untouched and the build continues.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ORIGIN = "https://nordharton.com";
const CAREERS = `${ORIGIN}/careers`;
const OUT = join(process.cwd(), "src/lib/generated/nordharton.json");
const UA = "getremotejobsnow/1.0 (+https://getremotejobsnow.com)";
const DAY = 86_400_000;

export interface NordHartonSection {
  heading: string;
  paragraphs: string[];
  items: string[];
}

export interface NordHartonRole {
  slug: string;
  url: string;
  title: string;
  team: string;
  postedLabel: string;
  postedAt: string;
  location: string;
  employment: string;
  level: string;
  salary: string;
  teamSize: string;
  lead: string;
  sections: NordHartonSection[];
}

export interface NordHartonFile {
  source: string;
  fetchedAt: string;
  roles: NordHartonRole[];
}

function decode(s: string): string {
  return s
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

const text = (html: string) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

async function get(url: string): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15_000);
  try {
    const r = await fetch(url, { headers: { "user-agent": UA }, signal: ctrl.signal });
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return await r.text();
  } finally {
    clearTimeout(t);
  }
}

/** Days before `now` that a "Posted …" label means, or null if unreadable. */
export function labelToDays(label: string): number | null {
  const s = label.toLowerCase();
  if (/today|just now|hours? ago/.test(s)) return 0;
  if (/yesterday/.test(s)) return 1;
  const m = /(\d+|an?|one)\s+(day|week|month)s?\s+ago/.exec(s);
  if (!m) return null;
  const n = /^\d+$/.test(m[1]) ? Number(m[1]) : 1;
  return n * (m[2] === "day" ? 1 : m[2] === "week" ? 7 : 30);
}

/** How far a label of this unit can be off, used to tell drift from a repost. */
function labelSlackDays(label: string): number {
  if (/month/i.test(label)) return 31;
  if (/week/i.test(label)) return 8;
  return 1;
}

function parseRole(slug: string, html: string, now: number): NordHartonRole | null {
  const main = /<main[\s\S]*?<\/main>/.exec(html)?.[0];
  if (!main) return null;
  const title = /<h1[^>]*>([\s\S]*?)<\/h1>/.exec(main)?.[1];
  const team = /<span class="font-mono[^"]*">([\s\S]*?)<\/span>/.exec(main)?.[1];
  const posted = /(Posted [^<]+)</.exec(main)?.[1];
  if (!title || !posted) return null;

  const afterH1 = main.slice(main.indexOf("</h1>"));
  const lead = /<p[^>]*>([\s\S]*?)<\/p>/.exec(afterH1)?.[1] ?? "";
  const chips = [...afterH1.matchAll(/<span class="rounded-full[^"]*">([\s\S]*?)<\/span>/g)].map((m) => text(m[1]));
  const [location = "", employment = "", level = "", salary = "", teamSize = ""] = chips;

  const sections: NordHartonSection[] = [];
  const parts = main.split(/<h2[^>]*>/).slice(1);
  for (const part of parts) {
    const heading = text(part.slice(0, part.indexOf("</h2>")));
    const body = part.slice(part.indexOf("</h2>")).split(/Interested in the /)[0];
    const items = [...body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => text(m[1])).filter(Boolean);
    const paragraphs = items.length ? [] : [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => text(m[1])).filter(Boolean);
    if (heading && (items.length || paragraphs.length)) sections.push({ heading, paragraphs, items });
  }
  if (!sections.length) return null;

  const days = labelToDays(posted);
  return {
    slug,
    url: `${CAREERS}/${slug}`,
    title: text(title),
    team: text(team ?? ""),
    postedLabel: posted.trim(),
    postedAt: new Date(now - (days ?? 0) * DAY).toISOString().slice(0, 10) + "T00:00:00.000Z",
    location,
    employment,
    level,
    salary,
    teamSize,
    lead: text(lead),
    sections,
  };
}

function readPrevious(): NordHartonFile | null {
  if (!existsSync(OUT)) return null;
  try {
    return JSON.parse(readFileSync(OUT, "utf8")) as NordHartonFile;
  } catch {
    return null;
  }
}

async function main() {
  const now = Date.now();
  const previous = readPrevious();
  let listing: string;
  try {
    listing = await get(CAREERS);
  } catch (err) {
    console.warn(`[nordharton] careers page unreachable (${err instanceof Error ? err.message : err}); keeping previous file.`);
    return;
  }
  const slugs = [...new Set([...listing.matchAll(/href="\/careers\/([a-z0-9-]+)"/g)].map((m) => m[1]))];
  if (!slugs.length) {
    console.warn("[nordharton] no roles found on the careers page; keeping previous file.");
    return;
  }

  const roles: NordHartonRole[] = [];
  let failed = 0;
  for (const slug of slugs) {
    try {
      const role = parseRole(slug, await get(`${CAREERS}/${slug}`), now);
      if (role) roles.push(role);
      else failed++;
    } catch {
      failed++;
    }
  }
  // Most pages failing means the page changed shape, not that roles closed.
  if (!roles.length || failed > slugs.length / 2) {
    console.warn(`[nordharton] ${failed}/${slugs.length} role pages unreadable; keeping previous file.`);
    return;
  }

  for (const role of roles) {
    const before = previous?.roles.find((r) => r.slug === role.slug);
    if (!before) continue;
    const gapDays = (Date.parse(role.postedAt) - Date.parse(before.postedAt)) / DAY;
    // Within the label's rounding, keep the earlier date; beyond it, it was reposted.
    if (gapDays > 0 && gapDays <= labelSlackDays(role.postedLabel)) role.postedAt = before.postedAt;
  }

  const file: NordHartonFile = { source: CAREERS, fetchedAt: new Date(now).toISOString(), roles };
  writeFileSync(OUT, JSON.stringify(file, null, 2) + "\n");
  console.log(`[nordharton] ${roles.length} roles written${failed ? ` (${failed} unreadable)` : ""}.`);
}

main().catch((err) => {
  console.warn(`[nordharton] refresh failed (${err instanceof Error ? err.message : err}); keeping previous file.`);
});
