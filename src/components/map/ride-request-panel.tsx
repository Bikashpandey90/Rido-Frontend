
import LocationStep from "@/components/request-steps/location-step"
import VehicleStep from "@/components/request-steps/vehicle-step"
import PaymentStep from "@/components/request-steps/payment-step"
import ConfirmationStep from "@/components/request-steps/confirmation-step"

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

interface RideRequestPanelProps {
    step: "location" | "vehicle" | "payment" | "confirmation"
    setStep: (step: "location" | "vehicle" | "payment" | "confirmation") => void
    latitude: number | null
    longitude: number | null
    setLatitude: (lat: number) => void
    setLongitude: (lng: number) => void
    destLatitude: number | null
    destLongitude: number | null
    setDestLatitude: (lat: number) => void
    setDestLongitude: (lng: number) => void
    setShowRoute: (show: boolean) => void
    handleRequestRide: () => void
}

export default function RideRequestPanel({
    step,
    setStep,
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    destLatitude,
    destLongitude,
    setDestLatitude,
    setDestLongitude,
    setShowRoute,
    handleRequestRide,
}: RideRequestPanelProps) {
    return (
        <div className="p-4">
            {step === "location" && (
                <LocationStep
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                    destLatitude={destLatitude}
                    destLongitude={destLongitude}
                    setDestLatitude={setDestLatitude}
                    setDestLongitude={setDestLongitude}
                    setShowRoute={setShowRoute}
                    setStep={setStep}
                />
            )}

            {step === "vehicle" && <VehicleStep setStep={setStep} />}

            {step === "payment" && <PaymentStep setStep={setStep} />}

            {step === "confirmation" && <ConfirmationStep setStep={setStep} handleRequestRide={handleRequestRide} />}
        </div>
    )
}
