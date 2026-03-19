import type { NormalizedLandmark, Point } from '../engine/types';

/**
 * Convert normalized MediaPipe landmark (0–1) to canvas pixel coordinates.
 * Mirrors X axis for front-facing camera.
 */
export function landmarkToPixel(
  landmark: NormalizedLandmark,
  canvasWidth: number,
  canvasHeight: number,
  mirror: boolean = true
): Point {
  const x = mirror
    ? canvasWidth - landmark.x * canvasWidth
    : landmark.x * canvasWidth;
  const y = landmark.y * canvasHeight;
  return { x, y, z: landmark.z };
}

/**
 * Convert an array of normalized landmarks to pixel coordinates.
 */
export function landmarksToPixels(
  landmarks: NormalizedLandmark[],
  canvasWidth: number,
  canvasHeight: number,
  mirror: boolean = true
): Point[] {
  return landmarks.map((lm) => landmarkToPixel(lm, canvasWidth, canvasHeight, mirror));
}
