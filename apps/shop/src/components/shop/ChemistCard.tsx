"use client";

import { SealCheck, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import { getChemistCardImage } from "@/lib/chemistUtils";

interface ChemistCardProps {
  supplierId: string;
  name: string;
  verified?: boolean;
  isOpen?: boolean;
  bannerUrl?: string | null;
  logoUrl?: string | null;
}

export function ChemistCard({
  supplierId,
  name,
  verified = true,
  isOpen,
  bannerUrl,
  logoUrl,
}: ChemistCardProps) {
  const image = getChemistCardImage({ bannerUrl: bannerUrl ?? null, logoUrl: logoUrl ?? null });

  return (
    <Link
      href={`/chemists/${supplierId}`}
      className="flex-shrink-0 w-[280px] bg-white rounded-[32px] border border-gray-100 p-4 transition-all group hover:border-[#2D4D31]/10 shadow-sm"
    >
      <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {verified ? (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg shadow-sm">
            <SealCheck size={12} weight="fill" className="text-blue-500" />
            <span className="text-[11px] font-bold text-gray-900">Verified</span>
          </div>
        ) : null}
      </div>
      <div>
        <div className="flex items-center gap-1 mb-1">
          <h3 className="font-bold text-gray-900 text-[15px] line-clamp-1 group-hover:text-[#2D4D31] transition-colors">
            {name}
          </h3>
          {verified ? (
            <SealCheck size={18} weight="fill" className="text-blue-500 shrink-0" />
          ) : null}
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            {isOpen !== undefined ? (
              <>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span
                  className={`text-[11px] font-black uppercase tracking-wider ${isOpen ? "text-green-600" : "text-gray-400"}`}
                >
                  {isOpen ? "Open now" : "Closed"}
                </span>
              </>
            ) : (
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                View profile
              </span>
            )}
          </div>
          <CaretRight size={14} weight="bold" className="text-gray-300 group-hover:text-[#2D4D31]" />
        </div>
      </div>
    </Link>
  );
}
