"use client";

import { 
  Gear, 
  Percent, 
  DeviceMobile, 
  Wallet, 
  ShieldCheck, 
  CheckCircle,
  FloppyDisk,
  Warning,
  Info
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function PlatformSettingsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Platform Settings</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Configure global parameters and economic variables</p>
        </div>
        <button className="bg-[#2D4D31] text-white px-8 py-3 rounded-2xl text-[13px] font-black uppercase tracking-wider shadow-lg shadow-[#2D4D31]/20 flex items-center gap-2">
          <FloppyDisk size={18} weight="bold" /> Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column - Financials */}
        <div className="lg:col-span-7 space-y-8">
          {/* Platform Fees */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                <Percent size={24} weight="duotone" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Platform Fees</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">BNPL Interest Rate (%)</label>
                <div className="relative">
                  <input type="number" defaultValue="7.0" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all" />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Applied to every BNPL agreement principal</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Marketplace Commission (%)</label>
                <div className="relative">
                  <input type="number" defaultValue="5.0" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all" />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium">Charged to chemists on every completed order</p>
              </div>
            </div>
          </div>

          {/* Wallet Limits */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                <Wallet size={24} weight="duotone" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Wallet Limits</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Daily Withdrawal Limit (₦)</label>
                <input type="text" defaultValue="500,000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Max Wallet Balance (₦)</label>
                <input type="text" defaultValue="5,000,000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[16px] font-black text-gray-900 outline-none focus:border-[#2D4D31]/20 focus:bg-white transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - USSD & Permissions */}
        <div className="lg:col-span-5 space-y-8">
          {/* USSD Config */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                <DeviceMobile size={24} weight="duotone" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">USSD Gateway</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-[13px] font-black text-gray-900 block">USSD Root Code</span>
                  <code className="text-[14px] font-black text-[#2D4D31]">*402#</code>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest">Active</div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-gray-600">Maintenance Mode</span>
                <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-all">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          </div>

          {/* Admin Roles */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={24} weight="duotone" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Access Control</h3>
            </div>

            <div className="space-y-4">
              {[
                { role: "Super Admin", count: 2, desc: "Full platform control" },
                { role: "Operations", count: 5, desc: "Order & Logistics management" },
                { role: "Support", count: 8, desc: "View only + USSD/Voice logs" },
              ].map((role, i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[14px] font-black text-gray-900">{role.role}</span>
                    <span className="text-[11px] font-black text-gray-400 group-hover:text-[#2D4D31] transition-colors">{role.count} Admins</span>
                  </div>
                  <p className="text-[12px] text-gray-500 font-medium">{role.desc}</p>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-[12px] font-black text-gray-400 uppercase tracking-widest hover:border-[#2D4D31]/20 hover:text-[#2D4D31] transition-all">
                + Create Custom Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
