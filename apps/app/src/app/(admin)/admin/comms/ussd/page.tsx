"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  DeviceMobile,
  User,
  ShoppingCart,
  Question,
  CheckCircle,
  Clock,
  DotsThreeVertical,
  ArrowRight,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const USSD_DATA = [
  { id: "USS-9281", phone: "+234 801 234 5678", user: "Emeka Obi", input: "*402*1*8812#", outcome: "Order Created", duration: "1:24", date: "2 mins ago" },
  { id: "USS-9280", phone: "+234 809 345 6789", user: "Unknown", input: "*402*3#", outcome: "Info Query", duration: "0:45", date: "15 mins ago" },
  { id: "USS-9279", phone: "+234 803 456 7890", user: "John Dagogo", input: "*402*2#", outcome: "Diagnosis Log", duration: "2:10", date: "1 hour ago" },
  { id: "USS-9278", phone: "+234 812 567 8901", user: "Sarah Ahmed", input: "*402*1*9921#", outcome: "Payment Success", duration: "0:58", date: "3 hours ago" },
  { id: "USS-9277", phone: "+234 805 678 9012", user: "Unknown", input: "*402#", outcome: "Session Abandoned", duration: "0:12", date: "5 hours ago" },
];

export default function USSDSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState("All Sessions");

  const filteredSessions = USSD_DATA.filter(session => {
    const matchesSearch = 
      session.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.input.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOutcome = selectedOutcome === "All Sessions" || 
      (selectedOutcome === "Successful" && (session.outcome.includes("Success") || session.outcome.includes("Created"))) ||
      (selectedOutcome === "Incomplete" && (session.outcome.includes("Abandoned") || session.outcome.includes("Query") || session.outcome.includes("Diagnosis")));
    return matchesSearch && matchesOutcome;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">USSD Sessions</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor offline interactions and feature phone access logs</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sessions", value: "12,842", sub: "↑ 8.4% growth", color: "blue" },
          { label: "Conversion Rate", value: "3.2%", sub: "USSD to Order", color: "emerald" },
          { label: "Avg Duration", value: "48.2s", sub: "User session time", color: "gray" },
          { label: "Active Nodes", value: "14/15", sub: "Gateway health", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
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
            placeholder="Search by phone, user or code..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
          >
            {["All Sessions", "Successful", "Incomplete"].map(outcome => (
              <option key={outcome} value={outcome}>{outcome}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedOutcome("All Sessions");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Session Identity</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Access Node</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Command Log</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Outcome Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSessions.map((session) => (
                <tr key={session.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">{session.id}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{session.duration} Session</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900 leading-none mb-1">{session.phone}</span>
                      <div className="flex items-center gap-1.5">
                        <User size={10} className="text-gray-400" />
                        <span className={cn(
                          "text-[9px] font-black uppercase tracking-widest",
                          session.user === "Unknown" ? "text-gray-400 italic" : "text-[#2D4D31]"
                        )}>{session.user}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <code className="text-[11px] font-black text-gray-600 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 font-mono">
                      {session.input}
                    </code>
                  </td>
                  <td className="px-5 py-5">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                      session.outcome.includes('Success') || session.outcome.includes('Created') 
                        ? "bg-emerald-50 text-emerald-500 border-emerald-100" 
                        : session.outcome.includes('Abandoned') 
                        ? "bg-red-50 text-red-500 border-red-100" 
                        : "bg-blue-50 text-blue-500 border-blue-100"
                    )}>
                      {session.outcome}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900">{session.date}</span>
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
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredSessions.length} of {USSD_DATA.length} logs</span>
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
