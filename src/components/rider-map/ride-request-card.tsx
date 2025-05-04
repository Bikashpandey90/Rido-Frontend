"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Car, MapPin, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import mapsSvc from "@/pages/customer/map/maps.services"
import { useState, useEffect, useContext } from "react"
import { RideContext } from "@/context/ride.context"

interface RideRequestCardProps {
    request: {
        _id: string
        name: string
        passengerRating: number
        pickUpLocation: any
        dropOffLocation: any
        distance: number
        distanceTime: number
        duration: number
        fare: number
        RideStatus: "pending" | "accepted" | "ongoing" | "completed"
        userId: {
            name: string
            email: string
            image: string
            phone: string
        }
    }
    onAccept: (id: string) => void
    onDecline: (id: string) => void
    onNavigate: (id: string) => void
    onComplete: (id: string) => void
    onCancel: (id: string) => void
}
interface GeoPoint {
    type: "Point"
    coordinates: [number, number] // [longitude, latitude]
    name: string
}

interface VehicleDetails {
    vehicleType: string
    model: string
    plateNumber: string
}

interface UserDetails {
    _id: string
    name: string
    email: string
    status: string
    image: string
    phone: string
}

interface RideData {
    _id: string
    userId: UserDetails
    pickUpLocation: GeoPoint
    dropOffLocation: GeoPoint
    vehicleDetails: VehicleDetails
    fare: number
    distance: number
    distanceTime: number
    RideStatus: "accepted" | "pending" | "completed" | string
    paymentStatus: "unpaid" | "paid" | string
    isPaid: boolean
    vehicleType: string
    isScheduled: boolean
    status: "accepted" | "pending" | "completed" | string
    createdBy: string | null
    updatedBy: string | null
    createdAt: string // ISO date string
    updatedAt: string // ISO date string
    __v: number
    rider: UserDetails
}

