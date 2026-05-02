"use client";

import Link from "next/link";
import { Bell, MapPin, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { NotificationDrawer } from "@/components/shop/NotificationDrawer";

export function ChemistNavbar() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="bg-transparent border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Branch Info */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center shrink-0">
                <img src="/logo-mark.svg" alt="Wafrivet" className="h-10 w-auto" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4">
                <MapPin size={14} weight="fill" className="text-[#2D4D31]" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Branch Location</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-gray-900 font-bold">Lagos Island</span>
                    <CaretDown size={12} weight="bold" className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsNotificationOpen(true)}
                className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-2xl transition-colors relative"
              >
                <Bell size={24} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>
              </button>
              
              <div className="h-8 w-px bg-gray-100" />

              <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-50 shadow-sm">
                <img 
                  src="https://api.dicebear.com/7.x/shapes/svg?seed=LagosBranch&backgroundColor=b6e3f4" 
                  alt="Branch Admin" 
                  className="w-9 h-9 rounded-xl border-2 border-white" 
                />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Admin</span>
                  <span className="text-[13px] text-gray-900 font-bold">Lagos Branch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <NotificationDrawer isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
}
