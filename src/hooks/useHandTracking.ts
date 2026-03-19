import { useEffect, useRef, useCallback } from 'react';
import {
  HandLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import type { NormalizedLandmark } from '../engine/types';

/**
 * Initializes MediaPipe HandLandmarker and provides a detect() function.
 * Supports up to 2 hands.
 */
export function useHandTracking(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isReady: boolean,
  onResults: (hands: NormalizedLandmark[][]) => void
) {
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
        );

        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 2,
        });
      } catch (err) {
        console.error('HandLandmarker init failed:', err);
      }
    }

    init();

    return () => {
      landmarkerRef.current?.close();
    };
  }, []);

  const detect = useCallback(() => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;
    if (!video || !landmarker || !isReady || video.readyState < 2) return;

    try {
      const result = landmarker.detectForVideo(video, performance.now());
      if (result.landmarks && result.landmarks.length > 0) {
        onResults(result.landmarks as NormalizedLandmark[][]);
      } else {
        onResults([]);
      }
    } catch {
      // Silently handle detection errors
    }
  }, [videoRef, isReady, onResults]);

  return { detect };
}
