"use client";

import { Sparkle } from "@phosphor-icons/react";
import { useHerdAssistant } from "@/context/HerdAssistantContext";

export function HerdAIFloatingBubble() {
  const assistant = useHerdAssistant();

  return (
    <button
      type="button"
      aria-label="Open Herd live AI assistant"
      onClick={() => assistant.openAssistant()}
      className="fixed bottom-28 right-5 z-50 w-14 h-14 bg-[#2D4D31] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(45,77,49,0.4)] active:scale-90 hover:scale-105 hover:bg-[#395f3d] transition-all duration-300 border-2 border-white"
    >
      <Sparkle size={26} weight="fill" className="animate-pulse" />
    </button>
  );
}

