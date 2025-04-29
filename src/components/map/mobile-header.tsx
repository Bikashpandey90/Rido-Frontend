
import { NavLink } from "react-router-dom"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
    isSidebarOpen: boolean
    setIsSidebarOpen: (open: boolean) => void
}

export default function MobileHeader({ isSidebarOpen, setIsSidebarOpen }: MobileHeaderProps) {
    return (
        <div className="md:hidden flex items-center justify-between p-4 border-b">
            <NavLink to="/customer/dashboard" className="flex items-center gap-2">
                <ChevronLeft className="h-5 w-5" />
                <span>Back</span>
            </NavLink>
            <div className="font-bold text-lg">Request Ride</div>
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu className="h-5 w-5" />
            </Button>
        </div>
    )
}
