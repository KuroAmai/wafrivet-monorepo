"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  DeviceMobile,
  User,
  ShoppingCart,
  Question,
  CheckCircle,
  Clock,
  DotsThreeVertical,
  ArrowRight
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
  return (
    <div className="space-y-8">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total USSD Hits</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">12,842</div>
            <p className="text-[11px] font-bold text-blue-500 mt-2">↑ 8% from yesterday</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <DeviceMobile size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Orders via USSD</span>
            <div className="text-[32px] font-black text-[#2D4D31] leading-none">428</div>
            <p className="text-[11px] font-bold text-emerald-500 mt-2">₦2.4M GMV contribution</p>
          </div>
          <div className="w-14 h-14 bg-[#2D4D31]/5 text-[#2D4D31] rounded-2xl flex items-center justify-center">
            <ShoppingCart size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Avg Session Duration</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">48s</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">Within UX benchmarks</p>
          </div>
          <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
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
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Session ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Phone / User</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Input Log</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Outcome</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Duration</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {USSD_DATA.map((session, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight">{session.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-900">{session.phone}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User size={12} weight="bold" className="text-gray-400" />
                        <span className={cn(
                          "text-[11px] font-black uppercase tracking-widest",
                          session.user === "Unknown" ? "text-gray-400" : "text-[#2D4D31]"
                        )}>{session.user}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <code className="text-[12px] bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100 font-bold text-gray-600">{session.input}</code>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                      session.outcome.includes('Order') || session.outcome.includes('Success') ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      session.outcome.includes('Abandoned') ? "bg-red-50 text-red-500 border-red-100" :
                      "bg-blue-50 text-blue-500 border-blue-100"
                    )}>
                      {session.outcome}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-900">{session.duration}</td>
                  <td className="px-8 py-5 text-right text-[13px] font-medium text-gray-400">{session.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
