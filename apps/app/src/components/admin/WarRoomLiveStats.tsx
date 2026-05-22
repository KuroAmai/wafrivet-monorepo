"use client";

import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useWarRoomSnapshot } from "@/hooks/useAdminApi";

export function WarRoomLiveStats() {
  const { data, isLoading, isError, error, refetch } = useWarRoomSnapshot();

  return (
    <ApiQueryFeedback
      isLoading={isLoading}
      isError={isError && !isMockDataEnabled()}
      errorMessage={(error as Error)?.message}
      isEmpty={!isLoading && !isError && !data}
      onRetry={() => refetch()}
    >
      {data ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Orders today", value: data.todayOrderVolume },
            { label: "Revenue today", value: `₦${data.revenueCollectedToday.toLocaleString()}` },
            { label: "Active riders", value: data.activeRiders },
            { label: "Open incidents", value: data.openComplianceIncidents },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm"
            >
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      ) : null}
    </ApiQueryFeedback>
  );
}
