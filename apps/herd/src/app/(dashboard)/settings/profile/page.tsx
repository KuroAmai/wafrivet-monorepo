"use client";

import { CaretLeft, Camera, User, Envelope, Phone, Globe, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function ProfileInfoPage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Profile Info</h1>
        <button 
          onClick={handleSave}
          className="text-[13px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline disabled:opacity-50"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Avatar Edit */}
        <div className="flex flex-col items-center">
           <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] border-4 border-white shadow-2xl overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ademola" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center border-4 border-white shadow-lg active:scale-90 transition-transform">
                 <Camera size={20} weight="bold" />
              </button>
           </div>
           <p className="mt-4 text-[12px] font-black text-gray-300 uppercase tracking-widest">Update Photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
              <div className="relative">
                 <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="text" 
                   defaultValue="Dr. Ademola Adebayo"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
              <div className="relative">
                 <Envelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="email" 
                   defaultValue="ademola@wafrivet.com"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
                 <div className="absolute right-5 top-1/2 -translate-y-1/2 text-emerald-500 bg-emerald-50 p-1.5 rounded-lg">
                    <Check size={14} weight="bold" />
                 </div>
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Phone Number</label>
              <div className="relative">
                 <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <input 
                   type="tel" 
                   defaultValue="+234 812 345 6789"
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Primary Region</label>
              <div className="relative">
                 <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} weight="bold" />
                 <select 
                   className="w-full bg-white border border-gray-100 p-5 pl-14 rounded-[24px] text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm appearance-none"
                 >
                    <option>Lagos, Nigeria</option>
                    <option>Abuja, Nigeria</option>
                    <option>Kano, Nigeria</option>
                    <option>Ogun State, Nigeria</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Professional Summary */}
        <div className="space-y-4">
           <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-1">Bio / Summary</h3>
           <textarea 
             className="w-full bg-white border border-gray-100 p-6 rounded-[32px] text-[14px] font-bold text-gray-900 h-32 resize-none focus:outline-none focus:ring-4 focus:ring-[#2D4D31]/5 focus:border-[#2D4D31]/20 transition-all shadow-sm"
             defaultValue="Specializing in large animal health and infectious disease control across Western Africa. 10+ years experience in herd management."
           />
        </div>

        {/* Footer info */}
        <div className="p-8 bg-white rounded-[40px] border border-gray-100 text-center space-y-2">
           <p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Account ID</p>
           <p className="text-[14px] font-black text-gray-900">WF-ADM-88201-ADE</p>
        </div>
      </div>
    </div>
  );
}
