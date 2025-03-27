"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Car, Clock, History, Home, LogOut, Menu, Settings, User, Navigation, Bell } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function RiderDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Mobile sidebar toggle */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <Car className="h-5 w-5" />
                    <span>RideX</span>
                </NavLink>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Sidebar */}
            <div
                className={`${isSidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 bg-blue-50 dark:bg-blue-950 p-4 md:h-screen md:sticky md:top-0`}
            >
                <div className="hidden md:flex items-center gap-2 font-bold text-lg text-primary mb-8">
                    <Car className="h-5 w-5" />
                    <span>RideX</span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Home className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        <span className="font-medium">Dashboard</span>
                    </div>
                    <NavLink
                        to="/rider/navigation"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <Navigation className="h-5 w-5" />
                        <span>Navigation</span>
                    </NavLink>
                    <NavLink
                        to="/rider/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <User className="h-5 w-5" />
                        <span>Profile</span>
                    </NavLink>
                    <NavLink
                        to="/rider/rides"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <History className="h-5 w-5" />
                        <span>Ride History</span>
                    </NavLink>
                    <NavLink
                        to="/rider/settings"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                    </NavLink>
                    <div className="mt-auto pt-4">
                        <Separator className="my-4" />
                        <NavLink
                            to="/"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 text-red-600 dark:text-red-400"
                        >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 md:p-8">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Welcome, Driver!</h1>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                                    3
                                </span>
                            </Button>
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-700" />
                            </div>
                        </div>
                    </div>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Driver Status</CardTitle>
                            <CardDescription>Set your availability to receive ride requests</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="availability">Availability</Label>
                                    <p className="text-sm text-muted-foreground">
                                        {isAvailable ? "You are currently available for rides" : "You are currently offline"}
                                    </p>
                                </div>
                                <Switch id="availability" checked={isAvailable} onCheckedChange={setIsAvailable} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">$245.50</CardTitle>
                                <CardDescription>Today's Earnings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>5 rides completed</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">$1,245.75</CardTitle>
                                <CardDescription>This Week</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>23 rides completed</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">4.8</CardTitle>
                                <CardDescription>Rating</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>Based on 156 ratings</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">32 hrs</CardTitle>
                                <CardDescription>Online Time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>This week</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle>Ride Requests</CardTitle>
                                    <CardDescription>Nearby ride requests</CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    Live
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                {isAvailable ? (
                                    <div className="space-y-4">
                                        {[
                                            { pickup: "Downtown Mall", dropoff: "Central Park", distance: "2.3 miles", estimate: "$12.50" },
                                            {
                                                pickup: "Office Tower",
                                                dropoff: "Residential Heights",
                                                distance: "4.1 miles",
                                                estimate: "$18.75",
                                            },
                                        ].map((request, index) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-medium">
                                                            {request.pickup} → {request.dropoff}
                                                        </h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {request.distance} • Est. {request.estimate}
                                                        </p>
                                                    </div>
                                                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">New</Badge>
                                                </div>
                                                <div className="flex gap-2 mt-3">
                                                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                                                        Accept
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="flex-1">
                                                        Decline
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <Car className="h-12 w-12 text-muted-foreground mb-2" />
                                        <h3 className="font-medium text-lg">You're offline</h3>
                                        <p className="text-sm text-muted-foreground mb-4">Go online to receive ride requests</p>
                                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAvailable(true)}>
                                            Go Online
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Rides</CardTitle>
                                <CardDescription>Your recent ride history</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {[
                                    { from: "Downtown", to: "Airport", time: "Today, 2:30 PM", amount: "$24.50" },
                                    { from: "Shopping Mall", to: "Residential Area", time: "Today, 12:15 PM", amount: "$18.75" },
                                    { from: "Office Park", to: "Restaurant District", time: "Today, 10:00 AM", amount: "$15.25" },
                                ].map((ride, index) => (
                                    <div key={index} className="flex items-center gap-4 py-3 border-b last:border-0">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-blue-700" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">
                                                {ride.from} to {ride.to}
                                            </p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {ride.time} • {ride.amount}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                            Details
                                        </Button>
                                    </div>
                                ))}
                                <div className="mt-4 text-center">
                                    <NavLink to="/rider/rides">
                                        <Button variant="outline">View All Rides</Button>
                                    </NavLink>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Performance</CardTitle>
                            <CardDescription>Your earnings and ride statistics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                                <p className="text-muted-foreground">Performance chart will appear here</p>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Total Rides</p>
                                    <p className="text-xl font-medium">23</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Acceptance Rate</p>
                                    <p className="text-xl font-medium">92%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Completion Rate</p>
                                    <p className="text-xl font-medium">98%</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                                    <p className="text-xl font-medium">4.8</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

