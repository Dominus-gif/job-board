/**
 * Company logo resolution (spec section 2 — `company_logo`).
 *
 * We build an ordered list of logo *candidates* and try them one by one at the
 * image layer (see components/CompanyLogo). Clearbit alone was unreliable, so
 * the chain is: any feed-supplied logo → Logo.dev/unavatar (good quality) →
 * Google favicon (very reliable) → a generated initial badge that always works.
 */

/** Turn a company name into a best-guess domain (e.g. "GitLab" -> "gitlab.com"). */
export function guessDomain(name: string): string | undefined {
  const base = name
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|gmbh|labs|foundation|technologies|technology|software|the)\b/g, "")
    .replace(/[^a-z0-9]/g, "");
  return base ? `${base}.com` : undefined;
}

/** Ordered list of logo URLs to try for a company. Last resort is the placeholder. */
export function logoCandidates(opts: { domain?: string; name: string; provided?: string }): string[] {
  const { name, provided } = opts;
  const domain = opts.domain || guessDomain(name);
  const list: string[] = [];
  if (provided && /^https?:\/\//.test(provided)) list.push(provided);
  if (domain) {
    const d = encodeURIComponent(domain);
    // True HQ vector/raster brand logos when a Logo.dev token is configured
    // (free tier at logo.dev). Best quality; optional.
    const token = process.env.NEXT_PUBLIC_LOGO_TOKEN;
    if (token) list.push(`https://img.logo.dev/${d}?token=${token}&size=256&format=png&retina=true`);
    // Google's favicon service at 256 returns the largest native icon a site
    // has (often 180–256px) — the crispest keyless source.
    list.push(`https://www.google.com/s2/favicons?domain=${d}&sz=256`);
    // unavatar aggregates logo providers/favicons; clean 404 on unknown.
    list.push(`https://unavatar.io/${d}?fallback=false`);
  }
  return Array.from(new Set(list));
}

/** Primary logo URL for a company (first candidate, or the placeholder). */
export function resolveLogo(opts: { domain?: string; name: string; provided?: string }): string {
  return logoCandidates(opts)[0] || placeholderLogo(opts.name);
}

/** A deterministic data-URI placeholder: colored square with the initial. */
export function placeholderLogo(name: string): string {
  const initial = (name.trim()[0] || "?").toUpperCase();
  const hue = [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="16" fill="hsl(${hue} 70% 45%)"/><text x="50%" y="54%" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${initial}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
