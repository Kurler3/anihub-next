import { getSupabaseRouteHandler } from '@/lib/supabase/supabase-route-handler'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const supabase = getSupabaseRouteHandler()

    const code = req.nextUrl.searchParams.get('code')

    console.log(code)

    if (!code) {
        return NextResponse.json({ message: 'No code provided' }, { status: 403 })
    }
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    console.log(data, error)
    // if (error) {
    //     return NextResponse.json({ error: 'Something went wrong!' }, { status: 400 })
    // }

    return NextResponse.redirect(new URL('/', req.url))
}
