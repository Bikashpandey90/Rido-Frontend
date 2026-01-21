import { ChevronLeft, ChevronRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DirectionsStepCardProps {
    instructions: any[]
}

export default function DirectionsStepCard({ instructions }: DirectionsStepCardProps) {
    const [currentStep, setCurrentStep] = useState(0)

    if (!instructions || instructions.length === 0) return null

    const step = instructions[currentStep]

    return (
        <div className="absolute bottom-3 md:bottom-16 left-1/2 -translate-x-1/2 z-[1000] w-[70%] md:w-[90%]  max-w-md bg-white rounded-2xl shadow-xl p-4">

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
                <Navigation className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-sm">
                    Step {currentStep + 1} of {instructions.length}
                </span>
            </div>

            {/* Instruction */}
            <div className="text-base font-medium mb-1">
                {step.text}
            </div>

            {/* Distance */}
            <div className="text-sm text-gray-500 mb-3">
                {step.distance < 1000
                    ? `${Math.round(step.distance)} m`
                    : `${(step.distance / 1000).toFixed(1)} km`}
            </div>

            {/* Controls */}
            <div className="flex justify-between">
                <Button
                    variant="secondary"
                    size="sm"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep((s) => s - 1)}
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Prev
                </Button>

                <Button
                    size="sm"
                    disabled={currentStep === instructions.length - 1}
                    onClick={() => setCurrentStep((s) => s + 1)}
                >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
