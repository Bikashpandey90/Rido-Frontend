import { Badge } from "@/components/ui/badge"

import {
    CreditCard,
    Globe,
    Key,
    Lock,
    Moon,
    Save,
    Shield,
    Sun,
    User,
    BellRing,
    Mail,
    Smartphone,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {

    const { theme, setTheme } = useTheme()


    return (
        < div className="flex-1 overflow-auto p-4 md:p-6" >
            <Tabs defaultValue="account" className="w-full">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 flex-shrink-0 mb-6 md:mb-0">
                        <TabsList className="flex flex-row md:flex-col h-auto bg-transparent space-y-0 space-x-1 md:space-x-0 md:space-y-1 overflow-x-auto md:overflow-visible">
                            <TabsTrigger
                                value="account"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <User className="h-4 w-4 mr-2" />
                                Account
                            </TabsTrigger>
                            <TabsTrigger
                                value="appearance"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <Sun className="h-4 w-4 mr-2" />
                                Appearance
                            </TabsTrigger>
                            <TabsTrigger
                                value="notifications"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <BellRing className="h-4 w-4 mr-2" />
                                Notifications
                            </TabsTrigger>
                            <TabsTrigger
                                value="security"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <Shield className="h-4 w-4 mr-2" />
                                Security
                            </TabsTrigger>
                            <TabsTrigger
                                value="billing"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <CreditCard className="h-4 w-4 mr-2" />
                                Billing
                            </TabsTrigger>
                            <TabsTrigger
                                value="api"
                                className="justify-start w-full data-[state=active]:bg-muted/50 data-[state=active]:shadow-none"
                            >
                                <Key className="h-4 w-4 mr-2" />
                                API
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1">
                        <TabsContent value="account" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Account Settings</CardTitle>
                                    <CardDescription>Manage your account information and preferences</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Profile</h3>
                                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                                            <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                                                <AvatarImage src="/placeholder.svg?height=80&width=80" />
                                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    JD
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-2">
                                                <div className="space-y-1">
                                                    <Label htmlFor="name">Name</Label>
                                                    <Input id="name" defaultValue="John Doe" />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" defaultValue="john.doe@example.com" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="role">Role</Label>
                                                <Select defaultValue="admin">
                                                    <SelectTrigger id="role">
                                                        <SelectValue placeholder="Select role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Administrator</SelectItem>
                                                        <SelectItem value="manager">Manager</SelectItem>
                                                        <SelectItem value="support">Support</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="timezone">Timezone</Label>
                                                <Select defaultValue="pst">
                                                    <SelectTrigger id="timezone">
                                                        <SelectValue placeholder="Select timezone" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                                                        <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                                                        <SelectItem value="cst">Central Time (CST)</SelectItem>
                                                        <SelectItem value="est">Eastern Time (EST)</SelectItem>
                                                        <SelectItem value="utc">Universal Time (UTC)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Preferences</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label htmlFor="language">Language</Label>
                                                    <p className="text-sm text-muted-foreground">Select your preferred language</p>
                                                </div>
                                                <Select defaultValue="en">
                                                    <SelectTrigger id="language" className="w-[180px]">
                                                        <SelectValue placeholder="Select language" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="en">English</SelectItem>
                                                        <SelectItem value="es">Spanish</SelectItem>
                                                        <SelectItem value="fr">French</SelectItem>
                                                        <SelectItem value="de">German</SelectItem>
                                                        <SelectItem value="zh">Chinese</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="appearance" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Appearance</CardTitle>
                                    <CardDescription>Customize the look and feel of the application</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Theme</h3>
                                        <RadioGroup defaultValue={theme} onValueChange={(value) => setTheme(value)}>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="light" id="theme-light" />
                                                    <Label htmlFor="theme-light" className="flex items-center gap-2">
                                                        <Sun className="h-4 w-4" /> Light
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="dark" id="theme-dark" />
                                                    <Label htmlFor="theme-dark" className="flex items-center gap-2">
                                                        <Moon className="h-4 w-4" /> Dark
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="system" id="theme-system" />
                                                    <Label htmlFor="theme-system" className="flex items-center gap-2">
                                                        <Globe className="h-4 w-4" /> System
                                                    </Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Density</h3>
                                        <RadioGroup defaultValue="comfortable">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="compact" id="density-compact" />
                                                    <Label htmlFor="density-compact">Compact</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="comfortable" id="density-comfortable" />
                                                    <Label htmlFor="density-comfortable">Comfortable</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="spacious" id="density-spacious" />
                                                    <Label htmlFor="density-spacious">Spacious</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notifications</CardTitle>
                                    <CardDescription>Manage how you receive notifications</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Notification Channels</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="h-4 w-4" />
                                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                                </div>
                                                <Switch id="email-notifications" defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <BellRing className="h-4 w-4" />
                                                    <Label htmlFor="push-notifications">Push Notifications</Label>
                                                </div>
                                                <Switch id="push-notifications" defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    <Smartphone className="h-4 w-4" />
                                                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                                                </div>
                                                <Switch id="sms-notifications" />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Notification Types</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">New Ride Requests</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive notifications for new ride requests
                                                    </p>
                                                </div>
                                                <Switch id="ride-notifications" defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Driver Updates</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive notifications for driver status changes
                                                    </p>
                                                </div>
                                                <Switch id="driver-notifications" defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Payment Alerts</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive notifications for payment events
                                                    </p>
                                                </div>
                                                <Switch id="payment-notifications" defaultChecked />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">System Updates</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive notifications for system updates
                                                    </p>
                                                </div>
                                                <Switch id="system-notifications" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security</CardTitle>
                                    <CardDescription>Manage your security settings</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Password</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="current-password">Current Password</Label>
                                                <Input id="current-password" type="password" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="new-password">New Password</Label>
                                                <Input id="new-password" type="password" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                                <Input id="confirm-password" type="password" />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">Enable Two-Factor Authentication</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Add an extra layer of security to your account
                                                </p>
                                            </div>
                                            <Switch id="two-factor" />
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Sessions</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Current Session</p>
                                                    <p className="text-sm text-muted-foreground">Chrome on Windows • Active now</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    <Lock className="h-4 w-4 mr-2" />
                                                    Secure
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Mobile App</p>
                                                    <p className="text-sm text-muted-foreground">iPhone 13 • Last active 2 hours ago</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="text-red-600">
                                                    Revoke
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="billing" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Billing</CardTitle>
                                    <CardDescription>Manage your billing information and subscription</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Current Plan</h3>
                                        <div className="bg-muted/50 p-4 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Enterprise Plan</p>
                                                    <p className="text-sm text-muted-foreground">$499/month • Renews on June 1, 2025</p>
                                                </div>
                                                <Button variant="outline">Upgrade</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Payment Method</h3>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-10 w-16 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                                    VISA
                                                </div>
                                                <div>
                                                    <p className="font-medium">Visa ending in 4242</p>
                                                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Change
                                            </Button>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Billing History</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">May 1, 2025</p>
                                                    <p className="text-sm text-muted-foreground">Invoice #INV-001</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        Paid
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">April 1, 2025</p>
                                                    <p className="text-sm text-muted-foreground">Invoice #INV-002</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                        Paid
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="api" className="mt-0 border-0 p-0">
                            <Card>
                                <CardHeader>
                                    <CardTitle>API Settings</CardTitle>
                                    <CardDescription>Manage your API keys and access</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">API Keys</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Production API Key</p>
                                                    <p className="text-sm text-muted-foreground">Last used 2 hours ago</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Input value="sk_live_••••••••••••••••••••••••" className="w-64 bg-muted/50" readOnly />
                                                    <Button variant="outline" size="sm">
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Test API Key</p>
                                                    <p className="text-sm text-muted-foreground">Last used 5 days ago</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Input value="sk_test_••••••••••••••••••••••••" className="w-64 bg-muted/50" readOnly />
                                                    <Button variant="outline" size="sm">
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium">Webhooks</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">Endpoint URL</p>
                                                    <p className="text-sm text-muted-foreground">https://example.com/webhook</p>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Edit
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div >
    )
}
