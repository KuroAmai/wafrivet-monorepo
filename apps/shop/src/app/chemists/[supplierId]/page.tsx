"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import {
  MapPin,
  Clock,
  SealCheck,
  ShareNetwork,
  Info,
  Medal,
  Users,
} from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { usePublicChemist, usePublicChemistOffers } from "@/hooks/useShopApi";
import {
  CHEMIST_BANNER_PLACEHOLDER,
  formatDistanceKm,
  formatOfferPrice,
  getChemistLogoImage,
} from "@/lib/chemistUtils";

export default function ChemistProfilePage() {
  const params = useParams<{ supplierId: string }>();
  const supplierId = params.supplierId;

  const {
    data: chemist,
    isLoading,
    isError,
    error,
    refetch,
  } = usePublicChemist(supplierId);
  const {
    data: offers,
    isLoading: offersLoading,
    isError: offersError,
    error: offersQueryError,
    refetch: refetchOffers,
  } = usePublicChemistOffers(supplierId, { limit: 24 });

  const distance = formatDistanceKm(chemist?.distanceKm);
  const banner = chemist?.bannerUrl ?? CHEMIST_BANNER_PLACEHOLDER;
  const logo = chemist ? getChemistLogoImage(chemist) : CHEMIST_BANNER_PLACEHOLDER;

  const stats = [
    { label: "Products", value: String(chemist?.productCount ?? 0), icon: Medal },
    {
      label: "Orders fulfilled",
      value: String(chemist?.fulfilledOrderCount ?? 0),
      icon: Users,
    },
    {
      label: "Status",
      value:
        chemist?.isOpenNow === undefined
          ? "See hours"
          : chemist.isOpenNow
            ? "Open"
            : "Closed",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <ShopNavbar />

      <div className="relative h-[250px] md:h-[350px] w-full bg-gray-200 overflow-hidden">
        <img src={banner} className="w-full h-full object-cover" alt="Chemist banner" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-20 relative z-10">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError}
          errorMessage={(error as Error)?.message}
          onRetry={() => refetch()}
        />

        {chemist ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/20">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <img
                        src={logo}
                        className="w-28 h-28 rounded-[32px] border-4 border-white shadow-xl object-cover"
                        alt={chemist.name}
                      />
                      {chemist.isVerified ? (
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#2D4D31] rounded-2xl flex items-center justify-center text-white border-4 border-white">
                          <SealCheck size={20} weight="fill" />
                        </div>
                      ) : null}
                    </div>
                    <h1 className="text-[24px] font-black text-gray-900 tracking-tight mb-2">
                      {chemist.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-6">
                      {chemist.isVerified ? (
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                          <SealCheck size={14} weight="fill" className="text-blue-500" />
                          <span className="text-[13px] font-bold text-gray-900">Verified chemist</span>
                        </div>
                      ) : null}
                      {distance ? (
                        <span className="text-[13px] text-gray-400 font-medium">{distance} away</span>
                      ) : null}
                    </div>

                    {chemist.publicBio ? (
                      <p className="text-[14px] text-gray-500 leading-relaxed mb-8">{chemist.publicBio}</p>
                    ) : (
                      <p className="text-[14px] text-gray-400 leading-relaxed mb-8">
                        {chemist.regionName} · {chemist.activeOfferCount} products in stock
                      </p>
                    )}
                  </div>

                  <div className="mt-10 space-y-4 pt-8 border-t border-gray-50">
                    <div className="flex items-start gap-4">
                      <MapPin size={20} className="text-[#2D4D31] mt-1 shrink-0" weight="fill" />
                      <div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                          Location
                        </p>
                        <p className="text-[14px] font-bold text-gray-900 leading-tight">
                          {chemist.address}
                        </p>
                      </div>
                    </div>
                    {chemist.workingHours ? (
                      <div className="flex items-start gap-4">
                        <Clock size={20} className="text-[#2D4D31] mt-1 shrink-0" weight="fill" />
                        <div>
                          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                            Opening Hours
                          </p>
                          <p className="text-[14px] font-bold text-gray-900 leading-tight">
                            {chemist.workingHours}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white p-4 rounded-[28px] border border-gray-100 text-center shadow-sm"
                    >
                      <stat.icon size={20} className="text-[#2D4D31] mx-auto mb-2" weight="duotone" />
                      <p className="text-[16px] font-black text-gray-900 leading-none mb-1">{stat.value}</p>
                      <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-4 rounded-[32px] border border-gray-100 flex items-center justify-between shadow-sm">
                <h2 className="text-[18px] font-black text-gray-900 ml-4 tracking-tight">
                  Available Products
                </h2>
                <button
                  type="button"
                  className="p-2.5 bg-gray-50 rounded-xl text-gray-400"
                  aria-label="Share"
                >
                  <ShareNetwork size={20} />
                </button>
              </div>

              <ApiQueryFeedback
                isLoading={offersLoading}
                isError={offersError}
                errorMessage={(offersQueryError as Error)?.message}
                isEmpty={!offersLoading && !offersError && !offers?.length}
                onRetry={() => refetchOffers()}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {(offers ?? []).map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.masterSkuId}
                    name={product.name}
                    price={formatOfferPrice(product.unitPrice)}
                    category={product.category}
                    image={product.imageUrl ?? logo}
                    stock={product.stockQuantity}
                    coldChain={product.requiresColdChain}
                  />
                ))}
              </div>

              {chemist.publicBio ? (
                <div className="bg-white p-8 rounded-[40px] border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Info size={24} weight="fill" className="text-[#2D4D31]" />
                    <h2 className="text-[20px] font-black text-gray-900 tracking-tight">
                      About {chemist.name}
                    </h2>
                  </div>
                  <p className="text-[15px] text-gray-500 leading-relaxed">{chemist.publicBio}</p>
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {chemist.isVerified ? (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2D4D31]">
                          <SealCheck size={20} weight="fill" />
                        </div>
                        <span className="text-[14px] font-bold text-gray-700">Wafrivet Certified Seller</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
