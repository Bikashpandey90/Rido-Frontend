import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ActivityCard } from "@/components/recent-activity/recent-activity-card"
import {
    Calendar,
    CheckCircle2,
    Edit,
    MapPin,
    MessageSquare,
    Phone,
    Shield,
    Star,
    UserIcon,
    Car,
    CreditCard,
    Bell,
    Clock,
    TrendingUp,
    Award,
    Zap,
} from "lucide-react"

export default function ProfilePage() {
    // Note: Removed useNavigate and auth context for Next.js compatibility
    // In a real app, you'd use Next.js authentication methods
    const loggedInUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "San Francisco, CA",
        image: "/placeholder.svg?height=112&width=112",
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-2">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                {/* Profile Header - Large Card */}
                <Card className="overflow-hidden border-none shadow-lg">
                    <div className="h-24 sm:h-32 bg-gradient-to-r from-rose-100 to-teal-100"></div>
                    <CardContent className="p-0 ">
                        <div className="relative px-4 sm:px-6 pb-6">
                            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 border-4 border-background absolute -top-10 sm:-top-14 ring-2 ring-muted/10">
                                <AvatarImage src={loggedInUser?.image || "/placeholder.svg"} alt="User" />
                                <AvatarFallback className="text-xl sm:text-2xl">JD</AvatarFallback>
                            </Avatar>

                            <div className="pt-12 sm:ml-32 sm:pt-4 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold">{loggedInUser?.name}</h1>
                                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                        <MapPin className="h-4 w-4" />
                                        <span>{loggedInUser?.address}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm" className="gap-1 rounded-full px-4">
                                        <Edit className="h-4 w-4" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                        <span className="sm:hidden">Edit</span>
                                    </Button>
                                    <Button size="sm" className="gap-1 rounded-full px-4">
                                        <Shield className="h-4 w-4" />
                                        <span className="hidden sm:inline">Verify ID</span>
                                        <span className="sm:hidden">Verify</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center mt-4 sm:ml-32">
                                <Badge variant="secondary" className="flex gap-1 items-center rounded-full px-3 py-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    4.9 Rating
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center rounded-full px-3 py-1">
                                    <Calendar className="h-3 w-3" />
                                    Member since Mar 2022
                                </Badge>
                                <Badge variant="outline" className="flex gap-1 items-center rounded-full px-3 py-1">
                                    <Shield className="h-3 w-3" />
                                    Verified Account
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* Personal Information - Spans 8 columns on large screens, 4 on medium */}
                    <Card className="md:col-span-4 lg:col-span-8 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <UserIcon className="h-5 w-5 text-rose-500" />
                                    Personal Information
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                                        <p className="font-medium">{loggedInUser?.name}</p>
                                    </div>

                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Date of Birth</h3>
                                        <p className="font-medium">April 15, 1985</p>
                                    </div>

                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Gender</h3>
                                        <p className="font-medium">Male</p>
                                    </div>
                                </div>

                                <div className="space-y-4 sm:space-y-5">
                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-medium">{loggedInUser?.email}</p>
                                            <Badge variant="outline" className="h-5 flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                Verified
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Phone Number</h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <p className="font-medium">{loggedInUser?.phone}</p>
                                            <Badge variant="outline" className="h-5 flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                Verified
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="bg-muted/30 p-3 sm:p-4 rounded-xl">
                                        <h3 className="text-sm font-medium text-muted-foreground mb-1">Language</h3>
                                        <p className="font-medium">English, Spanish</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Security - Spans 4 columns on large screens, 2 on medium */}
                    <Card className="md:col-span-2 lg:col-span-4 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-emerald-500" />
                                    Security
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Manage
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-muted/30 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="font-medium">Two-Factor Auth</h3>
                                        <p className="text-sm text-muted-foreground">Extra security</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 w-fit">
                                        Enabled
                                    </Badge>
                                </div>

                                <div className="bg-muted/30 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="font-medium">Password</h3>
                                        <p className="text-sm text-muted-foreground">Last updated 45 days ago</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="rounded-full w-fit">
                                        Change
                                    </Button>
                                </div>

                                <div className="bg-muted/30 p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <div>
                                        <h3 className="font-medium">Devices</h3>
                                        <p className="text-sm text-muted-foreground">3 active devices</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="rounded-full w-fit">
                                        View
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Card - Recent Rides and Reviews */}
                    <ActivityCard />

                    {/* Address Information - Spans 4 columns on large screens, 3 on medium */}
                    <Card className="md:col-span-3 lg:col-span-4 md:row-span-2 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                    Addresses
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-5 rounded-xl border border-blue-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium text-blue-700">Home Address</h3>
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">Primary</Badge>
                                    </div>
                                    <p className="mb-1 text-blue-900">123 Main Street, Apt 4B</p>
                                    <p className="mb-1 text-blue-900">San Francisco, CA 94105</p>
                                    <p className="text-blue-900">United States</p>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Work Address</h3>
                                    <p className="mb-1">456 Market Street, Floor 10</p>
                                    <p className="mb-1">San Francisco, CA 94103</p>
                                    <p>United States</p>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Favorite Locations</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <p>Golden Gate Park</p>
                                            <Badge variant="outline">Leisure</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>SFO Airport</p>
                                            <Badge variant="outline">Travel</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Ferry Building</p>
                                            <Badge variant="outline">Food</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ride Statistics - Spans 3 columns on medium screens, 4 on large */}
                    <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-teal-500" />
                                    Ride Statistics
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Clock className="h-4 w-4 mr-2" />
                                    History
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-xl border border-teal-100 flex flex-col items-center justify-center text-center">
                                    <div className="bg-teal-100 p-2 rounded-full mb-2">
                                        <Car className="h-5 w-5 text-teal-600" />
                                    </div>
                                    <p className="text-2xl font-bold text-teal-700">42</p>
                                    <p className="text-sm text-teal-600">Total Rides</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="bg-muted/50 p-2 rounded-full mb-2">
                                        <Award className="h-5 w-5" />
                                    </div>
                                    <p className="text-2xl font-bold">4.9</p>
                                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="bg-muted/50 p-2 rounded-full mb-2">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <p className="text-2xl font-bold">320</p>
                                    <p className="text-sm text-muted-foreground">Miles</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl flex flex-col items-center justify-center text-center">
                                    <div className="bg-muted/50 p-2 rounded-full mb-2">
                                        <CreditCard className="h-5 w-5" />
                                    </div>
                                    <p className="text-2xl font-bold">$567</p>
                                    <p className="text-sm text-muted-foreground">Total Spent</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ride Preferences - Spans 6 columns on medium screens, 8 on large */}
                    <Card className="md:col-span-6 lg:col-span-8 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Car className="h-5 w-5 text-violet-500" />
                                    Ride Preferences
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-violet-100 p-2 rounded-full">
                                            <Car className="h-5 w-5 text-violet-600" />
                                        </div>
                                        <h3 className="font-medium text-violet-700">Vehicle Type</h3>
                                    </div>
                                    <p className="text-violet-900 ml-9">Economy</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Bell className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Accessibility</h3>
                                    </div>
                                    <p className="ml-9">None specified</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <MessageSquare className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Ride Notes</h3>
                                    </div>
                                    <p className="ml-9">Prefer quiet rides, no music</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Communication Preferences - Spans full width */}
                    <Card className="md:col-span-6 lg:col-span-12 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Bell className="h-5 w-5 text-amber-500" />
                                    Communication Preferences
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-xl border border-amber-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-amber-100 p-2 rounded-full">
                                            <Car className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <h3 className="font-medium text-amber-700">Ride Updates</h3>
                                    </div>
                                    <p className="text-amber-900 ml-9">Email & SMS</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <CreditCard className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Promotions</h3>
                                    </div>
                                    <p className="ml-9">Email Only</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Account Updates</h3>
                                    </div>
                                    <p className="ml-9">Email & SMS</p>
                                </div>

                                <div className="bg-muted/30 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="bg-muted/50 p-2 rounded-full">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-medium">Driver Messages</h3>
                                    </div>
                                    <p className="ml-9">SMS Only</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Emergency Contact - Spans full width */}
                    <Card className="md:col-span-6 lg:col-span-12 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-4 sm:mb-5">
                                <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-red-500" />
                                    Emergency Contacts
                                </h2>
                                <Button variant="ghost" size="sm" className="rounded-full">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 sm:p-5 rounded-xl border border-red-100">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-medium text-red-700">Primary Contact</h3>
                                        <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Primary</Badge>
                                    </div>
                                    <p className="mb-1 text-red-900 font-medium">Jane Doe</p>
                                    <p className="mb-1 text-red-900">+1 (555) 987-6543</p>
                                    <p className="text-red-900 text-sm">Relationship: Spouse</p>
                                </div>

                                <div className="bg-muted/30 p-4 sm:p-5 rounded-xl">
                                    <h3 className="font-medium mb-3">Secondary Contact</h3>
                                    <p className="mb-1 font-medium">Robert Smith</p>
                                    <p className="mb-1">+1 (555) 456-7890</p>
                                    <p className="text-sm">Relationship: Brother</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
