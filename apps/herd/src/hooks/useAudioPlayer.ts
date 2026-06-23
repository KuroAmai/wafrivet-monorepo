import { useCallback, useRef, useState } from "react";

const SAMPLE_RATE_HZ = 24_000;

export function useAudioPlayer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const scheduledUntilRef = useRef(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

  const getCtx = useCallback((): AudioContext => {
    if (!audioCtxRef.current || audioCtxRef.current.state === "closed") {
      audioCtxRef.current = new AudioContext({ sampleRate: SAMPLE_RATE_HZ });
      scheduledUntilRef.current = 0;
    }
    return audioCtxRef.current;
  }, []);

  const resumeContext = useCallback(() => {
    const ctx = getCtx();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
  }, [getCtx]);

  const playChunk = useCallback(
    (raw: ArrayBuffer) => {
      const ctx = getCtx();
      const pcm16 = new Int16Array(raw);
      const float32 = new Float32Array(pcm16.length);
      for (let i = 0; i < pcm16.length; i++) {
        float32[i] = pcm16[i] / 32_768;
      }

      const buffer = ctx.createBuffer(1, float32.length, SAMPLE_RATE_HZ);
      buffer.copyToChannel(float32, 0);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);

      const now = ctx.currentTime;
      const startAt = Math.max(now, scheduledUntilRef.current);
      source.start(startAt);
      scheduledUntilRef.current = startAt + buffer.duration;

      activeSourcesRef.current.push(source);
      setIsAISpeaking(true);

      source.onended = () => {
        const idx = activeSourcesRef.current.indexOf(source);
        if (idx !== -1) {
          activeSourcesRef.current.splice(idx, 1);
          if (activeSourcesRef.current.length === 0) {
            setIsAISpeaking(false);
          }
        }
      };
    },
    [getCtx],
  );

  const flush = useCallback(() => {
    const toStop = activeSourcesRef.current;
    activeSourcesRef.current = [];
    scheduledUntilRef.current = 0;
    setIsAISpeaking(false);
    for (const src of toStop) {
      try {
        src.stop();
      } catch {
        /* already ended */
      }
      src.disconnect();
    }
  }, []);

  return { playChunk, flush, resumeContext, isAISpeaking };
}
