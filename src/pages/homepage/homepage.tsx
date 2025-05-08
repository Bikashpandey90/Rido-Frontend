import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthContext } from "@/context/auth.context"
import { Car, MapPin, User } from "lucide-react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"


export default function Home() {

    const navigate = useNavigate()
    const auth = useContext(AuthContext) as { loggedInUser: any }
    return (
        <>

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Your Ride, Your Way
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Book a ride in seconds or become a driver and earn on your own schedule.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">

                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                                        if (auth.loggedInUser) {
                                            navigate(`/${auth.loggedInUser.role}`)
                                        } else {
                                            navigate('/login')
                                        }
                                    }}>
                                        Book a Ride
                                    </Button>
                                    {/* </NavLink> */}
                                    {/* <NavLink to="/register"> */}
                                    <Button size="lg" variant="outline"
                                        onClick={() => {
                                            navigate('/register')

                                        }}>
                                        Become a Driver
                                    </Button>
                                    {/* </NavLink> */}
                                </div>
                            </div>
                            <div className="mx-auto lg:ml-auto">
                                <img
                                    src="https://pathao.com/np/wp-content/uploads/sites/7/2018/12/nepal-hero-image.jpg"
                                    alt="RideX App"
                                    width={550}
                                    height={550}
                                    className="rounded-xl object-cover h-full w-full"

                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose RideX?</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                                    Experience the best ride-hailing service with features designed for your comfort and convenience.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center space-y-2 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <MapPin className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <h3 className="text-xl font-bold">Real-time Tracking</h3>
                                        <p className="text-muted-foreground">
                                            Track your ride in real-time and share your journey with loved ones for added safety.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center space-y-2 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <User className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <h3 className="text-xl font-bold">Verified Drivers</h3>
                                        <p className="text-muted-foreground">
                                            All our drivers go through a rigorous verification process for your safety.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col items-center space-y-2 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                            <Car className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                                        </div>
                                        <h3 className="text-xl font-bold">Multiple Vehicle Options</h3>
                                        <p className="text-muted-foreground">
                                            Choose from a variety of vehicle options to suit your needs and budget.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}

