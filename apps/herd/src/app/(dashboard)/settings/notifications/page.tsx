"use client";

import { CaretLeft, Bell, BellRinging, Siren, ShieldCheck, Heartbeat, Chats, ToggleLeft, ToggleRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState({
    critical: true,
    sync: true,
    ai: false,
    admin: true
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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

        {/* Categories - Explicitly Rendered */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Notification Channels</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              
              {/* Critical Health */}
              <div className="p-6 flex items-center justify-between group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-red-50 text-red-500">
                       <Siren size={24} weight="bold" />
                    </div>
                    <div>
                       <h4 className="text-[15px] font-black text-gray-900">Critical Health Alerts</h4>
                       <p className="text-[12px] text-gray-400 font-medium">Immediate push for FMD or emergency symptoms</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSettings({...settings, critical: !settings.critical})}
                   className={cn("transition-colors duration-300", settings.critical ? "text-[#2D4D31]" : "text-gray-200")}
                 >
                    {settings.critical ? <ToggleRight size={44} weight="fill" /> : <ToggleLeft size={44} weight="fill" />}
                 </button>
              </div>

              {/* Sync Report */}
              <div className="p-6 flex items-center justify-between group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-emerald-50 text-[#2D4D31]">
                       <ShieldCheck size={24} weight="bold" />
                    </div>
                    <div>
                       <h4 className="text-[15px] font-black text-gray-900">Daily Sync Report</h4>
                       <p className="text-[12px] text-gray-400 font-medium">Morning summary of herd performance</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSettings({...settings, sync: !settings.sync})}
                   className={cn("transition-colors duration-300", settings.sync ? "text-[#2D4D31]" : "text-gray-200")}
                 >
                    {settings.sync ? <ToggleRight size={44} weight="fill" /> : <ToggleLeft size={44} weight="fill" />}
                 </button>
              </div>

              {/* AI Insights */}
              <div className="p-6 flex items-center justify-between group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-blue-50 text-blue-500">
                       <Heartbeat size={24} weight="bold" />
                    </div>
                    <div>
                       <h4 className="text-[15px] font-black text-gray-900">AI Insights</h4>
                       <p className="text-[12px] text-gray-400 font-medium">Diagnostic suggestions and optimizations</p>
                    </div>
                 </div>
                 <button 
                   onClick={() => setSettings({...settings, ai: !settings.ai})}
                   className={cn("transition-colors duration-300", settings.ai ? "text-[#2D4D31]" : "text-gray-200")}
                 >
                    {settings.ai ? <ToggleRight size={44} weight="fill" /> : <ToggleLeft size={44} weight="fill" />}
                 </button>
              </div>

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
        </div>
      </div>
    </div>
  );
}
