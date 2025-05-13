import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Car, Clock, CreditCard, DollarSign, Shield } from "lucide-react"

const Hero = () => {
    return (<>
        <section className="relative overflow-hidden pt-10 md:pt-0  ">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white dark:from-blue-950 dark:via-gray-900 dark:to-gray-900 z-0"></div>

            {/* Decorative elements - hidden on small screens */}
            <div className="absolute top-20 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl hidden md:block"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl hidden md:block"></div>

            <div className="container max-w-7xl justify-self-center relative z-10 px-4 md:px-6 py-8 md:py-16 lg:py-24">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        className="flex flex-col justify-center space-y-4 md:space-y-6 text-center lg:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-3 md:space-y-4">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900 text-xs">
                                New: Schedule rides in advance
                            </Badge>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter leading-tight">
                                Your Journey,{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                    Your Control
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mx-auto lg:mx-0 max-w-[500px]">
                                Experience premium ride-hailing with real-time tracking, verified drivers, and competitive pricing.
                            </p>
                        </div>

                        <div className="flex  xs:flex-row gap-3 justify-center lg:justify-start">
                            <Button size="lg" className=" bg-blue-600 hover:bg-blue-700 text-white  xs:w-auto">
                                Book a Ride
                            </Button>
                            <Button size="lg" variant="outline" className="border-blue-200 dark:border-blue-800 xs:w-auto">
                                Become a Driver
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-muted-foreground justify-center lg:justify-start">
                            <div className="flex items-center">
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                                <span>Verified Drivers</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                                <span>24/7 Service</span>
                            </div>
                            <div className="flex items-center">
                                <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-green-500" />
                                <span>Secure Payments</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative mx-auto w-full max-w-[280px] xs:max-w-[350px] sm:max-w-md lg:max-w-none lg:ml-auto"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-30 blur-xl"></div>
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src="https://cdn.prod.website-files.com/643e15786c3c1ff52f75bd0d/677eb83ebf8f38ef9cdd6ec8_652436df54c346949e6836b2_Ride%2520hailing%2520Version%25202.webp"
                                    alt="RideX App in action"
                                    width={550}
                                    height={550}
                                    className="object-cover w-full h-full"
                                />

                                {/* Floating UI elements - hide on small screens */}
                                <div className="absolute top-4 left-4 hidden sm:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                            <Car className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">Your ride is</p>
                                            <p className="text-sm sm:font-medium">3 minutes away</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4 hidden sm:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg">
                                    <div className="flex items-center space-x-2 sm:space-x-3">
                                        <div>
                                            <p className="text-[10px] sm:text-xs text-muted-foreground">Estimated fare</p>
                                            <p className="text-sm sm:font-medium">$12.50</p>
                                        </div>
                                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    </>)
}

export default Hero