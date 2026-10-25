// Shared colour helpers for Node scripts (no dependencies).

export function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function rgbToHex([r, g, b]) {
  return (
    '#' +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  )
}

function channel(v) {
  const s = v / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrast(a, b) {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/** Relative distance between two colours in RGB space, 0..100 %. */
export function distancePercent(a, b) {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  const d = Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
  return (d / Math.sqrt(3 * 255 ** 2)) * 100
}

export function mix(a, b, weight) {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex(ca.map((v, i) => v * (1 - weight) + cb[i] * weight))
}

/** 50…900 scale: lighter steps mix with white, darker steps mix with near-black navy. */
export function scale(base) {
  const steps = { 50: 0.92, 100: 0.84, 200: 0.68, 300: 0.5, 400: 0.25, 500: 0, 600: 0.14, 700: 0.3, 800: 0.46, 900: 0.62 }
  const out = {}
  for (const [k, w] of Object.entries(steps)) {
    const n = Number(k)
    out[k] = n < 500 ? mix(base, '#FFFFFF', w) : n === 500 ? base.toUpperCase() : mix(base, '#0A1020', w)
  }
  return out
}
