"use client";

import { Package, MagnifyingGlass, Funnel, ArrowClockwise, Plus, Warning, ShieldCheck } from "@phosphor-icons/react";
import { useState } from "react";

const INVENTORY = [
  { id: 1, name: "Oxytetracycline 20%", category: "Antibiotics", stock: 42, min: 20, status: "Healthy", price: "₦12,500" },
  { id: 2, name: "Ivermectin 1%", category: "Antiparasitic", stock: 3, min: 10, status: "Critical", price: "₦8,200" },
  { id: 3, name: "Digital Ear Tags", category: "Equipment", stock: 12, min: 15, status: "Low", price: "₦2,500" },
  { id: 4, name: "Multivitamin Injection", category: "Supplements", stock: 85, min: 30, status: "Healthy", price: "₦4,800" },
  { id: 5, name: "Penicillin G", category: "Antibiotics", stock: 18, min: 15, status: "Low", price: "₦15,000" },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Inventory Management</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage your branch stock levels and catalog</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[#2D4D31] text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#243f28] transition-all shadow-lg shadow-[#2D4D31]/10">
          <Plus size={16} weight="bold" /> Add New Item
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Filters */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products, SKUs..." 
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-[14px] font-medium focus:ring-2 focus:ring-[#2D4D31]/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Funnel size={16} /> Filters
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[12px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <ArrowClockwise size={16} /> Sync
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stock Level</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Unit Price</th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {INVENTORY.map((item) => (
                <tr key={item.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Critical' ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-500'}`}>
                        <Package size={20} weight="duotone" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-[14px]">{item.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium">SKU: WF-INV-{item.id}0{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[12px] font-bold text-gray-600 px-3 py-1 bg-gray-100 rounded-full">{item.category}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between w-32">
                        <span className={`text-[12px] font-black ${item.status === 'Critical' ? 'text-red-500' : item.status === 'Low' ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {item.stock} / {item.min}
                        </span>
                        <span className="text-[10px] font-bold text-gray-300 uppercase">Min</span>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${item.status === 'Critical' ? 'bg-red-500' : item.status === 'Low' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min((item.stock / (item.min * 2)) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-bold text-gray-900">
                    {item.price}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
