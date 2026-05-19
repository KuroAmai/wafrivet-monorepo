import { SITE, absoluteUrl } from "./site";

export type JsonLdProps = {
  id: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: absoluteUrl("/Wafrivet Logo 1 (1).svg"),
    description: SITE.description,
    email: SITE.email,
    sameAs: [],
    founder: SITE.authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      url: author.url,
    })),
  } as const;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}#organization` },
  } as const;
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  } as const;
}

export type PersonSchemaInput = {
  name: string;
  jobTitle: string;
  url?: string;
  image?: string;
  description?: string;
};

export function personSchema(input: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    ...(input.url ? { url: absoluteUrl(input.url) } : {}),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.description ? { description: input.description } : {}),
    worksFor: { "@id": `${SITE.url}#organization` },
  } as const;
}

export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { "@id": `${SITE.url}#website` },
  } as const;
}
