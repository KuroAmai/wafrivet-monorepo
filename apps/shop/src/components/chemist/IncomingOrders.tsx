"use client";

import { Check, X, Clock, MapPin, Package, CaretRight } from "@phosphor-icons/react";
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
    if (orders.some(o => o.isNew)) {
      console.log("🔔 [Sound Cue] New incoming order detected!");
    }
  }, [orders]);

  const handleAccept = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const handleReject = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Incoming Orders</h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Live
          </div>
        </div>
        <button className="text-[11px] font-black text-gray-300 uppercase tracking-widest hover:text-gray-900 transition-colors">
          History
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`p-8 transition-all group hover:bg-gray-50/50 ${order.isNew ? 'bg-[#2D4D31]/[0.02]' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-gray-900 text-[18px] tracking-tight">{order.customer}</h3>
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{order.id}</span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1.5"><Clock size={16} /> {order.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={16} /> {order.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-[12px] font-bold text-gray-600 shadow-sm">
                          <Package size={14} className="text-gray-300" /> {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4 min-w-[200px]">
                    <div className="text-right">
                      <p className="text-[22px] font-black text-[#2D4D31] tracking-tight leading-none mb-1">{order.total}</p>
                      <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Total Value</p>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                      <button 
                        onClick={() => handleAccept(order.id)}
                        className="flex-1 h-12 bg-[#2D4D31] text-white rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#243f28] active:scale-[0.98] transition-all shadow-lg shadow-[#2D4D31]/20"
                      >
                        Accept <Check size={18} weight="bold" />
                      </button>
                      <button 
                        onClick={() => handleReject(order.id)}
                        className="w-12 h-12 bg-white border border-gray-100 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                      >
                        <X size={18} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-200 mb-6">
              <Package size={40} weight="duotone" />
            </div>
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-2">No pending orders</h3>
            <p className="text-[14px] text-gray-400 font-medium">Sit back and relax, your operations are current.</p>
          </div>
        )}
      </div>
    </div>
  );
}
