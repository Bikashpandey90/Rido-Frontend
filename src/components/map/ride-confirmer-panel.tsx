import { Car, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function RideConfirmedPanel() {
    return (
        <div className="p-4 space-y-6">
            <div className="text-center space-y-2">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                    <Car className="h-8 w-8 text-blue-700" />
                </div>
                <h2 className="text-xl font-bold">Your ride is on the way!</h2>
                <p className="text-muted-foreground">Driver will arrive in approximately 3 minutes</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Driver Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-6 w-6 text-blue-700" />
                        </div>
                        <div>
                            <p className="font-medium">Michael Johnson</p>
                            <div className="flex items-center">
                                <p className="text-sm text-muted-foreground">4.9 ★</p>
                                <span className="mx-1">•</span>
                                <p className="text-sm text-muted-foreground">Toyota Camry</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">License Plate</p>
                            <p className="font-medium">ABC 123</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Car Color</p>
                            <p className="font-medium">Silver</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" className="flex-1">
                        Call
                    </Button>
                    <Button variant="outline" className="flex-1 ml-2">
                        Message
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Ride Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Pickup</p>
                            <p className="font-medium">123 Main St</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Destination</p>
                            <p className="font-medium">456 Market St</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">Estimated Price</p>
                            <p className="font-medium">$18.75</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">Payment Method</p>
                            <p className="font-medium">Credit Card (*4242)</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="destructive" className="w-full">
                        Cancel Ride
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
