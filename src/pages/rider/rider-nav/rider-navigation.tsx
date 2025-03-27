
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Car, ChevronLeft, Home, LogOut, Menu, MessageSquare, Navigation, Phone, Settings, User } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function RiderNavigationPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [rideStatus, setRideStatus] = useState<"pickup" | "inProgress" | "arriving">("pickup")

    const handleNextStep = () => {
        if (rideStatus === "pickup") {
            setRideStatus("inProgress")
        } else if (rideStatus === "inProgress") {
            setRideStatus("arriving")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/rider/dashboard" className="flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                </NavLink>
                <div className="font-bold text-lg">Navigation</div>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                    <div className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-background p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-8">
                            <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                                <Car className="h-5 w-5" />
                                <span>RideX</span>
                            </NavLink>
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <NavLink
                                to="/rider/dashboard"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                            >
                                <Home className="h-5 w-5" />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink
                                to="/rider/profile"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                            >
                                <User className="h-5 w-5" />
                                <span>Profile</span>
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
                </div>
            )}

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Map area */}
                <div className="flex-1 relative">
                    {/* Desktop header */}
                    <div className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-sm">
                        <NavLink to="/rider/dashboard" className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5" />
                            <span>Back to Dashboard</span>
                        </NavLink>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-700" />
                            </div>
                        </div>
                    </div>

                    {/* Map placeholder */}
                    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-65px)] bg-blue-50 dark:bg-blue-950 flex items-center justify-center relative">
                        <div className="absolute inset-0 grid place-items-center">
                            <div className="h-64 w-64 rounded-full border-4 border-blue-200 dark:border-blue-800 flex items-center justify-center">
                                <div className="h-32 w-32 rounded-full border-4 border-blue-300 dark:border-blue-700 flex items-center justify-center">
                                    <div className="h-16 w-16 rounded-full bg-blue-500 dark:bg-blue-600 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Car icon that moves based on ride status */}
                            <div
                                className={`absolute transition-all duration-700 ease-in-out ${rideStatus === "pickup"
                                    ? "top-[60%] left-[40%]"
                                    : rideStatus === "inProgress"
                                        ? "top-[45%] left-[50%]"
                                        : "top-[30%] left-[60%]"
                                    }`}
                            >
                                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <Car className="h-5 w-5 text-white" />
                                </div>
                            </div>

                            {/* Pickup and destination markers */}
                            <div className="absolute top-[60%] left-[40%]">
                                <div className="h-8 w-8 rounded-full border-2 border-green-500 bg-green-100 flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-green-500"></div>
                                </div>
                            </div>
                            <div className="absolute top-[30%] left-[60%]">
                                <div className="h-8 w-8 rounded-full border-2 border-red-500 bg-red-100 flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-red-500"></div>
                                </div>
                            </div>
                        </div>

                        {/* Map controls */}
                        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                            <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 shadow-md">
                                <Navigation className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Navigation panel */}
                <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
                    <div className="p-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    {rideStatus === "pickup"
                                        ? "Picking up passenger"
                                        : rideStatus === "inProgress"
                                            ? "In progress"
                                            : "Arriving at destination"}
                                </h2>
                                <p className="text-muted-foreground">
                                    {rideStatus === "pickup"
                                        ? "Drive to pickup location"
                                        : rideStatus === "inProgress"
                                            ? "Drive to destination"
                                            : "You have arrived"}
                                </p>
                            </div>
                            <Badge
                                className={`${rideStatus === "pickup"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : rideStatus === "inProgress"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                    }`}
                            >
                                {rideStatus === "pickup" ? "Pickup" : rideStatus === "inProgress" ? "In Progress" : "Arriving"}
                            </Badge>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Ride Details</CardTitle>
                                <CardDescription>Current ride information</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pickup</p>
                                        <p className="font-medium">123 Main St</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Destination</p>
                                        <p className="font-medium">456 Market St</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Distance</p>
                                        <p className="font-medium">3.2 miles</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Estimated Time</p>
                                        <p className="font-medium">12 min</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Fare</p>
                                        <p className="font-medium">$18.75</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Payment Method</p>
                                        <p className="font-medium">Credit Card</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Passenger Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="h-6 w-6 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium">Sarah Williams</p>
                                        <div className="flex items-center">
                                            <p className="text-sm text-muted-foreground">4.8 ★</p>
                                            <span className="mx-1">•</span>
                                            <p className="text-sm text-muted-foreground">15 rides</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" className="flex-1 gap-2">
                                    <Phone className="h-4 w-4" />
                                    Call
                                </Button>
                                <Button variant="outline" className="flex-1 ml-2 gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Message
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="space-y-4">
                            {rideStatus === "pickup" && (
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                                    Passenger Picked Up
                                </Button>
                            )}

                            {rideStatus === "inProgress" && (
                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                                    Arrived at Destination
                                </Button>
                            )}

                            {rideStatus === "arriving" && (
                                <>
                                    <Button className="w-full bg-green-600 hover:bg-green-700">Complete Ride</Button>
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Please ensure the passenger has exited the vehicle before completing the ride
                                        </p>
                                    </div>
                                </>
                            )}

                            <Button variant="outline" className="w-full">
                                Report Issue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

