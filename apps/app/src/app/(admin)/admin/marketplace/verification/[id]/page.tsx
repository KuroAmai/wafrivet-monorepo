"use client";

import { use, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CaretLeft,
  ShieldCheck,
  IdentificationCard,
  FileMagnifyingGlass,
  CheckCircle,
  XCircle,
  MapPin,
  Storefront,
  Calendar,
  SealCheck,
  Warning,
  Certificate,
  Briefcase,
} from "@phosphor-icons/react";
import Link from "next/link";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import {
  useAdminOversightSuppliers,
  useAdminUser,
  useVerifyOversightSupplier,
} from "@/hooks/useAdminApi";

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ChemistVerificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data: suppliersData, isLoading, isError, error, refetch } =
    useAdminOversightSuppliers({ limit: 100 });

  const supplier = useMemo(
    () => suppliersData?.data.find((s) => s.id === id),
    [suppliersData, id],
  );

  const { data: userDetail } = useAdminUser(supplier?.userId ?? "");
  const verifyMutation = useVerifyOversightSupplier();

  const proprietor =
    supplier?.ownerName ??
    ([userDetail?.firstName, userDetail?.lastName].filter(Boolean).join(" ") || "—");

  const documents = [
    {
      name: "NAFDAC License",
      status: supplier?.nafdacLicense ? "Verified" : "Pending",
      date: formatDate(supplier?.submittedAt),
      type: "License",
      value: supplier?.nafdacLicense,
    },
    {
      name: "Business Incorporation (CAC)",
      status: supplier?.cacNumber ? "Verified" : "Pending",
      date: formatDate(supplier?.submittedAt),
      type: "Registration",
      value: supplier?.cacNumber,
    },
  ];

  const handleVerify = (action: "approve" | "reject") => {
    verifyMutation.mutate(
      { supplierId: id, action },
      {
        onSuccess: () => {
          router.push("/admin/marketplace/verification");
        },
      },
    );
  };

  const isPending = supplier?.status === "pending";

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href="/admin/marketplace/verification"
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all bg-white/50">
            <CaretLeft size={20} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">
            Chemist Verification
          </span>
        </Link>

        {isPending && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleVerify("reject")}
              disabled={verifyMutation.isPending}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all shadow-sm disabled:opacity-50"
            >
              <XCircle size={18} weight="bold" /> Reject Application
            </button>
            <button
              onClick={() => handleVerify("approve")}
              disabled={verifyMutation.isPending}
              className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/10 ml-2 disabled:opacity-50"
            >
              <CheckCircle size={18} weight="bold" /> Approve Access
            </button>
          </div>
        )}
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError || (!isLoading && !supplier)}
        errorMessage={
          !supplier && !isLoading
            ? "Supplier not found"
            : (error as Error)?.message
        }
        isEmpty={false}
        onRetry={() => refetch()}
      />

      {supplier && (
        <>
          <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
            <div
              className={cn(
                "absolute top-0 left-0 w-2 h-full",
                isPending ? "bg-orange-500" : "bg-emerald-500",
              )}
            />
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="w-28 h-28 rounded-[36px] bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                <Storefront size={56} weight="duotone" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />{" "}
                    {isPending ? "Compliance Review" : "Verified Supplier"}
                  </span>
                  <span className="px-4 py-1.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                    <SealCheck size={12} weight="fill" /> {supplier.status}
                  </span>
                </div>
                <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">
                  {supplier.name}
                </h1>
                <p className="text-[16px] text-gray-400 font-medium">
                  {supplier.address} · {supplier.regionName} · Registered by {proprietor}
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">
                  Applied
                </span>
                <div className="text-[32px] font-black text-emerald-500 tracking-tight leading-none">
                  {formatDate(supplier.submittedAt)}
                </div>
                {supplier.kycVerifiedAt && (
                  <div className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest text-right">
                    Verified {formatDate(supplier.kycVerifiedAt)}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-10">
              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">
                  Compliance Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="p-6 bg-gray-50 rounded-[32px] border border-gray-50 hover:border-[#2D4D31]/20 transition-all group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] shadow-sm transition-all">
                          <Certificate size={24} weight="bold" />
                        </div>
                        <span
                          className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                            doc.status === "Verified"
                              ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                              : "bg-orange-50 text-orange-500 border-orange-100",
                          )}
                        >
                          {doc.status}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">{doc.name}</h4>
                      <p className="text-[13px] text-gray-500 font-medium">
                        {doc.value ?? "Not provided"}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          {doc.type} • Updated {doc.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">
                  Operational Context
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Business Type
                    </span>
                    <p className="text-[18px] font-bold text-gray-900">
                      {userDetail?.entity.title ?? "Supplier"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 border-x border-gray-50 px-8">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      KYC Status
                    </span>
                    <p className="text-[18px] font-bold text-emerald-500 uppercase">
                      {userDetail?.entity.kycStatus ?? supplier.status}
                    </p>
                    <span className="text-[11px] font-bold text-gray-400">
                      {supplier.regionName}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Contact
                    </span>
                    <p className="text-[18px] font-bold text-gray-900">{supplier.phone}</p>
                    <span className="text-[11px] font-bold text-gray-400 italic">
                      {userDetail?.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">
                  Verification Audit Log
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      label: "Application Submitted",
                      time: formatDate(supplier.submittedAt),
                      actor: supplier.name,
                      icon: Calendar,
                    },
                    ...(supplier.kycVerifiedAt
                      ? [
                          {
                            label: "KYC Verified",
                            time: formatDate(supplier.kycVerifiedAt),
                            actor: "Admin",
                            icon: ShieldCheck,
                          },
                        ]
                      : []),
                    ...(supplier.verificationNotes
                      ? [
                          {
                            label: "Verification Notes",
                            time: formatDate(supplier.submittedAt),
                            actor: supplier.verificationNotes,
                            icon: IdentificationCard,
                          },
                        ]
                      : []),
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                        <log.icon size={20} weight="bold" />
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-gray-900 leading-none mb-1">
                          {log.label}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                          {log.time} · {log.actor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400">
                  Licensed Professional
                </h3>
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
                    <Briefcase size={28} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-1">
                      {proprietor}
                    </h4>
                    <p className="text-[10px] text-[#2D4D31] font-black uppercase tracking-widest">
                      {userDetail?.entity.verificationLabel ?? "Supplier Account"}
                    </p>
                  </div>
                </div>
                {userDetail?.entity.stats.map((stat) => (
                  <div
                    key={stat.key}
                    className="flex items-center justify-between py-3 border-t border-gray-50"
                  >
                    <span className="text-[11px] font-bold text-gray-400">{stat.label}</span>
                    <span className="text-[13px] font-black text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/40">
                  Marketplace SOPs
                </h3>
                <div className="space-y-2">
                  <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-start px-5 gap-3">
                    <FileMagnifyingGlass size={18} /> Request More Docs
                  </button>
                  <button className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-start px-5 gap-3">
                    <MapPin size={18} /> Schedule Site Visit
                  </button>
                </div>
              </div>

              {supplier.verificationNotes && (
                <div className="bg-red-50 p-8 rounded-[40px] border border-red-100 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-4">
                    <Warning size={24} weight="fill" />
                  </div>
                  <h4 className="text-[15px] font-black text-gray-900 mb-2">Verification Notes</h4>
                  <p className="text-[11px] text-gray-500 font-medium">{supplier.verificationNotes}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
