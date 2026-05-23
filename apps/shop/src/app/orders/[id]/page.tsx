"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { Package, SealCheck, CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { mapOrderStatusLabel, useShopperOrder } from "@/hooks/useShopApi";

const STATUS_STEPS = ["PENDING", "CONFIRMED", "PROCESSING", "OUT_FOR_DELIVERY", "DELIVERED"];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = String(params.id ?? "");
  const { data: order, isLoading, isError, error, refetch } = useShopperOrder(orderId);

  const o = order as Record<string, unknown> | undefined;
  const status = String(o?.status ?? "PENDING");
  const statusLabel = mapOrderStatusLabel(status);
  const orderNumber = String(o?.orderNumber ?? orderId.slice(0, 8).toUpperCase());
  const total = o?.totalAmount != null ? `₦${Number(o.totalAmount).toLocaleString()}` : "—";
  const statusIndex = STATUS_STEPS.indexOf(status.toUpperCase());

  const groups = (o?.supplierGroups as Array<Record<string, unknown>>) ?? [];
  const lineItems = groups.flatMap((g) =>
    ((g.items as Array<Record<string, unknown>>) ?? []).map((item) => ({
      name: String(item.productName ?? "Item"),
      qty: Number(item.quantity ?? 1),
      price: `₦${Number(item.lineSubtotal ?? item.unitPrice ?? 0).toLocaleString()}`,
    })),
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-6 pb-20">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6"
        >
          <CaretLeft size={18} weight="bold" />
          <span className="font-bold text-[14px]">Back to profile</span>
        </Link>

        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !o}
          emptyMessage="Order not found"
          onRetry={() => void refetch()}
        />

        {o ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-[24px] font-black text-gray-900 tracking-tight">Order #{orderNumber}</h1>
                <p className="text-[14px] text-gray-500 font-medium">
                  {o.submittedAt
                    ? `Submitted ${new Date(String(o.submittedAt)).toLocaleString()}`
                    : ""}
                </p>
              </div>
              <span className="px-4 py-2 bg-[#2D4D31]/10 text-[#2D4D31] rounded-xl text-[13px] font-black uppercase tracking-wider">
                {statusLabel}
              </span>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm mb-10">
              <div className="flex justify-between relative">
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-100">
                  <div
                    className="h-full bg-[#2D4D31] transition-all"
                    style={{
                      width: `${Math.max(0, ((statusIndex + 1) / STATUS_STEPS.length) * 100)}%`,
                    }}
                  />
                </div>
                {STATUS_STEPS.map((step, i) => {
                  const completed = i <= statusIndex;
                  return (
                    <div key={step} className="flex flex-col items-center gap-3 relative z-10">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                          completed ? "bg-[#2D4D31] text-white" : "bg-gray-100 text-gray-300"
                        }`}
                      >
                        <SealCheck size={14} weight="bold" />
                      </div>
                      <p
                        className={`text-[10px] font-black uppercase tracking-wider text-center max-w-[72px] ${
                          completed ? "text-[#2D4D31]" : "text-gray-300"
                        }`}
                      >
                        {mapOrderStatusLabel(step)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <h3 className="text-[18px] font-black text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-6">
                {lineItems.length === 0 ? (
                  <p className="text-gray-500 text-[14px]">No line items available</p>
                ) : (
                  lineItems.map((item) => (
                    <div key={`${item.name}-${item.qty}`} className="flex items-center justify-between">
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
                  ))
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-gray-500 font-medium">Total</span>
                <span className="text-[20px] font-black text-[#2D4D31]">{total}</span>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
