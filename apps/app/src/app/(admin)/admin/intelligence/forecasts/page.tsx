"use client";

import { useState } from "react";
import { 
  TrendUp, 
  TrendDown, 
  MapPin, 
  Warning, 
  CloudRain, 
  ThermometerHot, 
  Microscope,
  ArrowRight,
  ChartLineUp,
  DownloadSimple,
  MagnifyingGlass,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const FORECAST_DATA = [
  { id: "FC-102", region: "Lekki North", demand: "+42%", product: "Oxytetracycline", reason: "Rainfall Spike", type: "Weather", accuracy: "94%", trend: "Bullish" },
  { id: "FC-103", region: "Kano Central", demand: "+18%", product: "Multivitamins", reason: "Heat Stress", type: "Weather", accuracy: "89%", trend: "Stable" },
  { id: "FC-104", region: "Ibadan South", demand: "-12%", product: "Broiler Starter", reason: "Supply Glut", type: "Market", accuracy: "82%", trend: "Bearish" },
  { id: "FC-105", region: "Kaduna East", demand: "+65%", product: "PPR Vaccine", reason: "Outbreak Warning", type: "Disease", accuracy: "97%", trend: "Critical" },
];

export default function DemandForecastsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Sources");

  const filteredForecasts = FORECAST_DATA.filter(item => {
    const matchesSearch = 
      item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All Sources" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Demand Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Predictive analytics for inventory and supply chain optimization</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Forecast
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Global Demand Index", value: "+14.2%", sub: "Aggregated growth", color: "emerald" },
          { label: "Highest Risk Region", value: "Kaduna", sub: "Critical stockout risk", color: "red" },
          { label: "Avg Model Accuracy", value: "91.4%", sub: "Confidence score", color: "blue" },
          { label: "Detected Outbreaks", value: "02", sub: "Active alerts", color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "red" ? "text-red-500" :
              stat.color === "blue" ? "text-blue-500" : "text-orange-500"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Unified Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all shadow-none">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search region or trending product..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {["All Sources", "Weather", "Disease", "Market"].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedType("All Sources");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Model ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Regional Intelligence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Predictive Target</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Causal Analysis</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredForecasts.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight whitespace-nowrap">{item.id}</span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <MapPin size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">{item.region}</span>
                      </div>
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-widest ml-5",
                        item.trend === "Bullish" || item.trend === "Critical" ? "text-emerald-500" :
                        item.trend === "Bearish" ? "text-red-500" : "text-blue-500"
                      )}>{item.trend} Outlook</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-1 whitespace-nowrap">{item.product}</span>
                      <div className="flex items-center gap-2">
                        {item.demand.startsWith('+') ? <TrendUp size={10} className="text-emerald-500" /> : <TrendDown size={10} className="text-red-500" />}
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          item.demand.startsWith('+') ? "text-emerald-500" : "text-red-500"
                        )}>{item.demand} Demand Shift</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white transition-all border border-transparent group-hover:border-gray-100">
                        {item.type === "Weather" ? <CloudRain size={16} weight="bold" /> : 
                         item.type === "Disease" ? <Microscope size={16} weight="bold" /> :
                         <ChartLineUp size={16} weight="bold" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-medium text-gray-600 truncate whitespace-nowrap">{item.reason}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.type} Vector</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[14px] font-black text-gray-900">{item.accuracy}</span>
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Model Match</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredForecasts.length} of {FORECAST_DATA.length} models</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((page, i) => (
              <button key={i} className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-gray-50"
              )}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
