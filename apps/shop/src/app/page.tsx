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
        
        {/* CENTRALIZED HERO SEARCH */}
        <section className="py-20 flex flex-col items-center text-center">
          <div className="w-full max-w-2xl relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for vaccines, equipment..."
              className="w-full h-20 text-center bg-white rounded-3xl text-[20px] font-medium outline-none focus:ring-4 focus:ring-[#2D4D31]/5 transition-all shadow-sm border border-gray-100 placeholder:text-gray-300"
            />
          </div>
        </section>


        {/* PRODUCT GRID */}
        <section>
          <div className="flex flex-col items-center justify-center mb-10 px-2 text-center">
            <h2 className="text-[18px] font-bold text-gray-900 mb-2">Recommended for you</h2>
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
