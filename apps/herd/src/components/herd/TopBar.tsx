import { Bell, MagnifyingGlass } from "@phosphor-icons/react";

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by WAF ID..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[13px] outline-none focus:border-[#2D4D31] focus:bg-white transition-all w-64"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#f0f4f0] text-[#2D4D31] flex items-center justify-center font-semibold text-[13px]">
            FR
          </div>
        </div>
      </div>
    </header>
  );
}
