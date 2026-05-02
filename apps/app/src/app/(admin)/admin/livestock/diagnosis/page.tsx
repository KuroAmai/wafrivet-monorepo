"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Robot,
  Camera,
  ChatCircleText,
  PhoneCall,
  Warning,
  ShoppingCart,
  ArrowRight,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SESSIONS_DATA = [
  { id: "DX-9281", user: "Emeka Obi", animal: "Cattle #312", channel: "Camera", diagnosis: "Respiratory Infection", severity: "Moderate", action: "Medicine Ordered", duration: "1:24", date: "2 mins ago" },
  { id: "DX-9280", user: "Musa Ibrahim", animal: "Goat #451", channel: "Chat", diagnosis: "PPR Suspected", severity: "High", action: "Vet Escallation", duration: "4:12", date: "15 mins ago" },
  { id: "DX-9279", user: "Sarah Ahmed", animal: "Sheep #105", channel: "Voice", diagnosis: "Bloat", severity: "Critical", action: "Emergency Alert", duration: "0:45", date: "1 hour ago" },
  { id: "DX-9278", user: "John Dagogo", animal: "Cattle #092", channel: "Camera", diagnosis: "Foot Rot", severity: "Low", action: "Treatment Logged", duration: "2:10", date: "3 hours ago" },
  { id: "DX-9277", user: "Emeka Obi", animal: "Cattle #312", channel: "Camera", diagnosis: "Healthy", severity: "None", action: "None", duration: "0:58", date: "5 hours ago" },
];

export default function DiagnosisSessionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");
  const [selectedSeverity, setSelectedSeverity] = useState("All Severities");

  const filteredSessions = SESSIONS_DATA.filter(session => {
    const matchesSearch = 
      session.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.animal.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesChannel = selectedChannel === "All Channels" || session.channel === selectedChannel;
    const matchesSeverity = selectedSeverity === "All Severities" || session.severity === selectedSeverity;

    return matchesSearch && matchesChannel && matchesSeverity;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">AI Diagnosis Sessions</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor AI performance, accuracy, and conversion metrics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Data
        </button>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-[#2D4D31] p-10 rounded-[40px] shadow-xl shadow-[#2D4D31]/20 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform">
            <ShoppingCart size={140} weight="fill" />
          </div>
          <span className="text-[10px] font-black text-white/60 uppercase tracking-widest block mb-4">Dx → Order Conversion</span>
          <div className="text-[42px] font-black text-white leading-none tracking-tight">42.8%</div>
          <p className="text-[12px] font-bold text-white/80 mt-6 flex items-center gap-2">
            Highest across regions <ArrowRight size={14} weight="bold" />
          </p>
        </div>

        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Sessions", value: "8,421", sub: "↑ 24% this month", icon: Robot, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Emergency Flags", value: "142", sub: "8 pending review", icon: Warning, color: "text-red-500", bg: "bg-red-50" },
            { label: "Avg Duration", value: "1m 45s", sub: "Optimized flow", icon: ChatCircleText, color: "text-purple-500", bg: "bg-purple-50" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-center text-center items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{stat.label}</span>
              <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-3 group-hover:text-[#2D4D31] transition-colors">{stat.value}</div>
              <p className="text-[11px] font-bold text-gray-400">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Session ID, User or Animal..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            {["All Channels", "Camera", "Chat", "Voice"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
          >
            {["All Severities", "Critical", "High", "Moderate", "Low", "None"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedChannel("All Channels");
            setSelectedSeverity("All Severities");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Session & Target</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Channel</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Diagnosis Outcome</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Action Taken</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSessions.map((session, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate">{session.id}</span>
                      <span className="text-[11px] text-gray-400 font-medium truncate">{session.user} • {session.animal}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                        {session.channel === "Camera" ? <Camera size={14} weight="bold" /> :
                         session.channel === "Chat" ? <ChatCircleText size={14} weight="bold" /> :
                         <PhoneCall size={14} weight="bold" />}
                      </div>
                      <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{session.channel}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[14px] font-bold text-gray-900 leading-none truncate">{session.diagnosis}</span>
                      <span className={cn(
                        "inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                        session.severity === "Critical" ? "bg-red-50 text-red-500 border-red-100" :
                        session.severity === "High" ? "bg-orange-50 text-orange-500 border-orange-100" :
                        session.severity === "Moderate" ? "bg-blue-50 text-blue-500 border-blue-100" :
                        "bg-emerald-50 text-emerald-500 border-emerald-100"
                      )}>
                        {session.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{session.action}</span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900 leading-none mb-1 whitespace-nowrap">{session.date}</span>
                      <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">{session.duration} session</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredSessions.length} of {SESSIONS_DATA.length} sessions</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 1684].map((page, i) => (
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
