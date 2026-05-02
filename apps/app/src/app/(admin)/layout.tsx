"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Mock role check
    const userRole = "admin"; // This would normally come from an auth hook
    
    if (userRole !== "admin") {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#2D4D31] border-t-transparent rounded-full animate-spin" />
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Verifying Authorization</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar - Full Height Pillar */}
      <aside className="w-[320px] h-screen sticky top-0 bg-[#F9FAFB] overflow-y-auto no-scrollbar px-6 py-10 shrink-0 hidden lg:block" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <AdminSidebar />
      </aside>

      {/* Content Pillar */}
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminTopBar />
        <main className="flex-1 p-8 md:p-12 pt-0">
          <div className="max-w-[1300px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
