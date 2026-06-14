"use client";

import { Gear, User, Bell, ShieldCheck, ArrowRight, Storefront, Image as ImageIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ApiQueryFeedback } from "@wafrivet/ui";
import type { SupplierProfileDto, UpdateSupplierProfileDto } from "@wafrivet/types";
import {
  useSupplierProfile,
  useUpdateSupplierProfile,
  useUploadSupplierBranding,
} from "@/hooks/useShopApi";
import {
  CHEMIST_BANNER_PLACEHOLDER,
  CHEMIST_PLACEHOLDER_IMAGE,
} from "@/lib/chemistUtils";

export default function SettingsPage() {
  const { data: profileRaw, isLoading, isError, error, refetch } = useSupplierProfile();
  const updateProfile = useUpdateSupplierProfile();
  const uploadBranding = useUploadSupplierBranding();
  const profile = profileRaw as SupplierProfileDto | undefined;
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    workingHours: "",
    publicBio: "",
  });
  const [notifs, setNotifs] = useState({ orders: true, stock: true, marketing: false });

  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name ?? "",
      phone: profile.phone ?? "",
      address: profile.address ?? "",
      workingHours: profile.workingHours ?? "",
      publicBio: profile.publicBio ?? "",
    });
  }, [profile]);

  const handleSave = async () => {
    const body: UpdateSupplierProfileDto = {
      name: form.name.trim() || undefined,
      phone: form.phone.trim() || undefined,
      address: form.address.trim() || undefined,
      workingHours: form.workingHours.trim() || undefined,
      publicBio: form.publicBio.trim() || undefined,
    };
    try {
      await updateProfile.mutateAsync(body);
      toast.success("Branch profile updated");
    } catch (e) {
      toast.error((e as Error).message ?? "Failed to save profile");
    }
  };

  const handleBrandUpload = async (file: File, kind: "logo" | "banner") => {
    try {
      await uploadBranding.mutateAsync({ file, kind });
      toast.success(kind === "logo" ? "Logo updated" : "Banner updated");
    } catch (e) {
      toast.error((e as Error).message ?? "Upload failed");
    }
  };

  const previewBanner = profile?.bannerUrl ?? CHEMIST_BANNER_PLACEHOLDER;
  const previewLogo = profile?.logoUrl ?? CHEMIST_PLACEHOLDER_IMAGE;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-none mb-2">
          Branch Settings
        </h1>
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
          Configure your branch profile and preferences
        </p>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        onRetry={() => refetch()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                <User size={22} weight="bold" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Branch Profile</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Branch Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Branch ID
                </label>
                <input
                  type="text"
                  value={profile?.id ?? "—"}
                  readOnly
                  className="w-full px-6 py-4 bg-gray-100 border-none rounded-2xl text-[14px] font-bold text-gray-400 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={form.workingHours}
                  onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))}
                  placeholder="Mon–Sat 8am–6pm"
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Physical Address
                </label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold h-24"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={updateProfile.isPending || isLoading}
              className="mt-8 px-10 py-4 bg-[#2D4D31] text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-[#243f28] transition-all disabled:opacity-50"
            >
              {updateProfile.isPending ? "Saving…" : "Save Changes"}
            </button>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                <Storefront size={22} weight="bold" />
              </div>
              <div>
                <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Public Storefront</h3>
                <p className="text-[12px] text-gray-500">Logo, banner, and bio shown on your public chemist profile</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3">
                  Banner (max 5MB)
                </p>
                <div className="relative h-40 rounded-3xl overflow-hidden border border-gray-100">
                  <img src={previewBanner} alt="Storefront banner preview" className="w-full h-full object-cover" />
                </div>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleBrandUpload(file, "banner");
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  disabled={uploadBranding.isPending}
                  className="mt-3 inline-flex items-center gap-2 px-5 py-3 bg-gray-50 rounded-2xl text-[13px] font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  <ImageIcon size={18} weight="bold" />
                  Upload banner
                </button>
              </div>

              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-3">
                  Logo (max 2MB)
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={previewLogo}
                    alt="Storefront logo preview"
                    className="w-24 h-24 rounded-3xl object-cover border border-gray-100"
                  />
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void handleBrandUpload(file, "logo");
                      e.target.value = "";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadBranding.isPending}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-gray-50 rounded-2xl text-[13px] font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <ImageIcon size={18} weight="bold" />
                    Upload logo
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">
                  Public bio
                </label>
                <textarea
                  value={form.publicBio}
                  onChange={(e) => setForm((f) => ({ ...f, publicBio: e.target.value }))}
                  placeholder="Tell farmers about your branch, specialties, and services..."
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl text-[14px] font-bold h-32"
                />
              </div>

              {profile?.id ? (
                <Link
                  href={`/chemists/${profile.id}`}
                  className="inline-flex items-center gap-2 text-[13px] font-bold text-[#2D4D31] hover:underline"
                >
                  Preview public profile
                  <ArrowRight size={16} weight="bold" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                <ShieldCheck size={22} weight="bold" />
              </div>
              <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Security</h3>
            </div>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL || "https://app.wafrivet.com"}/settings`}
              className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group cursor-pointer hover:bg-gray-100 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-[#2D4D31] transition-colors">
                  <Gear size={20} weight="bold" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-[14px]">Account & Password</p>
                  <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">
                    Managed in Wafrivet app
                  </p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-gray-900 transition-all" />
            </a>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-8 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
              <Bell size={22} weight="bold" />
            </div>
            <h3 className="text-[18px] font-black text-gray-900 tracking-tight">Notifications</h3>
          </div>

          <p className="text-[11px] text-gray-400 mb-6">
            Preferences saved locally until supplier notification settings are available.
          </p>

          <div className="space-y-6">
            {[
              { key: "orders", label: "Order Alerts", desc: "Notify me when new orders arrive" },
              { key: "stock", label: "Inventory Alerts", desc: "Low stock and critical levels" },
              { key: "marketing", label: "System Updates", desc: "Maintenance and new features" },
            ].map((item) => (
              <div key={item.key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900 text-[14px] mb-0.5">{item.label}</p>
                  <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifs((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof notifs],
                    }))
                  }
                  className={`w-12 h-6 rounded-full transition-all relative ${notifs[item.key as keyof typeof notifs] ? "bg-[#2D4D31]" : "bg-gray-200"}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifs[item.key as keyof typeof notifs] ? "right-1" : "left-1"}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
