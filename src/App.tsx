import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { ColorScaleDisplay } from '@/components/ColorScaleDisplay'
import { ColorPicker } from '@/components/ColorPicker'
import { ComponentPreview } from '@/components/ComponentPreview'
import { GradientPreview } from '@/components/GradientPreview'
import { ChartPreview } from '@/components/ChartPreview'
import { generateColorScale, generateNeutralScale, generateRandomColor } from '@/lib/color-utils'
import type { ColorPalette } from '@/types/color'
import { Download, Shuffle, Plus, Trash2 } from 'lucide-react'

function App() {
  const [brandColor, setBrandColor] = useState('#3b82f6')
  const [neutralColor, setNeutralColor] = useState<string | null>(null)
  const [successColor, setSuccessColor] = useState<string | null>(null)
  const [warningColor, setWarningColor] = useState<string | null>(null)
  const [errorColor, setErrorColor] = useState<string | null>(null)
  const [showNeutral, setShowNeutral] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const brandPalette: ColorPalette = {
    name: 'brand',
    baseColor: brandColor,
    scale: generateColorScale(brandColor)
  }

  const neutralPalette: ColorPalette | null = neutralColor ? {
    name: 'neutral',
    baseColor: neutralColor,
    scale: generateNeutralScale(neutralColor)
  } : null

  const successPalette: ColorPalette | null = successColor ? {
    name: 'success',
    baseColor: successColor,
    scale: generateColorScale(successColor)
  } : null

  const warningPalette: ColorPalette | null = warningColor ? {
    name: 'warning',
    baseColor: warningColor,
    scale: generateColorScale(warningColor)
  } : null

  const errorPalette: ColorPalette | null = errorColor ? {
    name: 'error',
    baseColor: errorColor,
    scale: generateColorScale(errorColor)
  } : null

  const handleRandomize = useCallback(() => {
    setBrandColor(generateRandomColor())
    if (showNeutral) setNeutralColor(generateRandomColor())
    if (showStatus) {
      setSuccessColor(generateRandomColor())
      setWarningColor(generateRandomColor())
      setErrorColor(generateRandomColor())
    }
  }, [showNeutral, showStatus])

  const handleExport = useCallback(() => {
    const palette = {
      brand: brandPalette.scale,
      ...(neutralPalette && { neutral: neutralPalette.scale }),
      ...(successPalette && { success: successPalette.scale }),
      ...(warningPalette && { warning: warningPalette.scale }),
      ...(errorPalette && { error: errorPalette.scale }),
    }
    
    const dataStr = JSON.stringify(palette, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'color-palette.json'
    link.click()
    URL.revokeObjectURL(url)
  }, [brandPalette, neutralPalette, successPalette, warningPalette, errorPalette])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault()
        handleRandomize()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleRandomize])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${brandPalette.scale[500]}, ${brandPalette.scale[700]})` }}
              >
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Color Generator</h1>
                <p className="text-sm text-muted-foreground">Create beautiful color palettes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRandomize}>
                <Shuffle className="w-4 h-4 mr-2" />
                Random
                <kbd className="ml-2 hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  Space
                </kbd>
              </Button>
              <Button size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Color</CardTitle>
                <CardDescription>Primary color for your design system</CardDescription>
              </CardHeader>
              <CardContent>
                <ColorPicker color={brandColor} onChange={setBrandColor} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Neutral Scale</CardTitle>
                  <Switch checked={showNeutral} onCheckedChange={setShowNeutral} />
                </div>
                <CardDescription>Grayscale colors for text and surfaces</CardDescription>
              </CardHeader>
              {showNeutral && (
                <CardContent className="space-y-4">
                  {neutralColor ? (
                    <ColorPicker color={neutralColor} onChange={setNeutralColor} />
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setNeutralColor(generateRandomColor())}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Neutral
                    </Button>
                  )}
                  {neutralColor && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-destructive"
                      onClick={() => setNeutralColor(null)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Status Colors</CardTitle>
                  <Switch checked={showStatus} onCheckedChange={setShowStatus} />
                </div>
                <CardDescription>Success, warning, and error states</CardDescription>
              </CardHeader>
              {showStatus && (
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Success</label>
                    {successColor ? (
                      <div className="flex items-center gap-2">
                        <ColorPicker color={successColor} onChange={setSuccessColor} />
                        <Button variant="ghost" size="icon" onClick={() => setSuccessColor(null)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full" onClick={() => setSuccessColor(generateRandomColor())}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Success
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Warning</label>
                    {warningColor ? (
                      <div className="flex items-center gap-2">
                        <ColorPicker color={warningColor} onChange={setWarningColor} />
                        <Button variant="ghost" size="icon" onClick={() => setWarningColor(null)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full" onClick={() => setWarningColor(generateRandomColor())}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Warning
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Error</label>
                    {errorColor ? (
                      <div className="flex items-center gap-2">
                        <ColorPicker color={errorColor} onChange={setErrorColor} />
                        <Button variant="ghost" size="icon" onClick={() => setErrorColor(null)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" className="w-full" onClick={() => setErrorColor(generateRandomColor())}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Error
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Scales</CardTitle>
                <CardDescription>Generated color palette</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ColorScaleDisplay scale={brandPalette.scale} name="brand" />
                {neutralPalette && <ColorScaleDisplay scale={neutralPalette.scale} name="neutral" />}
                {successPalette && <ColorScaleDisplay scale={successPalette.scale} name="success" />}
                {warningPalette && <ColorScaleDisplay scale={warningPalette.scale} name="warning" />}
                {errorPalette && <ColorScaleDisplay scale={errorPalette.scale} name="error" />}
              </CardContent>
            </Card>
          </aside>

          <div>
            <Tabs defaultValue="components" className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="gradients">Gradients</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
              </TabsList>
              
              <TabsContent value="components" className="mt-6">
                <ComponentPreview 
                  brand={brandPalette}
                  neutral={neutralPalette}
                  success={successPalette}
                  warning={warningPalette}
                  error={errorPalette}
                />
              </TabsContent>
              
              <TabsContent value="gradients" className="mt-6">
                <GradientPreview 
                  brand={brandPalette}
                  neutral={neutralPalette}
                />
              </TabsContent>
              
              <TabsContent value="charts" className="mt-6">
                <ChartPreview 
                  brand={brandPalette}
                  neutral={neutralPalette}
                  success={successPalette}
                  warning={warningPalette}
                  error={errorPalette}
                />
              </TabsContent>
              
              <TabsContent value="tailwind" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tailwind CSS Config</CardTitle>
                    <CardDescription>Copy this configuration to your tailwind.config.js</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`colors: {\n  brand: {\n    50: '${brandPalette.scale[50]}',\n    100: '${brandPalette.scale[100]}',\n    200: '${brandPalette.scale[200]}',\n    300: '${brandPalette.scale[300]}',\n    400: '${brandPalette.scale[400]}',\n    500: '${brandPalette.scale[500]}',\n    600: '${brandPalette.scale[600]}',\n    700: '${brandPalette.scale[700]}',\n    800: '${brandPalette.scale[800]}',\n    900: '${brandPalette.scale[900]}',\n    950: '${brandPalette.scale[950]}',\n  },${neutralPalette ? `\n  neutral: {\n    50: '${neutralPalette.scale[50]}',\n    100: '${neutralPalette.scale[100]}',\n    200: '${neutralPalette.scale[200]}',\n    300: '${neutralPalette.scale[300]}',\n    400: '${neutralPalette.scale[400]}',\n    500: '${neutralPalette.scale[500]}',\n    600: '${neutralPalette.scale[600]}',\n    700: '${neutralPalette.scale[700]}',\n    800: '${neutralPalette.scale[800]}',\n    900: '${neutralPalette.scale[900]}',\n    950: '${neutralPalette.scale[950]}',\n  },` : ''}${successPalette ? `\n  success: {\n    50: '${successPalette.scale[50]}',\n    100: '${successPalette.scale[100]}',\n    200: '${successPalette.scale[200]}',\n    300: '${successPalette.scale[300]}',\n    400: '${successPalette.scale[400]}',\n    500: '${successPalette.scale[500]}',\n    600: '${successPalette.scale[600]}',\n    700: '${successPalette.scale[700]}',\n    800: '${successPalette.scale[800]}',\n    900: '${successPalette.scale[900]}',\n    950: '${successPalette.scale[950]}',\n  },` : ''}${warningPalette ? `\n  warning: {\n    50: '${warningPalette.scale[50]}',\n    100: '${warningPalette.scale[100]}',\n    200: '${warningPalette.scale[200]}',\n    300: '${warningPalette.scale[300]}',\n    400: '${warningPalette.scale[400]}',\n    500: '${warningPalette.scale[500]}',\n    600: '${warningPalette.scale[600]}',\n    700: '${warningPalette.scale[700]}',\n    800: '${warningPalette.scale[800]}',\n    900: '${warningPalette.scale[900]}',\n    950: '${warningPalette.scale[950]}',\n  },` : ''}${errorPalette ? `\n  error: {\n    50: '${errorPalette.scale[50]}',\n    100: '${errorPalette.scale[100]}',\n    200: '${errorPalette.scale[200]}',\n    300: '${errorPalette.scale[300]}',\n    400: '${errorPalette.scale[400]}',\n    500: '${errorPalette.scale[500]}',\n    600: '${errorPalette.scale[600]}',\n    700: '${errorPalette.scale[700]}',\n    800: '${errorPalette.scale[800]}',\n    900: '${errorPalette.scale[900]}',\n    950: '${errorPalette.scale[950]}',\n  },` : ''}\n}`}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
