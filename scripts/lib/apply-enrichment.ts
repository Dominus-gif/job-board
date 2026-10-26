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
import { describeCompleteness } from "../../src/lib/seo/description-completeness";

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
  has_full_description?: boolean;
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
 * 500, and deliberately small, because this is no longer what the reader sees.
 * The job page fetches the employer's COMPLETE posting at render time — see
 * src/lib/job-description.ts — so this is a card snippet, a search index and a
 * fallback for the 37% of listings that are not on an addressable board.
 *
 * Worth recording why it cannot simply be large: the dataset is inlined into
 * the Worker three times over, and de-duplicating the descriptions made them
 * COMPRESS WORSE — 5,575 listings used to share identical text that gzip
 * collapsed to nothing, and unique prose does not. At 1300 the Worker measured
 * 11.17 MB gzipped against a 10 MB ceiling. Storing the full text was never
 * possible at any cap; fetching it was the answer.
 */
export const STORE_CHARS = 500;

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
  /** Of `enriched`, how many used the feed's own text because nothing was captured. */
  fromFeed: number;
}

// Two capture files: the ATS board sweep and the generic pass. Merged here so
// the rest of the build does not care which route found a description. Read
// once per process; job-content.json alone is about 40 MB.
let captured: Record<string, ContentRec> | null = null;
function readCaptures(): Record<string, ContentRec> {
  const read = (name: string): Record<string, ContentRec> => {
    try {
      return JSON.parse(readFileSync(join(process.cwd(), "src", "lib", "generated", name), "utf8")) as Record<
        string,
        ContentRec
      >;
    } catch {
      return {};
    }
  };
  captured ??= { ...read("job-content.json"), ...read("job-content-generic.json") };
  return captured;
}

/**
 * The employer's whole captured posting, as markup, for an apply URL.
 *
 * What a listing stores is a 500-character snippet (STORE_CHARS), which is
 * enough for a card and far too little for any test that has to read the
 * posting. The office-attendance check ran on that snippet and caught none of
 * the postings whose own text says "hybrid work model" or "3 days a week in
 * the office": measured on 26 October 2026, 14 of 296 such postings said it
 * within the first 500 characters, and the median sat two thirds of the way
 * down, under benefits or location.
 */
export function capturedPosting(applyUrl: string): string | undefined {
  const rec = readCaptures()[applyUrl];
  return rec ? decodeEntities(decodeEntities(rec.html)) : undefined;
}

/**
 * Swap each job's description for a snippet of the employer's own posting,
 * with the company's repeated template removed, and mark it as rendering the
 * whole posting.
 *
 * The posting comes from the capture files. `feedPosting`, when given, supplies
 * it for jobs that were never captured: see build-snapshot.ts for why the ATS
 * half of the board needs that and the curated half must not have it.
 */
export function applyEnrichment(jobs: Enrichable[], feedPosting?: (job: Enrichable) => string | null): EnrichResult {
  const content = readCaptures();

  // Group by employer: the template can only be found by comparing one
  // company's postings against each other. Sources are read before anything is
  // rewritten, because feedPosting reads the description this loop replaces.
  const byCompany = new Map<string, { job: Enrichable; html: string; feed: boolean }[]>();
  let available = 0;
  for (const j of jobs) {
    const captured = content[j.apply_url]?.html;
    const feed = captured ? null : (feedPosting?.(j) ?? null);
    const html = captured ?? feed;
    if (!html) continue;
    available++;
    const key = j.company_slug || j.company_name;
    const entry = { job: j, html, feed: !captured };
    const group = byCompany.get(key);
    if (group) group.push(entry);
    else byCompany.set(key, [entry]);
  }

  let enriched = 0;
  let strippedWords = 0;
  let fromFeed = 0;
  for (const group of byCompany.values()) {
    const stripped = stripCompanyBoilerplate(group.map((e) => plainText(e.html)));
    group.forEach(({ job: j, feed }, i) => {
      const { text, removed } = stripped[i];
      const body = trimToSentence(text, STORE_CHARS).trim();
      if (body.length < MIN_BODY_CHARS) return; // keep what we had
      j.description_html = `<p>${body}</p>`;
      // The page will render the employer's complete posting for this one.
      j.has_full_description = true;
      strippedWords += removed;
      enriched++;
      if (feed) fromFeed++;
    });
  }
  return { enriched, strippedWords, available, fromFeed };
}


export interface DropReport {
  kept: number;
  dropped: number;
  byReason: Record<string, number>;
}

/**
 * Remove listings that cannot show the employer's whole posting.
 *
 * ON by default, since the board's rule is now that a published listing carries
 * the employer's whole posting. A page promising a job and delivering 89 words
 * that stop mid-sentence is worse for a reader than not being there.
 *
 * KEEP_INCOMPLETE=1 reverses it, and nothing is destroyed by removing them: the
 * listings live in the seed files and come back on the next build if the flag is
 * set, or as soon as a capture run finds their description.
 *
 * `has_full_description` means the capture succeeded and the page fetches the
 * whole posting at render time, so those pass by construction. Everything else
 * has to argue from the stored text: long enough, finishing on a real sentence,
 * and not ending in the ellipsis an excerpt builder leaves behind.
 */
export function dropIncompleteDescriptions<T extends Enrichable>(jobs: T[]): { kept: T[]; report: DropReport } {
  const byReason: Record<string, number> = {};
  const kept = jobs.filter((j) => {
    const v = describeCompleteness(j.description_html, j.has_full_description === true);
    if (v.complete) return true;
    byReason[v.reason] = (byReason[v.reason] ?? 0) + 1;
    return false;
  });
  return { kept, report: { kept: kept.length, dropped: jobs.length - kept.length, byReason } };
}
