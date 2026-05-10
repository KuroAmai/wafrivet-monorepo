"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  ShieldCheck,
  User,
  Fingerprint,
  Warning,
  Clock,
  DotsThreeVertical,
  X,
  UserFocus,
  Database
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const AUDIT_DATA = [
  { id: "AUD-1001", time: "2 mins ago", admin: "Wafrivet Admin", action: "Updated BNPL Rate", category: "Settings", resource: "FINANCE_CONFIG", ip: "192.168.1.1", reason: "Strategic rate adjustment" },
  { id: "AUD-1002", time: "15 mins ago", admin: "Super Admin", action: "Deactivated User", category: "Users", resource: "USR-0091", ip: "192.168.1.4", reason: "Fraudulent activity detected" },
  { id: "AUD-1003", time: "1 hour ago", admin: "Ops Manager", action: "Verified Chemist", category: "Marketplace", resource: "CHM-8812", ip: "192.168.1.12", reason: "NAFDAC docs confirmed" },
  { id: "AUD-1004", time: "3 hours ago", admin: "Wafrivet Admin", action: "Bulk SMS Sent", category: "Comms", resource: "SMS_CAMPAIGN_01", ip: "192.168.1.1", reason: "Promotion" },
  { id: "AUD-1005", time: "5 hours ago", admin: "System", action: "Backup Completed", category: "Infrastructure", resource: "DB_PROD", ip: "Internal", reason: "Routine" },
];

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Activities");

  const filteredAudit = AUDIT_DATA.filter(item => {
    const matchesSearch = 
      item.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Activities" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Audit Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Immutable record of every administrative action across the platform</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Audit
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Actions", value: "14,204", sub: "Global immutable logs", color: "blue" },
          { label: "Admin Density", value: "15 Active", sub: "Identity sessions", color: "emerald" },
          { label: "High Risk Ops", value: "02", sub: "Security alerts", color: "red" },
          { label: "Node Uptime", value: "99.9%", sub: "Audit persistence", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "red" ? "text-red-500" :
              stat.color === "emerald" ? "text-emerald-500" : "text-gray-900"
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
            placeholder="Search by admin, action or resource..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {["All Activities", "Settings", "Users", "Marketplace", "Comms", "Infrastructure"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Activities");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Identity Persistence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Administrative Action</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Resource Context</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Context / Vector</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAudit.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">{item.admin}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.ip} Session</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      item.action.includes('Deactivated') || item.action.includes('Deleted') ? "bg-red-50 text-red-500 border-red-100" :
                      item.action.includes('Updated') || item.action.includes('Verified') ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      "bg-blue-50 text-blue-500 border-blue-100"
                    )}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-gray-900 leading-none mb-1">{item.category}</span>
                      <span className="text-[10px] font-black text-[#2D4D31] uppercase tracking-widest font-mono">{item.resource}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col max-w-[200px]">
                      <span className="text-[12px] font-medium text-gray-600 truncate mb-0.5">{item.reason}</span>
                      <div className="flex items-center gap-1.5">
                        <Fingerprint size={10} className="text-gray-300" />
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">Immutable Log</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900">{item.time}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Index</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredAudit.length} of 14,204 records</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 2841].map((page, i) => (
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
