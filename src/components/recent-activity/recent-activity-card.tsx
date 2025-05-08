import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AuthContext } from "@/context/auth.context"
import { datify, shortify } from "@/lib/utils"
import { Review } from "@/pages/review/review-page"
import reviewSvc from "@/pages/review/review.svc"
import { RideData } from "@/pages/rides/rides-page"
import rideSvc from "@/pages/rides/rides.service"
import { Car, ChevronRight, Star } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

export function ActivityCard() {

    const [reviews, setReviews] = useState<Review[]>([])
    const [rides, setRides] = useState<RideData[]>([])

    const fetchReviews = async () => {
        try {
            const response = await reviewSvc.getReviews()
            setReviews(response.data)

        } catch {
            console.log("Error fetching reviews")
        }
    }
    const fetchRides = async () => {
        try {
            const response = await rideSvc.getRides()
            setRides(response.detail)

        } catch (exception) {
            console.log("Error fetching rides")
        }
    }
    useEffect(() => {
        fetchReviews()
        fetchRides()

    }, [])
    const auth = useContext(AuthContext) as { loggedInUser: any }

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
                                <NavLink to={`/${auth.loggedInUser.role}/rides`} className="flex items-center gap-1 text-sm">
                                    See all
                                    <ChevronRight className="h-4 w-4" />
                                </NavLink>
                            </Button>
                        </div>

                        {
                            rides.slice(0, 3).map((ride, index) => (
                                <div className="space-y-3" key={index}>
                                    <div className="bg-muted/30 p-3 rounded-lg">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-teal-100 p-1.5 rounded-full">
                                                    <Car className="h-3.5 w-3.5 text-teal-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{shortify(ride?.pickUpLocation?.name, 1)} to {shortify(ride?.dropOffLocation?.name, 1)}</p>
                                                    <p className="text-xs text-muted-foreground">{datify(new Date(ride?.createdAt))} • Nrs{' '}{ride?.fare}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm ml-1">4.9</span>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            ))
                        }
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
                                <NavLink to={`/${auth.loggedInUser.role}/reviews`} className="flex items-center gap-1 text-sm">
                                    See all
                                    <ChevronRight className="h-4 w-4" />
                                </NavLink>
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {
                                reviews.slice(0, 2).map((review, index) => (
                                    <div className="bg-muted/30 p-3 rounded-lg" key={index}>
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={review?.rider?.image} alt="Driver" />
                                                    <AvatarFallback>
                                                        {review?.rider?.name
                                                            ?.split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{review?.rider?.name}</p>
                                                    <div className="flex items-center">
                                                        {[...Array(review?.rating)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                                                            />
                                                        ))}
                                                        {[...Array(5 - +review?.rating)].map((_, i) => (
                                                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-muted stroke-muted-foreground" />
                                                        ))}
                                                        <span className="text-xs ml-1 text-muted-foreground">{datify(new Date(review?.createdAt))}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm mt-2 pl-10">{review?.comment}!</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card >
    )
}
