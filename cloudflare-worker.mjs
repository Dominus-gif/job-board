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
import openNext from "./.open-next/worker.js";

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";

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
    const fallback = await openNext.fetch(
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

export default {
  async fetch(request, env, ctx) {
    const response = await openNext.fetch(request, env, ctx);
    return withRenderedNotFound(request, response, env, ctx);
  },
};
