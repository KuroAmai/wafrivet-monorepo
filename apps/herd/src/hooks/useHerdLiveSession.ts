import { API_CONFIG, getAccessToken } from "@wafrivet/api";
import { useCallback, useEffect, useReducer, useRef } from "react";

export type ConnectionState = "idle" | "connecting" | "connected" | "reconnecting" | "error";

type LiveSessionState = {
  connectionState: ConnectionState;
  isAgentSpeaking: boolean;
  lastError: string | null;
  transcripts: Array<{ role: string; text: string }>;
};

type Action =
  | { type: "CONNECTING"; reconnecting: boolean }
  | { type: "CONNECTED" }
  | { type: "DISCONNECTED" }
  | { type: "ERROR"; message: string }
  | { type: "SPEAKING"; value: boolean }
  | { type: "TRANSCRIPT"; role: string; text: string };

const INITIAL: LiveSessionState = {
  connectionState: "idle",
  isAgentSpeaking: false,
  lastError: null,
  transcripts: [],
};

function reducer(state: LiveSessionState, action: Action): LiveSessionState {
  switch (action.type) {
    case "CONNECTING":
      return { ...state, connectionState: action.reconnecting ? "reconnecting" : "connecting" };
    case "CONNECTED":
      return { ...state, connectionState: "connected", lastError: null };
    case "DISCONNECTED":
      return { ...state, connectionState: "idle", isAgentSpeaking: false };
    case "ERROR":
      return { ...state, connectionState: "error", lastError: action.message };
    case "SPEAKING":
      return { ...state, isAgentSpeaking: action.value };
    case "TRANSCRIPT":
      return {
        ...state,
        transcripts: [...state.transcripts.slice(-19), { role: action.role, text: action.text }],
      };
    default:
      return state;
  }
}

function normalizeWsBaseUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (trimmed.startsWith("ws://") || trimmed.startsWith("wss://")) return trimmed;
  if (trimmed.startsWith("http://")) return `ws://${trimmed.slice("http://".length)}`;
  if (trimmed.startsWith("https://")) return `wss://${trimmed.slice("https://".length)}`;
  return trimmed;
}

function buildWsUrl(userId: string, sessionId: string): string {
  const base = normalizeWsBaseUrl(API_CONFIG.fieldVetWsUrl);
  const token = getAccessToken();
  const qs = token ? `?access_token=${encodeURIComponent(token)}` : "";
  return `${base}/ws/${encodeURIComponent(userId)}/${encodeURIComponent(sessionId)}${qs}`;
}

type Options = {
  enabled: boolean;
  userId: string;
  sessionId: string;
  chipUid?: string | null;
  animalUid?: string | null;
  onAudioChunk: (chunk: ArrayBuffer) => void;
  onAudioFlush: () => void;
};

export function useHerdLiveSession({
  enabled,
  userId,
  sessionId,
  chipUid,
  animalUid,
  onAudioChunk,
  onAudioFlush,
}: Options) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const wsRef = useRef<WebSocket | null>(null);
  const mountedRef = useRef(true);
  const onAudioChunkRef = useRef(onAudioChunk);
  const onAudioFlushRef = useRef(onAudioFlush);
  const contextSentRef = useRef(false);

  onAudioChunkRef.current = onAudioChunk;
  onAudioFlushRef.current = onAudioFlush;

  const sendHerdContext = useCallback((ws: WebSocket) => {
    if (contextSentRef.current) return;
    if (!chipUid && !animalUid) return;
    ws.send(
      JSON.stringify({
        type: "HERD_CONTEXT",
        chip_uid: chipUid ?? undefined,
        animal_uid: animalUid ?? undefined,
      }),
    );
    contextSentRef.current = true;
  }, [chipUid, animalUid]);

  const connect = useCallback(() => {
    if (!enabled || !userId || !sessionId) return;
    contextSentRef.current = false;
    dispatch({ type: "CONNECTING", reconnecting: false });

    const ws = new WebSocket(buildWsUrl(userId, sessionId));
    ws.binaryType = "arraybuffer";
    wsRef.current = ws;

    ws.onopen = () => {
      if (!mountedRef.current) {
        ws.close(1000, "unmounted");
        return;
      }
      dispatch({ type: "CONNECTED" });
      sendHerdContext(ws);
    };

    ws.onmessage = (event: MessageEvent) => {
      if (!mountedRef.current) return;
      if (event.data instanceof ArrayBuffer) {
        onAudioChunkRef.current(event.data);
        dispatch({ type: "SPEAKING", value: true });
        return;
      }
      if (typeof event.data !== "string") return;
      try {
        const payload = JSON.parse(event.data) as {
          type?: string;
          text?: string;
          author?: string;
          role?: string;
        };
        if (payload.type === "AUDIO_FLUSH" || payload.type === "interrupted") {
          onAudioFlushRef.current();
          dispatch({ type: "SPEAKING", value: false });
        } else if (payload.type === "TURN_COMPLETE") {
          dispatch({ type: "SPEAKING", value: false });
        } else if (payload.type === "TRANSCRIPTION" && payload.text) {
          dispatch({
            type: "TRANSCRIPT",
            role: payload.author ?? payload.role ?? "assistant",
            text: payload.text,
          });
        }
      } catch {
        /* ignore malformed frames */
      }
    };

    ws.onerror = () => {
      dispatch({ type: "ERROR", message: "Live assistant connection failed." });
    };

    ws.onclose = () => {
      wsRef.current = null;
      if (mountedRef.current) {
        dispatch({ type: "DISCONNECTED" });
      }
    };
  }, [enabled, userId, sessionId, sendHerdContext]);

  const disconnect = useCallback(() => {
    wsRef.current?.close(1000, "session ended");
    wsRef.current = null;
    dispatch({ type: "DISCONNECTED" });
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      wsRef.current?.close(1000, "unmounted");
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      connect();
      return () => disconnect();
    }
    disconnect();
    return undefined;
  }, [enabled, connect, disconnect]);

  useEffect(() => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      contextSentRef.current = false;
      sendHerdContext(ws);
    }
  }, [chipUid, animalUid, sendHerdContext]);

  const sendAudioChunk = useCallback((buffer: ArrayBuffer) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(buffer);
    }
  }, []);

  const sendInterrupt = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "INTERRUPT" }));
    }
    onAudioFlushRef.current();
  }, []);

  return {
    state,
    sendAudioChunk,
    sendInterrupt,
    disconnect,
    reconnect: connect,
  };
}
