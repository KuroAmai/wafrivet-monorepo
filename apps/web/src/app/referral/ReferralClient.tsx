"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import ComingSoon from "@/pages/ComingSoon";

export default function ReferralClient() {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen relative w-full shadow-2xl bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <ComingSoon />
      </main>
      <SiteFooter />
    </div>
  );
}
