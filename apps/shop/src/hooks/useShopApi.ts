"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catalogApi, pickCheapestOffer, queryKeys, supplierApi, vetApi } from "@wafrivet/api";
import type {
  CreateShopperAddressDto,
  DraftCartDto,
  MarketRangeDto,
  MasterSkuDto,
  OfferCreateDto,
  OfferUpdateDto,
  OrderListItemDto,
  OrderListResponseDto,
  PriceComparisonResponseDto,
  ShopperAddressDto,
  ShopperAddressListResponseDto,
  ShopperProfileDto,
  ShopperWishlistItemDto,
  ShopperWishlistResponseDto,
  SupplierOfferDto,
  SupplierSubOrderDto,
  SupplierWalletDto,
  UpdateShopperAddressDto,
  UpdateShopperAvatarDto,
  UpdateShopperProfileDto,
  UpdateShopperUsernameDto,
  UpdateSupplierProfileDto,
  VetProfileDto,
} from "@wafrivet/types";
import { useAuth } from "@wafrivet/auth";
import { parseRegionList } from "@/lib/shopLocation";
import { shopBff } from "@/lib/shopBff";
import {
  canUseNotifications,
  canUseServerCommerce,
  canUseVetCommerce,
  isSecurityCompanyBuyer,
} from "@/lib/shopperCapabilities";

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

export function useServerCommerceEnabled() {
  const { roles, primary } = useGatewayRoles();
  return canUseServerCommerce(roles, primary);
}

/** @deprecated Use useServerCommerceEnabled */
export function useShopperCommerceEnabled() {
  return useServerCommerceEnabled();
}

export function useShopperOrders(params?: { limit?: number }) {
  const enabled = useServerCommerceEnabled();
  return useQuery({
    queryKey: queryKeys.shopperCommerce.orders(params),
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
  const enabled = useServerCommerceEnabled() && Boolean(orderId);
  return useQuery({
    queryKey: queryKeys.shopperCommerce.order(orderId),
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
  const enabled = useServerCommerceEnabled();
  return useQuery({
    queryKey: queryKeys.shopperCommerce.draft,
    queryFn: () => shopBff<DraftCartDto>("/api/procurement/draft"),
    enabled,
    retry: false,
  });
}

export function useUpsertDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      items: { offerId: string; quantity: number }[];
      linkedAnimalIds?: string[];
    }) => shopBff<DraftCartDto>("/api/procurement/draft", { method: "POST", json: body }),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopperCommerce.draft }),
  });
}

export function useSubmitOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body?: { linkedAnimalIds?: string[] }) =>
      shopBff<Record<string, unknown>>("/api/procurement/submit", {
        method: "POST",
        json: body ?? {},
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: queryKeys.shopperCommerce.draft });
      void qc.invalidateQueries({ queryKey: ["shopper", "orders"] });
    },
  });
}

export type HerdDogListItem = {
  animalUid: string;
  name?: string | null;
  breed?: string | null;
  species?: string;
};

