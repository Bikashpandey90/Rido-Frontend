import { initialify } from "@/lib/utils";
import chatSvc from "@/pages/chat/chat.svc";
import { User, Users } from "lucide-react";
import { useEffect, useState } from "react";

export interface User {
    _id: string,
    name: string,
    email: string,
    image: string,
    role?: string
}
interface UserSidebarProps {
    onSelectUser: (user: User) => void
    users: User[] | undefined
}


const Sidebar = ({ onSelectUser }: UserSidebarProps) => {
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User>()


    const fetchUsers = async () => {
        try {
            const response = await chatSvc.listAllUsers()
            setUsers(response.data)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchUsers()

    }, [])


    return (<>
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* TODO: Online filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            // checked={showOnlineOnly}
                            // onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm"
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    <span className="text-xs text-zinc-500">({users?.length - 1} online)</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {users?.map((user) => (
                    <button
                        key={user._id}
                        // onClick={() => setSelectedUser(user)}
                        className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
                        onClick={() => {
                            setSelectedUser(user)
                            onSelectUser(user)

                        }}
                    >
                        <div className="relative mx-auto lg:mx-0"

                        >
                            {
                                <img
                                    src={user?.image || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                                    alt={initialify(user?.name)}
                                    className="size-12 object-cover rounded-full"
                                />

                            }
                            {/* {onlineUsers.includes(user._id) && (
                                <span
                                    className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"
                                />
                            )} */}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user?.name}</div>
                            <div className="text-sm text-zinc-400">
                                {/* {onlineUsers.includes(user._id) ? "Online" : "Offline"} */}
                                {/* <span>{user.email}</span> */}
                            </div>
                        </div>
                    </button>
                ))}

                {users?.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )}
            </div>
        </aside>
    </>)
}
export default Sidebar;