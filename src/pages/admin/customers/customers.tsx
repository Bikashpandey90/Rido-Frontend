import { Button } from "@/components/ui/button"
import {
    Download,
    Filter,
    MoreHorizontal,

} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import chatSvc from "@/pages/chat/chat.svc"
import { User } from "@/components/sidebar/sidebar"
import { capitalify, datify } from "@/lib/utils"
import { useNavigate } from "react-router-dom"


const CustomerPage = () => {

    const [passengers, setPassengers] = useState<User[]>([])

    const fetchPassengers = async () => {
        try {
            const response = await chatSvc.listAllUsers()
            setPassengers(response.data)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchPassengers()
    }, [])

    const navigate = useNavigate()



    return (<>
        {/* Passengers Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Passengers</h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Manage your passenger accounts and activity
                        </p>
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
                    </div>
                </div>

                {/* Tabs and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                    <Tabs defaultValue="all" className="w-full md:w-auto">
                        <TabsList className="grid grid-cols-3 w-full md:w-auto">
                            <TabsTrigger value="all">All Passengers</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
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
                                <SelectItem value="paypal">PayPal</SelectItem>
                                <SelectItem value="apple">Apple Pay</SelectItem>
                                <SelectItem value="google">Google Pay</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="rides">Rides</SelectItem>
                                <SelectItem value="spent">Amount Spent</SelectItem>
                                <SelectItem value="date">Join Date</SelectItem>
                                <SelectItem value="last">Last Ride</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Passengers Table */}
                <div className="rounded-lg border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted/50">
                                    <th className="text-left py-3 px-4 font-medium text-sm">Passenger</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Rides</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Total Spent</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Payment Method</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Last Ride</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Join Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {passengers.map((passenger) => (
                                    <tr key={passenger._id} className="hover:bg-muted/30">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                                    <AvatarImage src={passenger?.image} className="h-full w-full object-cover" />

                                                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                        {passenger.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{passenger.name}</p>
                                                    <p className="text-xs text-muted-foreground">{passenger.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Badge
                                                className={`${passenger.status === "active"
                                                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    : passenger.status === "inactive"
                                                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                                                        : "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                                    }`}
                                            >
                                                {capitalify(passenger?.status ?? '')}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">{Math.floor(Math.random() * 100)}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">Nrs {Math.floor(Math.random() * 1000).toFixed(2)}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">Esewa</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">{datify(new Date(passenger.updatedAt ?? ''))}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className="text-sm">{datify(new Date(passenger.createdAt ?? ""))}</span>
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
                                                        onClick={() => {
                                                            navigate('profile/' + passenger._id)

                                                        }}
                                                    >View Profile</DropdownMenuItem>
                                                    <DropdownMenuItem>Ride History</DropdownMenuItem>
                                                    <DropdownMenuItem>Payment History</DropdownMenuItem>
                                                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                                                    {passenger.status === "active" ? (
                                                        <DropdownMenuItem className="text-amber-600">Deactivate</DropdownMenuItem>
                                                    ) : passenger.status === "inactive" ? (
                                                        <DropdownMenuItem className="text-emerald-600">Activate</DropdownMenuItem>
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
                        <span className="font-medium">120</span> passengers
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
        </main></>)
}
export default CustomerPage