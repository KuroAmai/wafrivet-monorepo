import { CaretLeft, ClockCounterClockwise, Cow, MapPin, Tag, Brain, MagnifyingGlass } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const HISTORY_GROUPS = [
  {
    date: "Today",
    items: [
      { id: 1, action: "Animal Scan", target: "Bella (WAF-882)", time: "2m ago", type: "scan", icon: Cow, color: "bg-blue-50 text-blue-500" },
      { id: 2, action: "Intelligence Query", target: "Yield projection for Q3", time: "1h ago", type: "ai", icon: Brain, color: "bg-purple-50 text-purple-500" },
      { id: 3, action: "Facility Update", target: "Lekki Dairy Central", time: "4h ago", type: "update", icon: MapPin, color: "bg-emerald-50 text-emerald-500" },
    ]
  },
  {
    date: "Yesterday",
    items: [
      { id: 4, action: "Animal Search", target: "Luna (WAF-901)", time: "22h ago", type: "search", icon: MagnifyingGlass, color: "bg-gray-50 text-gray-500" },
      { id: 5, action: "New Tag Issued", target: "Ovine WAF-1002", time: "1d ago", type: "tag", icon: Tag, color: "bg-orange-50 text-orange-500" },
    ]
  }
];

export default function History() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">History Log</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="px-6 py-10 space-y-12">
        {HISTORY_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="px-2 text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">{group.date}</h3>
            
            <div className="space-y-3">
               {group.items.map((item) => (
                 <Link 
                   key={item.id} 
                   to={`/history/${item.id}`}
                   className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-5 group hover:border-[#2D4D31]/10 transition-all active:scale-[0.98] block"
                 >
                    <div className={`w-14 h-14 ${item.color} rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6`}>
                       <item.icon size={28} weight="bold" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                       <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.action}</p>
                       <h4 className="text-[16px] font-black text-gray-900 truncate">{item.target}</h4>
                    </div>

                    <div className="text-right shrink-0">
                       <p className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest">{item.time}</p>
                    </div>
                 </Link>
               ))}
            </div>
          </div>
        ))}

        {/* Clear History Button */}
        <button className="w-full py-5 text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-red-500 transition-colors">
          Clear Activity Log
        </button>
      </div>
    </div>
  );
}
