"use client";

import { Bell } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { NotificationDrawer } from "./NotificationDrawer";

export function TopBar() {
  const [isOnline, setIsOnline] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F9FAFB]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {/* Branding Cluster */}
          <Link to="/" className="group flex items-center gap-3 active:scale-95 transition-transform">
            <img src="/logo-mark.svg" alt="Wafrivet" className="w-8 h-8 object-contain" />
            <h1 className="text-[20px] font-black text-gray-900 tracking-tight leading-none">Herd</h1>
          </Link>

          {/* Action Cluster */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2.5 text-gray-400 hover:bg-white hover:text-gray-900 rounded-2xl transition-all active:scale-90"
              aria-label="Notifications"
            >
              <Bell size={24} weight="bold" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]"></span>
            </button>
          </div>
        </div>
      </header>

      <NotificationDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
}
