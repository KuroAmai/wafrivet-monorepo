"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminValuations } from "@/hooks/useAdminApi";
import {
  formatNgn,
  formatRelativeDate,
  formatSpeciesLabel,
  speciesFilterValue,
  SPECIES_FILTER_OPTIONS,
} from "@/lib/adminLivestock";

export default function ValuationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [cursor, setCursor] = useState<string | undefined>();

  const { data, isLoading, isError, error, refetch } = useAdminValuations({
    limit: 30,
    cursor,
    search: searchQuery.trim() || undefined,
    species: speciesFilterValue(selectedSpecies),
  });

  const rows = data?.data ?? [];

  const totalValue = useMemo(
    () => rows.reduce((sum, row) => sum + row.estimatedValueNgn, 0),
    [rows],
  );

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Herd Valuations
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Weight-based estimates — not audited appraisals
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Page Total (est.)", value: formatNgn(totalValue) },
          { label: "Animals Shown", value: String(rows.length) },
          { label: "Method", value: "Weight estimate" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              {stat.label}
            </span>
            <div className="text-[28px] font-black text-[#2D4D31] leading-none">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search WAF ID or Owner..."
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCursor(undefined);
            }}
          />
        </div>
        <select
          className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 outline-none cursor-pointer"
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
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedSpecies("All Species");
            setCursor(undefined);
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError}
          errorMessage={error instanceof Error ? error.message : undefined}
          onRetry={() => void refetch()}
          isEmpty={!isLoading && rows.length === 0}
          emptyMessage="No valuations yet. Estimates appear when animals have weight metrics recorded."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Animal & Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Valuation
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Method
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Weight / BCS
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Recorded
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((val) => (
                  <tr key={val.animalUid} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-5 py-5">
                      <div className="flex flex-col min-w-0">
                        <Link
                          href={`/admin/livestock/${val.animalUid}`}
                          className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate hover:underline"
                        >
                          {val.animalUid}
                        </Link>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {formatSpeciesLabel(val.species)} • {val.ownerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[15px] font-black text-[#2D4D31] whitespace-nowrap">
                        {formatNgn(val.estimatedValueNgn)}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border bg-amber-50 text-amber-600 border-amber-100">
                        Estimate
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">
                        {val.weightKg != null ? `${val.weightKg} kg` : "—"}
                        {val.bcs != null ? ` · BCS ${val.bcs}` : ""}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">
                        {formatRelativeDate(val.recordedAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Showing {rows.length} estimates
            </span>
            {data?.meta.hasNextPage && (
              <button
                onClick={() => setCursor(data.meta.nextCursor ?? undefined)}
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
