"use client";

import { useState } from "react";
import { 
  Bell, 
  MagnifyingGlass, 
  SignOut,
  Database,
  CaretDown
} from "@phosphor-icons/react";
import { NotificationDrawer } from "./NotificationDrawer";

export function AdminTopBar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <>
      <header className="h-24 bg-[#F9FAFB] flex items-center sticky top-0 z-50">
      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Side (Empty/Spacer) */}
        <div className="flex items-center gap-8">
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-4 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-gray-100 min-w-[350px] shadow-sm shadow-gray-100/50 group focus-within:bg-white transition-all">
            <MagnifyingGlass size={18} className="text-gray-400 group-focus-within:text-[#2D4D31]" />
            <input 
              id="global-search"
              type="text" 
              placeholder="Search users, orders, or analytics..." 
              className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                  e.preventDefault();
                }
              }}
            />
            <div className="flex items-center gap-1 px-1.5 py-1 bg-gray-100 border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 group-focus-within:hidden">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
          <script dangerouslySetInnerHTML={{ __html: `
            window.addEventListener('keydown', (e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('global-search')?.focus();
              }
            });
          `}} />

          <div className="h-10 w-px bg-gray-200 hidden xl:block" />

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-gray-500 hover:bg-white hover:shadow-sm transition-all relative border border-transparent"
            >
              <Bell size={22} weight="duotone" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-white" />
            </button>
            
            <div className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all">
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[13px] font-black text-gray-900 tracking-tight leading-none">Super Admin</span>
              </div>
              <CaretDown size={12} weight="bold" className="text-gray-400 ml-1" />
            </div>

            <button className="w-11 h-11 rounded-2xl bg-white/50 text-red-500 flex items-center justify-center hover:bg-red-50 transition-all border border-gray-100/50">
              <SignOut size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </header>
      <NotificationDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
}
