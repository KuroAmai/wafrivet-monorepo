"use client";

import { Plus, Heart, MapPin, Snowflake, CreditCard } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  distance: string;
  stock?: number;
  bnplEligible?: boolean;
  coldChain?: boolean;
}

export function ProductCard({ name, price, category, image, distance, stock, bnplEligible, coldChain }: ProductCardProps) {
  const isLowStock = stock !== undefined && stock < 5;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[28px] border border-gray-100 p-2.5 hover:border-[#2D4D31]/10 hover:shadow-xl hover:shadow-[#2D4D31]/5 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-[1/1] rounded-[22px] bg-gray-50 overflow-hidden mb-3">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Context Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {coldChain && (
            <span className="bg-blue-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <Snowflake size={12} weight="bold" /> COLD CHAIN
            </span>
          )}
          {bnplEligible && (
            <span className="bg-[#2D4D31]/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <CreditCard size={12} weight="bold" /> BNPL
            </span>
          )}
        </div>

        <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-md rounded-xl text-gray-400 hover:text-red-500 transition-colors shadow-sm">
          <Heart size={18} />
        </button>

        {/* Distance Badge */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
            <MapPin size={12} weight="fill" className="text-[#2D4D31]" />
            {distance}
          </div>
          {isLowStock && (
            <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-tight">
              {stock} Left
            </span>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-1.5 pb-1">
        <p className="text-[11px] font-bold text-[#2D4D31]/60 uppercase tracking-widest mb-0.5">{category}</p>
        <h3 className="font-bold text-gray-900 text-[15px] mb-3 leading-tight group-hover:text-[#2D4D31] transition-colors line-clamp-2 min-h-[40px]">{name}</h3>
        
        <div className="flex items-center justify-between gap-2">
          <span className="text-[18px] font-black text-gray-900 tracking-tight">₦{price}</span>
          <button className="w-10 h-10 bg-[#2D4D31] text-white rounded-xl flex items-center justify-center hover:bg-[#243f28] transition-colors shadow-lg shadow-[#2D4D31]/10 active:scale-95 shrink-0">
            <Plus size={22} weight="bold" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
