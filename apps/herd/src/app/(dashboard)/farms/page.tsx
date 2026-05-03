"use client";

import { MapPin, Users, ChartLineUp, Plus, CaretRight, NavigationArrow } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const FARMS = [
  { 
    id: "F-001", 
    name: "Lekki Dairy Heights", 
    location: "Lekki, Lagos", 
    herdSize: 450, 
    status: "Healthy",
    performance: "+4.2%",
    lastVisit: "2 days ago"
  },
  { 
    id: "F-002", 
    name: "Ikorodu Grazing Hub", 
    location: "Ikorodu, Lagos", 
    herdSize: 120, 
    status: "Attention",
    performance: "-0.8%",
    lastVisit: "5 hours ago"
  },
  { 
    id: "F-003", 
    name: "Epe Livestock Estate", 
    location: "Epe, Lagos", 
    herdSize: 890, 
    status: "Healthy",
    performance: "+12.1%",
    lastVisit: "Just now"
  },
];

export default function FarmsPage() {
  return (
    <div className="space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-32">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
            Managed <br />
            <span className="text-gray-400">Farms</span>
          </h1>
        </div>
        <button className="w-14 h-14 bg-[#2D4D31] text-white rounded-[20px] flex items-center justify-center shadow-lg shadow-[#2D4D31]/20 active:scale-90 transition-transform">
          <Plus size={28} weight="bold" />
        </button>
      </div>

      {/* Map Overview Placeholder */}
      <section className="relative h-48 bg-gray-100 rounded-[40px] overflow-hidden border border-gray-100 group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/lonlat:-3.7,40.4,12/400x200?access_token=pk.eyJ1IjoiYmhhdnlhMTQiLCJhIjoiY2p4bHh4eHh4eHh4eHh4eHh4eHh4eHh4eHgifQ')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <NavigationArrow size={20} weight="fill" className="text-[#2D4D31]" />
             </div>
             <div>
                <p className="text-[12px] font-black text-gray-900">Current View</p>
                <p className="text-[10px] font-bold text-gray-400">Lagos Metropolitan Area</p>
             </div>
          </div>
          <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/50">
             3 Farms Active
          </span>
        </div>
      </section>

      {/* Farms List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">All Facilities</h3>
          <span className="text-[10px] font-bold text-gray-300">Updated Real-time</span>
        </div>

        <div className="grid gap-4">
          {FARMS.map((farm) => (
            <div 
              key={farm.id}
              className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-[#2D4D31]/20 transition-all group active:scale-[0.98]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] group-hover:bg-[#2D4D31] group-hover:text-white transition-colors">
                    <MapPin size={24} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-gray-900">{farm.name}</h4>
                    <p className="text-[11px] font-bold text-gray-400">{farm.location}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                  farm.status === "Healthy" ? "bg-emerald-50 text-emerald-600" : "bg-orange-50 text-orange-600"
                )}>
                  {farm.status}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-50">
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Herd Size</p>
                  <p className="text-[16px] font-black text-gray-900">{farm.herdSize}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Growth</p>
                  <p className={cn("text-[16px] font-black", farm.performance.startsWith('+') ? "text-emerald-500" : "text-red-500")}>
                    {farm.performance}
                  </p>
                </div>
                <div className="flex justify-end items-end">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-[#2D4D31]/10 group-hover:text-[#2D4D31] transition-colors">
                    <CaretRight size={20} weight="bold" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
