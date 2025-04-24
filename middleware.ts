import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwt.decode(token) as { role?: string };

    if (
      request.nextUrl.pathname == "/user/dashboard" &&
      decoded?.role !== "user"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      request.nextUrl.pathname.includes("/admin") &&
      decoded?.role == "user"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/user/dashboard/:path*", "/admin/:path*"],
};
