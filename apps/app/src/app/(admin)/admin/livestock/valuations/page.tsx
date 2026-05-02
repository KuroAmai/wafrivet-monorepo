"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Certificate,
  User,
  Tag,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const VALUATIONS_DATA = [
  { id: "WAF-2026-00312", owner: "Emeka Obi", species: "Cattle", breed: "Bunaji", value: "₦450,000", method: "AI Estimation", cert: "WAF-CERT-881", date: "2 mins ago" },
  { id: "WAF-2026-00451", owner: "Musa Ibrahim", species: "Goat", breed: "Red Sokoto", value: "₦45,000", method: "Vet Appraisal", cert: "WAF-CERT-724", date: "1 hour ago" },
  { id: "WAF-2026-00105", owner: "Sarah Ahmed", species: "Sheep", breed: "Balami", value: "₦85,000", method: "AI Estimation", cert: "WAF-CERT-912", date: "1 day ago" },
  { id: "WAF-2026-00312", owner: "Emeka Obi", species: "Cattle", breed: "Bunaji", value: "₦420,000", method: "Historical", cert: "WAF-CERT-001", date: "3 months ago" },
];

export default function ValuationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");

  const filteredValuations = VALUATIONS_DATA.filter(val => {
    const matchesSearch = 
      val.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      val.owner.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecies = selectedSpecies === "All Species" || val.species === selectedSpecies;
    const matchesMethod = selectedMethod === "All Methods" || val.method === selectedMethod;

    return matchesSearch && matchesSpecies && matchesMethod;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Herd Valuations</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Track the financial value of every animal on the platform</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Valuations
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Herd Value", value: "₦428.5M", sub: "↑ 8% vs last month", color: "emerald" },
          { label: "Average Value", value: "₦184,200", sub: "Per registered animal", color: "gray" },
          { label: "Valuations (MTD)", value: "1,240", sub: "New this month", color: "blue" },
          { label: "Certificates", value: "8,402", sub: "Verified certs", color: "gray" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{stat.label}</span>
            <div className={cn(
              "text-[28px] font-black leading-none tracking-tight mb-3 group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-[#2D4D31]" : "text-gray-900"
            )}>{stat.value}</div>
            <p className={cn(
              "text-[11px] font-bold",
              stat.color === "emerald" ? "text-emerald-500" : 
              stat.color === "blue" ? "text-blue-500" : "text-gray-400"
            )}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search WAF ID or Owner..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            {["All Species", "Cattle", "Goat", "Sheep"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            {["All Methods", "AI Estimation", "Vet Appraisal", "Historical"].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedSpecies("All Species");
            setSelectedMethod("All Methods");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Animal & Owner</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Valuation</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Method</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Certificate</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredValuations.map((val, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate">{val.id}</span>
                      <span className="text-[11px] text-gray-400 font-medium truncate">{val.species} • {val.owner}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="text-[15px] font-black text-[#2D4D31] whitespace-nowrap">{val.value}</span>
                  </td>
                  <td className="px-5 py-5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                      val.method === "AI Estimation" ? "bg-purple-50 text-purple-500 border-purple-100" :
                      val.method === "Vet Appraisal" ? "bg-blue-50 text-blue-500 border-blue-100" :
                      "bg-gray-50 text-gray-500 border-gray-100"
                    )}>
                      {val.method}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Certificate size={16} weight="bold" className="flex-shrink-0" />
                      <span className="text-[13px] font-black tracking-tight whitespace-nowrap">{val.cert}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">{val.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredValuations.length} of {VALUATIONS_DATA.length} valuations</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 310].map((page, i) => (
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
