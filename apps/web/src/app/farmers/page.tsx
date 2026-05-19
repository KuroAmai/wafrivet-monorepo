import type { Metadata } from "next";
import FarmersClient from "./FarmersClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/farmers";
const TITLE = "Wafrivet for farmers";
const DESCRIPTION =
  "Stop losing animals — and money — to problems you never saw coming. Wafrivet gives farmers early disease alerts, real medicines from verified suppliers, and per-animal health history that works on smartphones, USSD, WhatsApp, or normal calls.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "livestock farmers",
    "smart livestock tags",
    "early disease alerts",
    "vaccine reminders",
    "USSD farming app",
    "WhatsApp livestock",
    "rural agro-vet delivery",
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
        id="ld-farmers-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-farmers-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Farmers", path: PATH },
        ])}
      />
      <FarmersClient />
    </>
  );
}
