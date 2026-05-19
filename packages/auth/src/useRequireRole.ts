"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useRequireRole(allowed: string[], redirectTo = "/login") {
  const { loading, isAuthenticated, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
    if (role && !allowed.includes(role)) {
      router.replace(redirectTo);
    }
  }, [loading, isAuthenticated, role, allowed, redirectTo, router]);

  return { loading, isAuthenticated, role };
}
