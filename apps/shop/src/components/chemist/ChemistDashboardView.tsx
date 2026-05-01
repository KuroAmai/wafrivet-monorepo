"use client";

import { 
  ShoppingCart, 
  TrendUp, 
  SealWarning, 
  CurrencyNgn,
  Plus
} from "@phosphor-icons/react";
import { StatCard } from "./StatCard";
import { IncomingOrders } from "./IncomingOrders";
import { StockAlerts } from "./StockAlerts";

export function ChemistDashboardView() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight">Operations Console</h1>
          <p className="text-[14px] text-gray-500 font-medium">Welcome back, Lagos Island Branch</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-[14px] text-gray-700 hover:bg-gray-50 transition-all">
            Download Report
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-bold text-[14px] hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10">
            <Plus size={18} weight="bold" /> Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Orders Today" 
          value="24" 
          subValue="12%" 
          trend="up" 
          icon={<ShoppingCart size={24} weight="duotone" />} 
          color="blue" 
        />
        <StatCard 
          label="Revenue Today" 
          value="₦184,500" 
          subValue="8%" 
          trend="up" 
          icon={<CurrencyNgn size={24} weight="duotone" />} 
          color="green" 
        />
        <StatCard 
          label="Low Stock" 
          value="3 Items" 
          subValue="2" 
          trend="up" 
          icon={<SealWarning size={24} weight="duotone" />} 
          color="red" 
        />
        <StatCard 
          label="Pending Payout" 
          value="₦42,000" 
          icon={<TrendUp size={24} weight="duotone" />} 
          color="purple" 
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[600px]">
        <div className="lg:col-span-7 xl:col-span-8">
          <IncomingOrders />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <StockAlerts />
        </div>
      </div>
    </div>
  );
}
