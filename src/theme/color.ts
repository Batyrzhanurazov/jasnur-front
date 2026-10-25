/** Colour utilities used by the runtime theme (no dependencies). */

export type Rgb = [number, number, number]

export function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = Number.parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function rgbToHex([r, g, b]: Rgb): string {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

export function isHex(value: unknown): value is string {
  return typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim())
}

/** Linear mix of two colours: weight 0 → a, 1 → b. */
export function mix(a: string, b: string, weight: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex([0, 1, 2].map((i) => ca[i]! * (1 - weight) + cb[i]! * weight) as Rgb)
}

function channel(v: number): number {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

/** WCAG 2.1 contrast ratio. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  const hi = Math.max(la, lb)
  const lo = Math.min(la, lb)
  return (hi + 0.05) / (lo + 0.05)
}

export const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
export type ShadeStep = (typeof SHADE_STEPS)[number]
export type Scale = Record<ShadeStep, string>

const LIGHT_WEIGHTS: Partial<Record<ShadeStep, number>> = { 50: 0.92, 100: 0.84, 200: 0.68, 300: 0.5, 400: 0.25 }
const DARK_WEIGHTS: Partial<Record<ShadeStep, number>> = { 600: 0.14, 700: 0.3, 800: 0.46, 900: 0.62 }
const DEEP = '#0A1020'

/** Programmatic 50…900 scale: 500 = base, lighter steps tint with white, darker steps shade with deep navy. */
export function buildScale(base: string): Scale {
  const out = {} as Scale
  for (const step of SHADE_STEPS) {
    if (step === 500) out[step] = base.toUpperCase()
    else if (step < 500) out[step] = mix(base, '#FFFFFF', LIGHT_WEIGHTS[step] ?? 0)
    else out[step] = mix(base, DEEP, DARK_WEIGHTS[step] ?? 0)
  }
  return out
}
