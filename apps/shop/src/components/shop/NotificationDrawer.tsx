"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Package, Info } from "@phosphor-icons/react";
import { useAuth, normalizeUserRole } from "@wafrivet/auth";
import { canUseNotifications } from "@/lib/shopperCapabilities";
import { useShopNotifications } from "@/hooks/useShopApi";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const { user, role } = useAuth();
  const profile = user as { roles?: string[]; role?: string } | null;
  const gatewayRoles = profile?.roles ?? (role ? [role] : []);
  const productRole = normalizeUserRole(role);
  const notificationsEnabled = canUseNotifications(gatewayRoles, profile?.role);
  const { data: apiNotifications } = useShopNotifications();

  const mapApi = (list: unknown[]) =>
    list.map((n, i) => {
      const row = n as Record<string, unknown>;
      return {
        id: String(row.id ?? i),
        title: String(row.title ?? row.subject ?? "Notification"),
        message: String(row.message ?? row.body ?? ""),
        time: row.createdAt ? new Date(String(row.createdAt)).toLocaleString() : "",
        type: String(row.type ?? "info"),
        icon: Package,
        color: "text-blue-500",
        bg: "bg-blue-50",
      };
    });

  const chemistNotifications = [
    {
      id: "c1",
      title: "New Order",
      message: "You have a new order waiting for confirmation.",
      time: "Just now",
      type: "order",
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
  ];

  const customerFallback = [
    {
      id: "empty",
      title: "No notifications",
      message: "You're all caught up.",
      time: "",
      type: "info",
      icon: Info,
      color: "text-gray-500",
      bg: "bg-gray-100",
    },
  ];

  const apiList = Array.isArray(apiNotifications) ? mapApi(apiNotifications) : [];
  const notifications =
    productRole === "chemist"
      ? chemistNotifications
      : notificationsEnabled && apiList.length > 0
        ? apiList
        : customerFallback;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31]">
                  <Bell size={22} weight="bold" />
                </div>
                <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Notifications</h2>
              </div>
              <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {notifications.map((n) => (
                <div key={n.id} className={`p-5 rounded-[24px] border border-gray-100 ${n.bg}`}>
                  <div className="flex gap-4">
                    <n.icon size={24} className={n.color} weight="bold" />
                    <div>
                      <h3 className="font-black text-gray-900 text-[15px] mb-1">{n.title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{n.message}</p>
                      {n.time ? (
                        <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                          {n.time}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
