import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

const NEED_LOGIN_PATHS = [
    '/watchlists',
    '/social',
    '/messages',
    '/notifications',
    '/reset-pwd',
    '/me/edit',
    '/me/connections',
    '/watchlists/create',
]
const CANNOT_BE_LOGGED_IN_PATHS = ['/sign-up', '/login', '/forgot-pwd']

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // Init supabase middleware client
    const supabase = createMiddlewareClient<Database>({ req, res })

    // Refresh the user's session on every request.
    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Needs login
    const requiresLogin = NEED_LOGIN_PATHS.includes(req.nextUrl.pathname)

    const cannotBeLoggedIn = CANNOT_BE_LOGGED_IN_PATHS.includes(req.nextUrl.pathname)

    // If is logged in and provider is google and trying to change pwd => redirect to home
    if (session && session.user.app_metadata.provider === 'google' && req.nextUrl.pathname === '/reset-pwd') {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // If not logged in and path needs login
    if (!session && requiresLogin) {
        return NextResponse.redirect(new URL('/need-auth', req.url))

        // If logged in and path needs the user NOT to be logged in
    } else if (session && cannotBeLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // ;(req as unknown as NextApiRequestWithLocals).locals = {
    //     user: session,
    // }

    // Return res
    return res
}
