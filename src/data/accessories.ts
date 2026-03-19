import type { AccessoryConfig } from '../engine/types';

export const ACCESSORY_CATALOG: AccessoryConfig[] = [
  // ─── Glasses ────────────────────────────────────────────────
  {
    id: 'glasses-aviator',
    name: 'Aviator',
    type: 'glasses',
    imagePath: '/accessories/glasses/aviator.png',
    thumbnailPath: '/accessories/glasses/aviator.png',
    trackingSource: 'face',
    scaleFactor: 1.8,
    offsetY: 0.15,
  },
  {
    id: 'glasses-round',
    name: 'Round',
    type: 'glasses',
    imagePath: '/accessories/glasses/round.png',
    thumbnailPath: '/accessories/glasses/round.png',
    trackingSource: 'face',
    scaleFactor: 1.6,
    offsetY: 0.1,
  },
  {
    id: 'glasses-cat-eye',
    name: 'Cat Eye',
    type: 'glasses',
    imagePath: '/accessories/glasses/cat-eye.png',
    thumbnailPath: '/accessories/glasses/cat-eye.png',
    trackingSource: 'face',
    scaleFactor: 1.7,
    offsetY: 0.1,
  },

  // ─── Necklaces ──────────────────────────────────────────────
  {
    id: 'necklace-pearl',
    name: 'Pearl Strand',
    type: 'necklace',
    imagePath: '/accessories/necklaces/pearl.png',
    thumbnailPath: '/accessories/necklaces/pearl.png',
    trackingSource: 'face',
    scaleFactor: 1.5,
    offsetY: 0.4,
  },
  {
    id: 'necklace-pendant',
    name: 'Gold Pendant',
    type: 'necklace',
    imagePath: '/accessories/necklaces/pendant.png',
    thumbnailPath: '/accessories/necklaces/pendant.png',
    trackingSource: 'face',
    scaleFactor: 1.3,
    offsetY: 0.5,
  },

  // ─── Rings ──────────────────────────────────────────────────
  {
    id: 'ring-gold-band',
    name: 'Gold Band',
    type: 'ring',
    imagePath: '/accessories/rings/gold-band.png',
    thumbnailPath: '/accessories/rings/gold-band.png',
    trackingSource: 'hand',
    scaleFactor: 1.2,
    offsetY: 0,
  },
  {
    id: 'ring-diamond',
    name: 'Diamond',
    type: 'ring',
    imagePath: '/accessories/rings/diamond.png',
    thumbnailPath: '/accessories/rings/diamond.png',
    trackingSource: 'hand',
    scaleFactor: 1.3,
    offsetY: 0,
  },

  // ─── Bracelets ──────────────────────────────────────────────
  {
    id: 'bracelet-chain',
    name: 'Chain',
    type: 'bracelet',
    imagePath: '/accessories/bracelets/chain.png',
    thumbnailPath: '/accessories/bracelets/chain.png',
    trackingSource: 'hand',
    scaleFactor: 1.4,
    offsetY: 0,
  },

  // ─── Watches ────────────────────────────────────────────────
  {
    id: 'watch-classic',
    name: 'Classic',
    type: 'watch',
    imagePath: '/accessories/watches/classic.png',
    thumbnailPath: '/accessories/watches/classic.png',
    trackingSource: 'hand',
    scaleFactor: 1.5,
    offsetY: 0,
  },
];
