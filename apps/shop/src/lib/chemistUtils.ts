import type { PublicChemistListItemDto } from "@wafrivet/types";

export const CHEMIST_PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400";

export const CHEMIST_BANNER_PLACEHOLDER =
  "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1200";

export function getChemistCardImage(
  chemist: Pick<PublicChemistListItemDto, "bannerUrl" | "logoUrl">,
): string {
  return chemist.bannerUrl ?? chemist.logoUrl ?? CHEMIST_PLACEHOLDER_IMAGE;
}

export function getChemistLogoImage(
  chemist: Pick<PublicChemistListItemDto, "logoUrl" | "bannerUrl" | "name">,
): string {
  return chemist.logoUrl ?? chemist.bannerUrl ?? CHEMIST_PLACEHOLDER_IMAGE;
}

export function formatDistanceKm(distanceKm?: number): string | null {
  if (distanceKm === undefined || Number.isNaN(distanceKm)) {
    return null;
  }
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
}

export function formatOfferPrice(unitPrice: number): string {
  return `₦${unitPrice.toLocaleString()}`;
}
