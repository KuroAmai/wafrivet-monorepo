import type { RegionDto } from "@wafrivet/types";

export const SHOP_REGION_STORAGE_KEY = "wafrivet_shop_region";

export type ShopRegionSelection = {
  regionId: string;
  regionName: string;
  defaultDeliveryFee?: number;
};

export function parseRegionList(payload: unknown): RegionDto[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as { data?: RegionDto[]; regions?: RegionDto[] };
  return data.data ?? data.regions ?? [];
}

export function readStoredRegion(): ShopRegionSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SHOP_REGION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ShopRegionSelection;
    if (parsed?.regionId && parsed?.regionName) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeStoredRegion(region: ShopRegionSelection): void {
  localStorage.setItem(SHOP_REGION_STORAGE_KEY, JSON.stringify(region));
}

export function regionToSelection(r: RegionDto): ShopRegionSelection {
  return {
    regionId: r.id,
    regionName: r.name,
    defaultDeliveryFee: r.defaultDeliveryFee,
  };
}
