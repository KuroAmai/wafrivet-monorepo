import type { Metadata } from "next";
import VetsClient from "./VetsClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/vets";
const TITLE = "Wafrivet for vets and animal-health workers";
const DESCRIPTION =
  "Do your best veterinary work without drowning in paperwork. NFC tag scanning, AI-assisted clinical notes, prescription tools, and a verified marketplace built for vets, paravets, and agro-vets.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "veterinarians",
    "paravets",
    "agro-vets",
    "AI veterinary notes",
    "NFC animal records",
    "clinical workflow",
    "veterinary practice software",
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
        id="ld-vets-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-vets-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Vets", path: PATH },
        ])}
      />
      <VetsClient />
    </>
  );
}
