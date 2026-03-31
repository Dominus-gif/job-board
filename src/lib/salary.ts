import type { Salary } from "./types";

const CURRENCY_SYMBOLS: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "$", AUD: "$" };

/** Format a Salary for display: "$119,900 - $193,200 USD" or "". */
export function formatSalary(salary: Salary): string {
  if (salary.min == null || salary.max == null) return "";
  const sym = CURRENCY_SYMBOLS[salary.currency] ?? "$";
  const fmt = (n: number) => `${sym}${n.toLocaleString("en-US")}`;
  return `${fmt(salary.min)} - ${fmt(salary.max)} ${salary.currency}`;
}

/**
 * Salary brackets for color-coding (Good / Medium / High).
 *
 * We classify on the annual midpoint, converted to a rough USD-equivalent so
 * EUR/GBP roles land in sensible buckets. Thresholds are deliberate, round
 * numbers tuned for global-remote software/design/ops pay.
 */
export type SalaryTier = "good" | "medium" | "high";

const FX_TO_USD: Record<string, number> = { USD: 1, EUR: 1.08, GBP: 1.27, INR: 0.012, CAD: 0.73, AUD: 0.66 };

const HIGH_MIN = 150_000; // USD-equivalent midpoint
const MEDIUM_MIN = 90_000;

export interface SalaryTierInfo {
  tier: SalaryTier;
  label: string;
  /** Shape+text indicator (colour-blind safe): "$" / "$$" / "$$$". */
  glyph: string;
  /** Number of filled segments (of 3) for a small bar meter. */
  segments: number;
  /** Plain-language tooltip explaining the rating. */
  hint: string;
  /** Text color for the salary value. */
  text: string;
  /** Chip/badge background + ring, e.g. on a JobCard. */
  chip: string;
  /** Small tier dot color. */
  dot: string;
}

const TIERS: Record<SalaryTier, SalaryTierInfo> = {
  high: {
    tier: "high",
    label: "High",
    glyph: "$$$",
    segments: 3,
    hint: "High pay — midpoint of $150k+ (USD-equivalent).",
    text: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
  medium: {
    tier: "medium",
    label: "Mid",
    glyph: "$$",
    segments: 2,
    hint: "Mid pay — midpoint of $90k–$150k (USD-equivalent).",
    text: "text-brand-700",
    chip: "bg-brand-50 text-brand-700",
    dot: "bg-brand-500",
  },
  good: {
    tier: "good",
    label: "Entry",
    glyph: "$",
    segments: 1,
    hint: "Entry pay — midpoint under $90k (USD-equivalent).",
    text: "text-amber-700",
    chip: "bg-amber-50 text-amber-800",
    dot: "bg-amber-500",
  },
};

/** Midpoint of a salary in USD-equivalent, or null when no range is known. */
export function salaryMidpointUsd(salary: Salary): number | null {
  if (salary.min == null && salary.max == null) return null;
  const fx = FX_TO_USD[salary.currency] ?? 1;
  const min = salary.min ?? salary.max!;
  const max = salary.max ?? salary.min!;
  return ((min + max) / 2) * fx;
}

/** Classify a salary into a tier, or null when there's no salary data. */
export function salaryTier(salary: Salary): SalaryTierInfo | null {
  const mid = salaryMidpointUsd(salary);
  if (mid == null) return null;
  if (mid >= HIGH_MIN) return TIERS.high;
  if (mid >= MEDIUM_MIN) return TIERS.medium;
  return TIERS.good;
}

/** Salary-range filter presets used by the client filter bar. */
export interface SalaryBand {
  id: string;
  label: string;
  min: number; // USD-equivalent midpoint floor
}
export const SALARY_BANDS: SalaryBand[] = [
  { id: "any", label: "Any salary", min: 0 },
  { id: "50k", label: "$50k+", min: 50_000 },
  { id: "80k", label: "$80k+", min: 80_000 },
  { id: "100k", label: "$100k+", min: 100_000 },
  { id: "150k", label: "$150k+", min: 150_000 },
  { id: "200k", label: "$200k+", min: 200_000 },
];
