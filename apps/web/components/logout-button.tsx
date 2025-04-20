"use client";

import { Button } from "@eligius/ui";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";


export default function LogoutButton() {
    return <Button variant="ghost" size="sm" className="h-5 w-5 text-gray-600" onClick={() => signOut()}>
        <LogOut className="h-5 w-5 text-gray-600" />
    </Button>;
}