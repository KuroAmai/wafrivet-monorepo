"use client";

import Link from "next/link";
import { ShoppingCart, User, MagnifyingGlass, List, Bell } from "@phosphor-icons/react";
import { useState } from "react";

export function ShopNavbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logo.svg" alt="Wafrivet" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-[#2D4D31] tracking-tight">SHOP</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl relative group">
            <div className={`w-full flex items-center bg-gray-50 border transition-all rounded-2xl px-4 py-2.5 ${isSearchFocused ? 'border-[#2D4D31] bg-white ring-4 ring-[#2D4D31]/5' : 'border-gray-200 group-hover:border-gray-300'}`}>
              <MagnifyingGlass size={20} className={isSearchFocused ? 'text-[#2D4D31]' : 'text-gray-400'} />
              <input 
                type="text" 
                placeholder="Search for vaccines, equipment, or feed..." 
                className="ml-3 w-full bg-transparent outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link href="/cart" className="flex items-center gap-2 p-2.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group">
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-[#2D4D31] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </div>
              <span className="hidden sm:inline font-medium text-[14px]">Cart</span>
            </Link>
            <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
            <Link href="/profile" className="flex items-center gap-3 p-1.5 pl-3 border border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all">
              <span className="hidden sm:inline text-[14px] font-medium text-gray-700">Account</span>
              <div className="w-9 h-9 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white font-bold text-sm">
                <User size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Sub-nav */}
      <div className="border-t border-gray-50 bg-white hidden sm:block">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-8 h-12 overflow-x-auto no-scrollbar">
            <Link href="/all" className="flex items-center gap-2 text-[13px] font-semibold text-[#2D4D31] border-b-2 border-[#2D4D31] h-full px-1">
              <List size={16} /> All Categories
            </Link>
            {['Livestock', 'Vaccines', 'Pharma', 'Equipment', 'Feeds', 'Consultation'].map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`} className="text-[13px] font-medium text-gray-500 hover:text-[#2D4D31] transition-colors whitespace-nowrap h-full flex items-center px-1">
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
