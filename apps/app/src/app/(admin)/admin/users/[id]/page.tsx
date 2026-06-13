"use client";

import { use, useState } from "react";
import { isMockDataEnabled } from "@wafrivet/api";
import { useAuth } from "@wafrivet/auth";
import type {
  AdminUserDetailDto,
  AdminUserEntitySummaryDto,
} from "@wafrivet/types";
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
  Calendar,
  ShieldCheck,
  Envelope,
  Trash,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserActivityFeed, UserRoleAssignments } from "@/components/admin/UserActivityFeed";
import { UserEntityDetails, UserRoleStats } from "@/components/admin/UserRoleProfile";
import { formatAdminUserRole } from "@/lib/adminUserRoles";

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

function fallbackEntity(role: string): AdminUserEntitySummaryDto {
  const normalized = role.toUpperCase();
  if (normalized === "ADMIN" || normalized === "SUPPORT") {
    return {
      kind: normalized === "ADMIN" ? "admin" : "support",
      title: normalized === "ADMIN" ? "Platform administrator" : "Support operator",
      subtitle: "Deploy latest backend for live admin metrics",
      address: null,
      regionName: null,
      kycStatus: null,
      verificationLabel: "Platform staff — marketplace KYC and herd metrics do not apply.",
      stats: [
        { key: "roles", label: "Primary role", value: role },
        { key: "verified", label: "Account type", value: "Staff" },
      ],
    };
  }
  return {
    kind: "generic",
    title: role.replace(/_/g, " "),
    subtitle: "Deploy latest backend for role-specific metrics",
    address: null,
    regionName: null,
    kycStatus: null,
    verificationLabel: null,
    stats: [{ key: "role", label: "Primary role", value: role }],
  };
}

function displayName(api: AdminUserDetailDto): string {
  return [api.firstName, api.lastName].filter(Boolean).join(" ") || api.email || api.id;
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
  const user = apiUser ?? null;
  const entity = user?.entity ?? (user ? fallbackEntity(user.role) : null);
  const activity = user?.recentActivity ?? [];
  const canSuspend = user?.isActive && !isSelf;
  const canDelete = !isSelf;

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

  if (!user || !entity) {
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

  const name = displayName(user);

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

      <div className="flex items-center justify-between">
        <Link
          href="/admin/users"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
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
            {user.isActive ? "Suspend Account" : "Suspended"}
          </button>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
        <div className="w-40 h-40 rounded-[48px] overflow-hidden shadow-inner border border-gray-100 bg-[#F0F2F5] flex-shrink-0">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-4">
            <h1 className="text-[36px] font-black text-gray-900 tracking-tight leading-none">{name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-4 py-1.5 border rounded-xl text-[11px] font-black uppercase tracking-wider ${
                  user.isActive
                    ? "bg-emerald-50 text-emerald-500 border-emerald-100"
                    : "bg-gray-50 text-gray-500 border-gray-100"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
              <span className="px-4 py-1.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                {formatAdminUserRole(user.role)}
              </span>
              {user.isVerified ? (
                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                  Verified
                </span>
              ) : null}
              {user.mfaEnabled ? (
                <span className="px-4 py-1.5 bg-slate-50 text-slate-600 border border-slate-100 rounded-xl text-[11px] font-black uppercase tracking-wider">
                  MFA on
                </span>
              ) : null}
            </div>
          </div>
          <UserRoleAssignments assignments={user.roleAssignments ?? []} />
          <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mt-8">
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Phone size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{user.phone ?? "—"}</span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Envelope size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">{user.email}</span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <Calendar size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-gray-500 group">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-gray-900 transition-colors flex-shrink-0">
                <ShieldCheck size={20} weight="bold" />
              </div>
              <span className="text-[14px] font-bold text-gray-900 whitespace-nowrap">
                Last active {formatRelativeTime(user.lastLoginAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <UserRoleStats entity={entity} />
          <UserEntityDetails entity={entity} />
        </div>

        <div className="space-y-10">
          <UserActivityFeed items={activity} />
          <div className="bg-[#2D4D31] p-10 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/20">
            <h4 className="text-[14px] font-black uppercase tracking-widest mb-6">Admin quick actions</h4>
            <div className="space-y-3">
              <button
                type="button"
                disabled
                className="w-full py-4 bg-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed"
              >
                Reset password
              </button>
              <button
                type="button"
                disabled
                className="w-full py-4 bg-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest opacity-50 cursor-not-allowed"
              >
                Change user role
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
                Delete user
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
