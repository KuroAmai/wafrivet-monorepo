"use client";

import { TrendUp, Package, ShoppingCart } from "@phosphor-icons/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import {
  countLowStockOffers,
  formatMoneyDisplay,
  useSupplierOffers,
  useSupplierOrders,
  useSupplierWallet,
} from "@/hooks/useShopApi";

export default function InsightsPage() {
  const { data: offers, isLoading: offersLoading, isError: offersError, error: offersErr, refetch: refetchOffers } =
    useSupplierOffers({ limit: 100 });
  const { data: orders, isLoading: ordersLoading, isError: ordersError, error: ordersErr, refetch: refetchOrders } =
    useSupplierOrders({ limit: 100 });
  const { data: wallet, isLoading: walletLoading, isError: walletError, error: walletErr, refetch: refetchWallet } =
    useSupplierWallet();

  const isLoading = offersLoading || ordersLoading || walletLoading;
  const isError = offersError || ordersError || walletError;
  const error = offersErr ?? ordersErr ?? walletErr;

  const lowStock = countLowStockOffers(offers ?? []);
  const activeSkus = (offers ?? []).filter((o) => o.isActive !== false).length;

  const categoryData = useMemo(() => {
    const healthy = Math.max(activeSkus - lowStock.length, 0);
    return [
      { name: "Healthy Stock", value: healthy || 1, color: "#2D4D31" },
      { name: "Low Stock", value: lowStock.length || 0, color: "#F59E0B" },
    ].filter((d) => d.value > 0);
  }, [activeSkus, lowStock.length]);

  const ordersByStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const order of orders ?? []) {
      const key = order.status.toUpperCase();
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  const topOffers = useMemo(() => {
    return [...(offers ?? [])]
      .sort((a, b) => Number(b.stockQuantity ?? 0) - Number(a.stockQuantity ?? 0))
      .slice(0, 3)
      .map((offer) => ({
        name: offer.skuName ?? offer.productName ?? "Product",
        stock: Number(offer.stockQuantity ?? 0),
        active: offer.isActive !== false,
      }));
  }, [offers]);

  const weeklyOrders = useMemo(() => {
    const now = new Date();
    let count = 0;
    for (const order of orders ?? []) {
      const created = new Date(order.createdAt);
      const diff = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      if (diff <= 7) count++;
    }
    return count;
  }, [orders]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
          Operational Insights
        </h1>
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Analytics from your live orders, inventory, and settlements
        </p>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        onRetry={() => {
          void refetchOffers();
          void refetchOrders();
          void refetchWallet();
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Orders (7d)
          </p>
          <p className="text-[24px] font-black text-gray-900">{weeklyOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Active SKUs
          </p>
          <p className="text-[24px] font-black text-gray-900">{activeSkus}</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
            Total Earned
          </p>
          <p className="text-[24px] font-black text-gray-900">
            {formatMoneyDisplay(wallet?.totalEarned)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col items-center">
          <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8 w-full text-left">
            Inventory Health
          </h3>
          {categoryData.length > 0 ? (
            <>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={-15}
                      strokeWidth={0}
                      cornerRadius={12}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full mt-8">
                {categoryData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-400 text-sm py-12">No inventory data yet</p>
          )}
        </div>

        <div className="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight">
              Orders by Status
            </h3>
            <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-2 rounded-xl text-[12px] font-bold">
              <TrendUp size={16} weight="bold" /> {orders?.length ?? 0} total
            </div>
          </div>

          {ordersByStatus.length > 0 ? (
            <div className="space-y-4">
              {ordersByStatus.map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-[#2D4D31]" />
                    <span className="font-bold text-gray-900 text-[14px]">{status}</span>
                  </div>
                  <span className="text-[14px] font-black text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm py-8">No orders to analyze yet</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
        <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">
          Top Inventory by Stock Level
        </h3>
        {topOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topOffers.map((product) => (
              <div
                key={product.name}
                className="p-6 bg-gray-50 rounded-[32px] border border-gray-50 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31] shadow-sm">
                    <Package size={22} weight="duotone" />
                  </div>
                  <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">
                    {product.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">{product.name}</h4>
                  <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">
                    {product.stock} units in stock
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Add inventory to see product insights</p>
        )}
      </div>
    </div>
  );
}
