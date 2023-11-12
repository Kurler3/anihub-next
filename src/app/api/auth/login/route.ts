import { getSupabaseRouteHandler } from '@/lib/supabase/supabase-route-handler'
import { loginSchema } from '@/schemas'
import { NextRequest, NextResponse } from 'next/server'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export async function POST(req: NextRequest) {
    const data = await req.json()

    const { email, password } = loginSchema.parse(data)

    const supabase = getSupabaseRouteHandler()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: 'Successfully logged in' })
}
