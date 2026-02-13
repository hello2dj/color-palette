import type { ColorPalette } from '@/types/color'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'

interface ChartPreviewProps {
  brand: ColorPalette
  neutral?: ColorPalette | null
  success?: ColorPalette | null
  warning?: ColorPalette | null
  error?: ColorPalette | null
}

export function ChartPreview({ brand, success, warning, error }: ChartPreviewProps) {
  const successColor = success?.scale[500] || '#22c55e'
  const warningColor = warning?.scale[500] || '#f59e0b'
  const errorColor = error?.scale[500] || '#ef4444'
  
  // Chart color palette
  const chartColors = [
    brand.scale[500],
    brand.scale[400],
    brand.scale[600],
    brand.scale[300],
    brand.scale[700],
    successColor,
    warningColor,
    errorColor,
  ]
  
  // Sample data for bar chart
  const barData = [65, 45, 80, 55, 70, 40, 90, 60]
  
  // Sample data for pie chart
  const pieData = [
    { value: 35, color: chartColors[0] },
    { value: 25, color: chartColors[1] },
    { value: 20, color: chartColors[2] },
    { value: 15, color: chartColors[3] },
    { value: 5, color: chartColors[4] },
  ]
  
  // Sample data for line chart
  const lineData = [30, 45, 35, 55, 48, 65, 58, 75, 70, 85, 80, 95]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Vertical bar chart visualization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {barData.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full rounded-t-md transition-all hover:opacity-80"
                    style={{ 
                      height: `${value}%`, 
                      backgroundColor: chartColors[i % chartColors.length]
                    }}
                  />
                  <span className="text-xs text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Horizontal Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Horizontal Bar Chart</CardTitle>
            <CardDescription>Side-to-side comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 space-y-3">
              {barData.slice(0, 6).map((value, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-8">Item {i + 1}</span>
                  <div className="flex-1 h-8 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all hover:opacity-80"
                      style={{ 
                        width: `${value}%`, 
                        backgroundColor: chartColors[i % chartColors.length]
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium w-8 text-right">{value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>Trend visualization over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={brand.scale[500]} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={brand.scale[500]} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${150 - lineData[0]} ${lineData.map((d, i) => `L ${(i / (lineData.length - 1)) * 300} ${150 - d}`).join(' ')}`}
                  fill="none"
                  stroke={brand.scale[500]}
                  strokeWidth="2"
                />
                <path
                  d={`M 0 ${150 - lineData[0]} ${lineData.map((d, i) => `L ${(i / (lineData.length - 1)) * 300} ${150 - d}`).join(' ')} L 300 150 L 0 150 Z`}
                  fill="url(#lineGradient)"
                />
                {lineData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (lineData.length - 1)) * 300}
                    cy={150 - d}
                    r="4"
                    fill={brand.scale[500]}
                  />
                ))}
              </svg>
            </div>
          </CardContent>
        </Card>
        
        {/* Multi-Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Multi-Line Chart</CardTitle>
            <CardDescription>Multiple data series comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 relative">
              <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
                {[
                  { data: lineData, color: brand.scale[500] },
                  { data: lineData.map(v => v * 0.7), color: successColor },
                  { data: lineData.map(v => v * 0.5), color: warningColor },
                ].map((series, seriesIndex) => (
                  <path
                    key={seriesIndex}
                    d={`M 0 ${150 - series.data[0]} ${series.data.map((d, i) => `L ${(i / (series.data.length - 1)) * 300} ${150 - d}`).join(' ')}`}
                    fill="none"
                    stroke={series.color}
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {[
                { label: 'Primary', color: brand.scale[500] },
                { label: 'Success', color: successColor },
                { label: 'Warning', color: warningColor },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>Distribution visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {pieData.reduce((acc, slice, i) => {
                  const startAngle = acc.totalAngle
                  const sliceAngle = (slice.value / 100) * 360
                  const endAngle = startAngle + sliceAngle
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                  
                  const largeArcFlag = sliceAngle > 180 ? 1 : 0
                  
                  acc.elements.push(
                    <path
                      key={i}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={slice.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  )
                  acc.totalAngle = endAngle
                  return acc
                }, { elements: [] as React.ReactElement[], totalAngle: 0 }).elements}
              </svg>
            </div>
            <div className="mt-4 space-y-1 w-full">
              {pieData.map((slice, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-sm" 
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="text-muted-foreground">Segment {i + 1}</span>
                  </div>
                  <span className="font-medium">{slice.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Donut Chart</CardTitle>
            <CardDescription>Ring visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {pieData.reduce((acc, slice, i) => {
                  const startAngle = acc.totalAngle
                  const sliceAngle = (slice.value / 100) * 360
                  const endAngle = startAngle + sliceAngle
                  
                  const outerX1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                  const outerY1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                  const outerX2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                  const outerY2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)
                  
                  const innerX1 = 50 + 25 * Math.cos((startAngle * Math.PI) / 180)
                  const innerY1 = 50 + 25 * Math.sin((startAngle * Math.PI) / 180)
                  const innerX2 = 50 + 25 * Math.cos((endAngle * Math.PI) / 180)
                  const innerY2 = 50 + 25 * Math.sin((endAngle * Math.PI) / 180)
                  
                  const largeArcFlag = sliceAngle > 180 ? 1 : 0
                  
                  acc.elements.push(
                    <path
                      key={i}
                      d={`M ${outerX1} ${outerY1} A 40 40 0 ${largeArcFlag} 1 ${outerX2} ${outerY2} L ${innerX2} ${innerY2} A 25 25 0 ${largeArcFlag} 0 ${innerX1} ${innerY1} Z`}
                      fill={slice.color}
                    />
                  )
                  acc.totalAngle = endAngle
                  return acc
                }, { elements: [] as React.ReactElement[], totalAngle: 0 }).elements}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Polar Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Polar Area</CardTitle>
            <CardDescription>Radial visualization</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {barData.slice(0, 8).map((value, i) => {
                  const angle = (i / 8) * 2 * Math.PI - Math.PI / 2
                  const radius = (value / 100) * 40
                  const x = 50 + radius * Math.cos(angle)
                  const y = 50 + radius * Math.sin(angle)
                  
                  return (
                    <polygon
                      key={i}
                      points={`50,50 ${50 + 40 * Math.cos(angle - Math.PI / 8)} ${50 + 40 * Math.sin(angle - Math.PI / 8)} ${x},${y} ${50 + 40 * Math.cos(angle + Math.PI / 8)} ${50 + 40 * Math.sin(angle + Math.PI / 8)}`}
                      fill={chartColors[i % chartColors.length]}
                      opacity="0.7"
                    />
                  )
                })}
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Color Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Chart Color Palette</CardTitle>
          <CardDescription>Recommended colors for data visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {chartColors.map((color, i) => (
              <div key={i} className="space-y-2">
                <div 
                  className="aspect-square rounded-lg"
                  style={{ backgroundColor: color }}
                />
                <p className="text-xs text-center text-muted-foreground">{color}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
