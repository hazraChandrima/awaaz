import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Example: Redirect users if not authenticated
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*", // Apply middleware only to dashboard routes
};
