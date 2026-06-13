"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  DownloadSimple,
  Circle,
  Receipt,
  Warning,
  X,
} from "@phosphor-icons/react";
import type { OrderStatus } from "@wafrivet/types";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { cn } from "@/lib/utils";
import { useAdminOrders, useWarRoomSnapshot } from "@/hooks/useAdminApi";

const STATUS_OPTIONS: { label: string; value?: OrderStatus }[] = [
  { label: "All Status" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Cancelled", value: "CANCELLED" },
];

function formatStatus(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

function formatNgn(amount: number) {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`;
  }
  return `₦${amount.toLocaleString()}`;
}

export function AdminMarketplaceOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedPayment, setSelectedPayment] = useState("All Methods");
  const [cursor, setCursor] = useState<string | undefined>();

  const statusFilter = STATUS_OPTIONS.find((s) => s.label === selectedStatus)?.value;

  const { data: ordersResponse, isLoading, isError, error, refetch } = useAdminOrders({
    limit: 50,
    cursor,
    status: statusFilter,
  });

  const { data: snapshot } = useWarRoomSnapshot();

  const apiOrders = useMemo(
    () =>
      ordersResponse?.data?.map((o) => ({
        id: o.orderNumber ? `#${o.orderNumber}` : o.id.slice(0, 8),
        farmer: o.clinicName,
        chemist: o.supplierNames.length > 0 ? o.supplierNames.join(", ") : "—",
        items: o.itemCount,
        total: `₦${o.totalAmount.toLocaleString()}`,
        payment: o.paymentMethod ?? o.settlementStatus ?? "—",
        status: o.status,
        statusLabel: formatStatus(o.status),
        date: new Date(o.createdAt).toLocaleString(),
        stuck: o.routeOptimizationFailed,
      })) ?? [],
    [ordersResponse],
  );

  const filteredOrders = apiOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.farmer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.chemist.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPayment =
      selectedPayment === "All Methods" || order.payment === selectedPayment;

    return matchesSearch && matchesPayment;
  });

  const stuckCount = apiOrders.filter((o) => o.stuck).length;
  const breakdown = snapshot?.orderStatusBreakdown ?? {};
  const deliveredCount = breakdown.DELIVERED ?? 0;
  const pendingCount = (breakdown.PENDING ?? 0) + (breakdown.CONFIRMED ?? 0);
  const cancelledCount = breakdown.CANCELLED ?? 0;
  const todayVolume = snapshot?.todayOrderVolume ?? 0;
  const revenueToday = snapshot?.revenueCollectedToday ?? 0;
  const avgValue = todayVolume > 0 ? Math.round(revenueToday / todayVolume) : 0;

  const stats = [
    { label: "Orders Today", value: String(todayVolume) },
    { label: "Completed", value: String(deliveredCount) },
    { label: "Pending", value: String(pendingCount) },
    { label: "Cancelled", value: String(cancelledCount) },
    { label: "GMV Today", value: formatNgn(revenueToday) },
    { label: "Unrouted", value: String(snapshot?.unroutedOrders ?? 0) },
    { label: "Avg Value", value: avgValue > 0 ? formatNgn(avgValue) : "—" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            Marketplace Orders
          </h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Monitor and manage every transaction on the platform
          </p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Orders
        </button>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && apiOrders.length === 0}
        onRetry={() => refetch()}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-5 rounded-[28px] border border-gray-100 shadow-sm flex flex-col items-center text-center hover:border-[#2D4D31]/20 transition-all group"
          >
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">
              {stat.label}
            </span>
            <div className="text-[18px] font-black text-gray-900 leading-none group-hover:text-[#2D4D31] transition-colors">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {(stuckCount > 0 || (snapshot?.unroutedOrders ?? 0) > 0) && (
        <div className="bg-red-50 border border-red-100 p-8 rounded-[40px] flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-[20px] flex items-center justify-center text-red-500 shadow-sm animate-pulse">
              <Warning size={28} weight="fill" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-gray-900 leading-none mb-2 tracking-tight">
                Operational bottleneck detected
              </h3>
              <p className="text-[13px] text-gray-500 font-medium">
                {stuckCount > 0
                  ? `${stuckCount} order${stuckCount === 1 ? "" : "s"} failed route optimization.`
                  : `${snapshot?.unroutedOrders} unrouted orders need attention.`}
              </p>
            </div>
          </div>
          <button className="bg-[#2D4D31] text-white px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-lg shadow-[#2D4D31]/20 hover:bg-[#1a301e] transition-all">
            Resolve Bottleneck
          </button>
        </div>
      )}

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search Order ID, Clinic, or Supplier..."
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCursor(undefined);
            }}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>

          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            {["All Methods", "Wallet", "BNPL", "Card"].map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedStatus("All Status");
            setSelectedPayment("All Methods");
            setCursor(undefined);
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Order ID
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Parties (Clinic/Supplier)
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Details & Total
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Payment
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">
                  Timeline
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className={cn(
                    "group hover:bg-gray-50/30 transition-all",
                    order.stuck && "bg-red-50/30 hover:bg-red-50/50",
                  )}
                >
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0",
                          order.stuck ? "bg-red-500 text-white" : "bg-gray-100 text-[#2D4D31]",
                        )}
                      >
                        <Receipt size={16} weight="bold" />
                      </div>
                      <span className="text-[14px] font-black text-gray-900 tracking-tight whitespace-nowrap">
                        {order.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">
                        {order.farmer}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium truncate whitespace-nowrap">
                        via {order.chemist}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-[#2D4D31] leading-none mb-1 whitespace-nowrap">
                        {order.total}
                      </span>
                      <span className="text-[11px] text-gray-400 font-bold whitespace-nowrap">
                        {order.items} items
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-500 text-[9px] font-black uppercase tracking-wider border border-gray-100 whitespace-nowrap">
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Circle
                        size={8}
                        weight="fill"
                        className={cn(
                          order.status === "DELIVERED"
                            ? "text-emerald-500"
                            : order.status === "CANCELLED"
                              ? "text-red-500"
                              : order.stuck
                                ? "text-red-500 animate-pulse"
                                : "text-orange-500",
                        )}
                      />
                      <span
                        className={cn(
                          "text-[13px] font-bold whitespace-nowrap",
                          order.stuck ? "text-red-500" : "text-gray-600",
                        )}
                      >
                        {order.statusLabel}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className="text-[13px] font-bold text-gray-400 whitespace-nowrap">
                      {order.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            Showing {filteredOrders.length} orders
          </span>
          <div className="flex items-center gap-2">
            {cursor && (
              <button
                onClick={() => setCursor(undefined)}
                className="px-4 h-9 rounded-xl text-[13px] font-black text-gray-400 hover:bg-gray-50 transition-all"
              >
                First
              </button>
            )}
            {ordersResponse?.meta.hasNextPage && (
              <button
                onClick={() => setCursor(ordersResponse.meta.nextCursor ?? undefined)}
                className="px-4 h-9 rounded-xl text-[13px] font-black bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20 hover:bg-[#1a301e] transition-all"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
