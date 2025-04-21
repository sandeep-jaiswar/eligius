"use client";

import Link from "next/link";
import Avatar from "@eligius/ui/avatar";
import Button from "@eligius/ui/button";
import { Bell, Settings } from "lucide-react";
import LogoutButton from "./logout-button";
import { FC, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "../hooks/use-session";

const Logo: FC = () => (
  <Link href="/" className="flex items-center gap-2">
    <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-1">
      <div className="rounded-full bg-white p-1">
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
      </div>
    </div>
    <span className="text-xl font-bold text-gray-800">ChatWithStrangers</span>
  </Link>
);

const Header: FC = () => {
  const { user } = useUserSession();
  const router = useRouter();

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {user ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
            <LogoutButton />
            <Avatar
              alt={user?.name ?? "User"}
              src={user?.image ?? "/placeholder.svg?height=40&width=40"}
              initials={user?.name?.[0] ?? "U"}
              className="h-10 w-10"
            />
          </div>
        ) : (
          <nav className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleLoginClick}>
              Login
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
