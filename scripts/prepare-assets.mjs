#!/usr/bin/env node
/**
 * Подготовка изображений:
 *  - фото из assets-src/photos → public/assets/photos/<name>-<w>.{avif,webp}
 *  - эмблема логотипа с прозрачным фоном → public/assets/emblem.{png,webp}
 *  - фавиконы и PWA-иконки из public/favicon.svg (векторная копия эмблемы)
 *  - og-image 1200×630
 */
import sharp from 'sharp'
import { mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, parse, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(root, 'assets-src/photos')
const OUT = resolve(root, 'public/assets/photos')
const ICONS = resolve(root, 'public/icons')
const WIDTHS = [480, 960, 1440]
mkdirSync(OUT, { recursive: true })
mkdirSync(ICONS, { recursive: true })

// ── Photos ────────────────────────────────────────────────────────────────
for (const file of readdirSync(SRC)) {
  const { name } = parse(file)
  const input = resolve(SRC, file)
  const meta = await sharp(input).metadata()
  for (const w of WIDTHS) {
    if (meta.width && w > meta.width && w !== WIDTHS[0]) continue
    const img = sharp(input).rotate().resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true })
    await img.clone().webp({ quality: 78 }).toFile(resolve(OUT, `${name}-${w}.webp`))
    await img.clone().avif({ quality: 55 }).toFile(resolve(OUT, `${name}-${w}.avif`))
  }
  console.log('photo', name, `${meta.width}×${meta.height}`)
}

// ── Emblem with transparent background (flood fill from the edges) ───────
{
  const logo = resolve(root, 'public/assets/logo.png')
  const { data, info } = await sharp(logo)
    .extract({ left: 118, top: 22, width: 186, height: 202 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const isWhite = (i) => data[i] > 232 && data[i + 1] > 232 && data[i + 2] > 232
  const seen = new Uint8Array(width * height)
  const stack = []
  for (let x = 0; x < width; x++) stack.push([x, 0], [x, height - 1])
  for (let y = 0; y < height; y++) stack.push([0, y], [width - 1, y])
  while (stack.length) {
    const [x, y] = stack.pop()
    if (x < 0 || y < 0 || x >= width || y >= height) continue
    const p = y * width + x
    if (seen[p]) continue
    seen[p] = 1
    const i = p * 4
    if (!isWhite(i)) {
      // soften anti-aliased edge pixels
      const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3
      if (lightness > 200) data[i + 3] = Math.round(255 * (1 - (lightness - 200) / 55))
      continue
    }
    data[i + 3] = 0
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
  const emblem = sharp(data, { raw: { width, height, channels: 4 } }).trim()
  await emblem.clone().png().toFile(resolve(root, 'public/assets/emblem.png'))
  await emblem.clone().webp({ quality: 90 }).toFile(resolve(root, 'public/assets/emblem.webp'))
  console.log('emblem ok')
}

// ── Icons from vector emblem ─────────────────────────────────────────────
{
  const svg = readFileSync(resolve(root, 'public/favicon.svg'))
  const render = (size) => sharp(svg, { density: 72 * (size / 200) * 2 }).resize(size, size)
  await render(32).png().toFile(resolve(root, 'public/favicon-32.png'))
  await render(180)
    .flatten({ background: '#FFFFFF' })
    .png()
    .toFile(resolve(ICONS, 'apple-touch-icon.png'))
  await render(192).png().toFile(resolve(ICONS, 'icon-192.png'))
  await render(512).png().toFile(resolve(ICONS, 'icon-512.png'))
  // maskable: emblem in the 80 % safe zone on brand navy
  const inner = await render(360).png().toBuffer()
  await sharp({ create: { width: 512, height: 512, channels: 4, background: '#1D3159' } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(resolve(ICONS, 'maskable-512.png'))
  console.log('icons ok')
}

// ── Open Graph image ─────────────────────────────────────────────────────
{
  const svg = readFileSync(resolve(root, 'public/favicon.svg'))
  const emblem = await sharp(svg, { density: 300 }).resize(380, 380).png().toBuffer()
  const arcs = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#1D3159"/>
    <g fill="none" stroke="#409CA8" stroke-opacity=".35" stroke-width="3">
      <circle cx="0" cy="760" r="520"/><circle cx="0" cy="760" r="460"/>
      <circle cx="1200" cy="760" r="520"/><circle cx="1200" cy="760" r="460"/>
    </g>
    <rect x="80" y="520" width="140" height="10" fill="#FFF351"/>
  </svg>`)
  await sharp(arcs)
    .composite([{ input: emblem, left: 740, top: 125 }])
    .jpeg({ quality: 85 })
    .toFile(resolve(root, 'public/assets/og-image.jpg'))
  console.log('og ok')
}
