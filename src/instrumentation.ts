/**
 * Next.js instrumentation hook — runs once when the server boots. On a
 * long-running Node server it starts the background listing refresher so new
 * jobs appear automatically.
 *
 * It is skipped during the build, on the edge runtime, and on Cloudflare
 * Workers: a Worker isolate is short-lived, so a setInterval would never fire
 * reliably and any in-flight scrape would be torn down mid-request. On
 * Cloudflare the listings are served from the bundled build-time snapshot
 * (ANYWHERE_LIVE=false) and refreshed by rebuilding — see CLOUDFLARE.md.
 */
export async function register() {
  const isWorkerd = process.env.NEXT_RUNTIME === "edge" || Boolean(process.env.CF_PAGES) || typeof (globalThis as { WebSocketPair?: unknown }).WebSocketPair !== "undefined";
  if (isWorkerd) return;

  if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NEXT_PHASE !== "phase-production-build") {
    const { startScheduler } = await import("@/lib/scheduler");
    startScheduler();
  }
}
