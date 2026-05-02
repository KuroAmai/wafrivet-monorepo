"use client";

import { CurrencyNgn, TrendUp, Calendar, ArrowRight, DownloadSimple, CreditCard, Bank } from "@phosphor-icons/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DATA = [
  { day: 'Mon', amount: 45000 },
  { day: 'Tue', amount: 52000 },
  { day: 'Wed', amount: 38000 },
  { day: 'Thu', amount: 65000 },
  { day: 'Fri', amount: 48000 },
  { day: 'Sat', amount: 30000 },
  { day: 'Sun', amount: 25000 },
];

const PAYOUTS = [
  { id: "PAY-001", date: "Oct 28, 2025", amount: "₦142,500", status: "Paid", bank: "Zenith Bank" },
  { id: "PAY-002", date: "Oct 21, 2025", amount: "₦128,000", status: "Paid", bank: "Zenith Bank" },
  { id: "PAY-003", date: "Oct 14, 2025", amount: "₦156,200", status: "Paid", bank: "Zenith Bank" },
];

export default function EarningsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Earnings & Payouts</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage your branch revenue and financial status</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
            <DownloadSimple size={16} weight="bold" /> Statement
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Revenue Overview</h3>
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Weekly sales performance</p>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                <Calendar size={16} className="text-[#2D4D31]" />
                <span className="text-[12px] font-bold text-gray-600">Oct 26 - Nov 01</span>
             </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F9FAFB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#F9FAFB' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-900 text-white p-3 rounded-2xl text-[12px] font-black shadow-xl">
                          ₦{payload[0].value?.toLocaleString()}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={40}>
                  {DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#2D4D31' : '#F3F4F6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-[#2D4D31] rounded-[40px] p-8 text-white relative overflow-hidden shadow-xl shadow-[#2D4D31]/20">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60 mb-4">Available for Payout</h4>
            <div className="flex items-end gap-2 mb-8">
              <span className="text-[32px] font-black tracking-tight leading-none">₦42,500</span>
              <span className="text-[14px] font-bold text-emerald-300 opacity-80 mb-1 flex items-center gap-1">
                <TrendUp size={14} weight="bold" /> +12%
              </span>
            </div>
            <button className="w-full py-4 bg-white text-[#2D4D31] rounded-2xl font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all">
              Withdraw Now <ArrowRight size={18} weight="bold" />
            </button>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                   <Bank size={24} weight="duotone" />
                </div>
                <div>
                   <h4 className="font-bold text-gray-900 text-[14px]">Settlement Account</h4>
                   <p className="text-[11px] text-gray-400 font-bold uppercase">Zenith Bank · ***9281</p>
                </div>
             </div>
             <button className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline">
               Change Bank Details
             </button>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50">
           <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Payout History</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {PAYOUTS.map((payout) => (
            <div key={payout.id} className="p-8 flex items-center justify-between hover:bg-gray-50/30 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                   <CreditCard size={24} weight="duotone" />
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-gray-900 text-[16px] tracking-tight">{payout.amount}</h4>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-widest">{payout.status}</span>
                   </div>
                   <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{payout.date} · {payout.bank}</p>
                </div>
              </div>
              <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 group-hover:bg-gray-900 group-hover:text-white transition-all">
                 <ArrowRight size={20} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
