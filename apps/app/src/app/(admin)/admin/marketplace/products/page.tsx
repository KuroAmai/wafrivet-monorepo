"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  CaretDown,
  DownloadSimple,
  Package,
  Storefront,
  SealCheck,
  Warning,
  DotsThreeVertical,
  Circle,
  X
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const PRODUCTS_DATA = [
  { name: "Oxytetracycline 20%", generic: "Oxytetracycline", nafdac: "A4-1284", category: "Antibiotics", chemist: "Pharmacy Plus", price: "₦8,500", stock: 124, verified: true, status: "Active", listed: "May 12" },
  { name: "Ivermectin 1%", generic: "Ivermectin", nafdac: "B2-9921", category: "Dewormers", chemist: "Lekki Pharma", price: "₦4,200", stock: 42, verified: false, status: "Active", listed: "May 10" },
  { name: "Multivitamin Inj", generic: "Vitamins", nafdac: "C1-4451", category: "Supplements", chemist: "City Agro", price: "₦6,800", stock: 0, verified: true, status: "Active", listed: "May 08" },
  { name: "Penicillin G", generic: "Penicillin", nafdac: "D9-8821", category: "Antibiotics", chemist: "Pharmacy Plus", price: "₦12,000", stock: 15, verified: true, status: "Flagged", listed: "May 05" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredProducts = PRODUCTS_DATA.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nafdac.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.chemist.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    const matchesStatus = selectedStatus === "All Status" || product.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Product Catalog</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage quality and compliance of all marketplace listings</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export Catalog
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Products", value: "2,402", color: "gray" },
          { label: "NAFDAC Verified", value: "1,892", color: "emerald" },
          { label: "Pending", value: "420", color: "orange" },
          { label: "Flagged", value: "12", color: "red" },
          { label: "Out of Stock", value: "78", color: "gray" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[20px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "orange" ? "text-orange-500" :
              stat.color === "red" ? "text-red-500" : "text-gray-900"
            )}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search product name or NAFDAC no..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {["All Categories", "Antibiotics", "Dewormers", "Supplements"].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Status", "Active", "Flagged"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All Categories");
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Product & Generic</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">NAFDAC / Cat</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Source Chemist</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Financials</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Inventory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product, i) => (
                <tr key={i} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] group-hover:bg-white transition-all shadow-none group-hover:shadow-sm flex-shrink-0">
                        <Package size={18} weight="duotone" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate">{product.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium truncate">{product.generic}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-black text-gray-900 tracking-tight whitespace-nowrap">{product.nafdac}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{product.category}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 flex-shrink-0">
                        <Storefront size={12} weight="bold" />
                      </div>
                      <span className="text-[13px] font-bold text-gray-600 truncate whitespace-nowrap">{product.chemist}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-[#2D4D31] leading-none mb-1 whitespace-nowrap">{product.price}</span>
                      {product.verified && (
                        <div className="flex items-center gap-1 text-emerald-500">
                          <SealCheck size={10} weight="fill" />
                          <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <span className={cn(
                      "inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border",
                      product.status === "Active" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "text-[14px] font-black leading-none mb-1 whitespace-nowrap",
                        product.stock === 0 ? "text-red-500" : "text-gray-900"
                      )}>{product.stock}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Units</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredProducts.length} of {PRODUCTS_DATA.length} products</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 600].map((page, i) => (
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
