"use client";

import { useState } from "react";
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
  Clock,
  MagnifyingGlass,
  X,
  ArrowsClockwise,
  DownloadSimple,
  Activity,
  Lightning,
  ShieldPlus
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const SERVICES_DATA = [
  { name: "Global API Gateway", status: "Operational", latency: "12ms", uptime: "99.99%", load: "24%", icon: Globe, color: "emerald" },
  { name: "Identity & Auth Hub", status: "Operational", latency: "8ms", uptime: "100%", load: "12%", icon: ShieldCheck, color: "emerald" },
  { name: "Marketplace Data Node", status: "Degraded", latency: "245ms", uptime: "99.95%", load: "88%", icon: Database, color: "orange" },
  { name: "Livestock Core Engine", status: "Operational", latency: "15ms", uptime: "99.99%", load: "34%", icon: Pulse, color: "emerald" },
  { name: "Treasury & Payments", status: "Operational", latency: "42ms", uptime: "99.98%", load: "15%", icon: CreditCard, color: "emerald" },
  { name: "SMS Relay (Twilio)", status: "Operational", latency: "120ms", uptime: "99.90%", load: "5%", icon: ChatCircleText, color: "emerald" },
  { name: "USSD Access Node", status: "Operational", latency: "85ms", uptime: "99.99%", load: "18%", icon: DeviceMobile, color: "emerald" },
  { name: "Asset Forecast Engine", status: "Operational", latency: "210ms", uptime: "99.92%", load: "62%", icon: Activity, color: "emerald" },
];

const INCIDENTS_DATA = [
  { id: "INC-9281", time: "2 hours ago", service: "Marketplace Data Node", event: "High Latency in Lagos-1 Region", status: "Monitoring", severity: "Medium" },
  { id: "INC-9280", time: "1 day ago", service: "Treasury & Payments", event: "Flutterwave Webhook Delay", status: "Resolved", severity: "High" },
  { id: "INC-9279", time: "3 days ago", service: "Identity & Auth Hub", event: "AuthDB Maintenance Window", status: "Completed", severity: "Low" },
  { id: "INC-9278", time: "5 days ago", service: "USSD Access Node", event: "MTN Gateway Timeout", status: "Resolved", severity: "High" },
];

export default function PlatformHealthPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Events");

  const filteredIncidents = INCIDENTS_DATA.filter(incident => {
    const matchesSearch = 
      incident.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All Events" || incident.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">System Health</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Real-time infrastructure telemetry and incident auditing</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:text-[#2D4D31] transition-all shadow-sm group">
            <ArrowsClockwise size={20} weight="bold" className="group-active:rotate-180 transition-transform duration-500" />
          </button>
          <div className="bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-100 flex items-center gap-3 shadow-sm shadow-emerald-500/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] font-black text-emerald-600 uppercase tracking-widest">Global Systems Nominal</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Overall Uptime", value: "99.98%", sub: "Last 30 days", color: "emerald" },
          { label: "Avg Latency", value: "32ms", sub: "Global weighted", color: "blue" },
          { label: "Error Rate", value: "0.02%", sub: "Request failures", color: "emerald" },
          { label: "Active Nodes", value: "142/145", sub: "Network health", color: "emerald" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" : "text-blue-500"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Services Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {SERVICES_DATA.map((service, i) => (
          <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                service.color === "emerald" ? "bg-emerald-50 text-emerald-500" : "bg-orange-50 text-orange-500"
              )}>
                <service.icon size={24} weight="duotone" />
              </div>
              <div className={cn(
                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                service.status === "Operational" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                "bg-orange-50 text-orange-500 border-orange-100"
              )}>
                {service.status}
              </div>
            </div>

            <h3 className="text-[17px] font-black text-gray-900 tracking-tight mb-4 leading-none">{service.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Latency</span>
                <span className={cn("text-[13px] font-black", service.color === "orange" ? "text-orange-500" : "text-gray-900")}>{service.latency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Uptime</span>
                <span className="text-[13px] font-black text-gray-900">{service.uptime}</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2">
               <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Current Load</span>
                  <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{service.load}</span>
               </div>
               <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    service.color === "emerald" ? "bg-emerald-500" : "bg-orange-500"
                  )} style={{ width: service.load }} />
               </div>
            </div>

            {/* Subtle glow on hover */}
            <div className={cn(
              "absolute -bottom-10 -right-10 w-24 h-24 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full",
              service.color === "emerald" ? "bg-emerald-500" : "bg-orange-500"
            )} />
          </div>
        ))}
      </div>

      {/* Incident Intelligence Log */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-black text-gray-900 tracking-tight leading-none px-2">Incident Intelligence Log</h2>
          <button className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline flex items-center gap-2">
            <DownloadSimple size={16} weight="bold" /> Export History
          </button>
        </div>

        {/* Unified Filter Bar */}
        <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all shadow-none">
            <MagnifyingGlass size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID, service or incident data..." 
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
              {["All Events", "Monitoring", "Resolved", "Completed"].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("All Events");
            }}
            className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Incident Table */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Incident Identity</th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Affected Infrastructure</th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Audit Log / Event</th>
                  <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Audit Status</th>
                  <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredIncidents.map((incident) => (
                  <tr key={incident.id} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-[14px] font-black text-gray-900 tracking-tight mb-1 leading-none">{incident.id}</span>
                        <div className="flex items-center gap-1.5">
                          <Lightning size={10} weight="fill" className={cn(
                            incident.severity === "High" ? "text-red-500" :
                            incident.severity === "Medium" ? "text-orange-500" : "text-blue-500"
                          )} />
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{incident.severity} Severity</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5">
                      <span className="text-[13px] font-bold text-gray-900 leading-none">{incident.service}</span>
                    </td>
                    <td className="px-5 py-5">
                      <p className="text-[13px] font-medium text-gray-500 max-w-[350px] leading-tight">
                        {incident.event}
                      </p>
                    </td>
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-2">
                        <Circle size={8} weight="fill" className={cn(
                          incident.status === "Monitoring" ? "text-orange-500 animate-pulse" :
                          incident.status === "Resolved" ? "text-emerald-500" : "text-blue-500"
                        )} />
                        <span className="text-[13px] font-black text-gray-900">{incident.status}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-[13px] font-bold text-gray-900">{incident.time}</span>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">Logged</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredIncidents.length} of {INCIDENTS_DATA.length} incidents</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((page, i) => (
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
    </div>
  );
}
