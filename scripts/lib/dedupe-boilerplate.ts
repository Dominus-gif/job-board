/**
 * Take the company out of the job description.
 *
 * An employer's postings are built from a template: the same "About us"
 * paragraph opens every one, and the same benefits / EEO / how-to-apply block
 * closes every one. Only the middle is about the role.
 *
 * That template is the whole reason the board read as duplicate content. The
 * old 520-character excerpt cut inside the opening paragraph, so all 207 GitLab
 * listings stored the same 520 characters and nothing else. Even with full
 * descriptions the problem persists in a milder form: two roles at one company
 * can share thousands of characters of identical framing.
 *
 * So before anything is stored, the shared prefix and suffix across an
 * employer's own postings are found and removed. What is left is the part that
 * differs between their roles — which is exactly the part a reader came for,
 * and the part that makes the page unique.
 *
 * Only applied where an employer has two or more postings; with one posting
 * there is nothing to compare against and nothing is removed.
 */

/** Common leading tokens across every member of `docs`. */
function sharedPrefixLength(docs: string[][]): number {
  if (docs.length < 2) return 0;
  const shortest = Math.min(...docs.map((d) => d.length));
  let i = 0;
  while (i < shortest && docs.every((d) => d[i] === docs[0][i])) i++;
  return i;
}

/** Common trailing tokens across every member of `docs`. */
function sharedSuffixLength(docs: string[][]): number {
  if (docs.length < 2) return 0;
  const shortest = Math.min(...docs.map((d) => d.length));
  let i = 0;
  while (i < shortest && docs.every((d) => d[d.length - 1 - i] === docs[0][docs[0].length - 1 - i])) i++;
  return i;
}

/**
 * How much of a description may be stripped as boilerplate.
 *
 * A ceiling matters: if two postings at a small company genuinely are 90% the
 * same text, removing all of it leaves a stub, which is worse than leaving the
 * repetition in. Past this share the text is treated as genuinely shared
 * content rather than a template wrapper.
 */
const MAX_STRIP_SHARE = 0.65;
/** Below this many tokens a "shared run" is a coincidence, not a template. */
const MIN_RUN_TOKENS = 12;

export interface Stripped {
  /** Role-specific text, boilerplate removed. */
  text: string;
  /** Tokens removed from the front and back. */
  removed: number;
}

/**
 * Strip the shared template from one employer's postings.
 *
 * Input and output are plain text (markup is dropped upstream); the caller
 * re-wraps. Returns one entry per input, in order.
 */
export function stripCompanyBoilerplate(descriptions: string[]): Stripped[] {
  const docs = descriptions.map((d) => d.split(" ").filter(Boolean));
  if (docs.length < 2) return descriptions.map((text) => ({ text, removed: 0 }));

  let prefix = sharedPrefixLength(docs);
  let suffix = sharedSuffixLength(docs);
  if (prefix < MIN_RUN_TOKENS) prefix = 0;
  if (suffix < MIN_RUN_TOKENS) suffix = 0;
  if (prefix === 0 && suffix === 0) return descriptions.map((text) => ({ text, removed: 0 }));

  return docs.map((d) => {
    const removable = prefix + suffix;
    // Never strip so much that the listing stops being a page.
    if (removable / Math.max(d.length, 1) > MAX_STRIP_SHARE) {
      return { text: d.join(" "), removed: 0 };
    }
    const kept = d.slice(prefix, d.length - suffix);
    return { text: kept.join(" "), removed: removable };
  });
}

/**
 * Cut to `limit` characters on a sentence boundary where there is one nearby,
 * so a stored description never ends mid-thought.
 */
export function trimToSentence(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const slice = text.slice(0, limit);
  const lastStop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "));
  if (lastStop > limit * 0.6) return slice.slice(0, lastStop + 1);
  return slice.replace(/\s+\S*$/, "") + "…";
}
