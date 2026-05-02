"use client";

import { ShoppingCart, MagnifyingGlass, Funnel, Clock, MapPin, Package, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

const ORDERS = [
  { id: "WF-9281", customer: "John Doe", total: "₦24,500", status: "Processing", items: 2, time: "2m ago", location: "Lekki" },
  { id: "WF-9282", customer: "Musa Ibrahim", total: "₦3,800", status: "New", items: 1, time: "15m ago", location: "Ikeja" },
  { id: "WF-9280", customer: "Sarah Smith", total: "₦12,000", status: "Completed", items: 3, time: "2h ago", location: "Victoria Island" },
  { id: "WF-9279", customer: "Ahmed Bello", total: "₦45,000", status: "Out for Delivery", items: 5, time: "3h ago", location: "Surulere" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Order History</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Track and manage all branch transactions</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="px-8 border-b border-gray-50 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {["All", "New", "Processing", "Shipping", "Completed"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-6 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-[#2D4D31]' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D4D31] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID, Customer..." 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-[14px] font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Funnel size={16} /> Filter
          </button>
        </div>

        {/* Order List */}
        <div className="divide-y divide-gray-50">
          {ORDERS.map((order) => (
            <div key={order.id} className="p-8 hover:bg-gray-50/30 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1 flex gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  order.status === 'New' ? 'bg-red-50 text-red-500' : 
                  order.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
                }`}>
                  <ShoppingCart size={28} weight="duotone" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-black text-gray-900 text-[18px] tracking-tight">{order.customer}</h3>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{order.id}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><Clock size={16} /> {order.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={16} /> {order.location}</span>
                    <span className="flex items-center gap-1.5"><Package size={16} /> {order.items} Items</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-[20px] font-black text-gray-900 tracking-tight leading-none mb-1">{order.total}</p>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'Completed' ? 'text-emerald-500' : 
                    order.status === 'New' ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                  <ArrowRight size={20} weight="bold" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
