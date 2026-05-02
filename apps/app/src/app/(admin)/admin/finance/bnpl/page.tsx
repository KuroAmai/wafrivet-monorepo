"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Receipt,
  User,
  Storefront,
  Warning,
  CheckCircle,
  ArrowRight,
  Clock,
  Money,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const BNPL_DATA = [
  { id: "BNPL-9281", farmer: "Emeka Obi", chemist: "Pharmacy Plus", total: "₦12,500", fee: "₦875", due: "₦13,375", dueDate: "May 16, 2024", status: "Active", overdue: 0 },
  { id: "BNPL-9280", farmer: "John Dagogo", chemist: "Lekki Pharma", total: "₦14,500", fee: "₦1,015", due: "₦15,515", dueDate: "May 10, 2024", status: "Overdue", overdue: 4 },
  { id: "BNPL-9279", farmer: "Musa Ibrahim", chemist: "City Agro", total: "₦8,200", fee: "₦574", due: "₦8,774", dueDate: "May 12, 2024", status: "Overdue", overdue: 2 },
  { id: "BNPL-9278", farmer: "Sarah Ahmed", chemist: "Pharmacy Plus", total: "₦22,000", fee: "₦1,540", due: "₦23,540", dueDate: "May 25, 2024", status: "Active", overdue: 0 },
  { id: "BNPL-9277", farmer: "Emeka Obi", chemist: "Lekki Pharma", total: "₦4,500", fee: "₦315", due: "₦4,815", dueDate: "Apr 28, 2024", status: "Repaid", overdue: 0 },
];

export default function BNPLAgreementsPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "overdue" | "repaid">("active");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = BNPL_DATA.filter(item => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.chemist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = 
      activeTab === "all" || 
      item.status.toLowerCase() === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">BNPL Agreements</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor credit risk and repayment performance across the ecosystem</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Ledger
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Agreements", value: "842", sub: "Currently in force", color: "blue" },
          { label: "Repayment Rate", value: "94.2%", sub: "↑ 2.4% this month", color: "emerald" },
          { label: "Total Outstanding", value: "₦12.8M", sub: "Principal + Fees", color: "gray" },
          { label: "Risk Exposure", value: "₦1.4M", sub: "Overdue > 7 days", color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "red" ? "text-red-500" : "text-gray-900"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Unified Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all shadow-none">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Farmer or Chemist..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value as any)}
          >
            {["All", "Active", "Overdue", "Repaid"].map(tab => (
              <option key={tab} value={tab.toLowerCase()}>{tab} Agreements</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setActiveTab("all");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Agreement ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Counterparties</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Financial Exposure</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Repayment Timeline</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight whitespace-nowrap">{item.id}</span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <User size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">{item.farmer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Storefront size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[11px] text-gray-500 font-medium truncate whitespace-nowrap">{item.chemist}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-1 whitespace-nowrap">{item.due}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">Fees: {item.fee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{item.dueDate}</span>
                      {item.overdue > 0 && (
                        <span className="text-[10px] text-red-500 font-black uppercase tracking-widest whitespace-nowrap mt-0.5">
                          {item.overdue} days past due
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      item.status === "Active" ? "bg-blue-50 text-blue-500 border-blue-100" :
                      item.status === "Repaid" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      "bg-red-50 text-red-500 border-red-100"
                    )}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredData.length} of {BNPL_DATA.length} active agreements</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 168].map((page, i) => (
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
