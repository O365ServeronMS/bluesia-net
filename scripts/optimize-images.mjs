#!/usr/bin/env node
/**
 * scripts/optimize-images.mjs
 * Converts PNG images to AVIF and WebP at multiple responsive sizes.
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT  = path.resolve(__dir, '..');
const INPUT = path.join(ROOT, 'public', 'assets', 'images');
const OUTPUT = INPUT; // same dir, different filenames

const CONFIGS = {
  'hero-bg': {
    widths: [640, 960, 1280, 1600],
    avifQuality: 50,
    webpQuality: 75,
    effort: 6,
  },
  'project-solar': {
    widths: [360, 480, 768],
    avifQuality: 52,
    webpQuality: 76,
    effort: 5,
  },
  'project-wind': {
    widths: [360, 480, 768],
    avifQuality: 52,
    webpQuality: 76,
    effort: 5,
  },
  'project-hydro': {
    widths: [360, 480, 768],
    avifQuality: 52,
    webpQuality: 76,
    effort: 5,
  },
};

async function processImage(baseName, config) {
  const srcPng  = path.join(INPUT, `${baseName}.png`);
  const srcWebp = path.join(INPUT, `${baseName}.webp`); // use webp as source if exists (higher quality)

  const src = existsSync(srcWebp) ? srcWebp : srcPng;
  if (!existsSync(src)) {
    console.warn(`⚠  Source not found: ${src}`);
    return;
  }

  const meta = await sharp(src).metadata();
  const srcW  = meta.width;

  for (const w of config.widths) {
    // Don't upscale
    if (w > srcW) {
      console.log(`  skip ${baseName}-${w} (src ${srcW}px < target ${w}px)`);
      continue;
    }

    // AVIF
    const avifOut = path.join(OUTPUT, `${baseName}-${w}.avif`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: config.avifQuality, effort: config.effort })
      .toFile(avifOut);
    console.log(`  ✓ ${baseName}-${w}.avif`);

    // WebP
    const webpOut = path.join(OUTPUT, `${baseName}-${w}.webp`);
    await sharp(src)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: config.webpQuality, effort: config.effort })
      .toFile(webpOut);
    console.log(`  ✓ ${baseName}-${w}.webp`);
  }
}

async function run() {
  console.log('🖼  Bluesia Image Optimizer\n');

  for (const [name, cfg] of Object.entries(CONFIGS)) {
    console.log(`→ ${name}`);
    await processImage(name, cfg);
  }

  console.log('\n✅ Done. All images optimized.');
}

run().catch(err => { console.error(err); process.exit(1); });
