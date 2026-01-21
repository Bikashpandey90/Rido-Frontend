import { useContext, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Clock,
    Car,

    MapPin,
    User,
    CheckCircle,
    Star,
    DollarSign,
    Wallet,
    Plus,
    Bike,
    MoreVertical,
    Trash,
    Edit,
    Home,
    Building2,
    Save,
    Briefcase,
    ListPlus,
} from "lucide-react"
import LocationSearch from "./location-search"
import mapsSvc from "@/pages/customer/map/maps.services"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import reviewSvc from "@/pages/review/review.svc"
import { Textarea } from "../ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import MessageBox from "../chat/chatBox"
import { shortify } from "@/lib/utils"
import { v4 as uuidv4 } from "uuid"
import CryptoJS from "crypto-js"
import socket from "@/config/socket.config"
import { AuthContext } from "@/context/auth.context"

interface RideRequestPanelProps {
    latitude: number | null
    longitude: number | null
    destLatitude: number | null
    destLongitude: number | null
    setLatitude: (lat: number | null) => void
    setLongitude: (lon: number | null) => void
    setDestLatitude: (lat: number | null) => void
    setDestLongitude: (lon: number | null) => void
    setShowRoute: (show: boolean) => void
    routeInfo: any
}
export interface RecentRideLocations {
    dropOffLocation: {
        type: "Point"
        coordinates: [number, number]
        name: string
        _id: string
    }
    _id: string
}
export interface SavedLocations {
    location: {
        coordinates: [number, number]
        type: "Point"
    }
    _id: string
    userId: string
    locationName: string
    isDefault: boolean
    title: "work" | "home" | "other" | "recent"
    status: "active" | "inactive"
}

