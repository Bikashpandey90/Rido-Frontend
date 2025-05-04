import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Car, ChevronRight, Star } from "lucide-react"
import { NavLink } from "react-router-dom"

export function ActivityCard() {
    return (
        <Card className="md:col-span-3 lg:col-span-4 overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Your Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
                <div className="space-y-4">
                    {/* Recent Rides Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-medium flex items-center gap-2">
                                <Car className="h-4 w-4 text-teal-500" />
                                Recent Rides
                            </h3>
                            <Button variant="ghost" size="sm" asChild>
                                <NavLink to="/rides" className="flex items-center gap-1 text-sm">
                                    See all
                                    <ChevronRight className="h-4 w-4" />
                                </NavLink>
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-muted/30 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-teal-100 p-1.5 rounded-full">
                                            <Car className="h-3.5 w-3.5 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Downtown to Airport</p>
                                            <p className="text-xs text-muted-foreground">May 2, 2025 • $24.50</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm ml-1">4.9</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-teal-100 p-1.5 rounded-full">
                                            <Car className="h-3.5 w-3.5 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">Home to Office</p>
                                            <p className="text-xs text-muted-foreground">April 30, 2025 • $18.75</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm ml-1">5.0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Your Reviews Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-medium flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-500" />
                                Your Reviews
                            </h3>
                            <Button variant="ghost" size="sm" asChild>
                                <NavLink to="/reviews" className="flex items-center gap-1 text-sm">
                                    See all
                                    <ChevronRight className="h-4 w-4" />
                                </NavLink>
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-muted/30 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Driver" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">Michael K.</p>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                                                    />
                                                ))}
                                                <span className="text-xs ml-1 text-muted-foreground">May 2, 2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm mt-2 pl-10">Great driver, very professional and on time!</p>
                            </div>

                            <div className="bg-muted/30 p-3 rounded-lg">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Driver" />
                                            <AvatarFallback>SL</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">Sarah L.</p>
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-3 w-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                                                    />
                                                ))}
                                                <span className="text-xs ml-1 text-muted-foreground">April 30, 2025</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm mt-2 pl-10">Clean car and smooth ride. Would recommend!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
