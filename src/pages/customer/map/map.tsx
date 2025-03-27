import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Car,
    ChevronLeft,
    Clock,
    CreditCard,
    Locate,
    MapPin,
    Menu,
    Navigation,
    User,
    Plus,
    Minus,
    Layers,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-routing-machine"

export interface SearchResultTypes {
    display_name: string
    lat: string
    lon: string
    address: {
        road: string
        city: string
        state: string
        country: string
    }
}

// API endpoint for geocoding
const api = "https://nominatim.openstreetmap.org/search?"
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
}

/**
 * Custom user location marker component
 * Creates a blue circle with a pulsing effect to represent the user's current location
 */
function UserLocationMarker({ position }: { position: [number, number] }) {
    return (
        <>
            {/* Outer transparent circle */}
            <Circle
                center={position}
                radius={200}
                pathOptions={{
                    color: "#4285F4",
                    fillColor: "#4285F4",
                    fillOpacity: 0.3,
                    weight: 2,
                }}
                className="animate-pulse"
            />
            {/* Inner solid circle */}
            <Circle
                center={position}
                radius={15}
                pathOptions={{
                    color: "#4285F4",
                    fillColor: "#4285F4",
                    fillOpacity: 0.8,
                    weight: 3,
                }}
                className="animate-pulse"
            />
        </>
    )
}

/**
 * Map controls component
 * Adds custom controls to the map (zoom in/out, recenter, layers)
 */
function MapControls() {
    const map = useMap()

    // Function to handle user's current location
    const handleLocate = () => {
        map.locate({ setView: true, maxZoom: 13 })
    }

    // Function to zoom in
    const handleZoomIn = () => {
        map.zoomIn()
    }

    // Function to zoom out
    const handleZoomOut = () => {
        map.zoomOut()
    }

    return (
        <div className="absolute top-20 right-4 flex flex-col gap-2 z-[1000]">
            <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 shadow-md bg-white hover:bg-gray-100"
                onClick={handleZoomIn}
            >
                <Plus className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 shadow-md bg-white hover:bg-gray-100"
                onClick={handleZoomOut}
            >
                <Minus className="h-5 w-5 text-gray-700" />
            </Button>
            <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 shadow-md bg-white hover:bg-gray-100"
                onClick={handleLocate}
            >
                <Locate className="h-5 w-5 text-gray-700" />
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full h-10 w-10 shadow-md bg-white hover:bg-gray-100">
                <Layers className="h-5 w-5 text-gray-700" />
            </Button>
        </div>
    )
}

/**
 * Component to update map view when coordinates change
 * Automatically centers the map on the provided coordinates
 */
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap()

    useEffect(() => {
        if (center[0] !== 27.7103 && center[1] !== 85.3222) {
            console.log("Updating map view to:", center)
            map.setView(center, 13)
        }
    }, [center, map])

    return null
}

/**
 * Directions card component
 * Displays route information in a floating card
 */
