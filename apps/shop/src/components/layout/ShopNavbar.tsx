"use client";

import Link from "next/link";
import { ShoppingCart, User, Bell, MapPin } from "@phosphor-icons/react";

export function ShopNavbar() {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Greeting & Location */}
          <div className="flex flex-col">
            <h1 className="text-[18px] font-bold text-gray-900 leading-tight">
              Good morning, Emeka.
            </h1>
            <div className="flex items-center gap-1 text-[13px] text-gray-500 font-medium mt-0.5">
              <MapPin size={14} weight="fill" className="text-[#2D4D31]" />
              <span>Lagos Island · 12 chemists nearby</span>
            </div>
          </div>

          {/* Logo (Centered or Right) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <img src="/logo.svg" alt="Wafrivet" className="h-8 w-auto" />
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link href="/cart" className="p-2.5 text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors relative">
              <ShoppingCart size={24} />
              <span className="absolute top-2 right-2 bg-[#2D4D31] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">3</span>
            </Link>
            <Link href="/profile" className="ml-2 w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-2 border-white shadow-sm">
              <User size={22} weight="bold" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
