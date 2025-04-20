import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, senderId, receiverId } = body;
  const { data } = await axios.post("http://localhost:5000/chat/message", {
    message,
    senderId,
    receiverId,
  });

  return NextResponse.json({ data });
}
