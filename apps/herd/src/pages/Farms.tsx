import { CaretLeft, MapPin, Plus, ArrowsClockwise, DotsThreeVertical, ArrowSquareOut, MapTrifold } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const FARMS = [
  { name: "Lekki Dairy Central", location: "Lagos, NG", animals: 124, status: "Active" },
  { name: "Epe Livestock Hub", location: "Lagos, NG", animals: 82, status: "Active" },
  { name: "Ogun Green Pastures", location: "Ogun, NG", animals: 244, status: "Syncing" },
];

export default function Farms() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Sub Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link to="/" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Managed Farms</h1>
        <button className="w-10 h-10 rounded-xl bg-[#2D4D31] flex items-center justify-center text-white active:scale-90 transition-transform">
           <Plus size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        {/* Statistics Bar */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#2D4D31] p-6 rounded-[32px] text-white">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/60 mb-2">Total Managed</p>
              <h2 className="text-[32px] font-black">12</h2>
           </div>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Animals</p>
              <h2 className="text-[32px] font-black text-gray-900">450</h2>
           </div>
        </div>

        {/* Farms List */}
        <div className="space-y-4">
           <div className="flex items-center justify-between px-4">
              <h3 className="text-[12px] font-black text-gray-300 uppercase tracking-[0.2em]">Your Facilities</h3>
              <button className="text-gray-400 hover:text-gray-900 transition-colors">
                 <ArrowsClockwise size={18} weight="bold" />
              </button>
           </div>
           
           <div className="space-y-4">
              {FARMS.map((farm, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm group hover:border-[#2D4D31]/10 transition-all">
                   <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31]">
                            <MapPin size={24} weight="bold" />
                         </div>
                         <div>
                            <h4 className="text-[16px] font-black text-gray-900">{farm.name}</h4>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{farm.location}</p>
                         </div>
                      </div>
                      <button className="w-10 h-10 rounded-xl hover:bg-gray-50 text-gray-300 flex items-center justify-center">
                         <DotsThreeVertical size={20} weight="bold" />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{farm.status}</span>
                      </div>
                      <div className="text-right">
                         <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{farm.animals} Heads</span>
                      </div>
                   </div>

                   <div className="mt-6 grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all">
                         <MapTrifold size={16} weight="bold" />
                         Map
                      </button>
                      <Link 
                        to={`/farms/${farm.name.toLowerCase().replace(/\s+/g, '-')}/portal`}
                        className="flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"
                      >
                         <ArrowSquareOut size={16} weight="bold" />
                         Portal
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Request Addition */}
        <div className="p-8 border-2 border-dashed border-gray-200 rounded-[40px] text-center space-y-4">
           <p className="text-[13px] font-bold text-gray-400">Need to manage another facility?</p>
           <button className="px-8 py-3 bg-white border border-gray-100 rounded-xl font-black text-[12px] uppercase tracking-widest shadow-sm hover:shadow-md transition-all active:scale-95">
              Request Access
           </button>
        </div>
      </div>
    </div>
  );
}
