import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * The hero/404 search forms post to /jobs (real SSR results). This also catches
 * a bare `/?q=…` (typed or an old shared link) and redirects it to the indexable
 * /jobs results, so no search ever dead-ends on the homepage. Scoped to "/" only,
 * so the homepage stays statically rendered for normal visits.
 */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname === "/" && searchParams.has("q")) {
    const url = req.nextUrl.clone();
    url.pathname = "/jobs";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
