"use client";

import { CreditCard, Plus, Bank, Wallet, DotsThreeVertical } from "@phosphor-icons/react";

export default function PaymentMethodsPage() {
  const methods = [
    { 
      id: 1, 
      type: "Visa", 
      last4: "4242", 
      expiry: "12/28", 
      isDefault: true,
      color: "bg-blue-600"
    },
    { 
      id: 2, 
      type: "Mastercard", 
      last4: "8812", 
      expiry: "05/27", 
      isDefault: false,
      color: "bg-orange-500"
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Payment Methods</h2>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2D4D31] text-white rounded-xl font-bold text-[14px] hover:bg-[#2D4D31]/90 transition-all">
          <Plus size={18} weight="bold" />
          Add Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map((method) => (
          <div key={method.id} className={`${method.color} p-8 rounded-[40px] text-white relative overflow-hidden shadow-xl shadow-gray-200/50 group`}>
            {/* Abstract card patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <CreditCard size={24} weight="bold" />
                </div>
                <button className="text-white/70 hover:text-white transition-colors">
                  <DotsThreeVertical size={24} weight="bold" />
                </button>
              </div>
              
              <div className="mt-12">
                <p className="text-[14px] font-medium opacity-70 mb-1">Card Number</p>
                <p className="text-[20px] font-black tracking-[0.15em]">•••• •••• •••• {method.last4}</p>
              </div>
              
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">Expiry</p>
                  <p className="text-[14px] font-bold">{method.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-black">{method.type}</p>
                  {method.isDefault && <p className="text-[10px] font-bold opacity-70">DEFAULT</p>}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card Placeholder */}
        <button className="border-2 border-dashed border-gray-200 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:border-[#2D4D31]/30 hover:bg-gray-50 transition-all text-gray-400 hover:text-[#2D4D31]">
          <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-white">
            <Plus size={24} weight="bold" />
          </div>
          <span className="font-black text-[15px]">Link New Card or Account</span>
        </button>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <Wallet size={28} weight="bold" />
          </div>
          <div>
            <h3 className="font-black text-gray-900 text-[16px]">Wafrivet Wallet</h3>
            <p className="text-[14px] text-gray-400 font-medium">Balance: ₦124,500.00</p>
          </div>
        </div>
        <button className="px-6 py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-[13px] hover:bg-gray-100 transition-all">
          Manage Wallet
        </button>
      </div>
    </div>
  );
}
