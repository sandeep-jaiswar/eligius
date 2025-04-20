import { Button } from "@eligius/ui";
import Link from "next/link";

const GlobalHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-gradient-to-r from-blue-500 to-violet-500 p-1">
            <div className="rounded-full bg-white p-1">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
            </div>
          </div>
          <span className="text-xl font-bold text-gray-800">
            ChatWithStrangers
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default GlobalHeader;
