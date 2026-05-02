"use client";

import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  Warning,
  Package,
  Storefront,
  MapPin,
  ArrowRight,
  Circle
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ALERTS_DATA = [
  { product: "Oxytetracycline 20%", chemist: "Pharmacy Plus", region: "Lekki North", stock: 4, avgSales: 1.8, daysLeft: 2, status: "Critical" },
  { product: "Ivermectin 1%", chemist: "Lekki Pharma", region: "Lekki North", stock: 12, avgSales: 3.2, daysLeft: 3, status: "Warning" },
  { product: "Multivitamin Inj", chemist: "City Agro & Vet", region: "Ibadan South", stock: 2, avgSales: 0.5, daysLeft: 4, status: "Warning" },
  { product: "Penicillin G", chemist: "Pharmacy Plus", region: "Lekki North", stock: 1, avgSales: 1.2, daysLeft: 1, status: "Critical" },
];

export default function StockoutAlertsPage() {
  return (
    <div className="space-y-8">
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 p-8 rounded-[32px] border border-red-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-2">Critical Alerts</span>
            <div className="text-[32px] font-black text-red-600 leading-none tracking-tight">14</div>
            <p className="text-[11px] font-bold text-red-400 mt-2">Less than 3 days stock left</p>
          </div>
          <div className="w-14 h-14 bg-white text-red-500 rounded-2xl flex items-center justify-center shadow-sm">
            <Warning size={32} weight="fill" />
          </div>
        </div>

        <div className="bg-orange-50 p-8 rounded-[32px] border border-orange-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">Warnings</span>
            <div className="text-[32px] font-black text-orange-600 leading-none tracking-tight">28</div>
            <p className="text-[11px] font-bold text-orange-400 mt-2">3-7 days stock left</p>
          </div>
          <div className="w-14 h-14 bg-white text-orange-500 rounded-2xl flex items-center justify-center shadow-sm">
            <Warning size={32} weight="duotone" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Total Managed SKUs</span>
            <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight">2,402</div>
            <p className="text-[11px] font-bold text-emerald-500 mt-2">94% Healthy inventory level</p>
          </div>
          <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
            <Package size={32} weight="duotone" />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Product / SKU</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Chemist / Region</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Current Stock</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Velocity</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Burn Rate</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ALERTS_DATA.map((alert, i) => (
                <tr key={i} className={cn(
                  "hover:bg-gray-50/50 transition-colors group",
                  alert.status === "Critical" && "bg-red-50/30 hover:bg-red-50/50"
                )}>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm",
                        alert.status === "Critical" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400"
                      )}>
                        <Package size={16} weight="bold" />
                      </div>
                      <span className="text-[14px] font-black text-gray-900 tracking-tight">{alert.product}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Storefront size={14} weight="bold" className="text-gray-400" />
                        <span className="text-[14px] font-bold text-gray-900">{alert.chemist}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <MapPin size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[12px] text-gray-500 font-medium">{alert.region}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-black text-gray-900">{alert.stock} units</td>
                  <td className="px-8 py-5 text-[13px] font-bold text-gray-500">{alert.avgSales} units / day</td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[15px] font-black",
                        alert.daysLeft <= 2 ? "text-red-500" : "text-orange-500"
                      )}>{alert.daysLeft} days left</span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                        <div className={cn(
                          "h-full rounded-full",
                          alert.status === "Critical" ? "bg-red-500" : "bg-orange-500"
                        )} style={{ width: `${(alert.daysLeft / 7) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                      alert.status === "Critical" ? "bg-red-500 text-white border-red-600 shadow-sm" : "bg-orange-50 text-orange-500 border-orange-100"
                    )}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="bg-[#2D4D31] text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/20">
                      Suggest Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
