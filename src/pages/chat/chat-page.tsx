import ChatContainer from "@/components/chat/chatContainer"
import NoChatSelected from "@/components/chat/nochatselected"
import Sidebar, { User } from "@/components/sidebar/sidebar"
import { useState } from "react"


const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null)








    return (<>
        < div className="h-screen bg-base-200" >
            <div className="flex items-center justify-center pt-10 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar onSelectUser={setSelectedUser} users={[]} />

                        {!selectedUser ? <NoChatSelected /> : <ChatContainer user={selectedUser} />}
                    </div>
                </div>
            </div>
        </div >
    </>)


}
export default ChatPage