import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chemist Profile",
  description:
    "View a verified veterinary chemist's profile, products, ratings, and delivery details on Wafrivet Shop.",
  alternates: {
    canonical: "/chemists/profile",
  },
  openGraph: {
    title: "Chemist Profile | Wafrivet Shop",
    description:
      "View a verified veterinary chemist's profile, products, ratings, and delivery details.",
    url: "/chemists/profile",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chemist Profile | Wafrivet Shop",
    description:
      "View a verified veterinary chemist's profile, products, ratings, and delivery details.",
  },
};

export default function ChemistProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
