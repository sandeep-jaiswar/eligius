"use client";

import { useSession } from "next-auth/react";

export function useUserSession() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  return {
    session,
    user: session?.user,
    isAuthenticated,
    isLoading,
  };
}
