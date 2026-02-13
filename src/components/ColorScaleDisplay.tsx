import type { ColorScale } from '@/types/color'
import { getContrastColor } from '@/lib/color-utils'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ColorScaleDisplayProps {
  scale: ColorScale
  name: string
  className?: string
}

export function ColorScaleDisplay({ scale, name, className }: ColorScaleDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null)
  
  const handleCopy = (color: string, shade: string) => {
    navigator.clipboard.writeText(color)
    setCopied(`${name}-${shade}`)
    setTimeout(() => setCopied(null), 2000)
  }
  
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm capitalize">{name}</h3>
      </div>
      <div className="grid grid-cols-11 gap-1">
        {shades.map((shade) => {
          const color = scale[shade]
          const contrastColor = getContrastColor(color)
          const isCopied = copied === `${name}-${shade}`
          
          return (
            <div
              key={shade}
              className="group relative aspect-square rounded-md cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: color }}
              onClick={() => handleCopy(color, String(shade))}
            >
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: contrastColor }}
              >
                <span className="text-xs font-medium">{shade}</span>
                <span className="text-[10px] opacity-75">{color}</span>
              </div>
              {isCopied && (
                <div 
                  className="absolute inset-0 flex items-center justify-center rounded-md"
                  style={{ backgroundColor: color, color: contrastColor }}
                >
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
