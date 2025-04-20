"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export const loginAction = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      throw new Error("Authentication failed");
    }
    return { user: session.user };
  } catch (error) {
    console.error("loginAction error:", error);
    throw new Error("Unable to log in. Please try again.");
  }
};
