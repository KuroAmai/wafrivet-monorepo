import { CaretLeft, ArrowSquareOut, Thermometer, Drop, ChartBar, Users, Package, Wind, Waves, ShareNetwork } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function FarmPortal() {
  const { id } = useParams();

  // Mock data for the specific farm
  const farm = {
    name: id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || "Lekki Dairy Central",
    location: "Lagos, Nigeria",
    stats: [
      { label: "Staff", value: "08", icon: Users },
      { label: "Inventory", value: "Low", icon: Package, color: "text-orange-500" },
      { label: "Efficiency", value: "94%", icon: ChartBar },
    ],
    environmental: [
      { label: "Temperature", value: "28.4°C", icon: Thermometer, status: "Optimal" },
      { label: "Humidity", value: "62%", icon: Drop, status: "Optimal" },
      { label: "Air Quality", value: "Good", icon: Wind, status: "Stable" },
      { label: "Water Level", value: "85%", icon: Waves, status: "Critical", color: "text-red-500" },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/farms" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Facility Portal</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
           <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Farm Identity */}
        <div>
           <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{farm.location}</p>
           <h2 className="text-[28px] font-black text-gray-900 leading-tight">{farm.name}</h2>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
           {farm.stats.map((stat, i) => (
             <div key={i} className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                   <stat.icon size={20} weight="bold" />
                </div>
                <div>
                   <p className={cn("text-[14px] font-black", stat.color || "text-gray-900")}>{stat.value}</p>
                   <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Environmental Control Center */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Environment</h3>
              <span className="flex items-center gap-1.5 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 Live Telemetry
              </span>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              {farm.environmental.map((metric, i) => (
                <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm space-y-4">
                   <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                         <metric.icon size={20} weight="bold" />
                      </div>
                      <p className={cn("text-[9px] font-black uppercase tracking-widest", metric.color || "text-emerald-500")}>
                         {metric.status}
                      </p>
                   </div>
                   <div>
                      <p className="text-[20px] font-black text-gray-900">{metric.value}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{metric.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Operational Tiles */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Management Tools</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { label: "Manage Facility Staff", desc: "Schedules & Performance", icon: Users },
                { label: "Inventory & Supplies", desc: "Feed, Medical, Equipment", icon: Package },
                { label: "Historical Reports", desc: "Yield & Health Trends", icon: ChartBar },
              ].map((tool, i) => (
                <button key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-[#2D4D31]/10 transition-all active:scale-[0.98]">
                   <div className="w-14 h-14 bg-gray-50 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 text-[#2D4D31]">
                      <tool.icon size={28} weight="bold" />
                   </div>
                   <div className="flex-1 text-left">
                      <h4 className="text-[15px] font-black text-gray-900">{tool.label}</h4>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{tool.desc}</p>
                   </div>
                   <ArrowSquareOut size={18} weight="bold" className="text-gray-200 group-hover:text-gray-900 transition-all" />
                </button>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
