import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ColorPalette } from '@/types/color'
import { Bell, Settings, User, Mail, FileText, CheckCircle2, AlertCircle, Info, ArrowRight } from 'lucide-react'

interface ComponentPreviewProps {
  brand: ColorPalette
  neutral?: ColorPalette | null
  success?: ColorPalette | null
  warning?: ColorPalette | null
  error?: ColorPalette | null
}

export function ComponentPreview({ brand, neutral, success, warning, error }: ComponentPreviewProps) {
  const neutralScale = neutral?.scale || brand.scale
  const successScale = success?.scale || { 500: '#22c55e', 600: '#16a34a' } as any
  const warningScale = warning?.scale || { 500: '#f59e0b', 600: '#d97706' } as any
  const errorScale = error?.scale || { 500: '#ef4444', 600: '#dc2626' } as any
  
  return (
    <div className="space-y-8">
      <div 
        className="rounded-2xl p-8 text-white"
        style={{ background: `linear-gradient(135deg, ${brand.scale[600]} 0%, ${brand.scale[800]} 100%)` }}
      >
        <h2 className="text-3xl font-bold mb-2">Beautiful Design System</h2>
        <p className="opacity-90 mb-6 max-w-xl">Create stunning user interfaces with our comprehensive color palette and component library.</p>
        <div className="flex gap-3">
          <Button className="bg-white text-gray-900 hover:bg-gray-100">Get Started</Button>
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">Learn More</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: brand.scale[100] }}
            >
              <User className="w-5 h-5" style={{ color: brand.scale[600] }} />
            </div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage your team members and their permissions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background"
                  style={{ backgroundColor: brand.scale[200 + i * 100] }}
                />
              ))}
              <div 
                className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-medium"
                style={{ backgroundColor: brand.scale[100], color: brand.scale[700] }}
              >
                +5
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: successScale[100] || '#dcfce7' }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: successScale[600] || '#16a34a' }} />
            </div>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Your team's performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">94%</span>
              <Badge variant="secondary" className="mb-1">+2.5%</Badge>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ width: '94%', backgroundColor: successScale[500] || '#22c55e' }}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: warningScale[100] || '#fef3c7' }}
            >
              <AlertCircle className="w-5 h-5" style={{ color: warningScale[600] || '#d97706' }} />
            </div>
            <CardTitle>Pending Tasks</CardTitle>
            <CardDescription>Items requiring your attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Review proposals', 'Update documentation', 'Team meeting'].map((task, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: warningScale[500] || '#f59e0b' }}
                  />
                  <span className="text-sm">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Various input styles and states.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter your email" className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Enter your name" className="pl-9" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: brand.scale[100] }}
              >
                <Bell className="w-5 h-5" style={{ color: brand.scale[600] }} />
              </div>
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts about important updates.</p>
              </div>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: brand.scale[100] }}
              >
                <Mail className="w-5 h-5" style={{ color: brand.scale[600] }} />
              </div>
              <div>
                <p className="font-medium">Email Digest</p>
                <p className="text-sm text-muted-foreground">Weekly summary of your activity.</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button style={{ backgroundColor: brand.scale[600] }}>Save Changes</Button>
        </CardFooter>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Status Indicators</h3>
        <div className="flex flex-wrap gap-2">
          <Badge style={{ backgroundColor: successScale[500] || '#22c55e' }}>Active</Badge>
          <Badge style={{ backgroundColor: warningScale[500] || '#f59e0b' }}>Pending</Badge>
          <Badge style={{ backgroundColor: errorScale[500] || '#ef4444' }}>Error</Badge>
          <Badge variant="outline" style={{ borderColor: brand.scale[500], color: brand.scale[700] }}>
            Outline
          </Badge>
          <Badge variant="secondary">Secondary</Badge>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: successScale[100] || '#dcfce7' }}
          >
            <CheckCircle2 className="w-4 h-4" style={{ color: successScale[600] || '#16a34a' }} />
            <span className="text-sm font-medium" style={{ color: successScale[800] || '#166534' }}>
              All systems operational
            </span>
          </div>
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: warningScale[100] || '#fef3c7' }}
          >
            <Info className="w-4 h-4" style={{ color: warningScale[600] || '#d97706' }} />
            <span className="text-sm font-medium" style={{ color: warningScale[800] || '#92400e' }}>
              Maintenance scheduled
            </span>
          </div>
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: errorScale[100] || '#fee2e2' }}
          >
            <AlertCircle className="w-4 h-4" style={{ color: errorScale[600] || '#dc2626' }} />
            <span className="text-sm font-medium" style={{ color: errorScale[800] || '#991b1b' }}>
              Connection error
            </span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>General statistics and metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users', value: '2,543', change: '+12%' },
                  { label: 'Revenue', value: '$45,231', change: '+8%' },
                  { label: 'Orders', value: '356', change: '+24%' },
                  { label: 'Conversion', value: '3.2%', change: '-2%' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analytics data.</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="h-48 rounded-lg flex items-end justify-between p-4 gap-2"
                style={{ backgroundColor: neutralScale[50] }}
              >
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all hover:opacity-80"
                    style={{ 
                      height: `${height}%`, 
                      backgroundColor: brand.scale[400 + (i % 3) * 100] 
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generated reports and exports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {['Monthly Summary', 'User Analytics', 'Revenue Report', 'Performance Metrics'].map((report, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <span>{report}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: User, label: 'Profile Settings', desc: 'Manage your profile information' },
                { icon: Bell, label: 'Notifications', desc: 'Choose what notifications you receive' },
                { icon: Settings, label: 'Preferences', desc: 'Customize your experience' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Configure</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
