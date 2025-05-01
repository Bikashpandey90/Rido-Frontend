
import { useContext, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Award,
    Bell,
    Calendar,
    Car,
    CheckCircle2,
    Clock,
    CreditCard,
    Edit,
    MapPin,
    Phone,
    Shield,
    Star,
    TrendingUp,
    Wallet,
    Zap,
    Gift,
    Coffee,
    Bike,
} from "lucide-react"
import VehicleModel from "@/components/vehicle/vehicle-model"
import VehicleSelector from "@/components/vehicle/vehicle-selector"
import { AuthContext } from "@/context/auth.context"

export default function RiderProfile() {
    const [vehicleType, setVehicleType] = useState<"car" | "bike">("car")

    const vehicleInfo = {
        car: {
            name: "Modern Cartoon Cup Car - Darsche 91",
            year: "2023",
            color: "Red",
            seats: "2 Seats",
            license: "NYC-4578",
            inspection: "Mar 2025",
        },
        bike: {
            name: "Ducati Diavel Dark 1200CC",
            year: "2023",
            color: "Black",
            seats: "2 Seats",
            license: "NYC-9821",
            inspection: "Jun 2025",
        },
    }

    const currentVehicle = vehicleInfo[vehicleType]
    const auth = useContext(AuthContext) as { loggedInUser: any }
    console.log(auth.loggedInUser)

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-2">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Profile Header - Large Card */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <div className="h-24 sm:h-32 bg-gradient-to-r from-purple-100 to-pink-100"></div>
                    <CardContent className="p-0">
                        <div className="relative px-4 sm:px-6 pb-6">
                            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 border-4 border-background absolute -top-10 sm:-top-14 ring-2 ring-muted/10">
                                <AvatarImage src={auth?.loggedInUser?.image} alt="User" className="object-cover" />
                                <AvatarFallback className="text-xl sm:text-2xl">{auth.loggedInUser.name.split(" ").map((n: string) => n[0]).join("")}</AvatarFallback>
                            </Avatar>

                            <div className="pt-12 sm:ml-32 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold">{auth?.loggedInUser?.name}</h1>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{auth?.loggedInUser?.address}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm" className="gap-1 rounded-full px-4">
                                        <Edit className="h-4 w-4" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                        <span className="sm:hidden">Edit</span>
                                    </Button>
                                    <Button size="sm" className="gap-1 rounded-full px-4 bg-purple-600 hover:bg-purple-700">
                                        <Shield className="h-4 w-4" />
                                        <span className="hidden sm:inline">Pro Driver</span>
                                        <span className="sm:hidden">Pro</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center mt-4 sm:ml-32">
                                <Badge
                                    variant="secondary"
                                    className="flex gap-1 items-center rounded-full px-3 py-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                                >
                                    <Star className="h-3 w-3 fill-purple-500 text-purple-500" />
                                    4.97 Rating
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center rounded-full px-3 py-1">
                                    <Calendar className="h-3 w-3" />
                                    Member since Jan 2021
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center rounded-full px-3 py-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Verified Account
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* Ride Activity - Spans 8 columns on large screens */}
                    <Card className="md:col-span-4 lg:col-span-8 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-purple-500" />
                                    Driving Activity
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Clock className="h-4 w-4 mr-2" />
                                    View History
                                </Button>
                            </div>

                            <div className="space-y-5">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 flex flex-col items-center justify-center text-center">
                                        <div className="bg-purple-100 p-2 rounded-full mb-2">
                                            <Car className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <p className="text-2xl font-bold text-purple-700">127</p>
                                        <p className="text-sm text-purple-600">Rides Completed</p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                        <div className="bg-muted/50 p-2 rounded-full mb-2">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold">4.97</p>
                                        <p className="text-sm text-muted-foreground">Driver Rating</p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                        <div className="bg-muted/50 p-2 rounded-full mb-2">
                                            <Zap className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold">842</p>
                                        <p className="text-sm text-muted-foreground">Miles Driven</p>
                                    </div>

                                    <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                        <div className="bg-muted/50 p-2 rounded-full mb-2">
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        <p className="text-2xl font-bold">$1,245</p>
                                        <p className="text-sm text-muted-foreground">Total Earnings</p>
                                    </div>
                                </div>

                                <div className="bg-muted/20 p-4 rounded-xl">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Ride Completion Rate</h3>
                                        <span className="text-sm font-medium">98%</span>
                                    </div>
                                    <Progress value={98} className="h-2 bg-muted" />
                                </div>

                                <div className="bg-muted/20 p-4 rounded-xl">
                                    <h3 className="font-medium mb-3">Recent Rides</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full">
                                                    <Car className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Downtown to Airport</p>
                                                    <p className="text-xs text-muted-foreground">Today, 8:30 AM</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">$18.50</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full">
                                                    <Car className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Midtown to Brooklyn</p>
                                                    <p className="text-xs text-muted-foreground">Yesterday, 7:15 PM</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">$12.75</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-purple-100 p-2 rounded-full">
                                                    <Car className="h-4 w-4 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">Upper East Side to Queens</p>
                                                    <p className="text-xs text-muted-foreground">Yesterday, 10:30 PM</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">$15.20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Loyalty & Rewards - Spans 4 columns on large screens */}
                    <Card className="md:col-span-2 lg:col-span-4 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-pink-500" />
                                    Driver Rewards
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Wallet className="h-4 w-4 mr-2" />
                                    Redeem
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-medium text-pink-700">Reward Points</h3>
                                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">Gold Tier</Badge>
                                    </div>
                                    <p className="text-3xl font-bold text-pink-700 mb-2">3,450</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-pink-600">Next tier: 5,000 points</p>
                                        <p className="text-sm font-medium text-pink-700">69%</p>
                                    </div>
                                    <Progress value={69} className="h-2 bg-pink-100 mt-1" indicatorClassName="bg-pink-500" />
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <h3 className="font-medium mb-3">Available Perks</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted/50 p-2 rounded-full">
                                                <Zap className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Priority Matching</p>
                                                <p className="text-xs text-muted-foreground">Get matched with drivers faster</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted/50 p-2 rounded-full">
                                                <Shield className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Ride Protection</p>
                                                <p className="text-xs text-muted-foreground">Free cancellation within 5 min</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-muted/50 p-2 rounded-full">
                                                <Coffee className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium">Partner Discounts</p>
                                                <p className="text-xs text-muted-foreground">10% off at partner cafes</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Information - Spans 3 columns on medium screens, 4 on large */}
                    <Card className="md:col-span-3 lg:col-span-4 md:row-span-2 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Car className="h-5 w-5 text-emerald-500" />
                                    Vehicle Information
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-5 rounded-xl border border-emerald-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium text-emerald-700">Primary Vehicle</h3>
                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Active</Badge>
                                    </div>
                                    <div className="space-y-2 text-emerald-900">
                                        <p className="font-medium text-lg">
                                            {/* {vehicleType === "car" ? "Modern Cartoon Cup Car - Darsche 91" : "Ducati Diavel Dark 1200CC"} */}
                                            {auth.loggedInUser.vehicle.model}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                                                {/* {vehicleType === "car" ? "Sports Car" : "Motorcycle"} */}
                                                {auth.loggedInUser.vehicle.vehicleType === "bike" ? "Motorcycle" : "Car"}
                                            </Badge>
                                            <Badge variant="outline" className="border-emerald-200 text-emerald-700">
                                                {auth.loggedInUser.vehicle.vehicleType === "bike" ? "2 Seats" : "4 Seats"}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            <div>
                                                <p className="text-xs text-emerald-600">License Plate</p>
                                                <p className="font-medium">
                                                    {/* {vehicleType === "car" ? "NYC-4578" : "NYC-9821"} */}
                                                    {auth.loggedInUser.vehicle.plateNumber}

                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-emerald-600">Color</p>
                                                <p className="font-medium">{vehicleType === "car" ? "Red" : "Black"}</p>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs">
                                                <Edit className="h-3 w-3 mr-1" />
                                                Update Info
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Vehicle Documents</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <p>Registration</p>
                                            </div>
                                            <Badge variant="outline" className="text-green-600">
                                                Valid until Dec 2025
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <p>Insurance</p>
                                            </div>
                                            <Badge variant="outline" className="text-green-600">
                                                Valid until Aug 2025
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <p>Vehicle Inspection</p>
                                            </div>
                                            <Badge variant="outline" className="text-green-600">
                                                Valid until {vehicleType === "car" ? "Mar 2025" : "Jun 2025"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Vehicle Features</h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {auth.loggedInUser.vehicle.vehicleType === "car" ? (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Air Conditioning</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Leather Seats</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>USB Charging</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Bluetooth Audio</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Sport Mode</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Trunk Space</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>ABS Braking</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>LED Lighting</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Traction Control</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Digital Display</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Sport Mode</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <p>Passenger Seat</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3D Vehicle Model Card - Spans 3 columns on medium screens, 4 on large */}
                    <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    {auth.loggedInUser.vehicle.vehicleType === "car" ? (
                                        <Car className="h-5 w-5 text-indigo-500" />
                                    ) : (
                                        <Bike className="h-5 w-5 text-indigo-500" />
                                    )}
                                    My Vehicle
                                </h2>
                                <Badge variant="outline" className="rounded-full bg-indigo-100 text-indigo-700 border-indigo-200">
                                    Verified
                                </Badge>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                {/* Vehicle Type Selector */}
                                <VehicleSelector onSelect={setVehicleType} selectedType={auth.loggedInUser.vehicle.vehicleType} />

                                {/* 3D Vehicle Model */}
                                <div className="w-full rounded-xl mb-4 overflow-hidden">
                                    <VehicleModel vehicleType={auth.loggedInUser.vehicle.vehicleType} height={300} />
                                </div>

                                <h3 className="text-xl font-bold text-center mb-1">{auth.loggedInUser.vehicle.model}</h3>
                                <p className="text-muted-foreground text-center mb-4">
                                    {currentVehicle.year} • {currentVehicle.color} • {currentVehicle.seats}
                                </p>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-muted/30 p-3 rounded-xl text-center">
                                        <p className="text-sm text-muted-foreground">License Plate</p>
                                        <p className="font-medium">{auth.loggedInUser.vehicle.plateNumber}</p>
                                    </div>
                                    <div className="bg-muted/30 p-3 rounded-xl text-center">
                                        <p className="text-sm text-muted-foreground">Last Inspection</p>
                                        <p className="font-medium">{currentVehicle.inspection}</p>
                                    </div>
                                </div>

                                <div className="w-full mt-4 space-y-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm">Vehicle Rating</p>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm">Cleanliness Score</p>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Excellent</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rest of the cards remain unchanged */}
                    {/* Ride Preferences - Spans 6 columns on medium screens, 8 on large */}
                    <Card className="md:col-span-6 lg:col-span-8 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Car className="h-5 w-5 text-violet-500" />
                                    Driver Preferences
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-violet-100 p-2 rounded-full">
                                            <Car className="h-5 w-5 text-violet-600" />
                                        </div>
                                        <h3 className="font-medium text-violet-700">Ride Types</h3>
                                    </div>
                                    <div className="ml-9 space-y-2">
                                        <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200">Standard</Badge>
                                        <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-200 ml-2">Premium</Badge>
                                        <p className="text-violet-900">Available for all ride categories</p>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Bell className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Work Schedule</h3>
                                    </div>
                                    <div className="ml-9 space-y-2">
                                        <Badge variant="outline">Weekdays</Badge>
                                        <Badge variant="outline" className="ml-2">
                                            Evenings
                                        </Badge>
                                        <p>Preferred hours: 4PM - 11PM</p>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Service Areas</h3>
                                    </div>
                                    <div className="ml-9 space-y-2">
                                        <Badge variant="outline">Manhattan</Badge>
                                        <Badge variant="outline" className="ml-2">
                                            Brooklyn
                                        </Badge>
                                        <Badge variant="outline" className="ml-2">
                                            Queens
                                        </Badge>
                                        <p>Preferred pickup zones</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Communication Preferences - Spans full width */}
                    <Card className="md:col-span-6 lg:col-span-12 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-amber-500" />
                                    Communication Preferences
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-amber-100 p-2 rounded-full">
                                            <Car className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <h3 className="font-medium text-amber-700">Ride Updates</h3>
                                    </div>
                                    <div className="ml-9 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p className="text-amber-900">App Notifications</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p className="text-amber-900">SMS</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p className="text-amber-900">Email</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Gift className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Promotions</h3>
                                    </div>
                                    <div className="ml-9 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p>App Notifications</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p>Email</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Account Updates</h3>
                                    </div>
                                    <div className="ml-9 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p>Email</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p>SMS</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Driver Messages</h3>
                                    </div>
                                    <div className="ml-9 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <p>SMS Only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Emergency Contact - Spans full width */}
                    <Card className="md:col-span-6 lg:col-span-12 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-red-500" />
                                    Emergency Contacts
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 sm:p-5 rounded-xl border border-red-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium text-red-700">Primary Contact</h3>
                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Primary</Badge>
                                    </div>
                                    <p className="mb-1 text-red-900 font-medium">Michael Mitchell</p>
                                    <p className="mb-1 text-red-900">+1 (555) 123-4567</p>
                                    <p className="text-red-900 text-sm">Relationship: Brother</p>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Secondary Contact</h3>
                                    <p className="mb-1 font-medium">Emily Johnson</p>
                                    <p className="mb-1">+1 (555) 987-6543</p>
                                    <p className="text-sm">Relationship: Friend</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
