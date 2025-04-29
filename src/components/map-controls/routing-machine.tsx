

import { useEffect, useRef } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"

interface RoutingMachineProps {
    waypoints: L.LatLng[]
    setRouteInfo: (info: any) => void
}

export default function RoutingMachine({ waypoints, setRouteInfo }: RoutingMachineProps) {
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
                
                // createMarker: () => null, // Don't create default markers
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
