"use client"

import { NavLink } from "react-router-dom"
import { Car, ChevronLeft, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileSidebarProps {
  setIsSidebarOpen: (open: boolean) => void
}

export default function MobileSidebar({ setIsSidebarOpen }: MobileSidebarProps) {
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-3/4 max-w-xs bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Car className="h-5 w-5" />
            <span>RideX</span>
          </NavLink>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/customer/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            <User className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/customer/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </NavLink>
          <NavLink
            to="/customer/rides"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900"
          >
            <Clock className="h-5 w-5" />
            <span>Ride History</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
