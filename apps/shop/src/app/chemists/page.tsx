"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { MapboxView } from "@/components/shop/MapboxView";
import { CaretLeft, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { usePublicChemists } from "@/hooks/useShopApi";
import { formatDistanceKm, getChemistCardImage } from "@/lib/chemistUtils";
import type { PublicChemistListItemDto } from "@wafrivet/types";

export default function ChemistsPage() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: chemists, isLoading, isError, error, refetch } = usePublicChemists({
    limit: 50,
    search: search.trim() || undefined,
  });

  const filteredChemists = useMemo(() => {
    const list = chemists ?? [];
    if (!search.trim()) {
      return list;
    }
    const term = search.trim().toLowerCase();
    return list.filter(
      (chemist) =>
        chemist.name.toLowerCase().includes(term) ||
        chemist.address.toLowerCase().includes(term),
    );
  }, [chemists, search]);

  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB]">
      <ShopNavbar />

      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        <div className="w-full md:w-[360px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <CaretLeft size={20} weight="bold" />
            </Link>
            <h1 className="text-[20px] font-black text-gray-900 tracking-tight">Nearby Chemists</h1>
          </div>

          <div className="flex gap-2 mb-2">
            <div className="flex-1 relative">
              <MagnifyingGlass
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chemists..."
                className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 outline-none focus:border-[#2D4D31] text-[14px]"
              />
            </div>
            <button type="button" className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-600">
              <Funnel size={20} />
            </button>
          </div>

          <ApiQueryFeedback
            isLoading={isLoading}
            isError={isError}
            errorMessage={(error as Error)?.message}
            isEmpty={!isLoading && !isError && !filteredChemists.length}
            onRetry={() => refetch()}
          />

          {filteredChemists.map((chemist: PublicChemistListItemDto) => {
            const distance = formatDistanceKm(chemist.distanceKm);
            const status =
              chemist.isOpenNow === undefined
                ? "View hours"
                : chemist.isOpenNow
                  ? "Open Now"
                  : "Closed";

            return (
              <Link
                key={chemist.id}
                href={`/chemists/${chemist.id}`}
                onMouseEnter={() => setSelectedId(chemist.id)}
                className={`bg-white p-4 rounded-3xl border transition-all group cursor-pointer shadow-sm ${
                  selectedId === chemist.id
                    ? "border-[#2D4D31]/30"
                    : "border-gray-100 hover:border-[#2D4D31]/10"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={getChemistCardImage(chemist)}
                    className="w-16 h-16 rounded-2xl object-cover"
                    alt={chemist.name}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-[15px]">{chemist.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {distance ? (
                        <span className="text-[12px] text-gray-500 font-medium">{distance}</span>
                      ) : null}
                      <span
                        className={`text-[11px] font-bold ${status === "Open Now" ? "text-green-600" : "text-gray-400"}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex-1 h-[400px] md:h-full">
          <MapboxView chemists={filteredChemists} selectedId={selectedId} />
        </div>
      </main>
    </div>
  );
}
