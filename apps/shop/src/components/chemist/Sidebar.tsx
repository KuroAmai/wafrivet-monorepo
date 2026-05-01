import Link from "next/link";
import { 
  SquaresFour, 
  Package, 
  ShoppingCart, 
  TrendUp, 
  ChartPieSlice,
  Gear,
  Question,
  SignOut
} from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
      <div className="h-20 flex items-center px-8 border-b border-gray-50">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo-mark.svg" alt="Wafrivet" className="h-8 w-auto" />
          <div className="flex flex-col">
            <span className="font-black text-[16px] text-gray-900 leading-none tracking-tight">WAFRIVET</span>
            <span className="text-[10px] font-bold text-[#2D4D31] uppercase tracking-widest mt-1">Shop Admin</span>
          </div>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-8 px-4 no-scrollbar">
        <div className="text-[10px] font-black text-gray-300 mb-6 px-4 uppercase tracking-[0.2em]">Main Menu</div>
        <nav className="space-y-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3.5 bg-[#2D4D31]/5 text-[#2D4D31] rounded-2xl font-bold text-[14px] transition-all">
            <SquaresFour size={22} weight="fill" /> Overview
          </Link>
          <Link href="/inventory" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
            <Package size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Inventory
          </Link>
          <Link href="/orders" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
            <ShoppingCart size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Orders
          </Link>
          <Link href="/earnings" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
            <TrendUp size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Earnings
          </Link>
          <Link href="/insights" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
            <ChartPieSlice size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Insights
          </Link>
        </nav>

        <div className="mt-12 pt-8 border-t border-gray-50">
          <div className="text-[10px] font-black text-gray-300 mb-6 px-4 uppercase tracking-[0.2em]">System</div>
          <nav className="space-y-2">
            <Link href="/settings" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
              <Gear size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Settings
            </Link>
            <Link href="/support" className="flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-2xl font-bold text-[14px] transition-all group">
              <Question size={22} className="text-gray-300 group-hover:text-[#2D4D31]" /> Support
            </Link>
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-4 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-2xl font-bold text-[14px] transition-all">
          <SignOut size={22} weight="bold" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
