"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Bell,
  DeviceMobile,
  ChatCircleText,
  User,
  CheckCircle,
  Warning,
  Circle,
  Clock,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS_DATA = [
  { id: "NTF-9281", user: "Emeka Obi", channel: "Push", event: "Order Status", content: "Your order #ORD-9281 has been delivered.", status: "Delivered", date: "2 mins ago" },
  { id: "NTF-9280", user: "John Dagogo", channel: "SMS", event: "BNPL Reminder", content: "Reminder: Your BNPL payment of ₦14,500 is due in 2 days.", status: "Sent", date: "1 hour ago" },
  { id: "NTF-9279", user: "Sarah Ahmed", channel: "USSD Push", event: "Health Alert", content: "Critical: High fever detected for Cattle #312. Check app.", status: "Delivered", date: "3 hours ago" },
  { id: "NTF-9278", user: "Musa Ibrahim", channel: "Push", event: "Price Update", content: "Price drop: Multivitamin Inj now at ₦6,500.", status: "Failed", date: "5 hours ago" },
];

export default function NotificationsLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("All Channels");

  const filteredNotifications = NOTIFICATIONS_DATA.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = selectedChannel === "All Channels" || item.channel === selectedChannel;
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Notification Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Audit every message sent across Push, SMS, and USSD channels</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Messages Sent", value: "4,281", sub: "↑ 14.2% daily", color: "blue" },
          { label: "Delivery Rate", value: "98.2%", sub: "Network success", color: "emerald" },
          { label: "Failures", value: "42", sub: "Requires retry", color: "red" },
          { label: "Active Gateways", value: "04", sub: "Channel health", color: "blue" },
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
            placeholder="Search by user, content or ID..." 
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
            {["All Channels", "Push", "SMS", "USSD Push"].map(channel => (
              <option key={channel} value={channel}>{channel}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedChannel("All Channels");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Broadcast ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Target Intelligence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Message Content</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Delivery Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredNotifications.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">{item.id}</span>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.event}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-0.5 truncate whitespace-nowrap">{item.user}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.channel} Vector</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <p className="text-[13px] font-medium text-gray-500 max-w-[400px] truncate leading-tight">
                      {item.content}
                    </p>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        item.status === "Delivered" ? "text-emerald-500" :
                        item.status === "Sent" ? "text-blue-500" : "text-red-500"
                      )} />
                      <span className="text-[13px] font-black text-gray-900">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900">{item.date}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">System Logged</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredNotifications.length} of {NOTIFICATIONS_DATA.length} logs</span>
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

