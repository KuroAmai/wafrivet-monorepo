"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import InvestorsPage from "@/pages/InvestorsPage";

export default function InvestorsClient() {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen relative w-full shadow-2xl bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <InvestorsPage />
      </main>
      <SiteFooter />
    </div>
  );
}
