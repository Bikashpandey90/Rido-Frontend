"use client"

import { useEffect, useRef, useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "leaflet-routing-machine"
import { Locate, Plus, Minus, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RiderMapViewProps {
    latitude: number | null
    longitude: number | null
    pickupLatitude: number | null
    pickupLongitude: number | null
    dropoffLatitude: number | null
    dropoffLongitude: number | null
    showRoute: boolean
    setRouteInfo: (info: any) => void
}

// Driver location marker component
function DriverLocationMarker({ position }: { position: [number, number] }) {
    return (
        <>
            {/* Outer transparent circle */}
            <Circle
                center={position}
                radius={200}
                pathOptions={{
                    color: "#22C55E",
                    fillColor: "#22C55E",
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
                    color: "#22C55E",
                    fillColor: "#22C55E",
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
            map.setView(center, 13)
        }
    }, [center, map])

    return null
}

// Custom routing control component
function RoutingMachine({
    waypoints,
    setRouteInfo,
}: {
    waypoints: L.LatLng[]
    setRouteInfo: (info: any) => void
}) {
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
                    styles: [{ color: "#22C55E", weight: 5, opacity: 0.7 }],
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

export default function RiderMapView({
    latitude,
    longitude,
    pickupLatitude,
    pickupLongitude,
    dropoffLatitude,
    dropoffLongitude,
    showRoute,
    setRouteInfo,
}: RiderMapViewProps) {
    // Default marker position
    const markers = {
        geocode: [latitude ?? 27.7103, longitude ?? 85.3222] as [number, number],
    }

    // Create waypoints for routing
    const waypoints = useMemo(() => {
        if (showRoute) {
            if (latitude && longitude && pickupLatitude && pickupLongitude) {
                // Route from driver to pickup
                return [L.latLng(latitude, longitude), L.latLng(pickupLatitude, pickupLongitude)]
            } else if (pickupLatitude && pickupLongitude && dropoffLatitude && dropoffLongitude) {
                // Route from pickup to dropoff
                return [L.latLng(pickupLatitude, pickupLongitude), L.latLng(dropoffLatitude, dropoffLongitude)]
            }
        }
        return []
    }, [latitude, longitude, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude, showRoute])

    // Custom marker icons
    const pickupIcon = useMemo(() => {
        return L.divIcon({
            html: `<div class="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>`,
            className: "",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
        })
    }, [])

    const dropoffIcon = useMemo(() => {
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

                {/* Driver location marker */}
                {latitude !== null && longitude !== null && <DriverLocationMarker position={[latitude, longitude]} />}

                {/* Pickup marker */}
                {pickupLatitude && pickupLongitude && (
                    <Marker position={[pickupLatitude, pickupLongitude]} icon={pickupIcon}>
                        <Popup>Pickup Location</Popup>
                    </Marker>
                )}

                {/* Dropoff marker */}
                {dropoffLatitude && dropoffLongitude && (
                    <Marker position={[dropoffLatitude, dropoffLongitude]} icon={dropoffIcon}>
                        <Popup>Dropoff Location</Popup>
                    </Marker>
                )}

                {/* Routing */}
                {waypoints.length >= 2 && <RoutingMachine waypoints={waypoints} setRouteInfo={setRouteInfo} />}

                {/* Map controls */}
                <MapControls />
            </MapContainer>
        </div>
    )
}
