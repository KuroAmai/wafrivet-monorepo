"use client";

import Link from "next/link";
import { ShoppingCart, Bell, MapPin, CaretDown } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

export function ShopNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const [location, setLocation] = useState("Lagos Island");

  useEffect(() => {
    // Simple check for our mock token
    const hasToken = document.cookie.includes("jwt=mock-token");
    if (hasToken) {
      setIsLoggedIn(true);
      setUserName("Emeka");
    }
  }, []);

  return (
    <header className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo & Info */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center shrink-0">
              <img src="/logo.svg" alt="Wafrivet" className="h-20 w-auto" />
            </Link>
            <button className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4 group transition-colors">
              <MapPin size={14} weight="fill" className="text-[#2D4D31]" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Location</span>
                <div className="flex items-center gap-1">
                  <span className="text-[13px] text-gray-900 font-bold group-hover:text-[#2D4D31]">{location}</span>
                  <CaretDown size={12} weight="bold" className="text-gray-400" />
                </div>
              </div>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-2xl transition-colors relative">
              <Bell size={24} />
              {isLoggedIn && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>}
            </button>
            
            <Link href={isLoggedIn ? "/cart" : "https://app.wafrivet.com/login"} className="group flex items-center gap-2 p-2 bg-[#2D4D31] hover:bg-[#243f28] rounded-2xl transition-all pr-4 shadow-lg shadow-[#2D4D31]/20">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white relative">
                <ShoppingCart size={22} weight="bold" />
                {isLoggedIn && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#2D4D31] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#2D4D31]">
                    3
                  </span>
                )}
              </div>
              <span className="text-white font-bold text-[14px]">{isLoggedIn ? "₦42,500" : "Cart"}</span>
            </Link>

            <Link href={isLoggedIn ? "/profile" : "https://app.wafrivet.com/login"} className="ml-1 flex items-center gap-3 bg-white p-1.5 pr-4 rounded-[20px] border border-gray-100 shadow-sm">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}&backgroundColor=b6e3f4`} 
                alt="Profile" 
                className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" 
              />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Account</span>
                <span className="text-[13px] text-gray-900 font-bold">{userName}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
