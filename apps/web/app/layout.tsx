import "./globals.css";
import "@eligius/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Session from "../provider/session";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatWithStrangers | Home",
  description: "anonymous chat with strangers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Session>
            <main className="flex-1">
              <Header />
              {children}
            </main>
          </Session>
        </div>
      </body>
    </html>
  );
}
