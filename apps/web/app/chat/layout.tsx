"use client"

import "../globals.css";
import "@eligius/ui/styles.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider>
                {children}
                </SessionProvider>
            </body>
        </html>
    );
}
