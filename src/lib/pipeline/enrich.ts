import type { Benefit, Category, RawJob, Salary } from "../types";
import { BENEFIT_RULES, CATEGORY_KEYWORDS, SKILL_DICTIONARY } from "./dictionaries";
import { containsPhrase, toText } from "./text";

/** Stage C — derive skills by keyword-matching the description (spec 3C). */
export function extractSkills(title: string, descText: string): string[] {
  const haystack = `${title.toLowerCase()} ${descText}`;
  const found: string[] = [];
  for (const [tag, aliases] of Object.entries(SKILL_DICTIONARY)) {
    if (aliases.some((alias) => containsPhrase(haystack, alias))) found.push(tag);
  }
  return found;
}

/** Stage C — classify category from title (weighted) + description. */
export function classifyCategory(title: string, descText: string): Category {
  const titleText = ` ${title.toLowerCase()} `;
  const scores = new Map<Category, number>();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [Category, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (containsPhrase(titleText, kw)) score += 5; // title is a strong signal
      if (containsPhrase(descText, kw)) score += 1;
    }
    if (score > 0) scores.set(category, score);
  }

  if (scores.size === 0) return "Product"; // neutral default
  return [...scores.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

/** Stage C — map benefit phrases to badges. */
export function extractBenefits(descText: string): Benefit[] {
  const out: Benefit[] = [];
  for (const rule of BENEFIT_RULES) {
    if (rule.keywords.some((kw) => containsPhrase(descText, kw))) {
      out.push({ slug: rule.slug, label: rule.label, emoji: rule.emoji });
    }
  }
  return out;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  "$": "USD",
  "€": "EUR",
  "£": "GBP",
  "₹": "INR",
};

/**
 * Stage C — parse a salary range from free text, e.g.
 *   "$119,900.00 to $193,200.00"  ->  { min: 119900, max: 193200, USD }
 *   "€80k – €110k"                ->  { min: 80000, max: 110000, EUR }
 * Picks the first plausible range in the text ("primary market line").
 */
export function parseSalary(descText: string): Salary {
  const empty: Salary = { min: null, max: null, currency: "USD" };

  // Range: <sym?>NUM <sep> <sym?>NUM  with optional k/K and thousands separators.
  const rangeRe =
    /([$€£₹])?\s*([0-9][0-9.,]*)\s*(k)?\s*(?:-|–|—|to)\s*([$€£₹])?\s*([0-9][0-9.,]*)\s*(k)?/i;
  const m = descText.match(rangeRe);
  if (!m) return empty;

  const hasSymbol = Boolean(m[1] || m[4]);
  const hasK = Boolean(m[3] || m[6]);
  const symbol = m[1] || m[4] || "$";
  const currency = CURRENCY_SYMBOLS[symbol] || "USD";
  const min = normalizeAmount(m[2], m[3]);
  const max = normalizeAmount(m[5], m[6]);
  if (min === null || max === null || max < min) return empty;
  // Guard against non-salary ranges ("2019-2024", "1-3 years"): a small
  // unmarked range with no currency symbol or k-suffix is not compensation.
  if (!hasSymbol && !hasK && max < 10000) return empty;
  if (max < 1000) return empty;

  return { min, max, currency };
}

function normalizeAmount(numStr: string, kFlag?: string): number | null {
  let n = Number(numStr.replace(/,/g, ""));
  if (Number.isNaN(n)) return null;
  if (kFlag) n *= 1000;
  return Math.round(n);
}

/** Bundle: run all Stage-C enrichers over a raw job. */
export function enrich(job: RawJob) {
  const descText = toText(job.description_html || "");
  return {
    skills: extractSkills(job.title, descText),
    category: classifyCategory(job.title, descText),
    benefits: extractBenefits(descText),
    salary: job.salary_raw ? parseSalary(job.salary_raw.toLowerCase()) : parseSalary(descText),
  };
}

/** Re-exported from the dependency-light salary module (client-safe). */
export { formatSalary } from "../salary";
