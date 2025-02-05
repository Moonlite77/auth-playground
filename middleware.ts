import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isLoggedIn } from "./app/actions/login"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path === "/Dashboard" || path === "/Create") {
    const loggedIn = await isLoggedIn()
    if (!loggedIn) {
      return NextResponse.redirect(new URL("/Login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/Dashboard", "/Create"],
}

