
import { useEffect, useMemo } from "react"
import { MapContainer, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-routing-machine"
import { MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import MapUpdater from "@/components/map-controls/map-updater"
import UserLocationMarker from "@/components/map-controls/user-location-marker"
// import MapControls from "@/components/map-controls/map-controls"
import RoutingMachine from "@/components/map-controls/routing-machine"
import DirectionsCard from "@/components/map-controls/directions-card"
import MapControls from "../map-controls/maps-control"

interface MapViewProps {
    latitude: number | null
    longitude: number | null
    destLatitude: number | null
    destLongitude: number | null
    showRoute: boolean
    setRouteInfo: (info: any) => void
    showDirectionsCard: boolean
    routeInfo: any
    setLatitude: (lat: number) => void
    setLongitude: (lng: number) => void
}

export default function MapView({
    latitude,
    longitude,
    destLatitude,
    destLongitude,
    showRoute,
    setRouteInfo,
    showDirectionsCard,
    routeInfo,
    setLatitude,
    setLongitude,
}: MapViewProps) {
    // Default marker position
    const markers = {
        geocode: [latitude ?? 27.7103, longitude ?? 85.3222] as [number, number],
    }

    // Create waypoints for routing
    const waypoints = useMemo(() => {
        if (latitude && longitude && destLatitude && destLongitude && showRoute) {
            return [L.latLng(latitude, longitude), L.latLng(destLatitude, destLongitude)]
        }
        return []
    }, [latitude, longitude, destLatitude, destLongitude, showRoute])

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
    }, [setLatitude, setLongitude])

    return (
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
                    url="https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=7bc8f939ae3246b29e516ccf0e07c43d"
                />
                <MapUpdater center={markers.geocode} />

                {/* User location marker */}
                {latitude !== null && longitude !== null && <UserLocationMarker position={[latitude, longitude]} />}

                {/* Destination marker */}
                {destLatitude && destLongitude && (
                    <L.Marker position={[destLatitude, destLongitude]} icon={destinationIcon}>
                        <L.Popup>Destination</L.Popup>
                    </L.Marker>
                )}

                {/* Routing */}
                {waypoints.length >= 2 && <RoutingMachine waypoints={waypoints} setRouteInfo={setRouteInfo} />}

                {/* Map controls */}
                <MapControls />

                {/* Directions card */}
                {showDirectionsCard && routeInfo && <DirectionsCard routeInfo={routeInfo} />}
            </MapContainer>

            {/* Map action buttons */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full h-12 w-12 shadow-md bg-white hover:bg-gray-100"
                    onClick={() => {
                        if (latitude && longitude && destLatitude && destLongitude) {
                            // Show route
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
    )
}
