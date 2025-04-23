"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useMobile } from "../../hooks/use-mobile"
import { Avatar, Button, Card, Input, Tabs } from "@eligius/ui"
import { Badge, ChevronLeft, ImageIcon, MoreVertical, RefreshCw, Search, Send, Smile, UserPlus, X } from "lucide-react"
import { EmojiPicker } from "../../components/emogi-picker"
import { ChatMessage } from "../../components/chat-message"

type Message = {
    id: string
    sender: string
    content: string
    timestamp: Date
    isImage?: boolean
    isGif?: boolean
    status?: "sent" | "delivered" | "read"
}

type User = {
    id: string
    name: string
    avatar: string
    status?: "online" | "offline" | "away"
    lastSeen?: Date
}

export default function ChatPage() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Message[]>([])
    const [isConnected, setIsConnected] = useState(true)
    const [isTyping, setIsTyping] = useState(false)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [activeTab, setActiveTab] = useState("chats")
    const [selectedChat, setSelectedChat] = useState<string | null>("stranger")
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isMobile = useMobile()

    // Mock data for demonstration
    const currentUser: User = {
        id: "user1",
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
    }

    const stranger: User = {
        id: "stranger",
        name: "Alex",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
    }

    const recentChats: Array<User & { lastMessage?: string; unread?: number }> = [
        {
            ...stranger,
            lastMessage: "Hey there! How's it going?",
            unread: 0,
        },
        {
            id: "user3",
            name: "Jamie Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
            lastMessage: "Did you see that new movie?",
            unread: 2,
        },
        {
            id: "user4",
            name: "Taylor Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "away",
            lastMessage: "Let me know when you're free",
            unread: 0,
        },
        {
            id: "user5",
            name: "Morgan Lee",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "offline",
            lastSeen: new Date(Date.now() - 1000 * 60 * 30),
            lastMessage: "Thanks for the help!",
            unread: 0,
        },
    ]

    const onlineUsers: User[] = [
        {
            id: "random1",
            name: "Chris Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
        },
        {
            id: "random2",
            name: "Jordan Taylor",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
        },
        {
            id: "random3",
            name: "Riley Parker",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
        },
        {
            id: "random4",
            name: "Casey Morgan",
            avatar: "/placeholder.svg?height=40&width=40",
            status: "online",
        },
    ]

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Mock initial messages
    useEffect(() => {
        const initialMessages: Message[] = [
            {
                id: "1",
                sender: stranger.id,
                content: "Hey there! How's it going?",
                timestamp: new Date(Date.now() - 1000 * 60 * 5),
                status: "read",
            },
            {
                id: "2",
                sender: currentUser.id,
                content: "Hi! I'm doing well, thanks for asking. How about you?",
                timestamp: new Date(Date.now() - 1000 * 60 * 4),
                status: "read",
            },
            {
                id: "3",
                sender: stranger.id,
                content: "I'm good too! What brings you here today?",
                timestamp: new Date(Date.now() - 1000 * 60 * 3),
                status: "read",
            },
            {
                id: "4",
                sender: currentUser.id,
                content:
                    "Just looking to meet new people and have interesting conversations. I love connecting with people from different backgrounds.",
                timestamp: new Date(Date.now() - 1000 * 60 * 2),
                status: "read",
            },
            {
                id: "5",
                sender: stranger.id,
                content:
                    "That's awesome! I'm here for the same reason. It's always fascinating to learn about different perspectives and experiences.",
                timestamp: new Date(Date.now() - 1000 * 60 * 1),
                status: "read",
            },
        ]
        setMessages(initialMessages)
    }, [])

    const handleSendMessage = () => {
        if (!message.trim()) return

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: currentUser.id,
            content: message,
            timestamp: new Date(),
            status: "sent",
        }

        setMessages([...messages, newMessage])
        setMessage("")
        setShowEmojiPicker(false)

        // Simulate message status updates
        setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))
        }, 1000)

        // Simulate stranger typing
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)

            // Update previous message to "read"
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))

            const response: Message = {
                id: (Date.now() + 1).toString(),
                sender: stranger.id,
                content: "That's interesting! Tell me more about it. What kind of topics do you enjoy discussing?",
                timestamp: new Date(),
                status: "delivered",
            }
            setMessages((prev) => [...prev, response])
        }, 3000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // In a real app, you would upload the file to a server
            // and get a URL back. For this demo, we'll just create a
            // placeholder message.
            const newMessage: Message = {
                id: Date.now().toString(),
                sender: currentUser.id,
                content: "Shared an image",
                timestamp: new Date(),
                isImage: true,
                status: "sent",
            }
            setMessages([...messages, newMessage])
        }
    }

    const handleAddEmoji = (emoji: string) => {
        setMessage((prev) => prev + emoji)
    }

    const handleAddFriend = () => {
        // Logic to add the current stranger as a friend
        console.log("Adding friend:", stranger.name)
    }

    const handleReportUser = () => {
        // Logic to report the current stranger
        console.log("Reporting user:", stranger.name)
    }

    const handleEndChat = () => {
        setIsConnected(false)
    }

    const handleFindNewChat = () => {
        // Logic to find a new chat partner
        setIsConnected(true)
        // Reset messages
        setMessages([])
        // Simulate a new connection
        setTimeout(() => {
            const welcomeMessage: Message = {
                id: Date.now().toString(),
                sender: stranger.id,
                content: "Hi there! I'm Alex. How are you doing today?",
                timestamp: new Date(),
                status: "delivered",
            }
            setMessages([welcomeMessage])
        }, 1500)
    }

    const handleChatSelect = (userId: string) => {
        setSelectedChat(userId)
        if (isMobile) {
            // In mobile view, show the chat when a user is selected
            document.getElementById("chat-area")?.classList.remove("hidden")
            document.getElementById("chat-list")?.classList.add("hidden")
        }
    }

    const handleBackToList = () => {
        if (isMobile) {
            document.getElementById("chat-area")?.classList.add("hidden")
            document.getElementById("chat-list")?.classList.remove("hidden")
        }
    }

    const getStatusColor = (status?: string) => {
        switch (status) {
            case "online":
                return "bg-green-500"
            case "away":
                return "bg-yellow-500"
            case "offline":
                return "bg-gray-400"
            default:
                return "bg-gray-400"
        }
    }

    const renderChatHeader = () => {
        return (
            <div className="flex items-center justify-between border-b bg-white p-3">
                <div className="flex items-center gap-3">
                    {isMobile && (
                        <Button variant="ghost" size="md" onClick={handleBackToList} className="md:hidden">
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </Button>
                    )}
                    <div className="relative">
                        <Avatar initials={stranger.name[0]} src={stranger.avatar || "/placeholder.svg"} alt={stranger.name} className="h-10 w-10">
                        </Avatar>
                        <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(stranger.status)}`}
                        />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{stranger.name}</div>
                        <div className="text-xs text-gray-500">{isTyping ? "Typing..." : "Online"}</div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {/* <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                    <Phone className="h-5 w-5 text-gray-600" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Voice call</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                    <Video className="h-5 w-5 text-gray-600" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Video call</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}

                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                <MoreVertical className="h-5 w-5 text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleAddFriend} className="cursor-pointer">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Add Friend
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleReportUser} className="cursor-pointer">
                                <Flag className="mr-2 h-4 w-4" />
                                Report User
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleEndChat} className="cursor-pointer text-red-600">
                                <X className="mr-2 h-4 w-4" />
                                End Chat
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
            </div>
        )
    }

    const renderChatInput = () => {
        return (
            <div className="border-t bg-white p-3">
                <div className="relative">
                    <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1 pl-3">
                        <div className="flex items-center gap-1">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
                                    <ImageIcon className="h-5 w-5 text-gray-600" />
                                </div>
                                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    className="h-8 w-8 rounded-full"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                >
                                    <Smile className="h-5 w-5 text-gray-600" />
                                </Button>
                                {showEmojiPicker && (
                                    <div className="absolute bottom-10 left-0 z-10">
                                        <EmojiPicker onEmojiSelect={handleAddEmoji} onClose={() => setShowEmojiPicker(false)} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Input
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button
                            onClick={handleSendMessage}
                            className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-0"
                            disabled={!message.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const renderChatList = () => {
        return (
            <div id="chat-list" className={`flex flex-col h-full ${isMobile && selectedChat ? "hidden" : "block"}`}>
                <div className="border-b bg-white p-3">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                        <Button variant="ghost" size="md" className="rounded-full h-8 w-8">
                            <MoreVertical className="h-5 w-5 text-gray-600" />
                        </Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input value="" onChange={()=>{}} placeholder="Search messages..." className="pl-10 rounded-full" />
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <Tabs.List className="grid w-full grid-cols-3 bg-gray-50 p-1">
                        <Tabs.Trigger value="chats">Chats</Tabs.Trigger>
                        <Tabs.Trigger value="online">Online</Tabs.Trigger>
                        <Tabs.Trigger value="friends">Friends</Tabs.Trigger>
                    </Tabs.List>

                    <div className="flex-1">
                        <Tabs.Content value="chats" className="m-0 p-0">
                            <div className="divide-y">
                                {recentChats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer ${selectedChat === chat.id ? "bg-gray-50" : ""}`}
                                        onClick={() => handleChatSelect(chat.id)}
                                    >
                                        <div className="relative">
                                            <Avatar src={chat.avatar || "/placeholder.svg"} alt={chat.name} initials={chat.name[0]} className="h-12 w-12">
                                            </Avatar>
                                            <span
                                                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(chat.status)}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div className="font-medium text-gray-900 truncate">{chat.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Intl.DateTimeFormat("en-US", {
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                        hour12: true,
                                                    }).format(new Date(Date.now() - 1000 * 60 * (Math.random() * 60)))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                                                <Badge className="bg-gradient-to-r from-blue-500 to-violet-500">{chat.unread}</Badge>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="online" className="m-0 p-0">
                            <div className="p-3">
                                <h3 className="mb-2 text-sm font-medium text-gray-500">ONLINE USERS</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {onlineUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex flex-col items-center gap-1 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleChatSelect(user.id)}
                                        >
                                            <div className="relative">
                                                <Avatar src={user.avatar || "/placeholder.svg"} alt={user.name} initials={user.name[0]} className="h-16 w-16">
                                                </Avatar>
                                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-1 h-7 text-xs border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                                >
                                                    Chat Now
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="friends" className="m-0 p-0">
                            <div className="p-4 text-center">
                                <div className="mb-4 mx-auto rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center">
                                    <UserPlus className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-800 mb-2">Connect with Friends</h3>
                                <p className="text-gray-600 mb-4">Add friends to chat with them anytime</p>
                                <Button className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Add Friends
                                </Button>
                            </div>
                        </Tabs.Content>
                    </div>
                </Tabs>
            </div>
        )
    }

    const renderChatArea = () => {
        return (
            <div id="chat-area" className={`flex flex-col h-full ${isMobile && !selectedChat ? "hidden" : "block"}`}>
                {isConnected ? (
                    <>
                        {renderChatHeader()}

                        <div className="flex-1 p-4">
                            <div className="flex flex-col gap-3">
                                {messages.map((msg) => (
                                    <ChatMessage
                                        key={msg.id}
                                        message={{
                                            ...msg,
                                            timestamp: `${msg.timestamp}`
                                        }}
                                        isOwnMessage={msg.sender === currentUser.id}
                                        senderName={msg.sender === currentUser.id ? currentUser.name : stranger.name}
                                        senderAvatar={msg.sender === currentUser.id ? currentUser.avatar : stranger.avatar}
                                    />
                                ))}
                                {isTyping && (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8" src={stranger.avatar || "/placeholder.svg"} alt={stranger.name} initials={stranger.name[0]}>

                                        </Avatar>
                                        <div className="flex gap-1 p-2 rounded-lg bg-gray-100 w-16 justify-center">
                                            <div
                                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                style={{ animationDelay: "0ms" }}
                                            ></div>
                                            <div
                                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                style={{ animationDelay: "200ms" }}
                                            ></div>
                                            <div
                                                className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                style={{ animationDelay: "400ms" }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {renderChatInput()}
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center p-6">
                        <div className="mb-6 text-center">
                            <div className="mb-4 rounded-full bg-gray-100 p-4 mx-auto w-16 h-16 flex items-center justify-center">
                                <X className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">Chat Ended</h3>
                            <p className="text-gray-600 max-w-xs mx-auto">
                                This conversation has been closed. Would you like to start a new chat?
                            </p>
                        </div>
                        <Button onClick={handleFindNewChat} className="bg-gradient-to-r from-blue-500 to-violet-500 text-white">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Find New Chat
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col bg-gray-50">
            <header className="border-b bg-white shadow-sm">
                <div className="container mx-auto flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-1">
                            <div className="rounded-full bg-white p-1">
                                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                            </div>
                        </div>
                        <span className="text-lg font-bold text-gray-800">ChatConnect</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Avatar src={currentUser.avatar || "/placeholder.svg"} alt="User" initials="U" className="h-8 w-8">
                        </Avatar>
                    </div>
                </div>
            </header>

            <div className="container mx-auto flex flex-1 overflow-hidden p-4">
                <Card className="flex flex-1 overflow-hidden">
                    <div className="grid h-full w-full grid-cols-1 md:grid-cols-3">
                        <div className="md:col-span-1 md:border-r">{renderChatList()}</div>
                        <div className="md:col-span-2">{renderChatArea()}</div>
                    </div>
                </Card>
            </div>
        </div>
    )
}
