"use client";

import { Check, X, Clock, MapPin } from "@phosphor-icons/react";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useMemo, useState } from "react";
import { useVetOrders } from "@/hooks/useShopApi";

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: string;
  location: string;
  time: string;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "WF-9281",
    customer: "John Doe",
    items: ["Oxytetracycline 20%", "Digital Ear Tags"],
    total: "₦24,500",
    location: "Lekki",
    time: "2m ago",
  },
  {
    id: "WF-9282",
    customer: "Musa Ibrahim",
    items: ["Multivitamin Injection"],
    total: "₦3,800",
    location: "Ikeja",
    time: "15m ago",
  },
];

export function IncomingOrders() {
  const { data: apiOrders, isLoading, isError, error, refetch } = useVetOrders();
  const [removed, setRemoved] = useState<string[]>([]);

  const orders = useMemo(() => {
    const mapped: Order[] = (apiOrders as Array<Record<string, unknown>>)?.map((o) => ({
      id: String(o.id ?? o.orderNumber ?? ""),
      customer: String(o.clinicName ?? o.customer ?? "Customer"),
      items: [],
      total: o.totalAmount != null ? `₦${Number(o.totalAmount).toLocaleString()}` : "—",
      location: "—",
      time: o.createdAt ? new Date(String(o.createdAt)).toLocaleString() : "—",
    })) ?? [];

    const source =
      mapped.length > 0 ? mapped : isError && isMockDataEnabled() ? MOCK_ORDERS : mapped;

    return source.filter((o) => !removed.includes(o.id));
  }, [apiOrders, isError, removed]);

  const handleAction = (id: string) => {
    setRemoved((prev) => [...prev, id]);
  };

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center gap-3">
        <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Orders</h2>
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError && !isMockDataEnabled()}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && orders.length === 0}
        onRetry={() => refetch()}
        className="mx-8"
      />

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {orders.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {orders.map((order) => (
              <div key={order.id} className="p-8 hover:bg-gray-50/50 transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-gray-900 text-[18px] tracking-tight mb-1">
                      {order.customer}
                    </h3>
                    <div className="flex items-center gap-4 text-[11px] text-gray-600 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {order.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {order.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="text-[20px] font-black text-[#2D4D31] tracking-tight">
                      {order.total}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(order.id)}
                        className="h-10 px-6 bg-[#2D4D31] text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(order.id)}
                        className="w-10 h-10 border border-gray-100 text-gray-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                      >
                        <X size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
