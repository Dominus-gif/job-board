/** Slug helpers (spec section 2 — `id`/`slug` format). */

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/**
 * Build a job slug like `senior-backend-engineer-acme-4487`.
 * `seed` makes the suffix deterministic (required so a live ATS job keeps a
 * STABLE url across re-fetches — otherwise its detail page + liveness break).
 */
export function jobSlug(title: string, company: string, seed?: number): string {
  const suffix = seed ?? Math.floor(1000 + Math.random() * 9000);
  return `${slugify(title)}-${slugify(company)}-${suffix}`;
}

/** Deterministic 4-digit-ish suffix derived from a stable id (e.g. external_id). */
export function stableSuffix(id: string): number {
  let h = 5381;
  for (let i = 0; i < id.length; i++) h = ((h << 5) + h + id.charCodeAt(i)) >>> 0;
  return 1000 + (h % 9000);
}
