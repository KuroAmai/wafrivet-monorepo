"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, User, X } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminAnimals, useAdminLivestockSummary } from "@/hooks/useAdminApi";
import {
  formatNgn,
  formatRelativeDate,
  formatSpeciesLabel,
  formatStatusLabel,
  speciesBarColor,
  speciesFilterValue,
  SPECIES_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  statusFilterValue,
} from "@/lib/adminLivestock";

export function AdminLivestockRegistry() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [cursor, setCursor] = useState<string | undefined>();

  const species = speciesFilterValue(selectedSpecies);
  const status = statusFilterValue(selectedStatus);

  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useAdminLivestockSummary();

  const {
    data: animalsResponse,
    isLoading: animalsLoading,
    isError: animalsError,
    error: animalsErr,
    refetch: refetchAnimals,
  } = useAdminAnimals({
    limit: 25,
    cursor,
    search: searchQuery.trim() || undefined,
    species,
    status,
  });

  const animals = animalsResponse?.data ?? [];
  const hasNextPage = animalsResponse?.meta.hasNextPage ?? false;

  const stats = useMemo(() => {
    if (!summary) return [];
    const breakdown = summary.speciesBreakdown;
    return [
      { label: "Total", value: summary.totalAnimals.toLocaleString(), color: "bg-gray-900" },
      { label: "Cattle", value: (breakdown.CATTLE ?? 0).toLocaleString(), color: speciesBarColor("CATTLE") },
      { label: "Goats", value: (breakdown.GOAT ?? 0).toLocaleString(), color: speciesBarColor("GOAT") },
      { label: "Sheep", value: (breakdown.SHEEP ?? 0).toLocaleString(), color: speciesBarColor("SHEEP") },
    ];
  }, [summary]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSpecies("All Species");
    setSelectedStatus("All Status");
    setCursor(undefined);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Livestock Registry
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Platform-wide view of every registered animal
          </p>
        </div>
      </div>

      <ApiQueryFeedback
        isLoading={summaryLoading}
        isError={summaryError}
        onRetry={() => void refetchSummary()}
        isEmpty={false}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col items-center text-center"
            >
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                {stat.label}
              </span>
              <div className="text-[20px] font-black text-gray-900 leading-none">{stat.value}</div>
              <div className={cn("w-6 h-1 rounded-full mt-3", stat.color)} />
            </div>
          ))}
        </div>
      </ApiQueryFeedback>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by WAF ID or Owner Name..."
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCursor(undefined);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedSpecies}
            onChange={(e) => {
              setSelectedSpecies(e.target.value);
              setCursor(undefined);
            }}
          >
            {SPECIES_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCursor(undefined);
            }}
          >
            {STATUS_FILTER_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={resetFilters}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <ApiQueryFeedback
          isLoading={animalsLoading}
          isError={animalsError}
          errorMessage={animalsErr instanceof Error ? animalsErr.message : undefined}
          onRetry={() => void refetchAnimals()}
          isEmpty={!animalsLoading && animals.length === 0}
          emptyMessage="No animals found. Try adjusting filters or check back when farmers register livestock."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Animal & Taxonomy
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Status & Event
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    Valuation
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {animals.map((animal) => (
                  <tr key={animal.animalUid} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-5 py-5">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate">
                          {animal.animalUid}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {formatSpeciesLabel(animal.species)} • {animal.breed ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 flex-shrink-0">
                          <User size={12} weight="bold" />
                        </div>
                        <span className="text-[13px] font-bold text-gray-800 truncate whitespace-nowrap">
                          {animal.ownerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={cn(
                            "inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                            animal.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                              : "bg-red-50 text-red-500 border-red-100",
                          )}
                        >
                          {formatStatusLabel(animal.status)}
                        </span>
                        <span className="text-[11px] text-gray-400 font-bold whitespace-nowrap">
                          {animal.lastEventType ?? "None"}
                          {animal.ageLabel ? ` • ${animal.ageLabel}` : ""}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[14px] font-black text-[#2D4D31] whitespace-nowrap">
                        {formatNgn(animal.estimatedValueNgn)}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {animal.highAlertCount > 0 && (
                          <Link
                            href={`/admin/livestock/vitals/${animal.animalUid}`}
                            className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline"
                          >
                            Vitals
                          </Link>
                        )}
                        <Link
                          href={`/admin/livestock/${animal.animalUid}`}
                          className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline whitespace-nowrap"
                        >
                          Manage
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
              Showing {animals.length} animal{animals.length === 1 ? "" : "s"}
            </span>
            {hasNextPage && (
              <button
                onClick={() => setCursor(animalsResponse?.meta.nextCursor ?? undefined)}
                className="px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl text-[12px] font-black uppercase tracking-widest"
              >
                Load more
              </button>
            )}
          </div>
        </ApiQueryFeedback>
      </div>
    </div>
  );
}
