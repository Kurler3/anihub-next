import { createSupabaseServerSide } from '@/lib/supabase/supabase-server'
import { resetPwdSchema } from '@/schemas'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    //////////////////////////////////////
    // Init services /////////////////////
    //////////////////////////////////////

    const supabase = createSupabaseServerSide()

    const body = await req.json()

    const { password } = resetPwdSchema.parse(body)

    // Check if is logged in
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession()

    if (!session || error) {
        return NextResponse.json(
            {
                message: 'Not logged in',
            },
            {
                status: 403,
            },
        )
    }

    //////////////////////////////////////
    // Update password ///////////////////
    //////////////////////////////////////

    await supabase.auth.updateUser({ password })

    //////////////////////////////////////
    // Return msg to client //////////////
    //////////////////////////////////////

    return NextResponse.json({ message: 'Successfully updated password' })
}
