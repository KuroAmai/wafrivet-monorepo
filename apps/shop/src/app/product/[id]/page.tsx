"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { 
  CaretLeft, 
  ShoppingCart, 
  SealCheck, 
  ThermometerCold, 
  Hourglass, 
  Drop,
  Horse,
  Cow,
  Bird,
  Star,
  MapPin,
  Clock,
  ChatCircleDots
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white pb-32">
      <ShopNavbar />
      
      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
          <CaretLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[14px]">Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
             <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center p-12">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800" 
                  alt="Oxytetracycline" 
                  className="w-full h-full object-contain mix-blend-multiply" 
                />
             </div>
             <div className="flex gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:border-[#2D4D31] transition-colors"></div>
                ))}
             </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col">
            <div className="mb-8">
               <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-[#2D4D31]/5 text-[#2D4D31] text-[11px] font-black uppercase tracking-wider rounded-lg">Antibiotics</span>
                  <div className="flex items-center gap-1 text-gray-400">
                     <SealCheck size={14} weight="fill" className="text-blue-500" />
                     <span className="text-[11px] font-bold">NAFDAC: 04-9281</span>
                  </div>
               </div>
               <h1 className="text-[32px] md:text-[40px] font-black text-gray-900 leading-[1.1] mb-2 tracking-tight">
                  Oxytetracycline 20%
               </h1>
               <p className="text-[16px] md:text-[18px] text-gray-400 font-medium tracking-tight">
                  Broad spectrum antibiotic for livestock
               </p>
            </div>

            <div className="mb-10">
               <div className="flex items-baseline gap-2">
                  <span className="text-[28px] font-black text-[#2D4D31]">₦6,500</span>
                  <span className="text-[14px] text-gray-400 font-bold line-through">₦8,200</span>
               </div>
               <p className="text-[13px] text-gray-500 mt-1 font-medium italic">Sold by Health First Agro</p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Drop size={16} weight="bold" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Form</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">Injection</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <ThermometerCold size={16} weight="bold" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Storage</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">Cold Chain (2-8°C)</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Hourglass size={16} weight="bold" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Shelf Life</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">24 Months</p>
               </div>
               <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                     <Star size={16} weight="bold" />
                     <span className="text-[11px] font-black uppercase tracking-widest">Strength</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">200mg/ml</p>
               </div>
            </div>

            {/* Suitable For */}
            <div className="mb-12">
               <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-4">Suitable for</h3>
               <div className="flex gap-3">
                  {[
                    { name: 'Cattle', icon: Cow },
                    { name: 'Poultry', icon: Bird },
                    { name: 'Sheep', icon: Horse },
                  ].map((animal) => (
                    <div key={animal.name} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                       <animal.icon size={18} className="text-[#2D4D31]" />
                       <span className="text-[13px] font-bold text-gray-700">{animal.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Chemist Card */}
            <div className="p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
               <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                     <img 
                       src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100" 
                       className="w-14 h-14 rounded-2xl object-cover" 
                       alt="Chemist" 
                     />
                     <div>
                        <div className="flex items-center gap-1.5">
                           <h3 className="font-bold text-gray-900 text-[16px]">Health First Agro</h3>
                           <SealCheck size={16} weight="fill" className="text-blue-500" />
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                           <div className="flex items-center gap-1">
                              <Star size={14} weight="fill" className="text-yellow-400" />
                              <span className="text-[13px] font-bold text-gray-900">4.8</span>
                              <span className="text-[13px] text-gray-400">(240 reviews)</span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <button className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-[#2D4D31] transition-colors">
                     <ChatCircleDots size={20} weight="bold" />
                  </button>
               </div>
               <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50 mt-4">
                  <div className="flex items-center gap-2">
                     <MapPin size={16} className="text-gray-300" />
                     <span className="text-[13px] font-bold text-gray-600">1.2km away</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Clock size={16} className="text-gray-300" />
                     <span className="text-[13px] font-bold text-gray-600">~25 min delivery</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Pinned Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 md:p-6 z-50">
         <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
               <button 
                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                 className="w-12 h-12 flex items-center justify-center text-[20px] font-bold hover:bg-white rounded-xl transition-all"
               >
                 -
               </button>
               <span className="w-12 text-center font-black text-[16px]">{quantity}</span>
               <button 
                 onClick={() => setQuantity(quantity + 1)}
                 className="w-12 h-12 flex items-center justify-center text-[20px] font-bold hover:bg-white rounded-xl transition-all"
               >
                 +
               </button>
            </div>
            <button className="flex-1 bg-[#2D4D31] text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-[16px] hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20">
               <ShoppingCart size={24} weight="bold" />
               Add to Cart — ₦{(6500 * quantity).toLocaleString()}
            </button>
         </div>
      </div>
    </div>
  );
}
