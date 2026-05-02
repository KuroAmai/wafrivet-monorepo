"use client";

import { useState } from "react";
import { 
  MagnifyingGlass, 
  TrendUp, 
  ChartLineUp, 
  CheckCircle, 
  Info,
  User,
  ArrowRight,
  ShieldCheck,
  Warning,
  Heartbeat,
  X
} from "@phosphor-icons/react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { cn } from "@/lib/utils";

const HISTORY_DATA = [
  { month: 'Jan', score: 620 },
  { month: 'Feb', score: 640 },
  { month: 'Mar', score: 635 },
  { month: 'Apr', score: 680 },
  { month: 'May', score: 720 },
];

export default function CreditScoresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>({
    name: "Emeka Obi",
    phone: "+234 801 234 5678",
    score: 720,
    status: "Excellent",
    factors: [
      { label: "Repayment History", value: "98%", status: "Good", icon: CheckCircle, color: "emerald" },
      { label: "Animal Health Log", value: "12/mo", status: "Good", icon: Heartbeat, color: "emerald" },
      { label: "Market Activity", value: "High", status: "Good", icon: ChartLineUp, color: "emerald" },
      { label: "Account Age", value: "14m", status: "Fair", icon: Info, color: "blue" },
    ],
    recommendations: [
      "Maintain 100% on-time repayment for next 3 months to reach 750+",
      "Log weekly weights for registered cattle to improve data trust score",
      "Diversify purchases across multiple chemists"
    ]
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Credit Intelligence</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Analyze and manage creditworthiness across the platform</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-gray-100 focus-within:border-[#2D4D31]/20 transition-all shadow-sm w-[400px]">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search user profile..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Profiles", value: "1,240", sub: "Active scores", color: "blue" },
          { label: "Avg Platform", value: "642", sub: "Score mean", color: "emerald" },
          { label: "High Trust", value: "482", sub: "Score > 700", color: "purple" },
          { label: "Risk Alerts", value: "24", sub: "Scores < 400", color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-[#2D4D31]/20 transition-all">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">{stat.label}</span>
            <div className={cn(
              "text-[24px] font-black leading-none group-hover:scale-105 transition-transform",
              stat.color === "blue" ? "text-blue-500" :
              stat.color === "emerald" ? "text-emerald-500" :
              stat.color === "purple" ? "text-purple-500" : "text-red-500"
            )}>{stat.value}</div>
            <p className="text-[11px] font-bold text-gray-400 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Profile Overview */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Profile Insight</span>
              <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                  <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={452} strokeDashoffset={452 * (1 - (selectedUser.score - 300) / 550)} className="text-[#2D4D31] transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[42px] font-black text-gray-900 leading-none tracking-tighter">{selectedUser.score}</span>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">{selectedUser.status}</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-50 p-6 rounded-[32px] border border-gray-50 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                    <User size={20} weight="bold" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-black text-gray-900 text-[16px] tracking-tight leading-none mb-1">{selectedUser.name}</h3>
                    <p className="text-[11px] text-gray-500 font-medium">{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Trust Level</span>
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <ShieldCheck size={16} weight="fill" />
                    <span className="text-[11px] font-black uppercase">High Trust</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="text-[14px] font-black text-gray-900 uppercase tracking-widest mb-8">Score Progression</h3>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={HISTORY_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9CA3AF'}} dy={10} />
                    <YAxis domain={[300, 850]} axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9CA3AF'}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Line type="monotone" dataKey="score" stroke="#2D4D31" strokeWidth={4} dot={{ r: 5, fill: "#2D4D31", strokeWidth: 2, stroke: "#fff" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Factors */}
              <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[12px] font-black text-gray-900 uppercase tracking-widest mb-6 px-2">Scoring Factors</h3>
                <div className="space-y-3">
                  {selectedUser.factors.map((factor: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3.5 bg-gray-50/50 rounded-2xl border border-gray-50 group hover:bg-white hover:border-[#2D4D31]/20 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          factor.color === "emerald" ? "bg-emerald-50 text-emerald-500" : "bg-blue-50 text-blue-500"
                        )}>
                          <factor.icon size={16} weight="bold" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-gray-900 leading-none mb-0.5">{factor.label}</span>
                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{factor.status}</span>
                        </div>
                      </div>
                      <span className={cn(
                        "text-[13px] font-black",
                        factor.color === "emerald" ? "text-emerald-500" : "text-blue-500"
                      )}>{factor.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm">
                <h3 className="text-[12px] font-black text-gray-900 uppercase tracking-widest mb-6 px-2">Growth Directives</h3>
                <div className="space-y-4">
                  {selectedUser.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2D4D31] group-hover:text-white transition-all">
                        <CheckCircle size={12} weight="bold" />
                      </div>
                      <p className="text-[12px] font-medium text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
