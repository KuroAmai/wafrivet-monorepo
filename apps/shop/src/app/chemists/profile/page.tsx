"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { 
  Star, 
  MapPin, 
  Clock, 
  SealCheck, 
  ChatCircleDots, 
  Phone, 
  ShareNetwork,
  Info,
  Medal,
  Users
} from "@phosphor-icons/react";
import Link from "next/link";

export default function ChemistProfilePage() {
  const chemist = {
    name: "Health First Agro",
    rating: 4.8,
    reviews: 240,
    distance: "1.2km away",
    deliveryTime: "25-35 min",
    verified: true,
    bio: "Lagos Island's leading provider of quality livestock vaccines and medical equipment since 2015. We specialize in cold-chain logistics for cattle and poultry health.",
    address: "12 Marina Road, Lagos Island, Lagos",
    hours: "Mon - Sat: 8:00 AM - 6:00 PM",
    stats: [
      { label: "Products", value: "120+", icon: Medal },
      { label: "Happy Farmers", value: "2.4k", icon: Users },
      { label: "Response", value: "< 10m", icon: Clock },
    ]
  };

  const products = [
    { id: "1", name: "Oxytetracycline 20%", price: "6,500", category: "Antibiotics", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400", distance: "1.2km", stock: 3, coldChain: true },
    { id: "5", name: "Multivitamin Injection", price: "3,800", category: "Supplements", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400", distance: "1.2km", stock: 8 },
    { id: "6", name: "Foot & Mouth Vaccine", price: "15,000", category: "Vaccines", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400", distance: "1.2km", stock: 5, coldChain: true },
    { id: "7", name: "Digital Thermometer", price: "2,500", category: "Equipment", image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=400", distance: "1.2km", stock: 15 },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <ShopNavbar />
      
      {/* Hero Section */}
      <div className="relative h-[250px] md:h-[350px] w-full bg-gray-200 overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1200" 
           className="w-full h-full object-cover" 
           alt="Chemist Banner" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Chemist Bio Card */}
          <div className="lg:col-span-1">
             <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20">
                   <div className="flex flex-col items-center text-center">
                   <div className="relative mb-6">
                      <img 
                        src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200" 
                        className="w-28 h-28 rounded-[32px] border-4 border-white shadow-xl object-cover" 
                        alt={chemist.name} 
                      />
                      {chemist.verified && (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white">
                           <SealCheck size={20} weight="fill" />
                        </div>
                      )}
                   </div>
                   <h1 className="text-[24px] font-black text-gray-900 tracking-tight mb-2">{chemist.name}</h1>
                   <div className="flex items-center gap-2 mb-6">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                         <Star size={14} weight="fill" className="text-yellow-400" />
                         <span className="text-[13px] font-bold text-gray-900">{chemist.rating}</span>
                      </div>
                      <span className="text-[13px] text-gray-400 font-medium">({chemist.reviews} reviews)</span>
                   </div>
                   
                   <p className="text-[14px] text-gray-500 leading-relaxed mb-8">
                      {chemist.bio}
                   </p>

                   <div className="flex gap-3 w-full">
                      <button className="flex-1 h-14 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-[14px] hover:bg-[#243f28] transition-all">
                         <ChatCircleDots size={20} weight="bold" />
                         Message
                      </button>
                      <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-all">
                         <Phone size={20} weight="bold" />
                      </button>
                   </div>
                </div>

                <div className="mt-10 space-y-4 pt-8 border-t border-gray-50">
                   <div className="flex items-start gap-4">
                      <MapPin size={20} className="text-[#2D4D31] mt-1 shrink-0" weight="fill" />
                      <div>
                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Location</p>
                         <p className="text-[14px] font-bold text-gray-900 leading-tight">{chemist.address}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4">
                      <Clock size={20} className="text-[#2D4D31] mt-1 shrink-0" weight="fill" />
                      <div>
                         <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Opening Hours</p>
                         <p className="text-[14px] font-bold text-gray-900 leading-tight">{chemist.hours}</p>
                      </div>
                   </div>
                </div>
             </div>

                <div className="grid grid-cols-3 gap-3">
                   {chemist.stats.map((stat) => (
                     <div key={stat.label} className="bg-white p-4 rounded-[28px] border border-gray-100 text-center shadow-sm">
                        <stat.icon size={20} className="text-[#2D4D31] mx-auto mb-2" weight="duotone" />
                        <p className="text-[16px] font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{stat.label}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Right: Products Grid */}
          <div className="lg:col-span-2 space-y-8">
             {/* Search/Filter Bar inside Chemist Profile */}
             <div className="bg-white p-4 rounded-[32px] border border-gray-100 flex items-center justify-between shadow-sm">
                <h2 className="text-[18px] font-black text-gray-900 ml-4 tracking-tight">Available Products</h2>
                <div className="flex items-center gap-2">
                   <button className="px-5 py-2.5 bg-gray-50 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-gray-100 transition-all">Antibiotics</button>
                   <button className="px-5 py-2.5 bg-gray-50 rounded-xl text-[13px] font-bold text-gray-500 hover:bg-gray-100 transition-all">Vaccines</button>
                   <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><ShareNetwork size={20} /></button>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
             </div>

             {/* About Section */}
             <div className="bg-white p-8 rounded-[40px] border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                   <Info size={24} weight="fill" className="text-[#2D4D31]" />
                   <h2 className="text-[20px] font-black text-gray-900 tracking-tight">About Health First Agro</h2>
                </div>
                <div className="prose prose-gray max-w-none text-[15px] text-gray-500 leading-relaxed space-y-4">
                   <p>
                      Established in 2015, Health First Agro has become a cornerstone of the Lagos Island agricultural community. We understand that livestock health is the foundation of farm productivity.
                   </p>
                   <p>
                      Our facility is equipped with state-of-the-art cold chain storage to ensure that all biological products and vaccines maintain their efficacy from our door to your farm. Our staff includes trained veterinary technicians available for consultation on medication protocols.
                   </p>
                </div>
                
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31]">
                         <SealCheck size={20} weight="fill" />
                      </div>
                      <span className="text-[14px] font-bold text-gray-700">Wafrivet Certified Seller</span>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31]">
                         <Clock size={20} weight="fill" />
                      </div>
                      <span className="text-[14px] font-bold text-gray-700">Fast Response Merchant</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
