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

/**
 * The employer's headings, re-levelled to sit under the job page's own.
 *
 * A description renders below the page's h1 (the job title) and its "About
 * this role" h2. Employers head their own sections with anything from h1 down,
 * so pages ended up with three or four h1s, one of them often the job title a
 * second time. Headings are shifted by the description's own top level, so a
 * post using h1 and h2 becomes h3 and h4, and each is also held to one level
 * below the heading before it. That second rule is for posts that open on a
 * lower level than they use later ("<h2>Join us</h2> … <h1>About us</h1>"),
 * which a shift alone would have started at h4, skipping h3.
 *
 * sanitize-html calls the transforms in document order, which is what lets
 * the previous level be carried from one heading to the next.
 */
const FIRST_LEVEL = 3;

function headingTransforms(html: string): Record<string, sanitizeHtml.Transformer> {
  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]));
  if (!levels.length) return {};
  const shift = FIRST_LEVEL - Math.min(...levels);
  let previous = FIRST_LEVEL - 1; // the page's own "About this role" h2
  const to = (level: number): sanitizeHtml.Transformer => () => {
    const next = Math.min(6, Math.max(FIRST_LEVEL, Math.min(level + shift, previous + 1)));
    previous = next;
    return { tagName: `h${next}`, attribs: {} };
  };
  return Object.fromEntries([1, 2, 3, 4, 5, 6].map((level) => [`h${level}`, to(level)]));
}

export function sanitizeDescription(html: string): string {
  // Reject vendor boilerplate so callers fall back to a clean generic line
  // rather than publishing the wrong company's copy.
  if (VENDOR_BOILERPLATE.test(html || "")) return "";
  const repaired = repairText(html);
  const clean = sanitizeHtml(repaired, {
    allowedTags: [
      "p", "br", "b", "strong", "i", "em", "u", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "a", "code", "pre", "hr", "sup", "sub",
    ],
    allowedAttributes: { a: ["href", "target", "rel"] },
    transformTags: {
      ...headingTransforms(repaired),
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

export { containsPhrase, firstMatch } from "./phrase";
