"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Minus, Plus, Trash, ArrowRight, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Mock items
  const items = [
    { id: 1, name: "Oxytetracycline 20%", price: 6500, quantity: 1, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200" },
    { id: 2, name: "Digital Ear Tags (x50)", price: 18000, quantity: 1, image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=200" },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 1500;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                    <ShoppingCart size={22} weight="bold" />
                 </div>
                 <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                 <X size={20} weight="bold" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                   <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 p-2 shrink-0">
                      <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt={item.name} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="font-bold text-gray-900 text-[15px] truncate">{item.name}</h3>
                         <button className="text-gray-300 hover:text-red-500 transition-colors">
                            <Trash size={18} />
                         </button>
                      </div>
                      <p className="text-[14px] font-black text-[#2D4D31] mb-3">₦{item.price.toLocaleString()}</p>
                      
                      <div className="flex items-center w-fit bg-gray-50 rounded-xl p-0.5 border border-gray-100">
                         <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Minus size={14} weight="bold" /></button>
                         <span className="w-8 text-center font-bold text-[13px]">{item.quantity}</span>
                         <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"><Plus size={14} weight="bold" /></button>
                      </div>
                   </div>
                </div>
              ))}

              <div className="pt-6 border-t border-gray-100">
                 <div className="bg-[#2D4D31]/5 p-4 rounded-[20px] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <MapPin size={20} className="text-[#2D4D31]" weight="fill" />
                       <div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Deliver to</p>
                          <p className="text-[13px] font-bold text-gray-900">Lagos Island, Lagos</p>
                       </div>
                    </div>
                    <button className="text-[12px] font-black text-[#2D4D31] hover:underline">Change</button>
                 </div>
              </div>
            </div>

            {/* Footer / Summary */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
              <div className="space-y-2">
                 <div className="flex justify-between text-[14px]">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[14px]">
                    <span className="text-gray-500">Delivery Fee</span>
                    <span className="font-bold text-gray-900">₦{delivery.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between text-[18px] pt-2">
                    <span className="font-black text-gray-900">Total</span>
                    <span className="font-black text-[#2D4D31]">₦{total.toLocaleString()}</span>
                 </div>
              </div>

              <Link href="/checkout" className="w-full h-16 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[16px] hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20">
                 Proceed to Checkout
                 <ArrowRight size={20} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
