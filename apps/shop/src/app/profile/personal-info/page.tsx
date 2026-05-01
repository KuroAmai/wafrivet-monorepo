"use client";

import { User, PencilSimple, Camera } from "@phosphor-icons/react";

export default function PersonalInfoPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Personal Information</h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] hover:bg-[#2D4D31]/90 transition-all">
          <PencilSimple size={18} weight="bold" />
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Mustapha&backgroundColor=b6e3f4`} 
              className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg transition-transform group-hover:scale-105" 
              alt="Avatar" 
            />
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 shadow-sm hover:bg-gray-50 transition-all">
              <Camera size={20} weight="bold" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[20px] font-black text-gray-900 mb-1">Mustapha Ahmed</h3>
            <p className="text-[14px] text-gray-400 font-medium uppercase tracking-widest">Premium Farmer Member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 p-10">
          <InfoItem label="Full Name" value="Mustapha Ahmed" />
          <InfoItem label="Email Address" value="mustapha.ahmed@wafrivet.com" />
          <InfoItem label="Phone Number" value="+234 801 234 5678" />
          <InfoItem label="Location" value="Kano, Nigeria" />
          <InfoItem label="Business Type" value="Poultry & Cattle" />
          <InfoItem label="Member Since" value="October 12, 2025" />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">{label}</p>
      <p className="text-[15px] font-bold text-gray-800">{value}</p>
    </div>
  );
}
