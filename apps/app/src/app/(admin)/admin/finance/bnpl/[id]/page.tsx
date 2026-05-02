"use client";

import { 
  CaretLeft, 
  Wallet, 
  Receipt, 
  Clock, 
  User, 
  Phone, 
  ChatCircleText, 
  Warning, 
  ShieldCheck, 
  ChartLineUp, 
  ArrowRight,
  DotsThreeVertical,
  Money,
  Bank,
  CheckCircle,
  CurrencyNgn,
  IdentificationCard,
  WarningCircle
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getBNPLData = (id: string) => {
  return {
    id: id || "BNPL-101",
    user: "John Dagogo",
    amount: "₦14,500",
    daysOverdue: "4 days",
    dueDate: "May 1, 2024",
    status: "Overdue",
    risk: "Medium",
    phone: "+234 801 234 5678",
    state: "Lagos",
    history: [
      { id: 1, text: "Loan Disbursement", time: "30 days ago", amount: "₦14,500", type: "credit" },
      { id: 2, text: "Automated Reminder sent", time: "5 days ago", amount: "-", type: "comms" },
      { id: 3, text: "Payment Term Mismatch", time: "4 days ago", amount: "-", type: "alert" },
      { id: 4, text: "Grace Period Expired", time: "1 day ago", amount: "-", type: "alert" },
    ],
    stats: {
      totalBorrowed: "₦124,000",
      repaid: "₦109,500",
      creditScore: 680,
      latePayments: 2
    }
  };
};

export default function BNPLRecoveryPage({ params }: { params: { id: string } }) {
  const data = getBNPLData(params.id);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-10 h-10 rounded-2xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all bg-white/50">
            <CaretLeft size={20} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-[0.2em]">Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <WarningCircle size={18} weight="bold" /> Flag as Default
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/10 ml-2">
            <IdentificationCard size={18} weight="bold" /> Verify Collateral
          </button>
        </div>
      </div>

      {/* Financial Pulse Header */}
      <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-32 h-32 rounded-[40px] bg-red-50 text-red-500 flex items-center justify-center shadow-inner border border-red-100">
            <Wallet size={64} weight="duotone" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <span className="px-4 py-1.5 bg-red-50 text-red-500 border border-red-100 rounded-full text-[10px] font-black uppercase tracking-widest">
                {data.status} Recovery
              </span>
              <span className="px-4 py-1.5 bg-orange-50 text-orange-500 border border-orange-100 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <Warning size={12} weight="fill" /> Risk Level: {data.risk}
              </span>
            </div>
            <h1 className="text-[42px] font-black text-gray-900 tracking-tight leading-none mb-3">{data.amount} Due</h1>
            <p className="text-[16px] text-gray-500 font-medium">{data.user} · Due on {data.dueDate}</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Aging Factor</span>
            <div className="text-[32px] font-black text-red-500 tracking-tight leading-none">{data.daysOverdue}</div>
            <div className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Post-Grace Period</div>
          </div>
        </div>
      </div>

      {/* Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Log Details */}
        <div className="lg:col-span-8 space-y-10">
          {/* Recovery Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Borrowed</span>
              <div className="text-[24px] font-black text-gray-900 leading-none mb-1">{data.stats.totalBorrowed}</div>
              <span className="text-[11px] font-bold text-gray-400">Total Lifecycle</span>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Repaid</span>
              <div className="text-[24px] font-black text-emerald-500 leading-none mb-1">{data.stats.repaid}</div>
              <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-tight">88% Repayment Rate</span>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Credit Score</span>
              <div className="text-[24px] font-black text-blue-500 leading-none mb-1">{data.stats.creditScore}</div>
              <span className="text-[11px] font-bold text-gray-400">Moderate Trust</span>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Loan Transaction Lifecycle</h3>
            <div className="space-y-4">
              {data.history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-50 hover:border-[#2D4D31]/20 transition-all group cursor-default">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-white",
                      item.type === "credit" ? "text-emerald-500" : item.type === "alert" ? "text-red-500" : "text-blue-500"
                    )}>
                      {item.type === "credit" ? <CurrencyNgn size={20} weight="bold" /> : <Clock size={20} weight="bold" />}
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900">{item.text}</p>
                      <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{item.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-black text-gray-900">{item.amount}</p>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">System Logged</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">KYC & Collateral Assets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-[32px] border border-emerald-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <IdentificationCard size={24} weight="bold" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900 leading-none mb-1">Identity Verified</p>
                  <span className="text-[11px] text-emerald-500 font-black uppercase tracking-widest">BVN & NIN Matched</span>
                </div>
              </div>
              <div className="p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                  <Bank size={24} weight="bold" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-gray-900 leading-none mb-1">Collateral: Herd</p>
                  <span className="text-[11px] text-blue-500 font-black uppercase tracking-widest">42 Animals Insured</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-4 space-y-10">
          {/* Recovery Protocols */}
          <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 text-white/40">Recovery Protocols</h3>
            <div className="space-y-2">
              {[
                { icon: Phone, text: "Initiate Direct Call" },
                { icon: ChatCircleText, text: "Send Repayment SMS" },
                { icon: Receipt, text: "Extend Grace Period" },
              ].map((btn, i) => (
                <button key={i} className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-start px-5 gap-3">
                  <btn.icon size={18} /> {btn.text}
                </button>
              ))}
              <button className="w-full py-4 bg-red-500 hover:bg-red-600 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all mt-4">
                Escalate to Collection
              </button>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6 text-gray-400">Recovery Risk Index</h4>
            <div className="flex items-center justify-center h-32 relative">
               <div className="w-24 h-24 rounded-full border-8 border-gray-50 border-t-orange-500 animate-[spin_3s_linear_infinite]" />
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-[20px] font-black text-gray-900">42%</span>
                 <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Volatility</span>
               </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-6 font-medium leading-relaxed">
              Based on historical behavior, the likelihood of repayment within 48 hours is <span className="text-orange-500 font-bold">Moderate</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
