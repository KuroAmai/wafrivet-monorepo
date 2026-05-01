"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { MapboxView } from "@/components/shop/MapboxView";
import { CaretLeft, Funnel, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";

export default function ChemistsPage() {
  return (
    <div className="h-screen flex flex-col bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
        {/* Sidebar: List of Chemists */}
        <div className="w-full md:w-[360px] flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center gap-3 mb-2">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <CaretLeft size={20} weight="bold" />
            </Link>
            <h1 className="text-[20px] font-black text-gray-900 tracking-tight">Nearby Chemists</h1>
          </div>

          <div className="flex gap-2 mb-2">
             <div className="flex-1 relative">
                <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search chemists..." 
                  className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 outline-none focus:border-[#2D4D31] text-[14px]"
                />
             </div>
             <button className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-600">
                <Funnel size={20} />
             </button>
          </div>

          {[
            { name: "Health First Agro", distance: "1.2km", rating: 4.8, status: "Open Now", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" },
            { name: "Lagos Vet Hub", distance: "2.5km", rating: 4.9, status: "Open Now", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" },
            { name: "FarmSafe Pharma", distance: "3.8km", rating: 4.5, status: "Closed", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" },
            { name: "GreenField Supplies", distance: "4.2km", rating: 4.7, status: "Open Now", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" },
          ].map((chemist, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 hover:border-[#2D4D31]/10 transition-all group cursor-pointer shadow-sm">
               <div className="flex items-center gap-4">
                  <img src={chemist.image} className="w-16 h-16 rounded-2xl object-cover" alt={chemist.name} />
                  <div className="flex-1">
                     <h3 className="font-bold text-gray-900 text-[15px]">{chemist.name}</h3>
                     <div className="flex items-center gap-3 mt-1">
                        <span className="text-[12px] text-gray-500 font-medium">{chemist.distance}</span>
                        <span className={`text-[11px] font-bold ${chemist.status === 'Open Now' ? 'text-green-600' : 'text-gray-400'}`}>{chemist.status}</span>
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        {/* Map View */}
        <div className="flex-1 h-[400px] md:h-full">
          <MapboxView />
        </div>
      </main>
    </div>
  );
}
