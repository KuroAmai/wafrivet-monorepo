"use client";

import { use } from "react";
import { 
  CaretLeft, 
  Tag, 
  User, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  FirstAid,
  HandCoins,
  ChartLineUp,
  Files,
  ArrowRight,
  PencilSimple,
  WarningCircle,
  Copy,
  GenderIntersex,
  ClockCounterClockwise,
  Plus
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AIContextSheet } from "@/components/herd/AIContextSheet";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "health", label: "Medical" },
  { id: "vitals", label: "Vitals" },
  { id: "docs", label: "Vault" },
];

export default function AnimalRecordPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-8 py-6 animate-in fade-in slide-in-from-right-4 duration-700 pb-32">
      {/* Dynamic Header */}
      <div className="flex items-center justify-between">
        <Link href="/" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm active:scale-90 transition-transform">
          <CaretLeft size={20} weight="bold" />
        </Link>
        <div className="flex gap-2">
           <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm active:scale-90 transition-transform text-orange-500">
              <WarningCircle size={20} weight="bold" />
           </button>
           <button className="bg-[#2D4D31] text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-[#2D4D31]/20 active:scale-95 transition-all">
              Update
           </button>
        </div>
      </div>

      {/* Premium Identity Card */}
      <section className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-bl-[120px] -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-1000" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex items-start justify-between">
            <div className="w-20 h-20 bg-[#2D4D31] rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-[#2D4D31]/20">
               <Tag size={36} weight="duotone" />
            </div>
            <div className="text-right">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" /> Stable
              </span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3 flex items-center justify-end gap-1">
                {id} <Copy size={12} className="cursor-pointer hover:text-gray-900" />
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-4">Bella</h1>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <GenderIntersex size={16} className="text-gray-400" />
                <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">Female</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
                <Calendar size={16} className="text-gray-400" />
                <span className="text-[12px] font-bold text-gray-600 uppercase tracking-wide">4y 2m</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                 <FirstAid size={16} weight="bold" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Health</span>
           </div>
           <p className="text-[20px] font-black text-gray-900">94%</p>
           <div className="mt-2 h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[94%]" />
           </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                 <HandCoins size={16} weight="bold" />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Market</span>
           </div>
           <p className="text-[20px] font-black text-gray-900">₦450k</p>
           <p className="text-[10px] font-bold text-emerald-500 mt-1">+12.5% p.a</p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-shrink-0 text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl transition-all",
              activeTab === tab.id 
                ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" 
                : "bg-white text-gray-400 border border-gray-100 hover:bg-gray-50"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[400px]">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Timeline Audit */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-2">
                <ClockCounterClockwise size={20} weight="bold" />
                Lifecycle Audit
              </h3>
              <div className="space-y-8 relative before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-50">
                {[
                  { title: "FMD Vaccination", date: "2d ago", actor: "Dr. Adebayo" },
                  { title: "Weight Check (+15kg)", date: "1w ago", actor: "System" },
                  { title: "Lekki Farm Transfer", date: "3m ago", actor: "Admin" },
                ].map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-3 h-3 bg-white border-2 border-[#2D4D31] rounded-full z-10" />
                    <p className="text-[14px] font-black text-gray-900 leading-none">{item.title}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{item.date} • {item.actor}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-gray-50 text-gray-400 text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all">
                Full Audit Log
              </button>
            </div>

            {/* Location & Ownership */}
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm grid gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                     <User size={20} weight="bold" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registered Owner</p>
                     <p className="text-[14px] font-black text-gray-900">Emeka Obi</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                     <MapPin size={20} weight="bold" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Location</p>
                     <p className="text-[14px] font-black text-gray-900">Lekki Farm A-4</p>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab !== "overview" && (
          <div className="bg-white p-12 rounded-[48px] border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-200">
              <Plus size={40} weight="bold" />
            </div>
            <div className="space-y-1">
              <p className="text-[16px] font-black text-gray-900">No entries in {activeTab}</p>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Initialize digital dossier</p>
            </div>
            <button className="mt-4 bg-[#2D4D31] text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest active:scale-95 transition-all">
              Add Record
            </button>
          </div>
        )}
      </div>

      {/* AI Intelligence Trigger */}
      <AIContextSheet>
        <button className="fixed bottom-32 right-6 bg-white border border-emerald-100 p-4 rounded-[32px] shadow-[0_20px_40px_rgba(45,77,49,0.2)] flex items-center gap-4 active:scale-95 group transition-all">
          <div className="w-12 h-12 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-[#2D4D31]/20 group-hover:rotate-12 transition-transform">
             <ShieldCheck size={24} weight="bold" />
          </div>
          <div className="text-left pr-4">
             <p className="text-[13px] font-black text-gray-900 leading-none">Tag Intelligence</p>
             <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Audit Mode</p>
          </div>
        </button>
      </AIContextSheet>
    </div>
  );
}
