"use client";

import { Question, Phone, Envelope, ChatCircleText, ArrowRight, BookOpen, Headset } from "@phosphor-icons/react";

const FAQS = [
  { q: "How do I update my stock levels?", a: "Go to the Inventory tab, click 'Edit' on any product, and update the current count. Alternatively, use the 'Sync' button to pull latest data." },
  { q: "When are payouts processed?", a: "Payouts are automatically processed every Tuesday for all completed orders from the previous week." },
  { q: "How do I handle a rejected order?", a: "Rejected orders are returned to the system and reassigned to other nearby branches. You can view rejections in your order history statement." },
];

export default function SupportPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Support & Help</h1>
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">Get help with your operations and branch account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Options */}
        <div className="space-y-6">
           <div className="bg-[#2D4D31] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl shadow-[#2D4D31]/20">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                 <Headset size={28} weight="duotone" />
              </div>
              <h3 className="text-[20px] font-black tracking-tight mb-2">Need Immediate Help?</h3>
              <p className="text-[13px] text-emerald-100 opacity-80 mb-8 leading-relaxed">Our specialized branch support team is available 24/7 to help with orders or logistics.</p>
              <button className="w-full py-4 bg-white text-[#2D4D31] rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all">
                Call Support <Phone size={18} weight="bold" />
              </button>
           </div>

           <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                    <Envelope size={22} weight="bold" />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 text-[14px]">Email Support</p>
                    <p className="text-[11px] text-gray-600 font-bold uppercase">ops@wafrivet.com</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                    <ChatCircleText size={22} weight="bold" />
                 </div>
                 <div>
                    <p className="font-bold text-gray-900 text-[14px]">Live Chat</p>
                    <p className="text-[11px] text-gray-600 font-bold uppercase">Average wait: 2 mins</p>
                 </div>
              </div>
           </div>
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                 <BookOpen size={22} weight="bold" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Frequently Asked Questions</h3>
           </div>
           
           <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-3xl group">
                   <h4 className="font-bold text-gray-900 text-[15px] mb-2 flex items-center justify-between">
                     {faq.q}
                     <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                   </h4>
                   <p className="text-[13px] text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
