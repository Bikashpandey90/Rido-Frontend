import {
    ArrowLeft,
    Calendar,
    Car,
    CreditCard,
    Download,
    Edit,
    ExternalLink,
    FileText,
    Flag,
    Lock,
    Mail,
    MapPin,
    MoreHorizontal,
    Phone,
    Shield,
    Star,
    UserCheck,
    UserX,
    AlertTriangle,
    CheckCircle,
    Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { datify, initialify } from "@/lib/utils"
import { useEffect, useState } from "react"
import authSvc from "@/pages/auth/auth.service"
import { useNavigate, useParams } from "react-router-dom"
import { User } from "@/components/sidebar/sidebar"

export default function AdminUserInfoPage() {
    // Sample user data
    // const user = {
    //     id: "USR-1001",
    //     name: "Emma Thompson",
    //     email: "emma.thompson@example.com",
    //     phone: "+1 (555) 123-4567",
    //     joinDate: "2023-06-15T00:00:00Z",
    //     location: "San Francisco, CA",
    //     avatar: "ET",
    //     avatarUrl: "/placeholder.svg?height=200&width=200",
    //     status: "Active",

    // }
    const verificationStatus = {
        email: true,
        phone: true,
        identity: true,
    }
    const stats = {
        totalRides: 87,
        cancelledRides: 3,
        totalSpent: 1245.5,
        avgRating: 4.9,
    }
    const paymentMethods = [
        {
            id: "pm-1",
            type: "Credit Card",
            brand: "Visa",
            last4: "4242",
            expiry: "05/26",
            default: true,
        },
        {
            id: "pm-2",
            type: "PayPal",
            email: "emma.thompson@example.com",
            default: false,
        },
    ]
    const recentRides = [
        {
            id: "RID-7829",
            date: "2025-05-11T10:30:00Z",
            from: "123 Main St, San Francisco, CA",
            to: "SFO Airport, San Francisco, CA",
            amount: 42.75,
            status: "Completed",
        },
        {
            id: "RID-7825",
            date: "2025-05-10T17:45:00Z",
            from: "456 Market St, San Francisco, CA",
            to: "123 Main St, San Francisco, CA",
            amount: 18.5,
            status: "Completed",
        },
        {
            id: "RID-7820",
            date: "2025-05-08T08:15:00Z",
            from: "123 Main St, San Francisco, CA",
            to: "456 Market St, San Francisco, CA",
            amount: 15.25,
            status: "Completed",
        },
    ]
    const recentTransactions = [
        {
            id: "TRX-7829",
            date: "2025-05-11T10:30:00Z",
            type: "Ride Payment",
            amount: 42.75,
            status: "Completed",
        },
        {
            id: "TRX-7825",
            date: "2025-05-10T17:45:00Z",
            type: "Ride Payment",
            amount: 18.5,
            status: "Completed",
        },
        {
            id: "TRX-7820",
            date: "2025-05-08T08:15:00Z",
            type: "Ride Payment",
            amount: 15.25,
            status: "Completed",
        },
    ]
    const notes = [
        {
            id: "note-1",
            date: "2025-04-20T14:30:00Z",
            author: "Admin",
            content: "User contacted support about a missing receipt for ride RID-7800. Issue resolved.",
        },
        {
            id: "note-2",
            date: "2025-03-15T09:45:00Z",
            author: "System",
            content: "Identity verification completed successfully.",
        },
    ]
    const activityLog = [
        {
            id: "log-1",
            timestamp: "2025-05-11T10:30:00Z",
            event: "Completed ride",
            details: "Ride ID: RID-7829",
        },
        {
            id: "log-2",
            timestamp: "2025-05-10T17:45:00Z",
            event: "Completed ride",
            details: "Ride ID: RID-7825",
        },
        {
            id: "log-3",
            timestamp: "2025-05-08T08:15:00Z",
            event: "Completed ride",
            details: "Ride ID: RID-7820",
        },
        {
            id: "log-4",
            timestamp: "2025-05-05T12:30:00Z",
            event: "Updated payment method",
            details: "Added new credit card",
        },
        {
            id: "log-5",
            timestamp: "2025-04-20T14:30:00Z",
            event: "Contacted support",
            details: "Issue with missing receipt",
        },
    ]

    const [user, setUser] = useState<User | null>(null)

    const { id } = useParams();
    const fetchUserDetails = async (id: string) => {
        try {
            const response = await authSvc.getUserDetails(id)
            setUser(response.detail)


        } catch (exception) {
            console.log(exception);
        }
    }

    useEffect(() => {
        fetchUserDetails(id as string)
    }, [])

    const navigate = useNavigate()



    // Get status badge
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="flex items-center gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <CheckCircle className="h-3 w-3" />
                        <span>Active</span>
                    </Badge>
                )
            case "inactive":
                return (
                    <Badge className="flex items-center gap-1 bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Suspended</span>
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="flex items-center gap-1 bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        <span>Pending</span>
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

    return (
        <>
            {/* Admin User Info Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header with back button */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1" onClick={() => {
                                navigate(-1)
                            }}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Users
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">User Profile</h1>
                                <p className="text-sm md:text-base text-muted-foreground">
                                    User ID: USR-{user?._id.slice(-4)} • Joined {datify(new Date(user?.createdAt ?? ''))}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Export Data
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
                                        <DropdownMenuItem>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Send Email
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Lock className="h-4 w-4 mr-2" />
                                            Reset Password
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <UserCheck className="h-4 w-4 mr-2" />
                                            Verify Identity
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-amber-600">
                                            <Flag className="h-4 w-4 mr-2" />
                                            Flag Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            <UserX className="h-4 w-4 mr-2" />
                                            Suspend Account
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>

                    {/* User Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* User Info Card */}
                        <Card className="border-none shadow-md hover:shadow-lg transition-all lg:col-span-1">
                            <CardHeader className="pb-2 text-center relative">
                                <div className="absolute right-4 top-4">{getStatusBadge(user?.status ?? '')}</div>
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-24 w-24 border-4 border-white shadow-md mb-4">
                                        <AvatarFallback className="text-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                            {initialify(user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-xl">{user?.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-1">
                                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span>{user?.address}</span>
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Email</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium">{user?.email}</span>
                                                {verificationStatus.email && (
                                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Phone</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium">{user?.phone}</span>
                                                {verificationStatus.phone && (
                                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Member Since</span>
                                            <span className="text-sm font-medium">{datify(new Date(user?.createdAt ?? ''))}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Identity Verification</span>
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-medium">
                                                    {verificationStatus.identity ? "Verified" : "Not Verified"}
                                                </span>
                                                {verificationStatus.identity && (
                                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-center pt-2">
                                <Button variant="outline" className="w-full gap-1">
                                    <Edit className="h-4 w-4" />
                                    Edit User Information
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Stats and Quick Actions */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <Car className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{stats.totalRides}</span>
                                            <span className="text-sm text-muted-foreground">Total Rides</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{stats.avgRating}</span>
                                            <span className="text-sm text-muted-foreground">Average Rating</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">Nrs {stats.totalSpent.toFixed(2)}</span>
                                            <span className="text-sm text-muted-foreground">Total Spent</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <AlertTriangle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{stats.cancelledRides}</span>
                                            <span className="text-sm text-muted-foreground">Cancelled Rides</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Verification Status */}
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Verification Status</CardTitle>
                                            <CardDescription>Account verification progress</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium">Overall Verification</span>
                                                <span className="text-sm">
                                                    {Object.values(verificationStatus).filter(Boolean).length} of{" "}
                                                    {Object.values(verificationStatus).length} complete
                                                </span>
                                            </div>
                                            <Progress
                                                value={
                                                    (Object.values(verificationStatus).filter(Boolean).length /
                                                        Object.values(verificationStatus).length) *
                                                    100
                                                }
                                                className="h-2"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                    <span className="text-sm">Email</span>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={`${verificationStatus.email
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        } border-none`}
                                                >
                                                    {verificationStatus.email ? "Verified" : "Pending"}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                    <span className="text-sm">Phone</span>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={`${verificationStatus.phone
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        } border-none`}
                                                >
                                                    {verificationStatus.phone ? "Verified" : "Pending"}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                    <span className="text-sm">Identity</span>
                                                </div>
                                                <Badge
                                                    variant="outline"
                                                    className={`${verificationStatus.identity
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                        } border-none`}
                                                >
                                                    {verificationStatus.identity ? "Verified" : "Pending"}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Tabs for Rides, Payments, Activity, and Notes */}
                    <Tabs defaultValue="rides" className="w-full">
                        <TabsList className="grid grid-cols-4 w-full max-w-md">
                            <TabsTrigger value="rides">Rides</TabsTrigger>
                            <TabsTrigger value="payments">Payments</TabsTrigger>
                            <TabsTrigger value="activity">Activity Log</TabsTrigger>
                            <TabsTrigger value="notes">Admin Notes</TabsTrigger>
                        </TabsList>

                        {/* Rides Tab */}
                        <TabsContent value="rides" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Rides</CardTitle>
                                            <CardDescription>Latest trips taken by the user</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <ExternalLink className="h-4 w-4" />
                                            View All Rides
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentRides.map((ride) => (
                                            <div
                                                key={ride.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="space-y-2 sm:space-y-0">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                        <span className="text-sm font-medium">{ride.id}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className={`${ride.status === "Completed"
                                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                                                } border-none`}
                                                        >
                                                            {ride.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                                        <div className="text-sm text-muted-foreground">{datify(new Date(ride.date))}</div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {ride.from} → {ride.to}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                                                    <div className="text-sm font-medium">${ride.amount.toFixed(2)}</div>
                                                    <Button variant="ghost" size="sm" className="gap-1">
                                                        <ExternalLink className="h-4 w-4" />
                                                        Details
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Payments Tab */}
                        <TabsContent value="payments" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Payment Methods</CardTitle>
                                            <CardDescription>User's saved payment options</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {paymentMethods.map((method) => (
                                            <div
                                                key={method.id}
                                                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                        <CreditCard className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                    <div>
                                                        {method.type === "Credit Card" ? (
                                                            <>
                                                                <div className="text-sm font-medium">
                                                                    {method.brand} •••• {method.last4}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">Expires {method.expiry}</div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="text-sm font-medium">{method.type}</div>
                                                                <div className="text-xs text-muted-foreground">{method.email}</div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {method.default && (
                                                        <Badge variant="outline" className="bg-muted border-none">
                                                            Default
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Transactions</CardTitle>
                                            <CardDescription>Latest payment activity</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="gap-1">
                                            <ExternalLink className="h-4 w-4" />
                                            View All Transactions
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentTransactions.map((transaction) => (
                                            <div
                                                key={transaction.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="space-y-2 sm:space-y-0">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                        <span className="text-sm font-medium">{transaction.id}</span>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                        >
                                                            {transaction.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                                        <div className="text-sm text-muted-foreground">{datify(new Date(transaction.date))}</div>
                                                        <div className="text-sm text-muted-foreground">{transaction.type}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                                                    <div className="text-sm font-medium">${transaction.amount.toFixed(2)}</div>
                                                    <Button variant="ghost" size="sm" className="gap-1">
                                                        <ExternalLink className="h-4 w-4" />
                                                        Details
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Activity Log Tab */}
                        <TabsContent value="activity" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Activity Log</CardTitle>
                                    <CardDescription>Recent user activity and events</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="relative pl-8 space-y-6">
                                        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
                                        {activityLog.map((log) => (
                                            <div key={log.id} className="relative">
                                                <div className="absolute left-[-30px] top-0 h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{log.event}</span>
                                                    <span className="text-xs text-muted-foreground">{datify(new Date(log.timestamp))}</span>
                                                    <span className="text-sm mt-1">{log.details}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Admin Notes Tab */}
                        <TabsContent value="notes" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Admin Notes</CardTitle>
                                            <CardDescription>Internal notes about this user</CardDescription>
                                        </div>
                                        <Button
                                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                            size="sm"
                                        >
                                            Add Note
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {notes.map((note) => (
                                            <div key={note.id} className="p-4 rounded-lg border bg-card">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                                    <div className="font-medium">{note.author}</div>
                                                    <div className="text-sm text-muted-foreground">{datify(new Date(note.date))}</div>
                                                </div>
                                                <p className="text-sm">{note.content}</p>
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
                                    <Edit className="h-4 w-4" />
                                    Edit Profile
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Mail className="h-4 w-4" />
                                    Send Email
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Lock className="h-4 w-4" />
                                    Reset Password
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <UserCheck className="h-4 w-4" />
                                    Verify Identity
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/10"
                                >
                                    <Flag className="h-4 w-4" />
                                    Flag Account
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/10"
                                >
                                    <UserX className="h-4 w-4" />
                                    Suspend Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Support History */}
                    <Alert className="bg-muted border-none shadow-sm flex">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                            <AlertDescription>
                                <p className="font-medium">Support History</p>
                                <p className="text-sm mt-1">
                                    This user has contacted support 1 time in the past 30 days. Last contact was on April 20, 2025
                                    regarding a missing receipt.
                                </p>
                            </AlertDescription>
                        </div>
                    </Alert>
                </div>
            </main>
        </>
    )
}
