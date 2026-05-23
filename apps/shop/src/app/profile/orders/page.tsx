"use client";

import { Package } from "@phosphor-icons/react";
import Link from "next/link";
import { ApiQueryFeedback } from "@wafrivet/ui";
import {
  formatOrderDisplay,
  useShopperCommerceEnabled,
  useShopperOrders,
} from "@/hooks/useShopApi";

export default function ProfileOrdersListPage() {
  const vetCommerce = useShopperCommerceEnabled();
  const { data: orders, isLoading, isError, error, refetch } = useShopperOrders({ limit: 50 });
  const rows = (orders ?? []).map(formatOrderDisplay);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-[22px] font-black text-gray-900 tracking-tight px-2">Your Orders</h1>
      {!vetCommerce ? (
        <div className="bg-white p-10 rounded-[32px] border border-gray-100 text-center text-gray-500 font-medium">
          Orders are available for clinic accounts with marketplace access.
        </div>
      ) : (
        <>
          <ApiQueryFeedback
            isLoading={isLoading}
            isError={isError}
            errorMessage={(error as Error)?.message}
            isEmpty={!isLoading && rows.length === 0}
            emptyMessage="No orders yet."
            onRetry={() => void refetch()}
          />
          <div className="space-y-4">
            {rows.map((order) => (
              <Link
                key={order.id}
                href={`/profile/orders/${order.id}`}
                className="block bg-white p-6 rounded-[28px] border border-gray-100 hover:border-[#2D4D31]/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                    <Package size={24} weight="bold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-gray-900">#{order.label}</p>
                    <p className="text-[13px] text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-[#2D4D31]">{order.total}</p>
                    <p className="text-[12px] font-bold text-gray-500">{order.status}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
