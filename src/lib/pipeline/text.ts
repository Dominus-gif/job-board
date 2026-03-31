import sanitizeHtml from "sanitize-html";

/**
 * Repair scraped text before rendering (robustness for messy ATS/feed data).
 * Fixes mis-encoded "mojibake", strips undisplayable control characters, maps
 * odd bullet/space glyphs to clean equivalents, and folds super/subscript
 * digits back to normal digits so "m²"/"H₂O"-style markup doesn't garble.
 */
// Longer/specific sequences first; the bare "â€" catch-all runs last so it
// doesn't swallow dashes/bullets/ellipses.
const MOJIBAKE: [RegExp, string][] = [
  [/â€™|â€˜/g, "’"], // curly apostrophe
  [/â€œ/g, "“"], // opening curly quote
  [/â€”|â€“/g, "—"], // em/en dash
  [/â€¢/g, "•"], // bullet
  [/â€¦/g, "…"], // ellipsis
  [/â€/g, "”"], // remaining -> closing curly quote
  [/Â /g, " "], // stray nbsp mojibake
  [/Â/g, ""], // stray Â
  [/Ã©/g, "é"], [/Ã¨/g, "è"], [/Ã¼/g, "ü"], [/Ã¶/g, "ö"], [/Ã±/g, "ñ"],
];

const SUPERSCRIPT = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const SUBSCRIPT = "₀₁₂₃₄₅₆₇₈₉";

// Built from \u escapes (ASCII source) to avoid embedding invisible chars.
const EXOTIC_SPACE = new RegExp("[\\u00A0\\u1680\\u2000-\\u200A\\u202F\\u205F\\u3000]", "g");
const ZERO_WIDTH = new RegExp("[\\u200B-\\u200D\\u2060\\uFEFF\\uFFFD]", "g");
const CONTROL = new RegExp("[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F-\\u009F]", "g");

export function repairText(input: string): string {
  if (!input) return "";
  let s = input.normalize("NFC");
  for (const [re, rep] of MOJIBAKE) s = s.replace(re, rep);
  // Fold super/subscript digits to plain digits (m² -> m2, H₂O -> H2O).
  s = s.replace(new RegExp(`[${SUPERSCRIPT}]`, "g"), (c) => String(SUPERSCRIPT.indexOf(c)));
  s = s.replace(new RegExp(`[${SUBSCRIPT}]`, "g"), (c) => String(SUBSCRIPT.indexOf(c)));
  // Normalise assorted bullet glyphs to a standard bullet.
  s = s.replace(/[▪▫◦‣∙·•]/g, "•");
  s = s.replace(EXOTIC_SPACE, " ");
  s = s.replace(ZERO_WIDTH, "");
  s = s.replace(CONTROL, "");
  return s;
}

/** Strip HTML to a lowercase plain-text haystack for keyword matching. */
export function toText(html: string): string {
  // Insert a space before every tag so words separated only by tags
  // ("...stipend</li><li>Health...") don't get glued together on strip.
  const spaced = repairText(html).replace(/</g, " <");
  const text = sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} });
  return text.replace(/\s+/g, " ").toLowerCase().trim();
}

/** Sanitize a description's HTML for safe rendering (spec: "sanitized HTML body"). */
// ATS-vendor "about us" boilerplate a scraper can grab instead of the real job
// description (e.g. Greenhouse's mission text on an unrelated company's posting).
const VENDOR_BOILERPLATE = /mission at Greenhouse|make hiring work for everyone|Greenhouse Software|Lever builds modern recruiting/i;

export function sanitizeDescription(html: string): string {
  // Reject vendor boilerplate so callers fall back to a clean generic line
  // rather than publishing the wrong company's copy.
  if (VENDOR_BOILERPLATE.test(html || "")) return "";
  const clean = sanitizeHtml(repairText(html), {
    allowedTags: [
      "p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "a", "code", "pre", "hr", "sup", "sub",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "nofollow noopener noreferrer", target: "_blank" }),
    },
  });
  // Tidy stray bullet lines the scraper left outside <ul>, and collapse long
  // runs of <br> into at most a paragraph break.
  return clean
    .replace(/(^|<br\s*\/?>)\s*•\s*/gi, "$1• ")
    .replace(/(<br\s*\/?>\s*){3,}/gi, "<br/><br/>")
    .trim();
}

/** Whole-word-ish containment: matches `needle` bounded by non-alphanumerics. */
export function containsPhrase(haystack: string, needle: string): boolean {
  const n = needle.toLowerCase().trim();
  if (!n) return false;
  // Phrases containing regex-significant chars (./+/#) are matched literally
  // with lenient boundaries so "next.js", "c#", "utc+" behave.
  const escaped = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const boundaryStart = /^[a-z0-9]/.test(n) ? "(?<![a-z0-9])" : "";
  const boundaryEnd = /[a-z0-9]$/.test(n) ? "(?![a-z0-9])" : "";
  const re = new RegExp(`${boundaryStart}${escaped}${boundaryEnd}`, "i");
  return re.test(haystack);
}

/** Return the first needle from `list` found in `haystack`, or null. */
export function firstMatch(haystack: string, list: string[]): string | null {
  for (const needle of list) {
    if (containsPhrase(haystack, needle)) return needle;
  }
  return null;
}
