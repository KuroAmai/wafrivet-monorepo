"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  ChartLineUp,
  ChartLineDown,
  Tag,
  CurrencyNgn,
  Warning,
  ArrowRight,
  CaretRight
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PRICES_DATA = [
  { product: "Oxytetracycline 20%", category: "Antibiotics", platformAvg: "₦8,500", marketAvg: "₦8,200", deviation: "+3.6%", trend: "up" },
  { product: "Ivermectin 1%", category: "Dewormers", platformAvg: "₦4,200", marketAvg: "₦5,100", deviation: "-17.6%", trend: "down" },
  { product: "Multivitamin Inj", category: "Supplements", platformAvg: "₦6,800", marketAvg: "₦6,500", deviation: "+4.6%", trend: "up" },
  { product: "Penicillin G", category: "Antibiotics", platformAvg: "₦12,000", marketAvg: "₦10,500", deviation: "+14.2%", trend: "up" },
];

export default function PriceIndexPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Price Index</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Market-wide price benchmarking and deviation analytics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Index
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Platform Avg. Price</span>
          <div className="text-[32px] font-black text-[#2D4D31] leading-none tracking-tight">₦9,240</div>
          <p className="text-[11px] font-bold text-emerald-500 mt-4 flex items-center gap-1.5">
            <ChartLineUp size={14} weight="bold" /> ↑ 2.4% this week
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Market Benchmark</span>
          <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight">₦8,850</div>
          <p className="text-[11px] font-bold text-gray-400 mt-4 flex items-center gap-1.5">
            Updated 4 hours ago
          </p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Avg. Deviation</span>
          <div className="text-[32px] font-black text-orange-500 leading-none tracking-tight">+4.2%</div>
          <p className="text-[11px] font-bold text-gray-400 mt-4 flex items-center gap-1.5">
            Wafrivet vs External Markets
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Platform Avg</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Market Avg</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Deviation</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Trend</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Insight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {PRICES_DATA.map((item, i) => {
                const deviationNum = parseFloat(item.deviation);
                const isHighDeviation = Math.abs(deviationNum) > 10;

                return (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[#2D4D31] shadow-sm">
                          <Tag size={16} weight="bold" />
                        </div>
                        <span className="text-[14px] font-black text-gray-900 tracking-tight">{item.product}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[14px] font-bold text-gray-500">{item.category}</td>
                    <td className="px-8 py-5 text-[15px] font-black text-gray-900">{item.platformAvg}</td>
                    <td className="px-8 py-5 text-[14px] font-bold text-gray-400">{item.marketAvg}</td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "text-[14px] font-black",
                        deviationNum > 0 ? "text-emerald-500" : "text-red-500"
                      )}>{item.deviation}</span>
                    </td>
                    <td className="px-8 py-5">
                      {item.trend === "up" ? (
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg w-fit border border-emerald-100">
                          <ChartLineUp size={14} weight="bold" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Rising</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-500 bg-red-50 px-3 py-1 rounded-lg w-fit border border-red-100">
                          <ChartLineDown size={14} weight="bold" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Falling</span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-5 text-right">
                      {isHighDeviation ? (
                        <div className="flex items-center justify-end gap-3">
                          <div className="flex items-center gap-1.5 text-orange-500 bg-orange-50 px-3 py-1 rounded-lg border border-orange-100">
                            <Warning size={14} weight="fill" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Adjust Price</span>
                          </div>
                          <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#2D4D31] hover:bg-white transition-all">
                            <CaretRight size={16} weight="bold" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[12px] font-bold text-gray-300 uppercase tracking-widest italic">Optimal</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
