/**
 * Price levels for the purchasing-power and offer-comparison tools.
 *
 * Source: World Bank World Development Indicators, downloaded September 2026.
 *   ppp = PA.NUS.PRVT.PP, PPP conversion factor for private consumption
 *         (local currency units per international dollar)
 *   fx  = PA.NUS.FCRF, official exchange rate (local currency units per US
 *         dollar, period average)
 * Both figures come from the same year for each country. The ratio ppp / fx is
 * the price level relative to the United States (1.0): roughly what the same
 * household spending costs there, in dollars, compared with the US. Recent
 * years are World Bank extrapolations from the International Comparison
 * Program benchmark.
 *
 * The list is a curated set of countries remote workers commonly live in, kept
 * only where both figures exist for the same recent year.
 */

export interface PriceLevel {
  iso: string;
  name: string;
  currency: string;
  year: number;
  ppp: number;
  fx: number;
}

export const PRICE_LEVELS: PriceLevel[] = [
  { iso: "ARM", name: "Armenia", currency: "AMD", year: 2025, ppp: 158.53, fx: 387.01 },
  { iso: "AUS", name: "Australia", currency: "AUD", year: 2025, ppp: 1.4646, fx: 1.552 },
  { iso: "AUT", name: "Austria", currency: "EUR", year: 2025, ppp: 0.75035, fx: 0.884969 },
  { iso: "BGD", name: "Bangladesh", currency: "BDT", year: 2025, ppp: 34.941, fx: 121.921 },
  { iso: "BEL", name: "Belgium", currency: "EUR", year: 2025, ppp: 0.77176, fx: 0.884969 },
  { iso: "BRA", name: "Brazil", currency: "BRL", year: 2025, ppp: 2.5815, fx: 5.58729 },
  { iso: "BGR", name: "Bulgaria", currency: "BGN", year: 2025, ppp: 0.41462, fx: 1.73519 },
  { iso: "CAN", name: "Canada", currency: "CAD", year: 2025, ppp: 1.2605, fx: 1.39811 },
  { iso: "CHL", name: "Chile", currency: "CLP", year: 2025, ppp: 486.88, fx: 951.329 },
  { iso: "CHN", name: "China", currency: "CNY", year: 2025, ppp: 3.4596, fx: 7.18985 },
  { iso: "COL", name: "Colombia", currency: "COP", year: 2025, ppp: 1665.6, fx: 4053.14 },
  { iso: "CRI", name: "Costa Rica", currency: "CRC", year: 2025, ppp: 314.54, fx: 503.497 },
  { iso: "HRV", name: "Croatia", currency: "EUR", year: 2025, ppp: 0.52078, fx: 0.884969 },
  { iso: "CYP", name: "Cyprus", currency: "EUR", year: 2025, ppp: 0.59225, fx: 0.884969 },
  { iso: "CZE", name: "Czechia", currency: "CZK", year: 2025, ppp: 14.658, fx: 21.882 },
  { iso: "DNK", name: "Denmark", currency: "DKK", year: 2025, ppp: 6.9217, fx: 6.62183 },
  { iso: "EGY", name: "Egypt", currency: "EGP", year: 2025, ppp: 7.7218, fx: 49.2278 },
  { iso: "EST", name: "Estonia", currency: "EUR", year: 2025, ppp: 0.67174, fx: 0.884969 },
  { iso: "FIN", name: "Finland", currency: "EUR", year: 2025, ppp: 0.80201, fx: 0.884969 },
  { iso: "FRA", name: "France", currency: "EUR", year: 2025, ppp: 0.7325, fx: 0.884969 },
  { iso: "GEO", name: "Georgia", currency: "GEL", year: 2025, ppp: 1.0875, fx: 2.74264 },
  { iso: "DEU", name: "Germany", currency: "EUR", year: 2025, ppp: 0.71888, fx: 0.884969 },
  { iso: "GHA", name: "Ghana", currency: "GHS", year: 2025, ppp: 5.25, fx: 12.5568 },
  { iso: "GRC", name: "Greece", currency: "EUR", year: 2025, ppp: 0.58005, fx: 0.884969 },
  { iso: "HKG", name: "Hong Kong", currency: "HKD", year: 2025, ppp: 5.7676, fx: 7.79708 },
  { iso: "HUN", name: "Hungary", currency: "HUF", year: 2025, ppp: 204.54, fx: 353.14 },
  { iso: "IND", name: "India", currency: "INR", year: 2025, ppp: 19.839, fx: 87.1584 },
  { iso: "IDN", name: "Indonesia", currency: "IDR", year: 2025, ppp: 5066, fx: 16477.9 },
  { iso: "IRL", name: "Ireland", currency: "EUR", year: 2025, ppp: 0.90396, fx: 0.884969 },
  { iso: "ISR", name: "Israel", currency: "ILS", year: 2025, ppp: 3.6558, fx: 3.45189 },
  { iso: "ITA", name: "Italy", currency: "EUR", year: 2025, ppp: 0.64482, fx: 0.884969 },
  { iso: "JPN", name: "Japan", currency: "JPY", year: 2025, ppp: 103.34, fx: 149.658 },
  { iso: "KEN", name: "Kenya", currency: "KES", year: 2025, ppp: 44.984, fx: 129.303 },
  { iso: "LVA", name: "Latvia", currency: "EUR", year: 2025, ppp: 0.55212, fx: 0.884969 },
  { iso: "LTU", name: "Lithuania", currency: "EUR", year: 2025, ppp: 0.54962, fx: 0.884969 },
  { iso: "LUX", name: "Luxembourg", currency: "EUR", year: 2025, ppp: 0.873, fx: 0.884969 },
  { iso: "MYS", name: "Malaysia", currency: "MYR", year: 2025, ppp: 1.4306, fx: 4.28442 },
  { iso: "MLT", name: "Malta", currency: "EUR", year: 2025, ppp: 0.61036, fx: 0.884969 },
  { iso: "MEX", name: "Mexico", currency: "MXN", year: 2025, ppp: 11.309, fx: 19.2375 },
  { iso: "MAR", name: "Morocco", currency: "MAD", year: 2025, ppp: 3.9596, fx: 9.35028 },
  { iso: "NPL", name: "Nepal", currency: "NPR", year: 2025, ppp: 35.27, fx: 139.115 },
  { iso: "NLD", name: "Netherlands", currency: "EUR", year: 2025, ppp: 0.76734, fx: 0.884969 },
  { iso: "NZL", name: "New Zealand", currency: "NZD", year: 2025, ppp: 1.5291, fx: 1.72011 },
  { iso: "NGA", name: "Nigeria", currency: "NGN", year: 2025, ppp: 318.06, fx: 1518.38 },
  { iso: "NOR", name: "Norway", currency: "NOK", year: 2025, ppp: 10.001, fx: 10.3958 },
  { iso: "PAK", name: "Pakistan", currency: "PKR", year: 2025, ppp: 65.396, fx: 281.143 },
  { iso: "PER", name: "Peru", currency: "PEN", year: 2025, ppp: 1.927, fx: 3.56706 },
  { iso: "PHL", name: "Philippines", currency: "PHP", year: 2025, ppp: 20.534, fx: 57.5051 },
  { iso: "POL", name: "Poland", currency: "PLN", year: 2025, ppp: 2.0632, fx: 3.76054 },
  { iso: "PRT", name: "Portugal", currency: "EUR", year: 2025, ppp: 0.57471, fx: 0.884969 },
  { iso: "ROU", name: "Romania", currency: "RON", year: 2025, ppp: 2.1805, fx: 4.47053 },
  { iso: "SAU", name: "Saudi Arabia", currency: "SAR", year: 2025, ppp: 1.8711, fx: 3.75 },
  { iso: "SRB", name: "Serbia", currency: "RSD", year: 2025, ppp: 52.93, fx: 103.975 },
  { iso: "SGP", name: "Singapore", currency: "SGD", year: 2025, ppp: 1.0238, fx: 1.30745 },
  { iso: "SVK", name: "Slovakia", currency: "EUR", year: 2025, ppp: 0.56575, fx: 0.884969 },
  { iso: "SVN", name: "Slovenia", currency: "EUR", year: 2025, ppp: 0.5928, fx: 0.884969 },
  { iso: "ZAF", name: "South Africa", currency: "ZAR", year: 2025, ppp: 7.74, fx: 17.8887 },
  { iso: "KOR", name: "South Korea", currency: "KRW", year: 2025, ppp: 880.13, fx: 1422.44 },
  { iso: "ESP", name: "Spain", currency: "EUR", year: 2025, ppp: 0.60786, fx: 0.884969 },
  { iso: "LKA", name: "Sri Lanka", currency: "LKR", year: 2023, ppp: 90.458, fx: 327.507 },
  { iso: "SWE", name: "Sweden", currency: "SEK", year: 2025, ppp: 8.889, fx: 9.82071 },
  { iso: "CHE", name: "Switzerland", currency: "CHF", year: 2025, ppp: 1.0655, fx: 0.831356 },
  { iso: "THA", name: "Thailand", currency: "THB", year: 2025, ppp: 10.606, fx: 32.8828 },
  { iso: "TUR", name: "Türkiye", currency: "TRY", year: 2025, ppp: 17.744, fx: 39.4548 },
  { iso: "UKR", name: "Ukraine", currency: "UAH", year: 2025, ppp: 11.865, fx: 41.6891 },
  { iso: "ARE", name: "United Arab Emirates", currency: "AED", year: 2025, ppp: 2.527, fx: 3.6725 },
  { iso: "GBR", name: "United Kingdom", currency: "GBP", year: 2025, ppp: 0.70153, fx: 0.759474 },
  { iso: "USA", name: "United States", currency: "USD", year: 2025, ppp: 1, fx: 1 },
  { iso: "URY", name: "Uruguay", currency: "UYU", year: 2025, ppp: 29.855, fx: 41.191 },
  { iso: "VNM", name: "Vietnam", currency: "VND", year: 2024, ppp: 7160.7, fx: 24164.9 },
];

