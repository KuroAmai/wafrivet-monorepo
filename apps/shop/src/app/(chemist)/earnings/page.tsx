"use client";

import {
  TrendUp,
  Calendar,
  ArrowRight,
  DownloadSimple,
  CreditCard,
  Bank,
} from "@phosphor-icons/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useMemo } from "react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { formatMoneyDisplay, useSupplierWallet } from "@/hooks/useShopApi";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildWeeklyChart(settlements: { createdAt: string; netAmount?: { naira?: string } }[]) {
  const now = new Date();
  const days: { day: string; amount: number; index: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({ day: DAY_LABELS[d.getDay()], amount: 0, index: d.getDay() });
  }

  for (const settlement of settlements) {
    const created = new Date(settlement.createdAt);
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays <= 6) {
      const slot = days[6 - diffDays];
      if (slot) {
        slot.amount += Number(settlement.netAmount?.naira ?? 0);
      }
    }
  }

  return days.map(({ day, amount }) => ({ day, amount }));
}

function formatDateRange(): string {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${fmt(start)} - ${fmt(end)}`;
}

export default function EarningsPage() {
  const { data: wallet, isLoading, isError, error, refetch } = useSupplierWallet({ limit: 50 });

  const chartData = useMemo(
    () => buildWeeklyChart(wallet?.settlements ?? []),
    [wallet?.settlements],
  );
  const maxIndex = chartData.reduce(
    (max, entry, index) => (entry.amount > (chartData[max]?.amount ?? 0) ? index : max),
    0,
  );
  const payouts = wallet?.settlements ?? [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
            Earnings & Payouts
          </h1>
          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            Manage your branch revenue and financial status
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 cursor-not-allowed"
          >
            <DownloadSimple size={16} weight="bold" /> Statement
          </button>
        </div>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        onRetry={() => refetch()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">
                Revenue Overview
              </h3>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mt-1">
                Settlement activity (last 7 days)
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
              <Calendar size={16} className="text-[#2D4D31]" />
              <span className="text-[12px] font-bold text-gray-600">{formatDateRange()}</span>
            </div>
          </div>

          <div className="h-[300px] w-full">
            {chartData.some((d) => d.amount > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F9FAFB" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9CA3AF", fontSize: 10, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "#F9FAFB" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-900 text-white p-3 rounded-2xl text-[12px] font-black shadow-xl">
                            ₦{Number(payload[0].value ?? 0).toLocaleString()}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === maxIndex ? "#2D4D31" : "#F3F4F6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                No settlement activity in the last 7 days
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#2D4D31] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl shadow-[#2D4D31]/20">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 mb-4">
              Available for Payout
            </h4>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-[32px] font-black tracking-tight leading-none">
                {formatMoneyDisplay(wallet?.pendingPayout)}
              </span>
              <span className="text-[14px] font-bold text-emerald-300 opacity-80 mb-1 flex items-center gap-1">
                <TrendUp size={14} weight="bold" /> {wallet?.totalOrdersFulfilled ?? 0} fulfilled
              </span>
            </div>
            <button
              type="button"
              disabled
              className="w-full py-4 bg-white/20 text-white/70 rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-not-allowed"
            >
              Withdraw Soon <ArrowRight size={18} weight="bold" />
            </button>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                <Bank size={24} weight="duotone" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-[14px]">Total Earned</h4>
                <p className="text-[11px] text-gray-600 font-bold uppercase">
                  {formatMoneyDisplay(wallet?.totalEarned)} paid out
                </p>
              </div>
            </div>
            <a
              href="/support"
              className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline"
            >
              Contact support to update bank details
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
          <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Payout History</h3>
        </div>
        {payouts.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {payouts.map((payout) => (
              <div
                key={payout.settlementId}
                className="p-8 flex items-center justify-between hover:bg-gray-50/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                    <CreditCard size={24} weight="duotone" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-gray-900 text-[16px] tracking-tight">
                        {formatMoneyDisplay(payout.netAmount)}
                      </h4>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                        {payout.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-bold uppercase tracking-wider">
                      {new Date(payout.createdAt).toLocaleDateString()} · Order #
                      {payout.orderNumber}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center text-gray-400 text-sm">No settlements yet</div>
        )}
      </div>
    </div>
  );
}
