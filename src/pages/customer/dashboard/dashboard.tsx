
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AuthContext } from "@/context/auth.context"
import { Car, History, Home, LogOut, MapPin, Menu, Navigation, User } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import mapsSvc from "../map/maps.services"

export interface SavedLocation {
    _id: string
    title: string
    locationName: string
    location: {
        type: string
        coordinates: [number, number]
    },
    isDefault: boolean,
    status: string,
    userId: string



}

export default function CustomerDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const auth = useContext(AuthContext) as {
        loggedInUser: any
    }
    const navigate = useNavigate()

    const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([])

    const fetchSavedLocations = async () => {
        try {
            const result = await mapsSvc.fetchSavedLocations()
            setSavedLocations(result.detail)

        } catch (exception) {
            console.log("Error fetching saved locations:", exception)
        }

    }

    useEffect(() => {
        fetchSavedLocations()
    }, [])

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Mobile sidebar toggle */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
                    <Navigation className="h-5 w-5" />
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
                <div className="hidden md:flex items-center gap-2 font-bold text-lg text-primary mb-8  hover:cursor-pointer transition-transform hover:scale-105"
                    onClick={() => {
                        navigate("/")
                    }}>
                    <Navigation className="h-5 w-5" />
                    <span>RideX</span>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                        <Home className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        <span className="font-medium">Dashboard</span>
                    </div>
                    <NavLink
                        to="/customer/map"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <MapPin className="h-5 w-5" />
                        <span>Request Ride</span>
                    </NavLink>
                    <NavLink
                        to="/customer/profile"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >

                        <User className="h-5 w-5" />

                        <span>Profile</span>
                    </NavLink>
                    <NavLink
                        to="/customer/rides"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                    >
                        <History className="h-5 w-5" />
                        <span>Ride History</span>
                    </NavLink>
                    <div className="mt-auto pt-4">
                        <Separator className="my-4" />
                        <NavLink
                            to="/"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 text-red-600 dark:text-red-400"
                            onClick={() => {
                                localStorage.removeItem("token")
                                localStorage.removeItem('refToken')
                                auth.loggedInUser = null


                            }}
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
                        <h1 className="text-2xl font-bold">Welcome, {auth.loggedInUser?.name.split(' ')[0]}</h1>
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                {
                                    auth.loggedInUser?.image ? <img src={auth.loggedInUser.image} className="h-10 w-10 rounded-full" /> : <User className="h-5 w-5 text-blue-700" />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">5</CardTitle>
                                <CardDescription>Total Rides</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>This month</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-2xl">$124.75</CardTitle>
                                <CardDescription>Total Spent</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    <p>This month</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="md:col-span-2 lg:col-span-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <NavLink to="/customer/map">
                                        <Button className="bg-blue-600 hover:bg-blue-700">Request Ride</Button>
                                    </NavLink>
                                    <Button variant="outline">Schedule Ride</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Rides</CardTitle>
                            <CardDescription>Your recent ride history</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="flex items-center gap-4 py-3 border-b last:border-0">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Car className="h-5 w-5 text-blue-700" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">Downtown to Airport</p>
                                        <p className="text-sm text-muted-foreground">March {10 + index}, 2025 • $24.50</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                        Details
                                    </Button>
                                </div>
                            ))}
                            <div className="mt-4 text-center">
                                <NavLink to="/customer/rides">
                                    <Button variant="outline">View All Rides</Button>
                                </NavLink>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Saved Locations</CardTitle>
                            <CardDescription>Your frequently used locations</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {
                                    // [
                                    //     { name: "Home", address: "123 Main St, Anytown" },
                                    //     { name: "Work", address: "456 Office Blvd, Business District" },
                                    //     { name: "Gym", address: "789 Fitness Ave, Healthyville" },
                                    // ]
                                    savedLocations?.map((location, index) => (
                                        <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <MapPin className="h-5 w-5 text-blue-700" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{location.title}</p>
                                                <p className="text-sm text-muted-foreground truncate">{location.locationName}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

