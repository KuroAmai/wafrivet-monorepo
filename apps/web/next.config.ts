import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../../src"),
      "react-router-dom": path.resolve(__dirname, "./src/shims/react-router-dom.tsx"),
    };
    return config;
  },
};

export default nextConfig;
