"use client"
import { Button } from "@/components/ui/button"
import { Car, Bike } from "lucide-react"
import { cn } from "@/lib/utils"

interface VehicleSelectorProps {
    onSelect: (type: "car" | "bike") => void
    selectedType: "car" | "bike"
}

export default function VehicleSelector({ onSelect, selectedType }: VehicleSelectorProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect("car")}
                disabled={selectedType === 'bike'}

                className={cn(
                    "rounded-full px-4 flex items-center gap-2",
                    selectedType === "car" && "bg-indigo-100 text-indigo-700 border-indigo-200",
                )}
            >
                <Car className="h-4 w-4" />
                <span>Car</span>
            </Button>
            <Button

                variant="outline"
                size="sm"
                onClick={() => onSelect("bike")}
                className={cn(
                    "rounded-full px-4 flex items-center gap-2",
                    selectedType === "bike" && "bg-indigo-100 text-indigo-700 border-indigo-200",
                )}
                disabled={selectedType === 'car'}
            >
                <Bike className="h-4 w-4" />
                <span>Bike</span>
            </Button>
        </div>
    )
}
