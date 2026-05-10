"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, CaretDown, MapPin } from "@phosphor-icons/react";
import { DashboardNotificationDrawer } from "./DashboardNotificationDrawer";

export type DashboardTopBarProps = {
  branchLocation: string;
  displayName: string;
  avatarSrc: string;
};

export function TopBar({ branchLocation, displayName, avatarSrc }: DashboardTopBarProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <>
      <header className="bg-transparent border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link href="/welcome" className="flex items-center shrink-0">
                <img src="/logo-mark.svg" alt="Wafrivet" className="h-10 w-auto" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 border-l border-gray-100 pl-4">
                <MapPin size={14} weight="fill" className="text-[#2D4D31]" />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[13px] text-gray-900 font-bold">{branchLocation}</span>
                    <CaretDown size={12} weight="bold" className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsNotificationOpen(true)}
                className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-2xl transition-colors relative"
              >
                <Bell size={24} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F9FAFB]" />
              </button>

              <div className="h-8 w-px bg-gray-100" />

              <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-gray-50 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatarSrc} alt="" className="w-9 h-9 rounded-xl border-2 border-white" />
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Account</span>
                  <span className="text-[13px] text-gray-900 font-bold max-w-[140px] truncate">{displayName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <DashboardNotificationDrawer isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
    </>
  );
}
