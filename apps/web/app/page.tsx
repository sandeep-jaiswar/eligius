"use client";

import axios from "axios";
import Link from "next/link";
import Button from "@eligius/ui/button";
import { ArrowRight } from "lucide-react";
import GlobalHeader from "../components/global-header";
import GlobalFooter from "../components/global-footer";

export default function Home() {
  const onStartChatButtonClick = async () => {
    try {
      const { data } = await axios.get("/api/session");
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex-1">
      <GlobalHeader />

      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                Connect with new people around the world
              </h1>
              <p className="text-lg text-gray-600">
                Chat with random strangers, share moments, and make new friends
                in a safe and friendly environment.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="primary"
                  icon={<ArrowRight className="ml-2 h-4 w-4" />}
                  iconPosition="end"
                  onClick={onStartChatButtonClick}
                >
                  Start Chatting
                </Button>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-lg bg-white p-4 shadow-xl">
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 p-1">
                  <div className="rounded-lg bg-white p-3">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200" />
                        <div className="space-y-1">
                          <div className="h-4 w-24 rounded bg-gray-200" />
                          <div className="h-3 w-16 rounded bg-gray-100" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="ml-auto w-3/4 rounded-lg bg-violet-100 p-3 text-sm text-gray-800">
                          Hi there! How are you doing today?
                        </div>
                        <div className="w-3/4 rounded-lg bg-blue-100 p-3 text-sm text-gray-800">
                          {`Hey! I'm doing great, thanks for asking. What about`}
                          you?
                        </div>
                        <div className="ml-auto w-3/4 rounded-lg bg-violet-100 p-3 text-sm text-gray-800">
                          {`I'm good too! Do you want to chat?`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg bg-blue-200 opacity-50" />
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-lg bg-violet-200 opacity-50" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Choose ChatConnect?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Meet New People",
                description:
                  "Connect with random strangers from around the world and expand your social circle.",
                icon: "👋",
              },
              {
                title: "Share Media",
                description:
                  "Exchange images, GIFs, and text messages to express yourself better.",
                icon: "🖼️",
              },
              {
                title: "Stay Safe",
                description:
                  "Our reporting system ensures a safe environment for everyone.",
                icon: "🛡️",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GlobalFooter />
    </main>
  );
}
