import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Allow Sanity Studio to work with Next.js
  transpilePackages: ["next-sanity"],
};

export default nextConfig;
