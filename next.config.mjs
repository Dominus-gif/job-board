/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sanitize-html (and its `entities` dep) must be required from node_modules at
  // runtime rather than bundled into server vendor-chunks.
  experimental: {
    serverComponentsExternalPackages: ["sanitize-html"],
    // Enables src/instrumentation.ts, which starts the background job refresher.
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "unavatar.io" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async redirects() {
    // Sponsor is merged into the Advertise page.
    return [{ source: "/sponsor", destination: "/advertise", permanent: true }];
  },
};

export default nextConfig;
