"use client";

import { motion } from "framer-motion";
import { Plus, ThermometerCold, MapPin, Heart } from "@phosphor-icons/react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  stock: number;
  coldChain?: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  category, 
  image, 
  stock, 
  coldChain 
}: ProductCardProps) {
  const isLowStock = stock <= 5;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 transition-all hover:shadow-lg hover:shadow-gray-100/50">
        <Link href={`/product/${id}`}>
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges Overlay */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {coldChain && (
                <div className="bg-blue-500/90 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm uppercase tracking-wider">
                  <ThermometerCold size={14} weight="bold" /> Cold Chain
                </div>
              )}
            </div>

            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-400 hover:text-red-500 transition-colors shadow-sm"
            >
              <Heart size={18} />
            </button>

            {/* Stock Badge Overlay */}
            {isLowStock && (
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 shadow-sm">
                 <span className="text-[10px] font-black text-red-500 uppercase tracking-tighter">{stock} Left</span>
              </div>
            )}
          </div>
        </Link>

        {/* Details Section */}
        <div className="p-5">
           <p className="text-[11px] font-black text-[#2D4D31]/40 uppercase tracking-[0.1em] mb-1">{category}</p>
           <Link href={`/product/${id}`}>
              <h3 className="font-bold text-gray-900 text-[15px] mb-4 leading-tight line-clamp-2 min-h-[40px] group-hover:text-[#2D4D31] transition-colors">{name}</h3>
           </Link>
           
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                 <span className="text-[18px] font-black text-gray-900 tracking-tight">₦{price}</span>
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                className="w-10 h-10 bg-[#2D4D31] text-white rounded-xl flex items-center justify-center hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10 active:scale-95"
              >
                <Plus size={22} weight="bold" />
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
