import Avatar from "@eligius/ui/avatar";
import { clsx } from "clsx";
import Image from "next/image";

type ChatMessageProps = {
  message: {
    id: string;
    content: string;
    timestamp: Date;
    isImage?: boolean;
    isGif?: boolean;
  };
  isOwnMessage: boolean;
  senderName: string;
  senderAvatar: string;
};

export function ChatMessage({
  message,
  isOwnMessage,
  senderName,
  senderAvatar,
}: ChatMessageProps) {
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(message.timestamp);

  return (
    <div
      className={clsx(
        "flex items-start gap-2",
        isOwnMessage && "flex-row-reverse",
      )}
    >
      <Avatar
        className="h-8 w-8"
        src={senderAvatar || "/placeholder.svg"}
        alt={senderName}
        initials={senderName[0]}
      ></Avatar>

      <div
        className={clsx(
          "max-w-[70%] rounded-lg p-3",
          isOwnMessage
            ? "rounded-tr-none bg-gradient-to-r from-blue-500 to-violet-500 text-white"
            : "rounded-tl-none bg-gray-100 text-gray-800",
        )}
      >
        {message.isImage ? (
          <div className="overflow-hidden rounded">
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Shared image"
              className="h-auto max-w-full"
            />
          </div>
        ) : message.isGif ? (
          <div className="overflow-hidden rounded">
            <Image
              src="/placeholder.svg?height=150&width=200"
              alt="GIF"
              className="h-auto max-w-full"
            />
          </div>
        ) : (
          <p>{message.content}</p>
        )}
        <div
          className={clsx(
            "mt-1 text-right text-xs",
            isOwnMessage ? "text-blue-100" : "text-gray-500",
          )}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
