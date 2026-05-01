import Link from "next/link";
import { SquaresFour, Package, ShoppingCart, TrendUp, ChartPieSlice } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="font-bold text-xl text-purple-800 tracking-tight">WAFRIVET Shop</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-semibold text-gray-400 mb-3 px-3 uppercase tracking-wider">Chemist Portal</div>
        <nav className="space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-purple-50 text-purple-800 rounded-lg font-medium text-[14px]">
            <SquaresFour size={20} weight="fill" /> Overview
          </Link>
          <Link href="/dashboard/inventory" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <Package size={20} /> Inventory
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <ShoppingCart size={20} /> Orders
          </Link>
          <Link href="/dashboard/earnings" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <TrendUp size={20} /> Earnings
          </Link>
          <Link href="/dashboard/insights" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <ChartPieSlice size={20} /> Insights
          </Link>
        </nav>
      </div>
    </aside>
  );
}
