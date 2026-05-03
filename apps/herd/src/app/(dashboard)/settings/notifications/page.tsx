"use client";

import { CaretLeft, Bell, BellRinging, Siren, ShieldCheck, Heartbeat, Chats, ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NOTIF_SETTINGS = [
  { title: "Critical Health Alerts", desc: "Immediate push for FMD or emergency symptoms", icon: Siren, color: "text-red-500", bg: "bg-red-50", enabled: true },
  { title: "Daily Sync Report", desc: "Morning summary of herd performance", icon: ShieldCheck, color: "text-[#2D4D31]", bg: "bg-emerald-50", enabled: true },
  { title: "AI Insights", desc: "Diagnostic suggestions and optimizations", icon: Heartbeat, color: "text-blue-500", bg: "bg-blue-50", enabled: false },
  { title: "Administrative Comms", desc: "Messages from regional Wafrivet HQ", icon: Chats, color: "text-amber-500", bg: "bg-amber-50", enabled: true },
];

export default function NotificationsPage() {
  const [settings, setSettings] = useState(NOTIF_SETTINGS);

  const toggleSetting = (idx: number) => {
    const newSettings = [...settings];
    newSettings[idx].enabled = !newSettings[idx].enabled;
    setSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Notifications</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Active Status */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 bg-emerald-50 text-[#2D4D31] rounded-3xl flex items-center justify-center relative">
              <BellRinging size={32} weight="bold" className="animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D4D31] rounded-full border-4 border-white" />
           </div>
           <div>
              <h2 className="text-[18px] font-black text-gray-900">System Active</h2>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Global delivery enabled</p>
           </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Notification Channels</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {settings.map((item, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between group">
                   <div className="flex items-center gap-5">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.bg, item.color)}>
                         <item.icon size={24} weight="bold" />
                      </div>
                      <div>
                         <h4 className="text-[15px] font-black text-gray-900">{item.title}</h4>
                         <p className="text-[12px] text-gray-400 font-medium">{item.desc}</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => toggleSetting(idx)}
                     className={cn(
                       "transition-colors duration-300",
                       item.enabled ? "text-[#2D4D31]" : "text-gray-200"
                     )}
                   >
                      {item.enabled ? <ToggleRight size={44} weight="fill" /> : <ToggleLeft size={44} weight="fill" />}
                   </button>
                </div>
              ))}
           </div>
        </div>

        {/* Quiet Mode */}
        <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-6">
           <div className="flex items-center justify-between">
              <div>
                 <h4 className="text-[15px] font-black text-gray-900">Quiet Hours</h4>
                 <p className="text-[12px] text-gray-400 font-medium">Mute non-critical alerts at night</p>
              </div>
              <button className="text-gray-200">
                 <ToggleLeft size={44} weight="fill" />
              </button>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center opacity-40">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Start</p>
                 <p className="text-[14px] font-black text-gray-400">22:00</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center opacity-40">
                 <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">End</p>
                 <p className="text-[14px] font-black text-gray-400">06:00</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
