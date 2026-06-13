"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, Stethoscope, X } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminDiagnoses } from "@/hooks/useAdminApi";
import { formatRelativeDate, formatSpeciesLabel } from "@/lib/adminLivestock";

const STATUS_OPTIONS = ["All Status", "ONGOING", "RESOLVED", "FOLLOWUP"];

export default function DiagnosisSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [cursor, setCursor] = useState<string | undefined>();

  const { data, isLoading, isError, error, refetch } = useAdminDiagnoses({
    limit: 30,
    cursor,
    search: searchQuery.trim() || undefined,
    status: selectedStatus === "All Status" ? undefined : selectedStatus,
  });

  const rows = data?.data ?? [];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Clinical Diagnoses
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Vet-recorded diagnoses from the herd clinical database
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Records Loaded", value: String(rows.length) },
          { label: "Source", value: "diagnoses table" },
          { label: "Type", value: "Clinical visits" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
              {stat.label}
            </span>
            <div className="text-[28px] font-black text-gray-900 leading-none">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by WAF ID, diagnosis, or owner..."
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
          value={selectedStatus}
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCursor(undefined);
          }}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All Status" ? s : s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Status");
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
          emptyMessage="No diagnoses yet. Clinical diagnosis records will appear as vets log visits."
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Animal & Owner
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Visit
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Diagnosis
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Attending Vet
                  </th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {rows.map((row) => (
                  <tr key={row.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-5 py-5">
                      <div className="flex flex-col min-w-0">
                        <Link
                          href={`/admin/livestock/${row.animalUid}`}
                          className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate hover:underline"
                        >
                          {row.animalUid}
                        </Link>
                        <span className="text-[11px] text-gray-400 font-medium truncate">
                          {formatSpeciesLabel(row.species)} • {row.ownerName}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[13px] font-bold text-gray-600">{row.visitType}</span>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[14px] font-bold text-gray-900 leading-none truncate">
                          {row.diagnosisLabel ?? "—"}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                            row.status === "ONGOING"
                              ? "bg-orange-50 text-orange-500 border-orange-100"
                              : row.status === "RESOLVED"
                                ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                                : "bg-blue-50 text-blue-500 border-blue-100",
                          )}
                        >
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <Stethoscope size={14} className="text-purple-500" />
                        <span className="text-[13px] font-bold text-gray-600">
                          {row.attendingVetName ?? "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-right">
                      <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">
                        {formatRelativeDate(row.visitDate)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Showing {rows.length} records
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
