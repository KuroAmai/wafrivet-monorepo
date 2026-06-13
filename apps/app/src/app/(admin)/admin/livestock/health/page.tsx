"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, Heartbeat, Stethoscope, Tag, X } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminHealthEvents } from "@/hooks/useAdminApi";
import {
  formatRelativeDate,
  formatSpeciesLabel,
  speciesFilterValue,
  SPECIES_FILTER_OPTIONS,
} from "@/lib/adminLivestock";

const EVENT_TYPE_OPTIONS = ["All Events", "VACCINATION", "TREATMENT", "DEWORMING", "DIAGNOSIS", "VITALS"];

export default function HealthEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Events");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [cursor, setCursor] = useState<string | undefined>();

  const { data, isLoading, isError, error, refetch } = useAdminHealthEvents({
    limit: 30,
    cursor,
    search: searchQuery.trim() || undefined,
    eventType: selectedType === "All Events" ? undefined : selectedType,
    species: speciesFilterValue(selectedSpecies),
  });

  const events = data?.data ?? [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Health Events
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Clinical and management events across the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Events Loaded", value: String(events.length), icon: Heartbeat, color: "emerald" },
          { label: "Source", value: "Clinical DB", icon: Tag, color: "blue" },
          { label: "Coverage", value: "Cross-farm", icon: Stethoscope, color: "purple" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              {stat.label}
            </span>
            <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-3">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by WAF ID, owner, or details..."
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
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
            setCursor(undefined);
          }}
        >
          {EVENT_TYPE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All Events" ? s : s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
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
            setSelectedType("All Events");
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
          isEmpty={!isLoading && events.length === 0}
          emptyMessage="No health events yet. Clinical events will appear as farmers and vets log records."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Animal & Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Event Type
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Logged By
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Clinical Details
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Timeline
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {events.map((event) => (
                  <tr key={event.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-5 py-5">
                      <div className="flex flex-col min-w-0">
                        <Link
                          href={`/admin/livestock/${event.animalUid}`}
                          className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate hover:underline"
                        >
                          {event.animalUid}
                        </Link>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {formatSpeciesLabel(event.species)} • {event.ownerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                          event.eventType === "TREATMENT"
                            ? "bg-red-50 text-red-500 border-red-100"
                            : event.eventType === "VACCINATION"
                              ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                              : event.eventType === "VITALS"
                                ? "bg-orange-50 text-orange-500 border-orange-100"
                                : "bg-gray-50 text-gray-500 border-gray-100",
                        )}
                      >
                        {event.eventType}
                      </span>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[13px] font-bold text-gray-900">
                        {event.loggedBy ?? "—"}
                      </span>
                    </td>
                    <td className="px-5 py-5 min-w-[150px]">
                      <p className="text-[13px] font-medium text-gray-500 max-w-[240px] truncate">
                        {event.summary}
                      </p>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">
                        {formatRelativeDate(event.occurredAt)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Showing {events.length} events
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
