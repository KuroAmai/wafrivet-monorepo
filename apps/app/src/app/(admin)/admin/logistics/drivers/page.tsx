"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  User,
  Truck,
  IdentificationCard,
  Buildings,
  Circle,
  DotsThreeVertical,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const DRIVERS_DATA = [
  { name: "Ibrahim Lawal", phone: "+234 801 234 5678", vehicle: "Motorcycle", plate: "LND-123-XY", distributor: "AgroDirect Ltd", deliveries: 124, status: "Active", joined: "May 12, 2024" },
  { name: "Chidi Okafor", phone: "+234 802 345 6789", vehicle: "Tricycle (Keke)", plate: "KJA-456-ZZ", distributor: "VetSupply Co", deliveries: 89, status: "Active", joined: "May 10, 2024" },
  { name: "Musa Audu", phone: "+234 803 456 7890", vehicle: "Van", plate: "GGE-789-AA", distributor: "AgroDirect Ltd", deliveries: 210, status: "Active", joined: "Apr 28, 2024" },
  { name: "Yusuf Bello", phone: "+234 804 567 8901", vehicle: "Motorcycle", plate: "LSR-012-BB", distributor: "Northside Logistics", deliveries: 45, status: "Inactive", joined: "Apr 15, 2024" },
];

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("All Vehicles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredDrivers = DRIVERS_DATA.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.plate.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVehicle = selectedVehicle === "All Vehicles" || driver.vehicle === selectedVehicle;
    const matchesStatus = selectedStatus === "All Status" || driver.status === selectedStatus;

    return matchesSearch && matchesVehicle && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Logistics Drivers</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage the delivery network and driver performance metrics</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Drivers
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Drivers", value: "142", sub: "Verified partners", color: "blue" },
          { label: "Active Now", value: "84", sub: "Currently on route", color: "emerald" },
          { label: "Total Deliveries", value: "12,840", sub: "Platform total", color: "purple" },
          { label: "Avg Rating", value: "4.8", sub: "User satisfaction", color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "purple" ? "text-purple-500" : "text-orange-500"
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
            placeholder="Search by Driver Name, Phone or Plate No..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            {["All Vehicles", "Motorcycle", "Tricycle (Keke)", "Van"].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>

          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Status", "Active", "Inactive"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedVehicle("All Vehicles");
            setSelectedStatus("All Status");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Driver Identity</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Vehicle & Plate</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Affiliation</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Analytics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredDrivers.map((driver, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm flex-shrink-0 font-black text-[10px]">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate whitespace-nowrap">{driver.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium truncate whitespace-nowrap">{driver.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Truck size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 whitespace-nowrap">{driver.vehicle}</span>
                      </div>
                      <span className="text-[11px] font-black text-[#2D4D31] uppercase tracking-tight mt-0.5 whitespace-nowrap">{driver.plate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Buildings size={12} weight="bold" className="text-gray-400 flex-shrink-0" />
                      <span className="text-[13px] font-bold text-gray-600 truncate whitespace-nowrap">{driver.distributor}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        driver.status === "Active" ? "text-emerald-500" : "text-gray-300"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{driver.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-[14px] font-black text-gray-900 leading-none mb-1 whitespace-nowrap">{driver.deliveries}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Life. Deliveries</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredDrivers.length} of {DRIVERS_DATA.length} drivers</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 29].map((page, i) => (
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
