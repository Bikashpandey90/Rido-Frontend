import { useEffect } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

// FadingCircle component for the animation
const FadingCircle = ({ delay, size }: { delay: number; size: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.5, 0.2, 0.5], scale: [0.8, 1, 0.8] }}
            transition={{
                duration: 3,
                delay: delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
            }}
            className={`absolute rounded-full ${size}`}
            style={{ backgroundColor: "rgba(239, 68, 68, 0.2)" }}
        />
    )
}

export default function PaymentFailure() {
    const navigate = useNavigate()

    // In a real app, you would use your router's navigation
    useEffect(() => {
        // This is just a placeholder for the navigation function
        // In Next.js, you would use router.push from useRouter
    }, [])

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-2 sm:p-6 md:p-8">
            <Card className="w-full max-w-[95%] sm:max-w-md text-center">
                <CardHeader className="px-3 sm:px-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40">
                            <FadingCircle delay={0} size="w-28 h-28 sm:w-32 sm:h-32" />
                            <FadingCircle delay={0.5} size="w-32 h-32 sm:w-36 sm:h-36" />
                            <FadingCircle delay={1} size="w-36 h-36 sm:w-40 sm:h-40" />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                }}
                                className="absolute w-24 h-24 sm:w-24 sm:h-24 rounded-full"
                                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                            />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: 0.2,
                                }}
                                className="absolute w-20 h-20 sm:w-20 sm:h-20 rounded-full flex items-center justify-center overflow-hidden"
                                style={{ backgroundColor: "#EF4444" }}
                            >
                                <motion.div
                                    initial={{ opacity: 0.7, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1.1 }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                                />
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                    }}
                                    className="relative z-10"
                                >
                                    <motion.div
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                        }}
                                    >
                                        <X className="h-12 w-12 sm:h-12 sm:w-12 text-white stroke-[3]" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold">Payment Failed</CardTitle>
                    <CardDescription className="text-gray-500 mt-2 text-sm sm:text-base">
                        We couldn't process your payment.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-3 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50"
                    >
                        <p>There was an issue processing your payment. Please check your payment details and try again.</p>
                    </motion.div>
                    <div className="flex flex-col space-y-2">
                        <Button
                            className="w-full text-sm sm:text-base py-2 text-white"
                            style={{ backgroundColor: "#EF4444", borderColor: "#EF4444" }}
                            onClick={() => {
                                navigate("/checkout")
                            }}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-sm sm:text-base py-2"
                            onClick={() => {
                                navigate("/")
                            }}
                        >
                            Return to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