function DirectionsCard({ routeInfo }: { routeInfo: any }) {
    if (!routeInfo) return null

    return (
        <Card className="absolute bottom-24 left-4 z-[1000] w-80 shadow-lg">
            <CardHeader className="py-3">
                <CardTitle className="text-base flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    Route Information
                </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Distance:</span>
                        <span className="text-sm">
                            {routeInfo.distance ? `${(routeInfo.distance / 1000).toFixed(1)} km` : "Calculating..."}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm">
                            {routeInfo.duration ? `${Math.round(routeInfo.duration / 60)} min` : "Calculating..."}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Custom routing control component
 * Handles the display of routes between waypoints
 */
function RoutingMachine({ waypoints, setRouteInfo }: { waypoints: L.LatLng[]; setRouteInfo: (info: any) => void }) {
    const map = useMap()
    const routingControlRef = useRef<L.Routing.Control | null>(null)

    useEffect(() => {
        if (waypoints.length >= 2) {
            // Remove previous routing control if it exists
            if (routingControlRef.current) {
                map.removeControl(routingControlRef.current)
            }
            // Create new routing control
            const routingControl = L.Routing.control({
                waypoints: waypoints,
                lineOptions: {
                    styles: [{ color: "#4285F4", weight: 5, opacity: 0.7 }],
                    extendToWaypoints: true,
                    missingRouteTolerance: 0,
                },
                show: false,
                addWaypoints: false,
                routeWhileDragging: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                createMarker: () => null, // Don't create default markers
                router: L.Routing.osrmv1({
                    serviceUrl: "https://router.project-osrm.org/route/v1",
                }),
            }).addTo(map)

            // Store reference to control
            routingControlRef.current = routingControl

            // Listen for route calculation events
            routingControl.on("routesfound", (e) => {
                const routes = e.routes
                if (routes && routes.length > 0) {
                    // Extract route information
                    const route = routes[0]
                    setRouteInfo({
                        distance: route.summary.totalDistance,
                        duration: route.summary.totalTime,
                        instructions: route.instructions,
                    })
                }
            })

            return () => {
                if (routingControlRef.current) {
                    map.removeControl(routingControlRef.current)
                }
            }
        }
    }, [map, waypoints, setRouteInfo])

    return null
}

export default function MapPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [step, setStep] = useState<"location" | "vehicle" | "payment" | "confirmation">("location")
    const [isRideRequested, setIsRideRequested] = useState(false)
    const [search, setSearch] = useState<string>("")
    const [value, setValue] = useState("")
    const [destinationSearch, setDestinationSearch] = useState<string>("")
    const [searchResults, setSearchResults] = useState<SearchResultTypes[]>([])
    const [destinationResults, setDestinationResults] = useState<SearchResultTypes[]>([])
    const [debouncedDestinationSearch, setDebouncedDestinationSearch] = useState("")
    const destinationDebounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const [routeInfo, setRouteInfo] = useState<any>(null)
    const [showDirectionsCard, setShowDirectionsCard] = useState(false)

    // Handle destination search debounce
    useEffect(() => {
        if (destinationDebounceTimeout.current) {
            clearTimeout(destinationDebounceTimeout.current)
        }

        destinationDebounceTimeout.current = setTimeout(() => {
            setDebouncedDestinationSearch(destinationSearch)
        }, 1000) // Reduced to 1 second for better UX

        return () => {
            if (destinationDebounceTimeout.current) {
                clearTimeout(destinationDebounceTimeout.current)
            }
        }
    }, [destinationSearch])

    // Fetch destination search results
    useEffect(() => {
        if (debouncedDestinationSearch.length > 3) {
            // Reduced to 3 characters for better UX
            const params = {
                q: debouncedDestinationSearch,
                format: "json",
                addressdetails: "1",
                polygon_geojson: "0",
            }
            const queryString = new URLSearchParams(params).toString()
            const requestOptions = {
                method: "GET",
                redirect: "follow" as RequestRedirect,
            }
            fetch(`${api}${queryString}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log("Destination results:", result)
                    setDestinationResults(result)
                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            setDestinationResults([])
        }
    }, [debouncedDestinationSearch])

    // Handle pickup search debounce
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000) // Reduced to 1 second for better UX

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current)
            }
        }
    }, [search])

    // Fetch pickup search results
    useEffect(() => {
        if (debouncedSearch.length > 3) {
            // Reduced to 3 characters for better UX
            const params = {
                q: debouncedSearch,
                format: "json",
                addressdetails: "1",
                polygon_geojson: "0",
            }
            const queryString = new URLSearchParams(params).toString()
            const requestOptions = {
                method: "GET",
                redirect: "follow" as RequestRedirect,
            }
            fetch(`${api}${queryString}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    setSearchResults(result)
                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            setSearchResults([])
        }
    }, [debouncedSearch])

    // Handle ride request
    const handleRequestRide = () => {
        setIsRideRequested(true)
    }

    // Location states
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [destLatitude, setDestLatitude] = useState<number | null>(null)
    const [destLongitude, setDestLongitude] = useState<number | null>(null)
    const [showRoute, setShowRoute] = useState(false)

    // Default marker position
    const markers = {
        geocode: [latitude ?? 27.7103, longitude ?? 85.3222] as [number, number],
    }

    // Create waypoints for routing
    const waypoints = useMemo(() => {
        if (latitude && longitude && destLatitude && destLongitude && showRoute) {
            setShowDirectionsCard(true)
            return [L.latLng(latitude, longitude), L.latLng(destLatitude, destLongitude)]
        }
        setShowDirectionsCard(false)
        return []
    }, [latitude, longitude, destLatitude, destLongitude, showRoute])

    // Watch user's position
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`)
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        console.error("User denied the request for Geolocation.")
                    } else {
                        console.error("Geolocation error:", error.message)
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                },
            )

            // Cleanup function to remove the watch
            return () => {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [])

    // Custom destination marker icon
    const destinationIcon = useMemo(() => {
        return L.divIcon({
            html: `<div class="flex items-center justify-center w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>`,
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        })
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/customer/dashboard" className="flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                </NavLink>
                <div className="font-bold text-lg">Request Ride</div>
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
                                to="/customer/dashboard"
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
                            >
                                <User className="h-5 w-5" />
                                <span>Dashboard</span>
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
                                <Clock className="h-5 w-5" />
                                <span>Ride History</span>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Map area */}
                <div className="flex-1 relative">
                    {/* Desktop header */}
                    <div className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-sm">
                        <NavLink to="/customer/dashboard" className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5" />
                            <span>Back to Dashboard</span>
                        </NavLink>
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <User className="h-4 w-4 text-blue-700" />
                            </div>
                        </div>
                    </div>

                    {/* Map container */}
                    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-65px)] relative">
                        <MapContainer
                            center={markers.geocode}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: "100%", width: "100%" }}
                            zoomControl={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MapUpdater center={markers.geocode} />

                            {/* User location marker */}
                            {latitude !== null && longitude !== null && <UserLocationMarker position={[latitude, longitude]} />}

                            {/* Destination marker */}
                            {destLatitude && destLongitude && (
                                <Marker position={[destLatitude, destLongitude]} icon={destinationIcon}>
                                    <Popup>Destination</Popup>
                                </Marker>
                            )}

                            {/* Routing */}
                            {waypoints.length >= 2 && <RoutingMachine waypoints={waypoints} setRouteInfo={setRouteInfo} />}

                            {/* Map controls */}
                            <MapControls />

                            {/* Directions card */}
                            {showDirectionsCard && routeInfo && <DirectionsCard routeInfo={routeInfo} />}
                        </MapContainer>
                    </div>

                    {/* Map action buttons */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full h-12 w-12 shadow-md bg-white hover:bg-gray-100"
                            onClick={() => {
                                if (latitude && longitude && destLatitude && destLongitude) {
                                    setShowRoute(true)
                                }
                            }}
                        >
                            <Navigation className="h-5 w-5 text-blue-700" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full h-12 w-12 shadow-md bg-white hover:bg-gray-100"
                            onClick={() => {
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition((position) => {
                                        setLatitude(position.coords.latitude)
                                        setLongitude(position.coords.longitude)
                                    })
                                }
                            }}
                        >
                            <MapPin className="h-5 w-5 text-blue-700" />
                        </Button>
                    </div>
                </div>

                {/* Ride request panel */}
                <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
                    {!isRideRequested ? (
                        <div className="p-4">
                            {step === "location" && (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold">Request a Ride</h2>
                                    <div className="space-y-2">
                                        <Label htmlFor="pickup">Pickup Location</Label>
                                        <div className="flex gap-2 relative">
                                            <Input
                                                id="pickup"
                                                placeholder="Current location"
                                                defaultValue={value}
                                                className="flex-1"
                                                onChange={(e) => {
                                                    setSearch(e.target.value)
                                                }}
                                            />
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => {
                                                    if (navigator.geolocation) {
                                                        navigator.geolocation.getCurrentPosition(
                                                            (position) => {
                                                                setLatitude(position.coords.latitude)
                                                                setLongitude(position.coords.longitude)
                                                                setSearch("Current Location")
                                                                setValue("Current Location")
                                                                console.log(
                                                                    "Set current location:",
                                                                    position.coords.latitude,
                                                                    position.coords.longitude,
                                                                )
                                                            },
                                                            (error) => {
                                                                console.error("Error getting current position:", error.message)
                                                            },
                                                            {
                                                                enableHighAccuracy: true,
                                                                timeout: 10000,
                                                                maximumAge: 0,
                                                            },
                                                        )

                                                    }

                                                }}
                                            >
                                                <Locate className="h-4 w-4" />
                                            </Button>
                                            {searchResults.length > 0 && (
                                                <div className="absolute z-10 top-full mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {searchResults.map((result, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                                                            onClick={() => {
                                                                setSearch(result.display_name)
                                                                setValue(result.display_name)
                                                                setLatitude(Number.parseFloat(result.lat))
                                                                setLongitude(Number.parseFloat(result.lon))
                                                                setSearchResults([])
                                                            }}
                                                        >
                                                            <p className="text-sm font-medium">{result.display_name}</p>
                                                            {result.address && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {[
                                                                        result.address.road,
                                                                        result.address.city,
                                                                        result.address.state,
                                                                        result.address.country,
                                                                    ]
                                                                        .filter(Boolean)
                                                                        .join(", ")}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="destination">Destination</Label>
                                        <div className="flex gap-2 relative">
                                            <Input
                                                id="destination"
                                                placeholder="Enter destination"
                                                defaultValue="456 Market St"
                                                className="flex-1"
                                                onChange={(e) => {
                                                    setDestinationSearch(e.target.value)
                                                }}
                                            />
                                            <Button variant="outline" size="icon">
                                                <MapPin className="h-4 w-4" />
                                            </Button>
                                            {destinationResults.length > 0 && (
                                                <div className="absolute z-10 top-full mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                                                    {destinationResults.map((result, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                                                            onClick={() => {
                                                                setDestinationSearch(result.display_name)
                                                                const destinationInput = document.getElementById("destination") as HTMLInputElement
                                                                if (destinationInput) {
                                                                    destinationInput.value = result.display_name
                                                                }
                                                                setDestLatitude(Number.parseFloat(result.lat))
                                                                setDestLongitude(Number.parseFloat(result.lon))
                                                                setDestinationResults([])
                                                                if (latitude && longitude) {
                                                                    setShowRoute(true)
                                                                }
                                                            }}
                                                        >
                                                            <p className="text-sm font-medium">{result.display_name}</p>
                                                            {result.address && (
                                                                <p className="text-xs text-muted-foreground">
                                                                    {[
                                                                        result.address.road,
                                                                        result.address.city,
                                                                        result.address.state,
                                                                        result.address.country,
                                                                    ]
                                                                        .filter(Boolean)
                                                                        .join(", ")}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Tabs defaultValue="now">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="now" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Now
                                            </TabsTrigger>
                                            <TabsTrigger value="schedule" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Schedule
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="now">
                                            <div className="pt-4">
                                                <Button
                                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                                    onClick={() => {
                                                        setShowRoute(true)
                                                        setStep("vehicle")
                                                    }}
                                                >
                                                    Continue
                                                </Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="schedule">
                                            <div className="pt-4 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="date">Date</Label>
                                                        <Input id="date" type="date" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="time">Time</Label>
                                                        <Input id="time" type="time" />
                                                    </div>
                                                </div>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep("vehicle")}>
                                                    Continue
                                                </Button>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <div className="pt-4">
                                        <h3 className="font-medium mb-2">Saved Locations</h3>
                                        <div className="space-y-2">
                                            {[
                                                { name: "Home", address: "123 Main St, Anytown" },
                                                { name: "Work", address: "456 Office Blvd, Business District" },
                                            ].map((location, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3 p-2 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                                >
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <MapPin className="h-4 w-4 text-blue-700" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{location.name}</p>
                                                        <p className="text-xs text-muted-foreground">{location.address}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === "vehicle" && (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={() => setStep("location")} className="mr-2">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <h2 className="text-xl font-bold">Choose Vehicle Type</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            {
                                                type: "Economy",
                                                price: "$12.50",
                                                time: "5 min away",
                                                description: "Affordable rides for everyday use",
                                            },
                                            {
                                                type: "Comfort",
                                                price: "$18.75",
                                                time: "3 min away",
                                                description: "More space and comfort for your journey",
                                            },
                                            {
                                                type: "Premium",
                                                price: "$25.00",
                                                time: "7 min away",
                                                description: "Luxury vehicles with top-rated drivers",
                                            },
                                        ].map((vehicle, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                                onClick={() => setStep("payment")}
                                            >
                                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <Car className="h-6 w-6 text-blue-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium">{vehicle.type}</p>
                                                        <p className="font-medium">{vehicle.price}</p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                                                        <p className="text-sm text-muted-foreground">{vehicle.time}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === "payment" && (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={() => setStep("vehicle")} className="mr-2">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <h2 className="text-xl font-bold">Payment Method</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { method: "Credit Card", number: "**** **** **** 4242", default: true },
                                            { method: "PayPal", number: "john.doe@example.com", default: false },
                                        ].map((payment, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                                onClick={() => setStep("confirmation")}
                                            >
                                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <CreditCard className="h-6 w-6 text-blue-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <p className="font-medium">{payment.method}</p>
                                                        {payment.default && (
                                                            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{payment.number}</p>
                                                </div>
                                            </div>
                                        ))}

                                        <Button variant="outline" className="w-full">
                                            Add Payment Method
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === "confirmation" && (
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <Button variant="ghost" size="icon" onClick={() => setStep("payment")} className="mr-2">
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                        <h2 className="text-xl font-bold">Confirm Ride</h2>
                                    </div>

                                    <Card>
                                        <CardContent className="pt-6 space-y-4">
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
                                                    <p className="text-sm text-muted-foreground">Vehicle</p>
                                                    <p className="font-medium">Comfort</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">Estimated Time</p>
                                                    <p className="font-medium">3 min away</p>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-between">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Payment</p>
                                                    <p className="font-medium">Credit Card (*4242)</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-muted-foreground">Estimated Price</p>
                                                    <p className="font-medium">$18.75</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex-col space-y-2">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleRequestRide}>
                                                Confirm Ride
                                            </Button>
                                            <Button variant="outline" className="w-full" onClick={() => setStep("location")}>
                                                Edit Request
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4 space-y-6">
                            <div className="text-center space-y-2">
                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                                    <Car className="h-8 w-8 text-blue-700" />
                                </div>
                                <h2 className="text-xl font-bold">Your ride is on the way!</h2>
                                <p className="text-muted-foreground">Driver will arrive in approximately 3 minutes</p>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Driver Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <User className="h-6 w-6 text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Michael Johnson</p>
                                            <div className="flex items-center">
                                                <p className="text-sm text-muted-foreground">4.9 ★</p>
                                                <span className="mx-1">•</span>
                                                <p className="text-sm text-muted-foreground">Toyota Camry</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">License Plate</p>
                                            <p className="font-medium">ABC 123</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Car Color</p>
                                            <p className="font-medium">Silver</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button variant="outline" className="flex-1">
                                        Call
                                    </Button>
                                    <Button variant="outline" className="flex-1 ml-2">
                                        Message
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Ride Details</CardTitle>
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
                                            <p className="text-sm text-muted-foreground">Estimated Price</p>
                                            <p className="font-medium">$18.75</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Payment Method</p>
                                            <p className="font-medium">Credit Card (*4242)</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="destructive" className="w-full">
                                        Cancel Ride
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