export const PRICE_SOURCE = "World Bank, World Development Indicators (PA.NUS.PRVT.PP and PA.NUS.FCRF)";

export function priceLevel(c: PriceLevel): number {
  return c.ppp / c.fx;
}

export function countryByIso(iso: string): PriceLevel | undefined {
  return PRICE_LEVELS.find((c) => c.iso === iso);
}

/** Units of each currency per US dollar, from the same data (the euro via Germany). */
export const FX_PER_USD: Record<string, number> = (() => {
  const out: Record<string, number> = { USD: 1 };
  const prefer: Record<string, string> = { EUR: "DEU" };
  for (const c of PRICE_LEVELS) {
    if (prefer[c.currency] && prefer[c.currency] !== c.iso) continue;
    out[c.currency] = c.fx;
  }
  return out;
})();

export const CURRENCIES: string[] = Object.keys(FX_PER_USD).sort((a, b) =>
  a === "USD" ? -1 : b === "USD" ? 1 : a.localeCompare(b),
);

/**
 * Keep purchasing power equal: an amount paid in `currency` and spent in
 * `liveIn` is worth `eqUsd` (or `eqLocal` in local money) when spent in
 * `compareTo`.
 */
export function equivalent(amount: number, currency: string, liveIn: PriceLevel, compareTo: PriceLevel) {
  const usd = amount / (FX_PER_USD[currency] ?? 1);
  const ratio = priceLevel(compareTo) / priceLevel(liveIn);
  const eqUsd = usd * ratio;
  return { usd, ratio, eqUsd, eqLocal: eqUsd * compareTo.fx };
}

/** International dollars: spending power normalised to US prices. */
export function internationalDollars(amount: number, currency: string, liveIn: PriceLevel): number {
  const usd = amount / (FX_PER_USD[currency] ?? 1);
  return usd / priceLevel(liveIn);
}

export function formatMoney(n: number, currency: string, compact = false): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      notation: compact ? "compact" : "standard",
    }).format(n);
  } catch {
    return `${Math.round(n).toLocaleString("en-US")} ${currency}`;
  }
}
