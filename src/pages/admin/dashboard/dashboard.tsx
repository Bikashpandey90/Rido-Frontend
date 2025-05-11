
import {
    BarChart3,
    Car,
    ChevronDown,
    DollarSign,
    Download,
    Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"


const AdminDashBoard = () => {


    // Sample data for charts
    const areaChartData = [
        { name: "Jan", value: 4200 },
        { name: "Feb", value: 3800 },
        { name: "Mar", value: 5100 },
        { name: "Apr", value: 4800 },
        { name: "May", value: 5900 },
        { name: "Jun", value: 6300 },
        { name: "Jul", value: 6800 },
        { name: "Aug", value: 6500 },
        { name: "Sep", value: 5900 },
        { name: "Oct", value: 5400 },
        { name: "Nov", value: 4800 },
        { name: "Dec", value: 5200 },
    ]

    const barChartData = [
        { name: "Mon", value: 120 },
        { name: "Tue", value: 145 },
        { name: "Wed", value: 128 },
        { name: "Thu", value: 180 },
        { name: "Fri", value: 199 },
        { name: "Sat", value: 243 },
        { name: "Sun", value: 210 },
    ]

    const pieChartData = [
        { name: "Economy", value: 540, color: "#4f46e5" },
        { name: "Premium", value: 320, color: "#8b5cf6" },
        { name: "Luxury", value: 140, color: "#d946ef" },
    ]

    const recentRides = [
        {
            id: 1,
            name: "John Smith",
            route: "Downtown to Airport",
            amount: 25.5,
            status: "Completed",
            date: "Today",
        },
        {
            id: 2,
            name: "Emily Johnson",
            route: "Westside Mall to Riverside",
            amount: 32.75,
            status: "Pending",
            date: "Yesterday",
        },
        {
            id: 3,
            name: "Michael Brown",
            route: "Central Park to Harbor Heights",
            amount: 18.9,
            status: "Completed",
            date: "Yesterday",
        },
        {
            id: 4,
            name: "Sarah Wilson",
            route: "Tech District to Parkview",
            amount: 21.4,
            status: "Cancelled",
            date: "May 20, 2023",
        },
        {
            id: 5,
            name: "David Lee",
            route: "Meadow Gardens to City Center",
            amount: 29.6,
            status: "Completed",
            date: "May 19, 2023",
        },
    ]

    const topDrivers = [
        { id: 1, name: "Alex Johnson", vehicle: "Toyota Camry", rides: 125, rating: 92 },
        { id: 2, name: "Maria Garcia", vehicle: "Honda Civic", rides: 98, rating: 87 },
        { id: 3, name: "Robert Chen", vehicle: "Tesla Model 3", rides: 175, rating: 95 },
        { id: 4, name: "Priya Patel", vehicle: "Hyundai Sonata", rides: 85, rating: 78 },
    ]



    return (<>
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-sm md:text-base text-muted-foreground">
                        Welcome back, here's an overview of your ride-hailing operations.
                    </p>
                </div>

                {/* Stats Cards */}
                {/* Update the stats cards to use a consistent color scheme */}
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
                            <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                <Car className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">12,543</div>
                            <div className="mt-1 flex items-center">
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8.2%</span>
                                <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">573</div>
                            <div className="mt-1 flex items-center">
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12.5%</span>
                                <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="overflow-hidden border-none bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                                <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</div>
                            <div className="mt-1 flex items-center">
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+0.3</span>
                                <span className="ml-1 text-xs text-muted-foreground">from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-7">
                    <Card className="border-none shadow-md hover:shadow-lg transition-all lg:col-span-4">
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
                            <div className="h-[250px] md:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={areaChartData}
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

                    <Card className="border-none shadow-md hover:shadow-lg transition-all lg:col-span-3">
                        <CardHeader className="border-b pb-4">
                            <CardTitle>Ride Distribution</CardTitle>
                            <CardDescription>Distribution by service type</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="h-[250px] md:h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "none",
                                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                                background: "#fff",
                                            }}
                                        />
                                        <Legend />
                                    </RechartsPieChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Rides and Top Drivers */}
                <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center border-b pb-4">
                            <div>
                                <CardTitle>Recent Rides</CardTitle>
                                <CardDescription>Latest ride transactions</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto bg-white dark:bg-gray-950">
                                View All
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6 overflow-auto max-h-[400px]">
                            <div className="space-y-6">
                                {recentRides.map((ride) => (
                                    <div key={ride.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="border-2 border-white shadow-sm">
                                                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                    {ride.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{ride.name}</p>
                                                <p className="text-xs text-muted-foreground">{ride.route}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">${ride.amount.toFixed(2)}</p>
                                            <div className="flex items-center gap-1">
                                                <Badge
                                                    variant={
                                                        ride.status === "Completed"
                                                            ? "default"
                                                            : ride.status === "Pending"
                                                                ? "outline"
                                                                : "destructive"
                                                    }
                                                    className={`text-xs ${ride.status === "Completed"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : ride.status === "Pending"
                                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                            : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {ride.status}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{ride.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader className="flex flex-row items-center border-b pb-4">
                            <div>
                                <CardTitle>Top Drivers</CardTitle>
                                <CardDescription>Best performing drivers</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto bg-white dark:bg-gray-950">
                                View All
                            </Button>
                        </CardHeader>
                        <CardContent className="pt-6 overflow-auto max-h-[400px]">
                            <div className="space-y-6">
                                {topDrivers.map((driver) => (
                                    <div key={driver.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium">{driver.name}</p>
                                                <p className="text-xs text-muted-foreground">{driver.vehicle}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium">{driver.rides} rides</p>
                                                <p className="text-xs text-muted-foreground">{driver.rating}% Rating</p>
                                            </div>
                                        </div>
                                        <Progress
                                            value={driver.rating}
                                            // className="h-1.5 bg-gray-100 dark:bg-gray-800"
                                            className={`h-1.5 bg-gray-100 dark:bg-gray-800`}
                                            style={{
                                                background: `linear-gradient(to right, ${
                                                    driver.rating > 90
                                                        ? "#10b981, #059669"
                                                        : driver.rating > 80
                                                        ? "#6366f1, #4f46e5"
                                                        : "#f59e0b, #d97706"
                                                })`,
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Activity */}
                <Card className="border-none shadow-md hover:shadow-lg transition-all">
                    <CardHeader className="flex flex-row items-center border-b pb-4">
                        <div>
                            <CardTitle>Weekly Ride Activity</CardTitle>
                            <CardDescription>Number of rides per day</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto bg-white dark:bg-gray-950">
                            This Week
                        </Button>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barChartData}>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: "8px",
                                            border: "none",
                                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                                            background: "#fff",
                                        }}
                                    />
                                    <defs>
                                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main></>)
}
export default AdminDashBoard