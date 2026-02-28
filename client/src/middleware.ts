import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // const { payload } = await jwtVerify(
  //   token,
  //   new TextEncoder().encode(process.env.JWT_SECRET)
  // );

  // if (pathname.startsWith("/app/profile")) {
  //   console.log("heyy: ");
  //   if (payload?.profile_complete === true) {
  //     return NextResponse.redirect(new URL("/home", request.url));
  //   }
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
