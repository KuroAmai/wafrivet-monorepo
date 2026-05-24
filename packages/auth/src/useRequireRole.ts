"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AuthUserProfileDto } from "@wafrivet/types";
import { useAuth } from "./useAuth";

export function useRequireRole(allowed: string[], redirectTo = "/login") {
  const { loading, isAuthenticated, role, user } = useAuth();
  const profile = user as AuthUserProfileDto | undefined;
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }
    const roles = [role, ...(profile?.roles ?? [])].filter(Boolean) as string[];
    const permitted = roles.some((r) => allowed.includes(r));
    if (roles.length > 0 && !permitted) {
      router.replace(redirectTo);
    }
  }, [loading, isAuthenticated, role, profile?.roles, allowed, redirectTo, router]);

  return { loading, isAuthenticated, role };
}
