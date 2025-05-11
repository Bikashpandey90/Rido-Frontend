import { Calendar, Download, Edit, Tag, ArrowLeft, Copy, Clock, BarChart3, MapPin, Car, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { useNavigate } from "react-router-dom"

export default function OfferDetailsPage() {
    // Sample offer data
    const navigate = useNavigate()
    const offer = {
        id: "OFF-1001",
        name: "Weekend Special",
        code: "WEEKEND25",
        type: "Percentage",
        value: 25,
        status: "Active",
        startDate: "2025-05-01",
        endDate: "2025-06-30",
        usageLimit: 1000,
        usageCount: 342,
        description: "25% off on all weekend rides. Valid for all users on Saturday and Sunday rides only.",
        minOrderValue: 15,
        maxDiscount: 50,
        userType: "All Users",
        createdBy: "Admin",
        createdAt: "2025-04-15",
        lastModified: "2025-04-28",
        termsAndConditions: [
            "Valid only on weekends (Saturday and Sunday)",
            "Minimum ride value of $15",
            "Maximum discount of $50",
            "Cannot be combined with other offers",
            "Valid for all ride types",
            "Limited to one use per customer per weekend",
        ],
    }

    // Sample usage data
    const usageData = [
        { name: "Week 1", value: 42 },
        { name: "Week 2", value: 58 },
        { name: "Week 3", value: 75 },
        { name: "Week 4", value: 89 },
        { name: "Week 5", value: 78 },
    ]

    // Sample redemption data
    const redemptionsByDay = [
        { name: "Mon", value: 12 },
        { name: "Tue", value: 18 },
        { name: "Wed", value: 15 },
        { name: "Thu", value: 20 },
        { name: "Fri", value: 25 },
        { name: "Sat", value: 120 },
        { name: "Sun", value: 132 },
    ]

    // Sample user segment data
    const userSegmentData = [
        { name: "New Users", value: 25 },
        { name: "Regular Users", value: 45 },
        { name: "Loyal Users", value: 30 },
    ]

    // Sample recent redemptions
    const recentRedemptions = [
        {
            id: "RED-7829",
            user: {
                name: "Emma Thompson",
                avatar: "ET",
            },
            rideId: "RID-8901",
            date: "Today",
            time: "10:30 AM",
            amount: 42.75,
            discount: 10.69,
            location: "Downtown",
        },
        {
            id: "RED-7830",
            user: {
                name: "Alex Johnson",
                avatar: "AJ",
            },
            rideId: "RID-8902",
            date: "Today",
            time: "09:15 AM",
            amount: 35.5,
            discount: 8.88,
            location: "Airport",
        },
        {
            id: "RED-7831",
            user: {
                name: "Sophia Martinez",
                avatar: "SM",
            },
            rideId: "RID-8903",
            date: "Yesterday",
            time: "05:30 PM",
            amount: 28.4,
            discount: 7.1,
            location: "Uptown",
        },
        {
            id: "RED-7832",
            user: {
                name: "Daniel Johnson",
                avatar: "DJ",
            },
            rideId: "RID-8904",
            date: "Yesterday",
            time: "02:15 PM",
            amount: 52.6,
            discount: 13.15,
            location: "Suburbs",
        },
    ]

    // Colors for pie chart
    const COLORS = ["#6366f1", "#a855f7", "#ec4899", "#8b5cf6"]

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Active
                    </Badge>
                )
            case "Scheduled":
                return (
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                        Scheduled
                    </Badge>
                )
            case "Expired":
                return (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-400">
                        Expired
                    </Badge>
                )
            default:
                return (
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                        {status}
                    </Badge>
                )
        }
    }

    return (
        <>
            {/* Offer Details Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header with back button */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1"
                                onClick={() => {
                                    navigate(-1)
                                }}>
                                <ArrowLeft className="h-4 w-4" />
                                Back to Offers
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{offer.name}</h1>
                                <p className="text-sm md:text-base text-muted-foreground">{offer.description}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Copy className="h-4 w-4" />
                                    Duplicate
                                </Button>
                                <Button variant="outline" size="sm" className="gap-1">
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                    size="sm"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit Offer
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Offer Summary Card */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="pb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <CardTitle>Offer Summary</CardTitle>
                                    <CardDescription>Key details and performance metrics</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-mono text-sm bg-muted">
                                        {offer.code}
                                    </Badge>
                                    {getStatusBadge(offer.status)}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Offer Details */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Offer Details</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Type</span>
                                            <span className="text-sm font-medium">{offer.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Value</span>
                                            <span className="text-sm font-medium">
                                                {offer.type === "Percentage" ? `${offer.value}%` : `$${offer.value}`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Min Order</span>
                                            <span className="text-sm font-medium">${offer.minOrderValue}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Max Discount</span>
                                            <span className="text-sm font-medium">${offer.maxDiscount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">User Type</span>
                                            <span className="text-sm font-medium">{offer.userType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Validity */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Validity</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">Start Date</span>
                                                <span className="text-sm font-medium">{formatDate(offer.startDate)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">End Date</span>
                                                <span className="text-sm font-medium">{formatDate(offer.endDate)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">Created</span>
                                                <span className="text-sm font-medium">{formatDate(offer.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div className="flex flex-col">
                                                <span className="text-sm text-muted-foreground">Last Modified</span>
                                                <span className="text-sm font-medium">{formatDate(offer.lastModified)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage */}
                                <div className="space-y-4 md:col-span-2">
                                    <h3 className="text-sm font-medium">Usage</h3>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-sm">
                                                <span>Redemptions</span>
                                                <span className="font-medium">
                                                    {offer.usageCount} / {offer.usageLimit}
                                                </span>
                                            </div>
                                            <Progress value={(offer.usageCount / offer.usageLimit) * 100} className="h-2" />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <Card className="bg-muted/30 border-none">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-muted-foreground">Total Redemptions</span>
                                                        <span className="text-xl font-bold">{offer.usageCount}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card className="bg-muted/30 border-none">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-muted-foreground">Total Discount</span>
                                                        <span className="text-xl font-bold">$4,275.50</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card className="bg-muted/30 border-none">
                                                <CardContent className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-muted-foreground">Avg. Discount</span>
                                                        <span className="text-xl font-bold">$12.50</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tabs for Analytics, Redemptions, and Terms */}
                    <Tabs defaultValue="analytics" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
                            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                        </TabsList>

                        {/* Analytics Tab */}
                        <TabsContent value="analytics" className="space-y-6 mt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Usage Trend */}
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Weekly Usage Trend</CardTitle>
                                        <CardDescription>Redemptions over the past 5 weeks</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                    data={usageData}
                                                    margin={{
                                                        top: 20,
                                                        right: 20,
                                                        left: 0,
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <defs>
                                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            borderRadius: "8px",
                                                            border: "none",
                                                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                            background: "#fff",
                                                        }}
                                                        formatter={(value) => [`${value}`, "Redemptions"]}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke="#6366f1"
                                                        strokeWidth={2}
                                                        fillOpacity={1}
                                                        fill="url(#colorValue)"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Redemptions by Day */}
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Redemptions by Day</CardTitle>
                                        <CardDescription>Distribution across days of the week</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[250px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={redemptionsByDay}
                                                    margin={{
                                                        top: 20,
                                                        right: 20,
                                                        left: 0,
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                    <Tooltip
                                                        contentStyle={{
                                                            borderRadius: "8px",
                                                            border: "none",
                                                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                            background: "#fff",
                                                        }}
                                                        formatter={(value) => [`${value}`, "Redemptions"]}
                                                    />
                                                    <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* User Segments */}
                            <Card className="border-none shadow-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-base">User Segments</CardTitle>
                                    <CardDescription>Distribution of redemptions by user type</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="flex items-center justify-center h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={userSegmentData}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                        labelLine={false}
                                                    >
                                                        {userSegmentData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        contentStyle={{
                                                            borderRadius: "8px",
                                                            border: "none",
                                                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                            background: "#fff",
                                                        }}
                                                        formatter={(value) => [`${value}%`, "Percentage"]}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="md:col-span-2 space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                {userSegmentData.map((segment, index) => (
                                                    <Card key={index} className="bg-muted/30 border-none">
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className="w-3 h-3 rounded-full"
                                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                                ></div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-sm text-muted-foreground">{segment.name}</span>
                                                                    <span className="text-lg font-bold">{segment.value}%</span>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium">Key Insights</h4>
                                                <ul className="space-y-1 text-sm">
                                                    <li className="flex items-start gap-2">
                                                        <div className="rounded-full bg-indigo-100 p-1 mt-0.5">
                                                            <BarChart3 className="h-3 w-3 text-indigo-600" />
                                                        </div>
                                                        <span>Regular users account for the highest redemption rate at 45%</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="rounded-full bg-indigo-100 p-1 mt-0.5">
                                                            <BarChart3 className="h-3 w-3 text-indigo-600" />
                                                        </div>
                                                        <span>Weekend redemptions are 5x higher than weekday usage</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="rounded-full bg-indigo-100 p-1 mt-0.5">
                                                            <BarChart3 className="h-3 w-3 text-indigo-600" />
                                                        </div>
                                                        <span>New user acquisition through this offer is trending upward</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Redemptions Tab */}
                        <TabsContent value="redemptions" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div>
                                        <CardTitle className="text-base">Recent Redemptions</CardTitle>
                                        <CardDescription>Latest offer usage details</CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Download className="h-4 w-4" />
                                        Export All
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-lg border shadow-sm overflow-hidden">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-muted/50">
                                                        <th className="text-left py-3 px-4 font-medium text-sm">ID</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">User</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">Ride ID</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">Date & Time</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">Location</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                                                        <th className="text-left py-3 px-4 font-medium text-sm">Discount</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {recentRedemptions.map((redemption) => (
                                                        <tr key={redemption.id} className="hover:bg-muted/30">
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm font-medium">{redemption.id}</span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                                                                        <AvatarFallback className="text-white text-xs bg-gradient-to-br from-indigo-500 to-purple-600">
                                                                            {redemption.user.avatar}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <span className="text-sm">{redemption.user.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm">{redemption.rideId}</span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                                    <span className="text-sm">{redemption.date}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1 mt-1">
                                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                                    <span className="text-xs text-muted-foreground">{redemption.time}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                                                    <span className="text-sm">{redemption.location}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm font-medium">${redemption.amount.toFixed(2)}</span>
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                                    -${redemption.discount.toFixed(2)}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{" "}
                                        <span className="font-medium">342</span> redemptions
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" disabled>
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>

                            {/* Redemption Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Top Locations</CardTitle>
                                        <CardDescription>Most popular redemption areas</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Downtown</span>
                                                </div>
                                                <span className="text-sm font-medium">124 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Airport</span>
                                                </div>
                                                <span className="text-sm font-medium">87 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Uptown</span>
                                                </div>
                                                <span className="text-sm font-medium">65 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Suburbs</span>
                                                </div>
                                                <span className="text-sm font-medium">42 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Shopping Mall</span>
                                                </div>
                                                <span className="text-sm font-medium">24 uses</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Ride Types</CardTitle>
                                        <CardDescription>Distribution by service type</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Car className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Standard</span>
                                                </div>
                                                <span className="text-sm font-medium">185 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Car className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Premium</span>
                                                </div>
                                                <span className="text-sm font-medium">87 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Car className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">XL</span>
                                                </div>
                                                <span className="text-sm font-medium">45 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Car className="h-4 w-4 text-indigo-600" />
                                                    <span className="text-sm">Pool</span>
                                                </div>
                                                <span className="text-sm font-medium">25 uses</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-md">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-base">Top Users</CardTitle>
                                        <CardDescription>Most frequent redeemers</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            ET
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">Emma Thompson</span>
                                                </div>
                                                <span className="text-sm font-medium">8 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            AJ
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">Alex Johnson</span>
                                                </div>
                                                <span className="text-sm font-medium">7 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            SM
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">Sophia Martinez</span>
                                                </div>
                                                <span className="text-sm font-medium">6 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            DJ
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">Daniel Johnson</span>
                                                </div>
                                                <span className="text-sm font-medium">5 uses</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarFallback className="text-xs bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            OW
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-sm">Olivia Wilson</span>
                                                </div>
                                                <span className="text-sm font-medium">4 uses</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        {/* Terms & Conditions Tab */}
                        <TabsContent value="terms" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Terms & Conditions</CardTitle>
                                    <CardDescription>Rules and restrictions for this offer</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {offer.termsAndConditions.map((term, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="rounded-full bg-indigo-100 p-1 mt-0.5">
                                                    <Tag className="h-3 w-3 text-indigo-600" />
                                                </div>
                                                <span className="text-sm">{term}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline" size="sm" className="gap-1">
                                        <Edit className="h-4 w-4" />
                                        Edit Terms
                                    </Button>
                                </CardFooter>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Offer History</CardTitle>
                                    <CardDescription>Changes and modifications</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-indigo-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <p className="text-sm font-medium">Admin updated offer details</p>
                                                    <p className="text-xs text-muted-foreground">April 28, 2025 at 2:15 PM</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">Changed maximum discount from $40 to $50</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-indigo-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <p className="text-sm font-medium">Admin updated terms and conditions</p>
                                                    <p className="text-xs text-muted-foreground">April 20, 2025 at 11:30 AM</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Added "Limited to one use per customer per weekend"
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-indigo-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                    <p className="text-sm font-medium">Admin created offer</p>
                                                    <p className="text-xs text-muted-foreground">April 15, 2025 at 9:45 AM</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">Created "Weekend Special" offer</p>
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
