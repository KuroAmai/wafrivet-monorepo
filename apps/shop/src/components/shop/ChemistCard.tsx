"use client";

import { SealCheck, Star } from "@phosphor-icons/react";

interface ChemistCardProps {
  name: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  image: string;
}

export function ChemistCard({ name, distance, rating, isOpen, image }: ChemistCardProps) {
  return (
    <div className="flex-shrink-0 w-[240px] bg-white rounded-3xl border border-gray-100 p-3 hover:border-[#2D4D31]/10 transition-all group cursor-pointer">
      <div className="relative h-28 rounded-2xl overflow-hidden mb-3">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
          <Star size={12} weight="fill" className="text-yellow-400" />
          <span className="text-[11px] font-bold text-gray-900">{rating}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 mb-0.5">
          <h3 className="font-bold text-gray-900 text-[14px] line-clamp-1">{name}</h3>
          <SealCheck size={16} weight="fill" className="text-[#2D4D31] shrink-0" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-gray-500 font-medium">{distance} away</span>
          <div className="flex items-center gap-1.5">
             <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-gray-300'}`}></span>
             <span className={`text-[11px] font-bold ${isOpen ? 'text-green-600' : 'text-gray-400'}`}>
               {isOpen ? 'Open now' : 'Closed'}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
