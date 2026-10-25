#!/usr/bin/env node
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildThemes, auditContrast, DEFAULT_COLORS } from '../src/theme/palette.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const envPath = resolve(root, '.env')

const colors = { ...DEFAULT_COLORS }
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const match = line.match(/^VITE_COLOR_([A-Z_]+)=(#?[A-Za-z0-9]+)/)
    if (match && match[1] && match[2]) {
      const keyMap = {
        PRIMARY: 'primary',
        PRIMARY_DARK: 'primaryDark',
        SECONDARY: 'secondary',
        ACCENT: 'accent',
        BG: 'bg',
        SURFACE: 'surface',
        TEXT: 'text',
        TEXT_MUTED: 'textMuted',
        DANGER: 'danger',
        SUCCESS: 'success'
      }
      const mapped = keyMap[match[1]]
      if (mapped) {
        colors[mapped] = match[2]
      }
    }
  }
}

const tokens = buildThemes(colors)
const { results, failures } = auditContrast(tokens, 4.5)

console.log(`\nWCAG 2.1 AA Contrast Audit for themes (Target ≥ 4.5:1 for body/headings)`)
console.log('='.repeat(70))

let lastTheme = ''
for (const r of results) {
  if (r.theme !== lastTheme) {
    lastTheme = r.theme
    console.log(`\n[Theme: ${r.theme}]`)
  }
  const status = r.ratio >= 4.5 ? 'PASS' : 'WARN'
  console.log(`  ${r.pair.padEnd(36)} : ${r.ratio.toFixed(2).padStart(5)}:1  [${status}]`)
}

console.log('='.repeat(70))
if (failures.length > 0) {
  console.warn(`\nFound ${failures.length} combinations under 4.5:1 (ensure these are decorative only).`)
} else {
  console.log('\nAll text color combinations meet WCAG AA requirements!')
}
