"use client";

import { 
  Package, 
  ShieldCheck, 
  Clock
} from "@phosphor-icons/react";
import Link from "next/link";

export default function ProfilePage() {
  const orders = [
    { id: "WF-9281", date: "Today, 10:30 AM", status: "In Transit", total: "₦42,500", items: 2 },
    { id: "WF-8912", date: "24 Apr 2026", status: "Delivered", total: "₦12,800", items: 1 },
    { id: "WF-8704", date: "12 Apr 2026", status: "Delivered", total: "₦65,000", items: 5 },
  ];

  return (
    <div className="space-y-10">
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
  );
}
