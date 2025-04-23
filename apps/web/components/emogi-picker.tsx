"use client"

import { Card } from "@eligius/ui"
import { useEffect, useRef } from "react"

type EmojiPickerProps = {
    onEmojiSelect: (emoji: string) => void
    onClose: () => void
}

export function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [onClose])

    const emojis = [
        "😊",
        "😂",
        "❤️",
        "👍",
        "😍",
        "😒",
        "😘",
        "🙄",
        "😁",
        "👋",
        "🔥",
        "🎉",
        "👏",
        "🤔",
        "😢",
        "😭",
        "😎",
        "🙏",
        "💯",
        "👌",
    ]

    return (
        <Card ref={ref} className="p-2 shadow-lg w-64">
            <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        onClick={() => onEmojiSelect(emoji)}
                        className="h-10 w-10 flex items-center justify-center text-xl rounded hover:bg-gray-100 transition-colors"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </Card>
    )
}
