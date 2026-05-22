import {
  CaretLeft,
  Thermometer,
  WarningCircle,
  CaretRight,
  ShareNetwork,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAnimals } from "@/hooks/useHerdApi";

const DEMO_ALERTS = [
  {
    id: 1,
    animal: "Bella",
    tag: "WAF-882",
    issue: "Elevated Temperature",
    severity: "Critical",
    value: "40.2°C",
    time: "12m ago",
    icon: Thermometer,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

export default function HealthAlerts() {
  useDocumentTitle("Health Alerts");
  const [activeTab, setActiveTab] = useState("Critical");
  const { data: animals, isLoading, isError, error, refetch } = useAnimals();

  const alerts = useMemo(() => {
    const fromApi =
      animals
        ?.filter((a) => a.status && a.status !== "OPTIMAL")
        .map((a, idx) => ({
          id: idx,
          animal: a.name ?? "Unknown",
          tag: a.wafId ?? a.animalUid,
          issue: `Status: ${a.status}`,
          severity: a.status === "CRITICAL" ? "Critical" : "Moderate",
          value: a.species ?? "—",
          time: "Live",
          icon: a.status === "CRITICAL" ? Thermometer : WarningCircle,
          color: a.status === "CRITICAL" ? "text-red-500" : "text-orange-500",
          bg: a.status === "CRITICAL" ? "bg-red-50" : "bg-orange-50",
        })) ?? [];
    if (fromApi.length > 0) return fromApi;
    return isError && isMockDataEnabled() ? DEMO_ALERTS : fromApi;
  }, [animals, isError]);

  const filtered = alerts.filter((a) => {
    if (activeTab === "All") return true;
    if (activeTab === "Critical") return a.severity === "Critical";
    return a.severity !== "Critical";
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link
          to="/"
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
        >
          <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Health Alerts</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
          <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-8">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && filtered.length === 0}
          onRetry={() => refetch()}
        />

        <div className="flex bg-gray-100 p-1 rounded-2xl">
          {["All", "Critical", "Moderate"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all",
                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-400",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((alert) => (
            <Link
              key={alert.id}
              to={`/animal/${alert.tag}`}
              className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6 group hover:border-red-100 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105",
                      alert.bg,
                      alert.color,
                    )}
                  >
                    <alert.icon size={28} weight="bold" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-black text-gray-900">{alert.animal}</h4>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                      {alert.tag}
                    </p>
                  </div>
                </div>
                <CaretRight size={20} className="text-gray-300" />
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <p className="text-[13px] font-black text-gray-900">{alert.issue}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    {alert.severity} · {alert.time}
                  </p>
                </div>
                <span className={cn("text-[14px] font-black", alert.color)}>{alert.value}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
