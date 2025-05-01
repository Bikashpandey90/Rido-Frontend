import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/context/auth.context"
// import { AuthContext } from "@/context/auth-context"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"


export function UserNav() {
    const navigate = useNavigate();



    const auth = useContext(AuthContext) as { loggedInUser: any }
    const { setLoggedInUser } = useContext(AuthContext) as { setLoggedInUser: Function }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={auth.loggedInUser?.image} alt="@shadcn" className="object-cover" />
                        <AvatarFallback> {auth.loggedInUser?.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{auth.loggedInUser?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {auth.loggedInUser?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => {
                        navigate(`/${auth.loggedInUser.role}/profile`)
                    }}>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        navigate('settings')
                    }}>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refToken');
                    auth.loggedInUser = null
                    setLoggedInUser(null);

                    navigate('/');


                    // toast.info("Logged out !")

                }}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

