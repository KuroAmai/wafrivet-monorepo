"use client";

import { TrendUp, ChartPieSlice, SealWarning, ArrowRight, Package, Users, MapPin } from "@phosphor-icons/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const CATEGORY_DATA = [
   { name: 'Antibiotics', value: 400, color: '#2D4D31' },
   { name: 'Supplements', value: 300, color: '#10B981' },
   { name: 'Equipment', value: 200, color: '#F59E0B' },
   { name: 'Other', value: 100, color: '#9CA3AF' },
];

const TOP_PRODUCTS = [
   { name: "Oxytetracycline 20%", sales: 124, growth: "+12%" },
   { name: "Multivitamin Injection", sales: 89, growth: "+8%" },
   { name: "Ivermectin 1%", sales: 65, growth: "+22%" },
];

export default function InsightsPage() {
   return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
         <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">Operational Insights</h1>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Deep analytics and demand forecasting for your branch</p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sales by Category */}
            <div className="lg:col-span-4 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col items-center">
               <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8 w-full text-left">Sales by Category</h3>
               <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={CATEGORY_DATA}
                           cx="50%"
                           cy="50%"
                           innerRadius={65}
                           outerRadius={90}
                           paddingAngle={-15}
                           strokeWidth={0}
                           cornerRadius={12}
                           dataKey="value"
                        >
                           {CATEGORY_DATA.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="grid grid-cols-2 gap-4 w-full mt-8">
                  {CATEGORY_DATA.map((entry) => (
                     <div key={entry.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{entry.name}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Demand Forecasting */}
            <div className="lg:col-span-8 bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 flex flex-col">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Regional Demand Forecast</h3>
                  <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-2 rounded-xl text-[12px] font-bold">
                     <TrendUp size={16} weight="bold" /> High Accuracy
                  </div>
               </div>

               <div className="space-y-6 flex-1">
                  <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 group hover:border-[#2D4D31]/20 transition-all cursor-pointer">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31] shadow-sm">
                              <MapPin size={22} weight="duotone" />
                           </div>
                           <h4 className="font-bold text-gray-900 text-[15px]">Lekki North Cattle Clusters</h4>
                        </div>
                        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">+42% Demand Spike</span>
                     </div>
                     <p className="text-[13px] text-gray-500 leading-relaxed mb-4">Increased rainfall predicted next week. High risk of respiratory infections. Stock up on Penicillin and broad-spectrum antibiotics.</p>
                     <button className="flex items-center gap-2 text-[12px] font-black text-[#2D4D31] uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        Restock Suggested Items <ArrowRight size={14} weight="bold" />
                     </button>
                  </div>

                  <div className="p-6 border border-gray-100 rounded-[32px]">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                              <Users size={22} weight="duotone" />
                           </div>
                           <h4 className="font-bold text-gray-900 text-[15px]">New Farmer Registrations</h4>
                        </div>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">+18% this month</span>
                     </div>
                     <p className="text-[13px] text-gray-500 leading-relaxed">Local poultry association added 12 new farms in your delivery zone. Vaccine demand expected to increase.</p>
                  </div>
               </div>
            </div>
         </div>

         

         {/* Top Products */}
         <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Best Selling Products</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {TOP_PRODUCTS.map((product) => (
                  <div key={product.name} className="p-6 bg-gray-50 rounded-[32px] border border-gray-50 flex flex-col gap-4">
                     <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31] shadow-sm">
                           <Package size={22} weight="duotone" />
                        </div>
                        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">{product.growth}</span>
                     </div>
                     <div>
                        <h4 className="font-bold text-gray-900 text-[15px] mb-0.5">{product.name}</h4>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">{product.sales} Sales this month</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
}
