/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // NOTE: `serverComponentsExternalPackages: ["sanitize-html"]` was removed for
    // Cloudflare. Workers have no node_modules at runtime, so anything marked
    // "external" would fail to resolve — sanitize-html must be bundled instead.
    // Enables src/instrumentation.ts (no-ops on Workers, see that file).
    instrumentationHook: true,
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
      // Sponsor is merged into the Advertise page.
      { source: "/sponsor", destination: "/advertise", permanent: true },
      // Browsers requesting the literal /favicon.ico get the PNG icon instead of
      // a 404 (modern browsers already use the <link rel="icon"> to /icon.png).
      { source: "/favicon.ico", destination: "/icon.png", permanent: true },
    ];
  },
};

export default nextConfig;
