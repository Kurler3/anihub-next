import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const createSupabaseServerSide = () => {
    return createServerComponentClient(
        {
            cookies,
        },
        {
            supabaseKey,
            supabaseUrl,
        },
    )
}

export const getCurrentUser = async () => {
    const supabase = createSupabaseServerSide()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    //TODO Get from db with id because need avatar as well.

    return user
}
