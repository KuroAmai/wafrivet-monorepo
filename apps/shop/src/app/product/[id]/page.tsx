"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import {
  CaretLeft,
  ShoppingCart,
  SealCheck,
  ThermometerCold,
  Hourglass,
  Drop,
  Horse,
  Cow,
  Bird,
  Star,
} from "@phosphor-icons/react";
import Link from "next/link";
import { use, useState } from "react";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useCatalogItem } from "@/hooks/useShopApi";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError, error, refetch } = useCatalogItem(id);

  const price = 6500;

  return (
    <div className="min-h-screen bg-white pb-32">
      <ShopNavbar />

      <main className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <CaretLeft size={20} weight="bold" className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[14px]">Back to Marketplace</span>
        </Link>

        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && !product}
          onRetry={() => refetch()}
        />

        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 flex items-center justify-center p-12">
                <Drop size={120} className="text-[#2D4D31]/20" weight="duotone" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-[#2D4D31]/5 text-[#2D4D31] text-[11px] font-black uppercase tracking-wider rounded-lg">
                    {product.dosageForm}
                  </span>
                  {product.nafdacRegNo ? (
                    <div className="flex items-center gap-1 text-gray-400">
                      <SealCheck size={14} weight="fill" className="text-blue-500" />
                      <span className="text-[11px] font-bold">NAFDAC: {product.nafdacRegNo}</span>
                    </div>
                  ) : null}
                </div>
                <h1 className="text-[32px] md:text-[40px] font-black text-gray-900 leading-[1.1] mb-2 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-[16px] md:text-[18px] text-gray-400 font-medium tracking-tight">
                  {product.description ?? product.genericName}
                </p>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-[28px] font-black text-[#2D4D31]">₦{price.toLocaleString()}</span>
                </div>
                <p className="text-[13px] text-gray-500 mt-1 font-medium italic">
                  {product.manufacturer}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Drop size={16} weight="bold" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Form</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">{product.dosageForm}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <ThermometerCold size={16} weight="bold" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Storage</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">
                    {product.requiresColdChain ? "Cold Chain (2-8°C)" : "Ambient"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Hourglass size={16} weight="bold" />
                    <span className="text-[11px] font-black uppercase tracking-widest">SKU</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">{product.skuCode}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Star size={16} weight="bold" />
                    <span className="text-[11px] font-black uppercase tracking-widest">Strength</span>
                  </div>
                  <p className="text-[14px] font-bold text-gray-900">
                    {product.strength ?? product.unitOfMeasure}
                  </p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  Active ingredient
                </h3>
                <p className="text-[14px] font-bold text-gray-700">{product.activeIngredient}</p>
              </div>
            </div>
          </div>
        ) : isMockDataEnabled() && isError ? (
          <p className="text-sm text-gray-500">Demo product unavailable — check catalog API.</p>
        ) : null}
      </main>

      {product ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-4 md:p-6 z-50">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center text-[20px] font-bold hover:bg-white rounded-xl transition-all"
              >
                -
              </button>
              <span className="w-12 text-center font-black text-[16px]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 flex items-center justify-center text-[20px] font-bold hover:bg-white rounded-xl transition-all"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-[#2D4D31] text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-black text-[16px] hover:bg-[#243f28] transition-all shadow-xl shadow-[#2D4D31]/20">
              <ShoppingCart size={24} weight="bold" />
              Add to Cart — ₦{(price * quantity).toLocaleString()}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
