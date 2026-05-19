import type { NextConfig } from "next";

const gatewayUrl =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://wafrivet-api-gateway-wdvfp4toqa-ew.a.run.app";

const nextConfig: NextConfig = {
  transpilePackages: ["@wafrivet/api", "@wafrivet/auth", "@wafrivet/types"],
  serverExternalPackages: ["@phosphor-icons/react"],
  compress: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: "/api/gateway/:path*",
        destination: `${gatewayUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
