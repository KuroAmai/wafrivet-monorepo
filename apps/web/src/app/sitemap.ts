import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo/site";

type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Route[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { path: "/farmers", changeFrequency: "monthly", priority: 0.9 },
  { path: "/vets", changeFrequency: "monthly", priority: 0.9 },
  { path: "/suppliers", changeFrequency: "monthly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.6 },
  { path: "/investors", changeFrequency: "monthly", priority: 0.7 },
  { path: "/referral", changeFrequency: "monthly", priority: 0.5 },
  { path: "/riders", changeFrequency: "monthly", priority: 0.5 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.5 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
