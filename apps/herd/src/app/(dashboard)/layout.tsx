"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/components/herd/TopBar";
import { BottomNav } from "@/components/herd/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && <TopBar />}
      <main className="flex-1 px-6 pb-32">
        {children}
      </main>
      {mounted && <BottomNav />}
    </>
  );
}
