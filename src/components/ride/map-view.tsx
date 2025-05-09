
import { useEffect, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-routing-machine"
import { Locate, Navigation, Plus, Minus, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MapViewProps {
    latitude: number | null
    longitude: number | null
    destLatitude: number | null
    destLongitude: number | null
    showRoute: boolean
    setRouteInfo: (info: any) => void
    setShowDirectionsCard: (show: boolean) => void
    className?: string
}

// Custom user location marker component
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

// Map controls component
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

// Component to update map view when coordinates change
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

// Directions card component
function DirectionsCard({ routeInfo }: { routeInfo: any }) {
    if (!routeInfo) return null

    return (
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
    )
}

// Custom routing control component
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

export default function MapView({
    latitude,
    longitude,
    destLatitude,
    destLongitude,
    showRoute,
    setRouteInfo,
    setShowDirectionsCard,
    className
}: MapViewProps) {
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
    }, [latitude, longitude, destLatitude, destLongitude, showRoute, setShowDirectionsCard])

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
        <div className={`h-[calc(100vh-64px)] md:h-[calc(100vh-65px)] relative z-0 ${className}`} >
            <MapContainer
                center={markers.geocode}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7bc8f939ae3246b29e516ccf0e07c43d"
                    className="-z-0"
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
            </MapContainer>
        </div >
    )
}
