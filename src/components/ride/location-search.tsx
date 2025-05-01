"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Locate, MapPin } from "lucide-react"
import { useController } from "react-hook-form"

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

interface LocationSearchProps {
    id: string
    label: string
    placeholder: string
    defaultValue?: string
    onLocationSelect: (lat: number, lon: number, displayName: string) => void
    useCurrentLocation?: boolean,
    name?: string
    errMsg?: string
    className?: string,
    control: any
}

// API endpoint for geocoding
const api = "https://nominatim.openstreetmap.org/search?"

export default function LocationSearch({
    id,
    label,
    name,
    errMsg,
    className = '',
    control,
    placeholder,
    defaultValue = "",
    onLocationSelect,
    useCurrentLocation = false,
}: LocationSearchProps) {
    const [search, setSearch] = useState<string>("")
    const [value, setValue] = useState(defaultValue)
    const [searchResults, setSearchResults] = useState<SearchResultTypes[]>([])
    const [debouncedSearch, setDebouncedSearch] = useState("")
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

    // Handle search debounce
    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current)
        }

        debounceTimeout.current = setTimeout(() => {
            setDebouncedSearch(search)
        }, 1000) // 1 second debounce

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current)
            }
        }
    }, [search])

    // Fetch search results
    useEffect(() => {
        if (debouncedSearch.length > 3) {
            const params = {
                q: debouncedSearch,
                format: "json",
                addressdetails: "1",
                polygon_geojson: "0",
            }
            const queryString = new URLSearchParams(params).toString()
            const requestOptions = {
                method: "GET",
                redirect: "follow" as RequestRedirect,
            }
            fetch(`${api}${queryString}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    setSearchResults(result)
                })
                .catch((err) => {
                    console.error(err)
                })
        } else {
            setSearchResults([])
        }
    }, [debouncedSearch])

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude
                    const lon = position.coords.longitude
                    setSearch("Current Location")
                    setValue("Current Location")
                    onLocationSelect(lat, lon, "Current Location")
                },
                (error) => {
                    console.error("Error getting current position:", error.message)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                },
            )
        }
    }

    const { field } = useController({
        control: control,
        name: name || "",
    })

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex gap-2 relative">
                <Input
                    id={id}
                    placeholder={placeholder}
                    {...field}
                    value={value}
                    className={`flex-1 ${className}`}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setValue(e.target.value)
                    }}

                />
                <span className="text-red-400">
                    {errMsg}
                </span>
                {useCurrentLocation && (
                    <Button variant="outline" size="icon" onClick={handleCurrentLocation}>
                        <Locate className="h-4 w-4" />
                    </Button>
                )}
                {!useCurrentLocation && (
                    <Button variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                    </Button>
                )}
                {searchResults.length > 0 && (
                    <div className="absolute z-10 top-full mt-1 w-full bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                        {searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900 cursor-pointer"
                                onClick={() => {
                                    setSearch(result.display_name)
                                    setValue(result.display_name)
                                    onLocationSelect(Number.parseFloat(result.lat), Number.parseFloat(result.lon), result.display_name)
                                    setSearchResults([])
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
    )
}
