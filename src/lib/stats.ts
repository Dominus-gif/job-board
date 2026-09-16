/** Small statistics helpers shared by server data code and client charts. */

export interface Bin {
  from: number;
  to: number;
  count: number;
}

/**
 * Equal-width bins. Without explicit bounds the range runs from the 2nd to the
 * 98th percentile so a few extreme values don't flatten the chart; values
 * outside it are clamped into the end bins. `step` rounds the edges.
 */
export function binValues(values: number[], count: number, lo?: number, hi?: number, step?: number): Bin[] {
  if (!values.length) return [];
  const sorted = [...values].sort((a, b) => a - b);
  let min = lo ?? sorted[Math.floor(sorted.length * 0.02)];
  let max = hi ?? sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * 0.98) - 1)];
  if (step) {
    min = Math.floor(min / step) * step;
    max = Math.ceil(max / step) * step;
  }
  if (max <= min) max = min + (step ?? 1);
  let width = (max - min) / count;
  if (step) width = Math.max(step, Math.ceil(width / step) * step);
  const n = Math.max(1, Math.ceil((max - min) / width));
  const bins: Bin[] = Array.from({ length: n }, (_, i) => ({ from: min + i * width, to: min + (i + 1) * width, count: 0 }));
  for (const v of values) {
    const i = Math.max(0, Math.min(n - 1, Math.floor((v - min) / width)));
    bins[i].count++;
  }
  return bins;
}

/** Share of a sorted array strictly below `value`, as a whole percentage. */
export function percentileRank(sorted: number[], value: number): number {
  if (!sorted.length) return 0;
  let below = 0;
  for (const v of sorted) {
    if (v < value) below++;
    else break;
  }
  return Math.round((below / sorted.length) * 100);
}

/** Linear-interpolated quantile of a sorted array, rounded. */
export function quantile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = (sorted.length - 1) * p;
  const a = Math.floor(idx);
  const b = Math.ceil(idx);
  return Math.round(sorted[a] + (sorted[b] - sorted[a]) * (idx - a));
}

/** "$120k" / "$950" — compact money for inline figures. */
export function compactMoney(n: number, currency = "USD"): string {
  const sym = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : "";
  if (n >= 1000) return `${sym}${Math.round(n / 1000)}k`;
  return `${sym}${Math.round(n)}`;
}
