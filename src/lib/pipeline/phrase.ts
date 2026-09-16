/**
 * Phrase matching shared by the ingest filter and the in-browser tools.
 *
 * Kept free of dependencies so client components can import it without pulling
 * in the HTML sanitiser that the rest of text.ts needs.
 */

function phraseRegex(needle: string, flags = "i"): RegExp | null {
  const n = needle.toLowerCase().trim();
  if (!n) return null;
  // Phrases containing regex-significant chars (./+/#) are matched literally
  // with lenient boundaries so "next.js", "c#", "utc+" behave.
  const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryStart = /^[a-z0-9]/.test(n) ? "(?<![a-z0-9])" : "";
  const boundaryEnd = /[a-z0-9]$/.test(n) ? "(?![a-z0-9])" : "";
  return new RegExp(`${boundaryStart}${escaped}${boundaryEnd}`, flags);
}

/** Whole-word-ish containment: matches `needle` bounded by non-alphanumerics. */
export function containsPhrase(haystack: string, needle: string): boolean {
  const re = phraseRegex(needle);
  return re ? re.test(haystack) : false;
}

/** Return the first needle from `list` found in `haystack`, or null. */
export function firstMatch(haystack: string, list: string[]): string | null {
  for (const needle of list) {
    if (containsPhrase(haystack, needle)) return needle;
  }
  return null;
}

/** Every occurrence of `needle` in `haystack`, as [start, end) offsets. */
export function findPhrase(haystack: string, needle: string): [number, number][] {
  const re = phraseRegex(needle, "gi");
  if (!re) return [];
  const out: [number, number][] = [];
  for (const m of haystack.matchAll(re)) out.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
  return out;
}
