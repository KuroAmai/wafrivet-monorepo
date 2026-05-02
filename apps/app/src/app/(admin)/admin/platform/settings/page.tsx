"use client";

import { useState } from "react";
import { 
  Gear, 
  Percent, 
  DeviceMobile, 
  Wallet, 
  ShieldCheck, 
  CheckCircle,
  FloppyDisk,
  Warning,
  Info,
  ArrowRight,
  UserGear,
  ChartPieSlice,
  ShieldPlus
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function PlatformSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">System Configuration</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Configure global parameters and economic variables</p>
        </div>
        <button className="bg-[#2D4D31] text-white px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-wider shadow-lg shadow-[#2D4D31]/20 flex items-center gap-2 hover:bg-[#2D4D31]/90 transition-all">
          <FloppyDisk size={18} weight="bold" /> Commit Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Pillar - Economic & Financials */}
        <div className="lg:col-span-7 space-y-8">
          {/* Revenue & Commission */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-2">Economic Variables</h3>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Global revenue and interest rate parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">BNPL Interest Rate</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    defaultValue="7.0" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all group-hover:border-gray-200" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold italic">Standard principal agreement interest</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Marketplace Commission</label>
                <div className="relative group">
                  <input 
                    type="number" 
                    defaultValue="5.0" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all group-hover:border-gray-200" 
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold italic">Transaction fee on completed orders</p>
              </div>
            </div>
          </div>

          {/* Treasury & Wallet */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-2">Treasury Controls</h3>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Wallet limits and withdrawal thresholds</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Daily Withdrawal Limit</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-300">₦</span>
                  <input 
                    type="text" 
                    defaultValue="500,000" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl pl-10 pr-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all group-hover:border-gray-200" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Max Wallet Balance</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-gray-300">₦</span>
                  <input 
                    type="text" 
                    defaultValue="5,000,000" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl pl-10 pr-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all group-hover:border-gray-200" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Pillar - Infrastructure & Governance */}
        <div className="lg:col-span-5 space-y-8">
          {/* Gateway Status */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-2">Gateway Nodes</h3>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Communication infrastructure status</p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">USSD Root Code</span>
                  <code className="text-[15px] font-black text-[#2D4D31] font-mono leading-none">*402#</code>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-100">Active Node</div>
              </div>

              <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">System Maintenance</span>
                  <span className="text-[14px] font-black text-gray-900 leading-none">Global Lockout</span>
                </div>
                <button 
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-all duration-300",
                    maintenanceMode ? "bg-red-500 shadow-inner" : "bg-gray-200"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300",
                    maintenanceMode ? "left-7" : "left-1"
                  )} />
                </button>
              </div>
            </div>
          </div>

          {/* Governance & Roles */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="mb-8">
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight leading-none mb-2">Access Governance</h3>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Identity and role management</p>
            </div>

            <div className="space-y-3">
              {[
                { role: "Super Admin", count: 2, desc: "Full root access", color: "text-[#2D4D31]" },
                { role: "Operations", count: 5, desc: "Triage & Logistics", color: "text-blue-500" },
                { role: "Auditor", count: 8, desc: "Log-only read access", color: "text-orange-500" },
              ].map((role, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[14px] font-black text-gray-900">{role.role}</span>
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", role.color)}>{role.count} Active</span>
                  </div>
                  <p className="text-[11px] text-gray-400 font-bold">{role.desc}</p>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-[#2D4D31]/20 hover:text-[#2D4D31] transition-all flex items-center justify-center gap-2">
                <ShieldPlus size={16} weight="bold" /> Define New Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
