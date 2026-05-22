"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi, meApi, queryKeys } from "@wafrivet/api";

export function useWarRoomSnapshot() {
  return useQuery({
    queryKey: queryKeys.admin.warRoom,
    queryFn: () => adminApi.getWarRoomSnapshot(),
  });
}

export function useAdminUsers(params?: { limit?: number; cursor?: string }) {
  return useQuery({
    queryKey: queryKeys.admin.users(params),
    queryFn: () => adminApi.listAdminUsers(params),
  });
}

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.admin.user(userId),
    queryFn: () => adminApi.getAdminUser(userId),
    enabled: Boolean(userId),
  });
}

export function useAdminOrders(params?: { limit?: number; cursor?: string }) {
  return useQuery({
    queryKey: queryKeys.admin.orders(params),
    queryFn: () => adminApi.listAdminOrders(params),
  });
}

export function useAdminCatalog(params?: { limit?: number; cursor?: string }) {
  return useQuery({
    queryKey: ["admin", "catalog", params] as const,
    queryFn: () => adminApi.listAdminCatalog(params),
  });
}

export function useDashboardLayout() {
  return useQuery({
    queryKey: ["me", "dashboard-layout"] as const,
    queryFn: () => meApi.getDashboardLayout(),
  });
}
