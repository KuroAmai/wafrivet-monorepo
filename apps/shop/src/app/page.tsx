"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { normalizeUserRole, useAuth } from "@wafrivet/auth";
import { MarketplaceView } from "@/components/shop/MarketplaceView";

export default function ShopHome() {
  const router = useRouter();
  const { loading, isAuthenticated, role } = useAuth();
  const productRole = normalizeUserRole(role);

  useEffect(() => {
    if (loading) return;
    if (isAuthenticated && productRole === "chemist") {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, productRole, router]);

  if (loading) {
    return <div className="h-screen w-full bg-[#F9FAFB] animate-pulse" />;
  }

  if (isAuthenticated && productRole === "chemist") {
    return <div className="h-screen w-full bg-[#F9FAFB] animate-pulse" />;
  }

  return <MarketplaceView />;
}
