"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { 
  MapPin, 
  CreditCard, 
  Truck, 
  ArrowRight, 
  SealCheck,
  ShieldCheck,
  CaretLeft
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <ShopNavbar />
      
      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group">
          <CaretLeft size={18} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[14px]">Back to Marketplace</span>
        </Link>

        <h1 className="text-[32px] font-black text-gray-900 tracking-tight mb-10">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Flow */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Delivery Address */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1.5 h-full bg-[#2D4D31]"></div>
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                        <MapPin size={22} weight="fill" />
                     </div>
                     <h2 className="text-[18px] font-black text-gray-900">Delivery Address</h2>
                  </div>
                  <button className="text-[13px] font-black text-[#2D4D31] hover:underline">Change</button>
               </div>
               <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="font-bold text-gray-900 mb-1">Mustapha Ahmed</p>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                     12 Marina Road, Lagos Island<br />
                     Lagos, Nigeria<br />
                     +234 812 345 6789
                  </p>
               </div>
            </section>

            {/* 2. Delivery Method */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                     <Truck size={22} weight="fill" />
                  </div>
                  <h2 className="text-[18px] font-black text-gray-900">Delivery Method</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-[#2D4D31]/5 rounded-2xl border-2 border-[#2D4D31] flex justify-between items-start">
                     <div>
                        <p className="font-bold text-gray-900">Standard Delivery</p>
                        <p className="text-[12px] text-gray-500 mt-0.5">Estimated Today, 2:30 PM</p>
                     </div>
                     <span className="text-[14px] font-black text-[#2D4D31]">₦1,500</span>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-gray-100 flex justify-between items-start opacity-50 cursor-not-allowed">
                     <div>
                        <p className="font-bold text-gray-900">Priority Express</p>
                        <p className="text-[12px] text-gray-500 mt-0.5">Within 45 mins</p>
                     </div>
                     <span className="text-[14px] font-black text-gray-900">₦3,500</span>
                  </div>
               </div>
            </section>

            {/* 3. Payment Method */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                     <CreditCard size={22} weight="fill" />
                  </div>
                  <h2 className="text-[18px] font-black text-gray-900">Payment Method</h2>
               </div>
               <div className="space-y-3">
                  {[
                    { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, Verve' },
                    { id: 'bank', name: 'Bank Transfer', icon: ArrowRight, subtitle: 'Instant confirmation' },
                  ].map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${paymentMethod === method.id ? 'bg-[#2D4D31]/5 border-[#2D4D31]' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === method.id ? 'bg-[#2D4D31] text-white' : 'bg-gray-50 text-gray-400'}`}>
                             <method.icon size={20} weight="bold" />
                          </div>
                          <div>
                             <p className="font-bold text-gray-900 text-[15px]">{method.name}</p>
                             <p className="text-[12px] text-gray-500">{method.subtitle}</p>
                          </div>
                       </div>
                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id ? 'border-[#2D4D31]' : 'border-gray-200'}`}>
                          {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-[#2D4D31] rounded-full"></div>}
                       </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
               <h3 className="text-[18px] font-black text-gray-900 mb-6 tracking-tight">Order Summary</h3>
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[14px]">
                     <span className="text-gray-500 font-medium">Subtotal (2 items)</span>
                     <span className="font-bold text-gray-900">₦41,000</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                     <span className="text-gray-500 font-medium">Delivery Fee</span>
                     <span className="font-bold text-gray-900">₦1,500</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                     <span className="text-gray-500 font-medium">Service Charge</span>
                     <span className="font-bold text-gray-900">₦0.00</span>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-baseline">
                     <span className="font-black text-gray-900 text-[18px]">Total</span>
                     <span className="font-black text-[#2D4D31] text-[24px]">₦42,500</span>
                  </div>
               </div>

               <Link href="/orders/success" className="w-full h-16 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center gap-3 font-black text-[16px] hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20">
                  Confirm and Pay
                  <SealCheck size={24} weight="fill" />
               </Link>

               <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                  <ShieldCheck size={16} weight="bold" />
                  <span className="text-[11px] font-black uppercase tracking-widest">PCI-DSS Secure Payment</span>
               </div>
            </div>

            <div className="p-6 bg-[#2D4D31]/5 rounded-[32px] border border-[#2D4D31]/10">
               <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31] shrink-0">
                     <ShieldCheck size={20} weight="bold" />
                  </div>
                  <div>
                     <p className="text-[13px] font-bold text-gray-900 mb-1">Authenticity Guaranteed</p>
                     <p className="text-[11px] text-gray-500 leading-relaxed">All products are verified by Wafrivet for quality and NAFDAC compliance.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
