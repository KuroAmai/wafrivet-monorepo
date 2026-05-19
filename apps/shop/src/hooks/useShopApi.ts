"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogApi, queryKeys, vetApi } from "@wafrivet/api";
import type { MasterSkuDto } from "@wafrivet/types";

export function useCatalog(search?: string) {
  return useQuery({
    queryKey: queryKeys.catalog.list({ search }),
    queryFn: async () => {
      const result = await catalogApi.listCatalog({ search, limit: 24 });
      if (Array.isArray(result)) return result;
      return (result as { data?: MasterSkuDto[] }).data ?? [];
    },
  });
}

export function useCatalogItem(id: string) {
  return useQuery({
    queryKey: queryKeys.catalog.item(id),
    queryFn: () => catalogApi.getCatalogItem(id),
    enabled: Boolean(id),
  });
}

export function useVetOrders() {
  return useQuery({
    queryKey: queryKeys.vet.orders(),
    queryFn: () => vetApi.listVetOrders({ limit: 20 }),
  });
}
