import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/tools";
const TITLE = "Tools — One OS for farmers, vets, and suppliers";
const DESCRIPTION =
  "Explore Wafrivet's platform: Herd for farms and clinics, Shop for verified veterinary supplies, and the Wafrivet App tying authentication, accounts, and channels together — including USSD, WhatsApp, and voice.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet Herd",
    "Wafrivet Shop",
    "veterinary platform",
    "NFC livestock tags",
    "USSD veterinary tools",
    "agro-vet marketplace",
  ],
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    url: PATH,
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

export default function Page() {
  return (
    <>
      <JsonLd
        id="ld-tools-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-tools-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: PATH },
        ])}
      />
      <ToolsClient />
    </>
  );
}
