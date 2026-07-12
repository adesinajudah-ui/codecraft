import { useCallback, useEffect, useRef, useState } from "react";

function pickMimeType(): string {
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"];
  for (const c of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported?.(c)) return c;
  }
  return "";
}

interface UseVoiceRecorderOptions {
  onRecorded: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

/**
 * Tap-to-record voice notes using the MediaRecorder API. Call `start()` to
 * request mic access and begin recording, then `stop()` (send) or
 * `cancel()` (discard) to end it.
 */
export function useVoiceRecorder({ onRecorded, onError }: UseVoiceRecorderOptions) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      cancelledRef.current = false;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (!cancelledRef.current && chunksRef.current.length > 0) {
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeType || "audio/webm" });
          onRecorded(blob);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setSeconds(0);
      setRecording(true);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      onError?.(new Error("Microphone access was denied or unavailable"));
    }
  }, [onRecorded, onError]);

  const stop = useCallback((cancel: boolean) => {
    cancelledRef.current = cancel;
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  return {
    recording,
    seconds,
    start,
    send: () => stop(false),
    cancel: () => stop(true),
  };
}
