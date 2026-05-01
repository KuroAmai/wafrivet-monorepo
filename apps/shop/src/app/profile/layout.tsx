"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Heart, 
  Bell, 
  SealCheck, 
  SignOut,
  CaretRight
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName] = useState("Mustapha Ahmed");
  const pathname = usePathname();

  const handleLogout = () => {
    // Clear mock token
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  const navItems = [
    { 
      icon: User, 
      label: "Account Overview", 
      href: "/profile",
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      icon: SealCheck, 
      label: "Personal Info", 
      href: "/profile/personal-info",
      color: "text-emerald-500", 
      bg: "bg-emerald-50" 
    },
    { 
      icon: MapPin, 
      label: "My Addresses", 
      href: "/profile/addresses",
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    },
    { 
      icon: CreditCard, 
      label: "Payment Methods", 
      href: "/profile/payment-methods",
      color: "text-purple-500", 
      bg: "bg-purple-50" 
    },
    { 
      icon: Heart, 
      label: "Saved Items", 
      href: "/profile/saved-items",
      color: "text-red-500", 
      bg: "bg-red-50" 
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      href: "/profile/notifications",
      color: "text-amber-500", 
      bg: "bg-amber-50" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar: Profile Summary & Nav */}
          <div className="space-y-6">
             <Link href="/profile" className="block group">
               <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:border-[#2D4D31]/20">
                  <div className="relative mb-6">
                     <img 
                       src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Mustapha&backgroundColor=b6e3f4`} 
                       className="w-32 h-32 rounded-[40px] border-4 border-white shadow-xl shadow-gray-200/50" 
                       alt="Profile" 
                     />
                     <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white">
                        <SealCheck size={20} weight="fill" />
                     </div>
                  </div>
                  <h1 className="text-[24px] font-black text-gray-900 tracking-tight mb-1">{userName}</h1>
                  <p className="text-[14px] text-gray-400 font-medium mb-6">Member since Oct 2025</p>
                  
                  <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-50">
                     <div className="text-center">
                        <p className="text-[18px] font-black text-gray-900">12</p>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Orders</p>
                     </div>
                     <div className="text-center border-l border-gray-50">
                        <p className="text-[18px] font-black text-gray-900">₦1.2M</p>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Spent</p>
                     </div>
                  </div>
               </div>
             </Link>

             {/* Navigation */}
             <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={i} 
                      href={item.href}
                      className={`w-full flex items-center justify-between p-5 transition-all border-b border-gray-50 last:border-0 group ${
                        isActive ? 'bg-gray-50' : 'hover:bg-gray-50/50'
                      }`}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                             <item.icon size={20} weight="bold" />
                          </div>
                          <span className={`font-bold transition-colors ${
                            isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                          }`}>
                            {item.label}
                          </span>
                       </div>
                       <CaretRight 
                         size={18} 
                         weight="bold" 
                         className={`transition-all ${
                           isActive ? 'text-gray-900 translate-x-1' : 'text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1'
                         }`} 
                       />
                    </Link>
                  );
                })}
             </div>

             <button 
               onClick={handleLogout}
               className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-600 rounded-[32px] font-black text-[15px] hover:bg-red-100 transition-all active:scale-[0.98]"
             >
                <SignOut size={20} weight="bold" />
                Sign Out
             </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
