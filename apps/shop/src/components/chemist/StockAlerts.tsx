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
    <div className="bg-white rounded-[32px] border border-gray-100 flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Inventory Health</h2>
        <button className="text-[13px] font-bold text-[#2D4D31] hover:underline flex items-center gap-1">
          Full Inventory <ArrowRight size={14} weight="bold" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Low Stock Alerts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <Warning size={16} className="text-amber-500" /> Low Stock Alerts
          </div>
          {ALERTS.map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${alert.status === 'critical' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                  <Package size={20} weight="duotone" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{alert.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{alert.current} units left · Min {alert.min}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 hover:bg-gray-100 transition-colors">
                Restock
              </button>
            </div>
          ))}
        </div>

        {/* Reorder Suggestions */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <TrendUp size={16} className="text-blue-500" /> Demand Insights
          </div>
          <div className="p-5 bg-blue-50/50 rounded-[28px] border border-blue-100/50 relative overflow-hidden group cursor-pointer">
            <div className="relative z-10">
              <h4 className="font-black text-blue-900 text-[15px] mb-1">Stock Up on Antibiotics</h4>
              <p className="text-blue-700/70 text-[12px] font-medium leading-relaxed mb-4">
                Based on rising trends in your area, Oxytetracycline demand is expected to spike by 25% next week.
              </p>
              <div className="flex items-center gap-2 text-[13px] font-black text-blue-900">
                Create Bulk Order <ArrowRight size={14} weight="bold" />
              </div>
            </div>
            <Package size={80} weight="duotone" className="absolute -right-4 -bottom-4 text-blue-900/5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}
