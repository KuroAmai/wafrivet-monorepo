import { CaretLeft, Warning, Thermometer, WarningCircle, Heartbeat, CaretRight, CheckCircle, ShareNetwork } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ALERTS = [
  { id: 1, animal: "Bella", tag: "WAF-882", issue: "Elevated Temperature", severity: "Critical", value: "40.2°C", time: "12m ago", icon: Thermometer, color: "text-red-500", bg: "bg-red-50" },
  { id: 2, animal: "Max", tag: "WAF-773", issue: "Low Activity Level", severity: "High", value: "-45%", time: "1h ago", icon: WarningCircle, color: "text-orange-500", bg: "bg-orange-50" },
  { id: 3, animal: "Daisy", tag: "WAF-112", issue: "Irregular Heart Rate", severity: "Moderate", value: "92 bpm", time: "3h ago", icon: Heartbeat, color: "text-blue-500", bg: "bg-blue-50" },
];

export default function HealthAlerts() {
  const [activeTab, setActiveTab] = useState("Critical");

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Health Alerts</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
           <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-8">
        {/* Severity Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-2xl">
           {["All", "Critical", "Moderate"].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)}
               className={cn(
                 "flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all",
                 activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-400"
               )}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
           {ALERTS.map((alert) => (
             <Link 
               key={alert.id}
               to={`/animal/${alert.tag}`}
               className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:border-red-100 transition-all active:scale-[0.98]"
             >
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", alert.bg, alert.color)}>
                         <alert.icon size={28} weight="bold" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-[16px] font-black text-gray-900">{alert.animal}</h4>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{alert.tag}</span>
                         </div>
                         <p className={cn("text-[12px] font-bold uppercase tracking-widest", alert.color)}>{alert.severity} Alert</p>
                      </div>
                   </div>
                   <CaretRight size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                   <div>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Issue</p>
                      <p className="text-[14px] font-black text-gray-900">{alert.issue}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Reading</p>
                      <p className={cn("text-[17px] font-black", alert.color)}>{alert.value}</p>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                   <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">{alert.time}</p>
                   <button className="flex items-center gap-2 px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all">
                      <CheckCircle size={14} weight="bold" />
                      Mark Resolved
                   </button>
                </div>
             </Link>
           ))}
        </div>

        {/* Empty State / Footer */}
        <div className="p-10 border-2 border-dashed border-gray-100 rounded-[40px] text-center space-y-4">
           <Warning size={32} weight="bold" className="mx-auto text-gray-200" />
           <p className="text-[13px] font-bold text-gray-400">All other animals are currently reporting within normal operational parameters.</p>
        </div>
      </div>
    </div>
  );
}
