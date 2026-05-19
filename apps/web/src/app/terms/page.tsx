import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/terms";
const TITLE = "Terms & Conditions";
const DESCRIPTION =
  "The terms outlining the rules and guidelines for using Wafrivet services — accounts, acceptable use, service availability, and limitations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet terms",
    "terms of service",
    "veterinary platform terms",
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
        id="ld-terms-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-terms-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms", path: PATH },
        ])}
      />
      <TermsClient />
    </>
  );
}
