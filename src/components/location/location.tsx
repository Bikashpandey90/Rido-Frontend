
import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Locate, MapPin } from "lucide-react"

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

// API endpoint for geocoding
const api = "https://nominatim.openstreetmap.org/search?"

interface LocationSearchProps {
    onLocationSelect: (lat: number, lon: number, displayName: string) => void
    onCurrentLocation: () => void
    label: string
    placeholder: string
    defaultValue?: string
    id: string
}

export default function LocationSearch({
    onLocationSelect,
    onCurrentLocation,
    label,
    placeholder,
    defaultValue = "",
    id,
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

    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="flex gap-2 relative">
                <Input
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    className="flex-1"
                    onChange={(e) => {
                        setSearch(e.target.value)
                        setValue(e.target.value)
                    }}
                />
                <Button variant="outline" size="icon" onClick={onCurrentLocation}>
                    <Locate className="h-4 w-4" />
                </Button>
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

export function SavedLocations() {
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
