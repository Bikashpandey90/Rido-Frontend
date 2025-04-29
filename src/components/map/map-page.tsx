
import { useState } from "react"
import MobileHeader from "./mobile-header"
import MobileSidebar from "./mobile-sidebar"
import DesktopHeader from "./desktop-header"
import MapView from "./map-view"
import RideRequestPanel from "./ride-request-panel"
import RideConfirmedPanel from "./ride-confirmer-panel"
// import MapView from "@/components/map/map-view"
// import MobileHeader from "@/components/map/mobile-header"
// import MobileSidebar from "@/components/map/mobile-sidebar"
// import DesktopHeader from "@/components/map/desktop-header"
// import RideRequestPanel from "@/components/map/ride-request-panel"
// import RideConfirmedPanel from "@/components/map/ride-confirmed-panel"

export default function MapPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isRideRequested, setIsRideRequested] = useState(false)
    const [step, setStep] = useState<"location" | "vehicle" | "payment" | "confirmation">("location")

    // Location states
    const [latitude, setLatitude] = useState<number | null>(null)
    const [longitude, setLongitude] = useState<number | null>(null)
    const [destLatitude, setDestLatitude] = useState<number | null>(null)
    const [destLongitude, setDestLongitude] = useState<number | null>(null)
    const [showRoute, setShowRoute] = useState(false)
    const [routeInfo, setRouteInfo] = useState<any>(null)
    const [showDirectionsCard, setShowDirectionsCard] = useState(false)

    // Handle ride request
    const handleRequestRide = () => {
        setIsRideRequested(true)
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Mobile header */}
            <MobileHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Mobile sidebar */}
            {isSidebarOpen && <MobileSidebar setIsSidebarOpen={setIsSidebarOpen} />}

            <div className="flex flex-1 flex-col md:flex-row">
                {/* Map area */}
                <div className="flex-1 relative">
                    {/* Desktop header */}
                    <DesktopHeader />

                    {/* Map container */}
                    <MapView
                        latitude={latitude}
                        longitude={longitude}
                        destLatitude={destLatitude}
                        destLongitude={destLongitude}
                        showRoute={showRoute}
                        setRouteInfo={setRouteInfo}
                        showDirectionsCard={showDirectionsCard}
                        routeInfo={routeInfo}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                    />
                </div>

                {/* Ride request panel */}
                <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
                    {!isRideRequested ? (
                        <RideRequestPanel
                            step={step}
                            setStep={setStep}
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                            destLatitude={destLatitude}
                            destLongitude={destLongitude}
                            setDestLatitude={setDestLatitude}
                            setDestLongitude={setDestLongitude}
                            setShowRoute={setShowRoute}
                            handleRequestRide={handleRequestRide}
                        />
                    ) : (
                        <RideConfirmedPanel />
                    )}
                </div>
            </div>
        </div>
    )
}
