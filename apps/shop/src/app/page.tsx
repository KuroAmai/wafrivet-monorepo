"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChemistCard } from "@/components/shop/ChemistCard";
import { 
  MagnifyingGlass, 
  TrendUp, 
  Package, 
  SealWarning,
  PawPrint
} from "@phosphor-icons/react";
import { useState } from "react";

const ANIMALS = ["Cattle", "Poultry", "Pigs", "Goats", "Sheep"];

export default function ShopHome() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
      <ShopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* CLEAN HERO */}
        <section className="py-12 flex flex-col items-center text-center">
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <MagnifyingGlass size={24} className="text-gray-400 group-focus-within:text-[#2D4D31] transition-colors" />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for vaccines, equipment..."
              className="w-full h-16 pl-14 pr-6 bg-white rounded-2xl text-[16px] font-medium outline-none focus:ring-4 focus:ring-[#2D4D31]/5 transition-all shadow-sm border border-gray-100"
            />
          </div>
        </section>

        {/* ACTION CENTER (COMBINED) */}
        <section className="mb-10 flex gap-4 overflow-x-auto no-scrollbar">
          {/* Tracking Card */}
          <div className="flex-shrink-0 w-[320px] bg-white p-5 rounded-3xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Package size={24} weight="duotone" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-gray-900">Order arriving 2:30 PM</h2>
              <p className="text-[12px] text-gray-500">Tap to track delivery</p>
            </div>
          </div>

          {/* Recommendation Card */}
          <div className="flex-shrink-0 w-[320px] bg-[#2D4D31] p-5 rounded-3xl flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <SealWarning size={24} weight="fill" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold">New diagnosis recommendation</h2>
              <p className="text-[12px] text-white/70">View Terramycin for Cattle</p>
            </div>
          </div>
        </section>

        {/* LOCAL & SPECIES STRIP */}
        <section className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {ANIMALS.map((animal) => (
              <button key={animal} className="flex-shrink-0 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31] hover:text-[#2D4D31] transition-all">
                {animal}
              </button>
            ))}
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <button className="flex-shrink-0 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[13px] font-bold">
              Chemists Near You
            </button>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section>
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[18px] font-bold text-gray-900">Recommended for you</h2>
            <TrendUp size={20} className="text-[#2D4D31]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ProductCard id="1" name="Oxytetracycline 20%" price="6,500" category="Antibiotics" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" distance="1.2km" stock={3} coldChain />
            <ProductCard id="2" name="Ivermectin 1%" price="4,200" category="Dewormers" image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" distance="2.5km" stock={12} />
            <ProductCard id="3" name="Digital Ear Tags (x50)" price="18,000" category="Equipment" image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" distance="0.8km" stock={25} />
            <ProductCard id="4" name="Automatic Syringe" price="12,500" category="Equipment" image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" distance="5.1km" stock={2} />
            <ProductCard id="5" name="Multivitamin Injection" price="3,800" category="Supplements" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" distance="1.2km" stock={8} />
          </div>
        </section>
      </main>
    </div>
  );
}
