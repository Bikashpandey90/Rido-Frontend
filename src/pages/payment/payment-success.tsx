import { useContext, useEffect, useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AuthContext } from "@/context/auth.context"
import paymentSvc from "./payment.service"


const FadingCircle = ({ delay, size }: { delay: number; size: string }) => (
    <motion.div
        className={`absolute rounded-full ${size}`}
        style={{ backgroundColor: "rgba(96, 187, 71, 0.2)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
            scale: [0.8, 1, 1.1],
            opacity: [0, 0.5, 0],
        }}
        transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
            delay: delay,
            times: [0, 0.5, 1],
        }}
    />
)

export default function PaymentSuccess() {
    const [mounted, setMounted] = useState(false)
    const [searchParams] = useSearchParams()
    const data = searchParams.get('data')
    const [decodeData, setDecodeData] = useState<any>(null)
    const navigate = useNavigate()
    const auth = useContext(AuthContext) as { loggedInUser: any }

    useEffect(() => {
        setMounted(true)
    }, [])
    console.log("Raw data : ", data)

    useEffect(() => {
        if (data) {
            try {
                const decodeString = atob(decodeURIComponent(data))
                const parsedData = JSON.parse(decodeString)
                console.log(parsedData)
                setDecodeData(parsedData)
                console.log(parsedData)
            } catch (exception) {
                console.error("Error decoding data:", exception)
            }
        }
    }, [data])

    useEffect(() => {
        if (decodeData && decodeData.total_amount) {  // Check if amount exists
            const amountValue = Number(decodeData.total_amount.replace(/,/g, ''));
            if (isNaN(amountValue)) {
                console.error("Invalid amount:", decodeData.total_amount);
                return;
            }

            const payload = {
                "amount": amountValue,  // Ensure it's a number
                "method": "esewa",
                "transactionCode": decodeData.transaction_uuid,
                "data": JSON.stringify(decodeData)
            }
            const orderId = decodeData.transaction_uuid;
            confirmPayment(payload, orderId);
        } else {
            console.error("Missing amount in decoded data:", decodeData);
        }
    }, [decodeData])


    const confirmPayment = async (paymentData: any, orderId: string) => {
        try {
            const response = await paymentSvc.makePaymentConfirmation(paymentData, orderId)
            console.log("Payment confirmation response:", response)
            return response
        } catch (exception) {
            console.error("Payment confirmation error:", exception)
        }
    }

    if (!mounted) return null

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
                                style={{ backgroundColor: "rgba(96, 187, 71, 0.1)" }}
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
                                style={{ backgroundColor: "#60BB47" }}
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
                                    style={{ backgroundColor: "rgba(96, 187, 71, 0.8)" }}
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
                                        <Check className="h-12 w-12 sm:h-12 sm:w-12 text-white stroke-[3]" />
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold">Payment Successful!</CardTitle>
                    <CardDescription className="text-gray-500 mt-2 text-sm sm:text-base">
                        Your payment has been confirmed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 px-3 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs sm:text-sm text-gray-500 border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50"
                    >
                        <p>A confirmation email has been sent to your inbox with the receipt and transaction details.</p>
                    </motion.div>
                    <div className="flex flex-col space-y-2">
                        <Button
                            className="w-full text-sm sm:text-base py-2 text-white"
                            style={{ backgroundColor: "#60BB47", borderColor: "#60BB47" }}
                            onClick={() => {
                                if (auth.loggedInUser.role === 'admin') {
                                    navigate('/admin/order-detail/' + decodeData.transaction_uuid)
                                }
                                if (auth.loggedInUser.role === 'customer') {
                                    navigate('/ride-detail/' + decodeData.transaction_uuid)
                                }
                            }}
                        >
                            View Ride Details
                        </Button>
                        <Button variant="outline" className="w-full text-sm sm:text-base py-2" onClick={() => {
                            navigate('/')
                        }}>
                            Return to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
