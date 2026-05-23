"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RegionDto } from "@wafrivet/types";
import {
  parseRegionList,
  readStoredRegion,
  regionToSelection,
  writeStoredRegion,
  type ShopRegionSelection,
} from "@/lib/shopLocation";

type ShopLocationContextValue = {
  region: ShopRegionSelection | null;
  regions: RegionDto[];
  isLoading: boolean;
  error: string | null;
  setRegion: (selection: ShopRegionSelection) => void;
  openPicker: () => void;
  closePicker: () => void;
  isPickerOpen: boolean;
  refetchRegions: () => Promise<void>;
};

const ShopLocationContext = createContext<ShopLocationContextValue | null>(null);

export function ShopLocationProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<ShopRegionSelection | null>(null);
  const [regions, setRegions] = useState<RegionDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const loadRegions = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/regions?limit=100");
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((body as { message?: string }).message ?? "Could not load regions");
      }
      const list = parseRegionList(body).filter((r) => r.isActive !== false);
      setRegions(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load regions");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = readStoredRegion();
    if (stored) setRegionState(stored);
    setHydrated(true);
    void loadRegions();
  }, [loadRegions]);

  useEffect(() => {
    if (!hydrated || region || regions.length === 0) return;
    const first = regions[0];
    if (first) {
      const selection = regionToSelection(first);
      setRegionState(selection);
      writeStoredRegion(selection);
    }
  }, [hydrated, region, regions]);

  const setRegion = useCallback((selection: ShopRegionSelection) => {
    setRegionState(selection);
    writeStoredRegion(selection);
    setIsPickerOpen(false);
  }, []);

  const value = useMemo<ShopLocationContextValue>(
    () => ({
      region,
      regions,
      isLoading,
      error,
      setRegion,
      openPicker: () => setIsPickerOpen(true),
      closePicker: () => setIsPickerOpen(false),
      isPickerOpen,
      refetchRegions: loadRegions,
    }),
    [region, regions, isLoading, error, setRegion, isPickerOpen, loadRegions],
  );

  return (
    <ShopLocationContext.Provider value={value}>{children}</ShopLocationContext.Provider>
  );
}

export function useShopLocation(): ShopLocationContextValue {
  const ctx = useContext(ShopLocationContext);
  if (!ctx) {
    throw new Error("useShopLocation must be used within ShopLocationProvider");
  }
  return ctx;
}
