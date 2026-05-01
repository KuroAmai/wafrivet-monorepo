"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { 
  Package, 
  MapPin, 
  Clock, 
  ChatCircleDots, 
  CaretRight,
  SealCheck,
  Phone,
  Question
} from "@phosphor-icons/react";
import Link from "next/link";

export default function OrderTrackingPage() {
  const status = "In Transit";
  const steps = [
    { name: "Placed", time: "10:30 AM", completed: true },
    { name: "Confirmed", time: "10:35 AM", completed: true },
    { name: "Packed", time: "11:05 AM", completed: true },
    { name: "In Transit", time: "11:20 AM", completed: true },
    { name: "Delivered", time: "--:--", completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
           <div>
              <h1 className="text-[24px] font-black text-gray-900 tracking-tight">Order #WF-9281</h1>
              <p className="text-[14px] text-gray-500 font-medium">Expected delivery: 2:30 PM Today</p>
           </div>
           <span className="px-4 py-2 bg-[#2D4D31]/10 text-[#2D4D31] rounded-xl text-[13px] font-black uppercase tracking-wider">
              {status}
           </span>
        </div>

        {/* Live Map Section */}
        <div className="w-full h-[400px] bg-gray-200 rounded-[40px] overflow-hidden mb-10 relative border border-white shadow-xl shadow-gray-200/50">
           {/* Mock Map Background */}
           <img 
             src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
             className="w-full h-full object-cover" 
             alt="Map" 
           />
           {/* Rider Marker */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                 <div className="w-12 h-12 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white shadow-2xl animate-bounce">
                    <Package size={24} weight="bold" />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm"></div>
              </div>
           </div>
           {/* Map Overlays */}
           <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl flex items-center gap-4 pointer-events-auto">
                 <img 
                   src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rider&backgroundColor=b6e3f4" 
                   className="w-10 h-10 rounded-xl" 
                   alt="Rider" 
                 />
                 <div>
                    <h4 className="text-[13px] font-bold text-gray-900">Abubakar S.</h4>
                    <p className="text-[11px] text-gray-500 font-medium">Wafrivet Delivery Partner</p>
                 </div>
                 <div className="flex gap-2 ml-2">
                    <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-[#2D4D31] transition-colors">
                       <Phone size={18} weight="bold" />
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Status Stepper */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm mb-10">
           <div className="flex justify-between relative">
              {/* Stepper Line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 -z-0">
                 <div className="h-full bg-[#2D4D31] w-3/4"></div>
              </div>
              
              {steps.map((step, i) => (
                <div key={step.name} className="flex flex-col items-center gap-3 relative z-10">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.completed ? 'bg-[#2D4D31] text-white' : 'bg-gray-100 text-gray-300'}`}>
                      <SealCheck size={14} weight="bold" />
                   </div>
                   <div className="text-center">
                      <p className={`text-[12px] font-black uppercase tracking-wider ${step.completed ? 'text-[#2D4D31]' : 'text-gray-300'}`}>{step.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{step.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Order Details & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Items List */}
           <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <h3 className="text-[18px] font-black text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-6">
                 {[
                   { name: "Oxytetracycline 20%", qty: 1, price: "₦6,500" },
                   { name: "Digital Ear Tags (x50)", qty: 2, price: "₦36,000" },
                 ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                             <Package size={20} />
                          </div>
                          <div>
                             <p className="text-[14px] font-bold text-gray-900">{item.name}</p>
                             <p className="text-[12px] text-gray-400 font-medium">Qty: {item.qty}</p>
                          </div>
                       </div>
                       <span className="text-[14px] font-black text-gray-900">{item.price}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                 <span className="text-gray-500 font-medium">Total Paid</span>
                 <span className="text-[20px] font-black text-[#2D4D31]">₦42,500</span>
              </div>
           </div>

           {/* Chemist & Help */}
           <div className="space-y-6">
              <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31]">
                       <SealCheck size={28} weight="fill" />
                    </div>
                    <div>
                       <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Fulfilled by</p>
                       <p className="text-[15px] font-bold text-gray-900">Health First Agro</p>
                    </div>
                 </div>
                 <button className="p-3 bg-gray-50 rounded-xl text-[#2D4D31]">
                    <ChatCircleDots size={20} weight="bold" />
                 </button>
              </div>

              <button className="w-full p-6 bg-white rounded-[32px] border border-gray-100 flex items-center justify-between group hover:border-[#2D4D31]/10 transition-all">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] transition-colors">
                       <Question size={20} weight="bold" />
                    </div>
                    <span className="font-bold text-gray-900">Need help with this order?</span>
                 </div>
                 <CaretRight size={20} weight="bold" className="text-gray-300 group-hover:text-gray-900 transition-colors" />
              </button>
           </div>
        </div>
      </main>
    </div>
  );
}
