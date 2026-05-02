"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown, 
  DownloadSimple,
  ChatCircleText,
  ArrowUpRight,
  ArrowDownLeft,
  Circle,
  CurrencyDollar
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SMS_DATA = [
  { id: "SMS-9281", phone: "+234 801 234 5678", direction: "Outbound", provider: "Twilio", content: "Your code is 1284.", cost: "$0.02", status: "Delivered", date: "2 mins ago" },
  { id: "SMS-9280", phone: "+234 809 345 6789", direction: "Inbound", provider: "Twilio", content: "ORDER STATUS #9281", cost: "$0.00", status: "Received", date: "15 mins ago" },
  { id: "SMS-9279", phone: "+234 803 456 7890", direction: "Outbound", provider: "AWS SNS", content: "BNPL Payment due in 2 days.", cost: "$0.015", status: "Delivered", date: "1 hour ago" },
  { id: "SMS-9278", phone: "+234 812 567 8901", direction: "Outbound", provider: "Twilio", content: "Emergency Health Alert: Cattle #312", cost: "$0.02", status: "Failed", date: "3 hours ago" },
];

export default function SMSLogPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">SMS Logs</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Audit every SMS transaction and provider cost metrics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total SMS Today</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">1,240</div>
            <p className="text-[11px] font-bold text-blue-500 mt-2">↑ 4% from yesterday</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <ChatCircleText size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total Cost (MTD)</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">$242.50</div>
            <p className="text-[11px] font-bold text-emerald-500 mt-2">Within budget allocation</p>
          </div>
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <CurrencyDollar size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Avg. Cost / SMS</span>
            <div className="text-[32px] font-black text-gray-900 leading-none">$0.018</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">Optimized routing active</p>
          </div>
          <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
            <Circle size={12} weight="fill" className="animate-pulse" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">SMS ID</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Phone</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Direction / Provider</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Content</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Cost</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {SMS_DATA.map((sms, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight">{sms.id}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[14px] font-bold text-gray-900">{sms.phone}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {sms.direction === "Inbound" ? <ArrowDownLeft size={14} weight="bold" className="text-blue-500" /> : <ArrowUpRight size={14} weight="bold" className="text-purple-500" />}
                        <span className="text-[14px] font-bold text-gray-900">{sms.direction}</span>
                      </div>
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{sms.provider}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-medium text-gray-500 max-w-[250px] truncate">{sms.content}</td>
                  <td className="px-8 py-5 text-[14px] font-black text-gray-900">{sms.cost}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        sms.status === "Delivered" || sms.status === "Received" ? "text-emerald-500" : "text-red-500"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600">{sms.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right text-[13px] font-medium text-gray-400 whitespace-nowrap">{sms.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
