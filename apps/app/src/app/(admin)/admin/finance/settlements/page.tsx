"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Buildings,
  Storefront,
  Money,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SETTLEMENTS_DATA = [
  { entity: "Pharmacy Plus", type: "Chemist", pending: "₦420,500", last: "₦380,000", frequency: "Weekly", next: "May 16, 2024", status: "Scheduled" },
  { entity: "AgroDirect Ltd", type: "Distributor", pending: "₦1,240,000", last: "₦1,100,000", frequency: "Daily", next: "May 13, 2024", status: "Processing" },
  { entity: "Lekki Pharma", type: "Chemist", pending: "₦85,200", last: "₦92,000", frequency: "Weekly", next: "May 16, 2024", status: "Scheduled" },
  { entity: "City Agro & Vet", type: "Chemist", pending: "₦12,400", last: "₦8,500", frequency: "Bi-Weekly", next: "May 20, 2024", status: "Scheduled" },
];

export default function SettlementsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");

  const filteredSettlements = SETTLEMENTS_DATA.filter(item => {
    const matchesSearch = item.entity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Types" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Merchant Settlements</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage payouts and reconciliation for Chemists and Distributors</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Report
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Payouts Today", value: "₦2.8M", sub: "12 processing", color: "emerald" },
          { label: "Scheduled Tomorrow", value: "₦4.5M", sub: "28 entities", color: "blue" },
          { label: "Avg Cycle", value: "4.8 Days", sub: "Liquidity flow", color: "gray" },
          { label: "Total Pending", value: "₦1.8M", sub: "Unprocessed", color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "orange" ? "text-orange-500" : "text-gray-900"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#2D4D31]/20 transition-all shadow-sm w-[400px]">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Merchant Name..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          {["All Types", "Chemist", "Distributor"].map((type) => (
            <button 
              key={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border",
                selectedType === type 
                  ? "bg-[#2D4D31] text-white border-[#2D4D31] shadow-lg shadow-[#2D4D31]/10" 
                  : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Merchant & Partner</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Pending Volume</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Last Payout</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Cadence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Next Lifecycle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSettlements.map((item, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm border border-transparent group-hover:border-gray-100">
                        {item.type === "Chemist" ? <Storefront size={18} weight="bold" /> : <Buildings size={18} weight="bold" />}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-black text-gray-900 leading-none mb-0.5 truncate whitespace-nowrap">{item.entity}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[15px] font-black text-[#2D4D31] whitespace-nowrap">{item.pending}</span>
                  </td>
                  <td className="px-5 py-5 text-[13px] font-bold text-gray-400 whitespace-nowrap">{item.last}</td>
                  <td className="px-5 py-5">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-widest border border-gray-100">
                      {item.frequency}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{item.next}</span>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest",
                        item.status === "Processing" ? "text-blue-500" : "text-gray-400"
                      )}>{item.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredSettlements.length} of {SETTLEMENTS_DATA.length} active cycles</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((page, i) => (
              <button key={i} className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-gray-50"
              )}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
