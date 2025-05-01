// API endpoint for geocoding
const GEOCODING_API = "https://nominatim.openstreetmap.org/search?"

export interface SearchResultTypes {
    display_name: string
    lat: string
    lon: string
    address: {
        road: string
        city: string
        state: string
        country: string
    }
}

export async function searchLocation(query: string): Promise<SearchResultTypes[]> {
    if (query.length <= 3) {
        return []
    }

    const params = {
        q: query,
        format: "json",
        addressdetails: "1",
        polygon_geojson: "0",
    }

    const queryString = new URLSearchParams(params).toString()

    try {
        const response = await fetch(`${GEOCODING_API}${queryString}`)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error searching location:", error)
        return []
    }
}

export interface RideRequestPayload {
    pickupLocation: {
        lat: number
        lng: number
        address: string
    }
    destination: {
        lat: number
        lng: number
        address: string
    }
    vehicleType: string
    paymentMethod: string
    scheduledTime?: string
}

export interface RideResponse {
    rideId: string
    status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
    driverInfo?: {
        name: string
        rating: number
        vehicle: string
        licensePlate: string
        color: string
        eta: number
    }
    fare: {
        amount: number
        currency: string
    }
}

// Mock API call for ride request
export async function requestRide(payload: RideRequestPayload): Promise<RideResponse> {
    // In a real app, this would be an actual API call
    console.log("Requesting ride with payload:", payload)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock response
    return {
        rideId: `ride_${Math.random().toString(36).substring(2, 10)}`,
        status: "confirmed",
        driverInfo: {
            name: "Michael Johnson",
            rating: 4.9,
            vehicle: "Toyota Camry",
            licensePlate: "ABC 123",
            color: "Silver",
            eta: 3,
        },
        fare: {
            amount: 18.75,
            currency: "USD",
        },
    }
}
