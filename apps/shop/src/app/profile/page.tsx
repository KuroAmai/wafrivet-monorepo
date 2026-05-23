"use client";

import { Package, ShieldCheck, Clock } from "@phosphor-icons/react";
import Link from "next/link";
import { ApiQueryFeedback } from "@wafrivet/ui";
import {
  formatOrderDisplay,
  useShopperCommerceEnabled,
  useShopperOrders,
} from "@/hooks/useShopApi";
import { isRegularCustomerOnly } from "@/lib/shopperCapabilities";
import { useAuth } from "@wafrivet/auth";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";

export default function ProfilePage() {
  const { user } = useAuth();
  const profile = user as { roles?: string[]; role?: string } | null;
  const vetCommerce = useShopperCommerceEnabled();
  const customerOnly = isRegularCustomerOnly(profile?.roles, profile?.role);
  const { data: orders, isLoading, isError, error, refetch } = useShopperOrders({ limit: 5 });

  const recentOrders = (orders ?? []).slice(0, 3).map(formatOrderDisplay);

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Recent Orders</h2>
          <Link href="/profile/orders" className="text-[14px] font-black text-[#2D4D31] hover:underline">
            View All
          </Link>
        </div>

        {vetCommerce ? (
          <>
            <ApiQueryFeedback
              isLoading={isLoading}
              isError={isError}
              errorMessage={(error as Error)?.message}
              isEmpty={!isLoading && recentOrders.length === 0}
              emptyMessage="No orders yet. Browse the marketplace to place your first order."
              onRetry={() => void refetch()}
            />
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-[#2D4D31]/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        order.rawStatus === "OUT_FOR_DELIVERY"
                          ? "bg-[#2D4D31] text-white animate-pulse"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <Package size={28} weight="bold" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-gray-900 text-[16px]">Order #{order.label}</h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            order.rawStatus === "OUT_FOR_DELIVERY"
                              ? "bg-[#2D4D31]/10 text-[#2D4D31]"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-400 font-medium">
                        {order.date} • {order.items} supplier{order.items === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-0 border-gray-50">
                    <div className="text-right">
                      <p className="text-[16px] font-black text-gray-900">{order.total}</p>
                    </div>
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-[13px] hover:bg-gray-100 transition-all"
                    >
                      {order.rawStatus === "OUT_FOR_DELIVERY" ? "Track" : "Details"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 text-center space-y-4">
            <p className="text-[15px] text-gray-600 font-medium">
              {customerOnly
                ? "Online ordering for shopper accounts is coming soon. You can still browse products and save items."
                : "Sign in with a clinic account to place orders through the marketplace."}
            </p>
            {customerOnly ? (
              <a
                href={`${APP_URL}/onboarding`}
                className="inline-flex px-6 py-3 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] hover:bg-[#243f28]"
              >
                Register as a clinic
              </a>
            ) : null}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-8 bg-[#2D4D31]/5 rounded-[40px] border border-[#2D4D31]/10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#2D4D31] mb-6">
            <ShieldCheck size={24} weight="bold" />
          </div>
          <h3 className="text-[18px] font-black text-gray-900 mb-2">Verified products</h3>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
            Items on Wafrivet Shop are sourced from verified suppliers with quality checks.
          </p>
        </div>

        <div className="p-8 bg-white rounded-[40px] border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <Clock size={20} weight="bold" />
              </div>
              <h3 className="text-[16px] font-black text-gray-900">Account</h3>
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed">
              Manage security and roles from the main Wafrivet app.
            </p>
          </div>
          <a
            href={APP_URL}
            className="mt-8 px-6 py-3 border border-gray-100 rounded-xl font-bold text-[13px] text-gray-500 hover:bg-gray-50 transition-all text-center"
          >
            Open Wafrivet App
          </a>
        </div>
      </div>
    </div>
  );
}
