"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Heartbeat,
  Stethoscope,
  User,
  Tag,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const EVENTS_DATA = [
  { id: "WAF-2026-00312", animal: "Cattle #312", species: "Cattle", owner: "Emeka Obi", type: "Treatment", date: "2 mins ago", loggedBy: "Dr. Sarah Ahmed", role: "Vet", details: "Administered Oxytetracycline for respiratory infection" },
  { id: "WAF-2026-00451", animal: "Goat #451", species: "Goat", owner: "Musa Ibrahim", type: "Vaccination", date: "1 hour ago", loggedBy: "Musa Ibrahim", role: "Farmer", details: "PPR vaccination completed" },
  { id: "WAF-2026-00312", animal: "Cattle #312", species: "Cattle", owner: "Emeka Obi", type: "Vitals Check", date: "3 hours ago", loggedBy: "System (Tag)", role: "AI", details: "Fever detected (39.8°C). Alert sent to owner." },
  { id: "WAF-2026-00105", animal: "Sheep #105", species: "Sheep", owner: "Sarah Ahmed", type: "Deworming", date: "1 day ago", loggedBy: "Dr. Ahmed Yusuf", role: "Vet", details: "Routine deworming with Ivermectin" },
  { id: "WAF-2026-00451", animal: "Goat #451", species: "Goat", owner: "Musa Ibrahim", type: "Movement", date: "2 days ago", loggedBy: "Musa Ibrahim", role: "Farmer", details: "Moved to Paddock B for grazing" },
];

export default function HealthEventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Events");
  const [selectedSpecies, setSelectedSpecies] = useState("All Species");
  const [selectedLogger, setSelectedLogger] = useState("All Loggers");

  const filteredEvents = EVENTS_DATA.filter(event => {
    const matchesSearch = 
      event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.animal.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All Events" || event.type === selectedType;
    const matchesSpecies = selectedSpecies === "All Species" || event.species === selectedSpecies;
    const matchesLogger = selectedLogger === "All Loggers" || event.role === selectedLogger;

    return matchesSearch && matchesType && matchesSpecies && matchesLogger;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Health Events</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Monitor clinical and management events across the platform</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Events
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Events This Week", value: "2,842", trend: "↑ 14% vs last week", icon: Heartbeat, color: "emerald" },
          { label: "Most Common", value: "Treatment", trend: "42% of all events", icon: Tag, color: "blue" },
          { label: "Vet Accuracy", value: "68%", trend: "Professional data quality", icon: Stethoscope, color: "purple" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md hover:border-[#2D4D31]/10 transition-all group flex flex-col items-center text-center">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{stat.label}</span>
            <div className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-3 group-hover:text-[#2D4D31] transition-colors">{stat.value}</div>
            <p className={cn(
              "text-[11px] font-bold",
              stat.color === "emerald" ? "text-emerald-500" : 
              stat.color === "purple" ? "text-purple-500" : "text-gray-400"
            )}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by WAF ID or Owner..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Type Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {["All Events", "Treatment", "Vaccination", "Vitals Check", "Deworming", "Movement"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Species Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedSpecies}
            onChange={(e) => setSelectedSpecies(e.target.value)}
          >
            {["All Species", "Cattle", "Goat", "Sheep"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Logger Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedLogger}
            onChange={(e) => setSelectedLogger(e.target.value)}
          >
            <option value="All Loggers">All Loggers</option>
            <option value="Vet">Vet Only</option>
            <option value="Farmer">Farmer Only</option>
            <option value="AI">System (AI)</option>
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedType("All Events");
            setSelectedSpecies("All Species");
            setSelectedLogger("All Loggers");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Event Type</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Logged By</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Clinical Details</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEvents.map((event, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-black text-gray-900 tracking-tight leading-none mb-1 truncate">{event.animal}</span>
                      <span className="text-[11px] text-gray-400 font-medium truncate">{event.id} • {event.owner}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                      event.type === "Treatment" ? "bg-red-50 text-red-500 border-red-100" :
                      event.type === "Vaccination" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      event.type === "Vitals Check" ? "bg-orange-50 text-orange-500 border-orange-100" :
                      "bg-gray-50 text-gray-500 border-gray-100"
                    )}>
                      {event.type}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-900 leading-none mb-1 truncate">{event.loggedBy}</span>
                      <span className={cn(
                        "text-[10px] font-black uppercase tracking-widest",
                        event.role === "Vet" ? "text-purple-500" :
                        event.role === "AI" ? "text-blue-500" : "text-gray-400"
                      )}>{event.role}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 min-w-[150px]">
                    <p className="text-[13px] font-medium text-gray-500 max-w-[200px] truncate leading-tight">
                      {event.details}
                    </p>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">{event.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredEvents.length} of {EVENTS_DATA.length} events</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 568].map((page, i) => (
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
