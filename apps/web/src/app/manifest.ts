import type { MetadataRoute } from "next";
import { SITE } from "../lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Livestock health OS for Africa`,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: SITE.backgroundColor,
    theme_color: SITE.brandColor,
    orientation: "portrait-primary",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/logo-mark-white.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
