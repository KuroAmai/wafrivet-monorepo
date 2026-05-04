import { MagnifyingGlass, ClockCounterClockwise, Cow, Horse, Tag, IdentificationBadge, Warning } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RECENT_SEARCHES = [
  { id: "WAF-882", name: "Bella", type: "Bovine", icon: Cow },
  { id: "WAF-901", name: "Luna", type: "Ovine", icon: Tag },
  { id: "WAF-773", name: "Max", type: "Bovine", icon: Cow },
  { id: "WAF-112", name: "Daisy", type: "Equine", icon: Horse },
];

export default function Dashboard() {
  return (
    <div className="space-y-10 py-6 animate-in fade-in duration-700 pb-32">
      {/* Personalized Greeting */}
      <div className="space-y-1">
        <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
          Good Evening, <br />
          <span className="text-gray-400">Dr. Ademola</span>
        </h1>
      </div>

      {/* Primary Search Interface */}
      <section className="bg-white border border-gray-100 rounded-[32px] p-1 flex items-center shadow-sm focus-within:ring-4 focus-within:ring-[#2D4D31]/5 focus-within:border-[#2D4D31]/20 transition-all">
        <div className="pl-5 pr-3">
          <MagnifyingGlass size={20} weight="bold" className="text-gray-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search animal by WAF ID or Name..." 
          className="flex-1 py-3.5 bg-transparent border-none outline-none text-[14px] font-black text-gray-900 placeholder:text-gray-300 placeholder:font-bold"
        />
      </section>

      {/* Recent Search Strip */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <ClockCounterClockwise size={18} weight="bold" />
            Recent Search
          </h3>
          <Link 
            to="/history"
            className="px-4 py-1.5 bg-emerald-50 text-[#2D4D31] rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:bg-emerald-100 transition-all active:scale-95 shadow-sm shadow-emerald-900/5 flex items-center gap-1.5"
          >
            View History
            <ClockCounterClockwise size={12} weight="bold" className="opacity-60" />
          </Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {RECENT_SEARCHES.map((animal) => (
            <Link 
              key={animal.id}
              to={`/animal/${animal.id}`}
              className="flex-shrink-0 w-40 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2D4D31]/5 group-hover:text-[#2D4D31] transition-colors text-gray-400">
                <animal.icon size={24} weight="duotone" />
              </div>
              <h4 className="text-[14px] font-black text-gray-900 truncate">{animal.name}</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{animal.id}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        {[
          { label: "Active Herd", value: "50", change: "+12", icon: IdentificationBadge, path: "/animals" },
          { label: "Health Alerts", value: "03", change: "Critical", icon: Warning, color: "text-red-500", path: "/alerts" },
        ].map((stat, i) => (
          <Link 
            key={i} 
            to={stat.path}
            className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                <stat.icon size={20} weight="bold" />
              </div>
              <span className={cn("text-[9px] font-black uppercase tracking-widest", stat.color || "text-emerald-500")}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-[32px] font-black text-gray-900 leading-none">{stat.value}</p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
