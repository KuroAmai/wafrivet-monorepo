"use client";

import { 
  CaretLeft, 
  UserCircleGear, 
  Password, 
  UserMinus, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  Package,
  Cow,
  Wallet,
  ChartLineUp,
  Envelope
} from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data fetch helper
const getUserData = (id: string) => {
  return {
    id,
    name: "Emeka Obi",
    phone: "+234 801 234 5678",
    email: "emeka.obi@farm.com",
    role: "Farmer",
    state: "Lagos",
    status: "Active",
    joined: "May 12, 2024",
    address: "Plot 12, Lekki Agro-Industrial Zone, Lagos State",
    lastActive: "14 mins ago",
    stats: {
      animals: 42,
      orders: 12,
      bnplBalance: "₦14,500",
      creditScore: 720
    },
    activity: [
      { id: 1, text: "Placed order #ORD-9281", time: "2 hours ago", type: "order" },
      { id: 2, text: "Registered new Cattle (WAF-001)", time: "1 day ago", type: "animal" },
      { id: 3, text: "Completed USSD session", time: "2 days ago", type: "system" },
      { id: 4, text: "Vaccination Event: FMD (Bovine)", time: "5 days ago", type: "health" },
    ]
  };
};

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = getUserData(params.id);

  return (
    <div className="space-y-10">
      {/* Back & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/users" 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors group"
        >
          <div className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
            <CaretLeft size={18} weight="bold" />
          </div>
          <span className="text-[12px] font-black uppercase tracking-widest">Back to Users</span>
        </Link>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 transition-all">
            <UserCircleGear size={18} weight="bold" /> Edit Permissions
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all">
            <UserMinus size={18} weight="bold" /> Suspend Account
          </button>
        </div>
      </div>

      {/* Main Profile Header */}
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="w-40 h-40 rounded-[48px] overflow-hidden shadow-inner border border-gray-100 bg-[#F0F2F5] flex-shrink-0">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <h1 className="text-[36px] font-black text-gray-900 tracking-tight leading-none">{user.name}</h1>
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-500 border border-emerald-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {user.status}
              </span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {user.role}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Phone size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Envelope size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{user.email}</span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <MapPin size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{user.state}, Nigeria</span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Calendar size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">Member since {user.joined}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Stats & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Statistics Column */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <Cow size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Herd Size</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{user.stats.animals}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[65%]" />
              </div>
              <p className="text-[11px] text-gray-400 font-bold mt-4 uppercase tracking-widest">Registration Quota: 65% Full</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <Package size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Orders</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{user.stats.orders}</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
              <p className="text-[11px] text-gray-400 font-bold mt-4 uppercase tracking-widest">Loyalty Tier: Bronze</p>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
                  <Wallet size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">BNPL Balance</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{user.stats.bnplBalance}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all mt-2">
                View Repayment History
              </button>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
                  <ChartLineUp size={24} weight="duotone" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Credit Score</span>
                  <p className="text-[24px] font-black text-gray-900 leading-none">{user.stats.creditScore}</p>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 font-medium leading-relaxed">
                Score updated 3 days ago based on repayment behavior.
              </p>
            </div>
          </div>

          {/* User Address & Verification */}
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Registered Physical Address</h3>
            <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-gray-100 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                <MapPin size={24} weight="bold" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-gray-900 leading-relaxed max-w-sm">
                  {user.address}
                </p>
                <button className="text-[12px] text-[#2D4D31] font-black uppercase tracking-widest mt-4 hover:underline">
                  View on Map
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 text-emerald-500">
              <ShieldCheck size={20} weight="fill" />
              <span className="text-[12px] font-black uppercase tracking-widest">Identity Verified via BVN & Farm Audit</span>
            </div>
          </div>
        </div>

        {/* Timeline Column */}
        <div className="space-y-10">
          <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Operational Activity</h3>
            <div className="space-y-10 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {user.activity.map((item) => (
                <div key={item.id} className="relative pl-10">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-[#2D4D31] rounded-full z-10" />
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">{item.time}</span>
                    <p className="text-[15px] font-bold text-gray-900 leading-tight">{item.text}</p>
                    <span className="text-[12px] text-gray-500 capitalize">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-gray-100 transition-all mt-10">
               View Full Interaction Log
            </button>
          </div>

          <div className="bg-[#2D4D31] p-10 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/20">
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6">Admin Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Reset Password
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Change User Role
              </button>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                Email User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
