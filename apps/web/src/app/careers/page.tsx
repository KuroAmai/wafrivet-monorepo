import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  webPageSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/careers";
const TITLE = "Careers";
const DESCRIPTION =
  "Help build the OS for livestock health across Africa. Wafrivet is a small, fast-moving team of engineers, vets, designers, and operators rethinking how livestock health works from the ground up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet careers",
    "agritech jobs",
    "veterinary tech jobs",
    "Africa startup jobs",
    "remote agritech jobs",
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
        id="ld-careers-webpage"
        data={webPageSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
        })}
      />
      <JsonLd
        id="ld-careers-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: PATH },
        ])}
      />
      <CareersClient />
    </>
  );
}
