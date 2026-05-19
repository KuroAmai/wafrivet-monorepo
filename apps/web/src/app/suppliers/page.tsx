import type { Metadata } from "next";
import SuppliersClient from "./SuppliersClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/suppliers";
const TITLE = "Wafrivet for suppliers and distributors";
const DESCRIPTION =
  "Reach real livestock demand — not just shelves. Sell to verified farms, clinics, and agro-vet outlets, with disease and usage signals, brand protection, and rural-ready logistics partners.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "veterinary suppliers",
    "veterinary distributors",
    "vaccine distribution Africa",
    "counterfeit veterinary drugs",
    "agro-vet supply chain",
    "B2B veterinary marketplace",
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
        id="ld-suppliers-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-suppliers-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Suppliers", path: PATH },
        ])}
      />
      <SuppliersClient />
    </>
  );
}
