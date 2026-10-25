/**
 * Theme plugin: reads VITE_COLOR_* from import.meta.env, generates scales and
 * semantic tokens and writes them as CSS custom properties on :root.
 * Components only ever use var(--color-…).
 */
import type { App } from 'vue'
import { isHex } from './color'
import { auditContrast, buildThemes, DEFAULT_COLORS, type BaseColors, type SemanticTokens } from './palette'

const ENV_MAP: Record<keyof BaseColors, string | undefined> = {
  primary: import.meta.env.VITE_COLOR_PRIMARY,
  primaryDark: import.meta.env.VITE_COLOR_PRIMARY_DARK,
  secondary: import.meta.env.VITE_COLOR_SECONDARY,
  accent: import.meta.env.VITE_COLOR_ACCENT,
  bg: import.meta.env.VITE_COLOR_BG,
  surface: import.meta.env.VITE_COLOR_SURFACE,
  text: import.meta.env.VITE_COLOR_TEXT,
  textMuted: import.meta.env.VITE_COLOR_TEXT_MUTED,
  danger: import.meta.env.VITE_COLOR_DANGER,
  success: import.meta.env.VITE_COLOR_SUCCESS,
}

export function readEnvColors(): BaseColors {
  const out = { ...DEFAULT_COLORS }
  for (const key of Object.keys(ENV_MAP) as (keyof BaseColors)[]) {
    const value = ENV_MAP[key]
    if (isHex(value)) out[key] = value.trim().toUpperCase()
    else if (import.meta.env.DEV) console.warn(`[theme] VITE_COLOR for "${key}" missing or invalid, using default`)
  }
  return out
}

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())

function semanticBlock(t: SemanticTokens): string {
  return Object.entries(t)
    .map(([k, v]) => `--color-${kebab(k)}:${v};`)
    .join('')
}

export function buildThemeCss(colors: BaseColors): string {
  const tokens = buildThemes(colors)
  const brand = Object.entries(colors)
    .map(([k, v]) => `--color-${kebab(k)}:${v};`)
    .join('')
  const scales = (Object.entries(tokens.scales) as [string, Record<string, string>][])
    .map(([name, scale]) =>
      Object.entries(scale)
        .map(([step, v]) => `--color-${name}-${step}:${v};`)
        .join(''),
    )
    .join('')
  const { light, dark, contrastLight, contrastDark } = tokens.themes
  return [
    `:root{${brand}${scales}${semanticBlock(light)}color-scheme:light;}`,
    `:root[data-theme="dark"]{${semanticBlock(dark)}color-scheme:dark;}`,
    `:root[data-contrast="high"]{${semanticBlock(contrastLight)}}`,
    `:root[data-theme="dark"][data-contrast="high"]{${semanticBlock(contrastDark)}}`,
  ].join('\n')
}

export function applyTheme(): void {
  const colors = readEnvColors()
  let style = document.getElementById('zn-theme') as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = 'zn-theme'
    document.head.prepend(style)
  }
  style.textContent = buildThemeCss(colors)

  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', colors.primaryDark)

  if (import.meta.env.DEV) {
    const { failures } = auditContrast(buildThemes(colors))
    if (failures.length) console.warn('[theme] WCAG AA contrast failures:', failures)
  }
}

export default {
  install(_app: App) {
    applyTheme()
  },
}
