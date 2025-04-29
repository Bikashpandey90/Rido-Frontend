"use client"

import { useMap } from "react-leaflet"
import { Layers, Locate, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MapControls() {
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
