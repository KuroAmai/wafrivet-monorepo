"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { 
  Package, 
  MapPin, 
  User, 
  CreditCard, 
  Bell, 
  ShieldCheck, 
  SignOut,
  CaretRight,
  Clock,
  SealCheck,
  Heart
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [userName, setUserName] = useState("Mustapha Ahmed");
  
  const orders = [
    { id: "WF-9281", date: "Today, 10:30 AM", status: "In Transit", total: "₦42,500", items: 2 },
    { id: "WF-8912", date: "24 Apr 2026", status: "Delivered", total: "₦12,800", items: 1 },
    { id: "WF-8704", date: "12 Apr 2026", status: "Delivered", total: "₦65,000", items: 5 },
  ];

  const handleLogout = () => {
    // Clear mock token
    document.cookie = "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar: Profile Summary */}
          <div className="space-y-6">
             <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-6">
                   <img 
                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}&backgroundColor=b6e3f4`} 
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

             {/* Quick Actions */}
             <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                {[
                  { icon: User, label: "Personal Info", color: "text-blue-500", bg: "bg-blue-50" },
                  { icon: MapPin, label: "My Addresses", color: "text-[#2D4D31]", bg: "bg-[#2D4D31]/5" },
                  { icon: CreditCard, label: "Payment Methods", color: "text-purple-500", bg: "bg-purple-50" },
                  { icon: Heart, label: "Saved Items", color: "text-red-500", bg: "bg-red-50" },
                  { icon: Bell, label: "Notifications", color: "text-orange-500", bg: "bg-orange-50" },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 group">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                           <item.icon size={20} weight="bold" />
                        </div>
                        <span className="font-bold text-gray-700 group-hover:text-gray-900">{item.label}</span>
                     </div>
                     <CaretRight size={18} weight="bold" className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
             </div>

             <button 
               onClick={handleLogout}
               className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-600 rounded-[32px] font-black text-[15px] hover:bg-red-100 transition-all"
             >
                <SignOut size={20} weight="bold" />
                Sign Out
             </button>
          </div>

          {/* Main Content: Orders & History */}
          <div className="lg:col-span-2 space-y-10">
             <section>
                <div className="flex items-center justify-between mb-8 px-2">
                   <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Recent Orders</h2>
                   <Link href="/orders" className="text-[14px] font-black text-[#2D4D31] hover:underline">View All</Link>
                </div>

                <div className="space-y-4">
                   {orders.map((order) => (
                     <div key={order.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-[#2D4D31]/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${order.status === 'In Transit' ? 'bg-[#2D4D31] text-white animate-pulse' : 'bg-gray-50 text-gray-400'}`}>
                              <Package size={28} weight="bold" />
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                 <h3 className="font-black text-gray-900 text-[16px]">Order #{order.id}</h3>
                                 <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${order.status === 'In Transit' ? 'bg-[#2D4D31]/10 text-[#2D4D31]' : 'bg-green-50 text-green-600'}`}>
                                    {order.status}
                                 </span>
                              </div>
                              <p className="text-[13px] text-gray-400 font-medium">{order.date} • {order.items} items</p>
                           </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-0 border-gray-50">
                           <div className="text-right">
                              <p className="text-[16px] font-black text-gray-900">{order.total}</p>
                              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-tighter">Paid via Card</p>
                           </div>
                           <Link 
                             href={`/orders/${order.id}`}
                             className="px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-[13px] hover:bg-gray-100 transition-all"
                           >
                              {order.status === 'In Transit' ? 'Track' : 'Details'}
                           </Link>
                        </div>
                     </div>
                   ))}
                </div>
             </section>

             {/* Farm Security / Trust */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-[#2D4D31]/5 rounded-[40px] border border-[#2D4D31]/10">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#2D4D31] mb-6">
                      <ShieldCheck size={24} weight="bold" />
                   </div>
                   <h3 className="text-[18px] font-black text-gray-900 mb-2">Verified Farmer</h3>
                   <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
                      Your account is verified. You have access to priority delivery and exclusive livestock medical insights.
                   </p>
                   <button className="text-[13px] font-black text-[#2D4D31] hover:underline">Manage Credentials</button>
                </div>

                <div className="p-8 bg-white rounded-[40px] border border-gray-100 flex flex-col justify-between">
                   <div>
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                            <Clock size={20} weight="bold" />
                         </div>
                         <h3 className="text-[16px] font-black text-gray-900">Security Log</h3>
                      </div>
                      <div className="space-y-4">
                         <div className="flex justify-between items-center text-[12px]">
                            <span className="text-gray-400">Last Login</span>
                            <span className="font-bold text-gray-900">Today, 8:42 AM</span>
                         </div>
                         <div className="flex justify-between items-center text-[12px]">
                            <span className="text-gray-400">IP Address</span>
                            <span className="font-bold text-gray-900">192.168.1.1</span>
                         </div>
                      </div>
                   </div>
                   <button className="mt-8 px-6 py-3 border border-gray-100 rounded-xl font-bold text-[13px] text-gray-500 hover:bg-gray-50 transition-all">
                      Change Password
                   </button>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
