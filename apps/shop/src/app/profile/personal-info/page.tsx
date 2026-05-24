"use client";

import { Camera } from "@phosphor-icons/react";
import { useAuth } from "@wafrivet/auth";
import { useEffect, useState } from "react";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import {
  usePatchShopperAvatar,
  usePatchShopperProfile,
  usePatchShopperUsername,
  useShopperProfile,
} from "@/hooks/useShopApi";
import { fullNameFromProfile, formatMemberSince } from "@/lib/mapAuthMe";

export default function PersonalInfoPage() {
  const { user } = useAuth();
  const { region } = useShopLocation();
  const { data: shopperProfile, isLoading } = useShopperProfile();
  const patchProfile = usePatchShopperProfile();
  const patchUsername = usePatchShopperUsername();
  const patchAvatar = usePatchShopperAvatar();
  const profile = user as {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string | null;
    createdAt?: string;
    role?: string;
    roles?: string[];
  } | null;

  const merged = {
    ...profile,
    firstName: shopperProfile?.firstName ?? profile?.firstName,
    lastName: shopperProfile?.lastName ?? profile?.lastName,
    displayName: shopperProfile?.displayName ?? profile?.displayName,
    phone: shopperProfile?.phone ?? profile?.phone,
    avatarUrl: shopperProfile?.avatarUrl ?? profile?.avatarUrl,
  };

  const fullName = fullNameFromProfile(merged) ?? "—";
  const memberSince = formatMemberSince(merged.createdAt ?? profile?.createdAt) ?? "—";
  const avatarSrc =
    merged.avatarUrl ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=b6e3f4`;

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    avatarUrl: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      displayName: merged.displayName ?? fullName,
      username: shopperProfile?.username ?? "",
      avatarUrl: merged.avatarUrl ?? "",
    });
  }, [shopperProfile?.username, merged.displayName, merged.avatarUrl, fullName]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const tasks: Promise<unknown>[] = [];
      if (form.displayName.trim()) {
        tasks.push(patchProfile.mutateAsync({ displayName: form.displayName.trim() }));
      }
      if (form.username.trim() && form.username !== shopperProfile?.username) {
        tasks.push(patchUsername.mutateAsync({ username: form.username.trim() }));
      }
      if (form.avatarUrl.trim() && form.avatarUrl !== merged.avatarUrl) {
        tasks.push(patchAvatar.mutateAsync({ avatarUrl: form.avatarUrl.trim() }));
      }
      await Promise.all(tasks);
      setEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Personal Information</h2>
        <button
          type="button"
          onClick={() => (editing ? void handleSave() : setEditing(true))}
          disabled={isLoading || saving}
          className="text-[13px] font-black text-[#2D4D31] hover:underline disabled:opacity-50"
        >
          {editing ? (saving ? "Saving…" : "Save") : "Edit"}
        </button>
      </div>

      {error ? <p className="text-[13px] text-red-600 px-2">{error}</p> : null}

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <img
              src={avatarSrc}
              className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg object-cover bg-gray-50"
              alt="Avatar"
            />
            <span className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
              <Camera size={20} weight="bold" />
            </span>
          </div>
          <div className="text-center md:text-left flex-1">
            {editing ? (
              <div className="space-y-3 w-full max-w-md">
                <input
                  value={form.displayName}
                  onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                  placeholder="Display name"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 font-bold"
                />
                <input
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Username"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 font-medium"
                />
                <input
                  value={form.avatarUrl}
                  onChange={(e) => setForm((f) => ({ ...f, avatarUrl: e.target.value }))}
                  placeholder="Avatar image URL"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 font-medium text-[13px]"
                />
              </div>
            ) : (
              <>
                <h3 className="text-[20px] font-black text-gray-900 mb-1">{fullName}</h3>
                {shopperProfile?.username ? (
                  <p className="text-[14px] text-[#2D4D31] font-bold mb-1">@{shopperProfile.username}</p>
                ) : null}
                <p className="text-[14px] text-gray-400 font-medium uppercase tracking-widest">
                  {(profile?.roles?.[0] ?? profile?.role ?? "Customer").replace(/_/g, " ")}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 p-10">
          <InfoItem label="Full Name" value={fullName} />
          <InfoItem label="Email Address" value={profile?.email ?? "—"} />
          <InfoItem label="Phone Number" value={merged.phone ?? "—"} />
          <InfoItem label="Delivery Region" value={region?.regionName ?? "Not selected"} />
          <InfoItem
            label="Account Role"
            value={(profile?.roles ?? [profile?.role]).filter(Boolean).join(", ") || "—"}
          />
          <InfoItem label="Member Since" value={memberSince} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.1em]">{label}</p>
      <p className="text-[15px] font-bold text-gray-800">{value}</p>
    </div>
  );
}
