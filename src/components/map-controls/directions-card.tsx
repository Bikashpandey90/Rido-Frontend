import { Navigation } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DirectionsCardProps {
    routeInfo: any
}

export default function DirectionsCard({ routeInfo }: DirectionsCardProps) {
    if (!routeInfo) return null

    return (
        <Card className="absolute bottom-24 left-4 z-[1000] w-80 shadow-lg">
            <CardHeader className="py-3">
                <CardTitle className="text-base flex items-center">
                    <Navigation className="h-4 w-4 mr-2" />
                    Route Information
                </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Distance:</span>
                        <span className="text-sm">
                            {routeInfo.distance ? `${(routeInfo.distance / 1000).toFixed(1)} km` : "Calculating..."}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm">
                            {routeInfo.duration ? `${Math.round(routeInfo.duration / 60)} min` : "Calculating..."}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
