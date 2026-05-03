"use client";

import { use } from "react";

import { 
  CaretLeft, 
  ShoppingCart, 
  Cow, 
  Robot, 
  Receipt, 
  CheckCircle, 
  PhoneCall, 
  Warning, 
  Users, 
  Money,
  MapPin,
  Clock,
  Fingerprint,
  Browser,
  ShieldCheck,
  ArrowSquareOut,
  DownloadSimple,
  ShareNetwork,
  DotsThreeVertical,
  ArrowRight
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getActivityData = (id: string) => {
  const activities = {
    "act_1001": { text: "New order placed", type: "order", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-50", user: "Emeka Obi", resource: "#ORD-9921", time: "2 mins ago", subtext: "Emeka Obi → Pharmacy Plus" },
    "act_1002": { text: "Animal registered", type: "animal", icon: Cow, color: "text-emerald-500", bg: "bg-emerald-50", user: "System", resource: "WAF-2026-00312", time: "5 mins ago", subtext: "WAF-2026-00312 · Cattle" },
    "act_1003": { text: "Diagnosis session", type: "diagnosis", icon: Robot, color: "text-purple-500", bg: "bg-purple-50", user: "Dr. Sarah Ahmed", resource: "AI-DIAG-012", time: "8 mins ago", subtext: "Camera · Moderate Severity" },
    "act_1004": { text: "BNPL agreement created", type: "finance", icon: Receipt, color: "text-orange-500", bg: "bg-orange-50", user: "Finance System", resource: "BNPL-8812", time: "12 mins ago", subtext: "₦12,000" },
    "act_1005": { text: "Order delivered", type: "logistics", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50", user: "Logistics Node", resource: "#ORD-0091", time: "15 mins ago", subtext: "#ORD-0091" },
  };

  return activities[id as keyof typeof activities] || activities["act_1001"];
};

export default function ActivityDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = getActivityData(id);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all bg-white/50">
            <CaretLeft size={20} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">Dashboard Feed</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
            <ShareNetwork size={20} weight="bold" />
          </button>
          <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all shadow-sm">
            <DownloadSimple size={20} weight="bold" />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/10 ml-2">
            <ArrowSquareOut size={16} weight="bold" /> View Resource
          </button>
        </div>
      </div>

      {/* Main Identity Pulse */}
      <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className={cn(
            "w-32 h-32 rounded-[40px] flex items-center justify-center shadow-inner",
            data.bg, data.color
          )}>
            <data.icon size={56} weight="duotone" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-4 py-1.5 bg-gray-50 text-gray-500 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                {data.type} Activity
              </span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck size={12} weight="fill" /> Verified Log
              </span>
            </div>
            <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">{data.text}</h1>
            <p className="text-[16px] text-gray-500 font-medium">{data.subtext}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Happened</span>
            <div className="text-[28px] font-black text-gray-900 tracking-tight leading-none">{data.time}</div>
            <div className="text-[11px] font-bold text-emerald-500 mt-2 uppercase tracking-widest">Success State</div>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Log Details */}
        <div className="lg:col-span-8 space-y-10">
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm group hover:border-[#2D4D31]/20 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                  <Fingerprint size={24} weight="bold" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Identity Vector</h3>
                  <p className="text-[15px] font-bold text-gray-900">{data.user}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">IP ADDRESS</span>
                  <span className="text-gray-900 font-mono font-medium">192.168.1.12</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">SESSION ID</span>
                  <span className="text-gray-900 font-mono font-medium truncate max-w-[120px]">SESS_9921_AF</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm group hover:border-[#2D4D31]/20 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                  <Browser size={24} weight="bold" />
                </div>
                <div>
                  <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Origin Client</h3>
                  <p className="text-[15px] font-bold text-gray-900">Chrome / MacOS</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">LOCATION</span>
                  <span className="text-gray-900 font-medium">Lagos, Nigeria</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">SECURE LEVEL</span>
                  <span className="text-emerald-500 font-black uppercase tracking-widest text-[11px]">HIGH</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Trace (Timeline) */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-10">Operation Lifecycle</h3>
            <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
              {[
                { label: "Request Initiated", time: "14:22:04", status: "Completed", icon: Clock },
                { label: "Security Verification", time: "14:22:05", status: "Passed", icon: ShieldCheck },
                { label: "Data Persistence", time: "14:22:08", status: "Success", icon: Money },
                { label: "Immutable Log Generated", time: "14:22:09", status: "Finalized", icon: Fingerprint },
              ].map((step, i) => (
                <div key={i} className="relative pl-12 flex items-center justify-between group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-white border-2 border-[#2D4D31] rounded-full z-10 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <div className="w-2 h-2 bg-[#2D4D31] rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">{step.label}</h4>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{step.time} · Global Time</span>
                  </div>
                  <span className="text-[10px] font-black text-[#2D4D31] bg-[#2D4D31]/5 px-3 py-1 rounded-lg uppercase tracking-widest border border-[#2D4D31]/10">
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Context & Actions */}
        <div className="lg:col-span-4 space-y-10">
          {/* Resource Snapshot */}
          <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/10">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-white/40">Resource Snapshot</h3>
            
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 bg-white/10 rounded-[20px] flex items-center justify-center border border-white/10">
                <data.icon size={28} weight="duotone" />
              </div>
              <div>
                <span className="text-[20px] font-black tracking-tight block">{data.resource}</span>
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-widest">Active Resource</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-white text-[#2D4D31] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                Open Full View <ArrowRight size={14} weight="bold" />
              </button>
              <button className="w-full py-4 text-white/60 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2">
                <DownloadSimple size={14} weight="bold" /> Download Archive
              </button>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
              <Warning size={32} weight="duotone" />
            </div>
            <h4 className="text-[18px] font-black text-gray-900 tracking-tight mb-2">Identify Issue?</h4>
            <p className="text-[12px] text-gray-500 font-medium mb-6 px-4">
              If this activity appears suspicious or unauthorized, flag it for internal review immediately.
            </p>
            <button className="w-full py-4 bg-red-50 text-red-500 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-red-100 transition-all">
              Flag for Security Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
