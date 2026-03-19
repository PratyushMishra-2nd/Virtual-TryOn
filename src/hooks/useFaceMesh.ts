import { useEffect, useRef, useCallback } from 'react';
import {
  FaceLandmarker,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import type { NormalizedLandmark } from '../engine/types';

/**
 * Initializes MediaPipe FaceLandmarker and provides a detect() function.
 * Call detect() inside your animation loop.
 */
export function useFaceMesh(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  isReady: boolean,
  onResults: (landmarks: NormalizedLandmark[]) => void
) {
  const landmarkerRef = useRef<FaceLandmarker | null>(null);
  const initializingRef = useRef(false);

  useEffect(() => {
    if (initializingRef.current) return;
    initializingRef.current = true;

    async function init() {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numFaces: 1,
        });
      } catch (err) {
        console.error('FaceLandmarker init failed:', err);
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
      if (result.faceLandmarks && result.faceLandmarks.length > 0) {
        onResults(result.faceLandmarks[0] as NormalizedLandmark[]);
      }
    } catch {
      // Silently handle detection errors (e.g., timestamp issues)
    }
  }, [videoRef, isReady, onResults]);

  return { detect };
}
