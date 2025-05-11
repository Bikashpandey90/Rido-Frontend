import {
    Calendar,
    Download,
    MoreHorizontal,
    Tag,
    Ticket,
    Gift,
    Users,
    Percent,
    Search,
    Plus,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { datify } from "@/lib/utils"
import { useEffect, useState } from "react"
import offerSvc from "@/pages/offers/offer.service"
import { useNavigate } from "react-router-dom"

export interface Offer {
    _id: string;
    code: string;
    description: string;
    discountType: 'flat' | 'percent';
    discountValue: number;
    maxDiscount: number;
    minRideAmount: number;
    usageLimit: number;
    usedCount: number;
    title: string;
    startDate: string;      // ISO date string
    expiryDate: string;     // ISO date string
    status: 'active' | 'inactive';  // add more statuses if applicable
    createdBy: string;
    updatedBy: string | null;
    createdAt: string;      // ISO date string
    updatedAt: string;      // ISO date string
    __v: number;
}


export default function OffersVouchersPage() {


    const navigate = useNavigate()

    const [offers, setOffers] = useState<Offer[]>([])

    const fetchOffers = async () => {
        try {
            const response = await offerSvc.listAllOffers()
            setOffers(response.detail)


        } catch (exception) {
            console.log(exception)
        }

    }
    useEffect(() => {
        fetchOffers()
    }, [])

    // const usageData = [
    //     { name: "Jan", value: 1250 },
    //     { name: "Feb", value: 1080 },
    //     { name: "Mar", value: 1510 },
    //     { name: "Apr", value: 1480 },
    //     { name: "May", value: 1690 },
    //     { name: "Jun", value: 0 },
    //     { name: "Jul", value: 0 },
    //     { name: "Aug", value: 0 },
    //     { name: "Sep", value: 0 },
    //     { name: "Oct", value: 0 },
    //     { name: "Nov", value: 0 },
    //     { name: "Dec", value: 0 },
    // ]

    const getStatusBadge = (status: String) => {
        switch (status) {
            case "active":
                return (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Active
                    </Badge>
                )
            case "scheduled":
                return (
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400">
                        Scheduled
                    </Badge>
                )
            case "inactive":
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
            {/* Offers & Vouchers Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Offers & Vouchers</h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Manage promotional offers and discount vouchers
                            </p>
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
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1">
                                <Plus className="h-4 w-4" />
                                Create Offer
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Tag className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+3</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Redemptions</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Ticket className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">8,073</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+15.2%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Discount Value</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Gift className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">$42,589</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8.7%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <Percent className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">24.8%</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+2.1%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Usage Chart */}
                    {/* <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center border-b pb-4">
                            <div>
                                <CardTitle>Voucher Usage</CardTitle>
                                <CardDescription>Monthly redemptions for the current year</CardDescription>
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
                                        data={usageData}
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
                    </Card> */}

                    {/* Tabs and Search */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <Tabs defaultValue="all" className="w-full md:w-auto">
                            <TabsList className="grid grid-cols-4 w-full md:w-auto">
                                <TabsTrigger value="all">All Offers</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                                <TabsTrigger value="expired">Expired</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative w-full sm:w-[280px]">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input type="search" placeholder="Search offers..." className="w-full pl-8 bg-white dark:bg-gray-950" />
                            </div>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Most Recent</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="usage-high">Highest Usage</SelectItem>
                                    <SelectItem value="usage-low">Lowest Usage</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Offers Grid */}
                    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {offers.map((offer) => (
                            <Card key={offer._id} className="border-none shadow-sm hover:shadow-md transition-all overflow-hidden">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{offer.title}</CardTitle>
                                            <CardDescription className="mt-1">{offer.description}</CardDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        navigate(`update/${offer._id}`)
                                                    }}
                                                >Edit Offer</DropdownMenuItem>
                                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                                {offer.status === "active" && <DropdownMenuItem>Deactivate</DropdownMenuItem>}
                                                {offer.status === "inactive" && <DropdownMenuItem>Activate</DropdownMenuItem>}
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="pb-3">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="font-mono bg-muted">
                                                    {offer.code}
                                                </Badge>
                                                {getStatusBadge(offer.status)}
                                            </div>
                                            <div className="text-lg font-bold">
                                                {offer.discountType === "percent" ? `${offer.discountValue}%` : `Nrs ${offer.discountValue}`}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>Start: {datify(new Date(offer.startDate))}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <span>End: {datify(new Date(offer.expiryDate))}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <span>
                                                    All Users
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Tag className="h-4 w-4 text-muted-foreground" />
                                                <span>Min: Nrs {offer.minRideAmount}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-sm">
                                                <span>Usage</span>
                                                <span className="font-medium">
                                                    {offer.usedCount} / {offer.usageLimit}
                                                </span>
                                            </div>
                                            <Progress value={(offer.usedCount / offer.usageLimit) * 100} className="h-2" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="outline" size="sm" className="w-full"
                                        onClick={() => {
                                            navigate(`details/${offer._id}`)
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
                            <span className="font-medium">12</span> offers
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
