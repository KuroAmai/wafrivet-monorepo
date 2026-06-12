import { CaretLeft, MapPin, ArrowsClockwise } from "@phosphor-icons/react";
import Link from "next/link";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useFarms } from "@/hooks/useHerdApi";

export default function ManagedFarmsPage() {
  const { data: farms, isLoading, isError, error, refetch } = useFarms();
  const totalAnimals = (farms ?? []).reduce((sum, f) => sum + (f.animalCount ?? 0), 0);

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <Link href="/settings" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform">
           <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Managed Farms</h1>
        <button type="button" onClick={() => refetch()} className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900">
           <ArrowsClockwise size={18} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && (farms ?? []).length === 0}
          onRetry={() => refetch()}
        />

        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#2D4D31] p-6 rounded-[32px] text-white">
              <p className="text-[11px] font-black uppercase tracking-widest text-white/60 mb-2">Total Managed</p>
              <h2 className="text-[32px] font-black">{farms?.length ?? 0}</h2>
           </div>
           <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
              <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Total Animals</p>
              <h2 className="text-[32px] font-black text-gray-900">{totalAnimals}</h2>
           </div>
        </div>

        <div className="space-y-4">
           {(farms ?? []).map((farm) => (
             <div key={farm.farmId} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[18px] font-black text-gray-900">{farm.name}</h3>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-[13px] font-medium">
                   <MapPin size={16} weight="bold" />
                   {farm.location ?? "—"}
                </div>
                <p className="mt-4 text-[13px] font-bold text-gray-600">{farm.animalCount ?? 0} animals</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
