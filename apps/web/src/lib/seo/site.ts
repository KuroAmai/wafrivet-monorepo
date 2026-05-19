const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://wafrivet.com";

const NORMALIZED_SITE_URL = RAW_SITE_URL.replace(/\/$/, "");

export const SITE = {
  name: "Wafrivet",
  shortName: "Wafrivet",
  url: NORMALIZED_SITE_URL,
  locale: "en_US",
  language: "en",
  description:
    "Wafrivet is the operating system for livestock health in Africa — connecting farmers, vets, and suppliers with NFC-tagged animals, AI-assisted diagnostics, and a verified veterinary marketplace.",
  tagline: "The operating system for livestock health.",
  brandColor: "#2D4D31",
  backgroundColor: "#EBEEEB",
  twitter: "@wafrivet",
  email: "hello@wafrivet.com",
  ogImagePath: "/opengraph-image",
  defaultKeywords: [
    "Wafrivet",
    "livestock health",
    "veterinary software",
    "livestock OS",
    "NFC livestock tags",
    "animal health platform",
    "veterinary marketplace",
    "agritech Africa",
    "livestock management",
    "vet AI diagnostics",
    "animal disease alerts",
    "agro-vet supply chain",
  ],
  authors: [
    { name: "Leslie", url: NORMALIZED_SITE_URL + "/team" },
    { name: "Gift Asor", url: NORMALIZED_SITE_URL + "/team" },
  ],
} as const;

export const SITE_URL = SITE.url;

export function absoluteUrl(path: string): string {
  if (!path) return SITE.url;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
