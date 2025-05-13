import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"


const HowItWorks = () => {
    const [howItWorksRef, howItWorksInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
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
    return <>
        <section
            id="how-it-works"
            className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
            ref={howItWorksRef}
        >
            <div className="container px-4 md:px-6">
                <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    initial="hidden"
                    animate={howItWorksInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                >
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900">
                        Simple Process
                    </Badge>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">How RideX Works</h2>
                        <p className="max-w-[900px] text-muted-foreground text-base md:text-lg">
                            Getting a ride is as easy as 1-2-3. Follow these simple steps to get started.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="mx-auto grid max-w-5xl items-start gap-8 py-8 md:py-12 grid-cols-1 md:grid-cols-3"
                    initial="hidden"
                    animate={howItWorksInView ? "visible" : "hidden"}
                    variants={staggerContainer}
                >
                    {[
                        {
                            step: "01",
                            title: "Download the App",
                            description: "Get the RideX app from the App Store or Google Play Store and create your account.",
                        },
                        {
                            step: "02",
                            title: "Request a Ride",
                            description: "Enter your destination, choose your vehicle type, and confirm your pickup location.",
                        },
                        {
                            step: "03",
                            title: "Enjoy Your Ride",
                            description: "Track your driver's arrival, get in, and relax as you're taken to your destination.",
                        },
                    ].map((step, index) => (
                        <motion.div key={index} className="relative" variants={fadeInUp}>
                            <div className="flex flex-col items-center space-y-4 text-center">
                                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {step.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </div>

                            {index < 2 && (
                                <div className="hidden md:block absolute top-10 left-full w-16 h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform -translate-x-8"></div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section></>
}

export default HowItWorks