"use client";

import { CaretLeft, Fingerprint, ShieldCheck, Key, DeviceMobile, Devices, Warning, ToggleRight, ToggleLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SecurityPage() {
  const [faceId, setFaceId] = useState(true);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Security</h1>
        <div className="w-10" />
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Security Health */}
        <div className="p-8 bg-emerald-600 rounded-[40px] text-white shadow-xl shadow-emerald-600/20 text-center space-y-4">
           <div className="w-16 h-16 bg-white/20 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/30 mx-auto">
              <ShieldCheck size={32} weight="fill" />
           </div>
           <div>
              <h2 className="text-[20px] font-black tracking-tight">Your account is safe</h2>
              <p className="text-[12px] font-bold text-white/70 uppercase tracking-widest mt-1">Last security check: 2h ago</p>
           </div>
        </div>

        {/* Biometrics */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Biometrics</h3>
           <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-emerald-50 text-[#2D4D31] rounded-2xl flex items-center justify-center">
                    <Fingerprint size={24} weight="bold" />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-black text-gray-900">Biometric Unlock</h4>
                    <p className="text-[12px] text-gray-400 font-medium">Use FaceID or Fingerprint</p>
                 </div>
              </div>
              <button onClick={() => setFaceId(!faceId)} className={cn("transition-colors duration-300", faceId ? "text-[#2D4D31]" : "text-gray-200")}>
                 {faceId ? <ToggleRight size={44} weight="fill" /> : <ToggleLeft size={44} weight="fill" />}
              </button>
           </div>
        </div>

        {/* Access Control */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Access Control</h3>
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                       <Key size={24} weight="bold" />
                    </div>
                    <div className="text-left">
                       <h4 className="text-[15px] font-black text-gray-900 leading-none">Change Password</h4>
                       <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Last changed 4 mos ago</p>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-all">
                    <CaretLeft size={18} weight="bold" className="rotate-180" />
                 </div>
              </button>

              <button className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all group">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                       <DeviceMobile size={24} weight="bold" />
                    </div>
                    <div className="text-left">
                       <h4 className="text-[15px] font-black text-gray-900 leading-none">Two-Factor Auth</h4>
                       <p className="text-[11px] font-bold text-emerald-500 mt-2 uppercase tracking-widest">Active via App</p>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-all">
                    <CaretLeft size={18} weight="bold" className="rotate-180" />
                 </div>
              </button>
           </div>
        </div>

        {/* Sessions */}
        <div className="space-y-4">
           <h3 className="px-4 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Active Sessions</h3>
           <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center">
                    <Devices size={24} weight="bold" />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-black text-gray-900">Current Device</h4>
                    <p className="text-[12px] text-gray-400 font-medium">Lagos • iPhone 15 Pro</p>
                 </div>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-[#2D4D31] rounded-lg text-[10px] font-black uppercase tracking-widest">Online</span>
           </div>
        </div>

        {/* Danger Zone */}
        <div className="p-8 bg-red-50 rounded-[40px] border border-red-100 space-y-4">
           <div className="flex items-center gap-3 text-red-600">
              <Warning size={20} weight="fill" />
              <h4 className="text-[15px] font-black">Account Deactivation</h4>
           </div>
           <p className="text-[12px] text-red-500/70 leading-relaxed">
             Deleting your account will permanently remove all medical logs and farm assignments. This cannot be undone.
           </p>
           <button className="text-[13px] font-black text-red-600 uppercase tracking-widest hover:underline">Delete Session Data</button>
        </div>
      </div>
    </div>
  );
}
