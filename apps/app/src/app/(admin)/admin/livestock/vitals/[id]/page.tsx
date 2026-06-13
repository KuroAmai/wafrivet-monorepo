"use client";

import { use } from "react";
import Link from "next/link";
import {
  CaretLeft,
  Thermometer,
  FirstAid,
  ArrowRight,
  Warning,
} from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminAnimalVitals } from "@/hooks/useAdminApi";
import { formatRelativeDate, formatSpeciesLabel } from "@/lib/adminLivestock";

export default function VitalsManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError, refetch } = useAdminAnimalVitals(id);

  const highAlerts = data?.alerts.filter((a) => a.severity === "HIGH") ?? [];
  const primaryAlert = highAlerts[0];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href="/admin/livestock"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all bg-white/50">
            <CaretLeft size={20} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">Registry</span>
        </Link>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !data}
        emptyMessage="Animal not found."
      >
        {data && (
          <>
            <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
              <div
                className={cn(
                  "absolute top-0 left-0 w-2 h-full",
                  highAlerts.length > 0 ? "bg-red-500" : "bg-emerald-500",
                )}
              />
              <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
                <div
                  className={cn(
                    "w-28 h-28 rounded-[36px] flex items-center justify-center shadow-inner",
                    highAlerts.length > 0 ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500",
                  )}
                >
                  <Thermometer size={56} weight="duotone" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                    {highAlerts.length > 0 ? (
                      <span className="px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" /> Critical Alert
                      </span>
                    ) : (
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                        No critical alerts
                      </span>
                    )}
                  </div>
                  <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">
                    {primaryAlert?.message ?? "Vitals Overview"}
                  </h1>
                  <p className="text-[16px] text-gray-400 font-medium">
                    {data.animalUid} · {formatSpeciesLabel(data.species)} · {data.farmName}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Current Weight
                    </span>
                    <div className="text-[32px] font-black leading-none mb-2 text-gray-900">
                      {data.latestVitals?.weightKg != null ? `${data.latestVitals.weightKg} kg` : "—"}
                    </div>
                    <div className="text-[11px] font-bold text-gray-400">
                      Baseline avg: {data.baselines.avgWeightKg != null ? `${data.baselines.avgWeightKg} kg` : "—"}
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Body Condition
                    </span>
                    <div className="text-[32px] font-black leading-none mb-2 text-gray-900">
                      {data.latestVitals?.bcs ?? "—"}
                    </div>
                    <div className="text-[11px] font-bold text-gray-400">
                      Baseline avg: {data.baselines.avgBcs ?? "—"}
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                      Last Recorded
                    </span>
                    <div className="text-[18px] font-black leading-none mb-2 text-gray-900">
                      {formatRelativeDate(data.latestVitals?.recordedAt)}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                  <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">
                    Vitals History
                  </h3>
                  {data.history.length > 0 ? (
                    <div className="space-y-4">
                      {data.history.map((point) => (
                        <div
                          key={point.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100"
                        >
                          <div>
                            <p className="text-[14px] font-bold text-gray-900">
                              {point.weightKg != null ? `${point.weightKg} kg` : "—"}
                              {point.bcs != null ? ` · BCS ${point.bcs}` : ""}
                            </p>
                            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                              {point.method ?? "Recorded"}
                            </p>
                          </div>
                          <span className="text-[13px] font-bold text-gray-500">
                            {formatRelativeDate(point.recordedAt)}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-400 font-medium">No vitals history yet.</p>
                  )}
                </div>

                {data.alerts.length > 0 && (
                  <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                    <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-6 flex items-center gap-2">
                      <Warning size={20} className="text-orange-500" />
                      Active Alerts
                    </h3>
                    <div className="space-y-3">
                      {data.alerts.map((alert, i) => (
                        <div
                          key={i}
                          className={cn(
                            "p-4 rounded-2xl border text-[13px] font-medium",
                            alert.severity === "HIGH"
                              ? "bg-red-50 border-red-100 text-red-700"
                              : "bg-orange-50 border-orange-100 text-orange-700",
                          )}
                        >
                          {alert.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-4 space-y-10">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400">
                    Subject Profile
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-[#2D4D31] shadow-inner">
                      <FirstAid size={28} weight="duotone" />
                    </div>
                    <div>
                      <h4 className="text-[20px] font-black text-gray-900 tracking-tight leading-none mb-1">
                        {data.animalUid}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                        {formatSpeciesLabel(data.species)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold uppercase tracking-[0.1em] text-[8px] mb-1">
                        OWNER
                      </span>
                      <span className="text-gray-900 font-bold text-[13px]">{data.ownerName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-400 font-bold uppercase tracking-[0.1em] text-[8px] mb-1">
                        FARM
                      </span>
                      <span className="text-gray-900 font-bold text-[13px] truncate">{data.farmName}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/livestock/${data.animalUid}`}
                    className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    View Full Registry <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </ApiQueryFeedback>
    </div>
  );
}
