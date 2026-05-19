import { Helmet } from "react-helmet-async";
import {
  SITE_NAME,
  SITE_LOCALE,
  SITE_TWITTER_HANDLE,
  SITE_DEFAULT_OG_IMAGE,
  absoluteUrl,
} from "@/lib/seo/site";

type JsonLdObject = Record<string, unknown>;

export type SeoProps = {
  title: string;
  description: string;
  keywords?: ReadonlyArray<string> | string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "product";
  noindex?: boolean;
  jsonLd?: JsonLdObject | ReadonlyArray<JsonLdObject>;
};

function toTitle(title: string): string {
  if (!title) return SITE_NAME;
  if (title === SITE_NAME) return SITE_NAME;
  if (title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
}

function toKeywords(keywords?: ReadonlyArray<string> | string): string | undefined {
  if (!keywords) return undefined;
  if (typeof keywords === "string") return keywords;
  if (keywords.length === 0) return undefined;
  return keywords.join(", ");
}

export function Seo({
  title,
  description,
  keywords,
  path,
  ogImage,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = toTitle(title);
  const canonical = absoluteUrl(path);
  const image = ogImage ? absoluteUrl(ogImage) : SITE_DEFAULT_OG_IMAGE;
  const keywordString = toKeywords(keywords);
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  const jsonLdItems = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordString ? <meta name="keywords" content={keywordString} /> : null}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
