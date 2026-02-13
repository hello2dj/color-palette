export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
  [key: number]: string
}

export interface ColorPalette {
  name: string
  baseColor: string
  scale: ColorScale
}

export type ColorHarmony = 
  | 'analogous'
  | 'monochromatic'
  | 'triadic'
  | 'complementary'
  | 'split-complementary'
  | 'tetradic'
  | 'auto'

export interface PaletteState {
  brand: ColorPalette
  neutral: ColorPalette | null
  success: ColorPalette | null
  warning: ColorPalette | null
  error: ColorPalette | null
}

export interface HSLColor {
  h: number
  s: number
  l: number
}
