

import { useEffect } from "react"
import { useMap } from "react-leaflet"

interface MapUpdaterProps {
    center: [number, number]
}

export default function MapUpdater({ center }: MapUpdaterProps) {
    const map = useMap()

    useEffect(() => {
        if (center[0] !== 27.7103 && center[1] !== 85.3222) {
            console.log("Updating map view to:", center)
            map.setView(center, 13)
        }
    }, [center, map])

    return null
}
