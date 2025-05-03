
import { useState, useEffect, useContext } from "react"
import { NavLink } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Menu, Navigation } from "lucide-react"
import RiderMapView from "@/components/rider-map/rider-map-view"
import RiderStatusPanel from "@/components/rider-map/rider-status-panel"
import riderMapService from "./rider-map-service"
import { RideContext } from "@/context/ride.context"

export default function RiderPage() {

    const { hasAcceptedRide } = useContext(RideContext) as { hasAcceptedRide: boolean }
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isOnline, setIsOnline] = useState(false)
    const [routeInfo, setRouteInfo] = useState<any>(null)
    const [showRoute, setShowRoute] = useState(false)

    // Location states
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [pickupLatitude, setPickupLatitude] = useState<number | null>(null)
    const [pickupLongitude, setPickupLongitude] = useState<number | null>(null)
    const [dropoffLatitude, setDropoffLatitude] = useState<number | null>(null)
    const [dropoffLongitude, setDropoffLongitude] = useState<number | null>(null)

    // // Mock data for rider stats
    // const riderStats = {
    //     totalRides: 248,
    //     acceptanceRate: 92,
    //     averageRating: 4.8,
    //     totalEarnings: 3842.75,
    // }

    // Mock data for earnings
    const earnings = {
        today: 85.5,
        week: 425.75,
        month: 1842.25,
    }

    // Mock data for current ride
    const [currentRide, setCurrentRide] = useState<any>(null)

    // Mock data for pending requests
    const [pendingRequests, setPendingRequests] = useState<any[]>([])
    const fetchRideRequests = async () => {
        try {
            const payload = {
                location: {
                    latitude: latitude,
                    longitude: longitude,
                },
            };

            if (latitude === null || longitude === null) {
                console.error("Latitude or Longitude is null");
                return;
            }

            const response = await riderMapService.fetchRecentRides(payload);
            console.log(response);
            setPendingRequests(response.detail);
        } catch (exception) {
            console.error(exception);
        }
    };

    useEffect(() => {
        console.log("From useEffect", latitude, longitude);
        if (latitude !== null && longitude !== null) {
            if (hasAcceptedRide) {
                console.log("Ride accepted, stopping fetch requests.");
                return; // Exit early if a ride is accepted
            }

            fetchRideRequests();
            const interval = setInterval(() => {
                fetchRideRequests();
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [latitude, longitude, hasAcceptedRide]);

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

    // Simulate incoming ride requests when going online
    useEffect(() => {
        if (isOnline && pendingRequests.length === 0 && !currentRide) {
            const timer = setTimeout(() => {
                // Generate a mock ride request
                setPendingRequests([
                    {
                        id: "req-" + Math.random().toString(36).substring(2, 9),
                        passengerName: "John Smith",
                        passengerRating: 4.7,
                        pickupAddress: "123 Main St, Downtown",
                        dropoffAddress: "456 Market St, Uptown",
                        distance: 5.2,
                        duration: 720, // 12 minutes in seconds
                        fare: 15.75,
                        status: "pending",
                    },
                ])

                // Set mock coordinates for the request
                if (latitude && longitude) {
                    // Generate nearby coordinates for pickup (within ~1km)
                    const latOffset = (Math.random() - 0.5) * 0.01
                    const lonOffset = (Math.random() - 0.5) * 0.01
                    setPickupLatitude(latitude + latOffset)
                    setPickupLongitude(longitude + lonOffset)

                    // Generate coordinates for dropoff (within ~3km from pickup)
                    const dropLatOffset = (Math.random() - 0.5) * 0.03
                    const dropLonOffset = (Math.random() - 0.5) * 0.03
                    setDropoffLatitude(latitude + latOffset + dropLatOffset)
                    setDropoffLongitude(longitude + lonOffset + dropLonOffset)
                }
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [isOnline, pendingRequests, currentRide, latitude, longitude])

    // Handle accepting a ride
    const handleAcceptRide = (id: string) => {
        const request = pendingRequests.find((req) => req.id === id)
        if (request) {
            // Update the request status
            const updatedRequest = { ...request, status: "accepted" }
            setCurrentRide(updatedRequest)
            setPendingRequests([])
            setShowRoute(true)
        }
    }

    // Handle declining a ride
    const handleDeclineRide = (id: string) => {
        setPendingRequests(pendingRequests.filter((req) => req.id !== id))
    }

    // Handle navigating to pickup
    const handleNavigateToPickup = (id: string) => {
        if (currentRide && currentRide.id === id) {
            // Show route to pickup
            setShowRoute(true)

            // Simulate arriving at pickup after 10 seconds
            setTimeout(() => {
                setCurrentRide({ ...currentRide, status: "in_progress" })
            }, 10000)
        }
    }

    // Handle navigating to dropoff
    const handleNavigateToDropoff = (id: string) => {
        if (currentRide && currentRide.id === id) {
            // Show route to dropoff
            setShowRoute(true)
        }
    }

    // Handle completing a ride
    const handleCompleteRide = (id: string) => {
        if (currentRide && currentRide.id === id) {
            // Update the ride status
            setCurrentRide({ ...currentRide, status: "completed" })

            // Clear the ride after 5 seconds
            setTimeout(() => {
                setCurrentRide(null)
                setShowRoute(false)
            }, 5000)
        }
    }

    // Handle canceling a ride
    const handleCancelRide = (id: string) => {
        if (currentRide && currentRide.id === id) {
            setCurrentRide(null)
            setShowRoute(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b">
                <NavLink to="/driver/dashboard" className="flex items-center gap-2">
                    <ChevronLeft className="h-5 w-5" />
                    <span>Back</span>
                </NavLink>
                <div className="font-bold text-lg">Driver Dashboard</div>
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                    <div className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-background p-6 shadow-lg">
                        {/* Sidebar content */}
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        {/* Navigation links would go here */}
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Map area */}
                <div className="flex-1 relative">
                    {/* Desktop header */}
                    <div className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-sm">
                        <NavLink to="/driver/dashboard" className="flex items-center gap-2">
                            <ChevronLeft className="h-5 w-5" />
                            <span>Back to Dashboard</span>
                        </NavLink>
                        {/* <RiderStats stats={riderStats} /> */}
                    </div>

                    {/* Map container */}
                    <RiderMapView
                        latitude={latitude}
                        longitude={longitude}
                        pickupLatitude={pickupLatitude}
                        pickupLongitude={pickupLongitude}
                        dropoffLatitude={dropoffLatitude}
                        dropoffLongitude={dropoffLongitude}
                        showRoute={showRoute}
                        setRouteInfo={setRouteInfo}
                    />

                    {/* Map action buttons */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full h-12 w-12 shadow-md bg-white hover:bg-gray-100"
                            onClick={() => {
                                if (
                                    (latitude && longitude && pickupLatitude && pickupLongitude) ||
                                    (pickupLatitude && pickupLongitude && dropoffLatitude && dropoffLongitude)
                                ) {
                                    setShowRoute(true)
                                }
                            }}
                        >
                            <Navigation className="h-5 w-5 text-green-700" />
                        </Button>
                    </div>
                </div>

                {/* Rider status panel */}
                <RiderStatusPanel
                    isOnline={isOnline}
                    setIsOnline={setIsOnline}
                    currentRide={currentRide}
                    pendingRequests={pendingRequests}
                    onAcceptRide={handleAcceptRide}
                    onDeclineRide={handleDeclineRide}
                    onNavigateToPickup={handleNavigateToPickup}
                    onNavigateToDropoff={handleNavigateToDropoff}
                    onCompleteRide={handleCompleteRide}
                    onCancelRide={handleCancelRide}
                    earnings={earnings}
                />
            </div>
        </div>
    )
}
