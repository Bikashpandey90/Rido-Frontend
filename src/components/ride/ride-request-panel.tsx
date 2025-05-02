"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Car, ChevronLeft, CreditCard, MapPin, User } from "lucide-react"
import LocationSearch from "./location-search"
import mapsSvc from "@/pages/customer/map/maps.services"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

interface RideRequestPanelProps {
    latitude: number | null
    longitude: number | null
    destLatitude: number | null
    destLongitude: number | null
    setLatitude: (lat: number | null) => void
    setLongitude: (lon: number | null) => void
    setDestLatitude: (lat: number | null) => void
    setDestLongitude: (lon: number | null) => void
    setShowRoute: (show: boolean) => void
    routeInfo: any
}

export default function RideRequestPanel({
    latitude,
    longitude,
    destLatitude,
    destLongitude,
    setLatitude,
    setLongitude,
    setDestLatitude,
    setDestLongitude,
    setShowRoute,
    routeInfo,
}: RideRequestPanelProps) {
    const [isRideRequested, setIsRideRequested] = useState(false)
    const [step, setStep] = useState<"location" | "vehicle" | "payment" | "confirmation">("location")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isWaitingForDriver, setIsWaitingForDriver] = useState(false)
    const [ride, setRide] = useState<any>(null)
    const [pickupLocationName, setPickupLocationName] = useState<string>("")
    const [dropoffLocationName, setDropoffLocationName] = useState<string>("")
    const [cancelling, setCancelling] = useState(false)

    const rideRequestDTO = Yup.object({
        // pickUpLocation: Yup.object({
        //     type: Yup.string().default("Point"),
        //     coordinates: Yup.array().of(Yup.number()).length(2).required("Pickup coordinates are required"),
        // }).required("Pickup location is required"),
        // dropOffLocation: Yup.object({
        //     type: Yup.string().default("Point"),
        //     coordinates: Yup.array().of(Yup.number()).length(2).required("Dropoff coordinates are required"),
        // }).required("Dropoff location is required"),
        // vehicleType: Yup.string().default("bike").required("Vehicle type is required"),
    })

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(rideRequestDTO),
    })
    const handleRequestRide = () => {
        setIsWaitingForDriver(false)
        setIsRideRequested(true)
    }

    const handlePickupSelect = (lat: number, lon: number, name?: string) => {
        setLatitude(lat)
        setLongitude(lon)
        if (name) {
            setPickupLocationName(name)
        }
    }

    const handleDestinationSelect = (lat: number, lon: number, name?: string) => {
        setDestLatitude(lat)
        setDestLongitude(lon)
        if (name) {
            setDropoffLocationName(name)
        }
        if (latitude && longitude) {
            setShowRoute(true)
        }
    }

    const submitForm = async (data: any) => {
        setIsSubmitting(true)

        if (!latitude || !longitude || !destLatitude || !destLongitude) {
            alert("Please select both pickup and destination locations")
            setIsSubmitting(false)
            return
        }

        try {
            // Format data to match the backend DTO structure
            const formattedData = {
                pickUpLocation: {
                    type: "Point",
                    coordinates: [longitude || 0, latitude || 0],
                    name: pickupLocationName || "Current Location",
                },
                dropOffLocation: {
                    type: "Point",
                    coordinates: [destLongitude || 0, destLatitude || 0],
                    name: dropoffLocationName || "Destination",
                },
                vehicleType: data.vehicleType || "bike",
            }

            console.log("Submitting ride request with data:", formattedData)
            const response = await mapsSvc.createRideRequest(formattedData)
            console.log("Ride request submitted successfully:", response)
            setRide(response.detail)
            console.log("Ride Details : ", ride)
            setIsWaitingForDriver(true)
            // Don't set isRideRequested to true here
        } catch (exception: any) {
            console.error("Error submitting ride request:", exception)
            // Check if the exception has a response with data
            if (exception.response && exception.response.data) {
                const errorMessage = exception.response.data.message || JSON.stringify(exception.response.data)
                alert(`Request failed: ${errorMessage}`)
            } else if (exception.message) {
                alert(`Request failed: ${exception.message}`)
            } else {
                alert("An unknown error occurred while submitting your ride request")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const loadRideDetail = async () => {
        try {
            if (!ride) {
                console.error("Ride object is null or undefined")
                return
            }
            console.log(ride?._id)
            const rideDetail = await mapsSvc.getRideDetail(ride?._id)
            setRide(rideDetail.detail)
        } catch (exception) {
            console.error("Error loading ride details:", exception)
        }
    }
    useEffect(() => {
        if (ride) {
            const interval = setInterval(() => {
                loadRideDetail()
            }, 15000) // Call every 15 seconds

            const timeout = setTimeout(() => {
                clearInterval(interval) // Stop after 5 minutes
            }, 300000) // 5 minutes in milliseconds

            return () => {
                clearInterval(interval)
                clearTimeout(timeout)
            }
        }
    }, [ride])

    const cancelRide = async (rideId: string) => {
        setCancelling(true)
        try {

            const response = await mapsSvc.cancelRideRequest(rideId)
            console.log("Ride cancelled successfully:", response)

            if (response?.status === 'RIDE_CANCELLED') {
                setIsRideRequested(false)
                setIsWaitingForDriver(false)
                setRide(null)
            }


        } catch (exception) {
            console.error("Error cancelling ride:", exception)
        }
        finally {
            setCancelling(false)
        }
    }

    return (
        <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
            {isWaitingForDriver ? (
                <div className="p-4 space-y-6">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                            <Car className="h-8 w-8 text-blue-700" />
                        </div>
                        <h2 className="text-xl font-bold">Finding you a driver...</h2>
                        <div className="flex justify-center">
                            <div className="animate-pulse flex space-x-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                        <p className="text-muted-foreground">Please wait while we connect you with a driver</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Request Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pickup</p>
                                    <p className="font-medium">
                                        {ride?.pickUpLocation?.name?.split(" ").slice(0, 3).join(" ")}...
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Destination</p>
                                    <p className="font-medium">{ride?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Estimated Price</p>
                                    <p className="font-medium">Nrs {ride?.fare}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="destructive" className="w-full" onClick={() => setIsWaitingForDriver(false)}>
                                Cancel Request
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Simulate driver found after 5 seconds */}
                    <div className="hidden">
                        {/* {setTimeout(() => {
                            handleRequestRide()
                        }, 5000)} */}
                        {ride?.RideStatus === "accepted" &&
                            (() => {
                                handleRequestRide()
                                return null
                            })()}
                    </div>
                </div>
            ) : !isRideRequested ? (
                <div className="p-4">
                    {step === "location" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold">Request a Ride</h2>

                            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                                <LocationSearch
                                    name="pickupLocation"
                                    control={control}
                                    id="pickup"
                                    label="Pickup Location"
                                    placeholder="Current location"
                                    onLocationSelect={handlePickupSelect}
                                    useCurrentLocation={true}
                                    errMsg={errors?.pickupLocation?.message as string}
                                    captureLocationName={true}
                                />

                                <LocationSearch
                                    name="dropOffLocation"
                                    control={control}
                                    id="destination"
                                    label="Destination"
                                    placeholder="Enter destination"
                                    onLocationSelect={handleDestinationSelect}
                                    errMsg={errors?.dropOffLocation?.message as string}
                                    captureLocationName={true}
                                />
                                <input type="hidden" {...control.register("vehicleType")} defaultValue="bike" />

                                <Tabs defaultValue="now">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="now" className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Now
                                        </TabsTrigger>
                                        <TabsTrigger value="schedule" className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Schedule
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="now">
                                        <div className="pt-4">
                                            <Button
                                                className="w-full bg-blue-600 hover:bg-blue-700"
                                                onClick={() => {
                                                    setShowRoute(true)
                                                }}
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="schedule">
                                        <div className="pt-4 space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="date">Date</Label>
                                                    <Input id="date" type="date" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="time">Time</Label>
                                                    <Input id="time" type="time" />
                                                </div>
                                            </div>
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep("vehicle")}>
                                                Continue
                                            </Button>
                                        </div>
                                    </TabsContent>
                                </Tabs>

                                <div className="pt-4">
                                    <h3 className="font-medium mb-2">Saved Locations</h3>
                                    <div className="space-y-2">
                                        {[
                                            { name: "Home", address: "123 Main St, Anytown" },
                                            { name: "Work", address: "456 Office Blvd, Business District" },
                                        ].map((location, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-2 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                            >
                                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <MapPin className="h-4 w-4 text-blue-700" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{location.name}</p>
                                                    <p className="text-xs text-muted-foreground">{location.address}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === "vehicle" && (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" onClick={() => setStep("location")} className="mr-2">
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <h2 className="text-xl font-bold">Choose Vehicle Type</h2>
                            </div>

                            <div className="space-y-3">
                                {[
                                    {
                                        type: "Economy",
                                        price: "$12.50",
                                        time: "5 min away",
                                        description: "Affordable rides for everyday use",
                                    },
                                    {
                                        type: "Comfort",
                                        price: "$18.75",
                                        time: "3 min away",
                                        description: "More space and comfort for your journey",
                                    },
                                    {
                                        type: "Premium",
                                        price: "$25.00",
                                        time: "7 min away",
                                        description: "Luxury vehicles with top-rated drivers",
                                    },
                                ].map((vehicle, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                        onClick={() => {
                                            control.setValue("vehicleType", vehicle.type.toLowerCase())
                                            setStep("payment")
                                        }}
                                    >
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Car className="h-6 w-6 text-blue-700" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium">{vehicle.type}</p>
                                                <p className="font-medium">{vehicle.price}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                                                <p className="text-sm text-muted-foreground">{vehicle.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" onClick={() => setStep("vehicle")} className="mr-2">
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <h2 className="text-xl font-bold">Payment Method</h2>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { method: "Credit Card", number: "**** **** **** 4242", default: true },
                                    { method: "PayPal", number: "john.doe@example.com", default: false },
                                ].map((payment, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                                        onClick={() => setStep("confirmation")}
                                    >
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <CreditCard className="h-6 w-6 text-blue-700" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <p className="font-medium">{payment.method}</p>
                                                {payment.default && (
                                                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                                        Default
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{payment.number}</p>
                                        </div>
                                    </div>
                                ))}

                                <Button variant="outline" className="w-full">
                                    Add Payment Method
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === "confirmation" && (
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Button variant="ghost" size="icon" onClick={() => setStep("payment")} className="mr-2">
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <h2 className="text-xl font-bold">Confirm Ride</h2>
                            </div>

                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Pickup</p>
                                            <p className="font-medium">{ride?.pickUpLocation?.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Destination</p>
                                            <p className="font-medium">{ride?.dropOffLocation?.name}</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Vehicle</p>
                                            <p className="font-medium">Comfort</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Estimated Time</p>
                                            <p className="font-medium">3 min away</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Payment</p>
                                            <p className="font-medium">Credit Card (*4242)</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Estimated Price</p>
                                            <p className="font-medium">
                                                {routeInfo?.distance ? `${((routeInfo.distance / 1000) * 1.5).toFixed(2)}` : "$18.75"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex-col space-y-2">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleRequestRide}>
                                        Confirm Ride
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={() => setStep("location")}>
                                        Edit Request
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-4 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                            <Car className="h-8 w-8 text-blue-700" />
                        </div>
                        <h2 className="text-xl font-bold">Your ride is on the way!</h2>
                        <p className="text-muted-foreground">Driver will arrive in approximately 3 minutes</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Driver Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    {
                                        ride?.rider?.image ? <img src={ride.rider.image} className="h-11 w-11 rounded-full object-contain" /> : <User className="h-6 w-6 text-blue-700" />
                                    }

                                </div>
                                <div>
                                    <p className="font-medium">{ride?.rider?.name}</p>
                                    <div className="flex items-center">
                                        <p className="text-sm text-muted-foreground">4.9 ★</p>
                                        <span className="mx-1">•</span>
                                        <p className="text-sm text-muted-foreground">{ride?.vehicleDetails?.model}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">License Plate</p>
                                    <p className="font-medium">{ride?.vehicleDetails?.plateNumber}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Car Color</p>
                                    <p className="font-medium">Silver</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" className="flex-1"

                                onClick={() => {
                                    window.open(`tel:${ride?.rider?.phone}`, "_blank")

                                }}>
                                Call
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
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pickup</p>
                                    <p className="font-medium">{ride?.pickUpLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Destination</p>
                                    <p className="font-medium">{ride?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Estimated Price</p>
                                    <p className="font-medium">
                                        Nrs {ride?.fare}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Payment Method</p>
                                    <p className="font-medium">Credit Card (*4242)</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="destructive" className="w-full"
                                disabled={cancelling}
                                onClick={() => {
                                    cancelRide(ride?._id)
                                }}>
                                Cancel Ride
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    )
}
