"use client";

import { motion } from "framer-motion";
import { Plus, ThermometerCold, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  distance: string;
  stock: number;
  coldChain?: boolean;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  category, 
  image, 
  distance, 
  stock, 
  coldChain 
}: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={`/product/${id}`} className="flex flex-col bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:border-[#2D4D31]/10 transition-all shadow-sm h-full">
        {/* Image Container */}
        <div className="relative aspect-square bg-[#F9FAFB] p-6 flex items-center justify-center overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
          
          {coldChain && (
            <div className="absolute top-4 left-4 bg-blue-50/80 backdrop-blur-md p-2 rounded-xl text-blue-600 border border-blue-100">
              <ThermometerCold size={16} weight="bold" />
            </div>
          )}

          {stock <= 5 && (
            <div className="absolute top-4 right-4 bg-orange-50/80 backdrop-blur-md px-2 py-1 rounded-lg border border-orange-100">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Only {stock} left</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{category}</span>
            <div className="flex items-center gap-1">
              <MapPin size={12} className="text-[#2D4D31]" weight="fill" />
              <span className="text-[11px] font-bold text-gray-900">{distance}</span>
            </div>
          </div>
          
          <h3 className="font-bold text-gray-900 text-[15px] leading-snug mb-3 group-hover:text-[#2D4D31] transition-colors">{name}</h3>
          
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[18px] font-black text-[#2D4D31]">₦{price}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">per unit</span>
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                // Add to cart logic would go here
              }}
              className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#2D4D31] hover:text-white transition-all border border-gray-100"
            >
              <Plus size={20} weight="bold" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
