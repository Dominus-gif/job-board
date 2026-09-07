import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext → Cloudflare Workers adapter config.
 *
 * Incremental (ISR) cache is intentionally left at the default so the site
 * deploys with ZERO extra Cloudflare resources (nothing to provision, no card
 * on file). Prerendered pages are served from static assets; on-demand pages
 * render per request — which is cheap here because `ANYWHERE_LIVE=false` makes
 * the data come from the bundled snapshot instead of a live ATS scrape.
 *
 * To enable a persistent ISR cache later (recommended once traffic grows):
 *   1. npx wrangler kv namespace create NEXT_INC_CACHE_KV
 *   2. add the returned id to wrangler.jsonc under `kv_namespaces`
 *   3. uncomment the two lines below
 *
 * import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
 */
export default defineCloudflareConfig({
  // incrementalCache: kvIncrementalCache,
});
