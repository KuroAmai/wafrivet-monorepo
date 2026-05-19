import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE } from "../lib/seo/site";

const TITLE = `${SITE.name} — Livestock health OS for Africa`;
const DESCRIPTION =
  "Wafrivet brings farmers, vets, and suppliers onto one livestock health platform: NFC-tagged animals, AI-assisted diagnostics, prioritized disease alerts, and a verified veterinary marketplace.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "livestock platform",
    "smart livestock tags",
    "veterinary AI",
    "agro-vet marketplace",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: TITLE,
    description: DESCRIPTION,
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function Home() {
  return <HomeClient />;
}
