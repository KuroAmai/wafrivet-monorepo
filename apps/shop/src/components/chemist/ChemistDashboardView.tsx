"use client";

import { 
  ShoppingCart, 
  TrendUp, 
  SealWarning, 
  CurrencyNgn,
  Plus,
  Funnel,
  DownloadSimple
} from "@phosphor-icons/react";
import { StatCard } from "./StatCard";
import { IncomingOrders } from "./IncomingOrders";
import { StockAlerts } from "./StockAlerts";

export function ChemistDashboardView() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-8 bg-[#2D4D31] rounded-full" />
            <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none">Operations Console</h1>
          </div>
          <p className="text-[14px] text-gray-400 font-bold uppercase tracking-[0.2em] ml-5">Lagos Island Branch · <span className="text-emerald-500">Online</span></p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2.5 px-6 py-4 bg-white border border-gray-100 rounded-3xl font-black text-[12px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
            <DownloadSimple size={18} weight="bold" /> Reports
          </button>
          <button className="flex items-center gap-2.5 px-8 py-4 bg-[#2D4D31] text-white rounded-3xl font-black text-[12px] uppercase tracking-widest hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20">
            <Plus size={18} weight="bold" /> Add Inventory
          </button>
        </div>
      </div>

      {/* Ticker Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Today's Volume" 
          value="24 Orders" 
          subValue="12%" 
          trend="up" 
          icon={<ShoppingCart size={24} weight="duotone" />} 
          color="blue" 
        />
        <StatCard 
          label="Daily Revenue" 
          value="₦184,500" 
          subValue="8.4%" 
          trend="up" 
          icon={<CurrencyNgn size={24} weight="duotone" />} 
          color="green" 
        />
        <StatCard 
          label="Inventory Risk" 
          value="3 Alerts" 
          subValue="Critical" 
          trend="up" 
          icon={<SealWarning size={24} weight="duotone" />} 
          color="red" 
        />
        <StatCard 
          label="Growth Yield" 
          value="₦42,000" 
          icon={<TrendUp size={24} weight="duotone" />} 
          color="purple" 
        />
      </div>

      {/* Primary Action Console Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 flex flex-col h-full">
          <IncomingOrders />
        </div>
        <div className="lg:col-span-4 flex flex-col h-full">
          <StockAlerts />
        </div>
      </div>
    </div>
  );
}
