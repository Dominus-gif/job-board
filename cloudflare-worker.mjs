/**
 * Cloudflare Worker entry (wrangler.jsonc "main"). Wraps the worker OpenNext
 * generates so a 404 always ships its content in the HTML.
 *
 * Why: when a dynamic page calls notFound() (a closed job, an unknown post or
 * landing slug), Next 15 can't render the not-found view on the server: the
 * error escapes the page before any boundary can catch it, and Next falls back
 * to an empty `<html id="__next_error__">` shell that only fills in once the
 * browser runs the page's JavaScript. Crawlers, reviewers and anyone on a slow
 * connection see a blank page with a title. nextjs.org behaves the same way.
 *
 * Paths that match no route at all don't have the problem: they get the
 * prerendered not-found page, full layout included. So when the app answers
 * with that empty shell, we answer with the prerendered page instead, keeping
 * the 404 status and the original headers. Client-side navigations (RSC
 * requests) are left alone; the browser renders those itself.
 */
/**
 * Loaded on demand, never at startup.
 *
 * A static import is evaluated while the isolate boots, and the OpenNext bundle
 * carries the whole job dataset, so every cold request paid to evaluate Next
 * even when the answer was already sitting in the edge cache below. Behind a
 * dynamic import, a cache hit wakes only this file.
 *
 * The Durable Object classes OpenNext exports (DOQueueHandler,
 * DOShardedTagCache, BucketCachePurge) are deliberately not re-exported: this
 * config binds no durable objects, and a static re-export would pull the bundle
 * back into startup. If a future open-next.config.ts enables the queue or the
 * sharded tag cache, export them again from here and accept the cost.
 */
let appPromise;
function app() {
  appPromise ??= import("./.open-next/worker.js").then((m) => m.default);
  return appPromise;
}

/** A two-segment path no route matches, so Next serves its prerendered 404. */
const FALLBACK_PATH = "/__not-found/page";
const EMPTY_SHELL_MARKER = 'id="__next_error__"';

function isDocumentRequest(request) {
  return request.method === "GET" && !request.headers.has("rsc") && !request.headers.has("next-router-prefetch");
}

async function withRenderedNotFound(request, response, env, ctx) {
  if (response.status !== 404 || !isDocumentRequest(request)) return response;
  if (!(response.headers.get("content-type") || "").includes("text/html")) return response;

  const html = await response.text();
  const rebuilt = (body) => {
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    return new Response(body, { status: 404, statusText: "Not Found", headers });
  };
  if (!html.includes(EMPTY_SHELL_MARKER)) return rebuilt(html);

  try {
    const fallbackUrl = new URL(FALLBACK_PATH, request.url);
    const fallback = await (await app()).fetch(
      new Request(fallbackUrl, { method: "GET", headers: request.headers }),
      env,
      ctx,
    );
    const fallbackHtml = fallback.status === 404 ? await fallback.text() : "";
    if (fallbackHtml && !fallbackHtml.includes(EMPTY_SHELL_MARKER)) return rebuilt(fallbackHtml);
  } catch (err) {
    console.error("[not-found fallback]", err instanceof Error ? err.message : String(err));
  }
  return rebuilt(html);
}

/* -------------------------------------------------------------------------- */
/* Edge cache for finished HTML                                                */
/* -------------------------------------------------------------------------- */

/**
 * Serve documents from the colo's own cache so a repeat request never boots
 * Next at all.
 *
 * The pages are already prerendered: responses come back with
 * `x-nextjs-cache: HIT`, and still take 600ms to 2s to start. That time is not
 * rendering, it is waking the worker, evaluating a bundle that carries the
 * whole job dataset, and reading the incremental cache. A Worker response never
 * enters Cloudflare's CDN cache on its own, so every visitor paid it. Caching
 * the finished document here skips all of it.
 *
 * Freshness, in order of what protects what:
 *  - The key carries the deployment id, so a new version can never be served
 *    HTML that points at the previous build's JavaScript chunks.
 *  - Entries live for EDGE_TTL_SECONDS. The board itself only changes on the
 *    nightly rebuild, and pages carry revalidate = 1800 behind this.
 *  - Past REVALIDATE_AFTER_SECONDS a hit is still served immediately and the
 *    page is refreshed in the background, so one visitor per window pays for
 *    the next.
 *
 * Only plain document GETs qualify. Anything with a Set-Cookie, any non-200,
 * any RSC navigation and every API route go straight through.
 */
// Half an hour, matching the revalidate on the pages themselves, with a
// background refresh after five minutes. A short window meant most visitors
// still met an empty cache, which is the expensive path.
const EDGE_TTL_SECONDS = 1800;
const REVALIDATE_AFTER_SECONDS = 300;

const UNCACHEABLE_PATH = /^\/(api|_next\/image|cdn-cgi)\//;

function wantsHtmlDocument(request) {
  if (!isDocumentRequest(request)) return false;
  if (UNCACHEABLE_PATH.test(new URL(request.url).pathname)) return false;
  return (request.headers.get("accept") || "").includes("text/html");
}

/** The deployment id, so each release caches under its own keys. */
function buildTag(env) {
  return env?.CF_VERSION_METADATA?.id || "dev";
}

function cacheKeyFor(request, env) {
  const url = new URL(request.url);
  url.searchParams.set("__build", buildTag(env));
  return new Request(url.toString(), { method: "GET" });
}

function isCacheable(response) {
  return (
    response.status === 200 &&
    !response.headers.has("set-cookie") &&
    (response.headers.get("content-type") || "").includes("text/html")
  );
}

/** Render through the app, including the not-found repair above. */
async function render(request, env, ctx) {
  const response = await (await app()).fetch(request, env, ctx);
  return withRenderedNotFound(request, response, env, ctx);
}

async function store(cache, key, response) {
  const copy = new Response(response.body, response);
  copy.headers.set("cache-control", `public, s-maxage=${EDGE_TTL_SECONDS}`);
  copy.headers.delete("set-cookie");
  await cache.put(key, copy);
}

function tagged(response, state) {
  const out = new Response(response.body, response);
  out.headers.set("x-edge-cache", state);
  return out;
}

export default {
  async fetch(request, env, ctx) {
    if (!wantsHtmlDocument(request)) return render(request, env, ctx);

    const cache = caches.default;
    const key = cacheKeyFor(request, env);

    let hit;
    try {
      hit = await cache.match(key);
    } catch {
      hit = undefined; // a cache failure must never take the site down
    }

    if (hit) {
      const age = Number(hit.headers.get("age") || 0);
      if (age > REVALIDATE_AFTER_SECONDS) {
        ctx.waitUntil(
          (async () => {
            try {
              const fresh = await render(request, env, ctx);
              if (isCacheable(fresh)) await store(cache, key, fresh);
            } catch (err) {
              console.error("[edge cache revalidate]", err instanceof Error ? err.message : String(err));
            }
          })(),
        );
      }
      return tagged(hit, "HIT");
    }

    const response = await render(request, env, ctx);
    if (isCacheable(response)) {
      const copy = response.clone();
      ctx.waitUntil(
        store(cache, key, copy).catch((err) =>
          console.error("[edge cache put]", err instanceof Error ? err.message : String(err)),
        ),
      );
    }
    return tagged(response, "MISS");
  },
};
