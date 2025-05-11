import {
    Download,
    Filter,
    MoreHorizontal,
    Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import rideSvc from "@/pages/rides/rides.service"
import { capitalify,  shortifyTwo } from "@/lib/utils"
interface Vehicle {
    vehicleType: string;
    model: string;
    plateNumber: string;
    registrationNumber: string;
}

interface Rider {
    _id: string;
    name: string;
    image?: string
    email: string;
    role: string;
    phone: string;
    address: string;
    isVerified: boolean;
    isAvailable: boolean;
    nid: number;
    location: any; // You can change 'any' to a more specific type if location data structure is known
    status: string;
    createdBy: string | null;
    updatedBy: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
    vehicle: Vehicle;
}


export default function DriversPage() {




    const [drivers, setDrivers] = useState<Rider[]>([])


    const fetchRiders = async () => {
        try {
            const response = await rideSvc.fetchRiders()
            setDrivers(response.detail)
        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchRiders()
    }, [])

    return (
        <>
            {/* Drivers Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Drivers</h1>
                            <p className="text-sm md:text-base text-muted-foreground">Manage and monitor your driver fleet</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" size="sm" className="gap-1">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="outline" size="sm" className="gap-1">
                                <Download className="h-4 w-4" />
                                Export
                            </Button>
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                Add New Driver
                            </Button>
                        </div>
                    </div>

                    {/* Tabs and Filters */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <Tabs defaultValue="all" className="w-full md:w-auto">
                            <TabsList className="grid grid-cols-3 w-full md:w-auto">
                                <TabsTrigger value="all">All Drivers</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="downtown">Downtown</SelectItem>
                                    <SelectItem value="westside">Westside</SelectItem>
                                    <SelectItem value="eastside">Eastside</SelectItem>
                                    <SelectItem value="northside">Northside</SelectItem>
                                    <SelectItem value="southside">Southside</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Name</SelectItem>
                                    <SelectItem value="rating">Rating</SelectItem>
                                    <SelectItem value="rides">Rides</SelectItem>
                                    <SelectItem value="earnings">Earnings</SelectItem>
                                    <SelectItem value="date">Join Date</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Drivers Table */}
                    <div className="rounded-lg border shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-muted/50">
                                        <th className="text-left py-3 px-4 font-medium text-sm">Driver</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Vehicle</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Rating</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Rides</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Earnings</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Location</th>
                                        <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {drivers.map((driver) => (
                                        <tr key={driver._id} className="hover:bg-muted/30">
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                                        <AvatarImage src={driver?.image} className="h-full w-full object-cover" />
                                                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                            {driver.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium text-sm">{driver.name}</p>
                                                        <p className="text-xs text-muted-foreground">{driver.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="text-sm">{shortifyTwo(driver.vehicle.model, 2)}</p>
                                                <p className="text-xs text-muted-foreground">{driver.vehicle.plateNumber}</p>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    className={`${driver.status === "active"
                                                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : driver.status === "inactive"
                                                            ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                            : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                        }`}
                                                >
                                                    {capitalify(driver.status)}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                                    <span className="text-sm">{(Math.random() * (5 - 4) + 4).toFixed(1)}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm">{Math.floor(Math.random() * 1000)}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm">Nrs {Math.floor(Math.random() * 10000)}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm">{driver.address.split(',')[0]}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                                        <DropdownMenuItem>View Rides</DropdownMenuItem>
                                                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                        {driver.status === "active" ? (
                                                            <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                                                        ) : (
                                                            <DropdownMenuItem className="text-emerald-600">Activate</DropdownMenuItem>
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
                            Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{" "}
                            <span className="font-medium">100</span> drivers
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
            </main></>
    )
}
