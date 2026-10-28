/**
 * Arithmetic for the contractor invoice generator at /tools/contractor-invoice-generator.
 *
 * Amounts are kept in minor units (cents) while adding up, so a run of line
 * items never drifts by a cent the way repeated floating-point sums can.
 */

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type TaxMode = "none" | "rate" | "reverse";

export interface Totals {
  lines: number[];
  subtotal: number;
  tax: number;
  total: number;
}

/** Currencies with no minor unit in everyday invoicing. */
const ZERO_DECIMAL = new Set(["JPY", "KRW", "VND", "CLP", "ISK", "UGX"]);
export const decimalsFor = (currency: string) => (ZERO_DECIMAL.has(currency) ? 0 : 2);

export function totals(items: LineItem[], mode: TaxMode, ratePct: number, currency: string): Totals {
  const scale = 10 ** decimalsFor(currency);
  const lines = items.map((i) => Math.round((Number.isFinite(i.quantity) ? i.quantity : 0) * (Number.isFinite(i.unitPrice) ? i.unitPrice : 0) * scale));
  const subtotal = lines.reduce((a, b) => a + b, 0);
  const tax = mode === "rate" && ratePct > 0 ? Math.round((subtotal * ratePct) / 100) : 0;
  return { lines: lines.map((l) => l / scale), subtotal: subtotal / scale, tax: tax / scale, total: (subtotal + tax) / scale };
}

export function money(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, minimumFractionDigits: decimalsFor(currency), maximumFractionDigits: decimalsFor(currency) }).format(amount);
  } catch {
    return `${amount.toFixed(decimalsFor(currency))} ${currency}`;
  }
}

export const TERMS: { value: string; label: string; days: number }[] = [
  { value: "0", label: "Due on receipt", days: 0 },
  { value: "7", label: "Net 7 (7 days)", days: 7 },
  { value: "14", label: "Net 14 (14 days)", days: 14 },
  { value: "30", label: "Net 30 (30 days)", days: 30 },
  { value: "45", label: "Net 45 (45 days)", days: 45 },
  { value: "60", label: "Net 60 (60 days)", days: 60 },
];

/** Due date for an ISO issue date, as an ISO date, counted in calendar days. */
export function dueDate(issueIso: string, days: number): string {
  const d = new Date(`${issueIso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** "INV-007" becomes "INV-008"; a number with no digits gets "-2" appended. */
export function nextNumber(n: string): string {
  const m = n.match(/^(.*?)(\d+)(\D*)$/);
  if (!m) return n ? `${n}-2` : "INV-001";
  const next = String(Number(m[2]) + 1).padStart(m[2].length, "0");
  return `${m[1]}${next}${m[3]}`;
}

export const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "NZD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "INR", "PKR", "BDT", "LKR", "PHP", "IDR", "MYR", "SGD", "THB", "VND", "JPY", "KRW", "CNY", "HKD", "AED", "SAR", "ILS", "TRY", "ZAR", "NGN", "KES", "GHS", "EGP", "BRL", "MXN", "ARS", "COP", "CLP", "PEN", "UAH", "RON", "HUF"];
