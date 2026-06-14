"use client";

import Link from "next/link";
import { Clock, MapPin } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useMemo } from "react";
import { formatMoneyDisplay, useSupplierOrders } from "@/hooks/useShopApi";

const ACTIVE_STATUSES = new Set(["PENDING", "CONFIRMED"]);

export function IncomingOrders() {
  const { data: apiOrders, isLoading, isError, error, refetch } = useSupplierOrders({ limit: 20 });

  const orders = useMemo(() => {
    const list = apiOrders ?? [];
    return list
      .filter((o) => ACTIVE_STATUSES.has(o.status.toUpperCase()))
      .slice(0, 10);
  }, [apiOrders]);

  return (
    <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[18px] font-black text-gray-900 tracking-tight">Orders</h2>
          {orders.length > 0 ? (
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          ) : null}
        </div>
        <Link
          href="/orders"
          className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline"
        >
          View all
        </Link>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
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
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-[18px] tracking-tight mb-1">
                      {order.customerName ?? "Customer"}
                    </h3>
                    <div className="flex items-center gap-4 text-[11px] text-gray-600 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />{" "}
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> #{order.orderNumber ?? order.orderId.slice(0, 8)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <p className="text-[20px] font-black text-[#2D4D31] tracking-tight">
                      {formatMoneyDisplay({ naira: String(order.subtotalAmount ?? 0) })}
                    </p>
                    <Link
                      href="/orders"
                      className="h-10 px-6 bg-[#2D4D31] text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all inline-flex items-center"
                    >
                      Manage
                    </Link>
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
