"use client";

import { 
  CaretLeft, 
  DotsThreeVertical, 
  PaperPlaneTilt, 
  Plus, 
  Microphone, 
  Sparkle,
  Heartbeat,
  ChartLineUp,
  Brain,
  Info
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

const THREAD_METADATA: any = {
  "herd-health": { title: "Health Monitor", icon: Heartbeat, color: "text-red-500", bg: "bg-red-50" },
  "production-analysis": { title: "Yield Intelligence", icon: ChartLineUp, color: "text-emerald-500", bg: "bg-emerald-50" },
  "general-assistant": { title: "Wafrivet Core AI", icon: Brain, color: "text-blue-500", bg: "bg-blue-50" },
};

export default function ChatDetailPage() {
  const { id } = useParams();
  const thread = THREAD_METADATA[id as string] || THREAD_METADATA["general-assistant"];
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Dr. Ademola, I've analyzed the latest sensor data from the Lekki cluster.", time: "12:45 PM" },
    { role: "user", content: "Are there any anomalies in the temperature logs?", time: "12:46 PM" },
    { role: "assistant", content: "Yes. Animal #WAF-882 shows a spike of 1.2°C above baseline. I've flagged this for your morning round.", time: "12:46 PM" },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-white animate-in slide-in-from-right-8 duration-500">
      {/* Chat Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-4 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Link href="/ai" className="p-2 hover:bg-gray-50 rounded-xl transition-all active:scale-90">
              <CaretLeft size={24} weight="bold" className="text-gray-900" />
           </Link>
           <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", thread.bg, thread.color)}>
                 <thread.icon size={20} weight="bold" />
              </div>
              <div>
                 <h1 className="text-[16px] font-black text-gray-900 tracking-tight leading-none">{thread.title}</h1>
                 <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">Active Now</p>
              </div>
           </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 pointer-events-none">
           <button className="p-2"><Info size={20} weight="bold" /></button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar pb-32"
      >
         <div className="text-center py-8">
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Today 12:45 PM</p>
         </div>

         {messages.map((msg, idx) => (
           <div key={idx} className={cn(
             "flex w-full",
             msg.role === "user" ? "justify-end" : "justify-start"
           )}>
              <div className={cn(
                "max-w-[85%] p-4 rounded-[28px] text-[15px] font-medium leading-relaxed shadow-sm",
                msg.role === "user" 
                  ? "bg-[#2D4D31] text-white rounded-tr-none" 
                  : "bg-gray-100 text-gray-900 rounded-tl-none"
              )}>
                 {msg.content}
                 <p className={cn(
                   "text-[9px] font-black uppercase tracking-widest mt-2 opacity-50",
                   msg.role === "user" ? "text-right" : "text-left"
                 )}>
                   {msg.time}
                 </p>
              </div>
           </div>
         ))}
      </div>

      {/* Input Console */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
         <div className="max-w-3xl mx-auto flex items-end gap-3">
            <div className="flex-1 relative flex items-center">
               <button className="absolute left-4 text-gray-400 hover:text-[#2D4D31] transition-all">
                  <Plus size={20} weight="bold" />
               </button>
               <textarea 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                 placeholder="Wafrivet Intelligence..."
                 className="w-full bg-gray-100 border-none p-4 pl-12 pr-12 rounded-[28px] text-[15px] font-medium text-gray-900 focus:ring-4 focus:ring-[#2D4D31]/5 transition-all outline-none placeholder:text-gray-400 max-h-32 min-h-[56px] resize-none overflow-hidden"
                 rows={1}
               />
               <button className="absolute right-4 text-gray-400 hover:text-[#2D4D31] transition-all">
                  <Microphone size={20} weight="bold" />
               </button>
            </div>
            <button 
              onClick={handleSend}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90",
                input.trim() ? "bg-[#2D4D31] text-white shadow-[#2D4D31]/20" : "bg-gray-100 text-gray-300 shadow-none"
              )}
            >
               <PaperPlaneTilt size={24} weight="bold" />
            </button>
         </div>
         <p className="text-center text-[9px] font-black text-gray-300 mt-4 uppercase tracking-[0.3em]">
           End-to-End Encrypted Intelligence
         </p>
      </div>
    </div>
  );
}
