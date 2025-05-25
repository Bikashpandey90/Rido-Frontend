"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { Car, LucideEye, LucideEyeOff, User, ChevronDown, ChevronUp, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavLink, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useContext, useEffect, useState } from "react"
import authSvc, { type UserType } from "./auth.service"
import { InputType, TextInputField } from "@/components/form/input.field"
import { useForm } from "react-hook-form"
import { AuthContext } from "@/context/auth.context"

const Login = () => {
    const [activeTab, setActiveTab] = useState<string>("customer")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setLoggedInUser } = useContext(AuthContext) as { setLoggedInUser: Function }
    const [showPassword, setShowPassword] = useState(false)
    const [showRiderPassword, setShowRiderPassword] = useState(false)
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }
    const toggleRiderPasswordVisibility = () => {
        setShowRiderPassword((prev) => !prev)
    }
    const LoginDTO = Yup.object({
        username: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required"),
    })
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(LoginDTO) })
    const submitForm = async (data: { username: string; password: string }) => {
        setLoading(true)
        try {
            const payload = {
                email: data.username,
                password: data.password,
            }
            const response: UserType = await authSvc.loginApi(payload)
            setLoggedInUser(response)
            navigate(`/${response?.role}`)
            // toast.success("Login sucess")
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }
    const submitRiderForm = async (data: { username: string; password: string }) => {
        setLoading(true)
        try {
            const payload = {
                email: data.username,
                password: data.password,
            }
            const response: UserType = await authSvc.RiderLoginApi(payload)
            console.log(response)
            setLoggedInUser(response)
            navigate(`/${response?.role}`)
            // toast.success("Login sucess")
        } catch (exception) {
            console.log(exception)
        } finally {
            setLoading(false)
        }
    }
    const auth = useContext(AuthContext) as { loggedInUser: any }
    useEffect(() => {
        if (auth.loggedInUser) {
            navigate(`/${auth.loggedInUser.role}`)
        }
    }, [])

    const [showCredentials, setShowCredentials] = useState(true)
    const [isCredentialsExpanded, setIsCredentialsExpanded] = useState(true)

    return (
        <>
            <div className="container flex h-screen w-screen flex-col items-center justify-center relative">
                {/* Credentials Panel - Toast Style */}
                {showCredentials && (
                    <div
                        className={`fixed right-4 top-4 z-50 w-80 max-w-[calc(100vw-2rem)] transition-all duration-300 ease-in-out ${isCredentialsExpanded ? "translate-x-0" : "translate-x-72"} sm:w-80 sm:max-w-none`}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">Demo Credentials</h3>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setIsCredentialsExpanded(!isCredentialsExpanded)}
                                        className="p-1 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded transition-colors"
                                        aria-label={isCredentialsExpanded ? "Collapse" : "Expand"}
                                    >
                                        {isCredentialsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>
                                    <button
                                        onClick={() => setShowCredentials(false)}
                                        className="p-1 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded transition-colors"
                                        aria-label="Close"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            {isCredentialsExpanded && (
                                <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                        Use these credentials to test the application:
                                    </div>

                                    {/* Customer Credentials */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                            <h4 className="font-medium text-sm text-blue-800 dark:text-blue-300">Customer Account</h4>
                                        </div>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                                                <span className="font-mono text-blue-700 dark:text-blue-300 select-all">bikashpandey835+rido2@gmail.com</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Password:</span>
                                                <span className="font-mono text-blue-700 dark:text-blue-300 select-all">Admin123#</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rider Credentials */}
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Car className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            <h4 className="font-medium text-sm text-green-800 dark:text-green-300">Rider Account</h4>
                                        </div>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                                                <span className="font-mono text-green-700 dark:text-green-300 select-all">
                                                    bikashpandey835+rider1@gmail.com
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Password:</span>
                                                <span className="font-mono text-green-700 dark:text-green-300 select-all">Admin123#</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admin Credentials */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-4 w-4 bg-purple-600 dark:bg-purple-400 rounded-sm flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">A</span>
                                            </div>
                                            <h4 className="font-medium text-sm text-purple-800 dark:text-purple-300">Admin Account</h4>
                                        </div>
                                        <div className="space-y-1 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                                                <span className="font-mono text-purple-700 dark:text-purple-300 select-all">
                                                    bikashpandey835+admin@gmail.com
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 dark:text-gray-400">Password:</span>
                                                <span className="font-mono text-purple-700 dark:text-purple-300 select-all">Admin123#</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2 border-t border-gray-200 dark:border-gray-600">
                                        Click credentials to copy • Demo purposes only
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Show credentials button when hidden */}
                {!showCredentials && (
                    <button
                        onClick={() => setShowCredentials(true)}
                        className="fixed right-4 top-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-200 text-sm font-medium"
                    >
                        Show Demo Credentials
                    </button>
                )}

                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to your {activeTab === "customer" ? "customer" : "rider"} account
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
                                    <CardTitle>Customer Login</CardTitle>
                                    <CardDescription>Enter your email and password to login to your customer account</CardDescription>
                                </CardHeader>
                                <form onSubmit={handleSubmit(submitForm)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="customer-email">Email</Label>
                                            <TextInputField
                                                type={InputType.EMAIL}
                                                name="username"
                                                control={control}
                                                placeholder="Enter your email"
                                                errMsg={errors?.username?.message as string}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="customer-password">Password</Label>
                                                <NavLink to="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                                                    Forgot password?
                                                </NavLink>
                                            </div>
                                            <div className="relative">
                                                <TextInputField
                                                    type={showPassword ? InputType.TEXT : InputType.PASSWORD}
                                                    name="password"
                                                    control={control}
                                                    placeholder="Enter your password"
                                                    errMsg={errors?.password?.message as string}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col">
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4" disabled={loading}>
                                            Sign In
                                        </Button>
                                        <p className="mt-4 text-center text-sm text-muted-foreground">
                                            Don&apos;t have an account?{" "}
                                            <NavLink to="/register" className="text-blue-600 hover:underline">
                                                Sign up
                                            </NavLink>
                                        </p>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>

                        <TabsContent value="rider">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rider Login</CardTitle>
                                    <CardDescription>Enter your email and password to login to your rider account</CardDescription>
                                </CardHeader>
                                <form onSubmit={handleSubmit(submitRiderForm)}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="rider-email">Email</Label>
                                            <TextInputField
                                                type={InputType.EMAIL}
                                                name="username"
                                                control={control}
                                                placeholder="Enter your email"
                                                errMsg={errors?.username?.message as string}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="rider-password">Password</Label>
                                                <NavLink to="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                                                    Forgot password?
                                                </NavLink>
                                            </div>
                                            <div className="relative">
                                                <TextInputField
                                                    type={showRiderPassword ? InputType.TEXT : InputType.PASSWORD}
                                                    name="password"
                                                    control={control}
                                                    placeholder="Enter your password"
                                                    errMsg={errors?.password?.message as string}
                                                />
                                                <button
                                                    type="button"
                                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50"
                                                    onClick={toggleRiderPasswordVisibility}
                                                >
                                                    {showRiderPassword ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col">
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                                            Sign In
                                        </Button>
                                        <p className="mt-4 text-center text-sm text-muted-foreground">
                                            Don&apos;t have an account?{" "}
                                            <NavLink to="/register" className="text-blue-600 hover:underline">
                                                Sign up
                                            </NavLink>
                                        </p>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
export default Login
