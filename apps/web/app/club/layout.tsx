"use client";

import { SessionProvider } from "next-auth/react";
import { ChatHeader } from "../../components/chat-header";

export default function ChatPage({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen flex-col bg-gray-50">
        <ChatHeader />
        {children}
      </div>
    </SessionProvider>
  );
}
