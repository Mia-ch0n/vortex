import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protected routes that require authentication
    const protectedRoutes = [
        "/dashboard",
        "/profile",
        "/games",
        "/reviews",
        "/settings",
    ];

    // Check if the current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => 
        req.nextUrl.pathname.startsWith(route)
    );

    // If it's a protected route and there's no session, redirect to login
    if (isProtectedRoute && !session) {
        const redirectUrl = new URL("/login", req.url);
        redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

// Update the matcher to be more specific about which routes to run the middleware on
export const config = {
    matcher: [
        // Match all paths except static files and public assets
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
        // Specifically include protected routes
        "/dashboard/:path*",
        "/profile/:path*",
        "/games/:path*",
        "/reviews/:path*",
        "/settings/:path*",
    ],
}; 