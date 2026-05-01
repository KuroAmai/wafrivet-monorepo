"use client";

import { Plus, Heart, Star } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

export function ProductCard({ name, price, category, image, rating, reviews, isNew }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-3xl border border-gray-100 p-3 hover:border-[#2D4D31]/20 hover:shadow-xl hover:shadow-[#2D4D31]/5 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative aspect-square rounded-2xl bg-gray-50 overflow-hidden mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {isNew && (
          <span className="absolute top-3 left-3 bg-[#2D4D31] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-xl text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Info Section */}
      <div className="px-2 pb-2">
        <p className="text-[12px] font-bold text-[#2D4D31] uppercase tracking-wider mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 text-[16px] mb-2 group-hover:text-[#2D4D31] transition-colors line-clamp-1">{name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} weight={i < Math.floor(rating) ? "fill" : "regular"} />
            ))}
          </div>
          <span className="text-[12px] text-gray-400 font-medium">({reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[18px] font-bold text-gray-900">₦{price}</span>
          </div>
          <button className="p-2.5 bg-[#2D4D31] text-white rounded-xl hover:bg-[#243f28] transition-colors shadow-lg shadow-[#2D4D31]/20 active:scale-95">
            <Plus size={20} weight="bold" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
