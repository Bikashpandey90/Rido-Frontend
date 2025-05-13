import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, DollarSign } from "lucide-react"
import { useInView } from "react-intersection-observer"




const Driver = () => {
    const [driversRef, driversInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }
    return <section id="drivers" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" ref={driversRef}>
        <div className="container max-w-7xl justify-self-center   px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                <motion.div
                    className="flex flex-col justify-center space-y-4"
                    initial="hidden"
                    animate={driversInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                >
                    <Badge className=" bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900 ">
                        Join Our Team
                    </Badge>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                            Drive With RideX
                        </h2>
                        <p className="max-w-[600px] text-muted-foreground text-base md:text-lg">
                            Become a driver and earn money on your own schedule. Set your own hours and be your own boss.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-medium">Flexible Schedule</h3>
                                <p className="text-muted-foreground">Drive whenever you want, as much as you want.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-medium">Weekly Payouts</h3>
                                <p className="text-muted-foreground">Get paid weekly directly to your bank account.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-medium">Driver Support</h3>
                                <p className="text-muted-foreground">24/7 support for all your driving needs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                            Apply to Drive
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    className="relative mx-auto w-full max-w-md lg:max-w-none lg:ml-auto"
                    initial="hidden"
                    animate={driversInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                >
                    <div className="relative">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-30 blur-xl"></div>
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="https://d3j83e26t2bu3f.cloudfront.net/site/competitors/b3706ddd72c5a672bd9b013b0c9fe196/f3cad/competitors-hero.jpg"
                                alt="RideX Driver"
                                width={550}
                                height={550}
                                className="object-cover w-full h-full"
                            />

                            {/* Floating UI elements - hide on small screens */}
                            <div className="absolute top-6 right-6 hidden sm:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Today's Earnings</p>
                                        <p className="font-medium">$247.50</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 hidden sm:block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                        <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Driver Rating</p>
                                        <p className="font-medium">4.9/5.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
}

export default Driver