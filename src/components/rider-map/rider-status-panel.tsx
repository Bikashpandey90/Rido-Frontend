import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car } from "lucide-react"
import RideRequestCard from "./ride-request-card"
import { useState } from "react"
import authSvc from "@/pages/auth/auth.service"

interface RiderStatusPanelProps {
    isOnline: boolean
    setIsOnline: (online: boolean) => void
    currentRide: any | null
    pendingRequests: any[]
    onAcceptRide: (id: string) => void
    onDeclineRide: (id: string) => void
    onNavigateToPickup: (id: string) => void
    onNavigateToDropoff: (id: string) => void
    onCompleteRide: (id: string) => void
    onCancelRide: (id: string) => void
    earnings: {
        today: number
        week: number
        month: number
    }
}

export default function RiderStatusPanel({
    isOnline,
    setIsOnline,
    currentRide,
    pendingRequests,
    onAcceptRide,
    onDeclineRide,
    onNavigateToPickup,
    onNavigateToDropoff,
    onCompleteRide,
    onCancelRide,
    earnings,
}: RiderStatusPanelProps) {

    const [isOnlineState, setIsOnlineState] = useState(false)
    console.log(isOnlineState)

    const updateStatus = async (availableStatus: boolean) => {
        try {

            const payload = {
                status: availableStatus
            }

            const response = await authSvc.updateStatus(payload)
            console.log(response.detail.isAvailable)
            setIsOnlineState(response.detail.isAvailable)
            setIsOnline(response.detail.isAvailable)


        } catch (exception) {
            console.log(exception)
        }
    }


    return (
        <div className="w-full md:w-96 bg-background border-t md:border-t-0 md:border-l md:h-screen md:overflow-y-auto">
            <div className="p-4">
                <Card className="mb-4">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300"}`}></div>
                                <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="online-mode" checked={isOnline} onCheckedChange={(checked) => { updateStatus(checked) }} />
                                <Label htmlFor="online-mode">Go {isOnline ? "Offline" : "Online"}</Label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {isOnline && (
                    <>
                        {currentRide && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-2">Current Ride</h2>
                                <RideRequestCard
                                    request={currentRide}
                                    onAccept={onAcceptRide}
                                    onDecline={onDeclineRide}
                                    onNavigate={currentRide.status === "accepted" ? onNavigateToPickup : onNavigateToDropoff}
                                    onComplete={onCompleteRide}
                                    onCancel={onCancelRide}
                                />
                            </div>
                        )}

                        {pendingRequests.length > 0 && (
                            <div className="mb-4">
                                <h2 className="text-lg font-bold mb-2">Pending Requests</h2>
                                {pendingRequests.map((request) => (
                                    <RideRequestCard
                                        key={request._id}
                                        request={request}
                                        onAccept={onAcceptRide}
                                        onDecline={onDeclineRide}
                                        onNavigate={onNavigateToPickup}
                                        onComplete={onCompleteRide}
                                        onCancel={onCancelRide}
                                    />
                                ))}
                            </div>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Earnings Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="today">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="today">Today</TabsTrigger>
                                        <TabsTrigger value="week">This Week</TabsTrigger>
                                        <TabsTrigger value="month">This Month</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="today" className="pt-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">${earnings.today.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">Today's Earnings</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="week" className="pt-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">${earnings.week.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">This Week's Earnings</p>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="month" className="pt-4">
                                        <div className="text-center">
                                            <p className="text-3xl font-bold">${earnings.month.toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">This Month's Earnings</p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </>
                )}

                {!isOnline && (
                    <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Car className="h-8 w-8 text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">You're Offline</h2>
                        <p className="text-muted-foreground mb-4">Go online to start receiving ride requests</p>
                        <Button className="bg-green-600 hover:bg-green-700"
                            onClick={
                                () => {
                                    updateStatus(true)
                                }
                            }>
                            Go Online
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
