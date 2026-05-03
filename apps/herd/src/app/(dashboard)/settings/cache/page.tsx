"use client";

import { CaretLeft, HardDrive, Trash, Info, CheckCircle, Database, Notebook, Warning } from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const CACHE_ITEMS = [
  { label: "Livestock Database", size: "12.4 MB", status: "Cached" },
  { label: "Static Assets & Icons", size: "5.8 MB", status: "Cached" },
  { label: "Offline Maps (Lagos)", size: "24.1 MB", status: "Cached" },
  { label: "Medical Templates", size: "2.2 MB", status: "Expired" },
];

export default function CachePage() {
  const [mounted, setMounted] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const clearCache = () => {
    setIsClearing(true);
    setTimeout(() => setIsClearing(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Offline Cache</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Cache Usage Visualization */}
        <div className="bg-white p-8 rounded-[48px] border border-gray-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <div>
                 <h2 className="text-[20px] font-black text-gray-900 leading-tight">44.5 MB</h2>
                 <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Offline Storage</p>
              </div>
              <div className="w-14 h-14 bg-emerald-50 text-[#2D4D31] rounded-2xl flex items-center justify-center">
                 <Database size={28} weight="bold" />
              </div>
           </div>

           {/* Progress Bar */}
           <div className="space-y-3">
              <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden flex">
                 <div className="h-full bg-[#2D4D31] w-[60%] rounded-full shadow-lg shadow-[#2D4D31]/20" />
                 <div className="h-full bg-blue-400 w-[25%] -ml-1 rounded-full" />
                 <div className="h-full bg-orange-400 w-[15%] -ml-1 rounded-full" />
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2D4D31]" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assets</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Maps</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Cache Items */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Stored Files</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {CACHE_ITEMS.map((item, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between group hover:bg-gray-50 transition-all">
                   <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                         <Notebook size={24} weight="bold" />
                      </div>
                      <div>
                         <h4 className="text-[15px] font-black text-gray-900">{item.label}</h4>
                         <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{item.size} • {item.status}</p>
                      </div>
                   </div>
                   {item.status === 'Cached' ? (
                     <CheckCircle size={18} weight="fill" className="text-emerald-500" />
                   ) : (
                     <Warning size={18} weight="fill" className="text-amber-500" />
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Action Zone */}
        <div className="space-y-4">
           <button 
             onClick={clearCache}
             disabled={isClearing}
             className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-500 rounded-[32px] font-black text-[15px] hover:bg-red-100 transition-all active:scale-[0.98] group disabled:opacity-50"
           >
              <Trash size={20} weight="bold" className="group-hover:scale-110 transition-transform" />
              {isClearing ? "Purging Cache..." : "Clear Offline Data"}
           </button>
           <div className="flex items-start gap-4 p-6 bg-blue-50/50 rounded-[32px] border border-blue-100/50">
              <Info size={20} weight="fill" className="text-blue-500 shrink-0" />
              <p className="text-[12px] text-blue-600/80 leading-relaxed">
                Clearing your cache will require an internet connection to fetch records. Offline features will be disabled until the next full sync.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
