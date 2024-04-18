import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/privacy-policy' || path === '/ad-policy'

    const userId = request.cookies.get('userId')?.value || ''

    if (isPublicPath && userId) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !userId) {
        console.log("in here")
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        // COMMONS
        '/', 
        '/login',
        '/signup',
        '/privacy-policy',
        '/ad-policy',

        // DASHBOARD
        '/dashboard', 
        '/admin-dashboard', 

        // MANAGE
        '/campaign-manager', 
        '/creative-manager', 
        '/campaigns/:path*',
        '/advertisers/:path*',
        '/inventory/:path*',

        // ASSETS
        '/creatives/:path*',
        '/audiences/:path*',
        '/applists/:path*',

        // REPORTS
        '/traffic-report/:path*',
        '/campaign-report/:path*',
        '/creative-report/:path*',
        '/siteapp-report/:path*',
        '/geo-report/:path*',
        '/adslot-report/:path*',

        // TOOLS
        '/optimization/:path*',
        '/bid-multiplier/:path*',
        '/macros/:path*',
        '/support/:path*',

        // SETTINGS
        '/manage-users/:path*',
        '/admin-tools/:path*'
    ]
  }