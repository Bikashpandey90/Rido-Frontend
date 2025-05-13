import {
    ArrowLeft,
    Calendar,
    Clock,
    CreditCard,
    Download,
    ExternalLink,
    FileText,
    MapPin,
    MoreHorizontal,
    RefreshCw,
    Shield,
    User,
    Car,
    CheckCircle,
    XCircle,
    AlertTriangle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import paymentSvc from "@/pages/payment/payment.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { capitalify, datify, initialify, timefy } from "@/lib/utils"

export interface IRideLocation {
    name: string;
    coordinates: [number, number];
    type: 'Point';
    latitude?: number;    // only present in dropOffLocation
    longitude?: number;   // only present in dropOffLocation
    _id?: string;         // only present in dropOffLocation
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: 'customer' | 'rider' | string;
    phone: string;
    image?: string;
    createdAt: string | null;
}

export interface IRide {
    _id: string;
    userId: IUser;
    pickUpLocation: IRideLocation;
    dropOffLocation: IRideLocation;
    fare: number;
    rider: IUser;
    createdAt: string | null;
    updatedAt: string | null;
    distance: number;
    distanceTime: number;


}

export interface Payment {
    _id: string;
    rideId: IRide;
    amount: number;
    paymentMethod: 'cash' | 'online' | string;
    data: any; // nullable, define more specifically if needed
    status: 'active' | 'inactive' | 'pending' | string;
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: string | null;
    updatedAt: string | null;


    __v: number;
}


export default function PaymentDetailsPage() {


    const [transaction, setTransaction] = useState<Payment | null>(null)
    const { id } = useParams()

    const fetchTransactionDetail = async (id: string) => {
        try {
            const response = await paymentSvc.getPaymentDetails(id)
            setTransaction(response.detail)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchTransactionDetail(id as string)

    }, [])



    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return (
                    <Badge className="flex items-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="flex items-center gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        <span>Pending</span>
                    </Badge>
                )
            case "failed":
                return (
                    <Badge className="flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        <XCircle className="h-3 w-3" />
                        <span>Failed</span>
                    </Badge>
                )
            case "refunded":
                return (
                    <Badge className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">
                        <RefreshCw className="h-3 w-3" />
                        <span>Refunded</span>
                    </Badge>
                )
            case "disputed":
                return (
                    <Badge className="flex items-center gap-1 bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Disputed</span>
                    </Badge>
                )
            default:
                return (
                    <Badge className="flex items-center gap-1 bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{status}</span>
                    </Badge>
                )
        }
    }

    const logs = [
        { timestamp: "2025-05-11T10:30:15Z", event: "Payment initiated", details: "User confirmed ride completion" },
        { timestamp: "2025-05-11T10:30:45Z", event: "Authorization requested", details: "Card authorization requested" },
        {
            timestamp: "2025-05-11T10:31:05Z",
            event: "Authorization approved",
            details: "Card issuer approved authorization",
        },
        { timestamp: "2025-05-11T10:31:35Z", event: "Capture initiated", details: "Payment capture initiated" },
        { timestamp: "2025-05-11T10:32:15Z", event: "Payment completed", details: "Payment successfully processed" },
    ]

    return (
        <>
            {/* Admin Payment Details Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header with back button */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Transactions
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payment Transaction Details</h1>
                                <p className="text-sm md:text-base text-muted-foreground">
                                    Transaction ID: #{transaction?._id.slice(-4)} • {datify(new Date(transaction?.createdAt ?? ''))}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                            size="sm"
                                        >
                                            Actions
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Issue Refund</DropdownMenuItem>
                                        <DropdownMenuItem>Mark as Disputed</DropdownMenuItem>
                                        <DropdownMenuItem>Resend Receipt</DropdownMenuItem>
                                        <DropdownMenuItem>Contact User</DropdownMenuItem>
                                        <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Summary */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Transaction Summary</CardTitle>
                                    <CardDescription>Payment details and status</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-xl font-bold">Nrs {transaction?.amount.toFixed(2)}</div>
                                    {getStatusBadge("completed")}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Transaction Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Transaction Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Transaction Type</span>
                                            <span className="text-sm font-medium">Ride Payment</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Created At</span>
                                            <span className="text-sm font-medium">{datify(new Date(transaction?.createdAt ?? ""))}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Processed At</span>
                                            <span className="text-sm font-medium">{timefy(new Date(transaction?.createdAt ?? ""))}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Payment Processor</span>
                                            <span className="text-sm font-medium">{transaction?.rideId.userId.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Processor ID</span>
                                            <span className="text-sm font-medium font-mono">
                                                {transaction?._id.slice(-4)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Processing Fee</span>
                                            <span className="text-sm font-medium">Nrs {transaction?.amount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Payment Method</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">Card Type</span>
                                                <span className="text-sm font-medium">
                                                    {capitalify(transaction?.paymentMethod ?? '')} ••••
                                                    {/* {transaction.paymentMethod.last4} */}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Expiry</span>
                                            <span className="text-sm font-medium">
                                                {transaction?.paymentMethod}
                                                {/* /{transaction.paymentMethod.expiryYear} */}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Country</span>
                                            <span className="text-sm font-medium">Nepal</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Issuing Bank</span>
                                            <span className="text-sm font-medium">Esewa Wallet</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fare Breakdown */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Fare Breakdown</h3>
                                    <div className="bg-muted/30 rounded-lg p-4">
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-sm">Base Fare</span>
                                                <span className="text-sm font-medium">Nrs {((transaction?.amount ?? 0) * 0.7).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Tax</span>
                                                <span className="text-sm font-medium">Nrs {((transaction?.amount ?? 0) * 0.1).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Service Fee</span>
                                                <span className="text-sm font-medium">Nrs {((transaction?.amount ?? 0) * 0.2).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Tip</span>
                                                <span className="text-sm font-medium">Nrs {0}</span>
                                            </div>
                                            <Separator className="my-2" />
                                            <div className="flex justify-between">
                                                <span className="text-sm font-medium">Total</span>
                                                <span className="text-base font-bold">Nrs {((transaction?.amount.toFixed(2)) ?? 0)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Ride, User, Driver, and Logs */}
                    <Tabs defaultValue="ride" className="w-full">
                        <TabsList className="grid grid-cols-4 w-full max-w-md">
                            <TabsTrigger value="ride">Ride Details</TabsTrigger>
                            <TabsTrigger value="user">User</TabsTrigger>
                            <TabsTrigger value="driver">Driver</TabsTrigger>
                            <TabsTrigger value="logs">Transaction Logs</TabsTrigger>
                        </TabsList>

                        {/* Ride Details Tab */}
                        <TabsContent value="ride" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Ride Information</CardTitle>
                                    <CardDescription>Details about the associated ride</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                        <div className="text-sm text-muted-foreground">{transaction?.rideId.pickUpLocation.name}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium">Dropoff Location</div>
                                                        <div className="text-sm text-muted-foreground">{transaction?.rideId.dropOffLocation.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Ride ID</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId._id.slice(-4)}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Distance</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.distance ?? 0} km</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Duration</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.distanceTime ?? 0} min</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Ride Time</span>
                                                    <span className="text-sm font-medium">
                                                        {timefy(new Date(transaction?.rideId.createdAt ?? ''))} - {timefy(new Date(transaction?.updatedAt ?? ''))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        View Full Ride Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* User Tab */}
                        <TabsContent value="user" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>User Information</CardTitle>
                                    <CardDescription>Details about the passenger</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                                <AvatarImage src={transaction?.rideId.userId.image} className="h-full w-full object-cover" />

                                                <AvatarFallback className="text-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    {initialify(transaction?.rideId.rider.name ?? '')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-lg font-medium">{transaction?.rideId.userId.name}</div>
                                                <div className="text-sm text-muted-foreground">User ID: {transaction?.rideId.userId._id.slice(-4)}</div>
                                                <Badge
                                                    variant="outline"
                                                    className="mt-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                >
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    {capitalify(transaction?.rideId.userId.role ?? '')}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Email</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.userId.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Phone</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.userId.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Account Created</span>
                                                    <span className="text-sm font-medium">{datify(new Date(transaction?.rideId.userId.createdAt ?? ''))}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Total Rides</span>
                                                    <span className="text-sm font-medium">{Math.floor(Math.random()) * 100}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        View User Profile
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Driver Tab */}
                        <TabsContent value="driver" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Driver Information</CardTitle>
                                    <CardDescription>Details about the driver</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                                <AvatarImage src={transaction?.rideId.rider.image} className="h-full w-full object-cover" />
                                                <AvatarFallback className="text-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                    {initialify(transaction?.rideId.rider.name ?? '')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="text-lg font-medium">{transaction?.rideId.rider.name}</div>
                                                <div className="text-sm text-muted-foreground">Driver ID: {transaction?.rideId.rider._id.slice(-4)}</div>
                                                <Badge
                                                    variant="outline"
                                                    className="mt-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                >
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    {capitalify(transaction?.rideId.rider.role ?? '')}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Email</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.rider.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Phone</span>
                                                    <span className="text-sm font-medium">{transaction?.rideId.rider.phone}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Account Created</span>
                                                    <span className="text-sm font-medium">{datify(new Date(transaction?.rideId.rider.createdAt ?? ''))}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Total Rides</span>
                                                    <span className="text-sm font-medium">{Math.floor(Math.random() * 100)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <ExternalLink className="h-4 w-4" />
                                        View Driver Profile
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        {/* Transaction Logs Tab */}
                        <TabsContent value="logs" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Transaction Logs</CardTitle>
                                    <CardDescription>Detailed payment processing logs</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative pl-8 space-y-6">
                                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                                        {logs?.map((log, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute left-[-30px] top-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{log.event}</span>
                                                    <span className="text-xs text-muted-foreground">{datify(new Date(log.timestamp)) + "at" + timefy(new Date(log.timestamp))}</span>
                                                    <span className="text-sm mt-1">{log.details}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Admin Actions */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all bg-muted/30">
                        <CardHeader className="pb-2">
                            <CardTitle>Admin Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <RefreshCw className="h-4 w-4" />
                                    Issue Refund
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <AlertTriangle className="h-4 w-4" />
                                    Mark as Disputed
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <FileText className="h-4 w-4" />
                                    Resend Receipt
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <User className="h-4 w-4" />
                                    Contact User
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Car className="h-4 w-4" />
                                    Contact Driver
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/10"
                                >
                                    <XCircle className="h-4 w-4" />
                                    Flag Transaction
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}

function Mail({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}

function Phone({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}
