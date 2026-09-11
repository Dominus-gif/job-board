import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Any character outside plain ASCII, left un-percent-encoded in the path.
 * Written as a code-point scan rather than a regex: the escapes a character
 * class needs here are fragile to pass through tooling, and getting the range
 * subtly wrong would silently redirect every request on the site.
 */
function hasRawNonAscii(path: string): boolean {
  for (let i = 0; i < path.length; i++) {
    if (path.charCodeAt(i) > 127) return true;
  }
  return false;
}

/**
 * Does this path survive percent-decoding?
 *
 * Returns false for sequences that are not valid UTF-8 — a lone %E9, a
 * truncated %C3, a stray %FF — which are exactly the inputs that make
 * decodeURIComponent throw further down the request.
 */
function isDecodable(path: string): boolean {
  try {
    decodeURIComponent(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * Edge fixes applied before routing.
 *
 * 1. Path normalisation. A URL carrying raw, un-percent-encoded non-ASCII —
 *    /jobs/café, /posts/münchen, a pasted link from a chat app that stripped the
 *    encoding — made Next's dynamic-segment decoding throw during route
 *    resolution. That happens BELOW the App Router, so neither notFound() nor
 *    error.tsx could catch it and the visitor got a bare
 *    "500: Internal Server Error" page.
 *
 *    It affected every dynamic route (/jobs/…, /posts/…, /companies/…, landing
 *    pages, /page/N) while the correctly-encoded form of the same path 404'd
 *    cleanly — which is why it read as "intermittent" and survived several
 *    rounds of random-slug testing without reproducing.
 *
 *    Re-encoding each segment here hands Next a well-formed path, so the route
 *    resolves normally and an unknown slug reaches the styled 404. Legitimate
 *    non-ASCII URLs keep working; they simply arrive in canonical form.
 *
 * 2. The hero/404 search forms post to /jobs (real SSR results). This also
 *    catches a bare `/?q=…` (typed, or an old shared link) and redirects it to
 *    the indexable /jobs results, so no search dead-ends on the homepage.
 */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // A path whose percent-encoding does not decode to valid UTF-8 — /jobs/%E9,
  // /jobs/%FF, a truncated /jobs/%C3 — makes decodeURIComponent throw inside
  // Next's dynamic-segment decoding. That happens below the App Router, so
  // neither notFound() nor error.tsx can catch it and the visitor gets a bare
  // "500: Internal Server Error". Answer it here, before routing.
  if (!isDecodable(pathname)) {
    const url = req.nextUrl.clone();
    // An unmatched path renders the app's own not-found with a 404 status, and
    // rewrite (not redirect) keeps the bad URL visible rather than laundering it.
    url.pathname = "/__malformed-url";
    url.search = "";
    return NextResponse.rewrite(url);
  }

  if (hasRawNonAscii(pathname)) {
    const url = req.nextUrl.clone();
    // Segment-wise so the "/" separators survive encoding.
    url.pathname = pathname
      .split("/")
      .map((seg) => (seg ? encodeURIComponent(seg) : seg))
      .join("/");
    // 308 keeps the method and tells crawlers the encoded form is canonical.
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/" && searchParams.has("q")) {
    const url = req.nextUrl.clone();
    url.pathname = "/jobs";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Every page request, but not build assets or files with an extension —
  // the normalisation above has to run before any dynamic route resolves,
  // which the previous "/"-only matcher never did.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.[A-Za-z0-9]+$).*)"],
};
