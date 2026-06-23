"use client";

import { Robot } from "@phosphor-icons/react";
import { useHerdAssistant } from "@/context/HerdAssistantContext";

export function HerdAIFloatingBubble() {
  const assistant = useHerdAssistant();

  return (
    <button
      type="button"
      aria-label="Open Herd live AI assistant"
      onClick={() => assistant.openAssistant()}
      className="fixed bottom-28 right-5 z-50 w-14 h-14 bg-[#2D4D31] text-white rounded-full flex items-center justify-center shadow-[0_16px_40px_rgba(45,77,49,0.35)] active:scale-95 transition-transform border-4 border-white"
    >
      <Robot size={28} weight="bold" />
    </button>
  );
}
