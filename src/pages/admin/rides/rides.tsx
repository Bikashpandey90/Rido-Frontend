import {
    Calendar,
    Clock,
    Download,
    Filter,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import rideSvc from "@/pages/rides/rides.service"
import { useEffect, useState } from "react"
import { RideData } from "@/pages/rides/rides-page"
import { capitalify, datify, initialify, timefy } from "@/lib/utils"

const AdminRidesPage = () => {

    const [rides, setRide] = useState<RideData[]>([])

    const fetchRides = async () => {
        try {
            const response = await rideSvc.getRides();
            setRide(response.detail)


        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchRides()

    }, [])



    // const rides = [
    //     {
    //         id: "RID-7829",
    //         passenger: {
    //             name: "Emma Thompson",
    //             avatar: "ET",
    //         },
    //         driver: {
    //             name: "Alex Johnson",
    //             avatar: "AJ",
    //         },
    //         pickup: "Downtown Financial District",
    //         dropoff: "International Airport Terminal 2",
    //         date: "Today",
    //         time: "10:30 AM",
    //         duration: "35 min",
    //         distance: "18.5 mi",
    //         amount: 42.75,
    //         status: "Completed",
    //         paymentStatus: "Paid",
    //         type: "Premium",
    //     },
    //     {
    //         id: "RID-7830",
    //         passenger: {
    //             name: "Michael Davis",
    //             avatar: "MD",
    //         },
    //         driver: {
    //             name: "Maria Garcia",
    //             avatar: "MG",
    //         },
    //         pickup: "Westside Mall",
    //         dropoff: "Riverside Apartments",
    //         date: "Today",
    //         time: "11:45 AM",
    //         duration: "22 min",
    //         distance: "8.2 mi",
    //         amount: 24.5,
    //         status: "In Progress",
    //         paymentStatus: "Pending",
    //         type: "Economy",
    //     },
    //     {
    //         id: "RID-7831",
    //         passenger: {
    //             name: "Sophia Martinez",
    //             avatar: "SM",
    //         },
    //         driver: {
    //             name: "Robert Chen",
    //             avatar: "RC",
    //         },
    //         pickup: "Central Park South",
    //         dropoff: "Harbor Heights Hotel",
    //         date: "Today",
    //         time: "09:15 AM",
    //         duration: "18 min",
    //         distance: "5.7 mi",
    //         amount: 18.9,
    //         status: "Completed",
    //         paymentStatus: "Paid",
    //         type: "Economy",
    //     },
    //     {
    //         id: "RID-7832",
    //         passenger: {
    //             name: "Daniel Johnson",
    //             avatar: "DJ",
    //         },
    //         driver: {
    //             name: "Priya Patel",
    //             avatar: "PP",
    //         },
    //         pickup: "Tech District Office Park",
    //         dropoff: "Parkview Residence",
    //         date: "Yesterday",
    //         time: "05:30 PM",
    //         duration: "25 min",
    //         distance: "10.3 mi",
    //         amount: 32.4,
    //         status: "Cancelled",
    //         paymentStatus: "Refunded",
    //         type: "Premium",
    //     },
    //     {
    //         id: "RID-7833",
    //         passenger: {
    //             name: "Olivia Wilson",
    //             avatar: "OW",
    //         },
    //         driver: {
    //             name: "James Wilson",
    //             avatar: "JW",
    //         },
    //         pickup: "Meadow Gardens Community",
    //         dropoff: "City Center Plaza",
    //         date: "Yesterday",
    //         time: "02:15 PM",
    //         duration: "30 min",
    //         distance: "12.8 mi",
    //         amount: 35.6,
    //         status: "Completed",
    //         paymentStatus: "Paid",
    //         type: "Luxury",
    //     },
    //     {
    //         id: "RID-7834",
    //         passenger: {
    //             name: "William Brown",
    //             avatar: "WB",
    //         },
    //         driver: {
    //             name: "Sofia Rodriguez",
    //             avatar: "SR",
    //         },
    //         pickup: "University Campus",
    //         dropoff: "Northside Apartments",
    //         date: "Yesterday",
    //         time: "11:20 AM",
    //         duration: "15 min",
    //         distance: "4.5 mi",
    //         amount: 15.8,
    //         status: "Scheduled",
    //         paymentStatus: "Not Paid",
    //         type: "Economy",
    //     },
    // ]

    return (
        <>
            {/* Rides Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Rides</h1>
                            <p className="text-sm md:text-base text-muted-foreground">Track and manage all ride activities</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" size="sm" className="gap-1">
                                <Calendar className="h-4 w-4" />
                                Date Range
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Tabs and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <Tabs defaultValue="all" className="w-full md:w-auto">
                            <TabsList className="grid grid-cols-4 w-full md:w-auto">
                                <TabsTrigger value="all">All Rides</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Ride Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="economy">Economy</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="luxury">Luxury</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="amount-high">Highest Amount</SelectItem>
                                    <SelectItem value="amount-low">Lowest Amount</SelectItem>
                                    <SelectItem value="distance">Distance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Rides Table */}
                    <div className="rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted/50">
                                        <th className="text-left py-3 px-4 font-medium text-sm">Ride ID</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Passenger</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Driver</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Route</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Date & Time</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Duration</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {rides.map((ride) => (
                                        <tr key={ride._id} className="hover:bg-muted/30">
                                            <td className="py-3 px-4">
                                                <span className="text-sm font-medium">#{ride._id.slice(-4)}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                                                        <AvatarImage src={ride.userId?.image} className="h-full w-full object-cover" />
                                                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xs">
                                                            {initialify(ride.userId?.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{ride.userId?.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                                                        <AvatarImage src={ride.rider?.image} className="h-full w-full object-cover" />

                                                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs">
                                                            {initialify(ride.rider?.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">{ride.rider?.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div>
                                                    <p className="text-sm truncate max-w-[150px]">{ride.pickUpLocation?.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate max-w-[150px]">{ride.dropOffLocation?.name}</p>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-sm">{datify(new Date(ride.createdAt ?? ""))}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">{timefy(new Date(ride.createdAt ?? ""))}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm">{ride.distanceTime} min</p>
                                                <p className="text-xs text-muted-foreground">{ride.distance} km</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm font-medium">Nrs {ride.fare.toFixed(2)}</p>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs mt-1 ${ride.paymentStatus === "paid"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : ride.paymentStatus === "unpaid"
                                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                            : ride.paymentStatus === "pending"
                                                                ? "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                                : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400"
                                                        }`}
                                                >
                                                    {capitalify(ride.paymentStatus)}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    className={`${ride.RideStatus === "completed"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : ride.RideStatus === "ongoing"
                                                            ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                            : ride.RideStatus === "accepted"
                                                                ? "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400"
                                                                : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {capitalify(ride.RideStatus)}
                                                </Badge>
                                                <p className="text-xs text-muted-foreground mt-1">{capitalify(ride.vehicleType)}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Track Ride</DropdownMenuItem>
                                                        <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                                                        <DropdownMenuItem>Contact Passenger</DropdownMenuItem>
                                                        {ride.status === "Scheduled" && (
                                                            <DropdownMenuItem className="text-red-600">Cancel Ride</DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{rides.length}</span> of{" "}
                            <span className="font-medium">235</span> rides
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default AdminRidesPage
