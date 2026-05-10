"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bell, CaretRight, Info, Package, SealWarning, X } from "@phosphor-icons/react";

interface DashboardNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: "Wallet top-up received",
    message: "₦10,000 was added to your Wafrivet wallet.",
    time: "12m ago",
    icon: Package,
    color: "text-[#2D4D31]",
    bg: "bg-[#2D4D31]/5",
  },
  {
    id: 2,
    title: "Order status update",
    message: "Your last marketplace order is out for delivery.",
    time: "2h ago",
    icon: SealWarning,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: 3,
    title: "Profile reminder",
    message: "Complete your clinic details to unlock faster payouts.",
    time: "1d ago",
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

export function DashboardNotificationDrawer({ isOpen, onClose }: DashboardNotificationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                  <Bell size={22} weight="bold" />
                </div>
                <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Notifications</h2>
              </div>
              <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={20} weight="bold" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 rounded-3xl hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-gray-100"
                >
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 ${notif.bg} ${notif.color} rounded-2xl flex items-center justify-center shrink-0`}
                    >
                      <notif.icon size={24} weight="bold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-900 text-[14px] leading-tight">{notif.title}</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{notif.time}</span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-50">
              <button
                type="button"
                className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-[14px] hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                View all history
                <CaretRight size={16} weight="bold" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
