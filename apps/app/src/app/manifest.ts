import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wafrivet",
    short_name: "Wafrivet",
    description:
      "Wafrivet account, dashboard, and admin console for vets, chemists, distributors, and farmers.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9FAFB",
    theme_color: "#2D4D31",
    icons: [
      {
        src: "/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
