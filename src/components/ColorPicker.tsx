import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)
  
  // Parse hex color to RGB
  const parseHex = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }
  
  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }
  
  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360
    s /= 100
    l /= 100
    
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }
    
    let r, g, b
    if (s === 0) {
      r = g = b = l
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    }
  }
  
  // Convert RGB to Hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
  
  const { r, g, b } = parseHex(color)
  const hsl = rgbToHsl(r, g, b)
  
  const handleHueChange = (value: number[]) => {
    const newRgb = hslToRgb(value[0], hsl.s, hsl.l)
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }
  
  const handleSaturationChange = (value: number[]) => {
    const newRgb = hslToRgb(hsl.h, value[0], hsl.l)
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }
  
  const handleLightnessChange = (value: number[]) => {
    const newRgb = hslToRgb(hsl.h, hsl.s, value[0])
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }
  
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (!value.startsWith('#')) value = '#' + value
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      if (value.length === 7) {
        onChange(value.toLowerCase())
      }
    }
  }
  
  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  return (
    <div ref={pickerRef} className={cn("relative", className)}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-10 h-10 rounded-md border shadow-sm overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg1djVIMHptNSA1aDV2NUg1eiIgZmlsbD0iI2NjYyIgZmlsbC1vcGFjaXR5PSIwLjIiLz48L3N2Zz4=')] opacity-30" />
        </button>
        <Input
          value={color.toUpperCase()}
          onChange={handleHexChange}
          className="w-24 text-sm font-mono"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-popover border rounded-lg shadow-lg z-50 w-64 space-y-4">
          {/* Hue Gradient */}
          <div 
            className="w-full h-32 rounded-md cursor-pointer relative"
            style={{
              background: `
                linear-gradient(to bottom, transparent, #808080),
                linear-gradient(to right, 
                  hsl(0, 100%, 50%), 
                  hsl(60, 100%, 50%), 
                  hsl(120, 100%, 50%), 
                  hsl(180, 100%, 50%), 
                  hsl(240, 100%, 50%), 
                  hsl(300, 100%, 50%), 
                  hsl(360, 100%, 50%)
                )
              `
            }}
          >
            <div 
              className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md pointer-events-none"
              style={{
                left: `${(hsl.h / 360) * 100}%`,
                top: `${100 - hsl.s}%`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: color
              }}
            />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium">Hue</label>
              <Slider
                value={[hsl.h]}
                onValueChange={handleHueChange}
                min={0}
                max={360}
                step={1}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Saturation</label>
              <Slider
                value={[hsl.s]}
                onValueChange={handleSaturationChange}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium">Lightness</label>
              <Slider
                value={[hsl.l]}
                onValueChange={handleLightnessChange}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
