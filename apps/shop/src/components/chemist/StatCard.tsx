"use client";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down";
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col justify-center hover:border-[#2D4D31]/10 transition-all group">
      <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-1">{label}</p>
      <h3 className="text-[22px] font-black text-gray-900 tracking-tight">{value}</h3>
    </div>
  );
}
