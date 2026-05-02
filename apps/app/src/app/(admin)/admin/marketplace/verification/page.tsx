"use client";

import { useState } from "react";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Storefront,
  User,
  ArrowRight,
  MagnifyingGlass,
  DownloadSimple,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PENDING_CHEMISTS = [
  { id: 1, business: "Lekki Pharma", owner: "Sarah Ahmed", phone: "+234 802 345 6789", state: "Lagos", applied: "May 12, 2024", docs: 3 },
  { id: 2, business: "City Agro & Vet", owner: "John Dagogo", phone: "+234 803 456 7890", state: "Oyo", applied: "May 11, 2024", docs: 2 },
  { id: 3, business: "Northside Meds", owner: "Musa Ibrahim", phone: "+234 804 567 8901", state: "Kaduna", applied: "May 10, 2024", docs: 4 },
];

const VERIFIED_CHEMISTS = [
  { id: 4, business: "Pharmacy Plus", owner: "Emeka Obi", phone: "+234 801 234 5678", state: "Lagos", verifiedDate: "May 01, 2024" },
  { id: 5, business: "AgroDirect", owner: "Dr. Adebayo", phone: "+234 805 678 9012", state: "Oyo", verifiedDate: "Apr 28, 2024" },
];

export default function ChemistVerificationPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "verified">("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPending = PENDING_CHEMISTS.filter(c => 
    c.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVerified = VERIFIED_CHEMISTS.filter(c => 
    c.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = activeTab === "pending" ? filteredPending : filteredVerified;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Chemist Verification</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Review and approve NAFDAC certifications for marketplace access</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Report
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Pending", value: PENDING_CHEMISTS.length, sub: "Review required", color: "orange" },
          { label: "Verified", value: VERIFIED_CHEMISTS.length, sub: "Marketplace active", color: "emerald" },
          { label: "Rejected", value: "14", sub: "Last 30 days", color: "red" },
          { label: "Avg Review", value: "1.2d", sub: "Platform speed", color: "gray" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "orange" ? "text-orange-500" :
              stat.color === "red" ? "text-red-500" : "text-gray-900"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button 
            onClick={() => setActiveTab("pending")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all flex items-center gap-3",
              activeTab === "pending" ? "bg-white text-[#2D4D31] shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            Pending Review 
            <span className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black",
              activeTab === "pending" ? "bg-[#2D4D31] text-white" : "bg-gray-200 text-gray-500"
            )}>{PENDING_CHEMISTS.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab("verified")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all flex items-center gap-3",
              activeTab === "verified" ? "bg-white text-[#2D4D31] shadow-sm" : "text-gray-400 hover:text-gray-600"
            )}
          >
            Verified Chemists
            <span className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black",
              activeTab === "verified" ? "bg-[#2D4D31] text-white" : "bg-gray-200 text-gray-500"
            )}>{VERIFIED_CHEMISTS.length}</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#2D4D31]/20 transition-all shadow-sm">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search business or owner..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-red-500">
              <X size={16} weight="bold" />
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Business & Ownership</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Location</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{activeTab === "pending" ? "Application Timeline" : "Verification Log"}</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Documentation</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentData.map((chemist) => (
                <tr key={chemist.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm flex-shrink-0">
                        <Storefront size={18} weight="duotone" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate">{chemist.business}</span>
                        <span className="text-[11px] text-gray-400 font-medium truncate">{chemist.owner}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{chemist.state} State</span>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[13px] font-medium text-gray-400 whitespace-nowrap">
                      {activeTab === "pending" ? (chemist as any).applied : (chemist as any).verifiedDate}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    {activeTab === "pending" ? (
                      <button className="flex items-center gap-2 text-[#2D4D31] bg-[#2D4D31]/5 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-tight hover:bg-[#2D4D31]/10 transition-colors whitespace-nowrap">
                        <FileText size={14} weight="bold" /> {(chemist as any).docs} Required Files
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-emerald-500">
                        <CheckCircle size={14} weight="fill" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Verified Pass</span>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-5 text-right">
                    {activeTab === "pending" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button className="bg-[#2D4D31] text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-sm">
                          Approve
                        </button>
                        <button className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                          <XCircle size={18} weight="bold" />
                        </button>
                      </div>
                    ) : (
                      <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500 transition-colors">
                        Revoke Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
