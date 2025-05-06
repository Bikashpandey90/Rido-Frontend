import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Maximize, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, timefy } from "@/lib/utils"
import MessageInput from "./MessageInput"
import { User } from "../sidebar/sidebar"
import { Message } from "./chatContainer"
import chatSvc from "@/pages/chat/chat.svc"
import { useNavigate } from "react-router-dom"



interface MessageBoxProps {
    isOpen: boolean
    onClose: () => void
    rider: User
}

export default function MessageBox({ isOpen, onClose, rider }: MessageBoxProps) {
    const [messages, setMessages] = useState<Message[]>([])

    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()




    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight
            }
        }
    }, [messages])



    const fetchMessages = async () => {
        try {

            const response = await chatSvc.getMessages(rider._id)
            setMessages(response.data)
        } catch (exception) {
            console.error(exception)
        }
    }
    useEffect(() => {
        fetchMessages()

    }, [])

    // const auth = useContext(AuthContext) as { loggedInUser: any }



    if (!isOpen) return null

    return (
        <Card className="border rounded-lg overflow-hidden mt-4">
            <CardHeader className="p-3 bg-primary text-primary-foreground flex flex-row items-center justify-between">
                <div className="flex gap-2 ml-auto">
                    <CardTitle className="text-sm font-medium">Messaging with {rider?.name.split(' ')[0]}</CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-primary-foreground hover:bg-primary/90"
                        onClick={() => {
                            navigate('/chat')
                        }}
                    >
                        <Maximize className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-primary-foreground hover:bg-primary/90"
                        onClick={onClose}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea
                    ref={scrollAreaRef}
                    className="h-[200px]"
                    style={{ height: `${Math.min(200, Math.max(100, messages.length * 50))}px` }}
                >
                    <div className="p-3 space-y-3">
                        {messages.map((message) => (
                            <div
                                key={message._id}
                                className={cn(
                                    "flex chat-bubble flex-col max-w-[80%] rounded-lg p-2 text-sm",
                                    message.sender === rider._id ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                                )}
                            >
                                {message?.message}
                                <span className="text-xs opacity-70 mt-1 text-right">{timefy(new Date(message.createdAt))}</span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            <CardFooter className="p-2 border-t">
                <MessageInput user={rider} />
            </CardFooter>
        </Card>
    )
}
