
import { useContext, useState } from "react"
import {
    Bell,
    Car,
    CreditCard,
    LayoutDashboard,
    MapPin,
    Menu,
    MessageCircle,
    MessageSquare,
    Moon,
    Navigation,
    PanelLeftClose,
    Search,
    Settings,
    Sun,
    Ticket,
    Users,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { initialify } from "@/lib/utils"
import { AuthContext } from "@/context/auth.context"

export default function Dashboard() {
    const { theme, setTheme } = useTheme()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // In the toggleSidebar function, update to not automatically open on mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const auth = useContext(AuthContext) as { loggedInUser: any }
    const navigate = useNavigate()



    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-950 dark:to-indigo-950/30">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 z-50 flex flex-col bg-white dark:bg-gray-950 border-r shadow-md transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"
                    }`}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <div
                        className={`flex items-center ${isSidebarOpen ? "" : "justify-center w-full"} cursor-pointer`}
                        onClick={toggleSidebar}
                    >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                            <Navigation className="w-6 h-6 text-white" />
                        </div>
                        {isSidebarOpen && <span className="ml-2 text-lg font-semibold">RideX</span>}
                    </div>
                    {isSidebarOpen && (
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:flex">
                            <PanelLeftClose className="w-5 h-5" />
                        </Button>
                    )}
                </div>
                <div className="flex-1 overflow-auto">
                    <nav className="p-2">
                        {/* <div className={`mb-2 ${isSidebarOpen ? "px-3 py-2" : "py-2"}`}>
                            {isSidebarOpen ? (
                                <span className="text-xs font-semibold text-muted-foreground">MENU</span>
                            ) : (
                                <Separator className="my-2" />
                            )}
                        </div> */}
                        {/* Update the sidebar menu items to be larger with more space between */}
                        <div className="space-y-3">
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} bg-gradient-to-r from-indigo-50 to-indigo-50/50 dark:from-indigo-900/20 dark:to-indigo-900/10 text-indigo-700 dark:text-indigo-300 hover:text-indigo-800 dark:hover:text-indigo-200 h-11`}
                                onClick={() => {
                                    navigate('/admin')
                                }}
                            >
                                <LayoutDashboard className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                {isSidebarOpen && <span>Dashboard</span>}
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="riders">
                                    <Car className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Drivers</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="customers">
                                    <Users className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Passengers</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="rides">
                                    <Car className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Rides</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="payments">
                                    <CreditCard className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Payments</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="chats">
                                    <MessageCircle className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Messages</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="map">
                                    <MapPin className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Map Activity</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="offers">
                                    <Ticket className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Offers</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="reviews">
                                    <MessageSquare className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Reviews</span>}
                                </NavLink>
                            </Button>
                            <Button
                                variant="ghost"
                                className={`w-full justify-start ${!isSidebarOpen && "justify-center px-2"} h-11`}
                                asChild
                            >
                                <NavLink to="settings">
                                    <Settings className={`w-5 h-5 ${isSidebarOpen ? "mr-2" : ""}`} />
                                    {isSidebarOpen && <span>Settings</span>}
                                </NavLink>
                            </Button>
                        </div>
                    </nav>
                </div>
                <div className="p-4 border-t">
                    <div className="flex items-center">
                        <Avatar className="border-2 border-white shadow-sm">
                            <AvatarImage src={auth.loggedInUser.image} />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">{initialify(auth.loggedInUser.name)}</AvatarFallback>
                        </Avatar>
                        {isSidebarOpen && (
                            <div className="ml-3">
                                <p className="text-sm font-medium">John Doe</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            {/* Improve mobile responsiveness for the main content */}
            <div
                className={`flex-1 transition-all duration-300 p-4 md:p-6 ${isSidebarOpen ? "ml-0 md:ml-64" : "ml-0 md:ml-20"}`}
            >
                {/* Main Content Card */}
                <div className="bg-white dark:bg-gray-950 rounded-[24px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] dark:shadow-[0_20px_50px_rgba(0,_0,_0,_0.3)] overflow-hidden h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-16 border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
                        <div className="flex items-center md:hidden">
                            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                                <Menu className="w-5 h-5" />
                            </Button>
                        </div>
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="w-full pl-8 md:w-[300px] lg:w-[400px] bg-muted/30 border-muted focus-visible:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-medium text-white">
                                    5
                                </span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                                            <AvatarImage src={auth.loggedInUser.image} />
                                            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                                {initialify(auth.loggedInUser.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </header>

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
