import { PUBLIC_IMAGES_BASE_URL, PUBLIC_IMAGES_URLS } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { getSupabaseRouteHandler } from '@/lib/supabase/supabase-route-handler'
import { NextRequest, NextResponse } from 'next/server'
import {v4 as uuid} from 'uuid'

export async function GET(req: NextRequest) {
    /////////////////////////////////////////////////
    // INIT SERVICES ////////////////////////////////
    /////////////////////////////////////////////////

    const supabase = getSupabaseRouteHandler()

    const code = req.nextUrl.searchParams.get('code')

    if (!code) {
        return NextResponse.redirect(new URL(`/error?message=No code provided`, req.url))
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    //////////////////////////////////////////////////
    // CHECK IF THE USER EXISTS //////////////////////
    //////////////////////////////////////////////////

    const user = data.user

    // Check if the user already exists in your Prisma database
    const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
    })

    // If exists => sign out
    if (existingUser) {
        await supabase.auth.signOut()
        return NextResponse.redirect(new URL(`/error?message=User with this email already exists`, req.url))
    }

    ///////////////////////////////////////////////////
    // CREATE USER ////////////////////////////////////
    ///////////////////////////////////////////////////

    // Create the user in your Prisma database
    const newUser = await prisma.user.create({
        data: {
            id: user.id.toString()!,
            email: user.email!,
            username: user.user_metadata?.full_name ?? `User ${uuid()}`,
            avatarUrl: user.user_metadata?.avatar_url ?? `${PUBLIC_IMAGES_URLS[0]}`,
        },
    })

    // Create favorite, watching and planned watchlists for user!
    await Promise.all(
        ['Favorites', 'Watching', 'Planned'].map(async (listName) => {
            // Create the list
            const watchlist = await prisma.watchList.create({
                data: {
                    name: listName,
                    ownerId: newUser.id,
                },
            })

            // Add as admin
            await prisma.watchListUser.create({
                data: {
                    userId: newUser.id,
                    role: 'admin',
                    watchlistId: watchlist.id,
                },
            })
        }),
    )

    return NextResponse.redirect(new URL('/', req.url))
}
