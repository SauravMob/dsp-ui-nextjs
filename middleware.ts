import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup'
    
    const roleId = request.cookies.get('roleId')?.value || ''
    if (path === '/') return NextResponse.redirect(new URL(roleId === '2' ? '/admin-dashboard' : '/dashboard', request.nextUrl))

    const userId = request.cookies.get('userId')?.value || ''

    if (isPublicPath && userId) {
        return NextResponse.redirect(new URL(roleId === '2' ? '/admin-dashboard' : '/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !userId) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: [
        // COMMONS
        '/',
        '/login',
        '/signup',

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