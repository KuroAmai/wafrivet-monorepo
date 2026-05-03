import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wafrivet Herd | Operational Console",
  description: "Livestock Management & NFC Sync",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2D4D31",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light scroll-smooth h-full">
      <body className="bg-[#F9FAFB] text-gray-900 min-h-full selection:bg-[#2D4D31]/10 flex flex-col antialiased">
        <div className="max-w-xl mx-auto min-h-full w-full flex flex-col relative overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
