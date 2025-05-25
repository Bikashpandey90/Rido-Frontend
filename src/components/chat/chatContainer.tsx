"use client"

import type React from "react"

import { AuthContext } from "@/context/auth.context"
import { datify } from "@/lib/utils"
import { useContext, useEffect, useRef, useState } from "react"
import ChatHeader from "./ChatHeader"
import { ImageIcon, Send, X } from "lucide-react"
import chatSvc from "@/pages/chat/chat.svc"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { InputType, TextInputField } from "../form/input.field"
import type { User } from "../sidebar/sidebar"
import socket from "@/config/socket.config"

export interface Message {
    _id: string
    sender: string
    createdAt: string
    message: string
    image: string
}

interface ChatViewProps {
    user: User
}

const ChatContainer = ({ user }: ChatViewProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const auth = useContext(AuthContext) as { loggedInUser: any }
    const messageEndRef = useRef<HTMLDivElement>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const MessageDTO = Yup.object({
        message: Yup.string().required("Text is required"),
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        resolver: yupResolver(MessageDTO),
        defaultValues: { message: "" },
    })

    const messageValue = watch("message")

    const fetchMessages = async () => {
        try {
            const response = await chatSvc.getMessages(user?._id)
            setMessages(response.data)
        } catch (exception) {
            console.log(exception)
        }
    }

    const scrollToBottom = () => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [user])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith("image/")) {
            // toast.error("Please select an image file");
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const submitForm = async (data: { message: string }) => {
        const payload = {
            message: data.message,
            receiver: user._id,
            receiverType: user?.role === "customer" ? "User" : "Rider",
        }

        try {
            const response = await chatSvc.sendMessage(payload)
            console.log(response)

            // Add the new message to the local state immediately
            const newMessage: Message = {
                _id: response.data._id || Date.now().toString(),
                sender: auth.loggedInUser.id,
                createdAt: new Date().toISOString(),
                message: data.message,
                image: imagePreview || "",
            }

            setMessages((prev) => [...prev, newMessage])

            // Reset form and image preview
            reset()
            removeImage()

            socket.emit("newMessage", {
                receiver: user?._id,
                sender: auth.loggedInUser.id,
            })
        } catch (exception) {
            console.log(exception)
        }
    }

    const openConnect = () => {
        socket.connect()
    }

    const handleConnect = (data: any) => {
        console.log("Connected", data)
    }

    const newMessageReceived = async (data: any) => {
        console.log(data)
        if (data.receiver === auth.loggedInUser?.id) {
            const response = await chatSvc.getMessages(data.sender)
            setMessages(response.data)
        }
    }

    useEffect(() => {
        openConnect()
        socket.on("connected", handleConnect)
        socket.on("messageReceived", newMessageReceived)

        return () => {
            socket.off("connected", handleConnect)
            socket.off("messageReceived", newMessageReceived)
        }
    }, [])

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <ChatHeader selectedUser={user} />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.sender === auth.loggedInUser.id ? "chat-end" : "chat-start"}`}
                    >
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.sender === auth.loggedInUser.id
                                            ? auth.loggedInUser.image ||
                                            "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                                            : user?.image ||
                                            "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">{datify(new Date(message.createdAt))}</time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image || "/placeholder.svg"}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.message && <p>{message.message}</p>}
                        </div>
                    </div>
                ))}
                {/* This div is the scroll target */}
                <div ref={messageEndRef} />
            </div>

            <div className="p-4 w-full">
                {imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                                flex items-center justify-center"
                                type="button"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(submitForm)} className="flex items-center gap-2">
                    <div className="flex-1 flex gap-2">
                        <TextInputField
                            name="message"
                            type={InputType.TEXT}
                            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                            placeholder="Type a message..."
                            control={control}
                            errMsg={errors?.message?.message as string}
                        />
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

                        <button
                            type="button"
                            className={`hidden sm:flex btn btn-circle
                            ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <ImageIcon size={20} />
                        </button>
                    </div>
                    <button type="submit" className="btn btn-sm btn-circle" disabled={!messageValue?.trim() && !imagePreview}>
                        <Send size={22} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChatContainer
