import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    cookies().getAll()
    const supabase = createRouteHandlerClient({ cookies })

    // Check if we have a session
    const {
        data: { session },
    } = await supabase.auth.getSession()

    console.log(session)

    if (session) {
        await supabase.auth.signOut()
    }

    console.log('Redirect')

    return NextResponse.redirect(new URL('/', req.url), {
        status: 302,
    })
}
