"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, Package, SealWarning, Info, CaretRight } from "@phosphor-icons/react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  // In a real app, this would come from a context or hook
  const [role, setRole] = useState("customer");

  useEffect(() => {
    const isChemist = typeof document !== 'undefined' && 
      (document.cookie.includes("role=chemist") || localStorage.getItem("userRole") === "chemist" || window.location.search.includes("role=chemist"));
    if (isChemist) setRole("chemist");
  }, [isOpen]);

  const customerNotifications = [
    { 
      id: 1, 
      title: "Order Arriving Soon", 
      message: "Your order #WF-9281 is just 5 minutes away from your farm.", 
      time: "5m ago", 
      type: "order", 
      icon: Package, 
      color: "text-blue-500", 
      bg: "bg-blue-50" 
    },
    { 
      id: 2, 
      title: "Vaccine Alert", 
      message: "New batch of Terramycin is now available at Lagos Vet Hub.", 
      time: "2h ago", 
      type: "alert", 
      icon: SealWarning, 
      color: "text-orange-500", 
      bg: "bg-orange-50" 
    },
    { 
      id: 3, 
      title: "Profile Verified", 
      message: "Your farmer credentials have been successfully verified.", 
      time: "1d ago", 
      type: "info", 
      icon: Info, 
      color: "text-[#2D4D31]", 
      bg: "bg-[#2D4D31]/5" 
    },
  ];

  const chemistNotifications = [
    { 
      id: 1, 
      title: "New Incoming Order", 
      message: "John Doe placed an order for Oxytetracycline 20%. Action required.", 
      time: "2m ago", 
      type: "order", 
      icon: Package, 
      color: "text-[#2D4D31]", 
      bg: "bg-[#2D4D31]/5" 
    },
    { 
      id: 2, 
      title: "Critical Stock Alert", 
      message: "Ivermectin 1% has fallen below your minimum stock level (3 units left).", 
      time: "1h ago", 
      type: "alert", 
      icon: SealWarning, 
      color: "text-red-500", 
      bg: "bg-red-50" 
    },
    { 
      id: 3, 
      title: "Payout Processed", 
      message: "Your weekly earnings of ₦142,000 have been sent to your bank account.", 
      time: "5h ago", 
      type: "info", 
      icon: Info, 
      color: "text-purple-500", 
      bg: "bg-purple-50" 
    },
  ];

  const notifications = role === "chemist" ? chemistNotifications : customerNotifications;

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
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                    <Bell size={22} weight="bold" />
                 </div>
                 <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                 <X size={20} weight="bold" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 rounded-3xl hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-gray-100">
                   <div className="flex gap-4">
                      <div className={`w-12 h-12 ${notif.bg} ${notif.color} rounded-2xl flex items-center justify-center shrink-0`}>
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

            {/* Footer */}
            <div className="p-6 border-t border-gray-50">
               <button className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-bold text-[14px] hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
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
