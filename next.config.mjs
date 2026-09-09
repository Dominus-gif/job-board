/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
      // Browsers requesting the literal /favicon.ico get the PNG icon instead of
      // a 404 (modern browsers already use the <link rel="icon"> to /icon.png).
      { source: "/favicon.ico", destination: "/icon.png", permanent: true },
    ];
  },
};

export default nextConfig;
