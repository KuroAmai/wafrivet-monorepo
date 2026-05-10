import type { Metadata } from "next";
import { getServerAuth } from "@wafrivet/auth/server";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

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
    <html lang="en" className={`h-full antialiased ${quicksand.variable}`}>
      <body className={`${quicksand.className} min-h-full flex flex-col bg-[#F9FAFB]`}>
        {children}
      </body>
    </html>
  );
}
