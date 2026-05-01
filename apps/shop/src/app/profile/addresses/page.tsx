"use client";

import { MapPin, Plus, House, Buildings, Briefcase } from "@phosphor-icons/react";

export default function AddressesPage() {
  const addresses = [
    { 
      id: 1, 
      type: "Home", 
      icon: House, 
      address: "123 Farm Road, Gwale", 
      city: "Kano", 
      isDefault: true 
    },
    { 
      id: 2, 
      type: "Farm HQ", 
      icon: Buildings, 
      address: "Km 15, Zaria Road", 
      city: "Kano", 
      isDefault: false 
    },
    { 
      id: 3, 
      type: "Office", 
      icon: Briefcase, 
      address: "45 Business Avenue", 
      city: "Lagos", 
      isDefault: false 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">My Addresses</h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] hover:bg-[#2D4D31]/90 transition-all">
          <Plus size={18} weight="bold" />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-[#2D4D31]/20 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center group-hover:bg-[#2D4D31]/5 group-hover:text-[#2D4D31] transition-all">
                <addr.icon size={28} weight="bold" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-black text-gray-900 text-[16px]">{addr.type}</h3>
                  {addr.isDefault && (
                    <span className="px-2.5 py-0.5 bg-[#2D4D31]/10 text-[#2D4D31] rounded-lg text-[10px] font-black uppercase tracking-wider">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-gray-500 font-medium">{addr.address}, {addr.city}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-[13px] font-bold text-gray-400 hover:text-gray-900 transition-colors">Edit</button>
              <button className="px-4 py-2 text-[13px] font-bold text-red-400 hover:text-red-600 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
