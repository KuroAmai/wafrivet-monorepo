"use client";

import { Plus, DownloadSimple } from "@phosphor-icons/react";
import { StatCard } from "./StatCard";
import { IncomingOrders } from "./IncomingOrders";
import { StockAlerts } from "./StockAlerts";

export function ChemistDashboardView() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      {/* Refined Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Operations Console</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Lagos Island Branch · <span className="text-emerald-500">Online</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
            <DownloadSimple size={16} weight="bold" /> Reports
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10">
            <Plus size={16} weight="bold" /> Add Inventory
          </button>
        </div>
      </div>

      {/* Simplified Ticker Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Volume" value="24 Orders" />
        <StatCard label="Revenue" value="₦184,500" />
        <StatCard label="Risk" value="3 Alerts" />
        <StatCard label="Yield" value="₦42,000" />
      </div>

      {/* Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <IncomingOrders />
        </div>
        <div className="lg:col-span-4">
          <StockAlerts />
        </div>
      </div>
    </div>
  );
}
