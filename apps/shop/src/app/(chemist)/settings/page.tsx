"use client";

import { Gear, User, Bell, ShieldCheck, MapPin, Phone, Envelope, Globe, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({ orders: true, stock: true, marketing: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Branch Settings</h1>
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">Configure your branch profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
           {/* Branch Profile */}
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                    <User size={22} weight="bold" />
                 </div>
                 <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Branch Profile</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Branch Name</label>
                    <input type="text" defaultValue="Lagos Island Hub" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Branch ID</label>
                    <input type="text" defaultValue="WFR-LAG-001" readOnly className="w-full px-6 py-4 bg-gray-100 border-none rounded-2xl text-[14px] font-bold text-gray-400 cursor-not-allowed" />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Physical Address</label>
                    <textarea defaultValue="Block 12, Adeola Hopewell St, Victoria Island, Lagos" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold h-24" />
                 </div>
              </div>
              
              <button className="mt-8 px-10 py-4 bg-[#2D4D31] text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-[#243f28] transition-all">
                 Save Changes
              </button>
           </div>

           {/* Security */}
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                    <ShieldCheck size={22} weight="bold" />
                 </div>
                 <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Security</h3>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group cursor-pointer hover:bg-gray-100 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] transition-colors">
                          <Gear size={20} weight="bold" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-[14px]">Update Password</p>
                          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">Last changed 3 months ago</p>
                       </div>
                    </div>
                    <ArrowRight size={20} className="text-gray-300 group-hover:text-gray-900 transition-all" />
                 </div>
              </div>
           </div>
        </div>

        {/* Notifications Sidebar */}
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 h-fit">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                 <Bell size={22} weight="bold" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Notifications</h3>
           </div>
           
           <div className="space-y-6">
              {[
                { key: 'orders', label: 'Order Alerts', desc: 'Notify me when new orders arrive' },
                { key: 'stock', label: 'Inventory Alerts', desc: 'Low stock and critical levels' },
                { key: 'marketing', label: 'System Updates', desc: 'Maintenance and new features' }
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4">
                   <div>
                      <p className="font-bold text-gray-900 text-[14px] mb-0.5">{item.label}</p>
                      <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                   </div>
                   <button 
                     onClick={() => setNotifs(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof notifs] }))}
                     className={`w-12 h-6 rounded-full transition-all relative ${notifs[item.key as keyof typeof notifs] ? 'bg-[#2D4D31]' : 'bg-gray-200'}`}
                   >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifs[item.key as keyof typeof notifs] ? 'right-1' : 'left-1'}`} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
