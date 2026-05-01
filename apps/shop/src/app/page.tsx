"use client";

import { useState, useEffect } from "react";
import { MarketplaceView } from "@/components/shop/MarketplaceView";
import { ChemistDashboardView } from "@/components/chemist/ChemistDashboardView";
import { Sidebar } from "@/components/chemist/Sidebar";
import { ShopNavbar } from "@/components/layout/ShopNavbar";

export default function ShopHome() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");
    
    if (roleParam) {
      setUserRole(roleParam);
      setIsLoading(false);
      return;
    }

    const isChemist = document.cookie.includes("role=chemist") || localStorage.getItem("userRole") === "chemist";
    setUserRole(isChemist ? "chemist" : "customer");
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="h-screen w-full bg-[#F9FAFB] animate-pulse" />;

  if (userRole === "chemist") {
    return (
      <div className="min-h-screen bg-[#F9FAFB]">
        <ShopNavbar />
        <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-3">
              <Sidebar />
            </div>
            <div className="lg:col-span-9">
              <ChemistDashboardView />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return <MarketplaceView />;
}
