import type { Point, PlacementResult, AccessoryConfig } from './types';
import { distance, midpoint, angle } from '../math/geometry';

/**
 * Computes position, scale, and rotation for each accessory type
 * based on tracked landmarks (already in pixel coordinates).
 */
export class AccessoryPlacer {

  // ─── Face Accessories ──────────────────────────────────────────────

  /**
   * Glasses placement from FaceMesh landmarks (pixel coords).
   * Key landmarks: 33 (L eye outer), 263 (R eye outer), 168 (nose bridge)
   */
  computeGlasses(
    faceLandmarks: Point[],
    config: AccessoryConfig,
    imageAspect: number // naturalHeight / naturalWidth
  ): PlacementResult {
    const leftEye = faceLandmarks[33];
    const rightEye = faceLandmarks[263];
    const noseBridge = faceLandmarks[168];

    if (!leftEye || !rightEye || !noseBridge) {
      return this.hidden();
    }

    const eyeDist = distance(leftEye, rightEye);
    const center = midpoint(leftEye, rightEye);
    const rotation = angle(rightEye, leftEye); // Note: mirrored, so right→left

    const width = eyeDist * config.scaleFactor;
    const height = width * imageAspect;

    return {
      x: center.x,
      y: center.y + height * config.offsetY,
      width,
      height,
      angle: rotation,
      visible: true,
    };
  }

  /**
   * Necklace placement from FaceMesh landmarks (pixel coords).
   * Key landmarks: 152 (chin), 234 (L jaw), 454 (R jaw)
   */
  computeNecklace(
    faceLandmarks: Point[],
    config: AccessoryConfig,
    imageAspect: number
  ): PlacementResult {
    const chin = faceLandmarks[152];
    const leftJaw = faceLandmarks[234];
    const rightJaw = faceLandmarks[454];

    if (!chin || !leftJaw || !rightJaw) {
      return this.hidden();
    }

    const jawWidth = distance(leftJaw, rightJaw);
    const jawCenter = midpoint(leftJaw, rightJaw);
    const rotation = angle(rightJaw, leftJaw);

    const width = jawWidth * config.scaleFactor;
    const height = width * imageAspect;

    return {
      x: jawCenter.x,
      y: chin.y + height * config.offsetY,
      width,
      height,
      angle: rotation,
      visible: true,
    };
  }

  // ─── Hand Accessories ──────────────────────────────────────────────

  /**
   * Ring placement from Hand landmarks (pixel coords).
   * Uses ring finger: base (13) and PIP joint (14) for positioning.
   * Scale from finger width approximation using landmarks 13 & 14.
   */
  computeRing(
    handLandmarks: Point[],
    config: AccessoryConfig,
    imageAspect: number
  ): PlacementResult {
    const fingerBase = handLandmarks[13]; // Ring finger MCP
    const fingerPIP = handLandmarks[14];  // Ring finger PIP

    if (!fingerBase || !fingerPIP) {
      return this.hidden();
    }

    const segmentLength = distance(fingerBase, fingerPIP);
    const center = midpoint(fingerBase, fingerPIP);
    const rotation = angle(fingerBase, fingerPIP);

    const width = segmentLength * config.scaleFactor;
    const height = width * imageAspect;

    return {
      x: center.x,
      y: center.y + height * config.offsetY,
      width,
      height,
      angle: rotation - Math.PI / 2, // perpendicular to finger
      visible: true,
    };
  }

  /**
   * Bracelet / Watch placement from Hand landmarks (pixel coords).
   * Wrist landmarks: 0 (wrist center), 5 (index MCP), 17 (pinky MCP)
   */
  computeBracelet(
    handLandmarks: Point[],
    config: AccessoryConfig,
    imageAspect: number
  ): PlacementResult {
    const wrist = handLandmarks[0];
    const indexMCP = handLandmarks[5];
    const pinkyMCP = handLandmarks[17];

    if (!wrist || !indexMCP || !pinkyMCP) {
      return this.hidden();
    }

    const wristWidth = distance(indexMCP, pinkyMCP);
    const wristCenter = midpoint(indexMCP, pinkyMCP);
    const rotation = angle(pinkyMCP, indexMCP);

    // Position slightly below the MCP line towards the actual wrist
    const offsetX = (wrist.x - wristCenter.x) * 0.5;
    const offsetY = (wrist.y - wristCenter.y) * 0.5;

    const width = wristWidth * config.scaleFactor;
    const height = width * imageAspect;

    return {
      x: wristCenter.x + offsetX,
      y: wristCenter.y + offsetY + height * config.offsetY,
      width,
      height,
      angle: rotation,
      visible: true,
    };
  }

  /**
   * Dispatches to the correct placement method based on accessory type.
   */
  compute(
    type: string,
    landmarks: Point[],
    config: AccessoryConfig,
    imageAspect: number
  ): PlacementResult {
    switch (type) {
      case 'glasses':
        return this.computeGlasses(landmarks, config, imageAspect);
      case 'necklace':
        return this.computeNecklace(landmarks, config, imageAspect);
      case 'ring':
        return this.computeRing(landmarks, config, imageAspect);
      case 'bracelet':
      case 'watch':
        return this.computeBracelet(landmarks, config, imageAspect);
      default:
        return this.hidden();
    }
  }

  private hidden(): PlacementResult {
    return { x: 0, y: 0, width: 0, height: 0, angle: 0, visible: false };
  }
}
