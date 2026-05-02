"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  User,
  DotsThreeVertical,
  Circle,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const TRANSACTIONS_DATA = [
  { id: "TX-9281", user: "Emeka Obi", type: "Out", category: "Marketplace Order", amount: "₦12,500", status: "Success", date: "2 mins ago" },
  { id: "TX-9280", user: "John Dagogo", type: "Out", category: "BNPL Repayment", amount: "₦15,515", status: "Success", date: "1 hour ago" },
  { id: "TX-9279", user: "Musa Ibrahim", type: "In", category: "Wallet Topup", amount: "₦50,000", status: "Success", date: "3 hours ago" },
  { id: "TX-9278", user: "Sarah Ahmed", type: "Out", category: "Marketplace Order", amount: "₦22,000", status: "Pending", date: "5 hours ago" },
  { id: "TX-9277", user: "Emeka Obi", type: "In", category: "Referral Bonus", amount: "₦1,000", status: "Success", date: "1 day ago" },
];

export default function WalletTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredTransactions = TRANSACTIONS_DATA.filter(tx => {
    const matchesSearch = 
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All Types" || tx.type === selectedType;
    const matchesStatus = selectedStatus === "All Status" || tx.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Wallet Transactions</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Live ledger of all currency movement within the Wafrivet ecosystem</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Ledger
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Volume Today", value: "₦4.2M", sub: "Network throughput", color: "blue" },
          { label: "Outflow", value: "₦2.8M", sub: "Marketplace orders", color: "red" },
          { label: "Inflow", value: "₦1.4M", sub: "Wallet topups", color: "emerald" },
          { label: "Pending TXs", value: "12", sub: "Requiring settlement", color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "red" ? "text-red-500" : "text-orange-500"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID, User or Category..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {["All Types", "In", "Out"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Status", "Success", "Pending"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedType("All Types");
            setSelectedStatus("All Status");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">TX ID</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Entity & Purpose</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Currency Flow</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Log Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <span className="text-[14px] font-black text-gray-900 tracking-tight whitespace-nowrap">{tx.id}</span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <User size={12} weight="bold" className="text-gray-400" />
                        <span className="text-[13px] font-bold text-gray-900 truncate whitespace-nowrap">{tx.user}</span>
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium truncate whitespace-nowrap ml-5">{tx.category}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center",
                        tx.type === "In" ? "bg-emerald-50 text-emerald-500" : "bg-red-50 text-red-500"
                      )}>
                        {tx.type === "In" ? <ArrowDownLeft size={12} weight="bold" /> : <ArrowUpRight size={12} weight="bold" />}
                      </div>
                      <span className="text-[15px] font-black text-gray-900 whitespace-nowrap">{tx.amount}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <Circle size={8} weight="fill" className={cn(
                        tx.status === "Success" ? "text-emerald-500" : "text-orange-500 animate-pulse"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600 whitespace-nowrap">{tx.status}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <span className="text-[12px] font-bold text-gray-400 whitespace-nowrap">{tx.date}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredTransactions.length} of {TRANSACTIONS_DATA.length} transactions</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 2568].map((page, i) => (
              <button key={i} className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-gray-50"
              )}>
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
