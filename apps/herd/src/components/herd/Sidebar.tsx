import Link from "next/link";
import { House, List, Crosshair, Plus, ChartLineUp } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#2D4D31] flex flex-col h-full text-white">
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <span className="font-bold text-xl tracking-tight">WAFRIVET Herd</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 bg-white/10 rounded-lg font-medium text-[14px]">
            <House size={20} weight="fill" /> Home
          </Link>
          <Link href="/animals" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <List size={20} /> My Herd
          </Link>
          <Link href="/diagnose" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <Crosshair size={20} /> AI Diagnosis
          </Link>
          <Link href="/monitor" className="flex items-center gap-3 px-3 py-2.5 text-white/70 hover:bg-white/5 hover:text-white rounded-lg font-medium text-[14px] transition-colors">
            <ChartLineUp size={20} /> Monitoring
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-white/10">
        <Link href="/animals/add" className="w-full flex items-center justify-center gap-2 bg-[#F2C94C] text-[#2D4D31] py-3 rounded-lg font-bold text-[14px] hover:bg-[#e6be45] transition-colors">
          <Plus size={18} weight="bold" /> Add Animal
        </Link>
      </div>
    </aside>
  );
}
