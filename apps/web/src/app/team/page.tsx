import type { Metadata } from "next";
import TeamClient from "./TeamClient";
import { SITE } from "../../lib/seo/site";
import {
  JsonLd,
  breadcrumbSchema,
  personSchema,
} from "../../lib/seo/jsonLd";

const PATH = "/team";
const TITLE = "Our team";
const DESCRIPTION =
  "Meet the founders building Wafrivet — Leslie and Gift Asor — and the unofficial team members who visit the office every day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    ...SITE.defaultKeywords,
    "Wafrivet team",
    "Wafrivet founders",
    "Leslie Wafrivet",
    "Gift Asor",
    "veterinary startup founders",
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

const FOUNDERS = [
  {
    name: "Leslie",
    jobTitle: "Co-founder",
    image: "/Leslie.png",
    description: "Building tools farmers and vets can rely on.",
    url: PATH,
  },
  {
    name: "Gift Asor",
    jobTitle: "Co-founder",
    image: "/Tsukimi.png",
    description:
      "Product and engineering with livestock and animal health in mind.",
    url: PATH,
  },
] as const;

export default function Page() {
  return (
    <>
      <JsonLd
        id="ld-team-breadcrumb"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Team", path: PATH },
        ])}
      />
      {FOUNDERS.map((person) => (
        <JsonLd
          key={person.name}
          id={`ld-person-${person.name.replace(/\s+/g, "-").toLowerCase()}`}
          data={personSchema(person)}
        />
      ))}
      <TeamClient />
    </>
  );
}
