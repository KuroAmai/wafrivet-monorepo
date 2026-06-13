"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass, DownloadSimple, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAdminUsers } from "@/hooks/useAdminApi";
import {
  ADMIN_USER_ROLE_NAV,
  adminUserRoleBadgeClass,
  formatAdminUserRole,
  type AdminUserRoleFilter,
} from "@/lib/adminUserRoles";

type AdminUsersListProps = {
  title?: string;
  subtitle?: string;
  roleFilter?: AdminUserRoleFilter;
};

const ROLE_FILTER_OPTIONS: { label: string; value: AdminUserRoleFilter | "" }[] = [
  { label: "All roles", value: "" },
  ...ADMIN_USER_ROLE_NAV.filter((item) => item.role).map((item) => ({
    label: item.label,
    value: item.role!,
  })),
];

export function AdminUsersList({
  title = "User Management",
  subtitle = "Manage every account across the Wafrivet ecosystem",
  roleFilter,
}: AdminUsersListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<AdminUserRoleFilter | "">(roleFilter ?? "");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "inactive">("all");

  const apiRole = roleFilter ?? (selectedRole || undefined);
  const {
    data: usersResponse,
    isError: usersApiError,
    isLoading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useAdminUsers({
    limit: 50,
    role: apiRole,
    isActive: selectedStatus === "all" ? undefined : selectedStatus === "active",
  });

  const rows = useMemo(() => {
    return (
      usersResponse?.data?.map((u, i) => ({
        id: u.id ?? String(i),
        name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email,
        email: u.email,
        role: u.role,
        status: u.isActive ? "Active" : "Inactive",
        isVerified: u.isVerified,
        joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—",
        lastLogin: u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "—",
      })) ?? []
    );
  }, [usersResponse]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q),
    );
  }, [rows, searchQuery]);

  const roleLocked = Boolean(roleFilter);

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-none mb-3">
            {title}
          </h1>
          <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">{subtitle}</p>
        </div>
        <button
          type="button"
          disabled
          className="bg-white text-gray-900 border border-gray-100 px-6 py-2.5 rounded-2xl text-[13px] font-black uppercase tracking-wider opacity-50 cursor-not-allowed flex items-center gap-2 shadow-sm"
        >
          <DownloadSimple size={18} weight="bold" /> Export CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[280px] flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-50 focus-within:border-[#2D4D31]/20 focus-within:bg-white transition-all">
          <MagnifyingGlass size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="bg-transparent border-none outline-none text-[14px] font-medium text-gray-900 placeholder:text-gray-400 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            value={roleFilter ?? selectedRole}
            disabled={roleLocked}
            onChange={(e) => setSelectedRole(e.target.value as AdminUserRoleFilter | "")}
          >
            {ROLE_FILTER_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:border-[#2D4D31]/20 hover:bg-gray-50 transition-all outline-none appearance-none cursor-pointer"
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as "all" | "active" | "inactive")
            }
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            if (!roleLocked) setSelectedRole("");
            setSelectedStatus("all");
          }}
          className="p-3 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"
          title="Clear filters"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-5 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">
                  User
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">
                  Contact
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">
                  Role
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest whitespace-nowrap">
                  Status
                </th>
                <th className="px-5 py-4 text-[10px] font-black text-gray-600 uppercase tracking-widest text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td colSpan={5} className="p-0 border-none">
                  <ApiQueryFeedback
                    isLoading={usersLoading}
                    isError={usersApiError && !isMockDataEnabled()}
                    errorMessage={(usersError as Error)?.message}
                    isEmpty={!usersLoading && !usersApiError && filteredUsers.length === 0}
                    emptyMessage={
                      roleFilter
                        ? `No ${formatAdminUserRole(roleFilter).toLowerCase()} accounts match your filters.`
                        : "No users match your filters."
                    }
                    onRetry={() => refetchUsers()}
                  />
                </td>
              </tr>
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
                        <span className="text-[14px] font-bold text-gray-900 leading-none mb-1 truncate max-w-[200px]">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-gray-600 font-medium truncate max-w-[200px]">
                          Joined {user.joined}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-gray-800 leading-none mb-1 whitespace-nowrap">
                        {user.email}
                      </span>
                      <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap">
                        Last login {user.lastLogin}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[11px] font-bold border",
                        adminUserRoleBadgeClass(user.role),
                      )}
                    >
                      {formatAdminUserRole(user.role)}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          user.status === "Active" ? "bg-emerald-500" : "bg-gray-300",
                        )}
                      />
                      <span className="text-[13px] font-bold text-gray-600">{user.status}</span>
                      {user.isVerified ? (
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                          Verified
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-[11px] font-black text-[#2D4D31] uppercase tracking-widest hover:underline"
                    >
                      View profile
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
          <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">
            Showing {filteredUsers.length} account{filteredUsers.length === 1 ? "" : "s"}
            {roleFilter ? ` · ${formatAdminUserRole(roleFilter)} filter` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
