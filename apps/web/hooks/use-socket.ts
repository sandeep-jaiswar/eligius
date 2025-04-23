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

export enum EventTopics {
  EVENT_SERVER_READY = "EVENT.SERVER.READY",
  EVENT_MATCH_SEARCHING = "EVENT.MATCH.SEARCHING",
  EVENT_MATCH_QUEUED = "EVENT.MATCH.QUEUED",
  EVENT_MATCH_FOUND = "EVENT.MATCH.FOUND",
  EVENT_MATCH_CONNECTED = "EVENT.MATCH.CONNECTED",
  EVENT_MATCH_DISCONNECTED = "EVENT.MATCH.DISCONNECTED",
  EVENT_MATCH_TIMEOUT = "EVENT.MATCH.TIMEOUT",
  EVENT_MATCH_MESSAGE = "EVENT.MATCH.MESSAGE",
  EVENT_USER_TYPING = "EVENT.USER.TYPING",
  EVENT_USER_STOPPED_TYPING = "EVENT.USER.STOPPED_TYPING",
  EVENT_MATCH_REPORTED = "EVENT.MATCH.REPORTED",
  EVENT_MATCH_FEEDBACK = "EVENT.MATCH.FEEDBACK",
  EVENT_ERROR = "EVENT.ERROR",
  EVENT_MATCH_INVALID_STATE = "EVENT.MATCH.INVALID_STATE",
  EVENT_MATCH_NOTIFICATION = "EVENT.MATCH.NOTIFICATION",
}

export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  [EventTopics.EVENT_SERVER_READY]: (serverSocketId: string) => void;
  [EventTopics.EVENT_MATCH_MESSAGE]: (message: ChatMessage) => void;
  [EventTopics.EVENT_MATCH_NOTIFICATION]: (notification: Notification) => void;
}

export interface ClientToServerEvents {
  [EventTopics.EVENT_MATCH_MESSAGE]: (message: ChatMessage) => void;
  [EventTopics.EVENT_MATCH_SEARCHING]: () => void;
  [EventTopics.EVENT_MATCH_FOUND]: () => void;
}

export interface UseSocketParams {
  onMessageStream: (message: ChatMessage) => void;
}

export const useSocket = ({
  onMessageStream,
}: UseSocketParams) => {
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [serverSocketId, setServerSocketId] = useState("");
  const [status, setStatus]= useState(EventTopics.EVENT_SERVER_READY);

  const initializeSocketConnection = () => {
    if (socketRef.current) return;

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:5000", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
      setStatus(EventTopics.EVENT_SERVER_READY);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Disconnected from WebSocket");
      setStatus(EventTopics.EVENT_MATCH_DISCONNECTED);
      setIsConnected(false);
    });

    socket.on(EventTopics.EVENT_SERVER_READY, (id) => {
      setServerSocketId(id);
      setStatus(EventTopics.EVENT_SERVER_READY);
    });

    socket.on(EventTopics.EVENT_MATCH_MESSAGE, onMessageStream);
  };

  const disconnectSocket = () => {
    socketRef.current?.disconnect();
    socketRef.current = null;
    setIsConnected(false);
    setStatus(EventTopics.EVENT_MATCH_DISCONNECTED);
  };

  const reconnectSocket = () => {
    disconnectSocket();
    initializeSocketConnection();
    setStatus(EventTopics.EVENT_SERVER_READY);
  };

  const emitChatMessage = (message: ChatMessage) => {
    socketRef.current?.emit(EventTopics.EVENT_MATCH_MESSAGE, message);
  };

  const emitMatchSearchRequest = () => {
    socketRef.current?.emit(EventTopics.EVENT_MATCH_SEARCHING);
    setStatus(EventTopics.EVENT_MATCH_SEARCHING);
  };

  const emitMatchFoundConfirmation = () => {
    socketRef.current?.emit(EventTopics.EVENT_MATCH_FOUND);
    setStatus(EventTopics.EVENT_MATCH_FOUND);
  };

  useEffect(() => {
    initializeSocketConnection();
    return () => disconnectSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    socket: socketRef.current,
    sendMessage: emitChatMessage,
    findMatch: emitMatchSearchRequest,
    confirmMatchFound: emitMatchFoundConfirmation,
    reconnect: reconnectSocket,
    disconnect: disconnectSocket,
    isConnected,
    serverId: serverSocketId,
    status
  };
};
