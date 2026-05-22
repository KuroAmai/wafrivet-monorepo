const FALLBACK_SITE_URL = "https://wafrivet.com";

function resolveSiteUrl(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    return process.env.NEXT_PUBLIC_SITE_URL.trim();
  }
  try {
    const viteEnv = (
      import.meta as ImportMeta & { env?: { VITE_SITE_URL?: string } }
    ).env?.VITE_SITE_URL;
    if (viteEnv?.trim()) return viteEnv.trim();
  } catch {
    /* not a Vite bundle */
  }
  return FALLBACK_SITE_URL;
}

const rawSiteUrl = resolveSiteUrl();

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "Wafrivet";
export const SITE_BRAND_TAGLINE = "The operating system for livestock health in Africa.";
export const SITE_LOCALE = "en_US";
export const SITE_TWITTER_HANDLE = "@_Cybersmith";
export const SITE_THEME_COLOR = "#2D4D31";
export const SITE_DEFAULT_OG_IMAGE = `${SITE_URL}/heroimage.png`;
export const SITE_CONTACT_EMAIL = "hello@wafrivet.com";

export const SITE_DEFAULT_DESCRIPTION =
  "Wafrivet is the all-in-one livestock health OS for African farms — combining smart NFC tags, AI diagnostics, and a verified veterinary marketplace for vaccines, medicines, and equipment.";

export const SITE_DEFAULT_KEYWORDS: ReadonlyArray<string> = [
  "Wafrivet",
  "livestock health",
  "veterinary platform",
  "animal health Africa",
  "NFC livestock tags",
  "AI livestock diagnostics",
  "veterinary marketplace",
  "agro-vet",
  "smart farming",
  "cattle health",
  "poultry health",
  "small ruminant health",
];

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-mark.svg`,
  email: SITE_CONTACT_EMAIL,
  sameAs: [] as string[],
  description: SITE_DEFAULT_DESCRIPTION,
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
};
