import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle, CardHeader, CardFooter, CardContent } from "@/components/ui/card"
import { Car, LucideEye, LucideEyeOff, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavLink, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useContext, useEffect, useState } from "react"
import authSvc, { UserType } from "./auth.service"
import { InputType, TextInputField } from "@/components/form/input.field"
import { useForm } from "react-hook-form"
import { AuthContext } from "@/context/auth.context"

const Login = () => {
    const [activeTab, setActiveTab] = useState<string>('customer')
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
        username: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),

    })




    const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(LoginDTO) })


    const submitForm = async (data: { username: string, password: string }) => {
        setLoading(true)
        try {
            let payload = {
                email: data.username,
                password: data.password

            }
            let response: UserType = await authSvc.loginApi(payload)
            setLoggedInUser(response)


            navigate(`/${response?.role}`)


            // toast.success("Login sucess")
        } catch (exception) {
            console.log(exception)
        }
        finally {
            setLoading(false)
        }

    }


    const submitRiderForm = async (data: { username: string, password: string }) => {
        setLoading(true)
        try {
            let payload = {
                email: data.username,
                password: data.password

            }
            let response: UserType = await authSvc.RiderLoginApi(payload)
            console.log(response)
            setLoggedInUser(response)

            navigate(`/${response?.role}`)
            // toast.success("Login sucess")
        } catch (exception) {
            console.log(exception)
        }
        finally {
            setLoading(false)
        }


    }
    const auth = useContext(AuthContext) as { loggedInUser: any }

    useEffect(() => {
        if (auth.loggedInUser) {
            navigate(`/${auth.loggedInUser.role}`)
        }
    }, [])




    return <>

        <div className="container flex h-screen w-screen flex-col items-center justify-center ">


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

                    <TabsContent value="customer" >
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
                                        {/* <Input id="customer-email" type="email" placeholder="name@example.com" required /> */}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="customer-password">Password</Label>
                                            <NavLink to="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                                                Forgot password?
                                            </NavLink>
                                        </div>
                                        {/* <TextInputField
                                            type={InputType.PASSWORD}
                                            name="password"
                                            control={control}
                                            placeholder="Enter your password"
                                            errMsg={errors?.password?.message as string}

                                        /> */}
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
                                        {/* <Input id="customer-password" type="password" required /> */}
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
                                        {/* <Input id="rider-email" type="email" placeholder="name@example.com" required /> */}
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
                                            <button type="button" className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-text-gray-50" onClick={toggleRiderPasswordVisibility}>
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
}
export default Login