export default function RideRequestCard({
    request,
    onAccept,
    onDecline,
    onNavigate,
    onComplete,
    onCancel,
}: RideRequestCardProps) {
    const { hasAcceptedRide, setHasAcceptedRide } = useContext(RideContext) as {
        hasAcceptedRide: boolean
        setHasAcceptedRide: (value: boolean) => void
    }

    const [accepting, setAccepting] = useState(false)
    const [ride, setRide] = useState<RideData>()
    const [cancelling, setCancelling] = useState(false)
    const [endButton, setEndButton] = useState(false)
    const [showCompletedView, setShowCompletedView] = useState(false)
    // First, let's add a state to track if a ride has been accepted
    // const [hasAcceptedRide, setHasAcceptedRide] = useState(false)
    const [navigating, setNavigating] = useState(false)
    // const [navigatted, setNavigatted] = useState(false)
    // const [acceptedRide, setAcceptedRide] = useState<RideData[]>([])

    useEffect(() => {
        if (request.RideStatus === "accepted" || ride) {
            setHasAcceptedRide(true)
            onAccept(request._id)
        }

        // Check if ride is already completed
        if (request.RideStatus === "completed" || (ride && ride.RideStatus === "completed")) {
            setShowCompletedView(true)
        }
    }, [])

    const acceptRide = async (rideId: string) => {
        setAccepting(true)
        try {
            const data = {
                rideId: rideId,
            }
            const response = await mapsSvc.acceptRide(data)
            console.log(response.detail)

            setRide(response.detail)

            setHasAcceptedRide(true)

            onAccept(rideId)
        } catch (exception) {
            console.log(exception)
        } finally {
            setAccepting(false)
        }
    }
    const beginRide = async (rideId: string) => {
        try {
            const response = await mapsSvc.updateRide({ rideId, status: "ongoing", RideStatus: "ongoing" })
            console.log(response.detail)
            if (response?.detail?.RideStatus === "ongoing") {
                setEndButton(true)
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    async function endRide(rideId: string) {
        try {
            const response = await mapsSvc.updateRide({ rideId, status: "completed", RideStatus: "completed" })
            console.log(response.detail)

            if (response?.detail?.RideStatus === "completed") {
                // Set ride status to completed in local state
                if (ride) {
                    setRide({ ...ride, RideStatus: "completed" })
                }
            }
        } catch (exception) {
            console.log(exception)
        }
    }

    // Replace the entire return statement with this updated version that separates the cards
    return (
        <>
            {/* Only show the ride request card if we don't have an accepted ride */}
            {!hasAcceptedRide && (
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
                                            : request.RideStatus === "ongoing"
                                                ? "default"
                                                : "success"
                                }
                            >
                                {request.RideStatus === "pending"
                                    ? "Pending"
                                    : request.RideStatus === "accepted"
                                        ? "Accepted"
                                        : request.RideStatus === "ongoing"
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
                                    <p className="text-sm text-muted-foreground">
                                        {request?.pickUpLocation?.name.split(" ").slice(0, 3).join(" ")}...{" "}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                    <MapPin className="h-3 w-3 text-red-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Dropoff</p>
                                    <p className="text-sm text-muted-foreground">
                                        {request?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}...{" "}
                                    </p>
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
                                <p className="font-medium">{request?.distanceTime ? request.distanceTime : 12} min</p>
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
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={accepting}
                                    onClick={() => {
                                        acceptRide(request._id)
                                    }}
                                >
                                    {accepting ? "Accepting" : "Accept"}
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => onDecline(request._id)}>
                                    Decline
                                </Button>
                            </>
                        )}

                        {request.RideStatus === "ongoing" && (
                            <>
                                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => onNavigate(request._id)}>
                                    {endButton ? "End Ride" : "Begin Ride"}
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
                </Card>
            )}

            {/* Show the accepted ride card if we have an accepted ride */}
            {hasAcceptedRide && ride && ride.RideStatus !== "completed" && (
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                            <Car className="h-8 w-8 text-blue-700" />
                        </div>
                        <h2 className="text-xl font-bold">You have accepted a ride!</h2>
                        <p className="text-muted-foreground">Navigate to pickup location to meet your passenger</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Passenger Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    {ride?.userId?.image ? (
                                        <img
                                            src={ride.userId.image || "/placeholder.svg"}
                                            className="h-11 w-11 rounded-full object-contain"
                                            alt="Passenger"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-blue-700" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{ride?.userId?.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-muted-foreground">4.9 ★</p>
                                        <span className="mx-1">•</span>
                                        <p className="text-sm text-muted-foreground">{/* {ride?.userId?.email} */}</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => {
                                    window.open(`tel:${ride?.userId?.phone || ""}`, "_blank")
                                }}
                            >
                                Call Passenger
                            </Button>
                            <Button variant="outline" className="flex-1 ml-2">
                                Message
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                    <MapPin className="h-3 w-3 text-blue-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Pickup</p>
                                    <p className="text-sm text-muted-foreground">{ride?.pickUpLocation?.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                    <MapPin className="h-3 w-3 text-red-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Dropoff</p>
                                    <p className="text-sm text-muted-foreground">{ride?.dropOffLocation?.name}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Distance</p>
                                    <p className="font-medium">{ride?.distance?.toFixed(1)} km</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="font-medium">{ride?.distanceTime?.toFixed(1)} min</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Fare</p>
                                    <p className="font-medium">NRs {ride?.fare?.toFixed(2)}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Vehicle</p>
                                    <p className="font-medium">{ride?.vehicleDetails?.model}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">License Plate</p>
                                    <p className="font-medium">{ride?.vehicleDetails?.plateNumber}</p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Payment Status</p>
                                    <p className="font-medium capitalize">{ride?.paymentStatus || "Paid"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Payment Method</p>
                                    <p className="font-medium">Cash</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            {!navigating && (
                                <Button
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 mr-2"
                                    onClick={() => {
                                        onNavigate(ride._id)

                                        setTimeout(() => {
                                            setNavigating(true)
                                        }, 1500)
                                    }}
                                >
                                    {navigating ? "Navigating..." : "Navigate to Pickup"}
                                </Button>
                            )}

                            {navigating && (
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700 mr-2"
                                    onClick={() => {
                                        // Logic for the next button action
                                        endButton ? endRide(ride._id) : beginRide(ride._id)
                                    }}
                                >
                                    {endButton ? "End Ride" : "Begin Ride"}
                                </Button>
                            )}

                            <Button
                                variant="destructive"
                                className="flex-1 "
                                disabled={cancelling}
                                onClick={() => onCancel(ride._id)}
                            >
                                {cancelling ? "Cancelling..." : "Cancel Ride"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
            {/* Show the completed ride view when a ride is completed */}
            {hasAcceptedRide && ride && ride.RideStatus === "completed" && (
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-green-700"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold">Ride Completed!</h2>
                        <p className="text-muted-foreground">The ride has been successfully completed</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    {ride?.userId?.image ? (
                                        <img
                                            src={ride.userId.image || "/placeholder.svg"}
                                            className="h-11 w-11 rounded-full object-contain"
                                            alt="Passenger"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-blue-700" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{ride?.userId?.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-muted-foreground">4.9 ★</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Distance</p>
                                    <p className="font-medium">{ride?.distance?.toFixed(1)} km</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="font-medium">{ride?.distanceTime?.toFixed(1)} min</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Fare</p>
                                    <p className="font-medium">NRs {ride?.fare?.toFixed(2)}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Payment Status</p>
                                    <p className="font-medium capitalize">{ride?.paymentStatus || "Unpaid"}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Payment Method</p>
                                    <p className="font-medium">Cash</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                    // Reset states to look for new rides
                                    setHasAcceptedRide(false)
                                    setNavigating(false)
                                    setEndButton(false)
                                    setShowCompletedView(false)
                                    setRide(undefined)
                                }}
                            >
                                Find New Rides
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    )
}
