"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@wafrivet/auth";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useHerdLiveSession } from "@/hooks/useHerdLiveSession";
import { useHerdMicrophone } from "@/hooks/useHerdMicrophone";

export type HerdScanContext = {
  chipUid: string | null;
  animalUid: string | null;
  animalName: string | null;
  setScanResult: (chipUid: string, animalUid?: string | null, animalName?: string | null) => void;
  clearScan: () => void;
};

export type HerdLiveAssistantContextValue = HerdScanContext & {
  isOpen: boolean;
  openAssistant: (opts?: {
    animalUid?: string;
    chipUid?: string;
    animalName?: string;
    autoStartLive?: boolean;
  }) => void;
  closeAssistant: () => void;
  startLiveSession: () => Promise<void>;
  stopLiveSession: () => void;
  connectionState: string;
  isAgentSpeaking: boolean;
  isListening: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  permissionError: string | null;
  lastError: string | null;
  transcripts: Array<{ role: string; text: string }>;
  sendInterrupt: () => void;
};

const HerdAssistantContext = createContext<HerdLiveAssistantContextValue | null>(null);

function generateId(): string {
  return crypto.randomUUID().replace(/-/g, "");
}

export function HerdAssistantProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [liveEnabled, setLiveEnabled] = useState(false);
  const [chipUid, setChipUid] = useState<string | null>(null);
  const [animalUid, setAnimalUid] = useState<string | null>(null);
  const [animalName, setAnimalName] = useState<string | null>(null);

  const userId = useMemo(() => {
    const authUser = user as any;
    if (authUser?.id) return String(authUser.id).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 128);
    const stored = sessionStorage.getItem("herd_ai_user_id");
    if (stored) return stored;
    const next = `herd${generateId().slice(0, 24)}`;
    sessionStorage.setItem("herd_ai_user_id", next);
    return next;
  }, [user]);

  const sessionIdRef = useRef<string>(
    sessionStorage.getItem("herd_ai_session_id") ?? `herd-${generateId()}`,
  );
  if (!sessionStorage.getItem("herd_ai_session_id")) {
    sessionStorage.setItem("herd_ai_session_id", sessionIdRef.current);
  }

  const { playChunk, flush, resumeContext, isAISpeaking } = useAudioPlayer();

  const { state, sendAudioChunk, sendInterrupt, disconnect } = useHerdLiveSession({
    enabled: liveEnabled && isOpen,
    userId,
    sessionId: sessionIdRef.current,
    chipUid,
    animalUid,
    onAudioChunk: playChunk,
    onAudioFlush: flush,
  });

  const { activateMic, stopMic, isCapturing, permissionError, isMuted, toggleMute } =
    useHerdMicrophone({
      onAudioChunk: sendAudioChunk,
    });

  const setScanResult = useCallback(
    (nextChipUid: string, nextAnimalUid?: string | null, nextAnimalName?: string | null) => {
      setChipUid(nextChipUid);
      if (nextAnimalUid !== undefined) setAnimalUid(nextAnimalUid);
      if (nextAnimalName !== undefined) setAnimalName(nextAnimalName);
    },
    [],
  );

  const clearScan = useCallback(() => {
    setChipUid(null);
    setAnimalUid(null);
    setAnimalName(null);
  }, []);

  const closeAssistant = useCallback(() => {
    setLiveEnabled(false);
    stopMic();
    disconnect();
    flush();
    setIsOpen(false);
  }, [disconnect, flush, stopMic]);

  const startLiveSession = useCallback(async () => {
    resumeContext();
    setLiveEnabled(true);
    await activateMic();
  }, [activateMic, resumeContext]);

  const stopLiveSession = useCallback(() => {
    setLiveEnabled(false);
    stopMic();
    disconnect();
    flush();
  }, [disconnect, flush, stopMic]);

  const openAssistant = useCallback(
    (opts?: {
      animalUid?: string;
      chipUid?: string;
      animalName?: string;
      autoStartLive?: boolean;
    }) => {
      if (opts?.chipUid) setChipUid(opts.chipUid);
      if (opts?.animalUid) setAnimalUid(opts.animalUid);
      if (opts?.animalName) setAnimalName(opts.animalName);
      setIsOpen(true);
      if (opts?.autoStartLive) {
        void startLiveSession();
      }
    },
    [startLiveSession],
  );

  const value = useMemo<HerdLiveAssistantContextValue>(
    () => ({
      chipUid,
      animalUid,
      animalName,
      setScanResult,
      clearScan,
      isOpen,
      openAssistant,
      closeAssistant,
      startLiveSession,
      stopLiveSession,
      connectionState: state.connectionState,
      isAgentSpeaking: isAISpeaking || state.isAgentSpeaking,
      isListening: isCapturing && liveEnabled,
      isMuted,
      toggleMute,
      permissionError,
      lastError: state.lastError,
      transcripts: state.transcripts,
      sendInterrupt,
    }),
    [
      chipUid,
      animalUid,
      animalName,
      setScanResult,
      clearScan,
      isOpen,
      openAssistant,
      closeAssistant,
      startLiveSession,
      stopLiveSession,
      state.connectionState,
      state.lastError,
      state.transcripts,
      state.isAgentSpeaking,
      isAISpeaking,
      isCapturing,
      liveEnabled,
      isMuted,
      toggleMute,
      permissionError,
      sendInterrupt,
    ],
  );

  return <HerdAssistantContext.Provider value={value}>{children}</HerdAssistantContext.Provider>;
}

export function useHerdAssistant(): HerdLiveAssistantContextValue {
  const ctx = useContext(HerdAssistantContext);
  if (!ctx) {
    throw new Error("useHerdAssistant must be used within HerdAssistantProvider");
  }
  return ctx;
}
