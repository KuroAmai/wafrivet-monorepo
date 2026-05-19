import { Sparkle, MagnifyingGlass, CaretRight, Heartbeat, ChartLineUp, Brain } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function AIList() {
  useDocumentTitle("Intelligence");
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
             className="w-full bg-gray-100 border-none p-4 pl-14 rounded-2xl text-[14px] font-bold text-gray-900 focus:ring-4 focus:ring-[#2D4D31]/5 transition-all outline-none placeholder:text-gray-400"
           />
        </div>
      </div>

      {/* Conversations List */}
      <div className="space-y-1">
          <Link 
            to="/ai/herd-health"
            className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-all group active:scale-[0.98] relative"
          >
             <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-red-50 text-red-500">
                <Heartbeat size={32} weight="bold" />
             </div>
             <div className="flex-1 min-w-0 border-b border-gray-50 pb-5">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-[17px] font-black text-gray-900 tracking-tight leading-tight truncate pr-4">Herd Health Monitor</h3>
                   <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#2D4D31]">2m ago</span>
                      <CaretRight size={14} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                   </div>
                </div>
                <p className="text-[14px] leading-snug line-clamp-2 text-gray-900 font-bold">
                   3 animals in Lekki show elevated temps. Recommend inspection.
                </p>
             </div>
             <div className="absolute left-2 w-2 h-2 bg-[#2D4D31] rounded-full shadow-lg shadow-[#2D4D31]/20" />
          </Link>

          <Link 
            to="/ai/production-analysis"
            className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-all group active:scale-[0.98] relative"
          >
             <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-emerald-50 text-emerald-500">
                <ChartLineUp size={32} weight="bold" />
             </div>
             <div className="flex-1 min-w-0 border-b border-gray-50 pb-5">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-[17px] font-black text-gray-900 tracking-tight leading-tight pr-4">Yield Intelligence</h3>
                   <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-300">1h ago</span>
                      <CaretRight size={14} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                   </div>
                </div>
                <p className="text-[14px] leading-snug line-clamp-2 text-gray-400 font-medium">
                   May 2026 forecast is ready. Milk yield projected +12%.
                </p>
             </div>
          </Link>

          <Link 
            to="/ai/general-assistant"
            className="flex items-center gap-5 p-5 hover:bg-gray-50 transition-all group active:scale-[0.98] relative"
          >
             <div className="w-16 h-16 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-blue-50 text-blue-500">
                <Brain size={32} weight="bold" />
             </div>
             <div className="flex-1 min-w-0 border-b border-gray-50 pb-5 group-last:border-0">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-[17px] font-black text-gray-900 tracking-tight leading-tight pr-4">Wafrivet Core AI</h3>
                   <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-300">Yesterday</span>
                      <CaretRight size={14} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                   </div>
                </div>
                <p className="text-[14px] leading-snug line-clamp-2 text-gray-400 font-medium">
                   How can I help you today, Dr. Ademola?
                </p>
             </div>
          </Link>
      </div>
    </div>
  );
}
