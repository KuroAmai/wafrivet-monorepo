"use client";

import { CaretLeft, CloudArrowUp, ArrowsClockwise, CheckCircle, Warning, Info, HardDrive, WifiHigh } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function SyncPage() {
  const [mounted, setMounted] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const startSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Cloud Sync</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Sync Status Header */}
        <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-6">
           <div className={cn(
             "w-24 h-24 rounded-[32px] flex items-center justify-center relative",
             isSyncing ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/30" : "bg-emerald-50 text-emerald-600"
           )}>
              <CloudArrowUp size={48} weight="bold" className={cn(isSyncing && "animate-bounce")} />
              {isSyncing && (
                <div className="absolute inset-0 rounded-[32px] border-4 border-white/30 border-t-white animate-spin" />
              )}
           </div>
           <div>
              <h2 className="text-[20px] font-black text-gray-900">Cloud Status: Active</h2>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">Last synced: 12:45 PM Today</p>
           </div>
           <button 
             onClick={startSync}
             disabled={isSyncing}
             className="w-full py-5 bg-[#2D4D31] text-white rounded-[24px] font-black text-[14px] uppercase tracking-widest shadow-lg shadow-[#2D4D31]/20 active:scale-95 transition-all disabled:opacity-50"
           >
              {isSyncing ? "Synchronizing..." : "Sync Database Now"}
           </button>
        </div>

        {/* Sync Details */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4">
                 <HardDrive size={20} weight="bold" />
              </div>
              <p className="text-[20px] font-black text-gray-900 leading-none">1.2 GB</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Storage Used</p>
           </div>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                 <WifiHigh size={20} weight="bold" />
              </div>
              <p className="text-[20px] font-black text-gray-900 leading-none">LTE/5G</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Network State</p>
           </div>
        </div>

        {/* Audit Log */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Recent Activities</h3>
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                 <ArrowsClockwise size={18} weight="bold" />
              </button>
           </div>
           
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {[
                { label: "Livestock Registry Sync", time: "10:30 AM", status: "Success" },
                { label: "NFC Tag Map Update", time: "09:12 AM", status: "Success" },
                { label: "Veterinary Report Upload", time: "Yesterday", status: "Error" },
              ].map((log, idx) => (
                <div key={idx} className="p-5 flex items-center justify-between group hover:bg-gray-50 transition-all">
                   <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        log.status === 'Success' ? "bg-emerald-500" : "bg-red-500"
                      )} />
                      <div>
                         <p className="text-[14px] font-black text-gray-900 leading-none">{log.label}</p>
                         <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{log.time}</p>
                      </div>
                   </div>
                   {log.status === 'Error' ? (
                     <Warning size={18} weight="fill" className="text-red-500" />
                   ) : (
                     <CheckCircle size={18} weight="fill" className="text-emerald-500" />
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Sync Settings */}
        <div className="p-8 bg-gray-900 rounded-[40px] text-white space-y-4">
           <div className="flex items-center gap-3">
              <Info size={20} weight="fill" className="text-emerald-400" />
              <h4 className="text-[15px] font-black">Sync over Cellular</h4>
           </div>
           <p className="text-[12px] text-gray-400 leading-relaxed">
             Enable this to keep your records updated even when away from Wi-Fi. Large media files (videos) will still require Wi-Fi.
           </p>
           <button className="text-[13px] font-black text-emerald-400 uppercase tracking-widest hover:underline">Manage Data Usage</button>
        </div>
      </div>
    </div>
  );
}
