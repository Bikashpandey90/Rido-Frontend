import { Circle } from "react-leaflet"

interface UserLocationMarkerProps {
    position: [number, number]
}

export default function UserLocationMarker({ position }: UserLocationMarkerProps) {
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
