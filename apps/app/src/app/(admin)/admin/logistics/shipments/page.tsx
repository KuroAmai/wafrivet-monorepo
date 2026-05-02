"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Truck,
  User,
  Buildings,
  Package,
  Snowflake,
  ArrowRight,
  Circle,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SHIPMENTS_DATA = [
  { id: "SHP-8821", distributor: "AgroDirect Ltd", driver: "Ibrahim Lawal", chemists: 4, items: 24, status: "In Transit", coldChain: true, dispatched: "2 hours ago", delivered: "-" },
  { id: "SHP-8820", distributor: "VetSupply Co", driver: "Chidi Okafor", chemists: 2, items: 12, status: "Delivered", coldChain: false, dispatched: "6 hours ago", delivered: "30 mins ago" },
  { id: "SHP-8819", distributor: "AgroDirect Ltd", driver: "Musa Audu", chemists: 6, items: 45, status: "Pending", coldChain: true, dispatched: "-", delivered: "-" },
  { id: "SHP-8818", distributor: "Northside Logistics", driver: "Yusuf Bello", chemists: 1, items: 8, status: "Cancelled", coldChain: false, dispatched: "1 day ago", delivered: "-" },
];

export default function ShipmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [coldChainOnly, setColdChainOnly] = useState(false);

  const filteredShipments = SHIPMENTS_DATA.filter(shp => {
    const matchesSearch = 
      shp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shp.distributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shp.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === "All Status" || shp.status === selectedStatus;
    const matchesColdChain = !coldChainOnly || shp.coldChain;

    return matchesSearch && matchesStatus && matchesColdChain;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Bulk Shipments</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor distributor-level logistics and cold-chain integrity</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Log
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Shipments", value: "24", sub: "12 in transit", color: "blue" },
          { label: "Cold Chain Items", value: "842", sub: "Thermal monitoring", color: "cyan" },
          { label: "Deliveries (MTD)", value: "1,540", sub: "Chemist outlets", color: "gray" },
          { label: "Avg. Transit", value: "4.2h", sub: "Within SLA targets", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "cyan" ? "text-cyan-500" :
              stat.color === "emerald" ? "text-emerald-500" : "text-gray-900"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by Shipment ID, Distributor or Driver..." 
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
            {["All Status", "In Transit", "Delivered", "Pending", "Cancelled"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button 
            onClick={() => setColdChainOnly(!coldChainOnly)}
            className={cn(
              "px-5 py-3 border rounded-2xl text-[13px] font-bold transition-all flex items-center gap-2",
              coldChainOnly 
                ? "bg-cyan-50 border-cyan-100 text-cyan-600" 
                : "bg-white border-gray-100 text-gray-600 hover:bg-gray-50"
            )}
          >
            <Snowflake size={16} weight={coldChainOnly ? "fill" : "bold"} />
            Cold Chain
          </button>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Status");
            setColdChainOnly(false);
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Shipment ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Distributor & Driver</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Load & Conditions</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Logistics Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredShipments.map((shp) => (
                <tr key={shp.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[#2D4D31] flex-shrink-0">
                        <Truck size={16} weight="bold" />
                      </div>
                      <span className="text-[14px] font-black text-gray-900 tracking-tight whitespace-nowrap">{shp.id}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <Buildings size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">{shp.distributor}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <User size={10} weight="bold" className="text-gray-400" />
                        <span className="text-[11px] text-gray-500 font-medium truncate whitespace-nowrap">{shp.driver}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{shp.chemists} Outlets</span>
                        {shp.coldChain && (
                          <div className="flex items-center gap-1 text-cyan-500 bg-cyan-50 px-1.5 py-0.5 rounded-md border border-cyan-100">
                            <Snowflake size={10} weight="fill" />
                            <span className="text-[8px] font-black uppercase">Cold</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest whitespace-nowrap">{shp.items} items total</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        shp.status === "Delivered" ? "text-emerald-500" :
                        shp.status === "In Transit" ? "text-blue-500 animate-pulse" :
                        shp.status === "Pending" ? "text-orange-500" : "text-red-500"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{shp.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{shp.dispatched}</span>
                      {shp.delivered !== "-" && (
                        <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest whitespace-nowrap mt-0.5">
                          Delivered {shp.delivered}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredShipments.length} of {SHIPMENTS_DATA.length} shipments</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 31].map((page, i) => (
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
