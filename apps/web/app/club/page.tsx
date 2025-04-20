"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Send,
  ImageIcon,
  Smile,
  X,
  RefreshCw,
} from "lucide-react";
import { FriendsList } from "../../components/friends-list";
import { useMobile } from "../../hooks/use-mobile";
import {
  useSocket,
  type ChatEvent,
  type ChatMessage,
  type Notification,
} from "../../hooks/use-socket";

import Button from "@eligius/ui/button";
import Input from "@eligius/ui/input";
import Tabs from "@eligius/ui/tabs";
import Card from "@eligius/ui/card";
import { ChatMessage as ChatMessageComponent } from "../../components/chat-message";
import { v7 as uuid } from "uuid";
import { useUserSession } from "../../hooks/use-session";

export default function ChatPage() {
  const id = uuid();
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [actions, setActions] = useState<Notification[]>([]);
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const { user } = useUserSession();

  const { socket, sendMessage, reconnect, isConnected, serverId } = useSocket({
    onMessageStream: (msg) => {
      setMessages((prev) => [...prev, msg]);
    },
    onEventStream: (msg) => {
      setEvents((prev) => [...prev, msg]);
    },
    onActionStream: (msg) => {
      setActions((prev) => [...prev, msg]);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed || !socket) return;

    const newMessage: ChatMessage = {
      senderId: serverId,
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    sendMessage(newMessage);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !socket) return;

    const imageMessage: ChatMessage = {
      senderId: serverId,
      content: "Image sent",
      timestamp: new Date().toLocaleTimeString(),
      isImage: true,
    };

    sendMessage(imageMessage);
  };
  const handleFindNewChat = () => {
    reconnect?.();
    setMessages([]);
  };

  const TabButton = ({ value, label }: { value: string; label: string }) => (
    <button
      className={`p-2 text-sm font-medium transition-colors ${activeTab === value
          ? "bg-white text-black"
          : "bg-gray-100 text-gray-600"
        }`}
      onClick={() => setActiveTab(value)}
    >
      {label}
    </button>
  );

  return (
    <div className="container mx-auto flex flex-1 flex-col overflow-hidden p-4 md:flex-row md:gap-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-1 flex-col overflow-hidden"
      >
        {/* Mobile Tab Toggle */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <div className="grid w-full grid-cols-2 overflow-hidden rounded-md border">
            <TabButton value="chat" label="Chat" />
            <TabButton value="friends" label="Friends" />
          </div>
        </div>

        {/* Chat Tab */}
        {activeTab === "chat" && (
          <Card
            className="flex flex-1 flex-col overflow-hidden"
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
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="rounded-full border-gray-300"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-0 text-white"
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
                  <ChatMessageComponent
                    key={uuid()}
                    message={{
                      ...msg,
                      id,
                    }}
                    isOwnMessage={msg.senderId === serverId}
                    senderName={
                      msg.senderId ?? serverId
                    }
                    senderAvatar={
                      `${user?.image}`
                    }
                  />
                ))}
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
                    This conversation has ended. Find a new stranger to chat
                    with?
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

        {/* Friends Tab */}
        {activeTab === "friends" && <FriendsList />}
      </Tabs>

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <div className="hidden w-80 md:block">
          <FriendsList />
        </div>
      )}
    </div>
  );
}
