import { SupabaseClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import prisma from '../prisma'
import { IGetUserIncludeParams } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

let supabase: SupabaseClient

export const createSupabaseServerSide = () => {
    if (!supabase) {
        cookies().getAll()
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

export const getCurrentUser = async (includeParams?: IGetUserIncludeParams) => {
    const supabase = createSupabaseServerSide()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Get from db with id because need avatar as well.
    if (user && user.id) {
        const prismaInclude: Record<string, any> = {}

        if (includeParams) {
            if (includeParams.sharedWatchlists) {
                prismaInclude.sharedWatchlists = {
                    include: {
                        watchlist: true,
                    },
                }
            }

            if (includeParams.followers) {
                prismaInclude.followers = {
                    include: {
                        followerUser: {
                            include: {
                                followers: true,
                            },
                        },
                    },
                }
            }
            if (includeParams.following) {
                prismaInclude.following = {
                    include: {
                        followedUser: {
                            include: {
                                following: true,
                            },
                        },
                    },
                }
            }
            if (includeParams.followerRequests) {
                prismaInclude.followerRequests = { include: { followerUser: true } }
            }
            if (includeParams.followingRequests) {
                prismaInclude.followingRequests = true
            }
        }

        // Get from db
        const userFromDb = await prisma.user.findUnique({
            where: {
                id: user.id,
            },
            include: prismaInclude,
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
