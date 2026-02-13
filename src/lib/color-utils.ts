import type { ColorScale, HSLColor } from '@/types/color'

export function hexToHsl(hex: string): HSLColor {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))))
  return `#${f(0).toString(16).padStart(2, '0')}${f(8).toString(16).padStart(2, '0')}${f(4).toString(16).padStart(2, '0')}`
}

export function generateColorScale(baseColor: string): ColorScale {
  const hsl = hexToHsl(baseColor)
  const { h, s } = hsl

  // Generate scale with varying lightness
  // Using a curve that looks good for most colors
  const lightnesses = [97, 93, 85, 75, 65, 55, 45, 35, 25, 17, 10]
  
  // Saturation adjustments - reduce saturation for very light/dark colors
  const saturations = lightnesses.map((l) => {
    if (l > 90) return Math.max(s * 0.3, 5)
    if (l > 80) return Math.max(s * 0.5, 10)
    if (l > 70) return Math.max(s * 0.7, 15)
    if (l > 60) return Math.max(s * 0.85, 20)
    if (l > 40) return s
    if (l > 30) return Math.max(s * 0.9, 20)
    if (l > 20) return Math.max(s * 0.8, 15)
    return Math.max(s * 0.7, 10)
  })

  const scale: ColorScale = {
    50: hslToHex(h, saturations[0], lightnesses[0]),
    100: hslToHex(h, saturations[1], lightnesses[1]),
    200: hslToHex(h, saturations[2], lightnesses[2]),
    300: hslToHex(h, saturations[3], lightnesses[3]),
    400: hslToHex(h, saturations[4], lightnesses[4]),
    500: hslToHex(h, saturations[5], lightnesses[5]),
    600: hslToHex(h, saturations[6], lightnesses[6]),
    700: hslToHex(h, saturations[7], lightnesses[7]),
    800: hslToHex(h, saturations[8], lightnesses[8]),
    900: hslToHex(h, saturations[9], lightnesses[9]),
    950: hslToHex(h, saturations[10], lightnesses[10]),
  }

  return scale
}

export function generateNeutralScale(baseColor: string): ColorScale {
  const hsl = hexToHsl(baseColor)
  const { h, s } = hsl
  
  // Neutral colors have very low saturation
  const neutralSaturation = Math.min(s * 0.15, 8)
  
  const lightnesses = [98, 96, 90, 82, 70, 58, 46, 36, 26, 18, 10]
  
  const scale: ColorScale = {
    50: hslToHex(h, neutralSaturation, lightnesses[0]),
    100: hslToHex(h, neutralSaturation, lightnesses[1]),
    200: hslToHex(h, neutralSaturation, lightnesses[2]),
    300: hslToHex(h, neutralSaturation, lightnesses[3]),
    400: hslToHex(h, neutralSaturation, lightnesses[4]),
    500: hslToHex(h, neutralSaturation, lightnesses[5]),
    600: hslToHex(h, neutralSaturation, lightnesses[6]),
    700: hslToHex(h, neutralSaturation, lightnesses[7]),
    800: hslToHex(h, neutralSaturation, lightnesses[8]),
    900: hslToHex(h, neutralSaturation, lightnesses[9]),
    950: hslToHex(h, neutralSaturation, lightnesses[10]),
  }

  return scale
}

export function generateRandomColor(): string {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 40) + 50 // 50-90% saturation
  const l = Math.floor(Math.random() * 30) + 40 // 40-70% lightness
  return hslToHex(h, s, l)
}

export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

export function generateHarmonyColors(baseColor: string, harmony: string): string[] {
  const hsl = hexToHsl(baseColor)
  const { h, s, l } = hsl
  
  switch (harmony) {
    case 'complementary':
      return [baseColor, hslToHex((h + 180) % 360, s, l)]
    
    case 'analogous':
      return [
        hslToHex((h - 30 + 360) % 360, s, l),
        baseColor,
        hslToHex((h + 30) % 360, s, l),
      ]
    
    case 'triadic':
      return [
        baseColor,
        hslToHex((h + 120) % 360, s, l),
        hslToHex((h + 240) % 360, s, l),
      ]
    
    case 'split-complementary':
      return [
        baseColor,
        hslToHex((h + 150) % 360, s, l),
        hslToHex((h + 210) % 360, s, l),
      ]
    
    case 'tetradic':
      return [
        baseColor,
        hslToHex((h + 90) % 360, s, l),
        hslToHex((h + 180) % 360, s, l),
        hslToHex((h + 270) % 360, s, l),
      ]
    
    case 'monochromatic':
      return [
        hslToHex(h, Math.max(s - 30, 0), l),
        hslToHex(h, s, Math.max(l - 20, 10)),
        baseColor,
        hslToHex(h, Math.min(s + 20, 100), l),
        hslToHex(h, s, Math.min(l + 20, 90)),
      ]
    
    default:
      return [baseColor]
  }
}
