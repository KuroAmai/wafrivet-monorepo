"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Warning,
  Package,
  Storefront,
  MapPin,
  ArrowRight,
  Circle,
  X,
  TrendUp,
  TrendDown
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ALERTS_DATA = [
  { id: "SKU-402", product: "Oxytetracycline 20%", chemist: "Pharmacy Plus", region: "Lekki North", stock: 4, avgSales: 1.8, daysLeft: 2, status: "Critical" },
  { id: "SKU-405", product: "Ivermectin 1%", chemist: "Lekki Pharma", region: "Lekki North", stock: 12, avgSales: 3.2, daysLeft: 3, status: "Warning" },
  { id: "SKU-409", product: "Multivitamin Inj", chemist: "City Agro & Vet", region: "Ibadan South", stock: 2, avgSales: 0.5, daysLeft: 4, status: "Warning" },
  { id: "SKU-412", product: "Penicillin G", chemist: "Pharmacy Plus", region: "Lekki North", stock: 1, avgSales: 1.2, daysLeft: 1, status: "Critical" },
];

export default function StockoutAlertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Alerts");

  const filteredAlerts = ALERTS_DATA.filter(alert => {
    const matchesSearch = 
      alert.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.chemist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All Alerts" || alert.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Stockout Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Real-time monitoring of regional inventory depletion risks</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Alerts
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Critical Stockouts", value: "14", sub: "Under 3 days left", color: "red" },
          { label: "Inventory Warnings", value: "28", sub: "3-7 days remaining", color: "orange" },
          { label: "Avg Burn Rate", value: "4.2/day", sub: "Product velocity", color: "blue" },
          { label: "Network Health", value: "94.2%", sub: "Stocked SKUs", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "red" ? "text-red-500" :
              stat.color === "orange" ? "text-orange-500" :
              stat.color === "blue" ? "text-blue-500" : "text-emerald-500"
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
            placeholder="Search product or chemist..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Alerts", "Critical", "Warning"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Alerts");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Product / SKU</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Merchant Location</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Available Inventory</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Depletion Logic</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAlerts.map((alert) => (
                <tr key={alert.id} className={cn(
                  "group transition-all",
                  alert.status === "Critical" ? "hover:bg-red-50/20" : "hover:bg-gray-50/30"
                )}>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center border transition-all",
                        alert.status === "Critical" 
                          ? "bg-red-50 text-red-500 border-red-100" 
                          : "bg-gray-50 text-gray-400 border-gray-100"
                      )}>
                        <Package size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-black text-gray-900 leading-none mb-0.5 truncate whitespace-nowrap">{alert.product}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{alert.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Storefront size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">{alert.chemist}</span>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <MapPin size={10} className="text-gray-400" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{alert.region}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[15px] font-black whitespace-nowrap",
                        alert.stock <= 5 ? "text-red-500" : "text-gray-900"
                      )}>{alert.stock} Units Left</span>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Velocity: {alert.avgSales}/day</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col w-32">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={cn(
                          "text-[13px] font-black",
                          alert.daysLeft <= 2 ? "text-red-500" : "text-orange-500"
                        )}>{alert.daysLeft} Days</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Burn Rate</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          alert.status === "Critical" ? "bg-red-500" : "bg-orange-500"
                        )} style={{ width: `${(alert.daysLeft / 7) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border mb-1",
                        alert.status === "Critical" ? "bg-red-500 text-white border-red-600 shadow-sm" : "bg-orange-50 text-orange-500 border-orange-100"
                      )}>
                        {alert.status}
                      </span>
                      <button className="text-[10px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline decoration-2 underline-offset-4 transition-all">
                        Restock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredAlerts.length} of {ALERTS_DATA.length} alerts</span>
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
