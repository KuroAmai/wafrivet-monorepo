"use client";

import { ArrowRight, Package, TrendUp } from "@phosphor-icons/react";

const ALERTS = [
  { name: "Ivermectin 1%", current: 3, min: 10 },
  { name: "Digital Ear Tags", current: 12, min: 15 }
];

export function StockAlerts() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-8">
        <h2 className="text-[18px] font-black text-gray-900 tracking-tight mb-6">Inventory Health</h2>
        
        <div className="space-y-5">
          {ALERTS.map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                  <Package size={16} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[13px]">{alert.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{alert.current} Units left</p>
                </div>
              </div>
              <button className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline">
                Restock
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Simplified Insight Card */}
      <div className="bg-white/50 backdrop-blur-xl rounded-[40px] border border-gray-100 p-8">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white">
            <TrendUp size={20} weight="bold" />
          </div>
          <div>
            <h4 className="font-black text-gray-900 text-[16px] tracking-tight mb-1">Demand Spike</h4>
            <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
              Oxytetracycline demand projected to spike by <span className="text-[#2D4D31] font-bold">25%</span> next week.
            </p>
          </div>
          <button className="flex items-center gap-1.5 text-[11px] font-black text-[#2D4D31] uppercase tracking-widest">
            Create Order <ArrowRight size={14} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
