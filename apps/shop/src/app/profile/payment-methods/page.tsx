"use client";

import { CreditCard, ShieldCheck } from "@phosphor-icons/react";

export default function PaymentMethodsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Payment Methods</h2>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-[#2D4D31]/5 rounded-2xl flex items-center justify-center text-[#2D4D31] mx-auto">
          <CreditCard size={32} weight="bold" />
        </div>
        <div>
          <h3 className="text-[18px] font-black text-gray-900 mb-2">Pay at checkout with Paystack</h3>
          <p className="text-[14px] text-gray-500 leading-relaxed max-w-md mx-auto">
            Wafrivet does not store card numbers on our servers. When you place an order, you will be
            redirected to Paystack to pay securely by card or bank transfer.
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <ShieldCheck size={18} weight="bold" />
          <span className="text-[11px] font-black uppercase tracking-widest">PCI-DSS via Paystack</span>
        </div>
      </div>
    </div>
  );
}
