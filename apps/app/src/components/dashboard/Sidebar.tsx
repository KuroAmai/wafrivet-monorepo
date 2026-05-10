import Link from "next/link";
import { House, Wallet, Bell, User } from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="font-bold text-xl text-[#2D4D31] tracking-tight">WAFRIVET</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 bg-[#f0f4f0] text-[#2D4D31] rounded-lg font-medium text-[14px]">
            <House size={20} weight="fill" /> Dashboard
          </Link>
          <Link href="/wallet" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <Wallet size={20} /> Wallet
          </Link>
          <Link href="/notifications" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <Bell size={20} /> Notifications
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg font-medium text-[14px] transition-colors">
            <User size={20} /> Profile
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/logout"
          className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium text-[14px] transition-colors"
        >
          Sign out
        </Link>
      </div>
    </aside>
  );
}
