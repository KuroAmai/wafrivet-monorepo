"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catalogApi, queryKeys, supplierApi, vetApi } from "@wafrivet/api";
import type {
  CreateShopperAddressDto,
  DraftCartDto,
  MasterSkuDto,
  OrderListItemDto,
  OrderListResponseDto,
  ShopperAddressDto,
  ShopperAddressListResponseDto,
  ShopperProfileDto,
  ShopperWishlistItemDto,
  ShopperWishlistResponseDto,
  UpdateShopperAddressDto,
  UpdateShopperAvatarDto,
  UpdateShopperProfileDto,
  UpdateShopperUsernameDto,
  VetProfileDto,
} from "@wafrivet/types";
import { useAuth } from "@wafrivet/auth";
import { parseRegionList } from "@/lib/shopLocation";
import { shopBff } from "@/lib/shopBff";
import { canUseNotifications, canUseVetCommerce } from "@/lib/shopperCapabilities";

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

export function useRegions() {
  return useQuery({
    queryKey: queryKeys.regions.list({ limit: 100 }),
    queryFn: async () => {
      const data = await fetch("/api/regions?limit=100").then((r) => r.json());
      return parseRegionList(data);
    },
    staleTime: 60_000,
  });
}

function useGatewayRoles() {
  const { user, isAuthenticated } = useAuth();
  const profile = user as { id?: string; roles?: string[]; role?: string } | null;
  return {
    roles: profile?.roles,
    primary: profile?.role,
    userId: profile?.id,
    isAuthenticated,
  };
}

function useShopperApiEnabled() {
  const { userId, isAuthenticated } = useGatewayRoles();
  return Boolean(isAuthenticated && userId);
}

function parseAddressList(data: ShopperAddressListResponseDto | ShopperAddressDto[]): ShopperAddressDto[] {
  if (Array.isArray(data)) return data;
  return data.data ?? data.addresses ?? [];
}

function parseWishlistItems(data: ShopperWishlistResponseDto | ShopperWishlistItemDto[]): ShopperWishlistItemDto[] {
  if (Array.isArray(data)) return data;
  return data.data ?? data.items ?? [];
}

export function useShopperProfile() {
  const enabled = useShopperApiEnabled();
  return useQuery({
    queryKey: queryKeys.shopper.profile,
    queryFn: () => shopBff<ShopperProfileDto>("/api/shopper/profile"),
    enabled,
  });
}

export function usePatchShopperProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateShopperProfileDto) =>
      shopBff<ShopperProfileDto>("/api/shopper/profile", { method: "PATCH", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.profile }),
  });
}

export function usePatchShopperUsername() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Pick<UpdateShopperUsernameDto, "username">) =>
      shopBff<ShopperProfileDto>("/api/shopper/profile/username", { method: "PATCH", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.profile }),
  });
}

export function usePatchShopperAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Pick<UpdateShopperAvatarDto, "avatarUrl">) =>
      shopBff<ShopperProfileDto>("/api/shopper/profile/avatar", { method: "PATCH", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.profile }),
  });
}

export function useShopperAddresses() {
  const enabled = useShopperApiEnabled();
  return useQuery({
    queryKey: queryKeys.shopper.addresses,
    queryFn: async () => {
      const data = await shopBff<ShopperAddressListResponseDto | ShopperAddressDto[]>(
        "/api/shopper/addresses",
      );
      return parseAddressList(data);
    },
    enabled,
  });
}

export function useCreateShopperAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateShopperAddressDto) =>
      shopBff<ShopperAddressDto>("/api/shopper/addresses", { method: "POST", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.addresses }),
  });
}

export function useUpdateShopperAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateShopperAddressDto & { id: string }) =>
      shopBff<ShopperAddressDto>(`/api/shopper/addresses/${id}`, { method: "PUT", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.addresses }),
  });
}

export function useDeleteShopperAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      shopBff<void>(`/api/shopper/addresses/${id}`, { method: "DELETE" }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.addresses }),
  });
}

export function useSetDefaultShopperAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      shopBff<ShopperAddressDto>(`/api/shopper/addresses/${id}/default`, { method: "PATCH" }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopper.addresses }),
  });
}

export function useShopperWishlist(params?: { limit?: number; cursor?: string }) {
  const enabled = useShopperApiEnabled();
  return useQuery({
    queryKey: queryKeys.shopper.wishlist(params),
    queryFn: async () => {
      const q = new URLSearchParams();
      if (params?.limit) q.set("limit", String(params.limit));
      if (params?.cursor) q.set("cursor", params.cursor);
      const path = q.toString() ? `/api/shopper/wishlist?${q}` : "/api/shopper/wishlist";
      const data = await shopBff<ShopperWishlistResponseDto | ShopperWishlistItemDto[]>(path);
      return parseWishlistItems(data);
    },
    enabled,
  });
}

