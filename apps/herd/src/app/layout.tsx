import type { Metadata } from "next";
import { getServerAuth } from "@wafrivet/auth";
import { redirect } from "next/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wafrivet Herd",
  description: "Wafrivet Herd",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getServerAuth();
  if (!auth.authenticated) redirect("https://app.wafrivet.com/login");

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
