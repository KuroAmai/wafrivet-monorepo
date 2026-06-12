"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getShopLoginUrl, normalizeUserRole, useAuth, type UserRole } from "@wafrivet/auth";

type ShopRoleGuardProps = {
  allowed: UserRole[];
  children: React.ReactNode;
};

export function ShopRoleGuard({ allowed, children }: ShopRoleGuardProps) {
  const { loading, isAuthenticated, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const productRole = normalizeUserRole(role);

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      const returnPath = pathname ?? "/";
      const loginUrl = getShopLoginUrl(returnPath);
      window.location.assign(loginUrl);
      return;
    }
    if (productRole && !allowed.includes(productRole)) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
      if (allowed.includes("chemist") && productRole === "customer") {
        window.location.assign(`${appUrl}/onboarding?changeRole=1&role=SUPPLIER`);
        return;
      }
      if (allowed.includes("distributor") && productRole === "customer") {
        window.location.assign(`${appUrl}/onboarding?changeRole=1&role=MANUFACTURER`);
        return;
      }
      const fallback =
        productRole === "distributor"
          ? "/distributor"
          : productRole === "chemist"
            ? "/dashboard"
            : "/";
      router.replace(fallback);
    }
  }, [loading, isAuthenticated, productRole, allowed, router, pathname]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-600">
        Loading…
      </div>
    );
  }

  if (productRole && !allowed.includes(productRole)) {
    return null;
  }

  return <>{children}</>;
}
