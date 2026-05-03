"use client";

import { Sparkle, MagnifyingGlass, CaretRight, ChatCircleDots, Robot, Heartbeat, ChartLineUp, Brain } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AI_THREADS = [
  {
    id: "herd-health",
    title: "Herd Health Monitor",
    lastMessage: "3 animals in Lekki show elevated temps. Recommend inspection.",
    time: "2m ago",
    unread: true,
    icon: Heartbeat,
    color: "text-red-500",
    bg: "bg-red-50"
  },
  {
    id: "production-analysis",
    title: "Yield Intelligence",
    lastMessage: "May 2026 forecast is ready. Milk yield projected +12%.",
    time: "1h ago",
    unread: false,
    icon: ChartLineUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    id: "general-assistant",
    title: "Wafrivet Core AI",
    lastMessage: "How can I help you today, Dr. Ademola?",
    time: "Yesterday",
    unread: false,
    icon: Brain,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
];

export default function AIListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
          Recent <br />
          <span className="text-gray-400">Intelligence</span>
        </h1>
        
        {/* iMessage Style Search */}
        <div className="relative group">
           <MagnifyingGlass size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D4D31] transition-colors" />
           <input 
             type="text"
             placeholder="Search messages..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-gray-100 border-none p-4 pl-14 rounded-2xl text-[14px] font-bold text-gray-900 focus:ring-4 focus:ring-[#2D4D31]/5 transition-all outline-none placeholder:text-gray-400"
           />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-1">
        {AI_THREADS.map((thread) => (
          <Link 
            key={thread.id} 
            href={`/ai/${thread.id}`}
            className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-all group active:scale-[0.98] relative"
          >
             <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", thread.bg, thread.color)}>
                <thread.icon size={32} weight="bold" />
             </div>

             <div className="flex-1 min-w-0 border-b border-gray-50 pb-5 group-last:border-0">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-[17px] font-black text-gray-900 tracking-tight leading-tight truncate pr-4">{thread.title}</h3>
                   <div className="flex items-center gap-2">
                      <span className={cn("text-[11px] font-bold uppercase tracking-widest", thread.unread ? "text-[#2D4D31]" : "text-gray-300")}>
                        {thread.time}
                      </span>
                      <CaretRight size={14} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                   </div>
                </div>
                <p className={cn(
                  "text-[14px] leading-snug line-clamp-2",
                  thread.unread ? "text-gray-900 font-bold" : "text-gray-400 font-medium"
                )}>
                   {thread.lastMessage}
                </p>
             </div>

             {thread.unread && (
               <div className="absolute left-2 w-2 h-2 bg-[#2D4D31] rounded-full shadow-lg shadow-[#2D4D31]/20" />
             )}
          </Link>
        ))}
      </div>

      {/* New Chat FAB - Minimalist iMessage style */}
      <div className="mt-12 flex justify-center">
         <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-black text-[13px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
            <ChatCircleDots size={20} weight="fill" />
            New Thread
         </button>
      </div>
    </div>
  );
}
