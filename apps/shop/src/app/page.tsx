"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChemistCard } from "@/components/shop/ChemistCard";
import Link from "next/link";
import { 
  MagnifyingGlass, 
  ArrowRight, 
  TrendUp, 
  Package, 
  CreditCard,
  SealWarning,
  PawPrint,
  Circle
} from "@phosphor-icons/react";
import { useState } from "react";
import { motion } from "framer-motion";

const SUGGESTIONS = ["Ivermectin", "Oxytetracycline", "Newcastle vaccine", "Dewormers"];
const ANIMALS = [
  { name: "Cattle", icon: <PawPrint size={24} /> },
  { name: "Poultry", icon: <PawPrint size={24} /> },
  { name: "Pigs", icon: <PawPrint size={24} /> },
  { name: "Goats", icon: <PawPrint size={24} /> },
  { name: "Sheep", icon: <PawPrint size={24} /> },
];

export default function ShopHome() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <ShopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* HERO SEARCH SECTION */}
        <section className="py-8 md:py-12 flex flex-col items-center">
          <div className="w-full max-w-3xl relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <MagnifyingGlass size={28} className="text-gray-400 group-focus-within:text-[#2D4D31] transition-colors" />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for vaccines, equipment..."
              className="w-full h-20 pl-16 pr-6 bg-white border-2 border-gray-100 rounded-[32px] text-xl font-medium outline-none focus:border-[#2D4D31] focus:ring-8 focus:ring-[#2D4D31]/5 transition-all shadow-xl shadow-gray-200/40 placeholder:text-gray-300"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {SUGGESTIONS.map((pill) => (
              <button 
                key={pill}
                onClick={() => setSearch(pill)}
                className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-[14px] font-bold text-gray-500 hover:border-[#2D4D31] hover:text-[#2D4D31] transition-all active:scale-95"
              >
                {pill}
              </button>
            ))}
          </div>
        </section>

        {/* BNPL BANNER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#2D4D31] text-white px-6 py-4 rounded-[24px] flex items-center justify-between mb-10 shadow-lg shadow-[#2D4D31]/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <CreditCard size={24} weight="bold" />
            </div>
            <div>
              <p className="text-[13px] font-bold text-white/70 leading-none mb-1 uppercase tracking-wider">Credit Limit Available</p>
              <h3 className="text-[16px] font-bold">You have up to ₦35,000 in BNPL credit. Use at checkout.</h3>
            </div>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[14px] font-bold bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
            Learn more
          </button>
        </motion.div>

        {/* SECTION 1: CONTINUE WHERE YOU LEFT OFF */}
        <section className="mb-12">
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-5 relative z-10">
               <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 relative">
                  <Package size={32} weight="duotone" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse"></span>
               </div>
               <div>
                  <h2 className="text-[18px] font-bold text-gray-900">Your order is on the way</h2>
                  <p className="text-[14px] text-gray-500 font-medium">Lagos Island Delivery · Estimated arrival: 2:30 PM</p>
               </div>
            </div>
            <button className="w-full md:w-auto bg-gray-50 hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold text-[15px] transition-all relative z-10">
               Track Order
            </button>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* SECTION 2: CHEMISTS NEAR YOU */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Chemists near you</h2>
            <Link href="/chemists" className="text-[14px] font-bold text-[#2D4D31] hover:underline">View map</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-2 pb-4">
            <ChemistCard name="Health First Agro" distance="1.2km" rating={4.8} isOpen={true} image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="Lagos Vet Hub" distance="2.5km" rating={4.9} isOpen={true} image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="FarmSafe Pharma" distance="3.8km" rating={4.5} isOpen={false} image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="GreenField Supplies" distance="4.2km" rating={4.7} isOpen={true} image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" />
          </div>
        </section>

        {/* SECTION 3: SHOP BY ANIMAL */}
        <section className="mb-12">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar px-2">
            {ANIMALS.map((animal) => (
              <button key={animal.name} className="flex-shrink-0 flex items-center gap-3 px-6 py-4 bg-white border border-gray-100 rounded-3xl hover:border-[#2D4D31] hover:bg-[#2D4D31]/5 transition-all group">
                <div className="text-gray-400 group-hover:text-[#2D4D31] transition-colors">{animal.icon}</div>
                <span className="font-bold text-gray-700 group-hover:text-[#2D4D31]">{animal.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 5: YOUR ANIMALS NEED THIS (SPECIAL) */}
        <section className="mb-12">
           <div className="bg-orange-50/50 border border-orange-100 p-6 rounded-[32px]">
              <div className="flex items-center gap-2 text-orange-600 mb-4">
                 <SealWarning size={24} weight="fill" />
                 <h2 className="text-[18px] font-bold">Based on your recent diagnosis</h2>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                 <div className="bg-white p-4 rounded-3xl border border-orange-100 flex-1 w-full">
                    <div className="flex items-center gap-4">
                       <img src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=200" className="w-20 h-20 rounded-2xl object-cover" alt="medicine" />
                       <div className="flex-1">
                          <p className="text-[12px] font-bold text-orange-500 uppercase tracking-wider">Diagnosis result</p>
                          <h3 className="text-[16px] font-bold text-gray-900">Terramycin LA Injection</h3>
                          <div className="flex items-center justify-between mt-2">
                             <span className="text-[18px] font-black text-gray-900">₦8,500</span>
                             <button className="bg-[#2D4D31] text-white px-5 py-2 rounded-xl font-bold text-[14px] hover:bg-[#243f28] transition-all active:scale-95">
                                Add to Cart
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <p className="text-[15px] text-gray-600 font-medium leading-relaxed">
                       Your diagnosis on <strong>Cattle Group B</strong> suggested a respiratory infection. Order now to start treatment today.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* SECTION 4: PRODUCT GRID */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Recommended for you</h2>
            <div className="flex items-center gap-2 text-[14px] font-bold text-gray-500">
               <TrendUp size={20} />
               Trending
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            <ProductCard id="1" name="Oxytetracycline 20%" price="6,500" category="Antibiotics" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" distance="1.2km" stock={3} bnplEligible coldChain />
            <ProductCard id="2" name="Ivermectin 1%" price="4,200" category="Dewormers" image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" distance="2.5km" stock={12} bnplEligible />
            <ProductCard id="3" name="Digital Ear Tags (x50)" price="18,000" category="Equipment" image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" distance="0.8km" stock={25} />
            <ProductCard id="4" name="Automatic Syringe" price="12,500" category="Equipment" image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" distance="5.1km" stock={2} bnplEligible />
            <ProductCard id="5" name="Multivitamin Injection" price="3,800" category="Supplements" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" distance="1.2km" stock={8} bnplEligible />
          </div>
        </section>
      </main>
    </div>
  );
}
