import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

/**
 * OpenNext → Cloudflare Workers adapter config.
 *
 * ISR cache lives in Workers KV (binding NEXT_INC_CACHE_KV in wrangler.jsonc).
 * Without it every `revalidate` page re-rendered on each request — with ~10k job
 * records in memory that measured ~2.9s TTFB. KV serves the prerendered HTML
 * (populated at deploy) and also caches the on-demand long tail after its first
 * render.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
});
