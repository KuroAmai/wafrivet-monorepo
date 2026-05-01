"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import PrivacyPage from "@/pages/PrivacyPage";

export default function Page() {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen relative w-full shadow-2xl bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <PrivacyPage />
      </main>
      <SiteFooter />
    </div>
  );
}

