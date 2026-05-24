export type ShopperAddressType = "home" | "work" | "other";

export type ShopperActorDto = {
  actorUserId: string;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
};

export type ShopperProfileDto = {
  id?: string;
  userId?: string;
  username?: string | null;
  avatarUrl?: string | null;
  displayName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  regionId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateShopperProfileDto = {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  regionId?: string;
};

export type UpdateShopperUsernameDto = {
  username: string;
  actor?: ShopperActorDto;
};

export type UpdateShopperAvatarDto = {
  avatarUrl: string;
  actor?: ShopperActorDto;
};

export type ShopperAddressDto = {
  id: string;
  label?: string;
  type?: ShopperAddressType;
  fullAddress: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  deliveryInstructions?: string;
  isDefault?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateShopperAddressDto = {
  label?: string;
  type?: ShopperAddressType;
  fullAddress: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  lat?: number;
  lng?: number;
  phone?: string;
  deliveryInstructions?: string;
  isDefault?: boolean;
  actor?: ShopperActorDto;
};

export type UpdateShopperAddressDto = Omit<CreateShopperAddressDto, "actor"> & {
  actor?: ShopperActorDto;
};

export type ShopperAddressListResponseDto = {
  data?: ShopperAddressDto[];
  addresses?: ShopperAddressDto[];
};

export type ShopperWishlistItemDto = {
  masterSkuId: string;
  productName?: string;
  name?: string;
  imageUrl?: string;
  price?: number;
  addedAt?: string;
};

export type ShopperWishlistResponseDto = {
  data?: ShopperWishlistItemDto[];
  items?: ShopperWishlistItemDto[];
  meta?: {
    nextCursor?: string | null;
    hasNextPage?: boolean;
  };
};

export type AddShopperWishlistItemDto = {
  masterSkuId: string;
  actor?: ShopperActorDto;
};
