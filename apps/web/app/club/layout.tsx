"use client";

import { ChatHeader } from "../../components/chat-header";

export default function ChatPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <ChatHeader />
      {children}
    </div>
  );
}
