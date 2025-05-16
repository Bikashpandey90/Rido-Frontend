
import { useState } from "react"
import {
    Car,
    Layers,
    MapPin,
    Search,
    Users,
    Locate,
    Maximize2,
    Minimize2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
// import MapView from "@/components/map/map-view"


export default function MapsPage() {
    const [showDrivers, setShowDrivers] = useState(true)
    const [showPassengers, setShowPassengers] = useState(true)
    const [showHeatmap, setShowHeatmap] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)



    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    const activeDrivers = [
        {
            id: 1,
            name: "Alex Johnson",
            avatar: "AJ",
            vehicle: "Toyota Camry",
            status: "Available",
            location: "Downtown",
            lastUpdated: "2 min ago",
        },
        {
            id: 2,
            name: "Maria Garcia",
            avatar: "MG",
            vehicle: "Honda Civic",
            status: "On Trip",
            location: "Westside",
            lastUpdated: "1 min ago",
        },
        {
            id: 3,
            name: "Robert Chen",
            avatar: "RC",
            vehicle: "Tesla Model 3",
            status: "Available",
            location: "Northside",
            lastUpdated: "5 min ago",
        },
        {
            id: 4,
            name: "Priya Patel",
            avatar: "PP",
            vehicle: "Hyundai Sonata",
            status: "On Trip",
            location: "Eastside",
            lastUpdated: "3 min ago",
        },
    ]

    const activeRequests = [
        {
            id: "REQ-7829",
            passenger: "Emma Thompson",
            pickup: "Downtown Financial District",
            dropoff: "International Airport",
            status: "Searching",
            time: "Now",
        },
        {
            id: "REQ-7830",
            passenger: "Michael Davis",
            pickup: "Westside Mall",
            dropoff: "Riverside Apartments",
            status: "Matched",
            time: "1 min ago",
        },
        {
            id: "REQ-7831",
            passenger: "Sophia Martinez",
            pickup: "Central Park South",
            dropoff: "Harbor Heights Hotel",
            status: "Pickup Soon",
            time: "2 min ago",
        },
    ]

    return (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Map Controls */}
            <div className="w-full md:w-80 border-r flex flex-col h-full">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search locations..."
                            className="w-full pl-8 bg-muted/30 border-muted focus-visible:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* Map Filters */}
                <div className="p-4 border-b space-y-4">
                    <h3 className="font-medium mb-3">Map Layers</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Car className="h-4 w-4 text-indigo-600" />
                            <Label htmlFor="show-drivers">Show Drivers</Label>
                        </div>
                        <Switch id="show-drivers" checked={showDrivers} onCheckedChange={setShowDrivers} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <Label htmlFor="show-passengers">Show Passengers</Label>
                        </div>
                        <Switch id="show-passengers" checked={showPassengers} onCheckedChange={setShowPassengers} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Layers className="h-4 w-4 text-amber-600" />
                            <Label htmlFor="show-heatmap">Demand Heatmap</Label>
                        </div>
                        <Switch id="show-heatmap" checked={showHeatmap} onCheckedChange={setShowHeatmap} />
                    </div>
                </div>

                {/* Active Drivers */}
                <div className="flex-1 overflow-auto">
                    <Tabs defaultValue="drivers" className="w-full">
                        <div className="px-4 pt-4">
                            <TabsList className="grid grid-cols-2 w-full">
                                <TabsTrigger value="drivers">Active Drivers</TabsTrigger>
                                <TabsTrigger value="requests">Ride Requests</TabsTrigger>
                            </TabsList>
                        </div>
                        <div className="p-4">
                            <div className="space-y-4" id="drivers">
                                {activeDrivers.map((driver) => (
                                    <div key={driver.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/30">
                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                {driver.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <p className="font-medium text-sm">{driver.name}</p>
                                                <Badge
                                                    className={`${driver.status === "Available"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                        }`}
                                                >
                                                    {driver.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{driver.vehicle}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs">{driver.location}</span>
                                                </div>
                                                <span className="text-xs text-muted-foreground">{driver.lastUpdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4" id="requests">
                                {activeRequests.map((request) => (
                                    <div key={request.id} className="flex flex-col gap-2 p-3 rounded-lg border hover:bg-muted/30">
                                        <div className="flex items-center justify-between">
                                            <p className="font-medium text-sm">{request.passenger}</p>
                                            <Badge
                                                className={`${request.status === "Searching"
                                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                    : request.status === "Matched"
                                                        ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    }`}
                                            >
                                                {request.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-start gap-1">
                                                <div className="mt-0.5 h-2 w-2 rounded-full bg-indigo-600 flex-shrink-0" />
                                                <p className="text-xs">{request.pickup}</p>
                                            </div>
                                            <div className="flex items-start gap-1">
                                                <div className="mt-0.5 h-2 w-2 rounded-full bg-purple-600 flex-shrink-0" />
                                                <p className="text-xs">{request.dropoff}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-muted-foreground">{request.id}</span>
                                            <span className="text-xs text-muted-foreground">{request.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tabs>
                </div>
            </div>

            {/* Map View */}
            <div className="flex-1 relative h-[300px] md:h-full">
                {/* Map Placeholder - In a real app, you would integrate with a mapping library like Google Maps, Mapbox, etc. */}
                <div className="h-full w-full bg-[#f3f4f6] dark:bg-gray-800 flex items-center justify-center relative">
                    <div className="text-center">
                        <MapPin className="h-16 w-16 mx-auto text-indigo-600 mb-4" />
                        <h3 className="text-lg font-medium">Interactive Map</h3>
                        <p className="text-muted-foreground mt-1 max-w-md">
                            In a production environment, this would be an interactive map showing real-time driver and passenger
                            locations.
                        </p>
                        {/* <MapView
                            latitude={37.7749}
                            longitude={-122.4194}
                            destLatitude={37.7849}
                            destLongitude={-122.4094}
                            showRoute={false}
                            setShowDirectionsCard={() => { }}
                            setRouteInfo={() => { }}

                        /> */}


                    </div>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-white dark:bg-gray-900 shadow-md"
                            onClick={toggleFullscreen}
                        >
                            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-full bg-white dark:bg-gray-900 shadow-md"
                        >
                            <Locate className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 p-3 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                        <h4 className="text-sm font-medium mb-2">Legend</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-indigo-600" />
                                <span className="text-xs">Available Drivers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-purple-600" />
                                <span className="text-xs">On Trip</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-amber-600" />
                                <span className="text-xs">Waiting Passengers</span>
                            </div>
                            {showHeatmap && (
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-600" />
                                    <span className="text-xs">High Demand Areas</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
