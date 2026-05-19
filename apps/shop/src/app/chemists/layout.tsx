import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Local Veterinary Chemists",
  description:
    "Browse verified veterinary chemists near you. Get directions, opening hours, and trusted product availability across Africa.",
  alternates: {
    canonical: "/chemists",
  },
  openGraph: {
    title: "Find Local Veterinary Chemists | Wafrivet Shop",
    description:
      "Browse verified veterinary chemists near you. Get directions, opening hours, and trusted product availability across Africa.",
    url: "/chemists",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Local Veterinary Chemists | Wafrivet Shop",
    description:
      "Browse verified veterinary chemists near you. Get directions, opening hours, and trusted product availability.",
  },
};

export default function ChemistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
