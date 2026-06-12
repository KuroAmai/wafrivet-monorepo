import type { MarketRangeDto, PriceComparisonResponseDto } from "@wafrivet/types";
import { apiClient } from "../client";

export async function getMarketRange(masterSkuId: string): Promise<MarketRangeDto> {
  const { data } = await apiClient.get<MarketRangeDto>(`/market/range/${masterSkuId}`);
  return data;
}

export async function compareCatalogItem(masterSkuId: string): Promise<PriceComparisonResponseDto> {
  const { data } = await apiClient.get<PriceComparisonResponseDto>(`/catalog/${masterSkuId}/compare`);
  return data;
}

/** Picks the cheapest in-stock offer eligible for purchase. */
export function pickCheapestOffer(comparison: PriceComparisonResponseDto) {
  const eligible = comparison.offers.filter((o) => o.stockQuantity > 0);
  if (!eligible.length) return null;
  return eligible.reduce((best, o) => (o.unitPrice < best.unitPrice ? o : best));
}
