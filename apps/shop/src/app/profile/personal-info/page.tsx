"use client";

import { Camera } from "@phosphor-icons/react";
import { useAuth } from "@wafrivet/auth";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import { fullNameFromProfile, formatMemberSince } from "@/lib/mapAuthMe";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com";

export default function PersonalInfoPage() {
  const { user } = useAuth();
  const { region } = useShopLocation();
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

  const fullName = fullNameFromProfile(profile) ?? "—";
  const memberSince = formatMemberSince(profile?.createdAt) ?? "—";
  const avatarSrc =
    profile?.avatarUrl ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}&backgroundColor=b6e3f4`;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight">Personal Information</h2>
        <a
          href={`${APP_URL}/onboarding`}
          className="text-[13px] font-black text-[#2D4D31] hover:underline"
        >
          Manage on Wafrivet App
        </a>
      </div>

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
          <div className="text-center md:text-left">
            <h3 className="text-[20px] font-black text-gray-900 mb-1">{fullName}</h3>
            <p className="text-[14px] text-gray-400 font-medium uppercase tracking-widest">
              {(profile?.roles?.[0] ?? profile?.role ?? "Customer").replace(/_/g, " ")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 p-10">
          <InfoItem label="Full Name" value={fullName} />
          <InfoItem label="Email Address" value={profile?.email ?? "—"} />
          <InfoItem label="Phone Number" value={profile?.phone ?? "—"} />
          <InfoItem label="Delivery Region" value={region?.regionName ?? "Not selected"} />
          <InfoItem label="Account Role" value={(profile?.roles ?? [profile?.role]).filter(Boolean).join(", ") || "—"} />
          <InfoItem label="Member Since" value={memberSince} />
        </div>
      </div>

      <p className="text-[12px] text-gray-400 px-2 leading-relaxed">
        Profile photo and display name updates will sync here once account settings are available on the gateway.
      </p>
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
