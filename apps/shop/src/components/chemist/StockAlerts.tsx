"use client";

import Link from "next/link";
import { ArrowRight, Package, TrendUp } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { countLowStockOffers, useSupplierOffers } from "@/hooks/useShopApi";

export function StockAlerts() {
  const { data: offers, isLoading, isError, error, refetch } = useSupplierOffers({ limit: 100 });
  const alerts = countLowStockOffers(offers ?? []).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden p-8">
        <h2 className="text-[18px] font-black text-gray-900 tracking-tight mb-6">Inventory Health</h2>

        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && alerts.length === 0}
          onRetry={() => refetch()}
        />

        {alerts.length > 0 ? (
          <div className="space-y-5">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <Package size={16} weight="duotone" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-gray-900 text-[13px] truncate">
                      {alert.skuName ?? alert.productName ?? "Product"}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      {alert.stockQuantity ?? 0} Units left
                    </p>
                  </div>
                </div>
                <Link
                  href="/inventory"
                  className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline shrink-0"
                >
                  Restock
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="bg-white/50 backdrop-blur-xl rounded-[40px] border border-gray-100 p-8">
        <div className="flex flex-col gap-4">
          <div className="w-10 h-10 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white">
            <TrendUp size={20} weight="bold" />
          </div>
          <div>
            <h4 className="font-black text-gray-900 text-[16px] tracking-tight mb-1">Stock Overview</h4>
            <p className="text-gray-500 text-[12px] font-medium leading-relaxed">
              {offers?.length
                ? `${offers.length} active SKUs · ${alerts.length} need attention`
                : "Add inventory to start tracking stock levels."}
            </p>
          </div>
          <Link
            href="/insights"
            className="flex items-center gap-1.5 text-[11px] font-black text-[#2D4D31] uppercase tracking-widest"
          >
            View Insights <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
