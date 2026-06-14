"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, IdentificationBadge } from "@phosphor-icons/react";
import type { AuthUserProfileDto, GatewayOnboardingRole } from "@wafrivet/types";

const KYC_ROLE_LABELS: Record<GatewayOnboardingRole, string> = {
  VET: "Veterinary practice",
  SUPPLIER: "Supplier business",
  MANUFACTURER: "Manufacturer business",
};

export function SettingsPanel() {
  const [profile, setProfile] = useState<AuthUserProfileDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "same-origin" });
        if (!res.ok) return;
        const me = (await res.json()) as AuthUserProfileDto;
        if (!cancelled) setProfile(me);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-[32px] bg-white border border-gray-100 shadow-sm p-8 text-[15px] text-gray-500">
        Loading settings…
      </div>
    );
  }

  const pendingKyc = profile?.kyc_required_for ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] font-black text-gray-900 tracking-tight">Settings</h1>
        <p className="text-[15px] text-gray-600 mt-1">Manage your account and professional profile.</p>
      </div>

      <section className="rounded-[32px] bg-white border border-gray-100 shadow-sm overflow-hidden">
        <h2 className="px-6 pt-5 pb-2 text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Account
        </h2>
        <div className="px-6 pb-6 space-y-1">
          <p className="text-[15px] font-semibold text-gray-900">{profile?.email ?? "—"}</p>
          <p className="text-[13px] text-gray-500">
            Profile name and photo editing is coming soon.
          </p>
        </div>
      </section>

      <section className="rounded-[32px] bg-white border border-gray-100 shadow-sm overflow-hidden">
        <h2 className="px-6 pt-5 pb-2 text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Business profile
        </h2>
        <div className="px-6 pb-6">
          {pendingKyc.length > 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
              <div className="flex items-start gap-3">
                <IdentificationBadge size={22} className="text-amber-700 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-amber-950">
                    Complete your business profile
                  </p>
                  <p className="text-[13px] text-amber-900/80 mt-1">
                    Required for{" "}
                    {pendingKyc.map((r) => KYC_ROLE_LABELS[r] ?? r.toLowerCase()).join(", ")}.
                    You can finish this anytime — your role is already saved.
                  </p>
                  <Link
                    href="/onboarding?resumeKyc=1"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2D4D31] px-4 py-2.5 text-[14px] font-semibold text-white hover:bg-[#243f28] transition-colors"
                  >
                    Complete business profile
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
              <CheckCircle size={22} className="text-emerald-700 shrink-0 mt-0.5" weight="fill" />
              <div>
                <p className="text-[15px] font-semibold text-emerald-950">Business profile up to date</p>
                <p className="text-[13px] text-emerald-900/80 mt-1">
                  No pending verification details. Update your role from the dashboard if needed.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
