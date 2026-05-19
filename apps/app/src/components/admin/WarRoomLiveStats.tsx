"use client";

import { useWarRoomSnapshot } from "@/hooks/useAdminApi";

export function WarRoomLiveStats() {
  const { data, isLoading, isError } = useWarRoomSnapshot();

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading live metrics from API…</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-sm text-amber-700 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        Live war-room data unavailable — showing demo charts below.
      </p>
    );
  }

  const stats = [
    { label: "Orders today", value: data.todayOrderVolume },
    { label: "Revenue today", value: `₦${data.revenueCollectedToday.toLocaleString()}` },
    { label: "Active riders", value: data.activeRiders },
    { label: "Open incidents", value: data.openComplianceIncidents },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
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
  );
}
