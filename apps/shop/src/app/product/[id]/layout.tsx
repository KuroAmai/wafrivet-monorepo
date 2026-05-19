import type { Metadata } from "next";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: "Veterinary Product",
    description:
      "View detailed information, pricing, and chemist availability for verified veterinary products on Wafrivet Shop.",
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title: "Veterinary Product | Wafrivet Shop",
      description:
        "View detailed information, pricing, and chemist availability for verified veterinary products.",
      url: `/product/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Veterinary Product | Wafrivet Shop",
      description:
        "View detailed information, pricing, and chemist availability for verified veterinary products.",
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
