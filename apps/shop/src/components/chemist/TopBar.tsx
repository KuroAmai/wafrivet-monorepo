"use client";

import { MagnifyingGlass, Bell, UserCircle } from "@phosphor-icons/react";

export function TopBar() {
  return (
    <header className="h-20 bg-white border-b border-gray-50 flex items-center justify-between px-8 shrink-0 relative z-10 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <div className="flex-1 max-w-md relative group">
        <MagnifyingGlass 
          size={20} 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#2D4D31] transition-colors" 
        />
        <input 
          type="text" 
          placeholder="Search orders, stock, or customers..." 
          className="w-full h-11 bg-gray-50 border-none rounded-xl pl-12 pr-4 text-[14px] font-medium outline-none focus:ring-2 focus:ring-[#2D4D31]/10 transition-all placeholder:text-gray-300"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-bold text-gray-900 leading-none">Pharmacy Admin</p>
            <p className="text-[11px] font-medium text-gray-400 mt-1">Lagos Island Branch</p>
          </div>
          <div className="w-10 h-10 bg-[#2D4D31]/10 rounded-xl flex items-center justify-center text-[#2D4D31]">
            <UserCircle size={28} weight="duotone" />
          </div>
        </div>
      </div>
    </header>
  );
}
