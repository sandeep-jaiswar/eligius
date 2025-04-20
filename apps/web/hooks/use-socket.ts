import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export type ChatEvent = {
  topic: string;
  payload: any;
  timestamp: string;
};

export type ChatMessage = {
  senderId: string;
  content: string;
  timestamp: string;
  isImage?: boolean;
  isGif?: boolean;
};

export type Notification = {
  type: "info" | "error" | "success";
  message: string;
};

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  "server-stream": (id: string) => void;
  "event-stream": (msg: ChatEvent) => void;
  "message-stream": (msg: ChatMessage) => void;
  "action-stream": (msg: Notification) => void;
}

export interface ClientToServerEvents {
  "message-stream": (msg: ChatMessage) => void;
}

export interface UseSocketParams {
  onMessageStream: (msg: ChatMessage) => void;
  onEventStream: (msg: ChatEvent) => void;
  onActionStream: (msg: Notification) => void;
}

export const useSocket = ({
  onMessageStream,
  onEventStream,
  onActionStream,
}: UseSocketParams) => {
  const socketRef = useRef<Socket<
    ServerToClientEvents,
    ClientToServerEvents
  > | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverId, setServerId] = useState("");

  const onServerStream = (id: string) => {
    setServerId(id);
  };

  const connect = () => {
    if (socketRef.current) return;

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      "http://localhost:5000",
      {
        transports: ["websocket"],
      },
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    });

    socket.on("event-stream", onEventStream);
    socket.on("action-stream", onActionStream);
    socket.on("message-stream", onMessageStream);
    socket.on("server-stream", onServerStream);
  };

  const disconnect = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setIsConnected(false);
  };

  const reconnect = () => {
    disconnect();
    connect();
  };

  const sendMessage = (msg: ChatMessage) => {
    socketRef.current?.emit("message-stream", msg);
  };

  useEffect(() => {
    connect();
    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket: socketRef.current,
    sendMessage,
    reconnect,
    isConnected,
    disconnect,
    serverId,
  };
};
