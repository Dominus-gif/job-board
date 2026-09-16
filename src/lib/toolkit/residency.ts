/**
 * Day counting behind /tools/tax-residency-day-counter.
 *
 * Counting is deliberately literal: a stay from 1 to 3 March is three days when
 * both travel days count. Countries use different conventions, so the caller
 * chooses whether arrival and departure days count. Where two trips overlap on
 * the same date and country, the date is counted once.
 */

export interface Trip {
  id: string;
  country: string;
  /** ISO dates, yyyy-mm-dd, inclusive. */
  from: string;
  to: string;
}

export interface CountOptions {
  countArrival: boolean;
  countDeparture: boolean;
  threshold: number;
}

export interface CountryTotals {
  country: string;
  byYear: Record<number, number>;
  /** Highest number of days inside any 365-day window. */
  maxRolling: number;
  /** First day (ISO) of that busiest 365-day window. */
  maxRollingFrom: string | null;
  total: number;
  overThreshold: boolean;
}

const DAY = 86_400_000;

export function parseDay(iso: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const t = Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  return Number.isNaN(t) ? null : Math.round(t / DAY);
}

export function isoOf(day: number): string {
  return new Date(day * DAY).toISOString().slice(0, 10);
}

/** The days a single trip contributes, as UTC day numbers. */
export function tripDays(trip: Trip, opts: Pick<CountOptions, "countArrival" | "countDeparture">): number[] {
  const a = parseDay(trip.from);
  const b = parseDay(trip.to);
  if (a == null || b == null || b < a) return [];
  const start = opts.countArrival ? a : a + 1;
  const end = opts.countDeparture ? b : b - 1;
  // A same-day visit still counts once if either end is counted.
  if (a === b) return opts.countArrival || opts.countDeparture ? [a] : [];
  const out: number[] = [];
  for (let d = start; d <= end; d++) out.push(d);
  return out;
}

export function countDays(trips: Trip[], opts: CountOptions): CountryTotals[] {
  const byCountry = new Map<string, Set<number>>();
  for (const t of trips) {
    const name = t.country.trim();
    if (!name) continue;
    const set = byCountry.get(name) ?? new Set<number>();
    for (const d of tripDays(t, opts)) set.add(d);
    byCountry.set(name, set);
  }

  const out: CountryTotals[] = [];
  for (const [country, set] of byCountry) {
    const days = [...set].sort((x, y) => x - y);
    const byYear: Record<number, number> = {};
    for (const d of days) {
      const y = new Date(d * DAY).getUTCFullYear();
      byYear[y] = (byYear[y] ?? 0) + 1;
    }
    // Two-pointer sweep over sorted days for the densest 365-day window.
    let best = 0;
    let bestFrom: number | null = null;
    let lo = 0;
    for (let hi = 0; hi < days.length; hi++) {
      while (days[hi] - days[lo] >= 365) lo++;
      const n = hi - lo + 1;
      if (n > best) {
        best = n;
        bestFrom = days[lo];
      }
    }
    const maxYear = Math.max(0, ...Object.values(byYear));
    out.push({
      country,
      byYear,
      maxRolling: best,
      maxRollingFrom: bestFrom == null ? null : isoOf(bestFrom),
      total: days.length,
      overThreshold: best >= opts.threshold || maxYear >= opts.threshold,
    });
  }
  return out.sort((a, b) => b.maxRolling - a.maxRolling || a.country.localeCompare(b.country));
}

/** Days until a threshold is reached in a calendar year, given days used. */
export function daysLeft(used: number, threshold: number): number {
  return Math.max(0, threshold - used);
}
