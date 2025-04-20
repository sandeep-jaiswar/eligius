import { NextResponse } from "next/server";
import { v7 as uuid } from "uuid";

export async function GET() {
  const sessionId = uuid();

  return NextResponse.json({ sessionId });
}
