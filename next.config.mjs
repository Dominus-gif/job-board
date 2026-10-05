import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Drop Next's `polyfill-module` from the client bundle.
   *
   * Next adds it to the client entry unconditionally, whatever browserslist
   * says: 11.2KB of Object.hasOwn, Array.prototype.at/flat/flatMap,
   * Object.fromEntries and String.prototype.trimStart/trimEnd, downloaded and
   * parsed by every visitor on their first load, and flagged by PageSpeed as
   * legacy JavaScript. The browserslist in package.json floors us at Chrome 93 /
   * Firefox 92 / Safari 15.4, and every one of those features is native there —
   * Object.hasOwn and Array.prototype.at, the two newest, are what set that
   * floor in the first place.
   *
   * It is a module replacement rather than a resolve.alias because Next puts the
   * polyfill into the entry as an already-resolved absolute path, which an alias
   * on the module specifier never gets to see. The regex matches that path.
   *
   * The nomodule polyfill bundle Next also emits is untouched and still served
   * to browsers that need it; only module-capable browsers are affected here,
   * and those are the ones browserslist already covers.
   *
   * If the browserslist floor is ever lowered, remove this at the same time:
   * they are one decision, and leaving this behind would quietly break the
   * browsers that floor was lowered for.
   *
   * (Inlining the stylesheets was tried here too, via experimental.inlineCss,
   * and reverted. It removes a render-blocking request PageSpeed costs at about
   * 150ms, but measured 19.1KB gzipped added to every single document against
   * 17.2KB fetched once and cached across the whole site — a loss for anyone who
   * views more than one page.)
   */
  webpack(config, { isServer, webpack }) {
    if (!isServer) {
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[\\/]polyfills[\\/]polyfill-module\.js$/,
          path.join(import.meta.dirname, "config", "empty-module.js"),
        ),
      );
    }
    return config;
  },
  images: {
    // Cloudflare Workers don't run Next's image optimizer. Serving the original
    // assets avoids a broken /_next/image route (and any per-image cost).
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "unavatar.io" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    return [
      // Both the apex and www are attached as Cloudflare custom domains, so
      // both served 200 with identical content while canonical/OG/sitemap all
      // point at the apex. Collapse to one host so indexers see a single
      // signal instead of a duplicate.
      // Root first: with a zero-segment match, ":path*" is emitted literally in
      // the destination, so "/" alone needs its own rule.
      {
        source: "/",
        has: [{ type: "host", value: "www.getremotejobsnow.com" }],
        destination: "https://getremotejobsnow.com/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.getremotejobsnow.com" }],
        destination: "https://getremotejobsnow.com/:path+",
        permanent: true,
      },
      // Sponsor is merged into the Advertise page.
      { source: "/sponsor", destination: "/advertise", permanent: true },
      // The Open Graph image used to be rendered on demand at /api/og. It is
      // a committed file now (see scripts/build-og-image.ts); this keeps any
      // card a platform already cached under the old URL resolving.
      { source: "/api/og", destination: "/og.png", permanent: true },
      // "What work from anywhere means" merged into the longer comparison
      // guide (2026-10-05): one subject, one page, and the shorter one was a
      // subset of the longer. Permanent so the ranking consolidates.
      { source: "/posts/work-from-anywhere-meaning", destination: "/posts/work-from-home-vs-work-from-anywhere", permanent: true },
      // Two company-name posts merged into one broader guide (2026-09-27).
      { source: "/posts/does-spacex-have-remote-jobs", destination: "/posts/remote-jobs-at-ai-labs-and-space-companies", permanent: true },
      { source: "/posts/safe-superintelligence-and-ai-lab-careers", destination: "/posts/remote-jobs-at-ai-labs-and-space-companies", permanent: true },
      // Browsers requesting the literal /favicon.ico get the PNG icon instead of
      // a 404 (modern browsers already use the <link rel="icon"> to /icon.png).
      { source: "/favicon.ico", destination: "/icon.png", permanent: true },
    ];
  },
};

export default nextConfig;
