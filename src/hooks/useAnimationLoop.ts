import { useEffect, useRef, useCallback } from 'react';

/**
 * Runs a stable requestAnimationFrame loop.
 * The callback is called every frame. Use this to drive detection + rendering.
 */
export function useAnimationLoop(callback: (timestamp: number) => void) {
  const callbackRef = useRef(callback);
  const rafIdRef = useRef<number>(0);

  // Always keep the latest callback without restarting the loop
  callbackRef.current = callback;

  const start = useCallback(() => {
    function tick(timestamp: number) {
      callbackRef.current(timestamp);
      rafIdRef.current = requestAnimationFrame(tick);
    }
    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  return { start, stop };
}
