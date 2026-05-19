import type { Metadata, Viewport } from "next";
import { getServerAuth } from "@wafrivet/auth/server";
import { Quicksand } from "next/font/google";
import { ShopProviders } from "./providers";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SHOP_URL =
  process.env.NEXT_PUBLIC_SHOP_URL || "https://shop.wafrivet.com";

export const metadata: Metadata = {
  metadataBase: new URL(SHOP_URL),
  applicationName: "Wafrivet Shop",
  title: {
    default: "Wafrivet Shop — Buy Veterinary Products & Find Local Chemists",
    template: "%s | Wafrivet Shop",
  },
  description:
    "Wafrivet Shop is the trusted marketplace for veterinary medicines, supplies, and local chemists across Africa.",
  keywords: [
    "veterinary marketplace",
    "veterinary medicine",
    "livestock supplies",
    "animal health",
    "chemists",
    "Wafrivet",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Wafrivet Shop",
    title: "Wafrivet Shop — Buy Veterinary Products & Find Local Chemists",
    description:
      "The trusted marketplace for veterinary medicines, supplies, and local chemists across Africa.",
    url: SHOP_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wafrivet Shop — Buy Veterinary Products & Find Local Chemists",
    description:
      "The trusted marketplace for veterinary medicines, supplies, and local chemists across Africa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo-mark.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-mark.svg",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2D4D31",
  colorScheme: "light",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let auth;
  try {
    auth = await getServerAuth();
  } catch (e) {
    auth = { authenticated: false };
  }

  return (
    <html lang="en" className={`h-full antialiased ${quicksand.variable}`}>
      <body className={`${quicksand.className} min-h-full flex flex-col bg-[#F9FAFB]`}>
        <ShopProviders>{children}</ShopProviders>
      </body>
    </html>
  );
}
