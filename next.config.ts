import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is static, so the site ships as plain files and is served as
  // Cloudflare Worker static assets (see wrangler.jsonc).
  output: "export",
  images: {
    // No image server in a static export; the few images are pre-cropped JPEGs.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
