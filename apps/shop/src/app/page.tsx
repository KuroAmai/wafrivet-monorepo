"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChemistCard } from "@/components/shop/ChemistCard";
import Link from "next/link";
import { 
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
        
        {/* CENTRALIZED HERO SEARCH */}
        <section className="py-16 md:py-24 flex flex-col items-center text-center">
          <div className="w-full max-w-2xl relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for vaccines, equipment..."
              className="w-full h-20 text-center bg-white rounded-[32px] text-[20px] font-medium outline-none focus:ring-8 focus:ring-[#2D4D31]/5 transition-all shadow-xl shadow-gray-200/40 border-none placeholder:text-gray-300"
            />
          </div>
        </section>

        {/* ACTION STRIP: PERSONALIZED UPDATES */}
        <section className="mb-12 flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {/* Order Tracking */}
          <div className="flex-shrink-0 w-[300px] bg-white p-5 rounded-[28px] border border-gray-100 flex items-center gap-4 cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Package size={24} weight="duotone" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-gray-900">Arriving at 2:30 PM</h2>
              <p className="text-[12px] text-gray-400">Order #WF-9281</p>
            </div>
          </div>

          {/* Diagnosis Recommendation */}
          <div className="flex-shrink-0 w-[300px] bg-[#2D4D31] p-5 rounded-[28px] flex items-center gap-4 text-white cursor-pointer">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <SealWarning size={24} weight="fill" />
            </div>
            <div>
              <h2 className="text-[14px] font-bold">New Diagnosis Result</h2>
              <p className="text-[12px] text-white/70">Terramycin for Cattle</p>
            </div>
          </div>
        </section>

        {/* SHOP BY ANIMAL */}
        <section className="mb-12">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            {ANIMALS.map((animal) => (
              <button key={animal} className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl group shadow-sm transition-all">
                <PawPrint size={18} className="text-gray-300 group-hover:text-[#2D4D31]" />
                <span className="font-bold text-[14px] text-gray-600 group-hover:text-[#2D4D31]">{animal}</span>
              </button>
            ))}
          </div>
        </section>

        {/* CHEMISTS NEAR YOU */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Chemists near you</h2>
            <Link href="/chemists" className="text-[14px] font-bold text-[#2D4D31] hover:underline">View Map</Link>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            <ChemistCard name="Health First Agro" distance="1.2km" rating={4.8} isOpen={true} image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="Lagos Vet Hub" distance="2.5km" rating={4.9} isOpen={true} image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="FarmSafe Pharma" distance="3.8km" rating={4.5} isOpen={false} image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" />
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section>
          <div className="flex flex-col items-center justify-center mb-12 px-2 text-center">
            <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Recommended for you</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
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
