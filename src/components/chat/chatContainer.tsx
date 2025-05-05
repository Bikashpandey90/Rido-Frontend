import { AuthContext } from "@/context/auth.context";
import { datify } from "@/lib/utils";
import { useContext, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { User } from "../sidebar/sidebar";
import chatSvc from "@/pages/chat/chat.svc";

interface Message {
    _id: string;
    sender: string,
    createdAt: string,
    message: string,
    image: string

}
interface ChatViewProps {
    user: User
}

const ChatContainer = ({ user }: ChatViewProps) => {


    const [messages, setMessages] = useState<Message[]>([]);
    const auth = useContext(AuthContext) as { loggedInUser: any }
    const messageEndRef = useRef(null)

    const fetchMessages = async () => {
        try {
            const response = await chatSvc.getMessages(user?._id)
            setMessages(response.data)

        } catch (exception) {
            console.log(exception)
        }
    }
    useEffect(() => {
        fetchMessages()

    }, [user])
    useEffect(() => {
        if (messageEndRef.current && messages) {
            // messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (<>
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader selectedUser={user} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.sender === auth.loggedInUser.id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.sender === auth.loggedInUser.id
                                            ? auth.loggedInUser.image || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                                            : user?.image || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {datify(new Date(message.createdAt))}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image || 'https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg'}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.message && <p>{message.message}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput user={user} />
        </div>
    </>)
}
export default ChatContainer