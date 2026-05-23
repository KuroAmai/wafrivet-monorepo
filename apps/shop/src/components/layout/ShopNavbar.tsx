"use client";

import Link from "next/link";
import { ShoppingCart, Bell, MapPin, CaretDown } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getAccessToken } from "@wafrivet/api";
import { getCentralLoginUrl, normalizeUserRole, useAuth } from "@wafrivet/auth";
import { displayNameFromProfile } from "@/lib/mapAuthMe";
import { useShopLocation } from "@/contexts/ShopLocationContext";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { NotificationDrawer } from "@/components/shop/NotificationDrawer";

function accountHrefForRole(role: ReturnType<typeof normalizeUserRole>): string {
  if (role === "chemist" || role === "admin") return "/dashboard";
  if (role === "distributor") return "/distributor";
  return "/profile";
}

export function ShopNavbar() {
  const { user, role, isAuthenticated, loading, refreshUser } = useAuth();
  const { region, openPicker, isLoading: regionLoading } = useShopLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const locationLabel = region?.regionName ?? (regionLoading ? "Loading…" : "Select location");

  const hasToken = Boolean(getAccessToken());
  const loggedIn = isAuthenticated || hasToken;
  const productRole = normalizeUserRole(role);
  const accountHref = accountHrefForRole(productRole);
  const userName = displayNameFromProfile(user as Parameters<typeof displayNameFromProfile>[0]) ?? "Account";

  useEffect(() => {
    if (hasToken && !user && !loading) {
      void refreshUser();
    }
  }, [hasToken, user, loading, refreshUser]);

  return (
    <>
      <header className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-28">
            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/" className="flex items-center shrink-0">
                <img src="/logo.svg" alt="Wafrivet" className="hidden md:block h-12 w-auto" />
                <img src="/logo-mark.svg" alt="Wafrivet" className="md:hidden h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={openPicker}
                className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4 group transition-colors hover:opacity-80"
              >
                <MapPin size={14} weight="fill" className="text-[#2D4D31]" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Your Location</span>
                  <span className="text-[13px] font-bold text-gray-900 flex items-center gap-1 max-w-[140px] truncate">
                    {locationLabel} <CaretDown size={12} weight="bold" />
                  </span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              {!loading && !loggedIn ? (
                <a
                  href={
                    typeof window !== "undefined"
                      ? getCentralLoginUrl(window.location.href)
                      : getCentralLoginUrl()
                  }
                  className="text-[14px] font-bold text-[#2D4D31] hover:underline"
                >
                  Sign in
                </a>
              ) : null}
              <button
                onClick={() => setIsNotificationOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <Bell size={22} weight="regular" className="text-gray-600" />
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <ShoppingCart size={22} weight="regular" className="text-gray-600" />
              </button>
              {loggedIn ? (
                <Link
                  href={accountHref}
                  onMouseEnter={() => {
                    if (hasToken && !user) void refreshUser();
                  }}
                  className="hidden sm:flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-gray-100 bg-white hover:border-[#2D4D31]/20 transition-all"
                >
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userName)}&backgroundColor=b6e3f4`}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-[13px] font-bold text-gray-900">{userName}</span>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <NotificationDrawer isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
}