export function useSecurityDogs() {
  const { roles, primary } = useGatewayRoles();
  const enabled = isSecurityCompanyBuyer(roles, primary);
  return useQuery({
    queryKey: ["shop", "security-dogs"],
    queryFn: () => shopBff<HerdDogListItem[]>("/api/herd/animals"),
    enabled,
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

export function useMarketRange(masterSkuId: string) {
  return useQuery({
    queryKey: queryKeys.market.range(masterSkuId),
    queryFn: () => shopBff<MarketRangeDto>(`/api/market/range/${masterSkuId}`),
    enabled: Boolean(masterSkuId),
  });
}

export function useCatalogCompare(masterSkuId: string) {
  const enabled = useServerCommerceEnabled() && Boolean(masterSkuId);
  return useQuery({
    queryKey: queryKeys.market.compare(masterSkuId),
    queryFn: () => shopBff<PriceComparisonResponseDto>(`/api/catalog/${masterSkuId}/compare`),
    enabled,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();
  const upsertDraft = useUpsertDraft();
  const { data: draft } = useShopperDraft();

  return useMutation({
    mutationFn: async ({
      masterSkuId,
      quantity,
    }: {
      masterSkuId: string;
      quantity: number;
    }) => {
      const comparison = await shopBff<PriceComparisonResponseDto>(
        `/api/catalog/${masterSkuId}/compare`,
      );
      const offer = pickCheapestOffer(comparison);
      if (!offer) {
        throw new Error("No in-stock offers available for this product");
      }

      const existing =
        draft?.supplierGroups?.flatMap((g) => g.items ?? []).map((i) => ({
          offerId: i.offerId,
          quantity: i.quantity,
        })) ?? [];

      const merged = new Map(existing.map((i) => [i.offerId, i.quantity]));
      merged.set(offer.id, (merged.get(offer.id) ?? 0) + quantity);

      return upsertDraft.mutateAsync({
        items: [...merged.entries()].map(([offerId, qty]) => ({ offerId, quantity: qty })),
      });
    },
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.shopperCommerce.draft }),
  });
}

export function useVetProfile() {
  const { roles, primary } = useGatewayRoles();
  const enabled = canUseVetCommerce(roles, primary);
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

function normalizeSupplierOffersList(
  data: { data?: SupplierOfferDto[] } | SupplierOfferDto[] | unknown,
): SupplierOfferDto[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray((data as { data?: SupplierOfferDto[] }).data)) {
    return (data as { data: SupplierOfferDto[] }).data;
  }
  return [];
}

function normalizeSupplierOrdersList(
  data: { data?: SupplierSubOrderDto[] } | SupplierSubOrderDto[] | unknown,
): SupplierSubOrderDto[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && Array.isArray((data as { data?: SupplierSubOrderDto[] }).data)) {
    return (data as { data: SupplierSubOrderDto[] }).data;
  }
  return [];
}

/** Gateway via @wafrivet/api (works before shop BFF routes are deployed). */
export function useSupplierOffers(params?: { limit?: number }) {
  return useQuery({
    queryKey: queryKeys.supplier.offers(params),
    queryFn: async () => {
      const data = await supplierApi.listSupplierOffers({ limit: params?.limit ?? 50 });
      return normalizeSupplierOffersList(data);
    },
  });
}

export function useCreateSupplierOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: OfferCreateDto) => supplierApi.createSupplierOffer(body),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["supplier", "offers"] }),
  });
}

export function useUpdateSupplierOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, ...body }: OfferUpdateDto & { offerId: string }) =>
      supplierApi.updateSupplierOffer(offerId, body),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["supplier", "offers"] }),
  });
}

export function useDeleteSupplierOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (offerId: string) => supplierApi.deleteSupplierOffer(offerId),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["supplier", "offers"] }),
  });
}

export function useSupplierOrders(params?: { limit?: number }) {
  return useQuery({
    queryKey: queryKeys.supplier.orders(params),
    queryFn: async () => {
      const data = await supplierApi.listSupplierOrders({ limit: params?.limit ?? 30 });
      return normalizeSupplierOrdersList(data);
    },
  });
}

export function useSupplierProfile() {
  return useQuery({
    queryKey: queryKeys.supplier.profile,
    queryFn: () => supplierApi.getSupplierProfile(),
  });
}

export function useUpdateSupplierProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateSupplierProfileDto) => supplierApi.updateSupplierProfile(body),
    onSuccess: () => void qc.invalidateQueries({ queryKey: queryKeys.supplier.profile }),
  });
}

export function useSupplierWallet(params?: { limit?: number }) {
  return useQuery({
    queryKey: queryKeys.supplier.wallet,
    queryFn: async () => {
      const data = await supplierApi.getSupplierWallet({ limit: params?.limit ?? 50 });
      return data as SupplierWalletDto;
    },
  });
}

export function formatMoneyDisplay(money?: { naira?: string; kobo?: string } | null): string {
  if (!money) return "₦0";
  if (money.naira) {
    const n = Number(money.naira);
    if (!Number.isNaN(n)) return `₦${n.toLocaleString()}`;
    return `₦${money.naira}`;
  }
  if (money.kobo) {
    const kobo = Number(money.kobo);
    if (!Number.isNaN(kobo)) return `₦${(kobo / 100).toLocaleString()}`;
  }
  return "₦0";
}

export function countLowStockOffers(offers: SupplierOfferDto[], threshold = 10): SupplierOfferDto[] {
  return offers.filter((offer) => {
    const stock = Number(offer.stockQuantity ?? 0);
    const min = Number(offer.minOrderQty ?? 1);
    return stock <= Math.max(min, threshold);
  });
}
