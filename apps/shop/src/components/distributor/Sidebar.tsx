import Link from "next/link";
import { Network, Users, Truck, ChartLineUp, Handshake } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full text-slate-300">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="font-bold text-xl text-white tracking-tight">WAFRIVET Shop</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="text-xs font-semibold text-slate-500 mb-3 px-3 uppercase tracking-wider">Distributor Portal</div>
        <nav className="space-y-1">
          <Link href="/distributor" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg font-medium text-[14px]">
            <Network size={20} weight="fill" /> Network Overview
          </Link>
          <Link href="/distributor/chemists" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <Users size={20} /> Chemists
          </Link>
          <Link href="/distributor/orders" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <Truck size={20} /> Orders & Shipments
          </Link>
          <Link href="/distributor/insights" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <ChartLineUp size={20} /> Market Insights
          </Link>
          <Link href="/distributor/settlements" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <Handshake size={20} /> Settlements
          </Link>
        </nav>
      </div>
    </aside>
  );
}
