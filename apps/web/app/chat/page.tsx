"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Button from "@eligius/ui/button";
import Input from "@eligius/ui/input";
import Tabs from "@eligius/ui/tabs";
import Avatar from "@eligius/ui/avatar";
import Card from "@eligius/ui/card";
import {
  Send,
  ImageIcon,
  Smile,
  UserPlus,
  Flag,
  X,
  RefreshCw,
} from "lucide-react";
import { ChatHeader } from "../../components/chat-header";
import { ChatMessage } from "../../components/chat-message";
import { FriendsList } from "../../components/friends-list";
import { useMobile } from "../../hooks/use-mobile";
import { useUserSession } from "../../hooks/use-session";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isImage?: boolean;
  isGif?: boolean;
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { isLoading } = useUserSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();

  const currentUser = {
    id: "user1",
    name: "You",
    avatar: "/placeholder.svg",
  };

  const stranger = {
    id: "user2",
    name: "Alex",
    avatar: "/placeholder.svg",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: "1",
        sender: stranger.id,
        content: "Hey there! How's it going?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
      },
      {
        id: "2",
        sender: currentUser.id,
        content: "Hi! I'm doing well, thanks for asking. How about you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
      },
      {
        id: "3",
        sender: stranger.id,
        content: "I'm good too! What brings you here today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
      },
    ];
    setMessages(initialMessages);
  }, [currentUser.id, stranger.id]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUser.id,
      content: message,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: stranger.id,
        content: "That's interesting! Tell me more about it.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: currentUser.id,
        content: "Shared an image",
        timestamp: new Date(),
        isImage: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  const handleAddFriend = () => console.log("Adding friend:", stranger.name);
  const handleReportUser = () => console.log("Reporting user:", stranger.name);
  const handleEndChat = () => setIsConnected(false);

  const handleFindNewChat = () => {
    setIsConnected(true);
    setMessages([]);
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        sender: stranger.id,
        content: "Hi there! I'm Alex. How are you doing today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 1500);
  };

  if(isLoading) return;

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <ChatHeader />

      <div className="container mx-auto flex flex-1 flex-col overflow-hidden p-4 md:flex-row md:gap-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="mb-4 flex items-center justify-between md:hidden">
            <div className="grid w-full grid-cols-2 border rounded-md overflow-hidden">
              <button
                className={`p-2 text-sm font-medium transition-colors ${
                  activeTab === "chat"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("chat")}
              >
                Chat
              </button>
              <button
                className={`p-2 text-sm font-medium transition-colors ${
                  activeTab === "friends"
                    ? "bg-white text-black"
                    : "bg-gray-100 text-gray-600"
                }`}
                onClick={() => setActiveTab("friends")}
              >
                Friends
              </button>
            </div>
          </div>

          {activeTab === "chat" && (
            <Card
              className="flex flex-1 flex-col overflow-hidden"
              title={
                isConnected && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar src={stranger.avatar} />
                      <div>
                        <div className="text-base font-semibold">
                          {stranger.name}
                        </div>
                        <p className="text-xs text-gray-500">Online</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleAddFriend}
                        title="Add Friend"
                      >
                        <UserPlus className="h-5 w-5 text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReportUser}
                        title="Report User"
                      >
                        <Flag className="h-5 w-5 text-gray-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEndChat}
                        title="End Chat"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                )
              }
              footer={
                isConnected && (
                  <div className="border-t bg-white pt-4">
                    <div className="flex items-center gap-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100">
                          <ImageIcon className="h-5 w-5 text-gray-600" />
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 rounded-full"
                      >
                        <Smile className="h-5 w-5 text-gray-600" />
                      </Button>
                      <Input
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="rounded-full border-gray-300"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-0"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )
              }
            >
              {isConnected ? (
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isOwnMessage={msg.sender === currentUser.id}
                      senderName={
                        msg.sender === currentUser.id
                          ? currentUser.name
                          : stranger.name
                      }
                      senderAvatar={
                        msg.sender === currentUser.id
                          ? currentUser.avatar
                          : stranger.avatar
                      }
                    />
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <Avatar src={stranger.avatar} />
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "200ms" }}
                        />
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "400ms" }}
                        />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center p-6">
                  <div className="mb-6 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <X className="mx-auto h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-800">
                      Chat Ended
                    </h3>
                    <p className="text-gray-600">
                      This conversation has been closed. Would you like to start
                      a new chat?
                    </p>
                  </div>
                  <Button
                    onClick={handleFindNewChat}
                    className="bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Find New Chat
                  </Button>
                </div>
              )}
            </Card>
          )}

          {activeTab === "friends" && <FriendsList />}
        </Tabs>

        {!isMobile && (
          <div className="hidden w-80 md:block">
            <FriendsList />
          </div>
        )}
      </div>
    </div>
  );
}
