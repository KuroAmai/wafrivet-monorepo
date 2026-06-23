import {
  WifiHigh,
  Warning,
  ArrowsClockwise,
  Info,
  CheckCircle,
  Robot,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { herdApi } from "@wafrivet/api";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";
import { isWebNfcSupported, scanNfcTag } from "@/lib/nfc";
import { useHerdAssistant } from "@/context/HerdAssistantContext";

export default function Scan() {
  useDocumentTitle("NFC Scanner");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastScan, setLastScan] = useState<{
    chipUid: string;
    animalUid?: string;
    animalName?: string;
  } | null>(null);
  const assistant = useHerdAssistant();

  const startScan = async () => {
    setError(null);
    setIsScanning(true);
    try {
      if (!isWebNfcSupported()) {
        throw new Error("Web NFC requires Chrome on Android with NFC enabled.");
      }

      const chipUid = await scanNfcTag();
      let animalUid: string | undefined;
      let animalName: string | undefined;

      try {
        const resolved = await herdApi.resolveTag(chipUid);
        animalUid = resolved.animal?.animalUid;
        animalName = resolved.animal?.name ?? undefined;
      } catch {
        /* tag may be unprovisioned — assistant can still help sync it */
      }

      setLastScan({ chipUid, animalUid, animalName });
      assistant.setScanResult(chipUid, animalUid ?? null, animalName ?? null);
      assistant.openAssistant({
        chipUid,
        animalUid,
        animalName,
        autoStartLive: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "NFC scan failed.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between py-6 animate-in fade-in slide-in-from-right-4 duration-700 pb-32">
      <div className="space-y-1 text-center">
        <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
          NFC <span className="text-gray-400">Scanner</span>
        </h1>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Sync Hardware Tag
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative py-12">
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
              isScanning ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="w-[320px] h-[320px] bg-[#2D4D31]/5 rounded-full animate-pulse-ring" />
            <div className="absolute w-[260px] h-[260px] bg-[#2D4D31]/5 rounded-full animate-pulse-ring delay-700" />
          </div>

          <button
            onClick={() => void startScan()}
            disabled={isScanning}
            className={cn(
              "relative w-64 h-64 rounded-[80px] flex flex-col items-center justify-center gap-6 transition-all duration-700 shadow-[0_40px_80px_-12px_rgba(45,77,49,0.3)] active:scale-95 group",
              isScanning ? "bg-emerald-600 scale-105" : "bg-[#2D4D31] hover:scale-[1.02]",
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/20">
              <WifiHigh
                size={56}
                weight="bold"
                className={cn(
                  "text-white transition-all duration-500 rotate-90",
                  isScanning && "scale-110 animate-pulse",
                )}
              />
            </div>

            <div className="text-center">
              <p className="text-[13px] font-black uppercase tracking-[0.3em] text-white">
                {isScanning ? "Scanning..." : "Tap to Scan"}
              </p>
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">
                Hold tag near phone
              </p>
            </div>
          </button>
        </div>

        <div className="mt-12 text-center space-y-3 px-6">
          {isScanning && (
            <div className="flex items-center gap-2 justify-center">
              <ArrowsClockwise size={16} className="text-[#2D4D31] animate-spin" />
              <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">
                Awaiting tag…
              </span>
            </div>
          )}

          {error && <p className="text-[12px] font-bold text-red-500">{error}</p>}

          {lastScan && (
            <div className="bg-white p-5 rounded-[28px] border border-emerald-100 shadow-sm space-y-3">
              <div className="flex items-center gap-2 justify-center text-emerald-600">
                <CheckCircle size={18} weight="fill" />
                <span className="text-[11px] font-black uppercase tracking-widest">Tag captured</span>
              </div>
              <p className="text-[13px] font-bold text-gray-900">{lastScan.chipUid}</p>
              {lastScan.animalUid && (
                <p className="text-[12px] text-gray-500">
                  {lastScan.animalName ?? "Animal"} · {lastScan.animalUid}
                </p>
              )}
              <button
                type="button"
                onClick={() =>
                  assistant.openAssistant({
                    chipUid: lastScan.chipUid,
                    animalUid: lastScan.animalUid,
                    animalName: lastScan.animalName,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D4D31] text-white rounded-xl text-[11px] font-black uppercase tracking-widest"
              >
                <Robot size={16} weight="bold" />
                Ask AI about this tag
              </button>
              {lastScan.animalUid && (
                <Link
                  to={`/animal/${lastScan.animalUid}`}
                  className="block text-[11px] font-bold text-emerald-700 underline"
                >
                  Open animal record
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
            <Info size={20} weight="bold" />
          </div>
          <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
            Chrome Android only
          </p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3">
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
            <Warning size={20} weight="bold" />
          </div>
          <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
            Enable NFC in settings
          </p>
        </div>
      </div>
    </div>
  );
}
