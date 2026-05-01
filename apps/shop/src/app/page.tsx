"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ArrowRight, CaretRight, Tag, Truck, ShieldCheck } from "@phosphor-icons/react";
import Link from "next/link";

const FEATURED_PRODUCTS = [
  { id: '1', name: 'Anthrax Spore Vaccine', price: '12,500', category: 'Vaccines', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', rating: 4.8, reviews: 124, isNew: true },
  { id: '2', name: 'Digital Ear Tag Reader', price: '45,000', category: 'Equipment', image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400', rating: 4.9, reviews: 86 },
  { id: '3', name: 'Premium Cattle Feed Mix', price: '8,400', category: 'Feeds', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400', rating: 4.5, reviews: 210 },
  { id: '4', name: 'Automatic Water Trough', price: '28,000', category: 'Equipment', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400', rating: 4.7, reviews: 45 },
  { id: '5', name: 'Broad Spectrum Antibiotic', price: '6,200', category: 'Pharma', image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400', rating: 4.6, reviews: 156 },
  { id: '6', name: 'Livestock First Aid Kit', price: '15,500', category: 'Medical', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400', rating: 4.9, reviews: 32, isNew: true },
];

export default function ShopHome() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Hero Banner Section */}
        <div className="relative h-[300px] md:h-[400px] rounded-[32px] overflow-hidden mb-12">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
            className="absolute inset-0 w-full h-full object-cover"
            alt="Hero Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 md:px-16">
            <span className="bg-[#F2C94C] text-[#2D4D31] text-[12px] font-bold px-3 py-1 rounded-full w-fit mb-4 uppercase tracking-wider">
              Limited Time Offer
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-lg leading-tight">
              Prepare for Vaccination Season
            </h1>
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Get up to 20% off on all livestock vaccines and medical supplies this week.
            </p>
            <button className="bg-white text-[#2D4D31] px-8 py-4 rounded-2xl font-bold text-[16px] flex items-center gap-2 w-fit hover:bg-gray-100 transition-all active:scale-95 shadow-xl">
              Shop Now <ArrowRight size={20} weight="bold" />
            </button>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: <Truck size={28} />, title: "Free Fast Delivery", desc: "For orders above ₦50,000" },
            { icon: <ShieldCheck size={28} />, title: "Quality Guaranteed", desc: "Verified agricultural products" },
            { icon: <Tag size={28} />, title: "Best Prices", desc: "Direct from top manufacturers" },
          ].map((prop, i) => (
            <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100">
              <div className="w-14 h-14 bg-[#2D4D31]/5 rounded-2xl flex items-center justify-center text-[#2D4D31]">
                {prop.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{prop.title}</h3>
                <p className="text-sm text-gray-500">{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 text-[15px]">Handpicked supplies for your herd's health.</p>
            </div>
            <Link href="/all" className="flex items-center gap-1 text-[#2D4D31] font-bold text-[15px] hover:gap-2 transition-all">
              View All <CaretRight size={18} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Promotion Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="relative h-[240px] rounded-[32px] overflow-hidden bg-[#2D4D31] p-8 flex flex-col justify-center">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Need Consultation?</h3>
              <p className="text-white/70 mb-6 max-w-[240px]">Talk to our expert vets before you buy medical supplies.</p>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-2xl font-bold text-[14px] transition-all">
                Talk to a Vet
              </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
               <ShieldCheck size={200} weight="fill" />
            </div>
          </div>
          <div className="relative h-[240px] rounded-[32px] overflow-hidden bg-[#F2C94C] p-8 flex flex-col justify-center">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#2D4D31] mb-2">Bulk Orders</h3>
              <p className="text-[#2D4D31]/70 mb-6 max-w-[240px]">Special pricing for cooperative groups and large ranches.</p>
              <button className="bg-[#2D4D31] text-white px-6 py-3 rounded-2xl font-bold text-[14px] transition-all shadow-lg shadow-[#2D4D31]/20">
                Inquire Now
              </button>
            </div>
             <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
               <Tag size={200} weight="fill" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
