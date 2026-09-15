/**
 * Is this listing's description complete, or is it a cut-off excerpt?
 *
 * The rule the board now holds itself to: a published listing shows the
 * employer's whole posting. Not most of it, not the first paragraph of it.
 *
 * Getting there has two halves. The capture side is scripts/verify-and-enrich.ts
 * and scripts/enrich-generic.ts, which between them reach about three quarters
 * of the board. This is the other half: deciding what happens to the quarter
 * they cannot reach.
 *
 * The honest answer is that those listings should not be published as full
 * pages. A page promising a job and delivering 89 words that stop mid-sentence
 * is the thing that was wrong in the first place — it is worse for a reader than
 * not being there, and it is exactly what the AdSense review was judging. So a
 * listing that cannot be described completely is dropped from the board rather
 * than dressed up.
 */

/** A complete description is at least this many characters of plain text. */
export const COMPLETE_MIN_CHARS = 900;

/**
 * Marks left by a truncation, wherever they appear. The excerpt builders end a
 * cut with an ellipsis; a description that genuinely ends with one is rare
 * enough that treating it as incomplete costs nothing.
 */
const TRUNCATION_MARK = /(?:…|\.\.\.)\s*$/;

/** Sentence-ending punctuation, or a list/heading close — a natural finish. */
const NATURAL_END = /[.!?:)"'\]]\s*$/;

export interface Completeness {
  complete: boolean;
  chars: number;
  reason: "ok" | "too-short" | "truncated" | "unfinished" | "empty";
}

export function plainTextOf(html: string | undefined | null): string {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Judge a rendered description.
 *
 * `hasFullPosting` is the capture flag: when the employer's whole posting was
 * fetched, the text is complete by construction and only needs to be non-empty.
 * Without it the text has to argue for itself.
 */
export function describeCompleteness(html: string | undefined | null, hasFullPosting = false): Completeness {
  const text = plainTextOf(html);
  const chars = text.length;
  if (chars === 0) return { complete: false, chars, reason: "empty" };
  if (hasFullPosting) return { complete: true, chars, reason: "ok" };
  if (TRUNCATION_MARK.test(text)) return { complete: false, chars, reason: "truncated" };
  if (chars < COMPLETE_MIN_CHARS) return { complete: false, chars, reason: "too-short" };
  if (!NATURAL_END.test(text)) return { complete: false, chars, reason: "unfinished" };
  return { complete: true, chars, reason: "ok" };
}

export function isComplete(html: string | undefined | null, hasFullPosting = false): boolean {
  return describeCompleteness(html, hasFullPosting).complete;
}
