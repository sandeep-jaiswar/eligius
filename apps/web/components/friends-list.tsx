"use client";

import { useState } from "react";
import Avatar from "@eligius/ui/avatar";
import Button from "@eligius/ui/button";
import Input from "@eligius/ui/input";
import Card from "@eligius/ui/card";
import Tabs from "@eligius/ui/tabs";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";

type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastSeen?: Date;
};

const FriendListItem = ({ friend }: { friend: Friend }) => {
  const { name, avatar, status, lastSeen } = friend;

  const getLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return "Offline";
    const now = Date.now();
    const diffInMinutes = Math.round((now - lastSeen.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.round(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar
            src={avatar || "/placeholder.svg"}
            alt={name}
            initials={name[0]}
          />
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div>
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">
            {status === "online" ? "Online" : getLastSeen(lastSeen)}
          </p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <MoreHorizontal className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};

export function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock friends data
  const friends: Friend[] = [
    {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "2",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "3",
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
    },
    {
      id: "4",
      name: "Morgan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Card className="h-full">
      <div className="border-b p-4">
        <div className="text-lg font-semibold">Friends</div>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search friends..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs className="w-full">
        <div className="border-b px-4">
          <Tabs.List className="grid w-full grid-cols-3">
            <Tabs.Trigger value="all">All</Tabs.Trigger>
            <Tabs.Trigger value="online">Online</Tabs.Trigger>
            <Tabs.Trigger value="pending">Requests</Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="all" className="p-0">
          <div className="space-y-1 p-2">
            {filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <FriendListItem key={friend.id} friend={friend} />
              ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                No friends found
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="online" className="p-0">
          <div className="space-y-1 p-2">
            {filteredFriends.filter((f) => f.status === "online").length > 0 ? (
              filteredFriends
                .filter((f) => f.status === "online")
                .map((friend) => (
                  <FriendListItem key={friend.id} friend={friend} />
                ))
            ) : (
              <div className="py-4 text-center text-gray-500">
                No online friends
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="pending" className="p-0">
          <div className="flex flex-col items-center justify-center p-6">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <UserPlus className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-center text-gray-600">
              No pending friend requests
            </p>
            <Button className="mt-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Friends
            </Button>
          </div>
        </Tabs.Content>
      </Tabs>
    </Card>
  );
}
