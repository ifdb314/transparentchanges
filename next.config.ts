import path from "path";
import type { NextConfig } from "next";

// Verifying Cloudflare Workers Builds git auto-deploy — safe to remove after confirming.
const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/the-ledger", destination: "/first-steps", permanent: true },
    ];
  },
};

export default nextConfig;
