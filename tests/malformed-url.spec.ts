import { expect, test } from "@playwright/test";

/**
 * A path whose percent-encoding is not valid UTF-8 must 404, never 500.
 *
 * The middleware rewrites these to an unmatched path. That only works if the
 * target matches no route at all: after a rewrite Next runs the destination
 * route's param matcher against the ORIGINAL path, so a target that resolved to
 * [landing] made every root-level malformed path (/%E9) throw while decoding
 * the param, and the site answered 500 there while /jobs/%E9 404'd. These run
 * against `next start` because that decoding happens inside Next's routing,
 * where no unit test reaches.
 */
const MALFORMED = [
  "/%E0%A4%A", // truncated three-byte sequence (the URL that was reported)
  "/%E9", // lone Latin-1 byte
  "/%FF", // never valid in UTF-8
  "/%C3", // truncated two-byte sequence
  "/%E9.xml", // has an extension, which the main middleware matcher skips
  "/%E9/rss.xml", // under the [landing]/rss.xml route handler
  "/jobs/%E0%A4%A",
  "/posts/%E9",
  "/companies/%E9",
  "/page/%E9",
];

for (const path of MALFORMED) {
  test(`malformed path ${path} is a 404 with the full not-found page`, async ({ request }) => {
    const res = await request.get(path, { headers: { accept: "text/html" }, maxRedirects: 0 });
    expect(res.status()).toBe(404);
    const html = await res.text();
    // The prerendered not-found, not a bare "Internal Server Error" or the
    // empty error shell that only fills in once JavaScript runs.
    expect(html).not.toContain('id="__next_error__"');
    expect(html).toContain("<main");
  });
}

test("a malformed root path is a 404 for client-side navigations too", async ({ request }) => {
  const res = await request.get("/%E9", { headers: { rsc: "1" }, maxRedirects: 0 });
  expect(res.status()).toBe(404);
});

test("well-formed encoded paths still resolve normally", async ({ request }) => {
  expect((await request.get("/", { maxRedirects: 0 })).status()).toBe(200);
  // Valid UTF-8 for "é": decodes cleanly, so it reaches [landing] and 404s as an unknown slug.
  expect((await request.get("/%C3%A9", { headers: { accept: "text/html" }, maxRedirects: 0 })).status()).toBe(404);
  expect((await request.get("/%C3%A9.xml", { maxRedirects: 0 })).status()).toBe(404);
  // Files with an extension and no percent-encoding still bypass the middleware untouched.
  expect((await request.get("/rss.xml", { maxRedirects: 0 })).status()).toBe(200);
  expect((await request.get("/robots.txt", { maxRedirects: 0 })).status()).toBe(200);
});
