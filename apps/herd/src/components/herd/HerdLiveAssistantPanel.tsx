"use client";

import { Drawer } from "vaul";
import {
  Sparkle,
  X,
  Microphone,
  MicrophoneSlash,
  Stop,
  CircleNotch,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useHerdAssistant } from "@/context/HerdAssistantContext";

export function HerdLiveAssistantPanel() {
  const assistant = useHerdAssistant();

  const contextLabel = assistant.animalUid
    ? assistant.animalName
      ? `${assistant.animalName} · ${assistant.animalUid}`
      : assistant.animalUid
    : assistant.chipUid
      ? `NFC ${assistant.chipUid}`
      : "Talk to update records, sync tags, or check vaccines";

  return (
    <Drawer.Root open={assistant.isOpen} onOpenChange={(next) => (next ? assistant.openAssistant() : assistant.closeAssistant())}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" />
        <Drawer.Content className="bg-[#0D110D] flex flex-col rounded-t-[40px] h-[85vh] fixed bottom-0 left-0 right-0 z-[70] outline-none text-white border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <div className="p-6 flex-1 overflow-y-auto no-scrollbar">
            {/* Drawer Handle */}
            <div className="mx-auto w-12 h-1.5 rounded-full bg-white/10 mb-8" />

            <div className="max-w-xl mx-auto space-y-6 flex flex-col justify-between h-[calc(100%-2rem)]">
              {/* Header section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-[#2D4D31] to-[#395f3d] rounded-2xl flex items-center justify-center shadow-lg shadow-black/30 border border-white/10">
                    <Sparkle size={24} weight="fill" className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-black tracking-tight text-white">Herd Live Assistant</h2>
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                      {contextLabel}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={assistant.closeAssistant}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors active:scale-95"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              {/* Floating Chat Sheet / Bubble */}
              <div className="flex-1 flex flex-col items-center justify-center py-4">
                <div
                  className={cn(
                    "w-full bg-white/[0.02] border border-white/[0.06] rounded-[32px] p-6 shadow-2xl relative overflow-hidden transition-all duration-500",
                    assistant.isAgentSpeaking && "border-emerald-500/25 bg-emerald-950/[0.05] shadow-[0_0_50px_rgba(16,185,129,0.08)]",
                    assistant.isListening && "border-white/10 bg-white/[0.05]"
                  )}
                >
                  {/* Subtle glassmorphic ambient glow inside the card */}
                  <div className={cn(
                    "absolute -right-16 -top-16 w-36 h-36 rounded-full blur-[60px] opacity-15 pointer-events-none transition-all duration-1000",
                    assistant.isAgentSpeaking ? "bg-emerald-400" : assistant.isListening ? "bg-cyan-400" : "bg-transparent"
                  )} />

                  <div className="flex items-start gap-4">
                    {/* Glowing Sparkle Icon Avatar */}
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500",
                      assistant.isAgentSpeaking 
                        ? "bg-emerald-500 border-emerald-400 text-white scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        : assistant.isListening 
                          ? "bg-white border-white text-[#0D110D] animate-pulse" 
                          : "bg-white/5 border-white/5 text-white/40"
                    )}>
                      <Sparkle size={24} weight={assistant.isAgentSpeaking ? "fill" : "bold"} />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30">
                          {assistant.isAgentSpeaking ? "Speaking" : assistant.isListening ? "Listening" : "Offline"}
                        </span>
                        {assistant.connectionState === "connecting" && (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            <CircleNotch size={12} className="animate-spin" />
                            Connecting
                          </div>
                        )}
                      </div>

                      <p className="text-[15px] font-semibold leading-relaxed text-white/90">
                        {assistant.connectionState === "connecting"
                          ? "Starting secure channel with Fatima..."
                          : assistant.isListening
                            ? "I'm listening, Dr. Ademola. Ask me to look up a tag, record a health alert, or manage products."
                            : assistant.isAgentSpeaking
                              ? assistant.transcripts.filter(t => t.role === "assistant").slice(-1)[0]?.text || "Speaking..."
                              : "Tap the microphone below to start a live voice session with Fatima."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {assistant.permissionError && (
                  <p className="mt-4 text-[12px] font-bold text-red-400 text-center">{assistant.permissionError}</p>
                )}
                {assistant.lastError && (
                  <p className="mt-4 text-[12px] font-bold text-red-400 text-center">{assistant.lastError}</p>
                )}
              </div>

              {/* Chat history logs (small, elegant scroll area) */}
              {assistant.transcripts.length > 0 && (
                <div className="space-y-3 max-h-36 overflow-y-auto no-scrollbar py-2 border-t border-white/[0.04]">
                  {assistant.transcripts.slice(-4).map((item, index) => (
                    <div
                      key={`${item.role}-${index}`}
                      className={cn(
                        "text-[12px] font-bold px-4 py-2.5 rounded-2xl max-w-[85%] leading-relaxed",
                        item.role === "user"
                          ? "bg-white/5 text-white/80 ml-auto rounded-tr-none"
                          : "bg-emerald-500/10 text-emerald-300 mr-auto rounded-tl-none border border-emerald-500/10"
                      )}
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Live Waveform Visualizer */}
              <div className="flex flex-col items-center justify-center gap-2 py-4 border-t border-white/[0.04]">
                <div className="flex items-end justify-center gap-1.5 h-12 px-6">
                  {Array.from({ length: 17 }).map((_, i) => {
                    const animationDelay = `${(i * 0.08).toFixed(2)}s`;
                    const baseHeight = [16, 24, 32, 40, 48, 40, 32, 24, 16, 24, 32, 40, 48, 40, 32, 24, 16][i % 17];
                    
                    return (
                      <div
                        key={i}
                        className={cn(
                          "w-1 rounded-full transition-all duration-500 transform-gpu origin-bottom",
                          assistant.isAgentSpeaking || assistant.isListening
                            ? "animate-waveform-pulse"
                            : "scale-y-[0.1] bg-white/10",
                          assistant.isAgentSpeaking && "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]",
                          assistant.isListening && "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]",
                        )}
                        style={{
                          height: `${baseHeight}px`,
                          animationDelay: assistant.isAgentSpeaking || assistant.isListening ? animationDelay : undefined,
                        }}
                      />
                    );
                  })}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 text-center">
                  {assistant.isAgentSpeaking 
                    ? "Fatima speaking" 
                    : assistant.isListening 
                      ? "Listening to voice input" 
                      : "Voice link inactive"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Console */}
          <div className="p-6 pb-12 bg-black/20 border-t border-white/[0.04] flex items-center justify-center gap-4 animate-in fade-in duration-500">
            {!assistant.isListening ? (
              <button
                type="button"
                onClick={() => void assistant.startLiveSession()}
                className="w-20 h-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_12px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_35px_rgba(16,185,129,0.45)] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Microphone size={36} weight="bold" />
              </button>
            ) : (
              <div className="flex items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                <button
                  type="button"
                  onClick={assistant.toggleMute}
                  className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  {assistant.isMuted ? (
                    <MicrophoneSlash size={24} weight="bold" className="text-red-400" />
                  ) : (
                    <Microphone size={24} weight="bold" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={assistant.sendInterrupt}
                  className="w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center border border-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  <Stop size={24} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={assistant.stopLiveSession}
                  className="px-8 h-14 rounded-full bg-red-500/90 hover:bg-red-500 text-white text-[12px] font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(239,68,68,0.25)] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  End
                </button>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

