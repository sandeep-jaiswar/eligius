import "./globals.css";
import "@eligius/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalHeader from "../components/global-header";
import GlobalFooter from "../components/global-footer";

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
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
