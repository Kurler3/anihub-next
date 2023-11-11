import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createSupabaseServerSide = () => {
    return createServerComponentClient({
        cookies,
    })
}

export const getCurrentUser = async () => {
    const supabase = createSupabaseServerSide()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    //TODO Get from db with id because need avatar as well.

    return user
}
