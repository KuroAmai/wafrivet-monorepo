import {
  CaretLeft,
  Heartbeat,
  Thermometer,
  Scales,
  Calendar,
  Syringe,
  ClipboardText,
  ShareNetwork,
} from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { isMockDataEnabled } from "@wafrivet/api";
import { ApiQueryFeedback } from "@wafrivet/ui";
import { useAnimal } from "@/hooks/useHerdApi";
import { useHerdAssistant } from "@/context/HerdAssistantContext";
import { Robot } from "@phosphor-icons/react";

const DEMO_ANIMAL = {
  id: "WAF-882",
  name: "Bella",
  breed: "Holstein Friesian",
  age: "4.2 Years",
  gender: "Female",
  status: "Healthy",
  vitals: [
    { label: "Heart Rate", value: "72 bpm", icon: Heartbeat },
    { label: "Temp", value: "38.5°C", icon: Thermometer },
    { label: "Weight", value: "580 kg", icon: Scales },
  ],
  history: [
    { date: "May 12, 2026", event: "Routine Vaccination", provider: "Dr. Ademola", type: "medical" },
  ],
};

export default function AnimalDetail() {
  const { id } = useParams();
  const animalUid = id ?? "";
  const assistant = useHerdAssistant();
  const { data, isLoading, isError, error, refetch } = useAnimal(animalUid);

  const animal = data
    ? {
        id: data.wafId ?? data.animalUid,
        name: data.name ?? "Unknown",
        breed: data.breed ?? "—",
        age: "—",
        gender: "—",
        status: data.status ?? "UNKNOWN",
        vitals: [
          { label: "Species", value: data.species ?? "—", icon: ClipboardText },
          { label: "Farm", value: data.farmId ?? "—", icon: Calendar },
          { label: "UID", value: data.animalUid.slice(0, 8), icon: Syringe },
        ],
        history: [] as typeof DEMO_ANIMAL.history,
      }
    : isError && isMockDataEnabled()
      ? { ...DEMO_ANIMAL, id: animalUid || DEMO_ANIMAL.id }
      : null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-32 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-5 rounded-b-[32px] border-b border-gray-100 shadow-sm flex items-center justify-between">
        <Link
          to="/animals"
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
        >
          <CaretLeft size={20} weight="bold" />
        </Link>
        <h1 className="text-[16px] font-black text-gray-900 uppercase tracking-widest">Animal Profile</h1>
        <button className="w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center text-gray-900">
          <ShareNetwork size={20} weight="bold" />
        </button>
      </div>

      <div className="px-6 py-10 space-y-10">
        <ApiQueryFeedback
          isLoading={isLoading}
          isError={isError && !isMockDataEnabled()}
          errorMessage={(error as Error)?.message}
          isEmpty={!isLoading && !isError && !animal}
          onRetry={() => refetch()}
        />

        {animal ? (
          <>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-[48px] border-4 border-white shadow-2xl bg-emerald-50 flex items-center justify-center">
                <Heartbeat size={48} className="text-[#2D4D31]" weight="duotone" />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-[28px] font-black text-gray-900 leading-tight">{animal.name}</h2>
                <p className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  {animal.id} • {animal.breed}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {animal.vitals.map((vital, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3"
                >
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                    <vital.icon size={20} weight="bold" />
                  </div>
                  <div>
                    <p className="text-[14px] font-black text-gray-900">{vital.value}</p>
                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">
                      {vital.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {animal.history.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">
                  Recent history
                </h3>
                {animal.history.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-[32px] border border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-black text-gray-900">{item.event}</p>
                      <p className="text-[11px] text-gray-400">{item.provider}</p>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400">{item.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-600">No health events recorded yet.</p>
            )}
          </>
        ) : null}
      </div>

      {animalUid && (
        <button
          type="button"
          onClick={() =>
            assistant.openAssistant({
              animalUid,
              animalName: animal?.name,
              autoStartLive: true,
            })
          }
          className="fixed bottom-32 right-6 bg-white border border-emerald-100 p-4 rounded-[32px] shadow-[0_20px_40px_rgba(45,77,49,0.2)] flex items-center gap-3 active:scale-95 z-40"
        >
          <div className="w-11 h-11 bg-[#2D4D31] text-white rounded-2xl flex items-center justify-center">
            <Robot size={22} weight="bold" />
          </div>
          <span className="text-[12px] font-black text-gray-900 pr-2">Live AI</span>
        </button>
      )}
    </div>
  );
}
