"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Cow, 
  ShoppingCart, 
  TrendUp, 
  SealWarning, 
  ArrowRight,
  ArrowUpRight,
  Clock,
  Money,
  Receipt,
  ShieldCheck,
  Warning,
  Robot,
  PhoneCall,
  CheckCircle,
  CaretRight,
  CaretLeft
} from "@phosphor-icons/react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  AreaChart,
  Area
} from 'recharts';

const ORDERS_DATA = [
  { day: 'Mon', value: 45 },
  { day: 'Tue', value: 52 },
  { day: 'Wed', value: 38 },
  { day: 'Thu', value: 65 },
  { day: 'Fri', value: 48 },
  { day: 'Sat', value: 25 },
  { day: 'Sun', value: 30 },
];

const REVENUE_DATA = [
  { date: '1', value: 120000 },
  { date: '5', value: 150000 },
  { date: '10', value: 130000 },
  { date: '15', value: 180000 },
  { date: '20', value: 210000 },
  { date: '25', value: 190000 },
  { date: '30', value: 240000 },
];

const SIGNUPS_DATA = [
  { name: 'Mon', farmer: 12, vet: 4, chemist: 2, distributor: 1 },
  { name: 'Tue', farmer: 15, vet: 5, chemist: 3, distributor: 0 },
  { name: 'Wed', farmer: 8, vet: 3, chemist: 1, distributor: 2 },
  { name: 'Thu', farmer: 18, vet: 7, chemist: 4, distributor: 1 },
  { name: 'Fri', farmer: 14, vet: 6, chemist: 2, distributor: 0 },
  { name: 'Sat', farmer: 6, vet: 2, chemist: 1, distributor: 0 },
  { name: 'Sun', farmer: 9, vet: 3, chemist: 2, distributor: 1 },
];

