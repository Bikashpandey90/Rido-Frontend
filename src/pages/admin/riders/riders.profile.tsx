import {
    Mail,
    Phone,
    Calendar,
    MapPin,
    Star,
    Shield,
    Car,
    Clock,
    Zap,
    ThumbsUp,
    MessageSquare,
    ChevronRight,
    FileText,
    CheckCircle,
    AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DriverProfilePage() {
    // Sample driver data
    const driver = {
        id: "DRV-1001",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        phone: "+1 (555) 987-6543",
        joinDate: "2022-03-10",
        location: "San Francisco, CA",
        avatar: "AJ",
        avatarUrl: "/placeholder.svg?height=200&width=200",
        verified: true,
        rating: 4.8,
        totalRides: 1245,
        completionRate: 98,
        acceptanceRate: 95,
        cancellationRate: 2,
        vehicle: {
            make: "Toyota",
            model: "Camry",
            year: 2021,
            color: "Silver",
            licensePlate: "ABC123",
            type: "Standard",
        },
        documents: {
            license: {
                verified: true,
                expiry: "2026-05-15",
            },
            insurance: {
                verified: true,
                expiry: "2025-12-31",
            },
            backgroundCheck: {
                verified: true,
                date: "2022-03-05",
            },
        },
        earnings: {
            today: 145.75,
            week: 875.5,
            month: 3250.25,
            total: 45750.8,
        },
        achievements: [
            { name: "1000+ Rides", icon: "Award", date: "2024-02-15" },
            { name: "Top Rated Driver", icon: "Star", date: "2023-11-20" },
            { name: "Perfect Week", icon: "CheckCircle", date: "2025-04-28" },
        ],
    }

    // Sample recent rides
    const recentRides = [
        {
            id: "RID-7829",
            date: "Today",
            time: "10:30 AM",
            from: "123 Main St",
            to: "SFO Airport",
            passenger: {
                name: "Emma Thompson",
                avatar: "ET",
                rating: 4.9,
            },
            amount: 42.75,
            status: "Completed",
        },
        {
            id: "RID-7825",
            date: "Today",
            time: "8:15 AM",
            from: "456 Market St",
            to: "Golden Gate Park",
            passenger: {
                name: "Michael Davis",
                avatar: "MD",
                rating: 4.7,
            },
            amount: 28.5,
            status: "Completed",
        },
        {
            id: "RID-7820",
            date: "Yesterday",
            time: "5:45 PM",
            from: "Fisherman's Wharf",
            to: "Union Square",
            passenger: {
                name: "Sophia Martinez",
                avatar: "SM",
                rating: 4.8,
            },
            amount: 18.25,
            status: "Completed",
        },
    ]

    // Sample reviews
    const reviews = [
        {
            id: "REV-1001",
            passenger: {
                name: "Emma Thompson",
                avatar: "ET",
            },
            rating: 5,
            comment:
                "Alex was very professional and got me to my destination ahead of schedule. The car was clean and comfortable.",
            date: "May 10, 2025",
        },
        {
            id: "REV-1002",
            passenger: {
                name: "Michael Davis",
                avatar: "MD",
            },
            rating: 4,
            comment: "Good driver, safe and efficient. Car was a bit warm but otherwise a pleasant ride.",
            date: "May 8, 2025",
        },
        {
            id: "REV-1003",
            passenger: {
                name: "Sophia Martinez",
                avatar: "SM",
            },
            rating: 5,
            comment: "Excellent service! Alex was friendly and the ride was smooth. Would definitely ride with him again.",
            date: "May 5, 2025",
        },
    ]

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    }

    // Render stars
    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
            ))
    }

    return (
        <>
            {/* Driver Profile Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Driver Profile</h1>
                            <p className="text-sm md:text-base text-muted-foreground">View driver information and performance</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" size="sm" className="gap-1">
                                <MessageSquare className="h-4 w-4" />
                                Contact Driver
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                size="sm"
                            >
                                <FileText className="h-4 w-4" />
                                View Full Report
                            </Button>
                        </div>
                    </div>

                    {/* Profile Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Driver Info Card */}
                        <Card className="border-none shadow-md hover:shadow-lg transition-all lg:col-span-1">
                            <CardHeader className="pb-2 text-center relative">
                                <div className="flex flex-col items-center">
                                    <Avatar className="h-24 w-24 border-4 border-white shadow-md mb-4">
                                        <AvatarImage src={driver.avatarUrl || "/placeholder.svg"} alt={driver.name} />
                                        <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                            {driver.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-xl">{driver.name}</CardTitle>
                                    <div className="flex items-center gap-1 mt-1">
                                        {renderStars(Math.round(driver.rating))}
                                        <span className="text-sm font-medium ml-1">{driver.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <Badge
                                            variant="outline"
                                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                        >
                                            <Shield className="h-3 w-3 mr-1" />
                                            Verified Driver
                                        </Badge>
                                    </div>
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
                                            <span className="text-sm font-medium">{driver.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Phone</span>
                                            <span className="text-sm font-medium">{driver.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Driver Since</span>
                                            <span className="text-sm font-medium">{formatDate(driver.joinDate)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                            <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground">Location</span>
                                            <span className="text-sm font-medium">{driver.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Stats and Vehicle Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{driver.totalRides}</span>
                                            <span className="text-sm text-muted-foreground">Total Rides</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{driver.completionRate}%</span>
                                            <span className="text-sm text-muted-foreground">Completion Rate</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <ThumbsUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{driver.acceptanceRate}%</span>
                                            <span className="text-sm text-muted-foreground">Acceptance Rate</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                                                <AlertCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                            </div>
                                            <span className="text-2xl font-bold">{driver.cancellationRate}%</span>
                                            <span className="text-sm text-muted-foreground">Cancellation Rate</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Vehicle Info */}
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Vehicle Information</CardTitle>
                                    <CardDescription>Current registered vehicle details</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Make & Model</span>
                                                    <span className="text-sm font-medium">
                                                        {driver.vehicle.make} {driver.vehicle.model}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Year</span>
                                                    <span className="text-sm font-medium">{driver.vehicle.year}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">License Plate</span>
                                                    <span className="text-sm font-medium">{driver.vehicle.licensePlate}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                                    <Car className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-muted-foreground">Type & Color</span>
                                                    <span className="text-sm font-medium">
                                                        {driver.vehicle.type}, {driver.vehicle.color}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Tabs for Earnings, Reviews, and Documents */}
                    <Tabs defaultValue="earnings" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="earnings">Earnings</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>

                        {/* Earnings Tab */}
                        <TabsContent value="earnings" className="space-y-6 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="text-sm text-muted-foreground mb-1">Today</div>
                                            <div className="text-2xl font-bold">${driver.earnings.today.toFixed(2)}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="text-sm text-muted-foreground mb-1">This Week</div>
                                            <div className="text-2xl font-bold">${driver.earnings.week.toFixed(2)}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="text-sm text-muted-foreground mb-1">This Month</div>
                                            <div className="text-2xl font-bold">${driver.earnings.month.toFixed(2)}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="text-sm text-muted-foreground mb-1">All Time</div>
                                            <div className="text-2xl font-bold">${driver.earnings.total.toFixed(2)}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Recent Rides</CardTitle>
                                            <CardDescription>Latest completed trips</CardDescription>
                                        </div>
                                        <Button variant="link" size="sm" className="gap-1">
                                            View All <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentRides.map((ride) => (
                                            <div
                                                key={ride.id}
                                                className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                        <AvatarFallback className="text-white text-xs bg-gradient-to-br from-indigo-500 to-purple-600">
                                                            {ride.passenger.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">{ride.from}</span>
                                                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-sm font-medium">{ride.to}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{ride.date}</span>
                                                            <Clock className="h-3 w-3 ml-1" />
                                                            <span>{ride.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-medium">${ride.amount.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Reviews Tab */}
                        <TabsContent value="reviews" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Customer Reviews</CardTitle>
                                    <CardDescription>Feedback from passengers</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                        <AvatarFallback className="text-white text-xs bg-gradient-to-br from-indigo-500 to-purple-600">
                                                            {review.passenger.avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm font-medium">{review.passenger.name}</span>
                                                            <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                                                        <div className="text-xs text-muted-foreground mt-2">{formatDate(review.date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Documents Tab */}
                        <TabsContent value="documents" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader className="pb-2">
                                    <CardTitle>Driver Documents</CardTitle>
                                    <CardDescription>Verification status and expiry dates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                <span className="text-sm font-medium">Driver's License</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {driver.documents.license.verified ? (
                                                    <>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                        >
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            Expires: {formatDate(driver.documents.license.expiry)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <Badge variant="destructive">Not Verified</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                <span className="text-sm font-medium">Insurance</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {driver.documents.insurance.verified ? (
                                                    <>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                        >
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            Expires: {formatDate(driver.documents.insurance.expiry)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <Badge variant="destructive">Not Verified</Badge>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                <span className="text-sm font-medium">Background Check</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {driver.documents.backgroundCheck.verified ? (
                                                    <>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
                                                        >
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                            Verified
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">
                                                            Completed: {formatDate(driver.documents.backgroundCheck.date)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <Badge variant="destructive">Not Verified</Badge>
                                                )}
                                            </div>
                                        </div>
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
