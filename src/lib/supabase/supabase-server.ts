import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import getPrismaClient from '../prisma'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

let supabase: SupabaseClient

export const createSupabaseServerSide = () => {
    if (!supabase) {
        supabase = createServerComponentClient(
            {
                cookies,
            },
            {
                supabaseKey,
                supabaseUrl,
            },
        )
    }

    return supabase
}

export const getCurrentUser = async () => {
    const supabase = createSupabaseServerSide()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Get from db with id because need avatar as well.
    if (user) {
        const prisma = getPrismaClient()

        // Get from db
        const userFromDb = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
        })

        if (!userFromDb) return null

        return {
            ...userFromDb,
            avatarUrl: userFromDb.avatarUrl ?? null,
            provider: user.app_metadata.provider,
        }
    }
    return null
}
