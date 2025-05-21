"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label" // Fixed import from radix to shadcn
import { Car, LucideEye, LucideEyeOff, Upload, User } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import authSvc from "./auth.service"
import { InputType, TextInputField } from "@/components/form/input.field"
import OTPModal from "@/components/otp/otp-modal"

const Register = () => {
    const [activeTab, setActiveTab] = useState<string>("customer")
    const [registeredUser, setRegisteredUser] = useState()
    const [showOtpModal, setShowOtpModal] = useState(false)
    const [laoding, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [showRiderPassword, setShowRiderPassword] = useState(false)
    const [showRiderConfirmPassword, setShowRiderConfirmPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev)
    }
    const toggleRiderPasswordVisibility = () => {
        setShowRiderPassword((prev) => !prev)
    }
    const toggleRiderConfirmPasswordVisibility = () => {
        setShowRiderConfirmPassword((prev) => !prev)
    }


    const registerDTO = Yup.object({
        name: Yup.string().min(2).max(50).required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"), //define regex similar to backend
        confirmPassword: Yup.string()
            .equals([Yup.ref("password")], "Confirm password and password must be same")
            .required("Confirm password is required"),
        address: Yup.string().max(200).default("").required(),
        phone: Yup.string().max(15),
        image: Yup.mixed(),
    })
    const registerRiderDTO = Yup.object({
        name: Yup.string().min(2).max(50).required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string().required("Password is required"), //define regex similar to backend
        confirmPassword: Yup.string()
            .equals([Yup.ref("password")], "Confirm password and password must be same")
            .required("Confirm password is required"),
        address: Yup.string().max(200).default("").required(),
        phone: Yup.string().max(15),
        image: Yup.mixed(),
        nid: Yup.number().required(),
        vehicleType: Yup.string().oneOf(["car", "bike"]).default("bike").required("Vehicle type is required"),
        model: Yup.string().required("Vehicle model is required"),
        plateNumber: Yup.string().required("Plate number is required"),
        registrationNumber: Yup.string().required("Registration number is required"),
    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(activeTab === "rider" ? registerRiderDTO : registerDTO),
    })

    const register = async (data: any) => {
        setLoading(true)
        try {
            const response = await authSvc.registerApi(data)

            console.log(response)
            setRegisteredUser(response.data)
            setShowOtpModal(true)
            console.log("OTP Modal state:", showOtpModal) // Debugging purpose
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }

    const riderRegister = async (data: any) => {
        setLoading(true)
        try {
            // Create a copy of the data object
            const payload = {
                ...data,
                vehicle: {
                    vehicleType: data.vehicleType || "bike",
                    model: data.model,
                    plateNumber: data.plateNumber,
                    registrationNumber: data.registrationNumber,
                },
            }

            // Remove vehicle fields from the payload's root level
            delete payload.vehicleType
            delete payload.model
            delete payload.plateNumber
            delete payload.registrationNumber

            const response = await authSvc.registerRiderApi(payload)
            setRegisteredUser(response.data)
            setShowOtpModal(true)
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container py-8 md:py-12 w-full max-w-7xl mx-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Sign up for a {activeTab === "customer" ? "customer" : "rider"} account
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="customer" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Customer
                        </TabsTrigger>
                        <TabsTrigger value="rider" className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Rider
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="customer">
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Registration</CardTitle>
                                <CardDescription>Create a customer account to book rides</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit(register)}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-name">Full Name</Label>
                                        {/* <Input id="customer-name" placeholder="John Doe" required /> */}
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="name"
                                            control={control}
                                            placeholder="John Doe"
                                            errMsg={errors?.name?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-email">Email</Label>
                                        {/* <Input id="customer-email" type="email" placeholder="name@example.com" required /> */}
                                        <TextInputField
                                            type={InputType.EMAIL}
                                            name="email"
                                            control={control}
                                            placeholder="example@gmail.com"
                                            errMsg={errors?.email?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-phone">Phone Number</Label>
                                        {/* <Input id="customer-phone" type="tel" placeholder="+1 (555) 000-0000" /> */}
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="phone"
                                            control={control}
                                            placeholder="+1 (555) 000-0000"
                                            errMsg={errors?.phone?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-password">Password</Label>
                                        {/* <Input id="customer-password" type="password" required /> */}
                                        <div className="relative">
                                            <TextInputField
                                                type={showPassword ? InputType.TEXT : InputType.PASSWORD}
                                                name="password"
                                                control={control}
                                                placeholder="Enter your password"
                                                errMsg={errors?.password?.message as string}
                                            />
                                            <button type="button" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50" onClick={togglePasswordVisibility}>
                                                {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-confirm-password">Confirm Password</Label>
                                        {/* <Input id="customer-confirm-password" type="password" required /> */}
                                        <div className="relative">
                                            <TextInputField
                                                type={showConfirmPassword ? InputType.TEXT : InputType.PASSWORD}
                                                name="confirmPassword"
                                                control={control}
                                                placeholder="Confirm your password"
                                                errMsg={errors?.confirmPassword?.message as string}
                                            />
                                            <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50">
                                                {showConfirmPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-image">Profile Image (Optional)</Label>
                                        <div className="flex items-center gap-4">
                                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                                <User className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <Button type="button" variant="outline" className="flex gap-2">
                                                <Upload className="h-4 w-4" />
                                                Upload Image
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customer-address">Address (Optional)</Label>
                                        {/* <Input id="customer-address" placeholder="123 Main St, City, Country" /> */}
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="address"
                                            control={control}
                                            placeholder="123 Main St, City, Country"
                                            errMsg={errors?.address?.message as string}
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={laoding}>
                                        Create Account
                                    </Button>
                                    <p className="mt-4 text-center text-sm text-muted-foreground">
                                        Already have an account?{" "}
                                        <NavLink to="/login" className="text-blue-600 hover:underline">
                                            Sign in
                                        </NavLink>
                                    </p>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rider">
                        <Card>
                            <CardHeader>
                                <CardTitle>Rider Registration</CardTitle>
                                <CardDescription>Create a rider account to start earning</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit(riderRegister)}>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-name">Full Name</Label>
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="name"
                                            control={control}
                                            placeholder="John Doe"
                                            errMsg={errors?.name?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-email">Email</Label>
                                        <TextInputField
                                            type={InputType.EMAIL}
                                            name="email"
                                            control={control}
                                            placeholder="example@gmail.com"
                                            errMsg={errors?.email?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-phone">Phone Number</Label>
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="phone"
                                            control={control}
                                            placeholder="+1 (555) 000-0000s"
                                            errMsg={errors?.phone?.message as string}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-password">Password</Label>
                                        <div className="relative">
                                            <TextInputField
                                                type={showRiderPassword ? InputType.TEXT : InputType.PASSWORD}
                                                name="password"
                                                control={control}
                                                placeholder="Create a password"
                                                errMsg={errors?.password?.message as string}
                                            />
                                            <button type="button" onClick={toggleRiderPasswordVisibility} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50">
                                                {
                                                    showRiderPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />
                                                }

                                            </button>
                                        </div>


                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-confirm-password">Confirm Password</Label>
                                        <div className="relative">
                                            <TextInputField
                                                type={showRiderConfirmPassword ? InputType.TEXT : InputType.PASSWORD}
                                                name="confirmPassword"
                                                control={control}
                                                placeholder="Confirm your password"
                                                errMsg={errors?.confirmPassword?.message as string}
                                            />
                                            <button type="button" onClick={toggleRiderConfirmPasswordVisibility} className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50">
                                                {
                                                    showRiderConfirmPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-nid">National ID Number</Label>
                                        <TextInputField
                                            type={InputType.NUMBER}
                                            name="nid"
                                            control={control}
                                            placeholder="4055 8784 98"
                                            errMsg='Nid Error'
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rider-address">Address</Label>
                                        <TextInputField
                                            type={InputType.TEXT}
                                            name="address"
                                            control={control}
                                            placeholder="123 Main St, City, Country"
                                            errMsg='Address Error'
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="rider-image">Profile Image</Label>
                                            <div className="flex items-center gap-2">
                                                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                                <Button type="button" variant="outline" className="flex gap-2 w-full">
                                                    <Upload className="h-4 w-4" />
                                                    Upload
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="rider-license">Driver License</Label>
                                            <Button type="button" variant="outline" className="flex gap-2 w-full">
                                                <Upload className="h-4 w-4" />
                                                Upload License
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Vehicle Information</Label>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="vehicle-type">Vehicle Type</Label>
                                                <TextInputField
                                                    type={InputType.SELECT}
                                                    name="vehicleType"
                                                    control={control}
                                                    placeholder="Select type"
                                                    options={[
                                                        { label: "Car", value: "car" },
                                                        { label: "Bike", value: "bike" },
                                                    ]}
                                                    defaultValue="bike"
                                                    errMsg='Vehicle Type error'
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="vehicle-model">Vehicle Model</Label>
                                                {/* <Input id="vehicle-model" placeholder="Toyota Camry" required /> */}
                                                <TextInputField
                                                    type={InputType.TEXT}
                                                    name="model"
                                                    control={control}
                                                    placeholder="Toyota Camry"
                                                    errMsg='Model error'
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="plate-number">Plate Number</Label>
                                                <TextInputField
                                                    type={InputType.TEXT}
                                                    name="plateNumber"
                                                    control={control}
                                                    placeholder="ABC-123"
                                                    errMsg='Plate Number error'
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="registration-number">Registration Number</Label>
                                                {/* <Input id="registration-number" placeholder="REG12345" required /> */}
                                                <TextInputField
                                                    type={InputType.TEXT}
                                                    name="registrationNumber"
                                                    control={control}
                                                    placeholder="REG12345"
                                                    errMsg='Registration number error'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex flex-col">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={laoding}>
                                        Create Account
                                    </Button>
                                    <p className="mt-4 text-center text-sm text-muted-foreground">
                                        Already have an account?{" "}
                                        <NavLink to="/login" className="text-blue-600 hover:underline">
                                            Sign in
                                        </NavLink>
                                    </p>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            {
                showOtpModal && (
                    <OTPModal open={showOtpModal} onOpenChange={(open) => setShowOtpModal(open)} user={registeredUser} role={activeTab as "customer" | "rider"} />
                )
            }
        </div >
    )
}

export default Register

