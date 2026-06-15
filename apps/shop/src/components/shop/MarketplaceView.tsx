"use client";

import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChemistCard } from "@/components/shop/ChemistCard";
import Link from "next/link";
import { TrendUp, Package, PawPrint } from "@phosphor-icons/react";
import { useState, useEffect, useMemo } from "react";
import { getAccessToken, isMockDataEnabled } from "@wafrivet/api";
import { getCentralLoginUrl } from "@wafrivet/auth";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { formatOrderDisplay, useCatalog, usePublicChemists, useServerCommerceEnabled, useShopperOrders } from "@/hooks/useShopApi";
import { useAuth } from "@wafrivet/auth";
import { isSecurityCompanyBuyer } from "@/lib/shopperCapabilities";

const ANIMALS = ["Cattle", "Poultry", "Pigs", "Goats", "Sheep"];
const DOG_CATEGORIES = ["Dewormers", "Flea & tick", "Vitamins", "Wound care", "Training aids"];

export function MarketplaceView() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useAuth();
  const profile = user as { roles?: string[]; role?: string } | null;
  const dogMode = isSecurityCompanyBuyer(profile?.roles, profile?.role);
  const categoryChips = dogMode ? DOG_CATEGORIES : ANIMALS;

  const { data: catalogItems, isLoading, isError, error, refetch } = useCatalog(search);
  const {
    data: chemists,
    isLoading: chemistsLoading,
    isError: chemistsError,
    error: chemistsQueryError,
    refetch: refetchChemists,
  } = usePublicChemists({ limit: 6 });
  const serverCommerce = useServerCommerceEnabled();
  const { data: orders } = useShopperOrders({ limit: 5 });

  const activeOrder = useMemo(() => {
    if (!serverCommerce || !orders?.length) return null;
    const inTransit = orders.find((o) =>
      ["OUT_FOR_DELIVERY", "PROCESSING", "CONFIRMED"].includes(String(o.status).toUpperCase()),
    );
    const target = inTransit ?? orders[0];
    return target ? formatOrderDisplay(target) : null;
  }, [serverCommerce, orders]);

  useEffect(() => {
    setIsLoggedIn(Boolean(getAccessToken()));
  }, []);

  const handleProtectedAction = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      window.location.href = getCentralLoginUrl(
        typeof window !== "undefined" ? window.location.href : undefined,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20 font-sans">
      <ShopNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <section className="py-8 md:py-24 flex flex-col items-center text-center px-4">
          <div className="w-full max-w-2xl relative">
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dogMode ? "Search dog supplies..." : "Search..."}
              className="w-full h-14 md:h-20 text-center bg-white rounded-xl md:rounded-[32px] text-[15px] md:text-[20px] font-medium outline-none focus:ring-4 focus:ring-[#2D4D31]/5 transition-all border border-gray-100 text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </section>

        {isLoggedIn && serverCommerce && activeOrder ? (
          <section className="mb-10 flex gap-4 overflow-x-auto no-scrollbar py-2 px-2">
            <Link
              href={`/profile/orders/${activeOrder.id}`}
              className="flex-shrink-0 w-[300px] bg-white p-5 rounded-[28px] border border-gray-100 flex items-center gap-4 hover:border-[#2D4D31]/20 transition-all"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Package size={24} weight="duotone" />
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-gray-900">{activeOrder.status}</h2>
                <p className="text-[12px] text-gray-400">Order #{activeOrder.label}</p>
              </div>
            </Link>
          </section>
        ) : isLoggedIn ? null : (
          <section className="mb-10 px-2">
             <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
                   <div className="w-12 h-12 bg-[#2D4D31]/5 rounded-xl flex items-center justify-center text-[#2D4D31] shrink-0">
                      <TrendUp size={24} weight="bold" />
                   </div>
                   <div className="flex flex-col">
                      <h2 className="text-[16px] md:text-[18px] font-bold text-gray-900 leading-tight">Sign in for a personalized experience</h2>
                      <p className="text-[13px] text-gray-500 mt-1">
                        {dogMode
                          ? "Track orders and shop supplies tailored for your kennel"
                          : "Track orders and see recommendations for your animals"}
                      </p>
                   </div>
                </div>
                <button onClick={handleProtectedAction} className="w-full sm:w-auto bg-[#2D4D31] text-white px-8 py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#243f28] transition-colors shrink-0">
                   Sign In
                </button>
             </div>
          </section>
        )}

        <section className="mb-12">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-4 px-2">
            {categoryChips.map((animal) => (
              <button key={animal} className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-100 rounded-2xl group transition-all">
                <PawPrint size={18} className="text-gray-300 group-hover:text-[#2D4D31]" />
                <span className="font-bold text-[14px] text-gray-600 group-hover:text-[#2D4D31]">{animal}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-[20px] font-black text-gray-900 tracking-tight">Chemists near you</h2>
            <Link href="/chemists" className="text-[14px] font-bold text-[#2D4D31] hover:underline">View Map</Link>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            <ApiQueryFeedback
              isLoading={chemistsLoading}
              isError={chemistsError}
              errorMessage={(chemistsQueryError as Error)?.message}
              isEmpty={!chemistsLoading && !chemistsError && !chemists?.length}
              onRetry={() => refetchChemists()}
            />
            {(chemists ?? []).map((chemist) => (
              <ChemistCard
                key={chemist.id}
                supplierId={chemist.id}
                name={chemist.name}
                verified={chemist.isVerified}
                isOpen={chemist.isOpenNow}
                bannerUrl={chemist.bannerUrl}
                logoUrl={chemist.logoUrl}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center justify-center mb-12 px-2 text-center">
            <h2 className="text-[22px] font-black text-gray-900 tracking-tight">
              {dogMode ? "Recommended for your kennel" : "Recommended for you"}
            </h2>
          </div>
          
          <ApiQueryFeedback
            isLoading={isLoading}
            isError={isError && !isMockDataEnabled()}
            errorMessage={(error as Error)?.message}
            isEmpty={!isLoading && !isError && !catalogItems?.length}
            onRetry={() => refetch()}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8">
            {(catalogItems ?? []).slice(0, 12).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price="—"
                category={item.dosageForm ?? "Catalog"}
                image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400"
                stock={10}
                coldChain={item.requiresColdChain}
              />
            ))}
            {isMockDataEnabled() && isError ? (
              <>
                <ProductCard id="1" name="Oxytetracycline 20%" price="6,500" category="Antibiotics" image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400" stock={3} coldChain />
                <ProductCard id="2" name="Ivermectin 1%" price="4,200" category="Dewormers" image="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=400" stock={12} />
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
