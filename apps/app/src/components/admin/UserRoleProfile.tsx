"use client";

import type { AdminUserEntitySummaryDto, AdminUserStatItemDto } from "@wafrivet/types";
import {
  Buildings,
  ChartLineUp,
  Cow,
  Package,
  ShieldCheck,
  Storefront,
  Stethoscope,
  Truck,
  UserCircle,
  Wallet,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const STAT_ICONS: Record<string, Icon> = {
  roles: ShieldCheck,
  audit: ChartLineUp,
  mfa: ShieldCheck,
  verified: ShieldCheck,
  farms: Buildings,
  animals: Cow,
  memberships: UserCircle,
  orders: Package,
  kyc: ShieldCheck,
  license: ShieldCheck,
  offers: Storefront,
  catalog: Package,
  cac: Buildings,
  nafdac: ShieldCheck,
  region: Buildings,
  addresses: Buildings,
  wishlist: Package,
  profile: UserCircle,
  deliveries: Truck,
  status: Truck,
  vehicle: Truck,
  rating: ChartLineUp,
};

const KIND_ACCENTS: Record<
  AdminUserEntitySummaryDto["kind"],
  { bg: string; text: string; bar: string }
> = {
  admin: { bg: "bg-slate-50", text: "text-slate-600", bar: "bg-slate-500" },
  support: { bg: "bg-slate-50", text: "text-slate-600", bar: "bg-slate-500" },
  farmer: { bg: "bg-emerald-50", text: "text-emerald-500", bar: "bg-emerald-500" },
  vet: { bg: "bg-blue-50", text: "text-blue-500", bar: "bg-blue-500" },
  supplier: { bg: "bg-orange-50", text: "text-orange-500", bar: "bg-orange-500" },
  manufacturer: { bg: "bg-purple-50", text: "text-purple-500", bar: "bg-purple-500" },
  customer: { bg: "bg-sky-50", text: "text-sky-500", bar: "bg-sky-500" },
  rider: { bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-500" },
  generic: { bg: "bg-gray-50", text: "text-gray-500", bar: "bg-gray-400" },
};

function StatCard({ stat, kind }: { stat: AdminUserStatItemDto; kind: AdminUserEntitySummaryDto["kind"] }) {
  const accent = KIND_ACCENTS[kind];
  const IconComponent = STAT_ICONS[stat.key] ?? Wallet;

  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 ${accent.bg} ${accent.text} rounded-2xl flex items-center justify-center`}>
          <IconComponent size={24} weight="duotone" />
        </div>
        <div>
          <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</span>
          <p className="text-[24px] font-black text-gray-900 leading-none">{stat.value}</p>
        </div>
      </div>
      {stat.hint ? (
        <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest">{stat.hint}</p>
      ) : null}
    </div>
  );
}

export function UserRoleStats({ entity }: { entity: AdminUserEntitySummaryDto }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[16px] font-black text-gray-900 tracking-tight">{entity.title}</h3>
        {entity.subtitle ? (
          <p className="text-[13px] text-gray-600 font-medium mt-1">{entity.subtitle}</p>
        ) : null}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {entity.stats.map((stat) => (
          <StatCard key={stat.key} stat={stat} kind={entity.kind} />
        ))}
      </div>
    </div>
  );
}

export function UserEntityDetails({ entity }: { entity: AdminUserEntitySummaryDto }) {
  const showAddress = Boolean(entity.address);

  return (
    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
      <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">
        {showAddress ? "Registered location" : "Account context"}
      </h3>

      {showAddress ? (
        <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-[32px] border border-gray-100 mb-8">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
            <Buildings size={24} weight="bold" />
          </div>
          <div>
            <p className="text-[15px] font-bold text-gray-900 leading-relaxed max-w-lg">{entity.address}</p>
            {entity.regionName ? (
              <p className="text-[12px] text-gray-600 font-bold uppercase tracking-widest mt-3">
                Region: {entity.regionName}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-[14px] text-gray-600 leading-relaxed mb-8">
          {entity.verificationLabel ?? "No business address on file for this account type."}
        </p>
      )}

      {entity.verificationLabel && showAddress ? (
        <div className="flex items-center gap-3 text-emerald-600">
          <ShieldCheck size={20} weight="fill" />
          <span className="text-[12px] font-black uppercase tracking-widest">{entity.verificationLabel}</span>
        </div>
      ) : entity.kycStatus ? (
        <div className="flex items-center gap-3 text-[#2D4D31]">
          <Stethoscope size={20} weight="fill" />
          <span className="text-[12px] font-black uppercase tracking-widest">
            KYC: {entity.kycStatus.replace(/_/g, " ")}
          </span>
        </div>
      ) : null}
    </div>
  );
}
