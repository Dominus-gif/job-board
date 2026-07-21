import type { Category } from "./types";

/** All categories, in the order they appear across the UI. */
export const CATEGORIES: Category[] = [
  "Backend",
  "Frontend",
  "Fullstack",
  "Design",
  "DevOps",
  "Product",
  "Customer Support",
  "Sales & Marketing",
  "Management & Finance",
];

/** Maps a category to its URL slug used in /remote-[category]-jobs. */
export const CATEGORY_SLUGS: Record<Category, string> = {
  Backend: "backend",
  Frontend: "frontend",
  Fullstack: "fullstack",
  Design: "design",
  DevOps: "devops",
  Product: "product",
  "Customer Support": "customer-support",
  "Sales & Marketing": "sales-marketing",
  "Management & Finance": "management-finance",
};

export const SLUG_TO_CATEGORY: Record<string, Category> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([cat, slug]) => [slug, cat as Category])
) as Record<string, Category>;

export function categoryToSlug(category: Category): string {
  return CATEGORY_SLUGS[category];
}

export function slugToCategory(slug: string): Category | null {
  return SLUG_TO_CATEGORY[slug] ?? null;
}

export const CATEGORY_INTRO: Record<Category, string> = {
  Backend:
    "Truly location-independent backend engineering roles — APIs, databases, and distributed systems you can build from any timezone on earth.",
  Frontend:
    "Work-from-anywhere frontend jobs building web interfaces in React, Vue, and beyond — no country or timezone requirement, ever.",
  Fullstack:
    "Global-remote fullstack roles spanning the whole product surface, open to candidates anywhere in the world.",
  Design:
    "Fully remote product, UX, and visual design roles with zero location restriction. Design from a beach or a mountain — your call.",
  DevOps:
    "Location-independent DevOps, SRE, and platform engineering jobs. Keep systems running from anywhere on the planet.",
  Product:
    "Work-from-anywhere product management roles at companies that hire globally with no timezone overlap requirement.",
  "Customer Support":
    "Remote customer support jobs open worldwide — help customers from wherever you happen to be.",
  "Sales & Marketing":
    "Global-remote sales and marketing roles with no location restriction. Grow revenue from any corner of the world.",
  "Management & Finance":
    "Truly remote management, operations, and finance roles open to candidates anywhere in the world.",
};
