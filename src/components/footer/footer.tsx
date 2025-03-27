import { NavLink } from "react-router-dom"
import { Heart } from "lucide-react"

const Footer = () => {
    return (
        <footer className="w-full border-t py-8 bg-background/95">
            <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © {new Date().getFullYear()} RideX. All rights reserved.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        Made With <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse" /> By Bikash Pandey
                    </span>
                    <div className="flex items-center gap-4">
                        <NavLink
                            to="/terms"
                            className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                        >
                            Terms
                        </NavLink>
                        <NavLink
                            to="/privacy"
                            className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                        >
                            Privacy
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

