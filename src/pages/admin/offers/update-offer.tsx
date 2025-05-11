import { Calendar, Save, Tag, ArrowLeft, Info, X, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"

export default function UpdateOfferPage() {
    // Sample offer data for editing
    const offer = {
        id: "OFF-1001",
        name: "Weekend Special",
        code: "WEEKEND25",
        type: "Percentage",
        value: 25,
        status: "Active",
        startDate: "2025-05-01",
        endDate: "2025-06-30",
        usageLimit: 1000,
        usageCount: 342,
        description: "25% off on all weekend rides. Valid for all users on Saturday and Sunday rides only.",
        minOrderValue: 15,
        maxDiscount: 50,
        userType: "All Users",
        createdBy: "Admin",
        createdAt: "2025-04-15",
        lastModified: "2025-04-28",
        termsAndConditions: [
            "Valid only on weekends (Saturday and Sunday)",
            "Minimum ride value of $15",
            "Maximum discount of $50",
            "Cannot be combined with other offers",
            "Valid for all ride types",
            "Limited to one use per customer per weekend",
        ],
    }
    const navigate = useNavigate()

    return (
        <>
            {/* Update Offer Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6">
                <div className="flex flex-col gap-6">
                    {/* Header with back button */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="gap-1"
                                onClick={() => {
                                    navigate(-1)
                                }}

                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Offer Details
                            </Button>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Update Offer</h1>
                                <p className="text-sm md:text-base text-muted-foreground">Edit offer details and settings</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button variant="outline" size="sm">
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1"
                                    size="sm"
                                >
                                    <Save className="h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Active
                        </Badge>
                        <span className="text-sm text-muted-foreground">This offer is currently active and visible to users</span>
                    </div>

                    {/* Form Tabs */}
                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full max-w-md">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="rules">Rules & Limits</TabsTrigger>
                            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                        </TabsList>

                        {/* Basic Info Tab */}
                        <TabsContent value="basic" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>Essential details about the offer</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Offer Name</Label>
                                                <Input id="name" defaultValue={offer.name} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="code">Offer Code</Label>
                                                <Input id="code" defaultValue={offer.code} className="font-mono uppercase" />
                                                <p className="text-xs text-muted-foreground">
                                                    This is the code users will enter to redeem the offer
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Textarea id="description" defaultValue={offer.description} rows={4} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Discount Type</Label>
                                                <RadioGroup defaultValue={offer.type === "Percentage" ? "percentage" : "fixed"}>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="percentage" id="percentage" />
                                                        <Label htmlFor="percentage" className="cursor-pointer">
                                                            Percentage Discount
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="fixed" id="fixed" />
                                                        <Label htmlFor="fixed" className="cursor-pointer">
                                                            Fixed Amount
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="value">Discount Value</Label>
                                                <div className="flex items-center">
                                                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">
                                                        {offer.type === "Percentage" ? "%" : "$"}
                                                    </span>
                                                    <Input
                                                        id="value"
                                                        type="number"
                                                        defaultValue={offer.value}
                                                        className="rounded-l-none"
                                                        min={0}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Validity Period</Label>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="startDate" className="text-xs">
                                                            Start Date
                                                        </Label>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input id="startDate" type="date" defaultValue={offer.startDate} className="pl-10" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="endDate" className="text-xs">
                                                            End Date
                                                        </Label>
                                                        <div className="relative">
                                                            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input id="endDate" type="date" defaultValue={offer.endDate} className="pl-10" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="status">Status</Label>
                                                <Select defaultValue={offer.status.toLowerCase()}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="active">Active</SelectItem>
                                                        <SelectItem value="scheduled">Scheduled</SelectItem>
                                                        <SelectItem value="paused">Paused</SelectItem>
                                                        <SelectItem value="expired">Expired</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Rules & Limits Tab */}
                        <TabsContent value="rules" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Rules & Limitations</CardTitle>
                                    <CardDescription>Set constraints and eligibility criteria</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="userType">Eligible Users</Label>
                                                <Select defaultValue={offer.userType.toLowerCase().replace(" ", "-")}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select user type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all-users">All Users</SelectItem>
                                                        <SelectItem value="new-users">New Users</SelectItem>
                                                        <SelectItem value="loyal-users">Loyal Users</SelectItem>
                                                        <SelectItem value="corporate">Corporate</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="minOrderValue">Minimum Ride Value</Label>
                                                <div className="flex items-center">
                                                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">$</span>
                                                    <Input
                                                        id="minOrderValue"
                                                        type="number"
                                                        defaultValue={offer.minOrderValue}
                                                        className="rounded-l-none"
                                                        min={0}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Minimum ride value required to use this offer</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="maxDiscount">Maximum Discount</Label>
                                                <div className="flex items-center">
                                                    <span className="bg-muted px-3 py-2 rounded-l-md border border-r-0 border-input">$</span>
                                                    <Input
                                                        id="maxDiscount"
                                                        type="number"
                                                        defaultValue={offer.maxDiscount}
                                                        className="rounded-l-none"
                                                        min={0}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Maximum discount amount that can be applied (for percentage discounts)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="usageLimit">Total Usage Limit</Label>
                                                <Input id="usageLimit" type="number" defaultValue={offer.usageLimit} min={0} />
                                                <p className="text-xs text-muted-foreground">
                                                    Maximum number of times this offer can be redeemed
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="userLimit">Per User Limit</Label>
                                                <Input id="userLimit" type="number" defaultValue={1} min={0} />
                                                <p className="text-xs text-muted-foreground">
                                                    Maximum number of times a single user can redeem this offer
                                                </p>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="weekendOnly" className="cursor-pointer">
                                                        Weekend Only
                                                    </Label>
                                                    <Switch id="weekendOnly" defaultChecked />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Restrict offer to Saturday and Sunday only</p>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="firstRideOnly" className="cursor-pointer">
                                                        First Ride Only
                                                    </Label>
                                                    <Switch id="firstRideOnly" />
                                                </div>
                                                <p className="text-xs text-muted-foreground">Restrict offer to user's first ride only</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium">Ride Types</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="standard" className="rounded" defaultChecked />
                                                <Label htmlFor="standard" className="cursor-pointer">
                                                    Standard
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="premium" className="rounded" defaultChecked />
                                                <Label htmlFor="premium" className="cursor-pointer">
                                                    Premium
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="xl" className="rounded" defaultChecked />
                                                <Label htmlFor="xl" className="cursor-pointer">
                                                    XL
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="pool" className="rounded" defaultChecked />
                                                <Label htmlFor="pool" className="cursor-pointer">
                                                    Pool
                                                </Label>
                                            </div>
                                        </div>
                                    </div>

                                    <Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-500">
                                        <Info className="h-4 w-4" />
                                        <AlertDescription>
                                            Changing rules for an active offer may affect users who have already viewed but not yet redeemed
                                            the offer.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Terms & Conditions Tab */}
                        <TabsContent value="terms" className="space-y-6 mt-6">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Terms & Conditions</CardTitle>
                                    <CardDescription>Define the rules and restrictions for this offer</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        {offer.termsAndConditions.map((term, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Input defaultValue={term} className="flex-1" />
                                                <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}

                                        <Button variant="outline" className="w-full gap-1">
                                            <Plus className="h-4 w-4" />
                                            Add Term
                                        </Button>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <Label htmlFor="additionalTerms">Additional Terms</Label>
                                        <Textarea
                                            id="additionalTerms"
                                            placeholder="Enter any additional terms and conditions..."
                                            rows={4}
                                        />
                                    </div>

                                    <Alert className="bg-muted">
                                        <Info className="h-4 w-4" />
                                        <AlertDescription>
                                            Standard platform terms and conditions will automatically apply in addition to the specific terms
                                            listed above.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                    <CardDescription>How terms will appear to users</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-muted p-4 rounded-lg">
                                        <h3 className="font-medium mb-2">Terms & Conditions for Weekend Special</h3>
                                        <ul className="space-y-2 text-sm">
                                            {offer.termsAndConditions.map((term, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="rounded-full bg-indigo-100 p-1 mt-0.5">
                                                        <Tag className="h-3 w-3 text-indigo-600" />
                                                    </div>
                                                    <span>{term}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-muted-foreground mt-4">
                                            By using this offer, you agree to the standard terms and conditions of our platform.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4">
                        <Button variant="outline" className="gap-1">
                            <X className="h-4 w-4" />
                            Cancel
                        </Button>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline">Save as Draft</Button>
                            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 gap-1">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
