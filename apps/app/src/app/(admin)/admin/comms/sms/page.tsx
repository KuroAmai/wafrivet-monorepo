"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown, 
  DownloadSimple,
  ChatCircleText,
  ArrowUpRight,
  ArrowDownLeft,
  Circle,
  CurrencyDollar,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SMS_DATA = [
  { id: "SMS-9281", phone: "+234 801 234 5678", direction: "Outbound", provider: "Twilio", content: "Your code is 1284.", cost: "$0.02", status: "Delivered", date: "2 mins ago" },
  { id: "SMS-9280", phone: "+234 809 345 6789", direction: "Inbound", provider: "Twilio", content: "ORDER STATUS #9281", cost: "$0.00", status: "Received", date: "15 mins ago" },
  { id: "SMS-9279", phone: "+234 803 456 7890", direction: "Outbound", provider: "AWS SNS", content: "BNPL Payment due in 2 days.", cost: "$0.015", status: "Delivered", date: "1 hour ago" },
  { id: "SMS-9278", phone: "+234 812 567 8901", direction: "Outbound", provider: "Twilio", content: "Emergency Health Alert: Cattle #312", cost: "$0.02", status: "Failed", date: "3 hours ago" },
];

export default function SMSLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Messages");

  const filteredSMS = SMS_DATA.filter(sms => {
    const matchesSearch = 
      sms.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sms.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sms.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All Messages" || sms.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">SMS Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Audit every SMS transaction and provider cost metrics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total SMS", value: "1,240", sub: "↑ 4.2% daily", color: "blue" },
          { label: "Total Cost", value: "$242.50", sub: "Month to date", color: "emerald" },
          { label: "Avg Unit Cost", value: "$0.018", sub: "Optimized routing", color: "gray" },
          { label: "Failure Rate", value: "0.8%", sub: "Gateway success", color: "red" },
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
            placeholder="Search by phone, content or ID..." 
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
            {["All Messages", "Delivered", "Received", "Failed"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Messages");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Transaction ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Routing Vector</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Message Content</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Unit Cost</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Audit Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSMS.map((sms) => (
                <tr key={sms.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1">{sms.id}</span>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{sms.phone}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        {sms.direction === "Inbound" ? (
                          <ArrowDownLeft size={12} weight="bold" className="text-blue-500" />
                        ) : (
                          <ArrowUpRight size={12} weight="bold" className="text-purple-500" />
                        )}
                        <span className="text-[13px] font-black text-gray-900">{sms.direction}</span>
                      </div>
                      <span className="text-[9px] font-black text-[#2D4D31] uppercase tracking-widest">{sms.provider} Node</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <p className="text-[13px] font-medium text-gray-500 max-w-[350px] truncate leading-tight">
                      {sms.content}
                    </p>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-1">{sms.cost}</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Rate / Segment</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          sms.status === "Delivered" || sms.status === "Received" ? "bg-emerald-500" : "bg-red-500"
                        )} />
                        <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{sms.status}</span>
                      </div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{sms.date}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredSMS.length} of {SMS_DATA.length} logs</span>
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
