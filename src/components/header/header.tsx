import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "@/context/auth.context"
import { Navigation, Menu, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { UserNav } from "../user-nav/user-nav"

const Header = () => {
  const auth = useContext(AuthContext) as { loggedInUser: any }
  const [isScrolled, setIsScrolled] = useState(false)

  // Properly handle scroll event with useEffect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Add event listener
    window.addEventListener("scroll", handleScroll)

    // Initial check
    handleScroll()

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-md",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex h-14 sm:h-16 items-center justify-between">
        <NavLink
          to="/"
          className="flex items-center gap-1 sm:gap-2 font-bold text-xl sm:text-2xl text-primary transition-transform hover:scale-105"
        >
          <Navigation className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">RideX</span>
        </NavLink>

        {/* Desktop User Nav */}
        {auth?.loggedInUser && (
          <div className="hidden md:block">
            <UserNav />
          </div>
        )}

        {/* Auth Buttons - Desktop */}
        {!auth?.loggedInUser && (
          <nav className="hidden md:flex items-center gap-4">
            <NavLink to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button size="sm" className="gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
            </NavLink>
          </nav>
        )}

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-primary">
                <Navigation className="h-5 w-5" />
                <span>RideX</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              {auth?.loggedInUser ? (
                <div className="py-4">
                  <h3 className="mb-4 text-sm font-medium">Account</h3>
                  <div className="flex justify-center mb-6">
                    <UserNav />
                  </div>
                  <div className="space-y-3">
                    <SheetClose asChild>
                      <NavLink to="/dashboard">
                        <Button variant="outline" className="w-full justify-start">
                          Dashboard
                        </Button>
                      </NavLink>
                    </SheetClose>
                    <SheetClose asChild>
                      <NavLink to="/profile">
                        <Button variant="outline" className="w-full justify-start">
                          Profile
                        </Button>
                      </NavLink>
                    </SheetClose>
                  </div>
                </div>
              ) : (
                <>
                  <SheetClose asChild>
                    <NavLink to="/login">
                      <Button variant="outline" className="w-full justify-start gap-2 mb-2">
                        <LogIn className="h-5 w-5" />
                        Login
                      </Button>
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink to="/register">
                      <Button className="w-full justify-start gap-2">
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Button>
                    </NavLink>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default Header
