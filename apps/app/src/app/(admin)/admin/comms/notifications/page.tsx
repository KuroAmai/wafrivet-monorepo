"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  Bell,
  DeviceMobile,
  ChatCircleText,
  User,
  CheckCircle,
  Warning,
  Circle,
  Clock
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS_DATA = [
  { id: "NTF-9281", user: "Emeka Obi", channel: "Push", event: "Order Status", content: "Your order #ORD-9281 has been delivered.", status: "Delivered", date: "2 mins ago" },
  { id: "NTF-9280", user: "John Dagogo", channel: "SMS", event: "BNPL Reminder", content: "Reminder: Your BNPL payment of ₦14,500 is due in 2 days.", status: "Sent", date: "1 hour ago" },
  { id: "NTF-9279", user: "Sarah Ahmed", channel: "USSD Push", event: "Health Alert", content: "Critical: High fever detected for Cattle #312. Check app.", status: "Delivered", date: "3 hours ago" },
  { id: "NTF-9278", user: "Musa Ibrahim", channel: "Push", event: "Price Update", content: "Price drop: Multivitamin Inj now at ₦6,500.", status: "Failed", date: "5 hours ago" },
];

export default function NotificationsLogPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Notification Logs</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Audit every message sent across Push, SMS, and USSD channels</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Logs
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Sent Today", value: "4,281", icon: Bell, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Delivery Rate", value: "98.2%", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Failures", value: "42", icon: Warning, color: "text-red-500", bg: "bg-red-50" },
          { label: "Most Used", value: "Push", icon: DeviceMobile, color: "text-purple-500", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} weight="duotone" />
            </div>
            <div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">{stat.label}</span>
              <div className="text-[20px] font-black text-gray-900 leading-none">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">ID / User</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Channel / Event</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Content</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {NOTIFICATIONS_DATA.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-gray-900 tracking-tight">{item.id}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <User size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[12px] text-gray-500 font-medium">{item.user}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {item.channel === "Push" ? <DeviceMobile size={14} weight="bold" /> :
                         item.channel === "SMS" ? <ChatCircleText size={14} weight="bold" /> :
                         <Bell size={14} weight="bold" />}
                        <span className="text-[14px] font-bold text-gray-900">{item.channel}</span>
                      </div>
                      <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest mt-0.5">{item.event}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-medium text-gray-500 max-w-[350px] truncate">{item.content}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        item.status === "Delivered" ? "text-emerald-500" :
                        item.status === "Sent" ? "text-blue-500" : "text-red-500"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right text-[13px] font-medium text-gray-400 whitespace-nowrap">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

