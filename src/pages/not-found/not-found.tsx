
import { useEffect } from "react"
import { Car, MapPin, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useAnimation } from "framer-motion"
import { NavLink } from "react-router-dom"

export default function NotFound() {
    const carControls = useAnimation()
    const messageControls = useAnimation()

    useEffect(() => {
        const animationSequence = async () => {
            // Start car animation
            await carControls.start({
                x: window.innerWidth + 100,
                transition: {
                    duration: 4,
                    ease: "linear",
                },
            })
        }

        // Show message after a delay
        const showMessage = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500))
            messageControls.start({
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.7,
                    ease: "easeOut",
                },
            })
        }

        animationSequence()
        showMessage()
    }, [carControls, messageControls])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted p-4 overflow-hidden">
            <div className="relative w-full h-40">
                {/* Road */}
                <div className="absolute bottom-10 left-0 right-0 h-2 bg-muted-foreground/30 rounded-full"></div>

                {/* Animated Car */}
                <motion.div className="absolute bottom-12" initial={{ x: -100 }} animate={carControls}>
                    <div className="relative">
                        <Car size={48} className="text-primary" />
                        <div className="absolute -bottom-2 left-3 right-3 h-1 bg-black/20 rounded-full blur-sm"></div>
                    </div>
                </motion.div>

                {/* Map Pins */}
                <motion.div
                    className="absolute bottom-14 left-1/4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                    <MapPin size={24} className="text-destructive" />
                </motion.div>

                <motion.div
                    className="absolute bottom-14 right-1/4"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.5 }}
                >
                    <MapPin size={24} className="text-primary" />
                </motion.div>
            </div>

            <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={messageControls}>
                <h1 className="text-4xl font-bold mb-2">Oops! Wrong Turn</h1>
                <p className="text-xl text-muted-foreground mb-6">We couldn't find the destination you're looking for.</p>

                <motion.div className="space-y-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button asChild size="lg">
                        <NavLink to="/">
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Back to Home
                        </NavLink>
                    </Button>
                </motion.div>
            </motion.div>

            {/* Animated dots representing a route */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/20"
                    initial={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0.4, 0.7],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    )
}

