import type { MetadataRoute } from "next";

const SHOP_URL =
  process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SHOP_URL}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SHOP_URL}/chemists`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SHOP_URL}/chemists/profile`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}
