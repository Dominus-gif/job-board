/**
 * Take the company out of the job description.
 *
 * An employer's postings are built from a template: the same "About us"
 * paragraph, the same benefits list, the same equal-opportunity statement. Only
 * the rest is about the role, and the template is why 5,575 listings shared a
 * description with another listing.
 *
 * FIRST ATTEMPT, AND WHY IT FAILED. This originally looked for the longest
 * common PREFIX and SUFFIX across a company's postings. That is too brittle:
 * Canonical publishes 304 postings that all carry the same three opening
 * paragraphs, but a single differing word near the start drops the common
 * prefix to zero, so nothing was stripped and their listings kept duplicating
 * each other on the boilerplate.
 *
 * WHAT IT DOES NOW. Sentences, not positions. A sentence that appears in most
 * of an employer's postings is template wherever it sits — opening, middle or
 * closing — and is removed from all of them. Position-independent, so a role
 * that opens with two role-specific lines before the usual blurb is handled the
 * same as one that opens with the blurb.
 */

/** A sentence must appear in at least this share of an employer's postings. */
const TEMPLATE_SHARE = 0.5;
/** ...and in at least this many, so two postings cannot define a template. */
const MIN_DOCS = 3;
/** Shorter fragments repeat by coincidence ("Apply now.", "Benefits"). */
const MIN_SENTENCE_WORDS = 6;
/**
 * How much may go, expressed as a floor on what SURVIVES rather than a ceiling
 * on what is removed.
 *
 * A share ceiling was the wrong shape: Canonical's postings are ~79% template
 * around ~180 words of role, so a 75% ceiling refused to strip them at all and
 * 38 of their listings kept opening with the same three paragraphs. What
 * actually matters is that something real is left, so the test is now on the
 * remainder — strip as much template as there is, provided the role survives.
 */
const MIN_SURVIVING_WORDS = 45;

export interface Stripped {
  /** Role-specific text, template removed. */
  text: string;
  /** Words removed. */
  removed: number;
}

/** Split into sentences, keeping their terminator so the rejoin reads right. */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Normalised key, so trivial punctuation differences still count as the same. */
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();
const wordCount = (s: string) => (s ? s.split(/\s+/).length : 0);

/**
 * Strip the shared template from one employer's postings.
 *
 * Input and output are plain text; the caller re-wraps. Returns one entry per
 * input, in order. With fewer than MIN_DOCS postings nothing is removed —
 * there is not enough to tell a template from a coincidence.
 */
export function stripCompanyBoilerplate(descriptions: string[]): Stripped[] {
  if (descriptions.length < MIN_DOCS) return descriptions.map((text) => ({ text, removed: 0 }));

  const docs = descriptions.map(sentences);

  // How many postings contain each sentence?
  const docFrequency = new Map<string, number>();
  for (const doc of docs) {
    const seen = new Set<string>();
    for (const s of doc) {
      if (wordCount(s) < MIN_SENTENCE_WORDS) continue;
      const k = key(s);
      if (!k || seen.has(k)) continue;
      seen.add(k);
      docFrequency.set(k, (docFrequency.get(k) ?? 0) + 1);
    }
  }

  const threshold = Math.max(MIN_DOCS, Math.ceil(docs.length * TEMPLATE_SHARE));
  const template = new Set<string>();
  for (const [k, n] of docFrequency) if (n >= threshold) template.add(k);
  if (template.size === 0) return descriptions.map((text) => ({ text, removed: 0 }));

  return docs.map((doc, i) => {
    const original = descriptions[i];
    const originalWords = wordCount(original);
    const kept = doc.filter((s) => !template.has(key(s)));
    const keptWords = kept.reduce((n, s) => n + wordCount(s), 0);
    const removed = originalWords - keptWords;

    // If stripping leaves too little, these postings genuinely are the same
    // text rather than a template around different roles. Leave it alone.
    if (keptWords < MIN_SURVIVING_WORDS) return { text: original, removed: 0 };
    return { text: kept.join(" ").trim(), removed };
  });
}

/**
 * Cut to `limit` characters on a sentence boundary where there is one nearby,
 * so a stored description never ends mid-thought — which is what produced
 * "…Teams meet two to four times yearly in person, in interesting locatio".
 */
export function trimToSentence(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const slice = text.slice(0, limit);
  const lastStop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "));
  if (lastStop > limit * 0.5) return slice.slice(0, lastStop + 1);
  return slice.replace(/\s+\S*$/, "") + "…";
}
