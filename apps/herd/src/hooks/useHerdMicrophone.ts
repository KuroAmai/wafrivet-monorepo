import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  onAudioChunk: (chunk: ArrayBuffer) => void;
};

export function useHerdMicrophone({ onAudioChunk }: Options) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const workletRef = useRef<AudioWorkletNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const isCapturingRef = useRef(false);
  const isMutedRef = useRef(false);
  const onAudioChunkRef = useRef(onAudioChunk);

  onAudioChunkRef.current = onAudioChunk;
  isMutedRef.current = isMuted;

  useEffect(() => {
    return () => {
      sourceRef.current?.disconnect();
      workletRef.current?.disconnect();
      workletRef.current?.port.close();
      void audioCtxRef.current?.close();
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const activateMic = useCallback(async () => {
    if (isCapturingRef.current) return;
    setPermissionError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16_000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      streamRef.current = stream;

      const audioCtx = new AudioContext({ sampleRate: 16_000 });
      await audioCtx.resume();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;

      await audioCtx.audioWorklet.addModule("/pcm-processor.js");
      const worklet = new AudioWorkletNode(audioCtx, "pcm-processor", {
        processorOptions: { targetRate: 16_000 },
      });
      workletRef.current = worklet;

      worklet.port.onmessage = (event: MessageEvent<ArrayBuffer>) => {
        if (!isMutedRef.current) {
          onAudioChunkRef.current(event.data);
        }
      };

      source.connect(worklet);
      worklet.connect(audioCtx.destination);

      isCapturingRef.current = true;
      setIsCapturing(true);
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === "NotAllowedError"
          ? "Microphone permission denied. Allow access and try again."
          : "Could not start the microphone.";
      setPermissionError(message);
    }
  }, []);

  const stopMic = useCallback(() => {
    sourceRef.current?.disconnect();
    workletRef.current?.disconnect();
    workletRef.current?.port.close();
    void audioCtxRef.current?.close();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    audioCtxRef.current = null;
    workletRef.current = null;
    sourceRef.current = null;
    isCapturingRef.current = false;
    setIsCapturing(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isCapturing,
    permissionError,
    activateMic,
    stopMic,
    isMuted,
    toggleMute,
  };
}
