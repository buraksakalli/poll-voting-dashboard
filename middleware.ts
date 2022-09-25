import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const verifyToken = async (token: string | undefined) => {
  if (!token) return false;

  console.log(token);

  const user = await fetch("http://localhost:3001/auth", {
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

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const user = await verifyToken(token);

  if (request.nextUrl.pathname === "/dashboard") {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (request.nextUrl.pathname === "/login") {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path", "/login"],
};
