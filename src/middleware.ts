import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/api/products(.*)',
  '/api/content(.*)',
  '/api/upload(.*)',
  '/admin(.*)'
])

const isPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/sign-in(.*)',
  '/about',
  '/services', 
  '/contact',
  '/api/public(.*)'
])

const ADMIN_EMAIL = 'initinnagpal2024@gmail.com'

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname
  console.log(`[Middleware] ${req.method} ${pathname}`)
  
  // Allow public routes without any checks
  if (isPublicRoute(req)) {
    console.log(`[Middleware] Public route allowed: ${pathname}`)
    return NextResponse.next()
  }

  // For protected routes, just check authentication (admin check will be done in page)
  if (isProtectedRoute(req)) {
    console.log(`[Middleware] Protected route: ${pathname}`)
    auth().protect()
    console.log(`[Middleware] Authentication successful`)
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}