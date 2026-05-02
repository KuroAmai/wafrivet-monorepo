"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  PhoneCall,
  User,
  Play,
  ArrowUpRight,
  ArrowDownLeft,
  Circle,
  DotsThreeVertical,
  Warning,
  Clock,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CALLS_DATA = [
  { id: "VOC-9281", phone: "+234 801 234 5678", user: "Emeka Obi", direction: "Inbound", duration: "4:24", status: "Answered", date: "2 mins ago" },
  { id: "VOC-9280", phone: "+234 809 345 6789", user: "Unknown", direction: "Inbound", duration: "0:00", status: "Missed", date: "45 mins ago" },
  { id: "VOC-9279", phone: "+234 803 456 7890", user: "John Dagogo", direction: "Outbound", duration: "12:10", status: "Answered", date: "2 hours ago" },
  { id: "VOC-9278", phone: "+234 812 567 8901", user: "Sarah Ahmed", direction: "Inbound", duration: "2:58", status: "Answered", date: "5 hours ago" },
];

export default function VoiceCallsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Calls");

  const filteredCalls = CALLS_DATA.filter(call => {
    const matchesSearch = 
      call.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All Calls" || call.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Voice Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor support and automated advisory voice sessions</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sessions", value: "156", sub: "↑ 12.4% weekly", color: "blue" },
          { label: "Missed Alerts", value: "12", sub: "Requires attention", color: "red" },
          { label: "Avg Depth", value: "6m 12s", sub: "Session engagement", color: "gray" },
          { label: "Line Stability", value: "99.8%", sub: "Gateway health", color: "emerald" },
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
            placeholder="Search by phone, user or session ID..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Calls", "Answered", "Missed"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Calls");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Session ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Contact Intelligence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Session Data</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Audit Log</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCalls.map((call) => (
                <tr key={call.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">{call.id}</span>
                      <div className="flex items-center gap-1.5">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          call.status === "Answered" ? "bg-emerald-500" : "bg-red-500"
                        )} />
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{call.status}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-0.5 truncate whitespace-nowrap">{call.phone}</span>
                      <div className="flex items-center gap-1">
                        <User size={10} className="text-gray-400" />
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest truncate",
                          call.user === "Unknown" ? "text-gray-400 italic" : "text-[#2D4D31]"
                        )}>{call.user}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        {call.direction === "Inbound" ? (
                          <ArrowDownLeft size={12} weight="bold" className="text-blue-500" />
                        ) : (
                          <ArrowUpRight size={12} weight="bold" className="text-purple-500" />
                        )}
                        <span className="text-[13px] font-black text-gray-900">{call.direction}</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{call.duration} Depth</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    {call.status === "Answered" ? (
                      <button className="flex items-center gap-2 text-[#2D4D31] bg-[#2D4D31]/5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#2D4D31]/10 transition-all border border-[#2D4D31]/10">
                        <Play size={14} weight="fill" /> Review Log
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-red-100">
                        <Warning size={14} weight="bold" /> Call Back
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900">{call.date}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Gateway Logged</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredCalls.length} of {CALLS_DATA.length} logs</span>
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

