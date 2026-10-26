#!/usr/bin/env node
/**
 * Извлекает фирменные цвета из логотипа (k-means по пикселям) и сверяет их
 * с ориентировочными значениями из ТЗ. Если расхождение > 5 %, берётся
 * измеренное значение. Результат пишется в .env и .env.example.
 *
 *   node scripts/extract-colors.mjs           — только отчёт
 *   node scripts/extract-colors.mjs --write   — отчёт + запись .env/.env.example
 */
import sharp from 'sharp'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { contrast, distancePercent, hexToRgb, rgbToHex } from './lib/color.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const LOGO = resolve(root, 'public/assets/logo.png')
const SLIDE = resolve(root, 'assets-src/slide-about.png')
const THRESHOLD = 5

const reference = {
  primary: '#1B4F94',
  secondary: '#409CA8',
  accent: '#FFF351',
  primaryDark: '#1D3159',
}

async function pixels(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = []
  for (let i = 0; i < data.length; i += info.channels) out.push([data[i], data[i + 1], data[i + 2]])
  return out
}

/** Deterministic k-means seeded with the reference colours. */
function kmeans(points, seeds, iterations = 25) {
  let centroids = seeds.map((s) => hexToRgb(s))
  let counts = []
  for (let it = 0; it < iterations; it++) {
    const sums = centroids.map(() => [0, 0, 0])
    counts = centroids.map(() => 0)
    for (const p of points) {
      let best = 0
      let bestD = Infinity
      centroids.forEach((c, i) => {
        const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      sums[best][0] += p[0]
      sums[best][1] += p[1]
      sums[best][2] += p[2]
      counts[best]++
    }
    centroids = centroids.map((c, i) => (counts[i] ? sums[i].map((s) => s / counts[i]) : c))
  }
  return centroids.map((c, i) => ({ hex: rgbToHex(c), count: counts[i] }))
}

/** Keep only "solid" brand pixels: not white, not anti-aliased edge blends. */
function brandPixels(points) {
  return points.filter(([r, g, b]) => {
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const isWhite = min > 225
    const saturation = max === 0 ? 0 : (max - min) / max
    return !isWhite && saturation > 0.45
  })
}

const logoPoints = brandPixels(await pixels(LOGO))
const logoClusters = kmeans(logoPoints, [reference.primary, reference.secondary, reference.accent])

let darkMeasured = null
if (existsSync(SLIDE)) {
  // Slide «О нас»: dark-navy circle. Only consider dark, bluish pixels.
  const darkPoints = (await pixels(SLIDE)).filter(([r, g, b]) => b > r && b > g && r + g + b < 300)
  darkMeasured = kmeans(darkPoints, [reference.primaryDark])[0]
}

const measured = {
  primary: logoClusters[0].hex,
  secondary: logoClusters[1].hex,
  accent: logoClusters[2].hex,
  primaryDark: darkMeasured?.hex ?? reference.primaryDark,
}

const chosen = {}
console.log('\nToken         Reference  Measured   Δ%     Chosen')
for (const key of Object.keys(reference)) {
  const d = distancePercent(reference[key], measured[key])
  chosen[key] = d > THRESHOLD ? measured[key] : reference[key]
  console.log(
    `${key.padEnd(13)} ${reference[key]}    ${measured[key]}    ${d.toFixed(1).padStart(4)}   ${chosen[key]}`,
  )
}

const neutrals = {
  bg: '#F6F8FC',
  surface: '#FFFFFF',
  text: '#13213D',
  textMuted: '#4A5877',
  danger: '#C62828',
  success: '#2E7D32',
}

console.log('\nWCAG contrast checks (AA text ≥ 4.5):')
const checks = [
  ['primary on surface', chosen.primary, neutrals.surface],
  ['primary on bg', chosen.primary, neutrals.bg],
  ['text on bg', neutrals.text, neutrals.bg],
  ['textMuted on bg', neutrals.textMuted, neutrals.bg],
  ['white on primaryDark', '#FFFFFF', chosen.primaryDark],
  ['primaryDark on accent', chosen.primaryDark, chosen.accent],
  ['white on danger', '#FFFFFF', neutrals.danger],
  ['white on success', '#FFFFFF', neutrals.success],
  ['secondary on white (decor only)', chosen.secondary, '#FFFFFF'],
  ['accent on white (never text)', chosen.accent, '#FFFFFF'],
]
for (const [label, fg, bg] of checks) {
  const r = contrast(fg, bg)
  console.log(`  ${label.padEnd(34)} ${r.toFixed(2).padStart(5)}:1 ${r >= 4.5 ? 'AA ✓' : '— decorative only'}`)
}

if (process.argv.includes('--write')) {
  const envBody = (siteUrl) => `# ─── Фирменные цвета (извлечены scripts/extract-colors.mjs из public/assets/logo.png) ───
# Оттенки 50…900 для primary / secondary / accent генерируются программно в src/theme/palette.ts
VITE_COLOR_PRIMARY=${chosen.primary}
VITE_COLOR_PRIMARY_DARK=${chosen.primaryDark}
VITE_COLOR_SECONDARY=${chosen.secondary}
VITE_COLOR_ACCENT=${chosen.accent}
VITE_COLOR_BG=${neutrals.bg}
VITE_COLOR_SURFACE=${neutrals.surface}
VITE_COLOR_TEXT=${neutrals.text}
VITE_COLOR_TEXT_MUTED=${neutrals.textMuted}
VITE_COLOR_DANGER=${neutrals.danger}
VITE_COLOR_SUCCESS=${neutrals.success}

# ─── Сайт ───
# TODO: заменить на боевой домен
VITE_SITE_URL=${siteUrl}

# ─── Связь ───
# Плавающая кнопка «Написать» (WhatsApp)
VITE_CONTACT_URL=https://wa.me/77759711546
# Плавающая кнопка «Видеозвонок»
VITE_VIDEO_CALL_URL=https://wa.me/77759711546


# ─── Формы (TODO: бэкенд отсутствует; пусто = демо-режим без отправки) ───
VITE_FORM_ENDPOINT=
`
  writeFileSync(resolve(root, '.env'), envBody('https://zhasnur.kz'))
  writeFileSync(resolve(root, '.env.example'), envBody('https://example.kz'))
  console.log('\n.env and .env.example written.')
} else if (existsSync(resolve(root, '.env'))) {
  const current = readFileSync(resolve(root, '.env'), 'utf8').match(/VITE_COLOR_PRIMARY=(.*)/)?.[1]
  console.log(`\n(.env present, VITE_COLOR_PRIMARY=${current}; run with --write to regenerate)`)
}
