"use client";

import { Heart, ShoppingCart, Trash } from "@phosphor-icons/react";
import Link from "next/link";

export default function SavedItemsPage() {
  const items = [
    { 
      id: 1, 
      name: "Bovigen Scour Vaccine", 
      price: "₦12,500", 
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=200&h=200&auto=format&fit=crop",
      chemist: "Central Vet Pharmacy"
    },
    { 
      id: 2, 
      name: "Tetracycline Soluble Powder", 
      price: "₦4,800", 
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=200&h=200&auto=format&fit=crop",
      chemist: "Northern Agri-Supplies"
    },
    { 
      id: 3, 
      name: "NFC Smart Ear Tag (Pack of 10)", 
      price: "₦25,000", 
      image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=200&h=200&auto=format&fit=crop",
      chemist: "Wafrivet Official Store"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Saved Items</h2>
        <p className="text-[14px] font-bold text-gray-400">{items.length} items</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 group hover:border-red-100 transition-all">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
               <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
               {/* Removed heart from image as per user request */}
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-black text-gray-900 text-[17px] mb-1">{item.name}</h3>
              <p className="text-[13px] text-gray-400 font-medium mb-3">By {item.chemist}</p>
              <p className="text-[18px] font-black text-[#2D4D31]">{item.price}</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-6 py-3 bg-[#2D4D31] text-white rounded-xl font-bold text-[13px] hover:bg-[#2D4D31]/90 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={18} weight="bold" />
                Add to Cart
              </button>
              <button className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Remove from wishlist">
                <Heart size={20} weight="fill" />
              </button>
              <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Delete">
                <Trash size={20} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center text-gray-300">
            <Heart size={40} weight="bold" />
          </div>
          <div>
            <h3 className="text-[18px] font-black text-gray-900">Your wishlist is empty</h3>
            <p className="text-[14px] text-gray-400 max-w-[280px]">Save items you're interested in and they'll appear here.</p>
          </div>
          <Link href="/" className="px-8 py-3 bg-[#2D4D31] text-white rounded-xl font-black text-[14px]">
             Browse Marketplace
          </Link>
        </div>
      )}
    </div>
  );
}
