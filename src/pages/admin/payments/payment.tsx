import {
    ArrowDown,
    ArrowUp,
    Calendar,
    ChevronDown,
    CreditCard,
    DollarSign,
    Download,
    MoreHorizontal,
    Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useEffect, useState } from "react"
import paymentSvc from "@/pages/payment/payment.service"
import { capitalify, datify, initialify, timefy } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

export interface Payment {
    _id: string;
    rideId: Ride;
    amount: number;
    paymentMethod: string;
    data: any; // or you can define a specific type if known
    status: 'active' | 'inactive';
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface Ride {
    _id: string;
    pickUpLocation: Location;
    dropOffLocation: Location;
    userId: User;
    fare: number;
    rider: User;
}

export interface Location {
    name: string;
    coordinates: [number, number];
    type: 'Point';
}


export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string
    role: string
}




export default function PaymentsPage() {



    const revenueData = [
        { name: "Jan", value: 12500 },
        { name: "Feb", value: 10800 },
        { name: "Mar", value: 15100 },
        { name: "Apr", value: 14800 },
        { name: "May", value: 16900 },
        { name: "Jun", value: 18300 },
        { name: "Jul", value: 19800 },
        { name: "Aug", value: 18500 },
        { name: "Sep", value: 17900 },
        { name: "Oct", value: 16400 },
        { name: "Nov", value: 15800 },
        { name: "Dec", value: 17200 },
    ]

    const [transactions, setTransaction] = useState<Payment[]>([])
    const fetchPayments = async () => {
        try {
            const response = await paymentSvc.getAllPayments()
            setTransaction(response.detail)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchPayments()
    }, [])

    const navigate = useNavigate()

    return (
        <>
            {/* Payments Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Payments</h1>
                            <p className="text-sm md:text-base text-muted-foreground">
                                Manage transactions and financial operations
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
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                Process Payouts
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <DollarSign className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">$152,431.89</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+15.3%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Incoming</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <ArrowDown className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">$98,752.30</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8.2%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Outgoing</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <ArrowUp className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">$53,679.59</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12.5%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                    <CreditCard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">$12,845.50</div>
                                <div className="mt-1 flex items-center">
                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">+2.3%</span>
                                    <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Revenue Chart */}
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center border-b pb-4">
                            <div>
                                <CardTitle>Revenue Overview</CardTitle>
                                <CardDescription>Monthly revenue for the current year</CardDescription>
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
                                        data={revenueData}
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
                                            formatter={(value) => [`$${value}`, "Revenue"]}
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

                    {/* Tabs and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <Tabs defaultValue="all" className="w-full md:w-auto">
                            <TabsList className="grid grid-cols-4 w-full md:w-auto">
                                <TabsTrigger value="all">All Transactions</TabsTrigger>
                                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Payment Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Methods</SelectItem>
                                    <SelectItem value="credit">Credit Card</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="apple">Apple Pay</SelectItem>
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
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    <div className="rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted/50">
                                        <th className="text-left py-3 px-4 font-medium text-sm">Transaction ID</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">User</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Type</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Method</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Date & Time</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {transactions.map((transaction) => (
                                        <tr key={transaction._id} className="hover:bg-muted/30">
                                            <td className="py-3 px-4">
                                                <span className="text-sm font-medium">TRNX-{transaction._id.slice(-4)}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-7 w-7 border-2 border-white shadow-sm">
                                                        <AvatarImage src={transaction.rideId.userId.image} className="h-full w-full object-cover" />
                                                        <AvatarFallback
                                                            className={`text-white text-xs ${transaction.rideId.userId.role === "rider"
                                                                ? "bg-gradient-to-br from-purple-500 to-pink-600"
                                                                : "bg-gradient-to-br from-indigo-500 to-purple-600"
                                                                }`}
                                                        >
                                                            {initialify(transaction.rideId.userId.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="text-sm">{transaction.rideId.userId.name}</p>
                                                        <p className="text-xs text-muted-foreground">{'User'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm">{'Ride Payment'}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div
                                                    className="flex items-center gap-1 font-medium  text-emerald-600 dark:text-emerald-400"

                                                >

                                                    <ArrowDown className="h-3.5 w-3.5" />
                                                    {/* ) : (
                                                        <ArrowUp className="h-3.5 w-3.5" />
                                                    )} */}
                                                    <span className="text-sm"> Nrs {transaction.amount.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm">{capitalify(transaction.paymentMethod)}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-sm">{datify(new Date(transaction?.createdAt ?? ''))}</span>
                                                </div>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">{timefy(new Date(transaction?.createdAt ?? ''))}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                // : transaction.status === "ongoing"
                                                //     ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"
                                                //     : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                // }`}
                                                >
                                                    Paid
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => [
                                                                navigate('details/' + transaction._id)
                                                            ]}
                                                        >View Details</DropdownMenuItem>
                                                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                                                        {/* {transaction.status === "processing" && (
                                                            <DropdownMenuItem>Expedite Processing</DropdownMenuItem>
                                                        )}
                                                        {transaction.status === "failed" && (
                                                            <DropdownMenuItem>Retry Transaction</DropdownMenuItem>
                                                        )} */}
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
                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
                            <span className="font-medium">156</span> transactions
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
                </div >
            </main >
        </>
    )
}
