"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogApi, queryKeys, supplierApi, vetApi } from "@wafrivet/api";
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
    queryFn: async () => {
      const data = await vetApi.listVetOrders({ limit: 20 });
      return (data as { data?: unknown[] })?.data ?? (Array.isArray(data) ? data : []);
    },
  });
}

export function useSupplierOffers() {
  return useQuery({
    queryKey: queryKeys.supplier.offers(),
    queryFn: () => supplierApi.listSupplierOffers({ limit: 20 }),
  });
}

export function useSupplierProfile() {
  return useQuery({
    queryKey: queryKeys.supplier.profile,
    queryFn: () => supplierApi.getSupplierProfile(),
  });
}
