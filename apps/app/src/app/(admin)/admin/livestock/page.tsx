"use client";

import Link from "next/link";
import { 
  MagnifyingGlass, 
  Funnel, 
  CaretDown,
  DownloadSimple,
  Circle,
  Cow,
  Bird,
  Eyeglasses,
  User,
  Tag,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ANIMALS_DATA = [
  { id: "WAF-2026-00312", owner: "Emeka Obi", species: "Cattle", breed: "Bunaji", age: "2y 4m", status: "Active", lastEvent: "Treatment", valuation: "₦450,000", registered: "May 12, 2024" },
  { id: "WAF-2026-00451", owner: "Musa Ibrahim", species: "Goat", breed: "Red Sokoto", age: "1y 2m", status: "Active", lastEvent: "Vaccination", valuation: "₦45,000", registered: "May 11, 2024" },
  { id: "WAF-2026-00452", owner: "Musa Ibrahim", species: "Goat", breed: "Red Sokoto", age: "1y 2m", status: "Active", lastEvent: "None", valuation: "₦45,000", registered: "May 11, 2024" },
  { id: "WAF-2026-00210", owner: "John Dagogo", species: "Poultry", breed: "Broiler", age: "6w", status: "Sold", lastEvent: "Sale", valuation: "₦4,500", registered: "Apr 28, 2024" },
  { id: "WAF-2026-00105", owner: "Sarah Ahmed", species: "Sheep", breed: "Balami", age: "3y", status: "Active", lastEvent: "Treatment", valuation: "₦85,000", registered: "Mar 15, 2024" },
];

import { useState } from "react";

export default function AllAnimalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedState, setSelectedState] = useState("All States");

  const filteredAnimals = ANIMALS_DATA.filter(animal => {
    const matchesSearch = 
      animal.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.owner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecies = selectedSpecies === "All Species" || animal.species === selectedSpecies;
    const matchesStatus = selectedStatus === "All Status" || animal.status === selectedStatus;
    // Note: State isn't in ANIMALS_DATA in the mock, but we'll leave the filter for future integration
    // const matchesState = selectedState === "All States" || animal.state === selectedState;

    return matchesSearch && matchesSpecies && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Livestock Registry</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Platform-wide view of every registered animal</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Registry
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {[
          { label: "Total", value: "12,402", color: "bg-gray-900" },
          { label: "Cattle", value: "4,210", color: "bg-[#2D4D31]" },
          { label: "Goats", value: "3,150", color: "bg-emerald-500" },
          { label: "Sheep", value: "2,100", color: "bg-blue-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</span>
            <div className="text-[20px] font-black text-gray-900 leading-none">{stat.value}</div>
            <div className={cn("w-6 h-1 rounded-full mt-3", stat.color)} />
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by WAF ID or Owner Name..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Species Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            {["All Species", "Cattle", "Goat", "Poultry", "Sheep"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Status", "Active", "Sold"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* State Filter (Placeholder) */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {["All States", "Lagos", "Kano", "Oyo", "Kaduna"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedSpecies("All Species");
            setSelectedStatus("All Status");
            setSelectedState("All States");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Animal & Taxonomy</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Owner</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status & Event</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Valuation</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAnimals.map((animal) => (
                <tr key={animal.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate">{animal.id}</span>
                      <span className="text-[11px] text-gray-400 font-medium truncate">{animal.species} • {animal.breed}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-sm border border-blue-100 flex-shrink-0">
                        <User size={12} weight="bold" />
                      </div>
                      <span className="text-[13px] font-bold text-gray-800 truncate whitespace-nowrap">{animal.owner}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col gap-1.5">
                       <span className={cn(
                        "inline-flex items-center w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                        animal.status === "Active" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"
                      )}>
                        {animal.status}
                      </span>
                      <span className="text-[11px] text-gray-400 font-bold whitespace-nowrap">{animal.lastEvent} • {animal.age}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[14px] font-black text-[#2D4D31] whitespace-nowrap">{animal.valuation}</span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <Link 
                      href={`/admin/livestock/${animal.id}`}
                      className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline whitespace-nowrap"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Showing 1-5 of 12,402 animals</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 620].map((page, i) => (
              <button key={i} className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-white hover:text-gray-900"
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
