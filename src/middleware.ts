import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database.types'

const NEED_LOGIN_PATHS = ['/watchlists', '/social', '/messages', '/notifications']
const CANNOT_BE_LOGGED_IN_PATHS = ['/sign-up', '/login']

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // Init supabase middleware client
    const supabase = createMiddlewareClient<Database>({ req, res })

    // Refresh the user's session on every request.
    const { data: session } = await supabase.auth.getSession()

    // Needs login
    const requiresLogin = NEED_LOGIN_PATHS.includes(req.nextUrl.pathname)

    const cannotBeLoggedIn = CANNOT_BE_LOGGED_IN_PATHS.includes(req.nextUrl.pathname)

    if (!session.session && requiresLogin) {
        return NextResponse.redirect(new URL('/sign-up', req.url))
    } else if (session.session && cannotBeLoggedIn) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // Return res
    return res
}
