/**
 * Builds every design token from the base brand colours (from .env).
 * Pure module: no Vite / DOM APIs, so it can also run in Node
 * (scripts/check-contrast.mjs imports it directly).
 */
import { buildScale, contrastRatio, mix, type Scale } from './color'

export interface BaseColors {
  primary: string
  primaryDark: string
  secondary: string
  accent: string
  bg: string
  surface: string
  text: string
  textMuted: string
  danger: string
  success: string
}

/** Fallbacks used only if an env variable is missing or invalid (same values as .env.example). */
export const DEFAULT_COLORS: BaseColors = {
  primary: '#1B4F94',
  primaryDark: '#1D3159',
  secondary: '#409CA8',
  accent: '#FFF351',
  bg: '#F6F8FC',
  surface: '#FFFFFF',
  text: '#13213D',
  textMuted: '#4A5877',
  danger: '#C62828',
  success: '#2E7D32',
}

const WHITE = '#FFFFFF'
const BLACK = '#000000'
const DEEP = '#0A1020'

/** Semantic tokens that change between themes. */
export interface SemanticTokens {
  bg: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  heading: string
  link: string
  border: string
  secondaryText: string
  onPrimary: string
  onAccent: string
  sectionDarkBg: string
  sectionDarkText: string
  sectionDarkMuted: string
  sectionDarkLink: string
  focus: string
  focusRing: string
  pattern: string
  shadow: string
}

export type ThemeName = 'light' | 'dark' | 'contrastLight' | 'contrastDark'

export interface ThemeTokens {
  brand: BaseColors
  scales: { primary: Scale; secondary: Scale; accent: Scale }
  themes: Record<ThemeName, SemanticTokens>
}

export function buildThemes(c: BaseColors): ThemeTokens {
  const primary = buildScale(c.primary)
  const secondary = buildScale(c.secondary)
  const accent = buildScale(c.accent)

  const light: SemanticTokens = {
    bg: c.bg,
    surface: c.surface,
    surfaceAlt: primary[50],
    text: c.text,
    textMuted: c.textMuted,
    heading: c.primaryDark,
    link: c.primary,
    border: mix(c.primary, WHITE, 0.84),
    secondaryText: secondary[700],
    onPrimary: WHITE,
    onAccent: c.primaryDark,
    sectionDarkBg: c.primaryDark,
    sectionDarkText: WHITE,
    sectionDarkMuted: primary[100],
    sectionDarkLink: accent[500],
    focus: c.primary,
    focusRing: accent[500],
    pattern: c.secondary,
    shadow: mix(c.primaryDark, WHITE, 0.2),
  }

  const dark: SemanticTokens = {
    bg: mix(c.primaryDark, DEEP, 0.6),
    surface: mix(c.primaryDark, DEEP, 0.3),
    surfaceAlt: c.primaryDark,
    text: primary[50],
    textMuted: primary[200],
    heading: WHITE,
    link: secondary[300],
    border: mix(c.primaryDark, WHITE, 0.16),
    secondaryText: secondary[300],
    onPrimary: WHITE,
    onAccent: c.primaryDark,
    sectionDarkBg: primary[900],
    sectionDarkText: WHITE,
    sectionDarkMuted: primary[100],
    sectionDarkLink: accent[500],
    focus: accent[500],
    focusRing: c.primaryDark,
    pattern: secondary[400],
    shadow: BLACK,
  }

  const contrastLight: SemanticTokens = {
    bg: WHITE,
    surface: WHITE,
    surfaceAlt: WHITE,
    text: BLACK,
    textMuted: BLACK,
    heading: BLACK,
    link: primary[800],
    border: BLACK,
    secondaryText: primary[800],
    onPrimary: WHITE,
    onAccent: BLACK,
    sectionDarkBg: BLACK,
    sectionDarkText: WHITE,
    sectionDarkMuted: WHITE,
    sectionDarkLink: accent[500],
    focus: BLACK,
    focusRing: accent[500],
    pattern: BLACK,
    shadow: BLACK,
  }

  const contrastDark: SemanticTokens = {
    ...contrastLight,
    bg: BLACK,
    surface: BLACK,
    surfaceAlt: BLACK,
    text: WHITE,
    textMuted: WHITE,
    heading: WHITE,
    link: accent[500],
    border: WHITE,
    secondaryText: accent[500],
    focus: accent[500],
    focusRing: BLACK,
    pattern: WHITE,
  }

  return {
    brand: c,
    scales: { primary, secondary, accent },
    themes: { light, dark, contrastLight, contrastDark },
  }
}

export interface ContrastIssue {
  theme: ThemeName
  pair: string
  ratio: number
}

/** WCAG AA (4.5:1) check for every text/background pair actually used by the UI. */
export function auditContrast(tokens: ThemeTokens, min = 4.5): { results: ContrastIssue[]; failures: ContrastIssue[] } {
  const results: ContrastIssue[] = []
  const { brand } = tokens
  for (const [theme, t] of Object.entries(tokens.themes) as [ThemeName, SemanticTokens][]) {
    const pairs: [string, string, string][] = [
      ['text / bg', t.text, t.bg],
      ['text / surface', t.text, t.surface],
      ['textMuted / bg', t.textMuted, t.bg],
      ['textMuted / surface', t.textMuted, t.surface],
      ['heading / bg', t.heading, t.bg],
      ['link / bg', t.link, t.bg],
      ['link / surface', t.link, t.surface],
      ['secondaryText / surface', t.secondaryText, t.surface],
      ['sectionDarkText / sectionDarkBg', t.sectionDarkText, t.sectionDarkBg],
      ['sectionDarkMuted / sectionDarkBg', t.sectionDarkMuted, t.sectionDarkBg],
      ['sectionDarkLink / sectionDarkBg', t.sectionDarkLink, t.sectionDarkBg],
      ['onPrimary / primary', t.onPrimary, brand.primary],
      ['onAccent / accent', t.onAccent, brand.accent],
      ['white / danger', WHITE, brand.danger],
      ['white / success', WHITE, brand.success],
    ]
    for (const [pair, fg, bg] of pairs) results.push({ theme, pair, ratio: contrastRatio(fg, bg) })
  }
  return { results, failures: results.filter((r) => r.ratio < min) }
}
