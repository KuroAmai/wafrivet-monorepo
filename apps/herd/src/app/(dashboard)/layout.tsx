"use client";

import { TopBar } from "@/components/herd/TopBar";
import { BottomNav } from "@/components/herd/BottomNav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Hide TopBar and BottomNav for specific chat routes like /ai/[id]
  const isChatDetail = pathname ? (pathname.startsWith('/ai/') && pathname !== '/ai') : false;

  return (
    <>
      {!isChatDetail && <TopBar />}
      <main className={cn(
        "flex-1",
        !isChatDetail ? "px-6 pb-32" : "h-screen overflow-hidden"
      )}>
        {children}
      </main>
      {!isChatDetail && <BottomNav />}
    </>
  );
}
