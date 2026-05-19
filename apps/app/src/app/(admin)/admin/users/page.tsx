"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MagnifyingGlass, 
  Funnel, 
  DotsThreeVertical, 
  Eye, 
  UserCircleGear, 
  UserMinus, 
  Password, 
  X,
  CaretDown,
  DownloadSimple,
  Circle,
  CaretRight
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAdminUsers } from "@/hooks/useAdminApi";

const USERS_DATA = [
  { id: 1, name: "Emeka Obi", phone: "+234 801 234 5678", role: "Farmer", state: "Lagos", animals: 42, orders: 12, status: "Active", joined: "May 12, 2024" },
  { id: 2, name: "Dr. Sarah Ahmed", phone: "+234 802 345 6789", role: "Vet", state: "Kano", animals: 0, orders: 0, status: "Active", joined: "May 10, 2024" },
  { id: 3, name: "Pharmacy Plus", phone: "+234 803 456 7890", role: "Chemist", state: "Oyo", animals: 0, orders: 45, status: "Active", joined: "Apr 28, 2024" },
  { id: 4, name: "Musa Ibrahim", phone: "+234 804 567 8901", role: "Farmer", state: "Kaduna", animals: 156, orders: 8, status: "Inactive", joined: "Apr 15, 2024" },
  { id: 5, name: "AgroDirect Ltd", phone: "+234 805 678 9012", role: "Distributor", state: "Lagos", animals: 0, orders: 120, status: "Active", joined: "Mar 20, 2024" },
];

export default function AllUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedState, setSelectedState] = useState("All States");
  const { data: usersResponse, isError: usersApiError } = useAdminUsers({ limit: 50 });

  const usersSource =
    usersResponse?.data?.map((u, i) => ({
      id: u.id ?? i,
      name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email,
      phone: u.email,
      role: u.role,
      state: "—",
      animals: 0,
      orders: 0,
      status: u.isActive ? "Active" : "Inactive",
      joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
    })) ?? USERS_DATA;

  const filteredUsers = usersSource.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = selectedRole === "All Roles" || user.role === selectedRole;
    const matchesStatus = selectedStatus === "All Status" || user.status === selectedStatus;
    const matchesState = selectedState === "All States" || user.state === selectedState;

    return matchesSearch && matchesRole && matchesStatus && matchesState;
  });

  return (
    <div className="space-y-8 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {usersApiError ? (
            <p className="text-sm text-amber-700 mb-3">Could not load users from API — showing demo data.</p>
          ) : null}
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">User Management</h1>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">Manage every account across the Wafrivet ecosystem</p>
        </div>
        <button className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
          <DownloadSimple size={18} weight="bold" /> Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone, or email..." 
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Role Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {["All Roles", "Farmer", "Vet", "Chemist", "Distributor"].map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {["All Status", "Active", "Inactive"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>

          {/* State Filter */}
          <select 
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            {["All States", "Lagos", "Kano", "Oyo", "Kaduna"].map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => {
            setSearchQuery("");
            setSelectedRole("All Roles");
            setSelectedStatus("All Status");
            setSelectedState("All States");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
          title="Clear Filters"
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
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">User</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Contact</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Role</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-gray-50/30 transition-all">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-[#F0F2F5] flex-shrink-0">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate max-w-[180px]">{user.name}</span>
                        <span className="text-[11px] text-gray-400 font-medium truncate max-w-[180px]">Joined {user.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-800 leading-none mb-1 whitespace-nowrap">{user.phone}</span>
                      <span className="text-[11px] text-gray-400 font-medium whitespace-nowrap">{user.state} State</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[11px] font-bold border",
                      user.role === "Farmer" ? "bg-blue-50 text-blue-500 border-blue-100" :
                      user.role === "Vet" ? "bg-purple-50 text-purple-500 border-purple-100" :
                      user.role === "Chemist" ? "bg-emerald-50 text-emerald-500 border-emerald-100" :
                      "bg-orange-50 text-orange-500 border-orange-100"
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        user.status === "Active" ? "bg-emerald-500" : "bg-gray-300"
                      )} />
                      <span className="text-[13px] font-bold text-gray-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link 
                      href={`/admin/users/${user.id}`}
                      className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
            Showing 1-5 of 4,284 Verified Accounts
          </span>
          <div className="flex items-center gap-2">
            {[1, 2, 3, "...", 857].map((page, i) => (
              <button key={i} className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-black transition-all",
                page === 1 ? "bg-[#2D4D31] text-white shadow-lg shadow-[#2D4D31]/20" : "text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-sm"
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
