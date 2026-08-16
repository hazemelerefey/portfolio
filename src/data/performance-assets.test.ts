import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = process.cwd();
const convertedAssets = [
  'public/journey/football.webp',
  'public/journey/frontend.webp',
  'public/journey/design.webp',
  'public/journey/digilians.webp',
  'public/project/azzar-content-creation.webp',
  'public/project/digisteel-yolo.webp',
  'public/project/global-sales-tracker.webp',
  'public/project/jobpulse.webp',
  'public/gallery/sea.webp',
  'public/lanyard/desain-kartu.webp',
];

describe('portfolio performance assets', () => {
  it('stores the converted homepage assets as true WebP data', () => {
    for (const assetPath of convertedAssets) {
      const bytes = readFileSync(resolve(projectRoot, assetPath));
      expect(bytes.subarray(0, 4).toString('ascii'), assetPath).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString('ascii'), assetPath).toBe('WEBP');
    }
  });

  it('keeps the largest journey image under one megabyte after optimization', () => {
    const football = readFileSync(resolve(projectRoot, 'public/journey/football.webp'));
    expect(football.byteLength).toBeLessThan(1_000_000);
  });
});
