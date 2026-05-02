"use client";

import { 
  CaretLeft, 
  Heartbeat, 
  Thermometer, 
  Stethoscope, 
  User, 
  MapPin, 
  Phone, 
  Warning, 
  ShieldCheck, 
  ChartLineUp, 
  Clock, 
  Activity,
  ArrowRight,
  DotsThreeVertical,
  Crosshair,
  FirstAid,
  Siren,
  Envelope
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getVitalData = (id: string) => {
  return {
    id: id || "WAF-992",
    issue: "High Fever",
    severity: "Critical",
    duration: "28 hours",
    animal: "Cattle #992",
    species: "Bovine",
    owner: "John Dagogo",
    location: "Kano Cluster B",
    vitals: [
      { label: "Temperature", current: "41.2°C", baseline: "38.5°C", status: "Critical" },
      { label: "Heart Rate", current: "82 bpm", baseline: "60 bpm", status: "High" },
      { label: "Respiration", current: "34 br/m", baseline: "20 br/m", status: "High" },
    ],
    trend: [
      { time: "Yesterday, 14:00", value: "39.1°C" },
      { time: "Yesterday, 20:00", value: "40.2°C" },
      { time: "Today, 02:00", value: "40.8°C" },
      { time: "Today, 08:00", value: "41.2°C" },
    ]
  };
};

export default function VitalsManagementPage({ params }: { params: { id: string } }) {
  const data = getVitalData(params.id);

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
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100">
            <Siren size={18} weight="bold" className="animate-pulse" /> Dispatch Emergency Vet
          </button>
        </div>
      </div>

      {/* Crisis Pulse Header */}
      <div className="bg-red-500 p-10 rounded-[48px] text-white shadow-xl shadow-red-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-32 h-32 rounded-[40px] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Thermometer size={64} weight="duotone" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                Severity: {data.severity}
              </span>
              <span className="px-4 py-1.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Warning size={12} weight="fill" /> {data.duration} Unresolved
              </span>
            </div>
            <h1 className="text-[42px] font-black text-white tracking-tight leading-none mb-3">{data.issue} Detected</h1>
            <p className="text-[16px] text-white/80 font-medium">Monitoring {data.animal} in {data.location}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[12px] font-black text-white/60 uppercase tracking-[0.2em] mb-2">Protocol Status</span>
            <div className="text-[24px] font-black text-white tracking-tight leading-none uppercase">Escalated</div>
            <div className="text-[11px] font-bold text-white/80 mt-2 uppercase tracking-widest">Awaiting Clinical Intervention</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Telemetry Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Vitals Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.vitals.map((vital, i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-red-200 transition-all">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{vital.label}</span>
                <div className={cn(
                  "text-[32px] font-black leading-none mb-2",
                  vital.status === "Critical" ? "text-red-500" : "text-orange-500"
                )}>{vital.current}</div>
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
                  <Clock size={12} /> Baseline: {vital.baseline}
                </div>
              </div>
            ))}
          </div>

          {/* Clinical Progression Chart (Mock) */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Clinical Progression (24h)</h3>
            <div className="h-[300px] w-full flex items-end justify-between gap-4 px-4 relative">
              {/* Fake Chart Background Grid */}
              <div className="absolute inset-0 p-10 flex flex-col justify-between opacity-5 pointer-events-none">
                {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-gray-900" />)}
              </div>
              
              {data.trend.map((point, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                  <div 
                    className="w-full bg-red-500 rounded-2xl relative group cursor-help transition-all hover:opacity-80" 
                    style={{ height: `${(parseFloat(point.value) - 38) * 40}px` }}
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {point.value}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-black text-gray-900">{point.time.split(',')[1]}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{point.time.split(',')[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Log */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Incident Audit Trail</h3>
            <div className="space-y-10 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
              {[
                { label: "Critical Alert Generated", time: "28h ago", user: "System (IoT)", type: "Alert" },
                { label: "Initial Escalation", time: "24h ago", user: "Admin Sarah", type: "Process" },
                { label: "Farmer Notified", time: "22h ago", user: "Automated SMS", type: "Comms" },
                { label: "Clinical Review Pending", time: "Now", user: "System", type: "Waiting" },
              ].map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-red-500 rounded-full z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">{step.label}</h4>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                        {step.time} · {step.user}
                      </p>
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 px-2 py-1 rounded-lg">
                      {step.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Panel Column */}
        <div className="lg:col-span-4 space-y-10">
          {/* Subject Profile Quick View */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-gray-400">Subject Profile</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-[#2D4D31] shadow-inner">
                <FirstAid size={28} weight="duotone" />
              </div>
              <div>
                <h4 className="text-[20px] font-black text-gray-900 tracking-tight leading-none mb-1">{data.animal}</h4>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{data.species}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold uppercase tracking-[0.1em] text-[8px] mb-1">OWNER</span>
                <span className="text-gray-900 font-bold text-[13px]">{data.owner}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold uppercase tracking-[0.1em] text-[8px] mb-1">LOCATION</span>
                <span className="text-gray-900 font-bold text-[13px] truncate">{data.location}</span>
              </div>
            </div>
            <Link 
              href={`/admin/livestock/${data.id}`}
              className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              View Full Registry <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Emergency SOPs */}
          <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/40">Emergency SOPs</h3>
            <div className="space-y-2">
              {[
                { icon: Crosshair, text: "Quarantine Protocol" },
                { icon: FirstAid, text: "Prescribe Antibiotics" },
                { icon: Stethoscope, text: "Request Bio-Sample" },
              ].map((btn, i) => (
                <button key={i} className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-start px-5 gap-3">
                  <btn.icon size={18} /> {btn.text}
                </button>
              ))}
              <button className="w-full py-4 bg-red-500 hover:bg-red-600 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all mt-4">
                Mark as High Mortality Risk
              </button>
            </div>
          </div>

          {/* Communication Hub */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h4 className="text-[16px] font-black text-gray-900 tracking-tight mb-6">Contact Stakeholders</h4>
            <div className="space-y-4">
              <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D4D31]/20 transition-all group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] shadow-sm">
                  <Phone size={20} weight="bold" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-black text-gray-900 leading-none mb-1">Call Owner</p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">John Dagogo</span>
                </div>
              </button>
              <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#2D4D31]/20 transition-all group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-purple-500 shadow-sm">
                  <Envelope size={20} weight="bold" />
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-black text-gray-900 leading-none mb-1">Notify Cluster Vet</p>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Kano Region</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
