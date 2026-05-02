"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  Users, 
  Cow, 
  ShoppingCart, 
  Truck, 
  Wallet, 
  Lightbulb, 
  Gear, 
  CaretRight,
  ShieldCheck,
  ClipboardText,
  UserCircle,
  Stethoscope,
  Storefront,
  Buildings,
  Heartbeat,
  Warning,
  Money,
  Receipt,
  MapPin,
  ChartLineUp,
  DeviceMobile,
  PhoneCall,
  Bell,
  ChatCircleText,
  Pulse,
  Eye
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const NAV_STRUCTURE = [
  {
    group: "OVERVIEW",
    items: [
      { label: "Dashboard", href: "/admin", icon: SquaresFour },
    ]
  },
  {
    group: "USERS",
    items: [
      { label: "All Users", href: "/admin/users", icon: Users },
      { label: "Farmers", href: "/admin/users/farmers", icon: UserCircle },
      { label: "Vets", href: "/admin/users/vets", icon: Stethoscope },
      { label: "Chemists", href: "/admin/users/chemists", icon: Storefront },
      { label: "Distributors", href: "/admin/users/distributors", icon: Buildings },
    ]
  },
  {
    group: "LIVESTOCK",
    items: [
      { label: "All Animals", href: "/admin/livestock", icon: Cow },
      { label: "Health Events", href: "/admin/livestock/health", icon: Heartbeat },
      { label: "Diagnosis Sessions", href: "/admin/livestock/diagnosis", icon: Pulse },
      { label: "Valuations", href: "/admin/livestock/valuations", icon: Money },
    ]
  },
  {
    group: "MARKETPLACE",
    items: [
      { label: "All Orders", href: "/admin/marketplace/orders", icon: ShoppingCart },
      { label: "Products", href: "/admin/marketplace/products", icon: ClipboardText },
      { label: "Chemist Verification", href: "/admin/marketplace/verification", icon: ShieldCheck },
    ]
  },
  {
    group: "LOGISTICS",
    items: [
      { label: "Shipments", href: "/admin/logistics/shipments", icon: Truck },
      { label: "Drivers", href: "/admin/logistics/drivers", icon: MapPin },
    ]
  },
  {
    group: "FINANCE",
    items: [
      { label: "BNPL Agreements", href: "/admin/finance/bnpl", icon: Receipt },
      { label: "Credit Scores", href: "/admin/finance/credit", icon: ChartLineUp },
      { label: "Wallet Transactions", href: "/admin/finance/wallet", icon: Wallet },
      { label: "Settlements", href: "/admin/finance/settlements", icon: Money },
    ]
  },
  {
    group: "INTELLIGENCE",
    items: [
      { label: "Demand Forecasts", href: "/admin/intelligence/forecasts", icon: Lightbulb },
      { label: "Stockout Alerts", href: "/admin/intelligence/stockout", icon: Warning },
      { label: "Price Index", href: "/admin/intelligence/prices", icon: ChartLineUp },
    ]
  },
  {
    group: "COMMS",
    items: [
      { label: "USSD Sessions", href: "/admin/comms/ussd", icon: DeviceMobile },
      { label: "Voice Calls", href: "/admin/comms/voice", icon: PhoneCall },
      { label: "Notifications Log", href: "/admin/comms/notifications", icon: Bell },
      { label: "SMS Log", href: "/admin/comms/sms", icon: ChatCircleText },
    ]
  },
  {
    group: "PLATFORM",
    items: [
      { label: "Settings", href: "/admin/platform/settings", icon: Gear },
      { label: "Audit Log", href: "/admin/platform/audit", icon: ClipboardText },
      { label: "API Health", href: "/admin/platform/health", icon: Pulse },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [status] = useState<'optimal' | 'warning' | 'critical'>('optimal');

  const statusConfig = {
    optimal: { bg: "bg-emerald-50", text: "text-emerald-500", label: "Platform Active", sub: "All Systems Nominal" },
    warning: { bg: "bg-orange-50", text: "text-orange-500", label: "System Warning", sub: "Latency Detected" },
    critical: { bg: "bg-red-50", text: "text-red-500", label: "System Critical", sub: "Core API Offline" },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="flex flex-col gap-8">
      {/* Platform Status Card */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center">
        <div className={cn("w-20 h-20 rounded-[32px] flex items-center justify-center mb-6 transition-colors duration-500", currentStatus.bg)}>
           <img 
             src="/logo-mark.svg" 
             alt="Wafrivet" 
             className={cn("w-10 h-10 transition-all duration-500", status === 'optimal' ? 'grayscale-0' : 'grayscale')} 
             style={{ 
               filter: status === 'optimal' 
                 ? 'none' 
                 : status === 'warning' 
                   ? 'sepia(1) saturate(5) hue-rotate(10deg)' 
                   : 'sepia(1) saturate(10) hue-rotate(330deg)' 
             }}
           />
        </div>
        <h3 className="text-[20px] font-black text-gray-900 tracking-tight leading-none mb-6">ADMIN</h3>
        
        <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-gray-50">
           <div className="flex flex-col">
              <span className="text-[15px] font-black text-gray-900 leading-none">1.2k</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1.5">Live Users</span>
           </div>
           <div className="flex flex-col border-l border-gray-50">
              <span className="text-[15px] font-black text-gray-900 leading-none">428</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1.5">New Orders</span>
           </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="space-y-10">
        {NAV_STRUCTURE.map((group) => (
          <div key={group.group}>
            <h4 className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
              {group.group}
            </h4>
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-5 py-4 transition-all group",
                      isActive 
                        ? "bg-gray-50 text-[#2D4D31]" 
                        : "text-gray-500 hover:bg-gray-50/50"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                        isActive 
                          ? "bg-white text-[#2D4D31] shadow-sm border border-gray-100" 
                          : "bg-gray-50 text-gray-400 group-hover:text-gray-900 group-hover:bg-white"
                      )}>
                        <item.icon size={18} weight={isActive ? "fill" : "bold"} />
                      </div>
                      <span className={cn(
                        "text-[13px] font-bold tracking-tight transition-colors",
                        isActive ? "text-gray-900" : "group-hover:text-gray-900"
                      )}>
                        {item.label}
                      </span>
                    </div>
                    {isActive && <CaretRight size={14} weight="bold" className="text-[#2D4D31]" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Stats */}
      <div className="bg-[#2D4D31] p-8 rounded-[40px] text-white shadow-xl shadow-[#2D4D31]/20">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
               <Eye size={18} weight="bold" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest">Real-time Insight</span>
         </div>
         <p className="text-[14px] font-medium leading-relaxed text-emerald-100/80 mb-6">
           Lekki North region shows 14% higher demand for Antibiotics this week.
         </p>
         <button className="w-full py-3 bg-white text-[#2D4D31] rounded-2xl text-[11px] font-black uppercase tracking-[0.1em] hover:bg-emerald-50 transition-all">
           View Analysis
         </button>
      </div>
    </div>
  );
}
