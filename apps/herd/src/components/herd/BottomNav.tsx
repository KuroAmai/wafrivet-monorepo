"use client";

import { 
  Users, 
  MapPin, 
  WifiHigh, 
  Sparkle 
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useHerdAssistant } from "@/context/HerdAssistantContext";

const NAV_ITEMS = [
  { label: "Registry", icon: Users, path: "/animals", matchPrefix: "/animal" },
  { label: "Farms", icon: MapPin, path: "/farms" },
  { label: "Sync", icon: WifiHigh, path: "/scan" },
  { label: "AI", icon: Sparkle, path: "/ai" },
  { label: "Account", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ademola", path: "/settings" },
];

export function BottomNav() {
  const { pathname } = useLocation();
  const assistant = useHerdAssistant();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 pb-10 pt-4 flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[40px]">
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.label === "AI"
            ? assistant.isOpen
            : "matchPrefix" in item && item.matchPrefix
              ? pathname === item.path || pathname.startsWith(item.matchPrefix)
              : pathname === item.path;
        const Icon = item.icon as any;
        
        return (
          <Link
            key={item.path}
            to={item.label === "AI" ? "#" : item.path}
            onClick={(e) => {
              if (item.label === "AI") {
                e.preventDefault();
                assistant.openAssistant();
              }
            }}
            className={cn(
              "relative flex flex-col items-center gap-1.5 transition-all duration-300 active:scale-95 group",
              isActive ? "text-[#2D4D31]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {isActive && (

              <div className="absolute -top-4 w-12 h-1 bg-[#2D4D31] rounded-full animate-in fade-in slide-in-from-top-2 duration-500" />
            )}

            <div className={cn(
              "w-12 h-8 rounded-2xl flex items-center justify-center transition-all duration-500",
              isActive ? "bg-emerald-50 shadow-inner" : ""
            )}>
              {item.avatar ? (
                <div className={cn(
                  "w-6 h-6 rounded-full overflow-hidden border transition-all duration-500",
                  isActive ? "border-[#2D4D31] scale-110" : "border-gray-200 opacity-60"
                )}>
                  <img src={item.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <Icon 
                  size={24} 
                  weight={isActive ? "fill" : "bold"} 
                  className={cn("transition-transform duration-500", isActive && "scale-110")} 
                />
              )}
            </div>
            
            <span className={cn(
              "text-[9px] font-black uppercase tracking-[0.1em] transition-all duration-300",
              isActive ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0.5"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
