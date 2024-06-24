import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isConsentFormRoute = req.nextUrl.pathname === '/consent-forms'

  if (isConsentFormRoute && !isLoggedIn) {
    const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin)
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
})

// Optionally, only invoke Middleware on the consent-form route
export const config = {
  matcher: ["/consent-forms"],
}