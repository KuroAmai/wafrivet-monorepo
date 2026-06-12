export type MarketRangeDto = {
  masterSkuId: string;
  floorPrice: number | null;
  averagePrice: number | null;
  premiumPrice: number | null;
  offerCount: number;
};

export type OfferComparisonDto = {
  id: string;
  supplierId: string;
  supplierName: string;
  supplierRegion?: string;
  masterSkuId: string;
  unitPrice: number;
  stockQuantity: number;
  minOrderQty?: number;
  pricePosition?: string;
};

export type PriceComparisonResponseDto = {
  masterSkuId: string;
  masterSkuName: string;
  requiresColdChain?: boolean;
  priceRange?: {
    floorPrice?: number | null;
    averagePrice?: number | null;
    premiumPrice?: number | null;
    offerCount?: number;
  };
  offers: OfferComparisonDto[];
};
