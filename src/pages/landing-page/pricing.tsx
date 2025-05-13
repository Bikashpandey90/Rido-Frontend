import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"


const Pricing = () => {
    return <section id="pricing" className="w-full py-10 md:py-16 lg:py-24">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-900 text-xs">
                    Pricing
                </Badge>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
                        Transparent Pricing
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground text-sm sm:text-base md:text-lg">
                        Choose the vehicle type that suits your needs and budget. No hidden fees, just straightforward
                        pricing.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-5xl py-6 md:py-10">
                <Tabs defaultValue="standard" className="w-full">
                    <TabsList className="grid w-full max-w-xs xs:max-w-sm sm:max-w-md mx-auto grid-cols-3 mb-6">
                        <TabsTrigger value="economy" className="text-xs sm:text-sm">
                            Economy
                        </TabsTrigger>
                        <TabsTrigger value="standard" className="text-xs sm:text-sm">
                            Standard
                        </TabsTrigger>
                        <TabsTrigger value="premium" className="text-xs sm:text-sm">
                            Premium
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="economy" className="space-y-4">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <CardContent className="p-3 sm:p-4 md:p-6">
                                <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Base Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$2.50</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Mile</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$1.25</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Minute</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$0.15</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Minimum Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$5.00</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="standard" className="space-y-4">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <CardContent className="p-3 sm:p-4 md:p-6">
                                <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Base Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$3.50</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Mile</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$1.75</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Minute</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$0.20</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Minimum Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$7.00</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="premium" className="space-y-4">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <CardContent className="p-3 sm:p-4 md:p-6">
                                <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Base Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$5.00</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Mile</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$2.50</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Per Minute</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$0.30</p>
                                    </div>
                                    <div className="space-y-1 sm:space-y-2">
                                        <h3 className="text-sm sm:text-base font-medium">Minimum Fare</h3>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">$10.00</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    </section>
}

export default Pricing