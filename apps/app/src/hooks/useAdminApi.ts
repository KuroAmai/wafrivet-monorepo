"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, meApi, queryKeys } from "@wafrivet/api";

export function useWarRoomSnapshot() {
  return useQuery({
    queryKey: queryKeys.admin.warRoom,
    queryFn: () => adminApi.getWarRoomSnapshot(),
  });
}

export function useAdminUsers(params?: {
  limit?: number;
  cursor?: string;
  role?: string;
  isActive?: boolean;
}) {
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

export function useDeactivateAdminUser(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: { reason: string }) => adminApi.deactivateAdminUser(userId, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.admin.user(userId) });
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) =>
      adminApi.deleteAdminUser(userId, { reason }),
    onSuccess: (_data, variables) => {
      queryClient.removeQueries({ queryKey: queryKeys.admin.user(variables.userId) });
      void queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
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
