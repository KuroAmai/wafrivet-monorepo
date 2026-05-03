"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, ShieldCheck, Heartbeat, Warning, CaretRight, WifiHigh, IdentificationBadge } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const notifications = [
    { 
      id: 1, 
      title: "Critical Health Alert", 
      message: "Cattle #WAF-882 in Lekki Dairy shows symptoms of FMD. Inspection required.", 
      time: "2m ago", 
      type: "health", 
      icon: Heartbeat, 
      color: "text-red-500", 
      bg: "bg-red-50" 
    },
    { 
      id: 2, 
      title: "Data Sync Success", 
      message: "42 animals from Epe Livestock Hub successfully synced to cloud.", 
      time: "15m ago", 
      type: "sync", 
      icon: WifiHigh, 
      color: "text-[#2D4D31]", 
      bg: "bg-emerald-50" 
    },
    { 
      id: 3, 
      title: "Credential Expiring", 
      message: "Your VCN certification expires in 30 days. Renewal audit available.", 
      time: "1h ago", 
      type: "security", 
      icon: IdentificationBadge, 
      color: "text-amber-500", 
      bg: "bg-amber-50" 
    },
    { 
      id: 4, 
      title: "AI Analysis Ready", 
      message: "Production forecast for May 2026 has been generated.", 
      time: "4h ago", 
      type: "ai", 
      icon: ShieldCheck, 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[340px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                    <Bell size={22} weight="bold" />
                 </div>
                 <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Console Alerts</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-90">
                 <X size={20} weight="bold" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 rounded-[28px] hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-gray-50 active:scale-[0.98]">
                   <div className="flex gap-4">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", notif.bg, notif.color)}>
                         <notif.icon size={24} weight="bold" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start mb-1">
                            <h3 className="font-black text-gray-900 text-[14px] leading-tight truncate">{notif.title}</h3>
                            <span className="text-[9px] font-black text-gray-300 uppercase shrink-0 ml-2">{notif.time}</span>
                         </div>
                         <p className="text-[13px] text-gray-500 font-medium leading-relaxed line-clamp-2">{notif.message}</p>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-50">
               <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-gray-200">
                  Full History
                  <CaretRight size={16} weight="bold" />
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
