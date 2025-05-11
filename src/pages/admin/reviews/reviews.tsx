import {
    Calendar,
    Download,
    MoreHorizontal,
    Star,
    MessageSquare,
    ThumbsUp,
    ThumbsDown,
    Flag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import reviewSvc from "@/pages/review/review.svc"
import { capitalify, datify, initialify, timefy } from "@/lib/utils"

interface User {
    _id: string;
    name: string;
    email: string;
    image?: string
    role?: string
}



interface LocationPoint {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
    name: string;
}

interface RideDetails {
    _id: string;
    pickUpLocation: LocationPoint;
    dropOffLocation: LocationPoint;
    fare: number;
    distance: number;
}

interface Review {
    _id: string;
    user: User;
    rider: User;
    rating: number;
    comment: string;
    ride: RideDetails;
    status: string;
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}


export default function ReviewPage() {


    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < +rating ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
            ))
    }

    const [reviews, setReviews] = useState<Review[]>([])

    const fetchReviews = async () => {
        try {
            const response = await reviewSvc.getReviews()
            setReviews(response.data)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchReviews()
    }, [])


    return (
        <>
            {/* Reviews Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reviews</h1>
                            <p className="text-sm md:text-base text-muted-foreground">Monitor and respond to customer feedback</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" size="sm" className="gap-1">
                                <Calendar className="h-4 w-4" />
                                Date Range
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                Generate Report
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Star className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.7/5.0</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+0.2</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">8,542</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12.5%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <ThumbsUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">92%</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+5%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Flag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">+2</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Rating Chart */}
                    {/* <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center border-b pb-4">
                            <div>
                                <CardTitle>Rating Trends</CardTitle>
                                <CardDescription>Monthly average ratings for the current year</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-8 gap-1 bg-white dark:bg-gray-950">
                                            This Year <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>This Year</DropdownMenuItem>
                                        <DropdownMenuItem>Last Year</DropdownMenuItem>
                                        <DropdownMenuItem>All Time</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button variant="outline" size="icon" className="h-8 w-8 bg-white dark:bg-gray-950">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pl-2 pt-6">
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={ratingData}
                                        margin={{
                                            top: 20,
                                            right: 30,
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
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12 }}
                                            domain={[3, 5]}
                                            ticks={[3, 3.5, 4, 4.5, 5]}
                                        />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "none",
                                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                background: "#fff",
                                            }}
                                            formatter={(value) => [`${value}/5`, "Average Rating"]}
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
                    </Card> */}

                    {/* Tabs and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <Tabs defaultValue="all" className="w-full md:w-auto">
                            <TabsList className="grid grid-cols-5 w-full md:w-auto">
                                <TabsTrigger value="all">All Reviews</TabsTrigger>
                                <TabsTrigger value="5star">5 Star</TabsTrigger>
                                <TabsTrigger value="4star">4 Star</TabsTrigger>
                                <TabsTrigger value="3star">3 Star</TabsTrigger>
                                <TabsTrigger value="low">1-2 Star</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Reviews</SelectItem>
                                    <SelectItem value="flagged">Flagged Reviews</SelectItem>
                                    <SelectItem value="replied">Replied</SelectItem>
                                    <SelectItem value="unreplied">Unreplied</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="highest">Highest Rating</SelectItem>
                                    <SelectItem value="lowest">Lowest Rating</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                        <div className="flex-shrink-0">
                                            <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                                <AvatarImage src={review.user?.image} className="h-full w-full object-cover" />

                                                <AvatarFallback
                                                    className={`text-white text-sm bg-gradient-to-br from-indigo-500 to-purple-600`}
                                                >
                                                    {initialify(review.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{review.user.name}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                            {capitalify(review.user.role ?? '')}
                                                        </Badge>

                                                        <Badge className="bg-green-100 text-green-700 hover:bg-red-100 dark:bg-green-900/30 dark:text-green-400">
                                                            Satisfied
                                                        </Badge>

                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="flex">{renderStars(review.rating)}</div>
                                                        <span className="text-sm text-muted-foreground">for ride #{review?.ride?._id}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Calendar className="h-3.5 w-3.5 mr-1" />
                                                    {datify(new Date(review.createdAt))} at {timefy(new Date(review.createdAt))}
                                                </div>
                                            </div>

                                            <p className="text-sm md:text-base">{review?.comment}</p>

                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                                            <span>{Math.floor(Math.random() * 100)}</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <ThumbsDown className="h-4 w-4 mr-1" />
                                                            <span>
                                                                {Math.abs(Math.floor(Math.random() * 100) - 50)}

                                                            </span>
                                                        </Button>
                                                    </div>

                                                    <Badge variant="outline" className="bg-muted">
                                                        Replied
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>Driver:</span>
                                                        <Avatar className="h-6 w-6">
                                                            <AvatarImage src={review.rider?.image} className="h-full w-full object-cover" />
                                                            <AvatarFallback className="text-xs bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                                                                {initialify(review.rider.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span>{review.rider.name}</span>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                                            <DropdownMenuItem>Reply to Review</DropdownMenuItem>
                                                            <DropdownMenuItem>Edit Reply</DropdownMenuItem>
                                                            <DropdownMenuItem>Flag Review</DropdownMenuItem>
                                                            <DropdownMenuItem>Remove Flag</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-red-600">Hide Review</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
                            <span className="font-medium">842</span> reviews
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
