
import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Locate, MapPin } from "lucide-react"
import { LocationInputField, TextInputField, InputType } from "@/components/form/input.field"
import { searchLocation, type SearchResultTypes } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

interface LocationSearchFormProps {
    onLocationSelect: (type: "pickup" | "destination", lat: number, lon: number, displayName: string) => void
    onCurrentLocation: () => void
    onShowRoute: () => void
    onContinue: () => void
}

interface FormValues {
    pickup: string
    destination: string
    date?: string
    time?: string
}

export default function LocationSearchForm({
    onLocationSelect,
    onCurrentLocation,
    onShowRoute,
    onContinue,
}: LocationSearchFormProps) {
    const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            pickup: "",
            destination: "",
        },
    })

    const [pickupSearch, setPickupSearch] = useState<string>("")
    const [destinationSearch, setDestinationSearch] = useState<string>("")
    const [pickupResults, setPickupResults] = useState<SearchResultTypes[]>([])
    const [destinationResults, setDestinationResults] = useState<SearchResultTypes[]>([])
    const [showPickupResults, setShowPickupResults] = useState(false)
    const [showDestinationResults, setShowDestinationResults] = useState(false)

    const pickupValue = watch("pickup")
    const destinationValue = watch("destination")

    const pickupDebounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const destinationDebounceTimeout = useRef<NodeJS.Timeout | null>(null)

    // Add state to track coordinates
    const [pickupCoordinates, setPickupCoordinates] = useState<{ lat: number | null; lng: number | null }>({
        lat: null,
        lng: null,
    })
    const [destinationCoordinates, setDestinationCoordinates] = useState<{ lat: number | null; lng: number | null }>({
        lat: null,
        lng: null,
    })

    // Handle pickup search debounce
    useEffect(() => {
        if (pickupDebounceTimeout.current) {
            clearTimeout(pickupDebounceTimeout.current)
        }

        setPickupSearch(pickupValue)

        pickupDebounceTimeout.current = setTimeout(async () => {
            if (pickupValue && pickupValue.length > 3) {
                const results = await searchLocation(pickupValue)
                setPickupResults(results)
                setShowPickupResults(results.length > 0)
            } else {
                setPickupResults([])
                setShowPickupResults(false)
            }
        }, 500)

        return () => {
            if (pickupDebounceTimeout.current) {
                clearTimeout(pickupDebounceTimeout.current)
            }
        }
    }, [pickupValue])

    // Handle destination search debounce
    useEffect(() => {
        if (destinationDebounceTimeout.current) {
            clearTimeout(destinationDebounceTimeout.current)
        }

        setDestinationSearch(destinationValue)

        destinationDebounceTimeout.current = setTimeout(async () => {
            if (destinationValue && destinationValue.length > 3) {
                const results = await searchLocation(destinationValue)
                setDestinationResults(results)
                setShowDestinationResults(results.length > 0)
            } else {
                setDestinationResults([])
                setShowDestinationResults(false)
            }
        }, 500)

        return () => {
            if (destinationDebounceTimeout.current) {
                clearTimeout(destinationDebounceTimeout.current)
            }
        }
    }, [destinationValue])

    // Handle form submission
    const onSubmit = (data: FormValues) => {
        console.log("Form submitted:", data)

        // Check if we have coordinates for both pickup and destination
        if (!pickupCoordinates.lat || !pickupCoordinates.lng) {
            // alert("Please select a valid pickup location from the suggestions")
            return
        }

        if (!destinationCoordinates.lat || !destinationCoordinates.lng) {
            // alert("Please select a valid destination from the suggestions")
            return
        }

        onContinue()
    }

    // Handle click outside to close results
    useEffect(() => {
        const handleClickOutside = () => {
            setShowPickupResults(false)
            setShowDestinationResults(false)
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    // Update the current location handler
    const handleCurrentLocation = () => {
        onCurrentLocation()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPickupCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            })
        }
        setValue("pickup", "Current Location")
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-xl font-bold">Request a Ride</h2>

            <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <LocationInputField
                        control={control}
                        name="pickup"
                        placeholder="Current location"
                        icon={<Locate className="h-4 w-4" />}
                        errMsg="Please provide a valid pickup location"
                        onLocationSelect={() => {
                            handleCurrentLocation()
                        }}
                    />

                    {showPickupResults && (
                        <div className="absolute z-10 top-full mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                            {pickupResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setValue("pickup", result.display_name)
                                        setPickupCoordinates({
                                            lat: Number.parseFloat(result.lat),
                                            lng: Number.parseFloat(result.lon),
                                        })
                                        onLocationSelect(
                                            "pickup",
                                            Number.parseFloat(result.lat),
                                            Number.parseFloat(result.lon),
                                            result.display_name,
                                        )
                                        setShowPickupResults(false)
                                    }}
                                >
                                    <p className="text-sm font-medium">{result.display_name}</p>
                                    {result.address && (
                                        <p className="text-xs text-muted-foreground">
                                            {[result.address.road, result.address.city, result.address.state, result.address.country]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <LocationInputField
                        control={control}
                        name="destination"
                        placeholder="Enter destination"
                        icon={<MapPin className="h-4 w-4" />}
                        errMsg="Please provide a valid destination"
                    />

                    {showDestinationResults && (
                        <div className="absolute z-10 top-full mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                            {destinationResults.map((result, index) => (
                                <div
                                    key={index}
                                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setValue("destination", result.display_name)
                                        setDestinationCoordinates({
                                            lat: Number.parseFloat(result.lat),
                                            lng: Number.parseFloat(result.lon),
                                        })
                                        onLocationSelect(
                                            "destination",
                                            Number.parseFloat(result.lat),
                                            Number.parseFloat(result.lon),
                                            result.display_name,
                                        )
                                        setShowDestinationResults(false)
                                        onShowRoute()
                                    }}
                                >
                                    <p className="text-sm font-medium">{result.display_name}</p>
                                    {result.address && (
                                        <p className="text-xs text-muted-foreground">
                                            {[result.address.road, result.address.city, result.address.state, result.address.country]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

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
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Continue
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="schedule">
                    <div className="pt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <TextInputField control={control} name="date" type={InputType.DATE} errMsg="Please select a valid date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <TextInputField control={control} name="time" type={InputType.TIME} errMsg="Please select a valid time" />
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Continue
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>

            <SavedLocations
                onSelect={(address) => {
                    setValue("destination", address)
                    // In a real app, you would also get coordinates for this address
                }}
            />
        </form>
    )
}

interface SavedLocationsProps {
    onSelect: (address: string) => void
}

export function SavedLocations({ onSelect }: SavedLocationsProps) {
    const savedLocations = [
        { name: "Home", address: "123 Main St, Anytown" },
        { name: "Work", address: "456 Office Blvd, Business District" },
    ]

    return (
        <div className="pt-4">
            <h3 className="font-medium mb-2">Saved Locations</h3>
            <div className="space-y-2">
                {savedLocations.map((location, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 p-2 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 cursor-pointer"
                        onClick={() => onSelect(location.address)}
                    >
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                            <p className="font-medium">{location.name}</p>
                            <p className="text-xs text-muted-foreground">{location.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
