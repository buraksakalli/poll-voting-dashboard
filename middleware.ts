import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyToken = async (token: string | undefined) => {
  if (!token) return false;

  const user = await fetch(`${process.env["NEXT_PUBLIC_API_URL"]}/auth`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.auth) return true;
      return false;
    });

  return user;
};

const matcher = ["/sign-up", "/login", "/dashboard/:path"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const user = await verifyToken(token);

  if (request.nextUrl.pathname === "/dashboard") {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (matcher.includes(request.nextUrl.pathname)) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher,
};