export default function RideRequestPanel({
    latitude,
    longitude,
    destLatitude,
    destLongitude,
    setLatitude,
    setLongitude,
    setDestLatitude,
    setDestLongitude,
    setShowRoute,
    routeInfo,
}: RideRequestPanelProps) {
    console.log(routeInfo)
    const [isRideRequested, setIsRideRequested] = useState(false)
    const [step, setStep] = useState<"location" | "vehicle" | "payment" | "confirmation">("location")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isWaitingForDriver, setIsWaitingForDriver] = useState(false)
    const [ride, setRide] = useState<any>(null)
    const [pickupLocationName, setPickupLocationName] = useState<string>("")
    const [dropoffLocationName, setDropoffLocationName] = useState<string>("")
    const [cancelling, setCancelling] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "esewa">("cash")
    const [rating, setRating] = useState<number>(0)
    const [reviewText, setReviewText] = useState<string>("")
    const [isSubmittingReview, setIsSubmittingReview] = useState(false)
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
    const [paymentComplete, setPaymentComplete] = useState(false)
    const [reviewComplete, setReviewComplete] = useState(false)
    const [savedLocations, setSavedLocations] = useState<SavedLocations[]>([])
    const [recentLocations, setRecentLocations] = useState<RecentRideLocations[]>([])
    const [isMessageOpen, setIsMessageOpen] = useState(false)

    const rideRequestDTO = Yup.object({
        // pickupLocation: Yup.object({
        //     type: Yup.string().default("Point"),
        //     coordinates: Yup.array().of(Yup.number()).length(2).required("Pickup coordinates are required"),
        //     name: Yup.string().optional(),
        // }).required("Pickup location is required"),
        // dropOffLocation: Yup.object({
        //     type: Yup.string().default("Point"),
        //     coordinates: Yup.array().of(Yup.number()).length(2).required("Dropoff coordinates are required"),
        //     name: Yup.string().optional(),
        // }).required("Dropoff location is required"),
        // vehicleType: Yup.string().default("bike").required("Vehicle type is required"),
    })

    // const reviewCreateDTO = Yup.object({
    //     rating: Yup.number().required("Rating is required"),
    //     comment: Yup.string().optional(),
    // })

    // const reviewFormSchema = Yup.object({
    //     comment: Yup.string().optional(),
    // })

    const {
        control,
        handleSubmit,
        // formState: { errors },
    } = useForm({
        resolver: yupResolver(rideRequestDTO),
    })

    // const reviewForm = useForm({
    //     resolver: yupResolver(reviewFormSchema),
    // })

    const handleRequestRide = () => {
        setIsWaitingForDriver(false)
        setIsRideRequested(true)
    }

    const handlePickupSelect = (lat: number, lon: number, name?: string) => {
        setLatitude(lat)
        setLongitude(lon)
        if (name) {
            setPickupLocationName(name)
        }
    }

    const handleDestinationSelect = (lat: number, lon: number, name?: string) => {
        setDestLatitude(lat)
        setDestLongitude(lon)
        if (name) {
            setDropoffLocationName(name)
        }
        if (latitude && longitude) {
            setShowRoute(true)
        }
    }

    const submitForm = async (data: any) => {
        setIsSubmitting(true)

        if (!latitude || !longitude || !destLatitude || !destLongitude) {
            alert("Please select destination location")
            setIsSubmitting(false)
            return
        }

        try {
            // Format data to match the backend DTO structure
            const formattedData = {
                pickUpLocation: {
                    type: "Point",
                    coordinates: [longitude || 0, latitude || 0],
                    name: pickupLocationName || "Current Location",
                },
                dropOffLocation: {
                    type: "Point",
                    coordinates: [destLongitude || 0, destLatitude || 0],
                    name: dropoffLocationName || "Destination",
                },
                vehicleType: data.vehicleType || "bike",
            }

            console.log("Submitting ride request with data:", formattedData)
            const response = await mapsSvc.createRideRequest(formattedData)
            console.log("Ride request submitted successfully:", response)
            setRide(response.detail)
            console.log("Ride Details : ", ride)
            setIsWaitingForDriver(true)

            socket.emit('newRides', {
                ride: 'newRide'
            })
        } catch (exception: any) {
            console.error("Error submitting ride request:", exception)
            // Check if the exception has a response with data
            if (exception.response && exception.response.data) {
                const errorMessage = exception.response.data.message || JSON.stringify(exception.response.data)
                alert(`Request failed: ${errorMessage}`)
            } else if (exception.message) {
                alert(`Request failed: ${exception.message}`)
            } else {
                alert("An unknown error occurred while submitting your ride request")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const submitReviewForm = async (comment: string, riderId: string, rideId: string) => {
        if (rating === 0) {
            alert("Please select a rating before submitting")
            return
        }

        setIsSubmittingReview(true)
        try {
            const payload = {
                rating: rating,
                comment: comment,
                rider: riderId,
                ride: rideId,
            }

            const response = await reviewSvc.createReview(payload)
            console.log("Review submitted successfully:", response)
            setReviewComplete(true)

            // Reset ride state after review is complete
            setTimeout(() => {
                setIsRideRequested(false)
                setRide(null)
                setPaymentComplete(false)
                setReviewComplete(false)
                setRating(0)
                setReviewText("")
            }, 3000)
        } catch (exception) {
            console.error("Review submission error:", exception)
            alert("Failed to submit review. Please try again.")
        } finally {
            setIsSubmittingReview(false)
        }
    }

    const loadRideDetail = async () => {
        try {
            if (!ride) {
                console.error("Ride object is null or undefined")
                return
            }
            console.log(ride?._id)
            const rideDetail = await mapsSvc.getRideDetail(ride?._id)
            setRide(rideDetail.detail)
        } catch (exception) {
            console.error("Error loading ride details:", exception)
        }
    }


    const cancelRide = async (rideId: string) => {
        setCancelling(true)
        try {
            const response = await mapsSvc.cancelRideRequest(rideId)
            console.log("Ride cancelled successfully:", response)

            if (response?.status === "RIDE_CANCELLED") {
                setIsRideRequested(false)
                setIsWaitingForDriver(false)
                setRide(null)
            }
        } catch (exception) {
            console.error("Error cancelling ride:", exception)
        } finally {
            setCancelling(false)
        }
    }

    const handlePayment = async (paymentMethod: string) => {
        setIsPaymentProcessing(true)
        try {
            // Simulate payment processing
            if (paymentMethod === "esewa") {
                try {
                    if (!ride?._id || !ride?.fare) {
                        throw new Error("Ride information is missing")
                    }

                    const fareString = ride.fare.toString()
                    const secretKey = import.meta.env.VITE_APP_ESEWA_SECRET

                    if (!secretKey) {
                        throw new Error("eSewa secret key is not defined in environment variables")
                    }

                    // Update form data with the latest values
                    const newSignature = generateSignature({
                        total_amount: fareString,
                        transaction_uuid: ride._id,
                        product_code: "EPAYTEST",
                        secret: secretKey,
                    })

                    if (!newSignature) {
                        throw new Error("Failed to generate signature")
                    }

                    // Update form data
                    setFormData((prev) => ({
                        ...prev,
                        amount: fareString,
                        total_amount: fareString,
                        transaction_uuid: ride._id,
                        signature: newSignature,
                    }))

                    console.log("Initiating eSewa payment with signature:", newSignature)

                    // Use a longer delay to ensure state updates
                    setTimeout(() => {
                        const submitButton = document.getElementById("payment-initiate-button")
                        if (submitButton) {
                            submitButton.click()
                        } else {
                            throw new Error("Payment form submit button not found")
                        }
                    }, 500)
                } catch (error) {
                    console.error("eSewa payment error:", error)
                    alert(`Failed to initialize eSewa payment: "Unknown error"}`)
                }
            } else if (paymentMethod === "cash") {
                const response = await mapsSvc.makePayment(ride?._id, paymentMethod, ride?.fare)
                console.log(response.detail)
                setPaymentComplete(true)
            } else {
                console.error("Invalid payment method selected")
                alert("Please select a valid payment method")
            }
        } catch (error) {
            console.error("Payment processing error:", error)
            alert("Payment processing failed. Please try again.")
        } finally {
            setIsPaymentProcessing(false)
        }
    }

    const getSavedLocations = async () => {
        try {
            const response = await mapsSvc.fetchSavedLocations()
            setSavedLocations(response.detail)
            console.log(response.detail)
        } catch (exception) {
            console.error("Error fetching saved locations:", exception)
        }
    }
    const getRecentLocations = async () => {
        try {
            const response = await mapsSvc.fetchRecentRidesLocations()
            setRecentLocations(response.detail)
            console.log(response.detail)
        } catch (exception) {
            console.error("Error fetching saved locations:", exception)
        }
    }
    const deleteSavedLocation = async (id: string) => {
        try {
            const response = await mapsSvc.deleteSavedLocationById(id)
            console.log(response.detail)
            if (response?.status === "ADDRESS_DELETED") {
                getSavedLocations()
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    const saveLocations = async (data: any, title: string) => {
        try {
            const payload = {
                locationName: data.dropOffLocation?.name,
                location: {
                    coorinates: data.dropOffLocation.coordinates,
                },
                title: title,
            }
            console.log(payload)
            const response = await mapsSvc.saveLocation(payload)
            if (response?.status === "SAVED_ADDRESS_SUCCESSFULLY") {
                getSavedLocations()
            }
        } catch (exception) {
            console.log(exception)
        }
    }
    const updateSavedLocations = async (id: string, title: string) => {
        try {
            let payload = {
                title: title
            }
            const response = await mapsSvc.updateSavedLocationsDetails(payload, id)
            console.log(response.detail)
            if (response?.status === 'ADDRESS_UPDATED') {
                getSavedLocations()
            }


        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        getSavedLocations()
        getRecentLocations()
    }, [])



    const getLocationIcon = (title: string) => {
        switch (title) {
            case "home":
                return <Home className="h-4 w-4 text-blue-700" />
            case "work":
                return <Building2 className="h-4 w-4 text-blue-700" />
            case "recent":
                return <Bike className="h-4 w-4 text-blue-700" />
            default:
                return <MapPin className="h-4 w-4 text-blue-700" />
        }
    }

    // Render stars for rating
    const renderStars = () => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => setRating(index + 1)}
                    className="focus:outline-none"
                    aria-label={`Rate ${index + 1} stars`}
                >
                    <Star className={`h-8 w-8 ${index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                </button>
            ))
    }

    // Render completed ride view with payment and review options
    const renderCompletedRide = () => {
        if (reviewComplete) {
            return (
                <div className="p-4 space-y-6">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold">Thank You!</h2>
                        <p className="text-muted-foreground">Your review has been submitted successfully.</p>
                    </div>
                </div>
            )
        }

        if (!paymentComplete) {
            return (
                <div className="p-4 space-y-6">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold">Ride Completed</h2>
                        <p className="text-muted-foreground">Please complete your payment</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Fare</p>
                                    <p className="font-medium text-lg">Nrs {ride?.fare}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <Label>Select Payment Method</Label>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={(value) => setPaymentMethod(value as "cash" | "esewa")}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div>
                                        <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                        <Label
                                            htmlFor="cash"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <DollarSign className="mb-3 h-6 w-6" />
                                            Cash
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="esewa" id="esewa" className="peer sr-only" />
                                        <Label
                                            htmlFor="esewa"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            <Wallet className="mb-3 h-6 w-6" />
                                            eSewa
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-green-600 hover:bg-green-700"
                                onClick={() => handlePayment(paymentMethod)}
                                disabled={isPaymentProcessing}
                            >
                                {isPaymentProcessing ? "Processing..." : `Pay with ${paymentMethod === "cash" ? "Cash" : "eSewa"}`}
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Pickup</p>
                                    <p className="font-medium">{ride?.pickUpLocation?.name?.split(" ").slice(0, 3).join(" ")}...</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Destination</p>
                                    <p className="font-medium">{ride?.dropOffLocation?.name?.split(" ").slice(0, 3).join(" ")}...</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">Driver</p>
                                    <p className="font-medium">{ride?.rider?.name}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-muted-foreground">Vehicle</p>
                                    <p className="font-medium">{ride?.vehicleDetails?.model}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div className="p-4 space-y-6">
                    <div className="text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold">Payment Successful</h2>
                        <p className="text-muted-foreground">Please rate your experience</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Rate Your Driver</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    {ride?.rider?.image ? (
                                        <img
                                            src={ride.rider.image || "/placeholder.svg"}
                                            className="h-11 w-11 rounded-full object-contain"
                                            alt={ride?.rider?.name}
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-blue-700" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{ride?.rider?.name}</p>
                                    <p className="text-sm text-muted-foreground">{ride?.vehicleDetails?.model}</p>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-1">{renderStars()}</div>

                            <div className="space-y-2">
                                <Label htmlFor="review">Additional Comments (Required)</Label>
                                <Textarea
                                    name="comment"
                                    id="review"
                                    placeholder="Share your experience..."
                                    // errMsg={errors?.comment?.message as string}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => {
                                    if (rating === 0) {
                                        alert("Please select a rating before submitting")
                                        return
                                    }
                                    submitReviewForm(reviewText, ride?.rider?._id, ride?._id)
                                }}
                                disabled={isSubmittingReview}
                            >
                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )
        }
    }

    const [formData, setFormData] = useState(() => {
        // Get the secret key from environment variables
        const secretKey = import.meta.env.VITE_APP_ESEWA_SECRET

        // Log if secret key is missing
        if (!secretKey) {
            console.warn("eSewa secret key is not defined in environment variables")
        }

        const baseUrl = import.meta.env.VITE_APP_BASE_URL || window.location.origin

        return {
            amount: "0",
            tax_amount: "0",
            total_amount: "0",
            transaction_uuid: uuidv4(), // Use a generated UUID as default
            product_service_charge: "0",
            product_delivery_charge: "0",
            product_code: "EPAYTEST",
            success_url: `${baseUrl}/payment-success`,
            failure_url: `${baseUrl}/payment-failed`,
            signature: "",
            secret: secretKey || "",
            orderId: "",
            signed_field_names: "total_amount,transaction_uuid,product_code",
        }
    })

    interface SignatureParams {
        total_amount: string
        transaction_uuid: string
        product_code: string
        secret: string
        // orderId: string;
    }

    const generateSignature = ({ total_amount, transaction_uuid, product_code, secret }: SignatureParams): string => {
        // Check if any required parameters are missing
        if (!total_amount || !transaction_uuid || !product_code || !secret) {
            console.error("Missing required parameters for signature generation:", {
                total_amount,
                transaction_uuid,
                product_code,
                secretProvided: !!secret,
            })
            return ""
        }

        try {
            const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
            console.log("Generating signature with:", { hashString, secretLength: secret.length })

            // Convert secret to WordArray if it's a string
            const secretKey = typeof secret === "string" ? CryptoJS.enc.Utf8.parse(secret) : secret

            const hash = CryptoJS.HmacSHA256(hashString, secretKey)
            const hashedSignature = CryptoJS.enc.Base64.stringify(hash)
            return hashedSignature
        } catch (error) {
            console.error("Error generating signature:", error)
            return ""
        }
    }
    useEffect(() => {
        if (ride?._id && ride?.fare) {
            const fareString = ride.fare.toString()
            const secretKey = import.meta.env.VITE_APP_ESEWA_SECRET

            // Check if secret key is available
            if (!secretKey) {
                console.error("eSewa secret key is not defined in environment variables")
                return
            }

            console.log("Preparing eSewa form data with:", {
                fareString,
                rideId: ride._id,
                productCode: "EPAYTEST",
                secretKeyAvailable: !!secretKey,
            })

            setFormData((prevFormData) => {
                const updatedData = {
                    ...prevFormData,
                    amount: fareString,
                    total_amount: fareString,
                    transaction_uuid: ride._id,
                    secret: secretKey,
                }

                // Generate signature after updating the data
                const signature = generateSignature({
                    total_amount: fareString,
                    transaction_uuid: ride._id,
                    product_code: updatedData.product_code,
                    secret: secretKey,
                })

                return {
                    ...updatedData,
                    signature: signature,
                }
            })

            console.log("Updated eSewa form data with ride details")
        }
    }, [ride])

    // Add this function to handle return from eSewa payment
    useEffect(() => {
        // Check if we're returning from eSewa payment
        const urlParams = new URLSearchParams(window.location.search)
        const status = urlParams.get("status")
        const refId = urlParams.get("refId")

        if (status && refId && ride?._id) {
            const handleEsewaReturn = async () => {
                try {
                    if (status === "success") {
                        console.log("eSewa payment successful, ref ID:", refId)
                        // Call your payment verification API
                        // const response = await mapsSvc.makePayment(ride._id, "esewa", ride.fare, refId)
                        const response = await mapsSvc.makePayment(ride._id, "esewa", ride.fare)

                        console.log("Payment verification response:", response.detail)
                        setPaymentComplete(true)
                    } else {
                        console.error("eSewa payment failed")
                        alert("Payment was not successful. Please try again.")
                    }

                    // Clear URL parameters to prevent reprocessing
                    window.history.replaceState({}, document.title, window.location.pathname)
                } catch (error) {
                    console.error("Error handling eSewa return:", error)
                }
            }

            handleEsewaReturn()
        }
    }, [window.location.search, ride])
    const auth = useContext(AuthContext) as { loggedInUser: any }

    const openConnect = () => {
        socket.connect()
    }
    const handleConnect = (data: any) => {
        console.log('Connected', data)
    }
    const rideStatusUpdated = async (data: any) => {
        console.log(data)

        if (data.user === auth.loggedInUser.id) {
            loadRideDetail()
        }
    }
    useEffect(() => {
        openConnect()
        socket.on('connected', handleConnect)
        socket.on('rideStatusUpdated', rideStatusUpdated)

        return () => {
            socket.off('connected', handleConnect)
            socket.off('rideStatusUpdated', rideStatusUpdated)
        }
    })

    return (
        <>
            {/* Esewa Checkout Form  */}

            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST" className="hidden">
                <input type="hidden" id="amount" name="amount" required value={formData.amount} />
                <input type="hidden" id="tax_amount" name="tax_amount" value={formData.tax_amount} required />
                <input type="hidden" id="total_amount" name="total_amount" value={formData.total_amount} required />
                <input type="hidden" id="transaction_uuid" name="transaction_uuid" value={formData.transaction_uuid} required />
                <input type="hidden" id="product_code" name="product_code" value={formData.product_code} required />
                <input
                    type="hidden"
                    id="product_service_charge"
                    name="product_service_charge"
                    value={formData.product_service_charge}
                    required
                />
                <input
                    type="hidden"
                    id="product_delivery_charge"
                    name="product_delivery_charge"
                    value={formData.product_delivery_charge}
                    required
                />
                <input type="hidden" id="success_url" name="success_url" value={formData.success_url} required />
                <input type="hidden" id="failure_url" name="failure_url" value={formData.failure_url} required />
                <input
                    type="hidden"
                    id="signed_field_names"
                    name="signed_field_names"
                    value={formData.signed_field_names}
                    required
                />
                <input type="hidden" id="signature" name="signature" value={formData.signature} required />
                <input value="Submit" id="payment-initiate-button" type="submit" className="hidden" />
            </form>
            <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
                {isWaitingForDriver ? (
                    <div className="p-4 space-y-6">
                        <div className="text-center space-y-4">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                                <Car className="h-8 w-8 text-blue-700" />
                            </div>
                            <h2 className="text-xl font-bold">Finding you a driver...</h2>
                            <div className="flex justify-center">
                                <div className="animate-pulse flex space-x-2">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                </div>
                            </div>
                            <p className="text-muted-foreground">Please wait while we connect you with a driver</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Ride Request Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{ride?.pickUpLocation?.name?.split(" ").slice(0, 3).join(" ")}...</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Destination</p>
                                        <p className="font-medium">{ride?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Estimated Price</p>
                                        <p className="font-medium">Nrs {ride?.fare}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="destructive" className="w-full" onClick={() => setIsWaitingForDriver(false)}>
                                    Cancel Request
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Simulate driver found after 5 seconds */}
                        <div className="hidden">
                            {/* {setTimeout(() => {
                            handleRequestRide()
                        }, 5000)} */}
                            {ride?.RideStatus === "accepted" &&
                                (() => {
                                    handleRequestRide()
                                    return null
                                })()}
                        </div>
                    </div>
                ) : !isRideRequested ? (
                    <div className="p-4">
                        {step === "location" && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Request a Ride</h2>

                                <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                                    <LocationSearch
                                        name="pickupLocation"
                                        control={control}
                                        id="pickup"
                                        label="Pickup Location"
                                        placeholder="Current location"
                                        onLocationSelect={handlePickupSelect}
                                        useCurrentLocation={true}
                                        errMsg=''
                                    // captureLocationName={true}
                                    />

                                    <LocationSearch
                                        name="dropOffLocation"
                                        control={control}
                                        id="destination"
                                        label="Destination"
                                        placeholder="Enter destination"
                                        onLocationSelect={handleDestinationSelect}
                                        errMsg=''
                                    // captureLocationName={true}
                                    />
                                    {/* <input type="hidden" {...control.register("vehicleType")} defaultValue="bike" /> */}

                                    <Tabs defaultValue="now">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="now" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Now
                                            </TabsTrigger>
                                            <TabsTrigger value="schedule" className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Schedule
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="now">
                                            <div className="pt-4">
                                                <Button
                                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                                    onClick={() => {
                                                        setShowRoute(true)
                                                    }}
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Requesting a ride..." : "Continue"}
                                                </Button>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="schedule">
                                            <div className="pt-4 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="date">Date</Label>
                                                        <Input id="date" type="date" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="time">Time</Label>
                                                        <Input id="time" type="time" />
                                                    </div>
                                                </div>
                                                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep("vehicle")}>
                                                    Continue
                                                </Button>
                                            </div>
                                        </TabsContent>
                                    </Tabs>

                                    <div className="bg-white dark:bg-gray-950 rounded-xl p-4 shadow-sm border">
                                        <h3 className="font-semibold text-lg mb-3">Saved Locations</h3>
                                        <div className="space-y-3">
                                            {savedLocations && savedLocations.length > 0 ? (
                                                savedLocations.map((location, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                                {getLocationIcon(location?.title)}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">
                                                                    {location.title.charAt(0).toUpperCase() + location.title.slice(1)}
                                                                </p>
                                                                <p className="text-sm text-muted-foreground">{shortify(location.locationName)}</p>
                                                            </div>
                                                        </div>

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">

                                                                <DropdownMenuSub>
                                                                    <DropdownMenuSubTrigger>
                                                                        <Edit className="h-4 w-4 mr-2" />
                                                                        Edit
                                                                    </DropdownMenuSubTrigger>
                                                                    <DropdownMenuSubContent >

                                                                        <DropdownMenuItem>
                                                                            <Save className="h-4 w-4 mr-2" />
                                                                            Save as
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />

                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Home clicked")
                                                                                updateSavedLocations(location._id, "home")
                                                                            }}
                                                                        >
                                                                            <Home className="h-4 w-4 mr-2" />
                                                                            Home
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Work clicked")
                                                                                updateSavedLocations(location._id, "work")
                                                                            }}
                                                                        >
                                                                            <Briefcase className="h-4 w-4 mr-2" />
                                                                            Work
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Others clicked")
                                                                                updateSavedLocations(location._id, "other")
                                                                            }}
                                                                        >
                                                                            <ListPlus className="h-4 w-4 mr-2" />
                                                                            Others
                                                                        </DropdownMenuItem>

                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Recent clicked")
                                                                                updateSavedLocations(location._id, "recent")
                                                                            }}
                                                                        >
                                                                            <Clock className="h-4 w-4 mr-2" />
                                                                            Recent
                                                                        </DropdownMenuItem>


                                                                    </DropdownMenuSubContent>
                                                                </DropdownMenuSub>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-red-600 dark:text-red-400"
                                                                    onClick={() => {
                                                                        deleteSavedLocation(location._id)
                                                                    }}
                                                                >
                                                                    <Trash className="h-4 w-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-32 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                                    <p className="text-sm text-muted-foreground text-center mt-4">
                                                        No saved locations available.
                                                    </p>
                                                    <Button className="mt-3" variant="secondary" onClick={() => { }}>
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Saved Location
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Recent Locations Section */}
                                    <div className="bg-white dark:bg-gray-950 rounded-xl p-4 shadow-sm border">
                                        <h3 className="font-semibold text-lg mb-3">Recent Locations</h3>
                                        <div className="space-y-3">
                                            {recentLocations && recentLocations.length > 0 ? (
                                                recentLocations.map((location, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                                                <MapPin className="h-4 w-4 text-blue-700" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">Recent</p>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {location?.dropOffLocation?.name.length > 30
                                                                        ? `${location?.dropOffLocation?.name.substring(0, 30)}...`
                                                                        : location?.dropOffLocation?.name}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreVertical className="h-4 w-4" />
                                                                    <span className="sr-only">Open menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuSub>
                                                                    <DropdownMenuSubTrigger>
                                                                        <Save className="h-4 w-4 mr-2" />
                                                                        Save as
                                                                    </DropdownMenuSubTrigger>
                                                                    <DropdownMenuSubContent>
                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Home clicked")
                                                                                saveLocations(location, "home")
                                                                            }}
                                                                        >
                                                                            <Home className="h-4 w-4 mr-2" />
                                                                            Home
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Work clicked")
                                                                                saveLocations(location, "work")
                                                                            }}
                                                                        >
                                                                            <Briefcase className="h-4 w-4 mr-2" />
                                                                            Work
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Others clicked")
                                                                                saveLocations(location, "other")
                                                                            }}
                                                                        >
                                                                            <ListPlus className="h-4 w-4 mr-2" />
                                                                            Others
                                                                        </DropdownMenuItem>

                                                                        <DropdownMenuItem
                                                                            onClick={() => {
                                                                                console.log("Recent clicked")
                                                                                saveLocations(location, "recent")
                                                                            }}
                                                                        >
                                                                            <Clock className="h-4 w-4 mr-2" />
                                                                            Recent
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuSubContent>
                                                                </DropdownMenuSub>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600 dark:text-red-400" onClick={() => { }}>
                                                                    <Trash className="h-4 w-4 mr-2" />
                                                                    Remove
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center h-32 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                                    <p className="text-sm text-muted-foreground text-center mt-4">
                                                        No recent locations available.
                                                    </p>
                                                    <Button className="mt-3" variant="secondary" onClick={() => { }}>
                                                        <Bike className="h-4 w-4 mr-2" />
                                                        Start a Ride...
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}



                    </div>
                ) : // Check if ride is completed
                    ride?.RideStatus === "completed" ? (
                        renderCompletedRide()
                    ) : (
                        <div className="p-4 space-y-6">
                            <div className="text-center space-y-2">
                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                                    <Car className="h-8 w-8 text-blue-700" />
                                </div>
                                <h2 className="text-xl font-bold">
                                    {ride?.RideStatus === "ongoing" ? "Hang on tight" : "Your ride is on the way!"}
                                </h2>
                                <p className="text-muted-foreground">
                                    {ride?.RideStatus === "ongoing"
                                        ? "Rider will navigate you to your destination"
                                        : "Driver will arrive in approximately 3 minutes"}
                                </p>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Driver Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            {ride?.rider?.image ? (
                                                <img
                                                    src={ride.rider.image || "/placeholder.svg"}
                                                    className="h-11 w-11 rounded-full object-contain"
                                                    alt={ride.rider.name}
                                                />
                                            ) : (
                                                <User className="h-6 w-6 text-blue-700" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{ride?.rider?.name}</p>
                                            <div className="flex items-center">
                                                <p className="text-sm text-muted-foreground">4.9 ★</p>
                                                <span className="mx-1">•</span>
                                                <p className="text-sm text-muted-foreground">{ride?.vehicleDetails?.model}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">License Plate</p>
                                            <p className="font-medium">{ride?.vehicleDetails?.plateNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Car Color</p>
                                            <p className="font-medium">Silver</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => {
                                            window.open(`tel:${ride?.rider?.phone}`, "_blank")
                                        }}
                                    >
                                        Call
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 ml-2"
                                        onClick={() => {
                                            setIsMessageOpen(!isMessageOpen)
                                        }}
                                    >
                                        Message
                                    </Button>
                                </CardFooter>
                            </Card>
                            {ride && <MessageBox isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} rider={ride.rider} />}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Ride Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Pickup</p>
                                            <p className="font-medium">{ride?.pickUpLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Destination</p>
                                            <p className="font-medium">{ride?.dropOffLocation?.name.split(" ").slice(0, 3).join(" ")}...</p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Estimated Price</p>
                                            <p className="font-medium">Nrs {ride?.fare}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Payment Method</p>
                                            <p className="font-medium">Esewa/Cash</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant="destructive"
                                        className="w-full"
                                        disabled={cancelling}
                                        onClick={() => {
                                            cancelRide(ride?._id)
                                        }}
                                    >
                                        {cancelling ? "Cancelling..." : "Cancel Ride"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    )}
            </div>
        </>
    )
}
