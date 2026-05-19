import { WifiHigh, Warning, ArrowsClockwise, Info } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDocumentTitle } from "@/lib/useDocumentTitle";

export default function Scan() {
  useDocumentTitle("NFC Scanner");
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-between py-6 animate-in fade-in slide-in-from-right-4 duration-700 pb-32">
      {/* Header */}
      <div className="space-y-1 text-center">
        <h1 className="text-[32px] font-black text-gray-900 tracking-tight leading-tight">
          NFC <span className="text-gray-400">Scanner</span>
        </h1>
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Sync Hardware Tag</p>
      </div>

      {/* Immersive Scan Zone */}
      <div className="flex-1 flex flex-col items-center justify-center relative py-12">
        <div className="relative">
          {/* Animated Rings */}
          <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
            isScanning ? "opacity-100" : "opacity-0"
          )}>
            <div className="w-[320px] h-[320px] bg-[#2D4D31]/5 rounded-full animate-pulse-ring" />
            <div className="absolute w-[260px] h-[260px] bg-[#2D4D31]/5 rounded-full animate-pulse-ring delay-700" />
          </div>

          {/* Core Trigger */}
          <button
            onClick={startScan}
            disabled={isScanning}
            className={cn(
              "relative w-64 h-64 rounded-[80px] flex flex-col items-center justify-center gap-6 transition-all duration-700 shadow-[0_40px_80px_-12px_rgba(45,77,49,0.3)] active:scale-95 group",
              isScanning ? "bg-emerald-600 scale-105" : "bg-[#2D4D31] hover:scale-[1.02]"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            
            <div className="w-24 h-24 bg-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-md border border-white/20">
              <WifiHigh 
                size={56} 
                weight="bold" 
                className={cn("text-white transition-all duration-500 rotate-90", isScanning && "scale-110 animate-pulse")} 
              />
            </div>
            
            <div className="text-center">
              <p className="text-[13px] font-black uppercase tracking-[0.3em] text-white">
                {isScanning ? "Scanning..." : "Tap to Scan"}
              </p>
              <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest mt-1">Ready for NFC Tag</p>
            </div>
          </button>
        </div>

        {/* Dynamic Status Text */}
        <div className="mt-12 text-center space-y-2">
           <div className={cn(
             "flex items-center gap-2 justify-center transition-all duration-500",
             isScanning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
           )}>
              <ArrowsClockwise size={16} className="text-[#2D4D31] animate-spin" />
              <span className="text-[12px] font-black text-gray-900 uppercase tracking-widest">Awaiting Proximity...</span>
           </div>
        </div>
      </div>

      {/* Helper Context Cards */}
      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 active:scale-95 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
               <Info size={20} weight="bold" />
            </div>
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">How to scan</p>
         </div>
         <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 active:scale-95 transition-transform cursor-pointer">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
               <Warning size={20} weight="bold" />
            </div>
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Troubleshoot</p>
         </div>
      </div>
    </div>
  );
}
