/** Global site configuration used across metadata, RSS, sitemap and JSON-LD. */
export const SITE = {
  name: "getremotejobsnow.com",
  tagline: "The only job board where every job is truly location-independent.",
  description:
    "Browse remote jobs you can do from anywhere — location-independent roles with no country, region, or timezone limits. Fresh listings, updated daily.",
  get url() {
    // Explicit override wins; otherwise auto-detect the Vercel URL so canonical
    // links, sitemap, RSS and JSON-LD are correct without any manual config.
    const explicit = process.env.NEXT_PUBLIC_SITE_URL;
    const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
    const url = explicit || (vercel ? `https://${vercel}` : "http://localhost:3000");
    return url.replace(/\/$/, "");
  },
};

export function abs(path: string): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Feature flags. Temporarily disabled sections — flip back to `true` to
 * re-enable. When off: their pages 404, nav/footer links are hidden, and the
 * email-capture (newsletter) fields are removed everywhere.
 */
export const FEATURES = {
  newsletter: false,
  advertise: false,
};

/**
 * Supabase-backed role subscriptions (email + chosen job categories).
 *
 *   NEXT_PUBLIC_SUPABASE_URL      — project URL, e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY     — service-role key (server-only, never exposed)
 *
 * The subscribe widget renders whenever a project URL is present; writes go
 * through the `subscribe_category` Postgres RPC (see supabase/schema.sql), which
 * upserts one row per email and merges newly-chosen roles while keeping the full
 * subscription history.
 */
export const SUPABASE = {
  url: (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, ""),
  serviceKey: (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim(),
  /** Public: show the widget once a project URL is configured. */
  get enabled(): boolean {
    return /^https?:\/\//.test(this.url);
  },
  /** Server-only: are we actually able to write? */
  get ready(): boolean {
    return this.enabled && this.serviceKey.length > 0;
  },
};

/**
 * Google AdSense configuration. Set NEXT_PUBLIC_ADSENSE_CLIENT to your
 * publisher id (e.g. "ca-pub-1234567890123456") to switch ads on everywhere:
 * the loader script, the account meta tag, ads.txt, and every <AdSlot>.
 * When unset, the site behaves exactly as before (no ad code emitted).
 */
export const ADSENSE = {
  client: (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "").trim(),
  /** Default responsive ad-unit id, used by <AdSlot> when none is passed. */
  defaultSlot: (process.env.NEXT_PUBLIC_ADSENSE_SLOT || "").trim(),
  /** In-feed (native) ad-unit id, used by <InFeedAd> between listings. */
  inFeedSlot: (process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT || "").trim(),
  get enabled(): boolean {
    return /^ca-pub-\d+$/.test(this.client);
  },
  /** ads.txt uses the "pub-…" form (without the "ca-" prefix). */
  get pub(): string {
    return this.client.replace(/^ca-/, "");
  },
};
