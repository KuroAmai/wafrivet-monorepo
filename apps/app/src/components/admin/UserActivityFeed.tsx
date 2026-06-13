"use client";

import type { AdminUserActivityItemDto } from "@wafrivet/types";

function formatActivityTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString();
}

export function UserActivityFeed({
  items,
  emptyMessage = "No recent activity recorded for this user.",
}: {
  items: AdminUserActivityItemDto[];
  emptyMessage?: string;
}) {
  return (
    <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
      <h3 className="text-[16px] font-black text-gray-900 tracking-tight mb-8">Recent activity</h3>

      {items.length === 0 ? (
        <p className="text-[14px] text-gray-600">{emptyMessage}</p>
      ) : (
        <div className="space-y-10 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
          {items.map((item) => (
            <div key={item.id} className="relative pl-10">
              <div className="absolute left-0 top-1.5 w-4 h-4 bg-white border-2 border-[#2D4D31] rounded-full z-10" />
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest leading-none">
                  {formatActivityTime(item.time)}
                </span>
                <p className="text-[15px] font-bold text-gray-900 leading-tight">{item.text}</p>
                <span className="text-[12px] text-gray-600 capitalize">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function UserRoleAssignments({
  assignments,
}: {
  assignments: { role: string; status: string }[];
}) {
  if (assignments.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {assignments.map((assignment) => (
        <span
          key={`${assignment.role}-${assignment.status}`}
          className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-black uppercase tracking-wider text-gray-600"
        >
          {assignment.role.replace(/_/g, " ")} · {assignment.status.replace(/_/g, " ")}
        </span>
      ))}
    </div>
  );
}
