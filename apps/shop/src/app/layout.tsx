import type { Metadata } from "next";
import { getServerAuth } from "@wafrivet/auth";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Wafrivet Shop | Monorepo",
  description: "Marketplace and distributor application",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F9FAFB]">
        {children}
      </body>
    </html>
  );
}
