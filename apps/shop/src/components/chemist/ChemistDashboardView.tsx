"use client";

import Link from "next/link";
import { Plus, DownloadSimple } from "@phosphor-icons/react";
import { StatCard } from "./StatCard";
import { IncomingOrders } from "./IncomingOrders";
import { StockAlerts } from "./StockAlerts";
import {
  countLowStockOffers,
  formatMoneyDisplay,
  useSupplierOffers,
  useSupplierOrders,
  useSupplierProfile,
  useSupplierWallet,
} from "@/hooks/useShopApi";

export function ChemistDashboardView() {
  const { data: profile } = useSupplierProfile();
  const { data: orders } = useSupplierOrders({ limit: 100 });
  const { data: offers } = useSupplierOffers({ limit: 100 });
  const { data: wallet } = useSupplierWallet();

  const orderCount = orders?.length ?? 0;
  const lowStock = countLowStockOffers(offers ?? []);
  const branchName = (profile as { name?: string } | undefined)?.name ?? "Your Branch";
  const branchAddress = (profile as { address?: string } | undefined)?.address;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
            Operations Console
          </h1>
          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            {branchName}
            {branchAddress ? ` · ${branchAddress}` : ""} ·{" "}
            <span className="text-emerald-500">Online</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all"
          >
            <DownloadSimple size={16} weight="bold" /> Reports
          </button>
          <Link
            href="/inventory"
            className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10"
          >
            <Plus size={16} weight="bold" /> Add Inventory
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Volume" value={`${orderCount} Orders`} />
        <StatCard label="Revenue" value={formatMoneyDisplay(wallet?.totalEarned)} />
        <StatCard label="Risk" value={`${lowStock.length} Alerts`} />
        <StatCard label="Yield" value={formatMoneyDisplay(wallet?.pendingPayout)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <IncomingOrders />
        </div>
        <div className="lg:col-span-4">
          <StockAlerts />
        </div>
      </div>
    </div>
  );
}
