"use client";

import { Warning, ArrowRight, Package, TrendUp } from "@phosphor-icons/react";

const ALERTS = [
  {
    name: "Ivermectin 1%",
    current: 3,
    min: 10,
    status: "critical"
  },
  {
    name: "Digital Ear Tags",
    current: 12,
    min: 15,
    status: "warning"
  }
];

export function StockAlerts() {
  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Inventory Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Inventory Health</h2>
          <button className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline flex items-center gap-1.5">
            Full Stock <ArrowRight size={14} weight="bold" />
          </button>
        </div>

        <div className="p-8 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">
            <Warning size={14} className="text-amber-500" /> Critical Alerts
          </div>
          
          <div className="divide-y divide-gray-50">
            {ALERTS.map((alert, idx) => (
              <div key={idx} className="py-5 first:pt-0 last:pb-0 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${alert.status === 'critical' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'} group-hover:scale-110`}>
                    <Package size={20} weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-[14px] mb-0.5">{alert.name}</h4>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{alert.current} Units · <span className="text-red-400">Min {alert.min}</span></p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-bold text-gray-900 hover:bg-[#2D4D31] hover:text-white hover:border-[#2D4D31] transition-all">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Glassmorphism Insight Card */}
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D4D31] to-[#1a2e1d] rounded-[40px] blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[40px] border border-white p-8 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#2D4D31]/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <div className="w-12 h-12 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2D4D31]/20">
              <TrendUp size={24} weight="bold" />
            </div>
            
            <div>
              <h4 className="font-black text-gray-900 text-[18px] tracking-tight mb-2">Demand Forecast</h4>
              <p className="text-gray-500 text-[13px] font-medium leading-relaxed">
                Oxytetracycline demand is projected to spike by <span className="text-[#2D4D31] font-bold">25%</span> next week based on regional livestock cycles.
              </p>
            </div>

            <button className="flex items-center gap-2 text-[13px] font-black text-[#2D4D31] group/btn">
              Create Bulk Order 
              <ArrowRight size={16} weight="bold" className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
