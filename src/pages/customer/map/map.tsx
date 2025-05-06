import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Navigation } from "lucide-react"
import MapView from "@/components/ride/map-view"
import RideRequestPanel from "@/components/ride/ride-request-panel"

export default function MapPage() {
    const [routeInfo, setRouteInfo] = useState<any>(null)
    const [showDirectionsCard, setShowDirectionsCard] = useState(false)

    // Location states
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [destLatitude, setDestLatitude] = useState<number | null>(null)
    const [destLongitude, setDestLongitude] = useState<number | null>(null)
    const [showRoute, setShowRoute] = useState(false)

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
                        alert("User denied the request for Geolocation.")
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
        // if (!("geolocation" in navigator)) {
        //     return <p>Geolocation is not supported by your browser.</p>
        // }

    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/customer/dashboard" className="flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                </NavLink>

            </div>



            <div className="flex flex-1 flex-col md:flex-row">
                {/* Map area */}
                <div className="flex-1 relative">
                    {/* Desktop header */}
                    <div className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-sm">
                        <NavLink to="/customer/dashboard" className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5" />
                            <span>Back to Dashboard</span>
                        </NavLink>
                    </div>

                    {/* Map container */}
                    <MapView
                        latitude={latitude}
                        longitude={longitude}
                        destLatitude={destLatitude}
                        destLongitude={destLongitude}
                        showRoute={showRoute}
                        setRouteInfo={setRouteInfo}
                        setShowDirectionsCard={setShowDirectionsCard}
                    />

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
                    </div>

                    {/* Directions card */}
                    {showDirectionsCard && routeInfo && (
                        <div className="absolute bottom-24 left-4 z-[1000] w-80 bg-white rounded-lg shadow-lg p-4">
                            <div className="text-base font-medium flex items-center mb-2">
                                <Navigation className="h-4 w-4 mr-2" />
                                Route Information
                            </div>
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
                        </div>
                    )}
                </div>

                {/* Ride request panel */}
                <RideRequestPanel
                    latitude={latitude}
                    longitude={longitude}
                    destLatitude={destLatitude}
                    destLongitude={destLongitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    setDestLatitude={setDestLatitude}
                    setDestLongitude={setDestLongitude}
                    setShowRoute={setShowRoute}
                    routeInfo={routeInfo}
                />
            </div>
        </div>
    )
}
