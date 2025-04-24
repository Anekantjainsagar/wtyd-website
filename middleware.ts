import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  if (token) {
    try {
      const decoded = jwt.decode(token) as { role?: string };

      // If user tries to access login/register while already authenticated
      if (isAuthPage) {
        if (decoded?.role === "user") {
          return NextResponse.redirect(new URL("/user/dashboard", request.url));
        } else {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      }

      // If accessing protected user route but not a user
      if (
        request.nextUrl.pathname.startsWith("/user/dashboard") &&
        decoded?.role !== "user"
      ) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // If accessing /admin with a "user" role
      if (
        request.nextUrl.pathname.startsWith("/admin") &&
        decoded?.role === "user"
      ) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // If token is missing and trying to access protected route (not /login or /register)
    const protectedPaths = ["/user/dashboard", "/admin"];
    const isProtected = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (isProtected) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/register", "/user/dashboard/:path*", "/admin/:path*"],
};
