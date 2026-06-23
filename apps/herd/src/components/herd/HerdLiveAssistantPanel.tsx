"use client";

import { Drawer } from "vaul";
import {
  Robot,
  X,
  Microphone,
  MicrophoneSlash,
  Waveform,
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
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[60]" />
        <Drawer.Content className="bg-[#0f1711] flex flex-col rounded-t-[40px] h-[88vh] mt-24 fixed bottom-0 left-0 right-0 z-[70] outline-none text-white">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="mx-auto w-12 h-1.5 rounded-full bg-white/20 mb-8" />

            <div className="max-w-xl mx-auto space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/40">
                    <Robot size={24} weight="bold" />
                  </div>
                  <div>
                    <h2 className="text-[18px] font-black tracking-tight">Herd Live Assistant</h2>
                    <p className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">
                      {contextLabel}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={assistant.closeAssistant}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white/70"
                >
                  <X size={20} weight="bold" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-10 gap-6">
                <div
                  className={cn(
                    "w-40 h-40 rounded-full flex items-center justify-center border-4 transition-all duration-500",
                    assistant.isAgentSpeaking
                      ? "border-emerald-400 bg-emerald-500/20 scale-105 shadow-[0_0_60px_rgba(52,211,153,0.35)]"
                      : assistant.isListening
                        ? "border-white/30 bg-white/5 animate-pulse"
                        : "border-white/10 bg-white/5",
                  )}
                >
                  {assistant.connectionState === "connecting" ? (
                    <CircleNotch size={48} className="animate-spin text-emerald-300" />
                  ) : (
                    <Waveform
                      size={56}
                      weight="bold"
                      className={cn(
                        assistant.isAgentSpeaking ? "text-emerald-300" : "text-white/70",
                      )}
                    />
                  )}
                </div>

                <p className="text-center text-[14px] text-white/70 max-w-sm leading-relaxed">
                  {assistant.isListening
                    ? "Listening… ask me to look up a tag, rename an animal, or log a vaccination."
                    : "Tap the microphone to start a live voice session with Fatima."}
                </p>

                {assistant.permissionError && (
                  <p className="text-[12px] font-bold text-red-300 text-center">{assistant.permissionError}</p>
                )}
                {assistant.lastError && (
                  <p className="text-[12px] font-bold text-red-300 text-center">{assistant.lastError}</p>
                )}
              </div>

              {assistant.transcripts.length > 0 && (
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {assistant.transcripts.slice(-4).map((item, index) => (
                    <div
                      key={`${item.role}-${index}`}
                      className="text-[13px] text-white/75 bg-white/5 rounded-2xl px-4 py-3"
                    >
                      {item.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 pb-10 flex items-center justify-center gap-4">
            {!assistant.isListening ? (
              <button
                type="button"
                onClick={() => void assistant.startLiveSession()}
                className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-[0_16px_40px_rgba(16,185,129,0.45)] active:scale-95 transition-transform"
              >
                <Microphone size={36} weight="bold" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={assistant.toggleMute}
                  className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center"
                >
                  {assistant.isMuted ? (
                    <MicrophoneSlash size={24} weight="bold" />
                  ) : (
                    <Microphone size={24} weight="bold" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={assistant.sendInterrupt}
                  className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center"
                >
                  <Stop size={24} weight="bold" />
                </button>
                <button
                  type="button"
                  onClick={assistant.stopLiveSession}
                  className="px-6 h-14 rounded-full bg-red-500/90 text-white text-[12px] font-black uppercase tracking-widest"
                >
                  End
                </button>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
