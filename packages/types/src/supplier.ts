export type MoneyDisplayDto = {
  kobo: string;
  naira: string;
};

export type SettlementListItemDto = {
  settlementId: string;
  orderId: string;
  orderNumber: string;
  status: string;
  grossAmount: MoneyDisplayDto;
  commissionAmount: MoneyDisplayDto;
  netAmount: MoneyDisplayDto;
  settledAt: string | null;
  createdAt: string;
};

export type SupplierWalletDto = {
  supplierId: string;
  totalEarned: MoneyDisplayDto;
  pendingPayout: MoneyDisplayDto;
  totalOrdersFulfilled: number;
  settlements: SettlementListItemDto[];
  nextCursor: string | null;
  hasNextPage: boolean;
};

export type SupplierProfileDto = {
  id: string;
  regionId?: string;
  name?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  lat?: number;
  lng?: number;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  publicBio?: string | null;
  status?: string;
  verificationNotes?: string | null;
  updatedAt?: string;
};

export type UpdateSupplierProfileDto = {
  name?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  lat?: number;
  lng?: number;
  logoUrl?: string;
  bannerUrl?: string;
  publicBio?: string;
};

export type PublicChemistListItemDto = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  logoUrl: string | null;
  bannerUrl: string | null;
  workingHours: string | null;
  isVerified: boolean;
  distanceKm?: number;
  activeOfferCount: number;
  isOpenNow?: boolean;
};

export type PublicChemistListResponseDto = {
  data: PublicChemistListItemDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};

export type PublicChemistDetailDto = PublicChemistListItemDto & {
  publicBio: string | null;
  phone: string | null;
  regionName: string;
  productCount: number;
  fulfilledOrderCount: number;
};

export type PublicChemistOfferDto = {
  id: string;
  masterSkuId: string;
  name: string;
  category: string;
  imageUrl: string | null;
  unitPrice: number;
  stockQuantity: number;
  requiresColdChain: boolean;
};

export type PublicChemistOffersResponseDto = {
  data: PublicChemistOfferDto[];
  meta: {
    nextCursor: string | null;
    hasNextPage: boolean;
  };
};

export type SupplierBrandingUploadResponseDto = {
  kind: "logo" | "banner";
  url: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
};
