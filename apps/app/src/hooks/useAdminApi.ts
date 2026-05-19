"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi, queryKeys } from "@wafrivet/api";

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

export function useAdminOrders(params?: { limit?: number; cursor?: string }) {
  return useQuery({
    queryKey: queryKeys.admin.orders(params),
    queryFn: () => adminApi.listAdminOrders(params),
  });
}
