import { Bell } from "@phosphor-icons/react/dist/ssr";

export function TopBar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div>
        {/* Breadcrumb or Title could go here */}
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
          <Bell size={22} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#f0f4f0] text-[#2D4D31] flex items-center justify-center font-semibold text-[13px]">
            EO
          </div>
        </div>
      </div>
    </header>
  );
}
