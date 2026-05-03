"use client";

import { CaretLeft, IdentificationCard, SealCheck, Plus, DownloadSimple, DotsThreeVertical, Warning } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DOCUMENTS = [
  { name: "VCN Certification", id: "VCN-8821", expiry: "Jan 2028", status: "Verified" },
  { name: "Surgical Proficiency", id: "SP-991", expiry: "Dec 2026", status: "Verified" },
  { name: "Herd Health Mgmt", id: "HHM-102", expiry: "Expired", status: "Attention" },
];

export default function CredentialsPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Credentials</h1>
        <button className="w-10 h-10 rounded-xl bg-[#2D4D31] flex items-center justify-center text-white active:scale-90 transition-transform">
           <Plus size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Verification Status Banner */}
        <div className="p-8 bg-emerald-600 rounded-[40px] text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
           <div className="relative z-10 flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/30">
                 <SealCheck size={32} weight="fill" />
              </div>
              <div>
                 <h2 className="text-[20px] font-black tracking-tight leading-tight">Verified Expert</h2>
                 <p className="text-[12px] font-bold text-white/80 uppercase tracking-widest mt-1">Tier 3 Veterinary Access</p>
              </div>
           </div>
        </div>

        {/* Credentials List */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Active Licenses</h3>
           <div className="space-y-4">
              {DOCUMENTS.map((doc, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#2D4D31]/10 transition-all">
                   <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        doc.status === 'Verified' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                      )}>
                         <IdentificationCard size={28} weight="bold" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[15px] font-black text-gray-900">{doc.name}</h4>
                            {doc.status === 'Attention' && <Warning size={14} weight="fill" className="text-amber-500" />}
                         </div>
                         <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">ID: {doc.id} • Expiry: {doc.expiry}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-gray-900 flex items-center justify-center transition-all">
                         <DownloadSimple size={20} weight="bold" />
                      </button>
                      <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-gray-900 flex items-center justify-center transition-all">
                         <DotsThreeVertical size={20} weight="bold" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Trust Note */}
        <div className="p-8 bg-gray-900 rounded-[40px] text-white space-y-4">
           <p className="text-[13px] font-bold text-gray-400 leading-relaxed">
             Credentials are automatically verified against the National Veterinary Database. To update your legal status, please contact regional admin.
           </p>
           <button className="text-[13px] font-black text-emerald-400 uppercase tracking-widest hover:underline">Request Audit</button>
        </div>
      </div>
    </div>
  );
}