export function useAddWishlistItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (masterSkuId: string) =>
      shopBff<ShopperWishlistItemDto>("/api/shopper/wishlist", {
        method: "POST",
        json: { masterSkuId },
      }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["shopper", "wishlist"] }),
  });
}

export function useRemoveWishlistItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (masterSkuId: string) =>
      shopBff<void>(`/api/shopper/wishlist/${encodeURIComponent(masterSkuId)}`, {
        method: "DELETE",
      }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["shopper", "wishlist"] }),
  });
}

export function useWishlistSkuSet() {
  const { data: items } = useShopperWishlist();
  return new Set((items ?? []).map((i) => i.masterSkuId));
}

export function useShopperCommerceEnabled() {
  const { roles, primary } = useGatewayRoles();
  return canUseVetCommerce(roles, primary);
}

export function useShopperOrders(params?: { limit?: number }) {
  const enabled = useShopperCommerceEnabled();
  return useQuery({
    queryKey: queryKeys.vet.orders(params),
    queryFn: async () => {
      const q = new URLSearchParams();
      if (params?.limit) q.set("limit", String(params.limit));
      const data = await shopBff<OrderListResponseDto>(`/api/orders?${q}`);
      return data.data ?? [];
    },
    enabled,
  });
}

export function useShopperOrder(orderId: string) {
  const enabled = useShopperCommerceEnabled() && Boolean(orderId);
  return useQuery({
    queryKey: queryKeys.vet.order(orderId),
    queryFn: () => shopBff<Record<string, unknown>>(`/api/orders/${orderId}`),
    enabled,
  });
}

export function useShopperOrderStats() {
  const { data: orders, isLoading } = useShopperOrders({ limit: 100 });
  const stats = {
    count: orders?.length ?? 0,
    spent: (orders ?? []).reduce((sum, o) => sum + Number(o.totalAmount ?? 0), 0),
  };
  return { ...stats, isLoading, orders };
}

export function useShopperDraft() {
  const enabled = useShopperCommerceEnabled();
  return useQuery({
    queryKey: queryKeys.vet.draft,
    queryFn: () => shopBff<DraftCartDto>("/api/procurement/draft"),
    enabled,
    retry: false,
  });
}

export function useUpsertDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { items: { offerId: string; quantity: number }[] }) =>
      shopBff<DraftCartDto>("/api/procurement/draft", { method: "POST", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.vet.draft }),
  });
}

export function useSubmitOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => shopBff<Record<string, unknown>>("/api/procurement/submit", { method: "POST" }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.vet.draft });
      void qc.invalidateQueries({ queryKey: ["vet", "orders"] });
    },
  });
}

export function useInitializePayment() {
  return useMutation({
    mutationFn: (body: { orderId: string }) =>
      shopBff<{ authorizationUrl: string; paymentId: string }>("/api/payments/initialize", {
        method: "POST",
        json: body,
      }),
  });
}

export function useVetProfile() {
  const enabled = useShopperCommerceEnabled();
  return useQuery({
    queryKey: ["vet", "profile"],
    queryFn: () => shopBff<VetProfileDto>("/api/vet/profile"),
    enabled,
  });
}

export function usePatchVetProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Partial<VetProfileDto>) =>
      shopBff<VetProfileDto>("/api/vet/profile", { method: "PATCH", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["vet", "profile"] }),
  });
}

export function useShopNotifications() {
  const { roles, primary } = useGatewayRoles();
  const enabled = canUseNotifications(roles, primary);
  return useQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: async () => {
      const data = await shopBff<{ data?: unknown[] }>("/api/notifications?limit=30");
      return (data as { data?: unknown[] }).data ?? (Array.isArray(data) ? data : []);
    },
    enabled,
  });
}

export function mapOrderStatusLabel(status: string): string {
  const key = status.toUpperCase();
  const labels: Record<string, string> = {
    DRAFT: "Draft",
    PENDING: "Pending",
    CONFIRMED: "Confirmed",
    PROCESSING: "Processing",
    OUT_FOR_DELIVERY: "In Transit",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return labels[key] ?? status;
}

export function formatOrderDisplay(o: OrderListItemDto) {
  return {
    id: o.id,
    label: o.orderNumber ?? o.id.slice(0, 8).toUpperCase(),
    status: mapOrderStatusLabel(o.status),
    total: `₦${Number(o.totalAmount ?? 0).toLocaleString()}`,
    date: o.submittedAt
      ? new Date(o.submittedAt).toLocaleString()
      : new Date(o.createdAt).toLocaleString(),
    items: o.supplierCount ?? 1,
    rawStatus: o.status,
  };
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
