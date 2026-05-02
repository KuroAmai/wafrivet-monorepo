"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  ShieldCheck,
  User,
  Fingerprint,
  Warning,
  Clock,
  DotsThreeVertical
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const AUDIT_DATA = [
  { time: "2 mins ago", admin: "Wafrivet Admin", action: "Updated BNPL Rate", category: "Settings", resource: "FINANCE_CONFIG", ip: "192.168.1.1", reason: "Strategic rate adjustment" },
  { time: "15 mins ago", admin: "Super Admin", action: "Deactivated User", category: "Users", resource: "USR-0091", ip: "192.168.1.4", reason: "Fraudulent activity detected" },
  { time: "1 hour ago", admin: "Ops Manager", action: "Verified Chemist", category: "Marketplace", resource: "CHM-8812", ip: "192.168.1.12", reason: "NAFDAC docs confirmed" },
  { time: "3 hours ago", admin: "Wafrivet Admin", action: "Bulk SMS Sent", category: "Comms", resource: "SMS_CAMPAIGN_01", ip: "192.168.1.1", reason: "Promotion" },
  { time: "5 hours ago", admin: "System", action: "Backup Completed", category: "Infrastructure", resource: "DB_PROD", ip: "Internal", reason: "Routine" },
];

export default function AuditLogPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Audit Logs</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Immutable record of every administrative action across the platform</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Admin, Action or Resource ID..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
          />
        </div>
        
        <div className="flex items-center gap-2">
          {[
            { label: "Category", value: "All Categories" },
            { label: "Admin", value: "All Admins" },
            { label: "Date", value: "Today" },
          ].map((filter) => (
            <button key={filter.label} className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all flex items-center gap-3">
              <span className="text-gray-400">{filter.label}:</span> {filter.value}
              <CaretDown size={14} weight="bold" />
            </button>
          ))}
        </div>

        <button className="p-3 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl transition-all">
          <Funnel size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Admin / Identity</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Category / ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Reason / IP</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {AUDIT_DATA.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} weight="bold" />
                      <span className="text-[13px] font-medium">{item.time}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-black text-xs group-hover:bg-white group-hover:text-[#2D4D31] transition-all shadow-sm">
                        {item.admin.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[14px] font-bold text-gray-900">{item.admin}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider border",
                      item.action.includes('Deactivated') || item.action.includes('Deleted') ? "bg-red-50 text-red-500 border-red-100" :
                      item.action.includes('Updated') || item.action.includes('Verified') ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      "bg-blue-50 text-blue-500 border-blue-100"
                    )}>
                      {item.action}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-900">{item.category}</span>
                      <span className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest mt-0.5">{item.resource}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-gray-600 max-w-[200px] truncate">{item.reason}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Fingerprint size={12} weight="bold" className="text-gray-300" />
                        <span className="text-[11px] text-gray-400 font-bold">{item.ip}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                      <DotsThreeVertical size={18} weight="bold" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Showing 1-5 of 14,204 logs</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 2841].map((page, i) => (
              <button key={i} className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-white hover:text-gray-900"
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
