"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, adminLivestockApi, meApi, queryKeys } from "@wafrivet/api";

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

export function useAdminLivestockSummary() {
  return useQuery({
    queryKey: queryKeys.admin.livestockSummary,
    queryFn: () => adminLivestockApi.getLivestockSummary(),
  });
}

export function useAdminAnimals(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  species?: string;
  status?: string;
  farmId?: string;
}) {
  return useQuery({
    queryKey: queryKeys.admin.livestockAnimals(params),
    queryFn: () => adminLivestockApi.listAnimals(params),
  });
}

export function useAdminAnimal(animalUid: string) {
  return useQuery({
    queryKey: queryKeys.admin.livestockAnimal(animalUid),
    queryFn: () => adminLivestockApi.getAnimal(animalUid),
    enabled: Boolean(animalUid),
  });
}

export function useAdminAnimalClinical(animalUid: string) {
  return useQuery({
    queryKey: queryKeys.admin.livestockAnimalClinical(animalUid),
    queryFn: () => adminLivestockApi.getAnimalClinical(animalUid),
    enabled: Boolean(animalUid),
  });
}

export function useAdminAnimalVitals(animalUid: string) {
  return useQuery({
    queryKey: queryKeys.admin.livestockAnimalVitals(animalUid),
    queryFn: () => adminLivestockApi.getAnimalVitals(animalUid),
    enabled: Boolean(animalUid),
  });
}

export function useAdminHealthEvents(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  eventType?: string;
  species?: string;
}) {
  return useQuery({
    queryKey: queryKeys.admin.livestockHealthEvents(params),
    queryFn: () => adminLivestockApi.listHealthEvents(params),
  });
}

export function useAdminDiagnoses(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: queryKeys.admin.livestockDiagnoses(params),
    queryFn: () => adminLivestockApi.listDiagnoses(params),
  });
}

export function useAdminValuations(params?: {
  limit?: number;
  cursor?: string;
  search?: string;
  species?: string;
}) {
  return useQuery({
    queryKey: queryKeys.admin.livestockValuations(params),
    queryFn: () => adminLivestockApi.listValuations(params),
  });
}
