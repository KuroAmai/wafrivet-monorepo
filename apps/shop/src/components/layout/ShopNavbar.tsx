"use client";

import Link from "next/link";
import { ShoppingCart, Bell, MapPin, MagnifyingGlass } from "@phosphor-icons/react";

export function ShopNavbar() {
  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo & Info */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center shrink-0">
              <img src="/logo.svg" alt="Wafrivet" className="h-14 w-auto" />
            </Link>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-[16px] font-bold text-gray-900 leading-tight">
                Good morning, Emeka.
              </h1>
              <div className="flex items-center gap-1 text-[12px] text-gray-400 font-medium mt-0.5">
                <MapPin size={12} weight="fill" className="text-[#2D4D31]" />
                <span>Lagos Island · 12 chemists nearby</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
             <div className="hidden md:flex items-center bg-gray-100 rounded-2xl px-4 py-2.5 w-64 group focus-within:w-80 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#2D4D31]/5 transition-all">
                <MagnifyingGlass size={18} className="text-gray-400 group-focus-within:text-[#2D4D31]" />
                <input type="text" placeholder="Search..." className="ml-2 bg-transparent outline-none text-[14px] w-full" />
             </div>

            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-2xl transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>
            </button>
            
            <Link href="/cart" className="group flex items-center gap-2 p-2 bg-[#2D4D31] hover:bg-[#243f28] rounded-2xl transition-all pr-4 shadow-lg shadow-[#2D4D31]/20">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white relative">
                <ShoppingCart size={22} weight="bold" />
                <span className="absolute -top-1.5 -right-1.5 bg-white text-[#2D4D31] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2D4D31]">
                  3
                </span>
              </div>
              <span className="text-white font-bold text-[14px]">₦42,500</span>
            </Link>

            <Link href="/profile" className="ml-1">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka&backgroundColor=b6e3f4" 
                alt="Profile" 
                className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm hover:scale-105 transition-transform" 
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
