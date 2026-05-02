"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
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
  Clock
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const CALLS_DATA = [
  { id: "VOC-9281", phone: "+234 801 234 5678", user: "Emeka Obi", direction: "Inbound", duration: "4:24", status: "Answered", date: "2 mins ago" },
  { id: "VOC-9280", phone: "+234 809 345 6789", user: "Unknown", direction: "Inbound", duration: "0:00", status: "Missed", date: "45 mins ago" },
  { id: "VOC-9279", phone: "+234 803 456 7890", user: "John Dagogo", direction: "Outbound", duration: "12:10", status: "Answered", date: "2 hours ago" },
  { id: "VOC-9278", phone: "+234 812 567 8901", user: "Sarah Ahmed", direction: "Inbound", duration: "2:58", status: "Answered", date: "5 hours ago" },
];

export default function VoiceCallsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Voice Call Logs</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor support and automated advisory voice sessions</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total Calls Today</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">156</div>
            <p className="text-[11px] font-bold text-blue-500 mt-2">↑ 12% vs last week</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <PhoneCall size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Missed Calls</span>
            <div className="text-[32px] font-black text-red-500 leading-none">12</div>
            <p className="text-[11px] font-bold text-red-400 mt-2">Requires follow-up</p>
          </div>
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center">
            <Warning size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Avg. Duration</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">6m 12s</div>
            <p className="text-[11px] font-bold text-emerald-500 mt-2">High engagement depth</p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <Clock size={32} weight="duotone" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Call ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Phone / User</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Direction</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Recording</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {CALLS_DATA.map((call, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight">{call.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900">{call.phone}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User size={12} weight="bold" className="text-gray-400" />
                        <span className={cn(
                          "text-[11px] font-black uppercase tracking-widest",
                          call.user === "Unknown" ? "text-gray-400" : "text-[#2D4D31]"
                        )}>{call.user}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center",
                        call.direction === "Inbound" ? "bg-blue-50 text-blue-500" : "bg-purple-50 text-purple-500"
                      )}>
                        {call.direction === "Inbound" ? <ArrowDownLeft size={12} weight="bold" /> : <ArrowUpRight size={12} weight="bold" />}
                      </div>
                      <span className="text-[13px] font-bold text-gray-600">{call.direction}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-bold text-gray-900">{call.duration}</td>
                  <td className="px-8 py-5">
                    {call.status === "Answered" ? (
                      <button className="flex items-center gap-2 text-[#2D4D31] bg-[#2D4D31]/5 px-3 py-1.5 rounded-xl text-[12px] font-black tracking-tight hover:bg-[#2D4D31]/10 transition-colors">
                        <Play size={14} weight="fill" /> Listen
                      </button>
                    ) : (
                      <span className="text-[12px] text-gray-300 italic">No recording</span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={call.status === "Answered" ? "text-emerald-500" : "text-red-500"} />
                      <span className="text-[13px] font-bold text-gray-600">{call.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right text-[13px] font-medium text-gray-400 whitespace-nowrap">{call.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

