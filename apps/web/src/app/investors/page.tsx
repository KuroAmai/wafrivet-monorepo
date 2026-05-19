import type { Metadata } from "next";
import InvestorsClient from "./InvestorsClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/investors";
const TITLE = "Investor relations";
const DESCRIPTION =
  "Wafrivet combines hardware, AI, and a B2B veterinary marketplace into a single platform upgrading livestock health outcomes across Africa — with a defensible data moat. Request the deck and learn the traction.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "agritech investors",
    "Africa livestock investment",
    "veterinary AI startup",
    "livestock data moat",
    "Wafrivet pitch",
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
        id="ld-investors-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-investors-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Investors", path: PATH },
        ])}
      />
      <InvestorsClient />
    </>
  );
}
