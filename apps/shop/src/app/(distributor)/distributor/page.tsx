"use client";

import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useSupplierOffers, useSupplierProfile } from "@/hooks/useShopApi";

export default function DistributorDashboardPage() {
  const { data: offers, isLoading, isError, error, refetch } = useSupplierOffers();
  const { data: profile } = useSupplierProfile();

  const offerRows = offers ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Supplier Network</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors">
          Create Shipment
        </button>
      </div>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError && !isMockDataEnabled()}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && offerRows.length === 0}
        onRetry={() => refetch()}
      />

      {profile ? (
        <p className="text-sm text-slate-600">
          Signed in as supplier · {(profile as { companyName?: string }).companyName ?? "Profile loaded"}
        </p>
      ) : null}

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-1">Active Offers</p>
          <p className="text-2xl font-bold text-slate-900">{offerRows.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 min-h-[300px]">
        {offerRows.length > 0 ? (
          <ul className="space-y-3">
            {offerRows.map((row, idx) => {
              const offer = row as { id?: string; skuName?: string; status?: string };
              return (
                <li key={offer.id ?? idx} className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-medium">{offer.skuName ?? offer.id ?? `Offer ${idx + 1}`}</span>
                  <span className="text-slate-500 text-sm">{offer.status ?? "—"}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-slate-400 text-sm text-center py-12">No supplier offers from API yet.</p>
        )}
      </div>
    </div>
  );
}
