
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import mapsSvc from "@/pages/customer/map/maps.services"

interface RideRequestCardProps {
    request: {
        _id: string
        name: string
        passengerRating: number
        pickUpLocation: any
        dropOffLocation: any
        distance: number
        duration: number
        fare: number
        RideStatus: "pending" | "accepted" | "in_progress" | "completed",
        userId: {
            name: string
            email: string

        }
    }
    onAccept: (id: string) => void
    onDecline: (id: string) => void
    onNavigate: (id: string) => void
    onComplete: (id: string) => void
    onCancel: (id: string) => void
}

export default function RideRequestCard({
    request,
    onAccept,
    onDecline,
    onNavigate,
    onComplete,
    onCancel,
}: RideRequestCardProps) {

    const acceptRide = async (rideId: string) => {
        try {
            const data = {
                rideId: rideId
            }
            const response = await mapsSvc.acceptRide(data)
            console.log(response.detail)
            onAccept(rideId)


        } catch (exception) {
            console.log(exception)
        }
    }


    return (
        <Card className="mb-4">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Ride Request</CardTitle>
                    <Badge
                        variant={
                            request.RideStatus === "pending"
                                ? "outline"
                                : request.RideStatus === "accepted"
                                    ? "secondary"
                                    : request.RideStatus === "in_progress"
                                        ? "default"
                                        : "success"
                        }
                    >
                        {request.RideStatus === "pending"
                            ? "Pending"
                            : request.RideStatus === "accepted"
                                ? "Accepted"
                                : request.RideStatus === "in_progress"
                                    ? "In Progress"
                                    : "Completed"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                        <p className="font-medium">{request?.userId?.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <span>4.4 ★</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <MapPin className="h-3 w-3 text-blue-700" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Pickup</p>
                            <p className="text-sm text-muted-foreground">{request?.pickUpLocation?.name.split(" ").slice(0, 3).join(" ")}... </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                            <MapPin className="h-3 w-3 text-red-700" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">Dropoff</p>
                            <p className="text-sm text-muted-foreground">{request?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}... </p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-medium">{request.distance.toFixed(1)} km</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="font-medium">{Math.round(request.duration / 60)} min</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Fare</p>
                        <p className="font-medium">NRs {request.fare.toFixed(2)}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
                {request.RideStatus === "pending" && (
                    <>
                        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => {
                            acceptRide(request._id)

                            // onAccept(request._id)

                        }

                        }>
                            Accept
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => onDecline(request._id)}>
                            Decline
                        </Button>
                    </>
                )}

                {request.RideStatus === "accepted" && (
                    <>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate(request._id)}>
                            Navigate to Pickup
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => onCancel(request._id)}>
                            Cancel
                        </Button>
                    </>
                )}

                {request.RideStatus === "in_progress" && (
                    <>
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate(request._id)}>
                            Navigate to Dropoff
                        </Button>
                        <Button
                            variant="success"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => onComplete(request._id)}
                        >
                            Complete Ride
                        </Button>
                    </>
                )}

                {request.RideStatus === "completed" && (
                    <Button className="w-full" variant="outline">
                        View Details
                    </Button>
                )}
            </CardFooter>
        </Card >
    )
}
