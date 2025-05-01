
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, DollarSign, MapPin, Star } from "lucide-react"

interface RiderStatsProps {
    stats: {
        totalRides: number
        acceptanceRate: number
        averageRating: number
        totalEarnings: number
    }
}

export default function RiderStats({ stats }: RiderStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Rides</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-2xl font-bold">{stats.totalRides}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Acceptance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-2xl font-bold">{stats.acceptanceRate}%</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-2" />
                        <span className="text-2xl font-bold">{stats.averageRating}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
