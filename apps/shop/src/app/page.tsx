"use client";

import { useState, useEffect } from "react";
import { MarketplaceView } from "@/components/shop/MarketplaceView";
import { ChemistDashboardView } from "@/components/chemist/ChemistDashboardView";
import { Sidebar } from "@/components/chemist/Sidebar";
import { TopBar } from "@/components/chemist/TopBar";

export default function ShopHome() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check search params first
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    
    if (roleParam) {
      setUserRole(roleParam);
      setIsLoading(false);
      return;
    }

    // Otherwise check for mock token/user role in cookies or mock auth state
    const isChemist = document.cookie.includes("role=chemist") || localStorage.getItem("userRole") === "chemist";
    setUserRole(isChemist ? "chemist" : "customer");
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="h-screen w-full bg-[#F9FAFB] animate-pulse" />;

  if (userRole === "chemist") {
    return (
      <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
            <ChemistDashboardView />
          </main>
        </div>
      </div>
    );
  }

  return <MarketplaceView />;
}
