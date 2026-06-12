"use client";

import { ShoppingCart, Clock, Package } from "@phosphor-icons/react";
import { useState, useMemo } from "react";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useSupplierOrders } from "@/hooks/useShopApi";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");
  const { data: orders, isLoading, isError, error, refetch } = useSupplierOrders({ limit: 50 });

  const filtered = useMemo(() => {
    const list = orders ?? [];
    if (activeTab === "All") return list;
    return list.filter((o) => o.status.toUpperCase().includes(activeTab.toUpperCase()));
  }, [orders, activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Order History</h1>
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Incoming sub-orders for your supplier account
        </p>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError && !isMockDataEnabled()}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && filtered.length === 0}
        onRetry={() => refetch()}
      />

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-8 border-b border-gray-50 flex items-center gap-8 overflow-x-auto no-scrollbar">
          {["All", "PENDING", "PROCESSING", "DELIVERED"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`py-6 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                activeTab === tab ? "text-[#2D4D31]" : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {tab}
              {activeTab === tab ? (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D4D31] rounded-t-full" />
              ) : null}
            </button>
          ))}
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map((order) => (
            <div key={order.id} className="p-8 flex items-center justify-between hover:bg-gray-50/30 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#2D4D31]/5 rounded-2xl flex items-center justify-center text-[#2D4D31]">
                  <ShoppingCart size={22} weight="duotone" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-[15px]">
                    #{order.orderNumber ?? order.orderId.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-[12px] text-gray-400 font-medium">
                    {order.customerName ?? "Customer"} · {order.itemCount ?? 0} items
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900">₦{Number(order.subtotalAmount).toLocaleString()}</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-end">
                  <Clock size={12} /> {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!isLoading && filtered.length === 0 && !isError ? (
          <div className="p-16 text-center text-gray-400">
            <Package size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm font-medium">No supplier orders yet</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
