import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bike, Calendar, Car, Clock, CreditCard, MapPin, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import rideSvc from "./rides.service"
import { datify, initialify, timefy } from "@/lib/utils"

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
}

export interface RideData {
    pickUpLocation: Location;
    dropOffLocation: Location;
    vehicleDetails: VehicleDetails;
    _id: string;
    userId: string;
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


export default function RidesPage() {
    const [rides, setRides] = useState<RideData[]>([])

    const fetchRides = async () => {
        try {

            const response = await rideSvc.getRides()
            setRides(response.detail)


        } catch (exception) {
            console.log(exception)
        }

    }
    useEffect(() => {
        fetchRides()

    }, [])


    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-2 sm:p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                        <NavLink to="/profile">
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="sr-only">Back to profile</span>
                        </NavLink>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-bold">Your Rides</h1>
                </div>

                {/* Filter Section */}
                {/* <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm sm:text-base font-medium">Filter Rides</h2>
                            <Button variant="ghost" size="sm" className="h-8 text-xs sm:text-sm">
                                Clear Filters
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button variant="default" size="sm" className="rounded-full h-8 px-4 bg-teal-600 hover:bg-teal-700">
                                All Rides
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4">
                                Scheduled
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4">
                                Completed
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4">
                                Canceled
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-full h-8 px-4">
                                This Month
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            <div className="text-sm text-muted-foreground">Date Range:</div>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs">
                                    Last 30 Days
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs">
                                    Last 3 Months
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs">
                                    Last Year
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full h-8 px-4 text-xs flex items-center gap-1">
                                    Custom Range
                                </Button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <Card className="border-none shadow-md">
                    <CardHeader className="pb-2 px-3 sm:px-6 pt-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Recent Rides</CardTitle>
                            <span className="text-sm text-muted-foreground">{rides.length} rides</span>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                        {/* Ride 1 */}
                        <div className="bg-gradient-to-r from-teal-50 to-green-50 p-3 sm:p-4 rounded-xl border border-teal-100">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className="bg-teal-100 p-1.5 sm:p-2 rounded-full">
                                        <Car className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-teal-800 text-sm sm:text-base">Downtown to Airport</h3>
                                        <div className="flex flex-wrap items-center text-xs sm:text-sm text-teal-700 gap-1 sm:gap-0">
                                            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                            <span>May 2, 2025</span>
                                            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-2 mr-1" />
                                            <span>10:30 AM</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200 text-xs w-fit">Completed</Badge>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 sm:mt-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-teal-600 mb-1">Pickup</span>
                                    <div className="flex items-start gap-1">
                                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-700 mt-0.5 shrink-0" />
                                        <span className="text-xs sm:text-sm text-teal-800 break-words">
                                            123 Main Street, San Francisco, CA 94105
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs text-teal-600 mb-1">Dropoff</span>
                                    <div className="flex items-start gap-1">
                                        <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-700 mt-0.5 shrink-0" />
                                        <span className="text-xs sm:text-sm text-teal-800 break-words">
                                            SFO International Airport, San Francisco, CA 94128
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xs text-teal-600 mb-1">Payment</span>
                                    <div className="flex items-center gap-1 flex-wrap">
                                        <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-teal-700" />
                                        <span className="text-xs sm:text-sm font-medium text-teal-800">$24.50</span>
                                        <span className="text-xs text-teal-600">• Visa •••• 4242</span>
                                    </div>
                                </div>
                            </div>

                            <Separator className="my-3 sm:my-4 bg-teal-200/50" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 border border-teal-200">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Driver" />
                                        <AvatarFallback>MK</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-xs sm:text-sm font-medium text-teal-800">Michael K.</p>
                                        <div className="flex items-center">
                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            <span className="text-xs ml-1 text-teal-700">4.9</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto justify-end">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-teal-700 border-teal-200 hover:bg-teal-100 text-xs h-8"
                                    >
                                        Receipt
                                    </Button>
                                    <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs h-8">
                                        Book Again
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Ride 2 */}
                        {
                            rides.map((ride, index) => (
                                <div className="bg-muted/30 p-3 sm:p-4 rounded-xl border border-muted" key={index}>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="bg-muted/50 p-1.5 sm:p-2 rounded-full">
                                                {
                                                    ride.vehicleType === 'car' ? <Car className="h-4 w-4 sm:h-5 sm:w-5" /> : <Bike className="h-4 w-4 sm:h-5 sm:w-5" />
                                                }
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-sm sm:text-base">Home to Office</h3>
                                                <div className="flex flex-wrap items-center text-xs sm:text-sm text-muted-foreground gap-1 sm:gap-0">
                                                    <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                                    {/* <span>{new Date(ride?.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span> */}
                                                    <span> {datify(new Date(ride?.createdAt))}</span>
                                                    <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-2 mr-1" />
                                                    <span>{timefy(new Date(ride?.createdAt))}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs w-fit">
                                            Completed
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 sm:mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground mb-1">Pickup</span>
                                            <div className="flex items-start gap-1">
                                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                                                <span className="text-xs sm:text-sm break-words">{ride?.pickUpLocation?.name.split(",").slice(0, 1).join(" ")}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground mb-1">Dropoff</span>
                                            <div className="flex items-start gap-1">
                                                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mt-0.5 shrink-0" />
                                                <span className="text-xs sm:text-sm break-words">{ride?.dropOffLocation?.name.split(',').slice(0, 1).join(' ')}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground mb-1">Payment</span>
                                            <div className="flex items-center gap-1 flex-wrap">
                                                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                <span className="text-xs sm:text-sm font-medium">Nrs {ride?.fare}</span>
                                                <span className="text-xs text-muted-foreground">• Visa •••• 4242</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="my-3 sm:my-4" />

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                                                <AvatarImage src={ride?.rider?.image} alt="Driver" />
                                                <AvatarFallback>{initialify(ride?.rider?.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-xs sm:text-sm font-medium">{ride?.rider?.name}</p>
                                                <div className="flex items-center">
                                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs ml-1">5.0</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                                            <Button size="sm" variant="outline" className="text-xs h-8">
                                                Receipt
                                            </Button>
                                            <Button size="sm" className="text-xs h-8">
                                                Book Again
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
