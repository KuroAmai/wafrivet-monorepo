import type { Metadata, Viewport } from "next";
import { AppProviders } from "./providers";
import "./globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  applicationName: "Wafrivet",
  title: {
    default: "Wafrivet",
    template: "%s | Wafrivet",
  },
  description:
    "Wafrivet account, dashboard, and admin console for vets, chemists, distributors, and farmers.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
