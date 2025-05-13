import ChatContainer from "@/components/chat/chatContainer"
import NoChatSelected from "@/components/chat/nochatselected"
import Sidebar, { User } from "@/components/sidebar/sidebar"
import { useState } from "react"
const AdminChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    return (<>
        <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar onSelectUser={setSelectedUser} users={[]} />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer user={selectedUser} />}
        </div>
    </>)
}
export default AdminChatPage