import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { useInView } from "react-intersection-observer"

const Testimonials = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }
    const [testimonialsRef, testimonialsInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })


    return (<>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32" ref={testimonialsRef}>
            <div className="container px-4 md:px-6">
                <motion.div
                    className="flex flex-col items-center justify-center space-y-4 text-center"
                    initial="hidden"
                    animate={testimonialsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                >
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900">
                        Testimonials
                    </Badge>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
                            What Our Customers Say
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground text-base md:text-lg">
                            Don't just take our word for it. Here's what our customers have to say about their RideX experience.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="mx-auto max-w-5xl py-8 md:py-12"
                    initial="hidden"
                    animate={testimonialsInView ? "visible" : "hidden"}
                    variants={fadeInUp}
                >
                    <Carousel className="w-full">
                        <CarouselContent>
                            {[
                                {
                                    name: "Sarah Johnson",
                                    role: "Marketing Executive",
                                    comment:
                                        "RideX has completely changed how I commute to work. The drivers are professional, the cars are clean, and the app is incredibly easy to use. I've recommended it to all my colleagues!",
                                    rating: 5,
                                },
                                {
                                    name: "Michael Chen",
                                    role: "Software Engineer",
                                    comment:
                                        "As someone who doesn't own a car, RideX has been a lifesaver. The fare estimator helps me budget my trips, and I've never had to wait more than 5 minutes for a ride. Excellent service!",
                                    rating: 5,
                                },
                                {
                                    name: "Emily Rodriguez",
                                    role: "Student",
                                    comment:
                                        "The carpooling feature is perfect for students like me. I've saved so much money sharing rides to campus, and I've even made some new friends along the way!",
                                    rating: 4,
                                },
                                {
                                    name: "David Thompson",
                                    role: "Business Traveler",
                                    comment:
                                        "I travel for business frequently, and RideX has become my go-to in every city. The consistency of service and the ability to schedule rides in advance has made my trips much less stressful.",
                                    rating: 5,
                                },
                            ].map((testimonial, index) => (
                                <CarouselItem key={index} className="sm:basis-1/1 md:basis-1/2 lg:basis-1/3 p-1">
                                    <Card className="h-full border-0 shadow-lg">
                                        <CardContent className="p-4 sm:p-6">
                                            <div className="flex flex-col space-y-4">
                                                <div className="flex">
                                                    {Array(testimonial.rating)
                                                        .fill(0)
                                                        .map((_, i) => (
                                                            <Star key={i} className="h-5 w-5 fill-current text-yellow-500" />
                                                        ))}
                                                </div>
                                                <p className="text-muted-foreground text-sm sm:text-base">"{testimonial.comment}"</p>
                                                <div className="flex items-center space-x-3 pt-4">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                    <div>
                                                        <p className="font-medium">{testimonial.name}</p>
                                                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center mt-6 space-x-2">
                            <CarouselPrevious className="relative inset-0 translate-y-0" />
                            <CarouselNext className="relative inset-0 translate-y-0" />
                        </div>
                    </Carousel>
                </motion.div>
            </div>
        </section></>)
}

export default Testimonials;