import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wafrivet Shop",
    short_name: "Wafrivet",
    description:
      "The trusted marketplace for veterinary medicines, supplies, and local chemists across Africa.",
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
