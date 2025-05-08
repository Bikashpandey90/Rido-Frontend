import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Calendar, MessageSquare, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { NavLink } from "react-router-dom"
import reviewSvc from "./review.svc"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/context/auth.context"

export interface Review {
    _id: string,
    user: string,
    rider: {
        name: string,
        image: string
    },
    rating: number,
    comment: string,
    ride: {
        pickUpLocation: {
            name: string
        },
        dropOffLocation: {
            name: string
        }
    },
    createdAt: string

}
export default function ReviewsPage() {

    const [reviews, setReviews] = useState<Review[]>([])

    const fetchReviews = async () => {
        try {
            const response = await reviewSvc.getReviews()
            setReviews(response.data)
            console.log(response.data)

        } catch (exeption) {
            console.log(exeption)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const auth = useContext(AuthContext) as { loggedInUser: any }


    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-2 sm:p-4 md:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 sm:h-9 sm:w-9">
                        <NavLink to={`/${auth.loggedInUser.role}/profile`}>
                            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="sr-only">Back to profile</span>
                        </NavLink>
                    </Button>
                    <h1 className="text-xl sm:text-2xl font-bold">Your Reviews</h1>
                </div>

                {/* Reviews from Drivers */}
                {/* <Card className="border-none shadow-md">
                    <CardHeader className="pb-2 px-3 sm:px-6 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <CardTitle className="text-lg">Reviews from Drivers</CardTitle>
                            <div className="flex items-center gap-1 bg-muted/40 px-2 sm:px-3 py-1 rounded-full w-fit">
                                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium text-sm">4.9</span>
                                <span className="text-xs sm:text-sm text-muted-foreground ml-1">average</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                       

                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 sm:p-4 rounded-xl border border-yellow-100">
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-yellow-200 shrink-0">
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Driver" />
                                        <AvatarFallback>MK</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h3 className="font-medium text-amber-800 text-sm sm:text-base">Michael K.</h3>
                                            <Badge className="bg-yellow-100 text-amber-700 hover:bg-yellow-200 text-xs h-5">Driver</Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center text-amber-700 gap-1">
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                            </div>
                                            <span className="text-xs ml-1">
                                                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 inline mr-1" />
                                                May 2, 2025
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-amber-700 mt-1 sm:mt-0">
                                    <span className="text-xs">Downtown to Airport</span>
                                </div>
                            </div>

                            <div className="mt-3 sm:pl-13">
                                <p className="text-amber-800 italic text-xs sm:text-sm">
                                    "Great passenger, very friendly and on time for pickup. Would be happy to drive again!"
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 sm:mt-4">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                                            <span className="text-xs sm:text-sm text-amber-700">Punctual</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                                            <span className="text-xs sm:text-sm text-amber-700">Friendly</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                                            <span className="text-xs sm:text-sm text-amber-700">Respectful</span>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-amber-700 border-amber-200 hover:bg-amber-100 text-xs h-8 w-full sm:w-auto"
                                    >
                                        <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                        Reply
                                    </Button>
                                </div>
                            </div>
                        </div>

                    
                        <div className="bg-muted/30 p-3 sm:p-4 rounded-xl border border-muted">
                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Driver" />
                                        <AvatarFallback>SL</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <h3 className="font-medium text-sm sm:text-base">Sarah L.</h3>
                                            <Badge variant="outline" className="text-xs h-5">
                                                Driver
                                            </Badge>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1">
                                            <div className="flex">
                                                {[...Array(4)].map((_, i) => (
                                                    <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400" />
                                                ))}
                                                <Star className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-muted stroke-muted-foreground" />
                                            </div>
                                            <span className="text-xs ml-1 text-muted-foreground">
                                                <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 inline mr-1" />
                                                April 30, 2025
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground mt-1 sm:mt-0">
                                    <span className="text-xs">Home to Office</span>
                                </div>
                            </div>

                            <div className="mt-3 sm:pl-13">
                                <p className="italic text-xs sm:text-sm">
                                    "Good passenger overall. Clear communication about pickup location."
                                </p>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 sm:mt-4">
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                                            <span className="text-xs sm:text-sm">Clear</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                                            <span className="text-xs sm:text-sm">On time</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <ThumbsDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
                                            <span className="text-xs sm:text-sm">Quiet</span>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="text-xs h-8 w-full sm:w-auto">
                                        <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                        Reply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card> */}

                <Separator />

                {/* Reviews You've Given */}
                <Card className="border-none shadow-md">
                    <CardHeader className="pb-2 px-3 sm:px-6 pt-4">
                        <CardTitle className="text-lg">Reviews You've Given</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 px-3 sm:px-6 pb-4 sm:pb-6">
                        {/* Review 1 */}
                        {
                            reviews.map((review, index) => (
                                <div className="bg-muted/30 p-3 sm:p-4 rounded-xl border border-muted" key={index}>
                                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
                                                <AvatarImage src={review?.rider?.image} alt="Driver" />
                                                <AvatarFallback>MK</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center flex-wrap gap-2">
                                                    <h3 className="font-medium text-sm sm:text-base">{review?.rider?.name}</h3>
                                                    <Badge variant="outline" className="text-xs h-5">
                                                        Driver
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-1">
                                                    <div className="flex">
                                                        {[...Array(review?.rating)].map((_, i) => (
                                                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                        {[...Array(5 - +review?.rating)].map((_, i) => (
                                                            <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-muted stroke-muted-foreground" />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs ml-1 text-muted-foreground">
                                                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3 inline mr-1" />
                                                        May 2, 2025
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground mt-1 sm:mt-0">
                                            <span className="text-xs">{review?.ride?.pickUpLocation?.name.split(" ").slice(0, 2).join(" ")}{' '} to{' '}{review?.ride?.dropOffLocation?.name.split(" ").slice(0, 2).join(" ")} </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 sm:pl-13">
                                        <p className="italic text-xs sm:text-sm">"{review?.comment}!"</p>

                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 sm:mt-4">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                                <div className="flex items-center gap-1">
                                                    <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                                                    <span className="text-xs sm:text-sm">Professional</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                                                    <span className="text-xs sm:text-sm">On time</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                                                    <span className="text-xs sm:text-sm">Clean car</span>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline" className="text-xs h-8 w-full sm:w-auto">
                                                <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