const ACTIVITY_FEED = [
  { id: "act_1001", time: "2 mins ago", type: "order", icon: ShoppingCart, text: "New order placed", subtext: "Emeka Obi → Pharmacy Plus", value: "₦8,500", color: "text-blue-500", bg: "bg-blue-50" },
  { id: "act_1002", time: "5 mins ago", type: "animal", icon: Cow, text: "Animal registered", subtext: "WAF-2026-00312 · Cattle", value: "Lagos", color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "act_1003", time: "8 mins ago", type: "diagnosis", icon: Robot, text: "Diagnosis session", subtext: "Camera · Moderate Severity", value: "Oxytetracycline", color: "text-purple-500", bg: "bg-purple-50" },
  { id: "act_1004", time: "12 mins ago", type: "bnpl", icon: Receipt, text: "BNPL agreement created", subtext: "₦12,000", value: "Due May 16", color: "text-orange-500", bg: "bg-orange-50" },
  { id: "act_1005", time: "15 mins ago", type: "delivery", icon: CheckCircle, text: "Order delivered", subtext: "#ORD-0091", value: "Logged to herd", color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "act_1006", time: "18 mins ago", type: "ussd", icon: PhoneCall, text: "USSD session", subtext: "Pay order reference", value: "Completed", color: "text-gray-500", bg: "bg-gray-50" },
  { id: "act_1007", time: "22 mins ago", type: "alert", icon: Warning, text: "Stockout alert", subtext: "Ivermectin · Pharmacy King", value: "3 days left", color: "text-red-500", bg: "bg-red-50" },
  { id: "act_1008", time: "30 mins ago", type: "order", icon: ShoppingCart, text: "Order confirmed", subtext: "Musa Ibrahim → Lekki Pharma", value: "₦4,200", color: "text-blue-500", bg: "bg-blue-50" },
  { id: "act_1009", time: "45 mins ago", type: "user", icon: Users, text: "New vet verified", subtext: "Dr. Adebayo · Oyo State", value: "Verified", color: "text-purple-500", bg: "bg-purple-50" },
  { id: "act_1010", time: "1 hr ago", type: "finance", icon: Money, text: "Settlement processed", subtext: "Pharmacy Plus", value: "₦450k", color: "text-[#2D4D31]", bg: "bg-[#2D4D31]/5" },
  { id: "act_1011", time: "1.5 hrs ago", type: "ussd", icon: PhoneCall, text: "USSD Session", subtext: "Animal Registration", value: "Success", color: "text-gray-500", bg: "bg-gray-50" },
  { id: "act_1012", time: "2 hrs ago", type: "alert", icon: Warning, text: "Critical Health Alert", subtext: "High Fever · Kaduna", value: "Escalated", color: "text-red-500", bg: "bg-red-50" },
  { id: "act_1013", time: "3 hrs ago", type: "order", icon: ShoppingCart, text: "Bulk Order", subtext: "Distributor X → 12 Chemists", value: "₦1.2M", color: "text-blue-500", bg: "bg-blue-50" },
  { id: "act_1014", time: "4 hrs ago", type: "user", icon: Users, text: "New Farmer Signup", subtext: "John Dagogo · Rivers", value: "Awaiting Ver.", color: "text-purple-500", bg: "bg-purple-50" },
  { id: "act_1015", time: "5 hrs ago", type: "finance", icon: Receipt, text: "Loan Repayment", subtext: "Emeka Obi", value: "₦14,500", color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "act_1016", time: "6 hrs ago", type: "delivery", icon: CheckCircle, text: "Shipment Arrived", subtext: "Cold Chain Verified", value: "Lagos Hub", color: "text-[#2D4D31]", bg: "bg-[#2D4D31]/5" },
  { id: "act_1017", time: "7 hrs ago", type: "diagnosis", icon: Robot, text: "AI Diagnosis", subtext: "Poultry · Low Severity", value: "Nutrition", color: "text-purple-500", bg: "bg-purple-50" },
  { id: "act_1018", time: "8 hrs ago", type: "order", icon: ShoppingCart, text: "Cancelled Order", subtext: "#ORD-9921", value: "Refunded", color: "text-red-500", bg: "bg-red-50" },
  { id: "act_1019", time: "9 hrs ago", type: "ussd", icon: PhoneCall, text: "USSD Session", subtext: "Check Balance", value: "Success", color: "text-gray-500", bg: "bg-gray-50" },
  { id: "act_1020", time: "10 hrs ago", type: "user", icon: Users, text: "Profile Updated", subtext: "Sarah Ahmed", value: "Success", color: "text-blue-500", bg: "bg-blue-50" },
];

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const currentItems = ACTIVITY_FEED.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-10">
      {/* Header code stays the same... (I will replace the whole component body below) */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">Platform Overview</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Real-time system health and operation status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-[#2D4D31] text-white px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-[#2D4D31]/20">
            Export Global Report
          </button>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {[
          { label: "Total Users", value: "4,284", sub: "↑ 124 new this week", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Active Today", value: "892", sub: "342 sessions today", icon: Clock, color: "text-purple-500", bg: "bg-purple-50" },
          { label: "Total Animals", value: "12,402", sub: "↑ 45 registered today", icon: Cow, color: "text-emerald-500", bg: "bg-emerald-50" },
          { label: "Orders Today", value: "158", sub: "120 completed", icon: ShoppingCart, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "GMV Today", value: "₦4.2M", sub: "₦28M this week", icon: Money, color: "text-[#2D4D31]", bg: "bg-[#2D4D31]/5" },
          { label: "Active Alerts", value: "24", sub: "8 critical", icon: Warning, color: "text-red-500", bg: "bg-red-50" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon size={22} weight="duotone" />
              </div>
              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
            </div>
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{card.label}</h3>
            <div className="text-[24px] font-black text-gray-900 leading-none mb-1 tracking-tight">{card.value}</div>
            <p className="text-[11px] font-bold text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Orders Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight">Orders This Week</h3>
            <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">+12% vs last week</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ORDERS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9CA3AF'}} dy={10} />
                <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="value" fill="#2D4D31" radius={[6, 6, 6, 6]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight">Revenue This Month</h3>
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">₦4.2M Total</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D4D31" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2D4D31" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9CA3AF'}} dy={10} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="value" stroke="#2D4D31" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signups Chart */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight">New Signups by Role</h3>
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2D4D31]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#4c8154]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#76a57f]" />
            </div>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SIGNUPS_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#9CA3AF'}} dy={10} />
                <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="farmer" stackId="a" fill="#2D4D31" radius={[0, 0, 0, 0]} barSize={24} />
                <Bar dataKey="vet" stackId="a" fill="#4c8154" radius={[0, 0, 0, 0]} barSize={24} />
                <Bar dataKey="chemist" stackId="a" fill="#76a57f" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed and Action Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Live Activity Feed */}
        <div className="lg:col-span-7 bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-[20px] font-black text-gray-900 tracking-tight">Live Activity Feed</h3>
            <Link href="/admin/platform/audit" className="text-[11px] font-black text-[#2D4D31] uppercase tracking-[0.2em] flex items-center gap-2 hover:underline">
              View Audit Log <CaretRight size={14} weight="bold" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {currentItems.map((item, i) => (
              <Link key={i} href={`/admin/activity/${item.id}`} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-colors group">
                <div className="flex items-center gap-5">
                  <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} weight="duotone" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-gray-900 group-hover:text-[#2D4D31] transition-colors">{item.text}</span>
                    <span className="text-[12px] text-gray-500">{item.subtext}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-300 group-hover:text-[#2D4D31] group-hover:bg-white transition-all">
                    <ArrowRight size={16} weight="bold" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, ACTIVITY_FEED.length)} of {ACTIVITY_FEED.length}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <CaretLeft size={16} weight="bold" />
              </button>
              <div className="flex items-center gap-1">
                {[...Array(Math.ceil(ACTIVITY_FEED.length / itemsPerPage))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                      currentPage === i + 1 
                        ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" 
                        : "text-gray-400 hover:bg-white hover:text-gray-900"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(Math.ceil(ACTIVITY_FEED.length / itemsPerPage), p + 1))}
                disabled={currentPage === Math.ceil(ACTIVITY_FEED.length / itemsPerPage)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-gray-100 bg-white text-gray-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Requiring Action */}
        <div className="lg:col-span-5 space-y-10">
          {/* BNPL Overdue */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">BNPL Overdue</h3>
            <div className="space-y-6">
              {[
                { id: "BNPL-101", name: "John Dagogo", amount: "₦14,500" },
                { id: "BNPL-102", name: "Musa Ibrahim", amount: "₦8,200" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-red-50 rounded-[32px] border border-red-100">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">{alert.name}</span>
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest mt-0.5">{alert.amount} Overdue</span>
                  </div>
                  <Link 
                    href={`/admin/finance/bnpl/${alert.id}`}
                    className="bg-white text-red-500 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-red-50 transition-colors"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Unverified Chemists */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Unverified Chemists</h3>
            <div className="space-y-6">
              {[
                { id: "CHM-881", name: "Lekki Pharma", loc: "Lagos" },
                { id: "CHM-882", name: "City Agro", loc: "Kano" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[32px] border border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">{alert.name}</span>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{alert.loc} · Pending</span>
                  </div>
                  <Link 
                    href={`/admin/marketplace/verification/${alert.id}`}
                    className="bg-[#2D4D31] text-white px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:opacity-90 transition-colors"
                  >
                    Verify
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Animal Alerts */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight mb-8">Critical Vitals</h3>
            <div className="space-y-6">
              {[
                { id: "WAF-992", issue: "High Fever" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-orange-50 rounded-[32px] border border-orange-100">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-gray-900">{alert.id}</span>
                    <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-0.5">{alert.issue} Alert</span>
                  </div>
                  <Link 
                    href={`/admin/livestock/vitals/${alert.id}`}
                    className="bg-white text-orange-500 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-orange-50 transition-colors"
                  >
                    Escalate
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
