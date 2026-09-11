import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

/**
 * OpenNext → Cloudflare Workers adapter config.
 *
 * ISR cache lives in Workers KV (binding NEXT_INC_CACHE_KV in wrangler.jsonc).
 * Without it every `revalidate` page re-rendered on each request — with ~10k job
 * records in memory that measured ~2.9s TTFB. KV serves the prerendered HTML
 * (populated at deploy) and also caches the on-demand long tail after its first
 * render.
 *
 * KV alone still costs a cross-region lookup per request: measured against the
 * live site, HTML consistently returned ~0.85-1.7s later than a static asset
 * fetched from the same edge, and the response carried no cf-cache-status at all
 * — a Worker response never enters Cloudflare's CDN cache on its own.
 *
 * withRegionalCache puts the Cache API in front of KV at each edge location, so
 * a repeat request in the same region is answered locally instead of going back
 * to KV. "long-lived" suits this board: pages carry revalidate = 1800 and the
 * listings themselves only change when the nightly rebuild redeploys, so serving
 * a regionally cached copy cannot surface anything staler than the ISR window
 * already allows.
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: "long-lived" }),
});
