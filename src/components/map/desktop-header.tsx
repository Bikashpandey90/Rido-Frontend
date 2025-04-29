import { NavLink } from "react-router-dom"
import { ChevronLeft, User } from "lucide-react"

export default function DesktopHeader() {
  return (
    <div className="hidden md:flex items-center justify-between p-4 border-b bg-background/90 backdrop-blur-sm">
      <NavLink to="/customer/dashboard" className="flex items-center gap-2">
        <ChevronLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </NavLink>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="h-4 w-4 text-blue-700" />
        </div>
      </div>
    </div>
  )
}
