import type { Metadata } from "next";
import CookiesClient from "./CookiesClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/cookies";
const TITLE = "Cookie Policy";
const DESCRIPTION =
  "How Wafrivet uses cookies and similar technologies — essential session management, performance analytics, and preference handling.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet cookies",
    "cookie policy",
    "tracking technology",
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
        id="ld-cookies-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-cookies-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookies", path: PATH },
        ])}
      />
      <CookiesClient />
    </>
  );
}
