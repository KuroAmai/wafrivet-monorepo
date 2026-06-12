import type {
  AddShopperWishlistItemDto,
  CreateShopperAddressDto,
  ShopperAddressDto,
  ShopperAddressListResponseDto,
  ShopperProfileDto,
  ShopperWishlistItemDto,
  ShopperWishlistResponseDto,
  UpdateShopperAddressDto,
  UpdateShopperAvatarDto,
  UpdateShopperProfileDto,
  UpdateShopperUsernameDto,
} from "@wafrivet/types";
import { apiClient } from "../client";

export async function getShopperProfile(): Promise<ShopperProfileDto> {
  const { data } = await apiClient.get<ShopperProfileDto>("/shopper/profile");
  return data;
}

export async function patchShopperProfile(body: UpdateShopperProfileDto): Promise<ShopperProfileDto> {
  const { data } = await apiClient.patch<ShopperProfileDto>("/shopper/profile", body);
  return data;
}

export async function patchShopperUsername(body: UpdateShopperUsernameDto): Promise<ShopperProfileDto> {
  const { data } = await apiClient.patch<ShopperProfileDto>("/shopper/profile/username", body);
  return data;
}

export async function patchShopperAvatar(body: UpdateShopperAvatarDto): Promise<ShopperProfileDto> {
  const { data } = await apiClient.patch<ShopperProfileDto>("/shopper/profile/avatar", body);
  return data;
}

export async function listShopperAddresses(): Promise<ShopperAddressDto[]> {
  const { data } = await apiClient.get<ShopperAddressListResponseDto | ShopperAddressDto[]>(
    "/shopper/addresses",
  );
  if (Array.isArray(data)) return data;
  return data.data ?? data.addresses ?? [];
}

export async function createShopperAddress(body: CreateShopperAddressDto): Promise<ShopperAddressDto> {
  const { data } = await apiClient.post<ShopperAddressDto>("/shopper/addresses", body);
  return data;
}

export async function getShopperAddress(addressId: string): Promise<ShopperAddressDto> {
  const { data } = await apiClient.get<ShopperAddressDto>(`/shopper/addresses/${addressId}`);
  return data;
}

export async function updateShopperAddress(
  addressId: string,
  body: UpdateShopperAddressDto,
): Promise<ShopperAddressDto> {
  const { data } = await apiClient.put<ShopperAddressDto>(`/shopper/addresses/${addressId}`, body);
  return data;
}

export async function deleteShopperAddress(addressId: string): Promise<void> {
  await apiClient.delete(`/shopper/addresses/${addressId}`);
}

export async function setDefaultShopperAddress(addressId: string): Promise<ShopperAddressDto> {
  const { data } = await apiClient.patch<ShopperAddressDto>(
    `/shopper/addresses/${addressId}/default`,
    {},
  );
  return data;
}

export async function getShopperWishlist(params?: {
  cursor?: string;
  limit?: number;
}): Promise<ShopperWishlistItemDto[]> {
  const { data } = await apiClient.get<ShopperWishlistResponseDto>("/shopper/wishlist", { params });
  return data.data ?? data.items ?? [];
}

export async function addShopperWishlistItem(body: AddShopperWishlistItemDto): Promise<ShopperWishlistItemDto> {
  const { data } = await apiClient.post<ShopperWishlistItemDto>("/shopper/wishlist", body);
  return data;
}

export async function removeShopperWishlistItem(masterSkuId: string): Promise<void> {
  await apiClient.delete(`/shopper/wishlist/${masterSkuId}`);
}

export async function clearShopperWishlist(): Promise<void> {
  await apiClient.delete("/shopper/wishlist");
}

export async function listShopperOrders(params?: { cursor?: string; limit?: number }) {
  const { data } = await apiClient.get("/shopper/orders", { params });
  return data;
}

export async function getShopperOrder(orderId: string) {
  const { data } = await apiClient.get(`/shopper/orders/${orderId}`);
  return data;
}

export async function getShopperProcurementDraft() {
  const { data } = await apiClient.get("/shopper/procurement/draft");
  return data;
}

export async function upsertShopperProcurementDraft(body: {
  items: { offerId: string; quantity: number }[];
}) {
  const { data } = await apiClient.post("/shopper/procurement/draft", body);
  return data;
}

export async function clearShopperProcurementDraft() {
  await apiClient.delete("/shopper/procurement/draft");
}

export async function submitShopperProcurement(body: unknown = {}) {
  const { data } = await apiClient.post("/shopper/procurement", body);
  return data;
}

export async function cancelShopperOrder(orderId: string) {
  const { data } = await apiClient.patch(`/shopper/orders/${orderId}/cancel`, {});
  return data;
}
