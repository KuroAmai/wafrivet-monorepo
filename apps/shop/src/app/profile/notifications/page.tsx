"use client";

import { Bell, Package, Info, CheckCircle } from "@phosphor-icons/react";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAuth } from "@wafrivet/auth";
import { canUseNotifications } from "@/lib/shopperCapabilities";
import { useShopNotifications } from "@/hooks/useShopApi";

const ICON_MAP: Record<string, typeof Package> = {
  order: Package,
  promo: Info,
  security: Info,
  info: Info,
  default: Bell,
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const profile = user as { roles?: string[]; role?: string } | null;
  const enabled = canUseNotifications(profile?.roles, profile?.role);
  const { data, isLoading, isError, error, refetch } = useShopNotifications();

  if (!enabled) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-[22px] font-black text-gray-900 tracking-tight px-2">Notifications</h2>
        <div className="bg-white p-12 rounded-[40px] border border-gray-100 text-center">
          <Bell size={48} className="mx-auto text-gray-300 mb-4" weight="duotone" />
          <p className="text-[15px] font-bold text-gray-900 mb-2">No notifications yet</p>
          <p className="text-[13px] text-gray-500 max-w-sm mx-auto">
            Order and account alerts will appear here when they are enabled for your account type.
          </p>
        </div>
      </div>
    );
  }

  const notifications = (data as Array<Record<string, unknown>>) ?? [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-[22px] font-black text-gray-900 tracking-tight px-2">Notifications</h2>
      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && notifications.length === 0}
        emptyMessage="You're all caught up."
        onRetry={() => void refetch()}
      />
      <div className="space-y-3">
        {notifications.map((n, i) => {
          const type = String(n.type ?? n.notificationType ?? "default").toLowerCase();
          const Icon = ICON_MAP[type] ?? ICON_MAP.default;
          const isUnread = n.isRead === false;
          return (
            <div
              key={String(n.id ?? i)}
              className={`bg-white p-6 rounded-[28px] border border-gray-100 flex gap-5 ${isUnread ? "shadow-sm" : "opacity-80"}`}
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#2D4D31] shrink-0">
                <Icon size={24} weight="bold" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-black text-gray-900 text-[15px]">
                    {String(n.title ?? n.subject ?? "Notification")}
                  </h3>
                  {isUnread ? (
                    <span className="w-2 h-2 bg-[#2D4D31] rounded-full shrink-0 mt-2" />
                  ) : (
                    <CheckCircle size={18} className="text-green-500 shrink-0" weight="fill" />
                  )}
                </div>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-2">
                  {String(n.message ?? n.body ?? "")}
                </p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {n.createdAt ? new Date(String(n.createdAt)).toLocaleString() : ""}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
