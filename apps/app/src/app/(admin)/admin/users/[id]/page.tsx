"use client";

import { use, useState } from "react";
import { isMockDataEnabled } from "@wafrivet/api";
import { useAuth } from "@wafrivet/auth";
import type { AdminUserDetailDto } from "@wafrivet/types";
import { ApiQueryFeedback } from "@wafrivet/ui";
import {
  useAdminUser,
  useDeactivateAdminUser,
  useDeleteAdminUser,
} from "@/hooks/useAdminApi";
import {
  CaretLeft,
  UserCircleGear,
  UserMinus,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  Package,
  Cow,
  Wallet,
  ChartLineUp,
  Envelope,
  Trash,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function mutationErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const data = (err as { response?: { data?: { message?: string } } }).response?.data;
    if (typeof data?.message === "string") return data.message;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Try again.";
}

function mapApiUser(id: string, api: AdminUserDetailDto) {
  return {
    id,
    name: [api.firstName, api.lastName].filter(Boolean).join(" ") || api.email || id,
    phone: api.phone ?? "—",
    email: api.email ?? "—",
    role: api.role ?? "—",
    state: "—",
    status: api.isActive ? "Active" : "Inactive",
    isActive: api.isActive,
    isVerified: api.isVerified,
    joined: api.createdAt ? new Date(api.createdAt).toLocaleDateString() : "—",
    address: "—",
    lastActive: formatRelativeTime(api.lastLoginAt),
    stats: { animals: 0, orders: 0, bnplBalance: "—", creditScore: 0 },
    activity: [] as ReturnType<typeof getUserData>["activity"],
  };
}

export default function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { user: authUser } = useAuth();
  const currentUserId =
    authUser && typeof authUser === "object" && "id" in authUser
      ? String((authUser as { id: string }).id)
      : undefined;

  const { data: apiUser, isLoading, isError, error, refetch } = useAdminUser(id);
  const deactivateMutation = useDeactivateAdminUser(id);
  const deleteMutation = useDeleteAdminUser();

  const [suspendOpen, setSuspendOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [suspendReason, setSuspendReason] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const isSelf = Boolean(currentUserId && currentUserId === id);
  const canSuspend = apiUser?.isActive && !isSelf;
  const canDelete = !isSelf;

  const user = apiUser
    ? mapApiUser(id, apiUser)
    : isError && isMockDataEnabled()
      ? getUserData(id)
      : null;

  const handleSuspend = async () => {
    const reason = suspendReason.trim();
    if (!reason) {
      setActionError("Enter a reason for suspension.");
      return;
    }
    setActionError(null);
    setActionSuccess(null);
    try {
      await deactivateMutation.mutateAsync({ reason });
      setActionSuccess("Account suspended.");
      setSuspendOpen(false);
      setSuspendReason("");
      await refetch();
    } catch (err) {
      setActionError(mutationErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    const reason = deleteReason.trim();
    if (!reason) {
      setActionError("Enter a reason for deletion.");
      return;
    }
    if (deleteConfirm !== "DELETE") {
      setActionError('Type DELETE to confirm permanent removal.');
      return;
    }
    setActionError(null);
    setActionSuccess(null);
    try {
      await deleteMutation.mutateAsync({ userId: id, reason });
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setActionError(mutationErrorMessage(err));
    }
  };

  if (!user) {
    return (
      <div className="space-y-10">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {actionError ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </p>
      ) : null}
      {actionSuccess ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {actionSuccess}
        </p>
      ) : null}

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
          <button
            type="button"
            disabled
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-gray-400 cursor-not-allowed"
          >
            <UserCircleGear size={18} weight="bold" /> Edit Permissions
          </button>
          <button
            type="button"
            onClick={() => {
              setActionError(null);
              setSuspendOpen(true);
            }}
            disabled={!canSuspend || deactivateMutation.isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-50 border border-red-100 rounded-xl text-[12px] font-black uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <UserMinus size={18} weight="bold" />
            {user.status === "Active" ? "Suspend Account" : "Suspended"}
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
              <span
                className={`px-4 py-1.5 border rounded-xl text-[11px] font-black uppercase tracking-wider ${
                  user.status === "Active"
                    ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                    : "bg-gray-50 text-gray-500 border-gray-100"
                }`}
              >
                {user.status}
              </span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {user.role}
              </span>
              {"isVerified" in user && user.isVerified ? (
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                  Verified
                </span>
              ) : null}
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
                <Calendar size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                Member since {user.joined}
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <ShieldCheck size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                Last active {user.lastActive}
              </span>
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
              <button
                type="button"
                disabled
                className="w-full py-4 bg-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed"
              >
                Reset Password
              </button>
              <button
                type="button"
                disabled
                className="w-full py-4 bg-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed"
              >
                Change User Role
              </button>
              <button
                type="button"
                onClick={() => {
                  setActionError(null);
                  setDeleteOpen(true);
                }}
                disabled={!canDelete || deleteMutation.isPending}
                className="w-full py-4 bg-red-500/90 hover:bg-red-500 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash size={16} weight="bold" />
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      {suspendOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">Suspend account</h2>
            <p className="mt-2 text-sm text-gray-500">
              The user will be deactivated and cannot sign in until reactivated.
            </p>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Reason
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Policy violation, fraud review, etc."
              />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSuspendOpen(false)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSuspend}
                disabled={deactivateMutation.isPending}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deactivateMutation.isPending ? "Suspending…" : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-red-600">Permanently delete user</h2>
            <p className="mt-2 text-sm text-gray-500">
              This removes the account from Supabase and the database. This cannot be undone.
            </p>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Reason
              <textarea
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Duplicate account, GDPR request, etc."
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-gray-700">
              Type DELETE to confirm
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="DELETE"
              />
            </label>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteOpen(false);
                  setDeleteConfirm("");
                  setDeleteReason("");
                }}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Deleting…" : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
