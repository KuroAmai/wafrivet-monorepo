"use client";

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
  DownloadSimple
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const FORECAST_DATA = [
  { region: "Lekki North", demand: "↑ 42%", product: "Oxytetracycline", reason: "Rainfall Spike", type: "Weather", accuracy: "94%", color: "text-emerald-500", bg: "bg-emerald-50" },
  { region: "Kano Central", demand: "↑ 18%", product: "Multivitamins", reason: "Heat Stress", type: "Weather", accuracy: "89%", color: "text-emerald-500", bg: "bg-emerald-50" },
  { region: "Ibadan South", demand: "↓ 12%", product: "Broiler Starter", reason: "Supply Glut", type: "Market", accuracy: "82%", color: "text-red-500", bg: "bg-red-50" },
  { region: "Kaduna East", demand: "↑ 65%", product: "PPR Vaccine", reason: "Outbreak Warning", type: "Disease", accuracy: "97%", color: "text-emerald-500", bg: "bg-emerald-50" },
];

export default function DemandForecastsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Demand Forecasting</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Predictive analytics for inventory and supply chain optimization</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Forecast
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#2D4D31] p-8 rounded-[32px] shadow-lg shadow-[#2D4D31]/20 flex items-center justify-between overflow-hidden relative group">
          <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform">
             <ChartLineUp size={140} weight="fill" />
          </div>
          <div>
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest block mb-2">Global Demand Index</span>
            <div className="flex items-center gap-4">
              <div className="text-[42px] font-black text-white leading-none tracking-tight">↑ 14.2%</div>
              <span className="text-[12px] font-bold text-emerald-400 bg-white/10 px-3 py-1 rounded-lg uppercase tracking-widest">Bullish</span>
            </div>
            <p className="text-[12px] font-bold text-white/80 mt-6 flex items-center gap-2">
              Driven by vaccination cycles in Northern Nigeria <ArrowRight size={14} weight="bold" />
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Highest Demand State</span>
            <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight">Kaduna</div>
            <p className="text-[11px] font-bold text-red-500 mt-4 flex items-center gap-2">
              <Warning size={14} weight="fill" /> High risk of regional stockouts
            </p>
          </div>
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center">
             <MapPin size={32} weight="duotone" />
          </div>
        </div>
      </div>

      {/* Regions List */}
      <div className="space-y-6">
        <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest px-2">Regional Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FORECAST_DATA.map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm">
                    <MapPin size={24} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-1">{item.region}</h4>
                    <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Accuracy: {item.accuracy}</span>
                  </div>
                </div>
                <div className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-black", item.bg, item.color)}>
                  {item.demand.startsWith('↑') ? <TrendUp size={16} weight="bold" /> : <TrendDown size={16} weight="bold" />}
                  {item.demand}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-50">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Trending Product</span>
                  <span className="text-[14px] font-black text-gray-900">{item.product}</span>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    {item.type === "Weather" ? <CloudRain size={20} weight="bold" /> : 
                     item.type === "Disease" ? <Microscope size={20} weight="bold" /> :
                     <ChartLineUp size={20} weight="bold" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Reasoning</span>
                    <p className="text-[13px] font-medium text-gray-600 leading-tight">{item.reason}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
