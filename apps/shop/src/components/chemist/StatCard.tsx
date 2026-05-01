"use client";

import { IconProps } from "@phosphor-icons/react";
import { ReactElement } from "react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down";
  icon: ReactElement<IconProps>;
  color: "blue" | "green" | "red" | "purple";
}

export function StatCard({ label, value, subValue, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col justify-between hover:border-[#2D4D31]/20 transition-all group">
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-400 group-hover:text-[#2D4D31] transition-colors">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
            {trend === "up" ? "↑" : "↓"} {subValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.15em] mb-1">{label}</p>
        <h3 className="text-[24px] font-black text-gray-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
