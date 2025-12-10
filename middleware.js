import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("MY_SUPER_SECRET_123");

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // NextAuth cookies done show time nowwww
  const nextAuthDev = req.cookies.get("next-auth.session-token")?.value;
  const nextAuthProd = req.cookies.get(
    "__Secure-next-auth.session-token"
  )?.value;

  const nextAuthSession = nextAuthDev || nextAuthProd;

  // If none of the auth cookies exist → redirect to login
  if (!token && !nextAuthSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    if (token) {
      await jwtVerify(token, SECRET);
    }
    // NextAuth cookie needs no verification
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/chat/:path*", "/about/:path*"],
};
