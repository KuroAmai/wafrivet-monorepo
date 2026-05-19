import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/privacy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Wafrivet collects, uses, and shares personal information across its livestock health platform — for farmers, vets, suppliers, and partners.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet privacy",
    "privacy policy",
    "data protection",
    "veterinary data privacy",
  ],
  alternates: { canonical: PATH },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
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
        id="ld-privacy-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-privacy-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: PATH },
        ])}
      />
      <PrivacyClient />
    </>
  );
}
