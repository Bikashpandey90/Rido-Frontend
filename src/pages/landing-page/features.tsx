import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Car, Clock, CreditCard, MapPin, Shield, Users } from "lucide-react"

const Featured = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }
    const [featuresRef, featuresInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
    return <section id="features" className="w-full py-10 md:py-16 lg:py-24" ref={featuresRef}>
        <div className="container px-4 md:px-6">
            <motion.div
                className="flex flex-col items-center justify-center space-y-3 text-center"
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeInUp}
            >
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900 text-xs">
                    Premium Features
                </Badge>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                        Designed for Your Comfort and Safety
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg">
                        Experience the best ride-hailing service with features designed for modern urban mobility.
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="mx-auto grid max-w-6xl gap-3 sm:gap-4 md:gap-6 py-6 md:py-10 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={staggerContainer}
            >
                {[
                    {
                        icon: <MapPin />,
                        title: "Real-time Tracking",
                        description: "Track your ride in real-time and share your journey with loved ones for added safety.",
                    },
                    {
                        icon: <Shield />,
                        title: "Verified Drivers",
                        description: "All our drivers undergo thorough background checks and verification for your safety.",
                    },
                    {
                        icon: <Car />,
                        title: "Multiple Vehicles",
                        description: "Choose from economy, premium, or luxury vehicles to match your needs.",
                    },
                    {
                        icon: <Clock />,
                        title: "Schedule Rides",
                        description: "Plan ahead by scheduling rides up to 7 days in advance for important meetings.",
                    },
                    {
                        icon: <CreditCard />,
                        title: "Cashless Payments",
                        description:
                            "Enjoy multiple payment options including credit cards, digital wallets, and in-app balance.",
                    },
                    {
                        icon: <Users />,
                        title: "Carpooling",
                        description: "Share your ride with others going in the same direction to reduce costs.",
                    },
                ].map((feature, index) => (
                    <motion.div key={index} variants={fadeInUp}>
                        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-3 sm:p-4 md:p-6">
                                <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4 text-center">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                                        <div className="h-5 w-5 md:h-6 md:w-6 text-white">{feature.icon}</div>
                                    </div>
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold">{feature.title}</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{feature.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
}

export default Featured