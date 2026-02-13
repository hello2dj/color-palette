import type { ColorPalette } from '@/types/color'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GradientPreviewProps {
  brand: ColorPalette
  neutral?: ColorPalette | null
}

export function GradientPreview({ brand }: GradientPreviewProps) {
  
  const gradientPairs = [
    { from: brand.scale[500], to: brand.scale[700], name: 'Primary Deep' },
    { from: brand.scale[400], to: brand.scale[600], name: 'Primary Medium' },
    { from: brand.scale[300], to: brand.scale[500], name: 'Primary Light' },
    { from: brand.scale[600], to: brand.scale[800], name: 'Primary Dark' },
    { from: brand.scale[400], to: brand.scale[800], name: 'Primary Long' },
  ]
  
  const multiStopGradients = [
    { colors: [brand.scale[300], brand.scale[500], brand.scale[700]], name: 'Three Stop' },
    { colors: [brand.scale[200], brand.scale[400], brand.scale[600], brand.scale[800]], name: 'Four Stop' },
    { colors: [brand.scale[100], brand.scale[300], brand.scale[500], brand.scale[700], brand.scale[900]], name: 'Five Stop' },
  ]
  
  const directions = [
    { angle: '135deg', name: 'Diagonal' },
    { angle: 'to right', name: 'Horizontal' },
    { angle: 'to bottom', name: 'Vertical' },
    { angle: '45deg', name: 'Reverse Diagonal' },
  ]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gradientPairs.map((gradient, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{gradient.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-24 rounded-lg"
                style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{gradient.from}</span>
                <span>{gradient.to}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Multi-Stop Gradients</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {multiStopGradients.map((gradient, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm font-medium">{gradient.name}</p>
              <div 
                className="h-16 rounded-lg"
                style={{ background: `linear-gradient(to right, ${gradient.colors.join(', ')})` }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                {gradient.colors.map((color, j) => (
                  <span key={j}>{color}</span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Gradient Directions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {directions.map((dir, i) => (
              <div key={i} className="space-y-2">
                <p className="text-sm font-medium text-center">{dir.name}</p>
                <div 
                  className="h-20 rounded-lg"
                  style={{ background: `linear-gradient(${dir.angle}, ${brand.scale[400]}, ${brand.scale[700]})` }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Radial Gradients</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Circle</p>
            <div 
              className="h-32 rounded-lg"
              style={{ background: `radial-gradient(circle, ${brand.scale[300]}, ${brand.scale[600]})` }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Ellipse</p>
            <div 
              className="h-32 rounded-lg"
              style={{ background: `radial-gradient(ellipse at top, ${brand.scale[400]}, ${brand.scale[700]})` }}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Closest Corner</p>
            <div 
              className="h-32 rounded-lg"
              style={{ background: `radial-gradient(circle closest-corner at 30% 30%, ${brand.scale[300]}, ${brand.scale[500]}, ${brand.scale[800]})` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
