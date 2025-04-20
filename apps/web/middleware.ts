import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    process.env.NEXT_PUBLIC_APP_ENV === "production"
      ? request.cookies.get("__Secure-next-auth.session-token")
      : request.cookies.get("next-auth.session-token");

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/club", "/chat", "/login"],
};
