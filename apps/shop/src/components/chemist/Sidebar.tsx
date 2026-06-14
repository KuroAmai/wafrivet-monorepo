"use client";

import {
  SquaresFour,
  Package,
  ShoppingCart,
  TrendUp,
  ChartPieSlice,
  Gear,
  Question,
  SignOut,
  CaretRight,
} from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logoutClient } from "@wafrivet/auth";
import { useSupplierOrders, useSupplierProfile } from "@/hooks/useShopApi";

export function Sidebar() {
  const pathname = usePathname();
  const { data: profile } = useSupplierProfile();
  const { data: orders } = useSupplierOrders({ limit: 100 });

  const branchName = (profile as { name?: string } | undefined)?.name ?? "Your Branch";
  const orderCount = orders?.length ?? 0;
  const branchId = (profile as { id?: string } | undefined)?.id?.slice(0, 8).toUpperCase() ?? "—";

  const navItems = [
    { icon: SquaresFour, label: "Overview", href: "/dashboard", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: Package, label: "Inventory", href: "/inventory", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: ShoppingCart, label: "Orders", href: "/orders", color: "text-orange-500", bg: "bg-orange-50" },
    { icon: TrendUp, label: "Earnings", href: "/earnings", color: "text-purple-500", bg: "bg-purple-50" },
    { icon: ChartPieSlice, label: "Insights", href: "/insights", color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <aside className="w-full flex flex-col gap-6">
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center transition-all hover:border-[#2D4D31]/20">
        <div className="relative mb-6">
          <img
            src={
              profile?.logoUrl
                ? profile.logoUrl
                : `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(branchName)}&backgroundColor=b6e3f4`
            }
            className="w-24 h-24 rounded-[32px] border-4 border-white shadow-xl shadow-gray-200/50 object-cover"
            alt="Branch"
          />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#2D4D31] rounded-xl flex items-center justify-center text-white border-2 border-white">
            <SquaresFour size={16} weight="fill" />
          </div>
        </div>
        <h1 className="text-[20px] font-black text-gray-900 tracking-tight mb-1">{branchName}</h1>
        <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-6">
          Branch · {branchId}
        </p>

        <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-50">
          <div className="text-center">
            <p className="text-[16px] font-black text-gray-900">{orderCount}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Orders</p>
          </div>
          <div className="text-center border-l border-gray-50">
            <p className="text-[16px] font-black text-gray-900">
              {(profile as { status?: string } | undefined)?.status ?? "—"}
            </p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          {navItems.map((item, i) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" && pathname.startsWith("/dashboard"));
            return (
              <Link
                key={i}
                href={item.href}
                className={`w-full flex items-center justify-between p-5 transition-all border-b border-gray-50 last:border-0 group ${
                  isActive ? "bg-gray-50" : "hover:bg-gray-50/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <item.icon size={20} weight={isActive ? "fill" : "bold"} />
                  </div>
                  <span
                    className={`font-bold transition-colors ${
                      isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <CaretRight
                  size={18}
                  weight="bold"
                  className={`transition-all ${
                    isActive
                      ? "text-gray-900 translate-x-1"
                      : "text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <Link
            href="/settings"
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all border-b border-gray-50 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:text-gray-900">
                <Gear size={20} weight="bold" />
              </div>
              <span className="font-bold text-gray-600 group-hover:text-gray-900">Settings</span>
            </div>
            <CaretRight
              size={18}
              weight="bold"
              className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
            />
          </Link>
          <Link
            href="/support"
            className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:text-gray-900">
                <Question size={20} weight="bold" />
              </div>
              <span className="font-bold text-gray-600 group-hover:text-gray-900">Support</span>
            </div>
            <CaretRight
              size={18}
              weight="bold"
              className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all"
            />
          </Link>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/auth/logout", {
              method: "POST",
              credentials: "same-origin",
            }).catch(() => undefined);
            logoutClient("/login");
          }}
          className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 text-red-600 rounded-[32px] font-black text-[15px] hover:bg-red-100 transition-all active:scale-[0.98]"
        >
          <SignOut size={20} weight="bold" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
