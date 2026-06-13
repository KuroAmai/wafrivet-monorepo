"use client";

import { use } from "react";
import Link from "next/link";
import {
  CaretLeft,
  Tag,
  User,
  MapPin,
  Calendar,
  ShieldCheck,
  FirstAid,
  HandCoins,
  WarningCircle,
} from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminAnimal, useAdminAnimalClinical } from "@/hooks/useAdminApi";
import {
  formatNgn,
  formatRelativeDate,
  formatSpeciesLabel,
  formatStatusLabel,
} from "@/lib/adminLivestock";

export default function AnimalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: animal, isLoading, isError, refetch } = useAdminAnimal(id);
  const { data: clinical } = useAdminAnimalClinical(id);

  const highAlerts = animal?.alerts.filter((a) => a.severity === "HIGH") ?? [];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/livestock"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
            <CaretLeft size={18} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-widest">Back to Registry</span>
        </Link>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !animal}
        emptyMessage="Animal not found. This WAF ID may have been removed or is invalid."
      >
        {animal && (
          <>
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
              <div className="w-40 h-40 rounded-[48px] bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2D4D31] shadow-inner flex-shrink-0">
                <Tag size={64} weight="duotone" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <div className="flex flex-col">
                    <h1 className="text-[36px] font-black text-gray-900 tracking-tight leading-none mb-2">
                      {animal.animalUid}
                    </h1>
                    <p className="text-[14px] text-gray-400 font-bold uppercase tracking-widest">
                      {formatSpeciesLabel(animal.species)} • {animal.breed ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider border",
                        animal.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                          : "bg-red-50 text-red-500 border-red-100",
                      )}
                    >
                      {formatStatusLabel(animal.status)}
                    </span>
                    {animal.ageLabel && (
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                        {animal.ageLabel}
                      </span>
                    )}
                    {highAlerts.length > 0 && (
                      <Link
                        href={`/admin/livestock/vitals/${animal.animalUid}`}
                        className="px-4 py-1.5 bg-orange-50 text-orange-500 border border-orange-100 rounded-xl text-[11px] font-black uppercase tracking-wider"
                      >
                        {highAlerts.length} High Alert{highAlerts.length > 1 ? "s" : ""}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                  <div className="flex items-center gap-3.5 text-gray-500 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                      <User size={20} weight="bold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Owner
                      </span>
                      <Link
                        href={`/admin/users/${animal.ownerId}`}
                        className="text-[14px] font-bold text-gray-900 whitespace-nowrap hover:underline"
                      >
                        {animal.ownerName}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 text-gray-500 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                      <MapPin size={20} weight="bold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Farm
                      </span>
                      <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                        {animal.farmName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 text-gray-500 group">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                      <Calendar size={20} weight="bold" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                        Registered
                      </span>
                      <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                        {new Date(animal.registeredAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                        <FirstAid size={24} weight="duotone" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Clinical Records
                        </span>
                        <p className="text-[24px] font-black text-gray-900 leading-none">
                          {animal.clinicalCounts.vaccinations +
                            animal.clinicalCounts.treatments +
                            animal.clinicalCounts.diagnoses +
                            animal.clinicalCounts.deworming}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                      {animal.clinicalCounts.vaccinations} vaccinations ·{" "}
                      {animal.clinicalCounts.treatments} treatments
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                        <HandCoins size={24} weight="duotone" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                          Est. Valuation
                        </span>
                        <p className="text-[24px] font-black text-gray-900 leading-none">
                          {formatNgn(animal.estimatedValueNgn)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">
                      Weight-based estimate
                    </span>
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">
                    Latest Vitals
                  </h3>
                  {animal.latestVitals ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                      <div className="flex flex-col gap-1 text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Weight
                        </span>
                        <span className="text-[18px] font-black text-gray-900">
                          {animal.latestVitals.weightKg != null
                            ? `${animal.latestVitals.weightKg} kg`
                            : "—"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          BCS
                        </span>
                        <span className="text-[18px] font-black text-gray-900">
                          {animal.latestVitals.bcs ?? "—"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 text-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Recorded
                        </span>
                        <span className="text-[14px] font-bold text-gray-600">
                          {formatRelativeDate(animal.latestVitals.recordedAt)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-400 font-medium">No vitals recorded yet.</p>
                  )}
                </div>

                {animal.alerts.length > 0 && (
                  <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                    <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-6 flex items-center gap-2">
                      <WarningCircle size={20} className="text-orange-500" />
                      Active Alerts
                    </h3>
                    <div className="space-y-3">
                      {animal.alerts.map((alert, i) => (
                        <div
                          key={i}
                          className={cn(
                            "p-4 rounded-2xl border text-[13px] font-medium",
                            alert.severity === "HIGH"
                              ? "bg-red-50 border-red-100 text-red-700"
                              : alert.severity === "MEDIUM"
                                ? "bg-orange-50 border-orange-100 text-orange-700"
                                : "bg-gray-50 border-gray-100 text-gray-600",
                          )}
                        >
                          {alert.message}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-10">
                <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                  <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">
                    Clinical Timeline
                  </h3>
                  {clinical?.events.length ? (
                    <div className="space-y-10 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                      {clinical.events.slice(0, 10).map((item) => (
                        <div key={item.id} className="relative pl-10">
                          <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-[#2D4D31] rounded-full z-10" />
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">
                              {formatRelativeDate(item.occurredAt)}
                            </span>
                            <p className="text-[15px] font-bold text-gray-900 leading-tight">
                              {item.title}
                            </p>
                            {item.actorLabel && (
                              <span className="text-[12px] text-gray-500 font-medium">
                                Logged by {item.actorLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-400 font-medium">No clinical events yet.</p>
                  )}
                </div>

                <div className="flex items-center gap-3 text-emerald-500 px-4">
                  <ShieldCheck size={20} weight="fill" />
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    Platform Registry Asset
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </ApiQueryFeedback>
    </div>
  );
}
