import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, 'brand_assets');
const out = join(__dirname, 'brand_assets', 'opt');

if (!existsSync(out)) mkdirSync(out, { recursive: true });

const jobs = [
  // Hero background — displayed full-width, compress heavily
  { in: 'PXL_20241117_105741000.RAW-01.COVER.jpg',       out: 'hero-bg.webp',      width: 1600, quality: 72 },
  // Benefits section large image — displayed 691x520
  { in: 'PXL_20241117_105927063.RAW-01.MP.COVER.jpg',    out: 'install-large.webp', width: 900,  quality: 72 },
  // Why grid top image — displayed 372x279 (2-col span, effectively ~740px at 2x)
  { in: 'IMG_0767.jpg',                                   out: 'install-grid1.webp', width: 800,  quality: 72 },
  // Why grid small image — displayed 240x180
  { in: 'IMG_0615.jpg',                                   out: 'install-grid2.webp', width: 500,  quality: 72 },
  // Logo PNG — displayed 51x40, keep small
  { in: 'APC Solar Revision 8.png',                       out: 'logo-apc.webp',      width: 160,  quality: 80 },
  // Grid photos — new images
  { in: 'IMG_1541.JPG.jpeg',   out: 'install-sunset.webp',  width: 900,  quality: 78 },
  { in: 'IMG_0857.JPG',        out: 'install-carport.webp', width: 600,  quality: 74 },
  { in: 'IMG_2545.JPG.jpeg',   out: 'install-sky.webp',     width: 600,  quality: 74 },
  // New real brand logos
  { in: 'logo-sungrow.png',         out: 'logo-sungrow.webp',         width: 320, quality: 85 },
  { in: 'logo-pakistan-cables.png', out: 'logo-pakistan-cables.webp', width: 280, quality: 85 },
  { in: 'logo-inverex.png',         out: 'logo-inverex.webp',         width: 320, quality: 85 },
  // Partner logos
  { in: 'logo-huawei.png',     out: 'logo-huawei.webp',    width: 280, quality: 80 },
  { in: 'logo-jinko.png',      out: 'logo-jinko.webp',     width: 280, quality: 80 },
  { in: 'logo-canadian-solar.png', out: 'logo-canadian.webp', width: 320, quality: 80 },
  { in: 'logo-solis.png',      out: 'logo-solis.webp',     width: 280, quality: 80 },
];

for (const job of jobs) {
  const inPath  = join(src, job.in);
  const outPath = join(out, job.out);
  if (!existsSync(inPath)) { console.log(`SKIP (missing): ${job.in}`); continue; }
  try {
    const meta = await sharp(inPath).metadata();
    const w = Math.min(job.width, meta.width ?? job.width);
    await sharp(inPath).resize(w).webp({ quality: job.quality }).toFile(outPath);
    const { size: inSz } = await import('fs').then(m => m.promises.stat(inPath));
    const { size: outSz } = await import('fs').then(m => m.promises.stat(outPath));
    console.log(`${job.in.padEnd(52)} ${(inSz/1024).toFixed(0).padStart(6)} KB → ${job.out.padEnd(24)} ${(outSz/1024).toFixed(0).padStart(5)} KB  (${(100-outSz/inSz*100).toFixed(0)}% saved)`);
  } catch(e) {
    console.error(`ERROR ${job.in}: ${e.message}`);
  }
}

console.log('\nDone. Images saved to brand_assets/opt/');
