import Link from "next/link"
import Avatar from "@eligius/ui/avatar"
import Button from "@eligius/ui/button"
import { Bell, Settings, LogOut } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-1">
            <div className="rounded-full bg-white p-1">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">ChatConnect</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm">
            <LogOut className="h-5 w-5 text-gray-600" />
          </Button>
          <Avatar alt="user" src="/placeholder.svg?height=40&width=40" initials="U" className="h-10 w-10">
          </Avatar>
        </div>
      </div>
    </header>
  )
}
