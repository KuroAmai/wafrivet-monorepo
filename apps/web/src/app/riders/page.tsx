import type { Metadata } from "next";
import RidersClient from "./RidersClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/riders";
const TITLE = "Riders & logistics partners";
const DESCRIPTION =
  "Deliver life-saving veterinary medicines to the last mile and get paid reliably. Join the Wafrivet logistics network — predictable rural routes, transparent payouts, and clear onboarding.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "veterinary delivery",
    "rural logistics",
    "last-mile veterinary",
    "rider partners Africa",
    "agro-vet logistics",
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
        id="ld-riders-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-riders-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Riders", path: PATH },
        ])}
      />
      <RidersClient />
    </>
  );
}
