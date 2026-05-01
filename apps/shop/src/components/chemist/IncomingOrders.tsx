"use client";

import { Check, X, Clock, MapPin, Package } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: string;
  location: string;
  time: string;
  isNew?: boolean;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "WF-9281",
    customer: "John Doe",
    items: ["Oxytetracycline 20%", "Digital Ear Tags"],
    total: "₦24,500",
    location: "Lekki, Lagos",
    time: "2 mins ago",
    isNew: true
  },
  {
    id: "WF-9282",
    customer: "Musa Ibrahim",
    items: ["Multivitamin Injection"],
    total: "₦3,800",
    location: "Ikeja, Lagos",
    time: "15 mins ago"
  }
];

export function IncomingOrders() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  useEffect(() => {
    // Simulate a "heartbeat" sound or notification trigger for new orders
    if (orders.some(o => o.isNew)) {
      console.log("🔔 [Sound Cue] New incoming order detected!");
    }
  }, [orders]);

  const handleAccept = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    // Simulate notification/sound
    console.log("Accepted order", id);
  };

  const handleReject = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    console.log("Rejected order", id);
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-[18px] font-black text-gray-900 tracking-tight flex items-center gap-2">
          Incoming Orders
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </h2>
        <span className="text-xs font-bold text-[#2D4D31] bg-[#2D4D31]/5 px-3 py-1 rounded-full uppercase tracking-wider">
          Live Updates
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`p-6 transition-all relative ${order.isNew ? 'bg-[#2D4D31]/[0.02] border-l-4 border-l-[#2D4D31]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-[16px] mb-0.5">{order.customer}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                      <span className="flex items-center gap-1"><Clock size={14} /> {order.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={14} /> {order.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#2D4D31] text-[16px]">{order.total}</p>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{order.id}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gray-50 rounded-lg text-[12px] font-bold text-gray-600 flex items-center gap-1.5">
                      <Package size={14} className="text-gray-300" /> {item}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAccept(order.id)}
                    className="flex items-center justify-center gap-2 py-4 bg-[#2D4D31] text-white rounded-2xl font-bold text-[14px] hover:bg-[#243f28] active:scale-[0.98] transition-all shadow-lg shadow-[#2D4D31]/10"
                  >
                    <Check size={20} weight="bold" /> Accept Order
                  </button>
                  <button 
                    onClick={() => handleReject(order.id)}
                    className="flex items-center justify-center gap-2 py-4 bg-white border border-red-100 text-red-500 rounded-2xl font-bold text-[14px] hover:bg-red-50 active:scale-[0.98] transition-all"
                  >
                    <X size={20} weight="bold" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <Package size={32} weight="duotone" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">No pending orders</h3>
            <p className="text-sm text-gray-400">Everything is up to date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
