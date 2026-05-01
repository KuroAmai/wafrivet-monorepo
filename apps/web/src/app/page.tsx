/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import Index from "@/pages/Index";

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto min-h-screen relative w-full bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Index />
      </main>
      <SiteFooter />
    </div>
  );
}
