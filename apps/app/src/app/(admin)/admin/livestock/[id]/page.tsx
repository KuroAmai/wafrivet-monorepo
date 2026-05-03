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
  ArrowSquareOut,
  PencilSimple,
  WarningCircle
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data fetch helper
const getAnimalData = (id: string) => {
  return {
    id: id || "WAF-2026-00312",
    species: "Cattle",
    breed: "Bunaji",
    age: "2y 4m",
    status: "Active",
    registered: "May 12, 2024",
    owner: "Emeka Obi",
    ownerId: "USR-9281",
    location: "Lekki Farm A-4",
    lastEvent: "General Treatment",
    valuation: "₦450,000",
    stats: {
      healthScore: 94,
      vaccinations: 12,
      treatments: 4,
      appreciation: "+12.5%"
    },
    vitals: [
      { label: "Weight", value: "420 kg", trend: "up" },
      { label: "Temp", value: "38.5°C", trend: "stable" },
      { label: "Heart Rate", value: "62 bpm", trend: "stable" },
      { label: "Feed Intake", value: "High", trend: "up" },
    ],
    history: [
      { id: 1, text: "Administered FMD Vaccination", time: "2 days ago", type: "medical", actor: "Dr. Adebayo (Vet)" },
      { id: 2, text: "Weight Check: +15kg since last month", time: "1 week ago", type: "growth", actor: "System" },
      { id: 3, text: "Ownership Transferred to Emeka Obi", time: "3 months ago", type: "system", actor: "Admin" },
      { id: 4, text: "Initial Platform Registration", time: "May 12, 2024", type: "system", actor: "Admin" },
    ]
  };
};

export default function AnimalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const animal = getAnimalData(id);

  return (
    <div className="space-y-10 pb-20">
      {/* Back & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/livestock" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
            <CaretLeft size={18} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-widest">Back to Registry</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <PencilSimple size={18} weight="bold" /> Edit Identity
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all">
            <WarningCircle size={18} weight="bold" /> Report Issue
          </button>
        </div>
      </div>

      {/* Main Identity Header */}
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="w-40 h-40 rounded-[48px] bg-gray-50 border border-gray-100 flex items-center justify-center text-[#2D4D31] shadow-inner flex-shrink-0">
          <Tag size={64} weight="duotone" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="flex flex-col">
              <h1 className="text-[36px] font-black text-gray-900 tracking-tight leading-none mb-2">{animal.id}</h1>
              <p className="text-[14px] text-gray-400 font-bold uppercase tracking-widest">{animal.species} • {animal.breed}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {animal.status}
              </span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {animal.age}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <User size={20} weight="bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Owner</span>
                <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{animal.owner}</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <MapPin size={20} weight="bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Location</span>
                <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{animal.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Calendar size={20} weight="bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Registered</span>
                <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{animal.registered}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Health & Market */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Statistics Column */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <FirstAid size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Health Score</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{animal.stats.healthScore}%</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[94%]" />
              </div>
              <p className="text-[11px] text-gray-400 font-bold mt-4 uppercase tracking-widest">Status: Excellent Condition</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <HandCoins size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Est. Valuation</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{animal.valuation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChartLineUp size={16} className="text-emerald-500" />
                <span className="text-[12px] text-emerald-500 font-black">{animal.stats.appreciation} Appreciation</span>
              </div>
            </div>
          </div>

          {/* Real-time Vitals */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Current Vitals & Monitoring</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {animal.vitals.map((vital, i) => (
                <div key={i} className="flex flex-col gap-1 text-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{vital.label}</span>
                  <span className="text-[18px] font-black text-gray-900">{vital.value}</span>
                  <span className={cn(
                    "text-[11px] font-bold",
                    vital.trend === "up" ? "text-emerald-500" : "text-gray-400"
                  )}>
                    {vital.trend === "up" ? "↑ Improving" : "→ Stable"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Digital Dossier & Certifications</h3>
            <div className="space-y-4">
              {[
                { title: "WAF Ownership Certificate", size: "1.2 MB", type: "PDF" },
                { title: "Bovine Health Registry (Complete)", size: "4.5 MB", type: "PDF" },
                { title: "Valuation Assessment Report", size: "0.8 MB", type: "PDF" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D4D31]/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] shadow-sm">
                      <Files size={20} weight="bold" />
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-gray-900">{doc.title}</p>
                      <span className="text-[11px] text-gray-400 font-medium uppercase tracking-widest">{doc.type} • {doc.size}</span>
                    </div>
                  </div>
                  <ArrowSquareOut size={20} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Column */}
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Lifecycle Audit</h3>
            <div className="space-y-10 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {animal.history.map((item) => (
                <div key={item.id} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-[#2D4D31] rounded-full z-10" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">{item.time}</span>
                    <p className="text-[15px] font-bold text-gray-900 leading-tight">{item.text}</p>
                    <span className="text-[12px] text-gray-500 font-medium">Logged by {item.actor}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-gray-100 transition-all mt-10">
               Full History Log
            </button>
          </div>

          <div className="bg-[#2D4D31] p-10 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/20">
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6">Operations Panel</h4>
            <div className="space-y-3">
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Update Health Vitals
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Schedule Vaccination
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Transfer Ownership
              </button>
              <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all mt-4">
                Mark as Sold
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-emerald-500 px-4">
            <ShieldCheck size={20} weight="fill" />
            <span className="text-[11px] font-black uppercase tracking-widest">Certified Platform Asset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
