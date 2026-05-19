import type { Metadata } from "next";
import ReferralClient from "./ReferralClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/referral";
const TITLE = "Referral & creator program";
const DESCRIPTION =
  "Help farmers and vets discover Wafrivet — and earn as you do it. A simple referral and creator program with clear tiers, transparent payouts, and tracking links for every farm, clinic, or supplier you bring on.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet referral",
    "creator program",
    "agritech affiliates",
    "veterinary creator program",
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
        id="ld-referral-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-referral-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Referral", path: PATH },
        ])}
      />
      <ReferralClient />
    </>
  );
}
