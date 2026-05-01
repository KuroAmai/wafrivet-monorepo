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

const colorMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100",
  green: "bg-green-50 text-green-600 border-green-100",
  red: "bg-red-50 text-red-600 border-red-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
};

export function StatCard({ label, value, subValue, trend, icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
            {trend === "up" ? "+" : "-"}{subValue}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}
