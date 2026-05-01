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
import { useState, useEffect } from "react";

const ANIMALS = ["Cattle", "Poultry", "Pigs", "Goats", "Sheep"];

export function MarketplaceView() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = typeof document !== 'undefined' && document.cookie.includes("jwt=mock-token");
    setIsLoggedIn(hasToken);
  }, []);

  const handleProtectedAction = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      const loginUrl = "https://app.wafrivet.com/login?redirect=" + encodeURIComponent(window.location.href);
      window.location.href = loginUrl;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
      <ShopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <section className="py-8 md:py-24 flex flex-col items-center text-center px-4">
          <div className="w-full max-w-2xl relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full h-14 md:h-20 text-center bg-white rounded-xl md:rounded-[32px] text-[15px] md:text-[20px] font-medium outline-none focus:ring-4 focus:ring-[#2D4D31]/5 transition-all border border-gray-100 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        </section>

        {isLoggedIn ? (
          <section className="mb-10 flex gap-4 overflow-x-auto no-scrollbar py-2 px-2">
            <div className="flex-shrink-0 w-[300px] bg-white p-5 rounded-[28px] border border-gray-100 flex items-center gap-4 cursor-pointer">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Package size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-gray-900">Arriving at 2:30 PM</h2>
                <p className="text-[12px] text-gray-400">Order #WF-9281</p>
              </div>
            </div>

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
        ) : (
          <section className="mb-10 px-2">
             <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                   <div className="w-12 h-12 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31] shrink-0">
                      <TrendUp size={24} weight="bold" />
                   </div>
                   <div className="flex flex-col">
                      <h2 className="text-[16px] md:text-[18px] font-bold text-gray-900 leading-tight">Sign in for a personalized experience</h2>
                      <p className="text-[13px] text-gray-500 mt-1">Track orders and see recommendations for your animals</p>
                   </div>
                </div>
                <button onClick={handleProtectedAction} className="w-full sm:w-auto bg-[#2D4D31] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#243f28] transition-colors shrink-0">
                   Sign In
                </button>
             </div>
          </section>
        )}

        <section className="mb-12">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4 px-2">
            {ANIMALS.map((animal) => (
              <button key={animal} className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl group transition-all">
                <PawPrint size={18} className="text-gray-300 group-hover:text-[#2D4D31]" />
                <span className="font-bold text-[14px] text-gray-600 group-hover:text-[#2D4D31]">{animal}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Chemists near you</h2>
            <Link href="/chemists" className="text-[14px] font-bold text-[#2D4D31] hover:underline">View Map</Link>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            <ChemistCard name="Health First Agro" rating={4.8} isOpen={true} image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="Lagos Vet Hub" rating={4.9} isOpen={true} image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" />
            <ChemistCard name="FarmSafe Pharma" rating={4.5} isOpen={false} image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" />
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center justify-center mb-12 px-2 text-center">
            <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Recommended for you</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
            <ProductCard id="1" name="Oxytetracycline 20%" price="6,500" category="Antibiotics" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" stock={3} coldChain />
            <ProductCard id="2" name="Ivermectin 1%" price="4,200" category="Dewormers" image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" stock={12} />
            <ProductCard id="3" name="Digital Ear Tags (x50)" price="18,000" category="Equipment" image="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400" stock={25} />
            <ProductCard id="4" name="Automatic Syringe" price="12,500" category="Equipment" image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400" stock={2} />
            <ProductCard id="5" name="Multivitamin Injection" price="3,800" category="Supplements" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" stock={8} />
          </div>
        </section>
      </main>
    </div>
  );
}
