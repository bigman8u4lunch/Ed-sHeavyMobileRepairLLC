/**
 * Process logo-source.png (your white logo on black or transparent PNG)
 * into logo.webp and logo.png for the site.
 *
 * Usage:
 *   1. Save your logo as public/images/logo-source.png
 *   2. cd website && npm install sharp && node scripts/process-logo.mjs
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");
const source = path.join(imagesDir, "logo-source.png");

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// Make near-black pixels transparent (for logos on black background)
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r < 30 && g < 30 && b < 30) {
    data[i + 3] = 0;
  }
}

const processed = sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
});

await processed.clone().png().toFile(path.join(imagesDir, "logo.png"));
await processed.clone().webp({ quality: 95 }).toFile(path.join(imagesDir, "logo.webp"));

console.log(`Processed ${info.width}x${info.height} logo → logo.png & logo.webp`);
