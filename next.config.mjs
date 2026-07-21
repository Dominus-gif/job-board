/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // sanitize-html (and its `entities` dep) must be required from node_modules at
  // runtime rather than bundled into server vendor-chunks.
  experimental: {
    serverComponentsExternalPackages: ["sanitize-html"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "www.google.com" },
    ],
  },
};

export default nextConfig;
