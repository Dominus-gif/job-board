/**
 * Company logo resolution (spec section 2 — `company_logo`).
 * Order: explicit domain -> Clearbit -> Google favicon -> placeholder.
 * Returns a URL only; fetching/caching is left to the image layer.
 */
export function resolveLogo(opts: { domain?: string; name: string }): string {
  const { domain, name } = opts;
  if (domain) return `https://logo.clearbit.com/${domain}`;
  return placeholderLogo(name);
}

/** A deterministic data-URI placeholder: colored square with the initial. */
export function placeholderLogo(name: string): string {
  const initial = (name.trim()[0] || "?").toUpperCase();
  const hue = [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" rx="16" fill="hsl(${hue} 70% 45%)"/><text x="50%" y="54%" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle">${initial}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
