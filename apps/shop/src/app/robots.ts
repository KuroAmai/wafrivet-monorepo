import type { MetadataRoute } from "next";

const SHOP_URL =
  process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/orders",
          "/profile",
          "/dashboard",
          "/distributor",
          "/earnings",
          "/inventory",
          "/insights",
          "/settings",
          "/support",
          "/api/",
        ],
      },
    ],
    sitemap: `${SHOP_URL}/sitemap.xml`,
    host: SHOP_URL,
  };
}
