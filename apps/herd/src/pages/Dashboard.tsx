import {
  MagnifyingGlass,
  ClockCounterClockwise,
  Cow,
  Tag,
  IdentificationBadge,
  Warning,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAnimals } from "@/hooks/useHerdApi";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

const DEMO_RECENT = [
  { id: "WAF-882", name: "Bella", type: "Bovine", icon: Cow },
  { id: "WAF-901", name: "Luna", type: "Ovine", icon: Tag },
];

export default function Dashboard() {
  useDocumentTitle();
  const { data: apiAnimals, isLoading, isError, error, refetch } = useAnimals();

  const recent =
    apiAnimals?.slice(0, 4).map((a) => ({
      id: a.wafId ?? a.animalUid,
      name: a.name ?? "Unknown",
      type: a.species ?? "Livestock",
      icon: Cow,
    })) ?? [];

  const displayRecent =
    recent.length > 0 ? recent : isError && isMockDataEnabled() ? DEMO_RECENT : recent;

  const alertCount =
    apiAnimals?.filter((a) => a.status && a.status !== "OPTIMAL").length ?? 0;
  const herdSize = apiAnimals?.length ?? 0;

  return (
    <div className="space-y-10 py-6 animate-in fade-in duration-700 pb-32">
      <div className="space-y-1">
        <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
          Good Evening, <br />
          <span className="text-gray-400">Herd Manager</span>
        </h1>
      </div>

      <section className="bg-white border border-gray-100 rounded-[32px] p-1 flex items-center shadow-sm focus-within:ring-4 focus-within:ring-[#2D4D31]/5 focus-within:border-[#2D4D31]/20 transition-all">
        <div className="pl-5 pr-3">
          <MagnifyingGlass size={20} weight="bold" className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search animal by WAF ID or Name..."
          className="flex-1 py-3.5 bg-transparent border-none outline-none text-[14px] font-black text-gray-900 placeholder:text-gray-300 placeholder:font-bold"
        />
      </section>

      <ApiQueryFeedback
        isLoading={isLoading}
        isError={isError && !isMockDataEnabled()}
        errorMessage={(error as Error)?.message}
        isEmpty={!isLoading && !isError && displayRecent.length === 0}
        onRetry={() => refetch()}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <ClockCounterClockwise size={18} weight="bold" />
            Recent Animals
          </h3>
          <Link
            to="/history"
            className="px-4 py-1.5 bg-emerald-50 text-[#2D4D31] rounded-full text-[10px] font-black uppercase tracking-[0.15em] hover:bg-emerald-100 transition-all active:scale-95 shadow-sm shadow-emerald-900/5 flex items-center gap-1.5"
          >
            View History
            <ClockCounterClockwise size={12} weight="bold" className="opacity-60" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {displayRecent.map((animal) => (
            <Link
              key={animal.id}
              to={`/animal/${animal.id}`}
              className="flex-shrink-0 w-40 bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2D4D31]/5 group-hover:text-[#2D4D31] transition-colors text-gray-400">
                <animal.icon size={24} weight="duotone" />
              </div>
              <h4 className="text-[14px] font-black text-gray-900 truncate">{animal.name}</h4>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                {animal.id}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <Link
          to="/animals"
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-emerald-500/10 transition-all active:scale-[0.98]"
        >
          <IdentificationBadge size={28} className="text-[#2D4D31]" weight="duotone" />
          <div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Active Herd</p>
            <p className="text-[32px] font-black text-gray-900">{herdSize}</p>
          </div>
        </Link>
        <Link
          to="/alerts"
          className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-4 hover:border-red-100 transition-all active:scale-[0.98]"
        >
          <Warning size={28} className="text-red-500" weight="duotone" />
          <div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Health Alerts</p>
            <p className="text-[32px] font-black text-red-500">{String(alertCount).padStart(2, "0")}</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
