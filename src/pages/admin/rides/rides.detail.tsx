import {
    Calendar,
    MapPin,
    User,
    Car,
    CreditCard,
    Star,
    ArrowLeft,
    Download,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Share2,
    AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { RideDetailData } from "@/pages/rides/ride-detail"
import rideSvc from "@/pages/rides/rides.service"
import { useNavigate, useParams } from "react-router-dom"
import { datify, initialify, shortify, timefy } from "@/lib/utils"

export default function AdminRideDetailsPage() {
    // Sample ride data
    // const ride = {
    //     id: "RID-7829",
    //     date: "May 11, 2025",
    //     time: "10:30 AM",
    //     from: {
    //         address: "123 Main St, San Francisco, CA",
    //         coordinates: [37.7749, -122.4194],
    //     },
    //     to: {
    //         address: "SFO Airport, San Francisco, CA",
    //         coordinates: [37.6213, -122.379],
    //     },
    //     driver: {
    //         id: "DRV-1001",
    //         name: "Alex Johnson",
    //         avatar: "AJ",
    //         rating: 4.8,
    //         phone: "+1 (555) 987-6543",
    //         vehicle: {
    //             make: "Toyota",
    //             model: "Camry",
    //             year: 2021,
    //             color: "Silver",
    //             licensePlate: "ABC123",
    //         },
    //     },
    //     passenger: {
    //         id: "USR-1001",
    //         name: "Emma Thompson",
    //         avatar: "ET",
    //         rating: 4.9,
    //     },
    //     status: "Completed",
    //     duration: "28 min",
    //     distance: "15.3 mi",
    //     route: [
    //         [37.7749, -122.4194],
    //         [37.7833, -122.4167],
    //         [37.7915, -122.4089],
    //         [37.7956, -122.3933],
    //         [37.7312, -122.3826],
    //         [37.6213, -122.379],
    //     ],
    //     payment: {
    //         method: "Credit Card",
    //         last4: "4242",
    //         subtotal: 38.5,
    //         tax: 3.25,
    //         tip: 5.0,
    //         total: 46.75,
    //     },
    //     timeline: [
    //         { time: "10:25 AM", event: "Ride requested" },
    //         { time: "10:26 AM", event: "Driver accepted" },
    //         { time: "10:28 AM", event: "Driver arrived" },
    //         { time: "10:30 AM", event: "Ride started" },
    //         { time: "10:58 AM", event: "Ride completed" },
    //         { time: "11:00 AM", event: "Payment processed" },
    //     ],
    // }

    const [ride, setRide] = useState<RideDetailData | null>(null)
    const { id } = useParams()

    const fetchRide = async (id: string) => {
        try {
            const response = await rideSvc.getRideDetail(id)
            setRide(response.detail)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchRide(id as string)
    }, [])

    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Completed
                    </Badge>
                )
            case "cancelled":
                return (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        Cancelled
                    </Badge>
                )
            case "ongoing":
                return (
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                        In Progress
                    </Badge>
                )
            default:
                return (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400">
                        {status}
                    </Badge>
                )
        }
    }

    const navigate = useNavigate()

    return (
        <>
            {/* Ride Details Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header with back button */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1" onClick={() => {
                                navigate(-1)
                            }}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Ride History
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Ride Details</h1>
                                <p className="text-sm md:text-base text-muted-foreground">
                                    {shortify(ride?.pickUpLocation.name ?? '')} to {shortify(ride?.dropOffLocation.name ?? '')}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Share2 className="h-4 w-4" />
                                    Share
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Receipt
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                    size="sm"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Support
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Ride Summary */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Ride Summary</CardTitle>
                                    <CardDescription>
                                        {datify(new Date(ride?.createdAt ?? ''))} at {timefy(new Date(ride?.createdAt ?? ''))}
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xl font-bold">Nrs {ride?.fare.toFixed(2)}</div>
                                    {getStatusBadge(ride?.RideStatus ?? '')}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Route Info */}
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="h-5 w-5 rounded-full border-2 border-indigo-600 bg-white"></div>
                                            <div className="w-0.5 h-16 bg-gray-200"></div>
                                            <div className="h-5 w-5 rounded-full bg-indigo-600"></div>
                                        </div>
                                        <div className="flex-1 space-y-6">
                                            <div>
                                                <div className="text-sm font-medium">Pickup Location</div>
                                                <div className="text-sm text-muted-foreground">{ride?.pickUpLocation.name}</div>
                                                <div className="text-xs text-muted-foreground mt-1">{timefy(new Date(ride?.createdAt ?? ''))}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium">Dropoff Location</div>
                                                <div className="text-sm text-muted-foreground">{ride?.dropOffLocation.name}</div>
                                                <div className="text-xs text-muted-foreground mt-1">{timefy(new Date(ride?.updatedAt ?? ''))}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <div className="text-xs text-muted-foreground">Distance</div>
                                            <div className="text-sm font-medium">{ride?.distance} km </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground">Duration</div>
                                            <div className="text-sm font-medium">{ride?.distanceTime} min</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="rounded-lg overflow-hidden bg-muted h-[200px] flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Map view of the ride route</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Details, Payment, and Timeline */}
                    <Tabs defaultValue="details" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="payment">Payment</TabsTrigger>
                            <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        </TabsList>

                        {/* Details Tab */}
                        <TabsContent value="details" className="space-y-6 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Driver Info */}
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Driver Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                                <AvatarImage src={ride?.rider.image} className="h-full w-full object-cover" />
                                                <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                    {initialify(ride?.rider.name ?? '')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-lg font-medium">{ride?.rider.name}</div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span className="text-sm">{(Math.random() * (5 - 4) + 4).toFixed(1)} Rating</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Vehicle</span>
                                                    <span className="text-sm font-medium">
                                                        {/* {ride?.vehicle.color} {ride.driver.vehicle.make} {ride.vehicle.model} (
                                                        {ride.vehicle.year}) */}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">License Plate</span>
                                                    <span className="text-sm font-medium">{ride?.vehicleDetails.plateNumber}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            <Button variant="outline" size="sm" className="gap-1">
                                                <MessageSquare className="h-4 w-4" />
                                                Contact Driver
                                            </Button>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <ThumbsUp className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                    <ThumbsDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Passenger Info */}
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardHeader className="pb-2">
                                        <CardTitle>Passenger Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                                <AvatarImage src={ride?.userId.image} className="h-full w-full object-cover" />
                                                <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    {ride?.userId.name}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-lg font-medium">{ride?.userId.name}</div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span className="text-sm">{(Math.random() * (5 - 4) + 4).toFixed(1)} Rating</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Account ID</span>
                                                    <span className="text-sm font-medium">#{ride?.userId._id.slice(-4)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Privacy Notice</p>
                                                    <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">
                                                        Personal contact information is hidden to protect user privacy. Use the in-app messaging for
                                                        communication.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Payment Tab */}
                        <TabsContent value="payment" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Payment Details</CardTitle>
                                            <CardDescription>Transaction information and receipt</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <Download className="h-4 w-4" />
                                            Download Receipt
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Payment Method</span>
                                                    <span className="text-sm font-medium">
                                                        Esewa
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Date & Time</span>
                                                    <span className="text-sm font-medium">
                                                        {datify(new Date(ride?.createdAt ?? ''))} at {timefy(new Date(ride?.createdAt ?? ''))}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Distance & Duration</span>
                                                    <span className="text-sm font-medium">
                                                        {ride?.distance} km  • {ride?.distanceTime} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-muted/30 rounded-lg p-4">
                                            <div className="text-lg font-medium mb-4">Fare Breakdown</div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Base Fare</span>
                                                    <span className="text-sm font-medium">Nrs {((ride?.fare ?? 0) * 0.7).toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Tax</span>
                                                    <span className="text-sm font-medium">Nrs {(ride?.fare ?? 0) * 0.2}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm">Tip</span>
                                                    <span className="text-sm font-medium">Nrs {(ride?.fare ?? 0) * 0.1}</span>
                                                </div>
                                                <Separator className="my-2" />
                                                <div className="flex justify-between">
                                                    <span className="text-sm font-medium">Total</span>
                                                    <span className="text-base font-bold">Nrs {ride?.fare}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Timeline Tab */}
                        <TabsContent value="timeline" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Ride Timeline</CardTitle>
                                    <CardDescription>Detailed sequence of events</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative pl-8 space-y-6">
                                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                                        {/* {ride?.timeline.map((event, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute left-[-30px] top-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{event.event}</span>
                                                    <span className="text-xs text-muted-foreground">{event.time}</span>
                                                </div>
                                            </div>
                                        ))} */}
                                        {/* {Array.from({ length: 5 }).map((_, index) => {
                                            const eventTime = new Date(ride?.createdAt ?? '');
                                            eventTime.setMinutes(eventTime.getMinutes() + (index + 1) * (Math.random() * (3 - 2) + 2));
                                            return (
                                                <div key={index} className="relative">
                                                    <div className="absolute left-[-30px] top-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                        <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">Event {index + 1}</span>
                                                        <span className="text-xs text-muted-foreground">{timefy(eventTime)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })} */}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </>
    )
}
