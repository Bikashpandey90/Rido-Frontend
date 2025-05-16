import { useEffect, useState } from "react"
import { MapPin, Car, CreditCard, CheckCircle, Calendar, Navigation, Bike } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import rideSvc from "@/pages/rides/rides.service"
import { useParams } from "react-router-dom"
import { capitalify, datify, timefy } from "@/lib/utils"
import MapView from "@/components/ride/map-view"


interface Location {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
    name: string;
}

interface VehicleDetails {
    vehicleType: string;
    model: string;
    plateNumber: string;
}

interface Rider {
    _id: string;
    name: string;
    email: string;
    image: string;
    phone: string;
}

export interface RideDetailData {
    pickUpLocation: Location;
    dropOffLocation: Location;
    vehicleDetails: VehicleDetails;
    _id: string;
    userId: Rider;
    fare: number;
    distance: number;
    distanceTime: number;
    RideStatus: "completed" | "ongoing" | "cancelled" | string;
    paymentStatus: "paid" | "unpaid" | string;
    isPaid: boolean;
    vehicleType: string;
    isScheduled: boolean;
    status: "completed" | "pending" | "cancelled" | string;
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: string; // ISO Date string
    updatedAt: string; // ISO Date string
    __v: number;
    rider: Rider;
}



export default function RideDetailPage() {
    const [activeTab, setActiveTab] = useState<"details" | "map">("details")
    const [rideDetail, setRideDetail] = useState<RideDetailData | null>(null)

    const { id } = useParams()


    const fetchRideDetail = async () => {
        try {

            if (!id) {
                throw new Error("Ride ID is required");
            }
            const response = await rideSvc.getRideDetail(id as string);
            setRideDetail(response.detail)

        } catch (exception) {
            console.log(exception)
        }

    }

    useEffect(() => {
        fetchRideDetail()
    }, [])



    return (
        <>

            <div className="container max-w-4xl py-6 px-4 md:px-6 mx-auto" >


                {/* Status Banner */}
                < div className="flex items-center justify-between mb-6" >
                    <div>
                        <h1 className="text-2xl font-bold">Ride Details</h1>
                        <p className="text-muted-foreground">ID: #{rideDetail?._id}</p>
                    </div>
                    <Badge
                        className={rideDetail?.status === "completed" ? "bg-green-500" : ""}
                    >
                        {rideDetail?.RideStatus ? capitalify(rideDetail?.RideStatus) : ""}
                    </Badge>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b mb-6">
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === "details" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
                        onClick={() => setActiveTab("details")}
                    >
                        Ride Details
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === "map" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
                        onClick={() => setActiveTab("map")}
                    >
                        Map View
                    </button>
                </div>

                {
                    activeTab === "details" ? (
                        <div className="space-y-6">
                            {/* Ride Summary Card */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Ride Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Distance</span>
                                            <span className="font-medium text-lg">{rideDetail?.distance} km</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Duration</span>
                                            <span className="font-medium text-lg">{rideDetail?.distanceTime} min</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Fare</span>
                                            <span className="font-medium text-lg">NPR {rideDetail?.fare.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar size={16} />
                                            <span>
                                                {datify(new Date(rideDetail?.createdAt ?? ''))} at {timefy(new Date(rideDetail?.createdAt ?? ''))}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                            <CreditCard size={16} />
                                            <span>Payment: {rideDetail?.paymentStatus ? capitalify(rideDetail.paymentStatus) : ""}</span>
                                            {rideDetail?.isPaid && <CheckCircle size={16} className="text-green-500" />}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Locations Card */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Route Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <MapPin size={18} className="text-green-600" />
                                                </div>
                                                <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                    <Navigation size={18} className="text-red-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <p className="font-medium">Pickup Location</p>
                                                    <p className="text-sm text-muted-foreground">{rideDetail?.pickUpLocation.name}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Dropoff Location</p>
                                                    <p className="text-sm text-muted-foreground">{rideDetail?.dropOffLocation.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* People Card */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Rider</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                <img
                                                    src={rideDetail?.rider.image || "/placeholder.svg?height=48&width=48"}
                                                    alt={rideDetail?.rider.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{rideDetail?.rider.name}</p>
                                                <p className="text-sm text-muted-foreground">{rideDetail?.rider?.phone}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">Driver</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                                <img
                                                    src={rideDetail?.userId.image || "/placeholder.svg?height=48&width=48"}
                                                    alt={rideDetail?.userId.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{rideDetail?.userId.name}</p>
                                                <p className="text-sm text-muted-foreground">{rideDetail?.userId?.phone}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Vehicle Details */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Vehicle Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                            {rideDetail?.vehicleType === "bike" ? (
                                                <Bike size={24} className="text-slate-600" />
                                            ) : (
                                                <Car size={24} className="text-slate-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{rideDetail?.vehicleDetails.model}</p>
                                            <p className="text-sm text-muted-foreground">Plate: {rideDetail?.vehicleDetails.plateNumber}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Details */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Payment Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Base fare</span>
                                            <span>NPR {(rideDetail?.fare ?? 0 * 0.8).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Service fee</span>
                                            <span>NPR {(rideDetail?.fare ?? 0 * 0.2).toFixed(2)}</span>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="flex justify-between font-medium">
                                            <span>Total</span>
                                            <span>NPR {rideDetail?.fare.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-green-600 text-sm">
                                            <CheckCircle size={16} />
                                            <span>Paid</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Download Receipt
                                </Button>
                                <Button className="w-full sm:w-auto">Contact Support</Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 p-0 m-0">
                            {/* Map View */}
                            <Card className="p-0">
                                <CardContent className="p-0 m-0 ">

                                    <MapView

                                        latitude={rideDetail?.pickUpLocation.coordinates[1] ?? null}
                                        longitude={rideDetail?.pickUpLocation.coordinates[0] ?? null}
                                        destLatitude={rideDetail?.dropOffLocation.coordinates[1] ?? null}
                                        destLongitude={rideDetail?.dropOffLocation.coordinates[0] ?? null}
                                        showRoute={false}
                                        setShowDirectionsCard={() => { }}
                                        setRouteInfo={() => { }}
                                        className="rounded-2xl overflow-hidden"
                                    />
                                </CardContent>
                            </Card>

                            {/* Route Summary */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Route Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                    <MapPin size={18} className="text-green-600" />
                                                </div>
                                                <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                                    <Navigation size={18} className="text-red-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <p className="font-medium">Pickup Location</p>
                                                    <p className="text-sm text-muted-foreground">{rideDetail?.pickUpLocation.name}</p>
                                                </div>
                                                <div>
                                                    <p className="font-medium">Dropoff Location</p>
                                                    <p className="text-sm text-muted-foreground">{rideDetail?.dropOffLocation.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Distance</span>
                                            <span className="font-medium">{rideDetail?.distance} km</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Duration</span>
                                            <span className="font-medium">{(rideDetail?.distanceTime)} min</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-muted-foreground text-sm">Fare</span>
                                            <span className="font-medium">NPR {rideDetail?.fare.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )
                }

            </div >

        </>

    )
}
