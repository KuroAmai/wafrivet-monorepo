"use client";

import { 
  Pulse, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Globe, 
  DeviceMobile, 
  ChatCircleText,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Warning,
  Circle,
  Clock
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SERVICES_DATA = [
  { name: "API Gateway", status: "Operational", latency: "12ms", uptime: "99.99%", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Auth Service", status: "Operational", latency: "8ms", uptime: "100%", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Marketplace API", status: "Degraded", latency: "245ms", uptime: "99.95%", icon: Database, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Livestock Engine", status: "Operational", latency: "15ms", uptime: "99.99%", icon: Pulse, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "Payment Gateway", status: "Operational", latency: "42ms", uptime: "99.98%", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "SMS Provider (Twilio)", status: "Operational", latency: "120ms", uptime: "99.90%", icon: ChatCircleText, color: "text-emerald-500", bg: "bg-emerald-50" },
  { name: "USSD Gateway", status: "Operational", latency: "85ms", uptime: "99.99%", icon: DeviceMobile, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const INCIDENTS_DATA = [
  { time: "2 hours ago", service: "Marketplace API", event: "High Latency detected in Lagos-1 Region", status: "Monitoring", color: "text-orange-500" },
  { time: "1 day ago", service: "Payment Gateway", event: "Intermittent connection issues with Flutterwave", status: "Resolved", color: "text-emerald-500" },
  { time: "3 days ago", service: "Auth Service", event: "Routine database maintenance", status: "Completed", color: "text-blue-500" },
];

export default function APIHealthPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">System Health</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Real-time monitoring of infrastructure and 3rd party services</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-black text-emerald-600 uppercase tracking-widest">Global Systems Operational</span>
           </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {SERVICES_DATA.map((service, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-8">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", service.bg, service.color)}>
                <service.icon size={24} weight="duotone" />
              </div>
              <div className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                service.status === "Operational" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                service.status === "Degraded" ? "bg-orange-50 text-orange-500 border-orange-100" :
                "bg-red-50 text-red-500 border-red-100"
              )}>
                {service.status}
              </div>
            </div>

            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-4">{service.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="text-gray-400">Latency</span>
                <span className={cn(
                  service.status === "Degraded" ? "text-orange-500" : "text-gray-900"
                )}>{service.latency}</span>
              </div>
              <div className="flex items-center justify-between text-[13px] font-bold">
                <span className="text-gray-400">Uptime</span>
                <span className="text-gray-900">{service.uptime}</span>
              </div>
            </div>

            <div className="mt-6 h-1.5 bg-gray-50 rounded-full overflow-hidden">
               <div className={cn(
                 "h-full rounded-full",
                 service.status === "Operational" ? "bg-emerald-500" :
                 service.status === "Degraded" ? "bg-orange-500" : "bg-red-500"
               )} style={{ width: service.status === "Operational" ? "100%" : "85%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Incidents Row */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Recent Incidents</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {INCIDENTS_DATA.map((incident, i) => (
            <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                   <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">{incident.time}</span>
                   <div className="w-px h-10 bg-gray-100 my-2" />
                </div>
                <div className="flex flex-col">
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-[14px] font-black text-gray-900">{incident.service}</span>
                      <span className={cn("text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border", incident.color.replace('text-', 'bg-').replace('-500', '-50'), incident.color, incident.color.replace('text-', 'border-').replace('-500', '-100'))}>
                        {incident.status}
                      </span>
                   </div>
                   <p className="text-[14px] font-medium text-gray-600">{incident.event}</p>
                </div>
              </div>
              <button className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#2D4D31] hover:bg-white transition-all">
                <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
