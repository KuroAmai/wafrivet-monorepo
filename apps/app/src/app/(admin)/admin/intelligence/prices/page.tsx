"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  ChartLineUp,
  ChartLineDown,
  Tag,
  CurrencyNgn,
  Warning,
  ArrowRight,
  CaretRight,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PRICES_DATA = [
  { id: "PX-201", product: "Oxytetracycline 20%", category: "Antibiotics", platformAvg: "₦8,500", marketAvg: "₦8,200", deviation: "+3.6%", trend: "up" },
  { id: "PX-205", product: "Ivermectin 1%", category: "Dewormers", platformAvg: "₦4,200", marketAvg: "₦5,100", deviation: "-17.6%", trend: "down" },
  { id: "PX-209", product: "Multivitamin Inj", category: "Supplements", platformAvg: "₦6,800", marketAvg: "₦6,500", deviation: "+4.6%", trend: "up" },
  { id: "PX-212", product: "Penicillin G", category: "Antibiotics", platformAvg: "₦12,000", marketAvg: "₦10,500", deviation: "+14.2%", trend: "up" },
];

export default function PriceIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredPrices = PRICES_DATA.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Price Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Market-wide price benchmarking and deviation analytics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Index
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Platform Avg Price", value: "₦9,240", sub: "↑ 2.4% this week", color: "emerald" },
          { label: "Market Benchmark", value: "₦8,850", sub: "External markets", color: "gray" },
          { label: "Avg Deviation", value: "+4.2%", sub: "vs Market Index", color: "orange" },
          { label: "Competitiveness", value: "88.4%", sub: "Price health", color: "blue" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "orange" ? "text-orange-500" :
              stat.color === "blue" ? "text-blue-500" : "text-gray-900"
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
            placeholder="Search by product name..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {["All Categories", "Antibiotics", "Dewormers", "Supplements"].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Categories");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Product Intelligence</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Platform Performance</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Market Benchmark</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Deviation / Trend</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Price Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPrices.map((item) => {
                const deviationNum = parseFloat(item.deviation);
                const isCritical = Math.abs(deviationNum) > 10;

                return (
                  <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-5 py-5">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-black text-gray-900 leading-none mb-0.5 truncate whitespace-nowrap">{item.product}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{item.category}</span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col">
                        <span className="text-[15px] font-black text-gray-900 whitespace-nowrap">{item.platformAvg}</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active Rate</span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-gray-400 whitespace-nowrap">{item.marketAvg}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">External Index</span>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[14px] font-black whitespace-nowrap",
                          deviationNum > 0 ? "text-emerald-500" : "text-red-500"
                        )}>{item.deviation}</span>
                        <div className={cn(
                          "flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border",
                          item.trend === "up" ? "text-emerald-500 bg-emerald-50 border-emerald-100" : "text-red-500 bg-red-50 border-red-100"
                        )}>
                          {item.trend === "up" ? <ChartLineUp size={10} weight="bold" /> : <ChartLineDown size={10} weight="bold" />}
                          {item.trend === "up" ? "Rising" : "Falling"}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 text-right">
                      {isCritical ? (
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-100 mb-1">
                            <Warning size={12} weight="fill" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Adjust Rate</span>
                          </div>
                          <button className="text-[10px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Optimize</button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-1">Optimal</span>
                          <span className="text-[9px] font-bold text-gray-300 italic uppercase">Competitive</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredPrices.length} of {PRICES_DATA.length} indices</span>
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
