"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Mail, ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
import authSvc from "@/pages/auth/auth.service"

interface OTPModalProps {
    open: boolean
    onOpenChange?: (open: boolean) => void
    user: any
    role: "rider" | "customer"
}

const OTPModal = ({ open, onOpenChange, user = {}, role }: OTPModalProps) => {
    console.log("OTPModal rendered with open:", open, "and user:", user)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [activeInput, setActiveInput] = useState(0)
    const navigate = useNavigate()

    console.log("Passed otp state :", open)
    // Focus first input on mount
    useEffect(() => {
        console.log("OTPModal effect triggered, open:", open)
        if (open && inputRefs.current[0]) {
            setTimeout(() => {
                inputRefs.current[0]?.focus()
            }, 100)
        }
    }, [open])

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d+$/.test(value)) return

        const newOtpValues = [...otpValues]

        // Handle paste event with multiple characters
        if (value.length > 1) {
            const pastedValues = value.split("").slice(0, otpValues.length)

            for (let i = 0; i < pastedValues.length; i++) {
                if (i + index < otpValues.length) {
                    newOtpValues[i + index] = pastedValues[i]
                }
            }

            setOtpValues(newOtpValues)

            // Focus on the next empty input or the last input
            const nextIndex = Math.min(index + pastedValues.length, otpValues.length - 1)
            setActiveInput(nextIndex)
            inputRefs.current[nextIndex]?.focus()
            return
        }

        // Handle single character input
        newOtpValues[index] = value
        setOtpValues(newOtpValues)

        // Auto-focus next input if current input is filled
        if (value && index < otpValues.length - 1) {
            inputRefs.current[index + 1]?.focus()
            setActiveInput(index + 1)
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
            setActiveInput(index - 1)
        }

        // Move to next input on right arrow
        if (e.key === "ArrowRight" && index < otpValues.length - 1) {
            inputRefs.current[index + 1]?.focus()
            setActiveInput(index + 1)
        }

        // Move to previous input on left arrow
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus()
            setActiveInput(index - 1)
        }
    }

    const handleFocus = (index: number) => {
        setActiveInput(index)
    }

    const submitOTP = async () => {
        const otp = otpValues.join("")
        if (otp.length !== 6) {
            // toast.error("Please enter a complete 6-digit OTP")
            return
        }
        setIsSubmitting(true)
        try {

            console.log(user.role)
            if (role === 'rider') {
                await authSvc.activateRiderAccount({
                    otp: otp,
                    email: user.email,
                })

            } else {
                await authSvc.activateUserAccount({
                    otp: otp,
                    email: user.email,
                })
            }



            // toast.success("Your account has been activated successfully")
            if (onOpenChange) onOpenChange(false)
            navigate("/login")
        } catch (exception) {
            // toast.error("Your account could not be activated at this moment")
        } finally {
            setIsSubmitting(false)
        }
    }

    const resendOTP = async () => {
        // toast.info("A new OTP has been sent to your email")
        // Implement your resend OTP logic here
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
                <div className="p-6">
                    <DialogHeader className="mb-6">
                        <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <DialogTitle className="text-2xl text-center">Verify Your Account</DialogTitle>
                        <DialogDescription className="text-center pt-2">
                            We've sent a 6-digit code to <span className="font-medium text-foreground">{user.email}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-center mb-8">
                        <div className="flex gap-2">
                            {otpValues.map((value, index) => (
                                <div key={index} className="relative">
                                    <input
                                        ref={(el) => {
                                            inputRefs.current[index] = el
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={6}
                                        value={value}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onFocus={() => handleFocus(index)}
                                        className={cn(
                                            "w-12 h-14 text-center text-xl font-semibold rounded-md border focus:outline-none focus:ring-2 transition-all",
                                            activeInput === index ? "border-primary ring-primary/20" : "border-input",
                                            value ? "bg-primary/5" : "bg-background",
                                        )}
                                    />
                                    {index < otpValues.length - 1 && (
                                        <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 flex justify-center">
                                            <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <p className="text-sm text-muted-foreground mb-2">Didn't receive the code?</p>
                        <button onClick={resendOTP} className="text-sm font-medium text-primary hover:underline">
                            Resend OTP
                        </button>
                    </div>

                    <DialogFooter className="flex flex-col gap-2 sm:flex-col">
                        <Button
                            type="submit"
                            className="w-full gap-2"
                            onClick={submitOTP}
                            disabled={isSubmitting || otpValues.some((v) => !v)}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify Account
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OTPModal

