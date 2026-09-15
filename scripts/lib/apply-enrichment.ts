/**
 * Swap excerpts for the employer's own description, with their template removed.
 *
 * Shared by both build outputs, because the board is assembled from two files
 * and fixing only one leaves the other duplicating. That is exactly what
 * happened first time round: curated-jobs.json was enriched, snapshot.json was
 * not, and GitLab's opening paragraph stayed on 204 pages.
 *
 * Input is whatever job records the caller built; they are mutated in place and
 * the counts returned for logging.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { stripCompanyBoilerplate, trimToSentence } from "./dedupe-boilerplate";

interface ContentRec {
  title: string;
  html: string;
  chars: number;
  at: string;
}

interface Enrichable {
  apply_url: string;
  company_slug?: string;
  company_name: string;
  description_html: string;
}

/**
 * Characters of role text stored per listing.
 *
 * A bundle-size trade — the dataset is inlined into the Worker three times over
 * — but a far better one than the 520-character excerpt it replaces. After the
 * employer's template is stripped these are ~130 words OF THE ROLE, where the
 * old 520 were the company's opening paragraph and identical across every
 * posting they had.
 *
 * 800 rather than the 1300 this was first set to, and the reason is worth
 * recording because it is counter-intuitive: de-duplicating the descriptions
 * made them COMPRESS WORSE. 5,575 listings used to share identical text, which
 * gzip collapsed to almost nothing. Unique prose does not collapse, so at 1300
 * the Worker measured 11.17 MB gzipped against a 10 MB ceiling — the fix for
 * one problem had created another. At 800 the dataset gzips to 2.39 MB, level
 * with where it sat before enrichment, and every listing that clears the
 * indexing bar still clears it (6,246 of them, against 3,096 before).
 */
export const STORE_CHARS = 800;

/** Minimum that must survive stripping, else the original is kept. */
const MIN_BODY_CHARS = 200;

/**
 * Entities first, tags second.
 *
 * Greenhouse returns its `content` field HTML-escaped, so the markup arrives as
 * the literal text "&lt;p&gt;". Stripping tags before decoding leaves that
 * text in the description — which is how 41 Canonical listings ended up storing
 * "&lt;p&gt;canonical is a leading provider…" and duplicating each other on it.
 * Decoding first turns it back into markup that the tag strip then removes.
 */
function decodeEntities(input: string): string {
  return String(input || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&rsquo;|&apos;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&"); // last: an &amp;lt; must not become a tag
}

function plainText(html: string): string {
  // Decode twice: some feeds double-escape, so one pass leaves "&lt;p&gt;".
  const decoded = decodeEntities(decodeEntities(html));
  return decoded
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export interface EnrichResult {
  enriched: number;
  strippedWords: number;
  available: number;
}

export function applyEnrichment(jobs: Enrichable[]): EnrichResult {
  let content: Record<string, ContentRec>;
  try {
    const path = join(process.cwd(), "src", "lib", "generated", "job-content.json");
    content = JSON.parse(readFileSync(path, "utf8")) as Record<string, ContentRec>;
  } catch {
    return { enriched: 0, strippedWords: 0, available: 0 };
  }

  // Group by employer: the template can only be found by comparing one
  // company's postings against each other.
  const byCompany = new Map<string, Enrichable[]>();
  let available = 0;
  for (const j of jobs) {
    if (!content[j.apply_url]) continue;
    available++;
    const key = j.company_slug || j.company_name;
    const group = byCompany.get(key);
    if (group) group.push(j);
    else byCompany.set(key, [j]);
  }

  let enriched = 0;
  let strippedWords = 0;
  for (const group of byCompany.values()) {
    const texts = group.map((j) => plainText(content[j.apply_url].html));
    const stripped = stripCompanyBoilerplate(texts);
    group.forEach((j, i) => {
      const { text, removed } = stripped[i];
      const body = trimToSentence(text, STORE_CHARS).trim();
      if (body.length < MIN_BODY_CHARS) return; // keep what we had
      j.description_html = `<p>${body}</p>`;
      strippedWords += removed;
      enriched++;
    });
  }
  return { enriched, strippedWords, available };
}
