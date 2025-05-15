import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, Star } from "lucide-react"
import { useInView } from "react-intersection-observer"


const AppDownload = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }
    const [appRef, appInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })


    return <>
        <section
            className="w-full py-10 md:py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-cyan-600 text-white"
            ref={appRef}
        >
            <div className="container max-w-7xl justify-self-center  px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        className="flex flex-col justify-center space-y-4 text-center lg:text-left order-2 lg:order-1"
                        initial="hidden"
                        animate={appInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                    >
                        <Badge className="bg-white/20 text-white hover:bg-white/20 border-none text-xs mx-auto lg:mx-0">
                            Mobile App
                        </Badge>
                        <div className="space-y-2">
                            <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                                Download the RideX App
                            </h2>
                            <p className="max-w-[600px] text-white/80 text-sm sm:text-base md:text-lg mx-auto lg:mx-0">
                                Get the full RideX experience on your smartphone. Available for iOS and Android devices.
                            </p>
                        </div>
                        <div className="flex  xs:flex-row gap-3 pt-4 justify-center lg:justify-start">
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-white/90  xs:w-auto"
                            >
                                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                App Store
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="bg-white text-blue-600 hover:bg-white/90  xs:w-auto"
                            >
                                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                Google Play
                            </Button>
                        </div>
                        <div className="flex  xs:flex-row gap-4 pt-4 text-sm justify-center lg:justify-start">
                            <div className="flex items-center justify-center lg:justify-start">
                                <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-1 fill-yellow-300 text-yellow-300" />
                                <span className="text-white/80">4.8/5 on App Store</span>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start">
                                <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-1 fill-yellow-300 text-yellow-300" />
                                <span className="text-white/80">4.7/5 on Google Play</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative mx-auto w-full max-w-[280px] xs:max-w-[320px] sm:max-w-md lg:max-w-none lg:ml-auto order-1 lg:order-2"
                        initial="hidden"
                        animate={appInView ? "visible" : "hidden"}
                        variants={fadeInUp}
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 rounded-3xl bg-white/20 opacity-70 blur-xl"></div>
                            <div className="relative flex justify-center">
                                <div className="w-36 xs:w-40 sm:w-48 md:w-56 h-auto transform rotate-6 z-10">
                                    <img
                                        src="https://res.cloudinary.com/dwtbzhlph/image/upload/v1747079017/h6es5r5sogzck3tek4zo.jpg"
                                        alt="RideX App Screenshot 1"
                                        width={300}
                                        height={600}
                                        className="rounded-3xl shadow-2xl"
                                    />
                                </div>
                                <div className="w-36 xs:w-40 sm:w-48 md:w-56 h-auto transform -rotate-6 -ml-8 xs:-ml-10 sm:-ml-12 md:-ml-16 mt-6 sm:mt-8 md:mt-10">
                                    <img
                                        src="https://res.cloudinary.com/dwtbzhlph/image/upload/v1747079018/pklg4hgkoaqimgicblyt.jpg"
                                        alt="RideX App Screenshot 2"
                                        width={300}
                                        height={600}
                                        className="rounded-3xl shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section></>
}

export default AppDownload