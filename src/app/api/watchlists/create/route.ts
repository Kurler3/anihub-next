import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { createWatchlistSchema } from '@/schemas'
import { ICreateWatchlistData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    // Get current user
    const user = await getCurrentUser()

    // If not logged in => unauthorized
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    // Get body
    const body = await req.json()

    // Init new watchlist
    let newWatchlist: ICreateWatchlistData

    try {
        // Parse schema
        newWatchlist = createWatchlistSchema.parse(body)
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    try {
        // Create watchlist
        const watchlist = await prisma.watchList.create({
            data: {
                name: newWatchlist.title,
                description: newWatchlist.description,
                ownerId: user.id,
            },
        })

        const userRoles = ['admins', 'editors', 'viewers'] as (keyof ICreateWatchlistData)[]

        // Create watchlist users
        await Promise.all(
            userRoles.map(async (role) => {
                const watchlistUsers = (newWatchlist[role]! as string[]).map((userId) => {
                    return {
                        userId,
                        watchlistId: watchlist.id,
                        role: role.substring(0, role.length - 1),
                    }
                })

                if (watchlistUsers.length > 0) {
                    await prisma.watchListUser.createMany({
                        data: watchlistUsers,
                    })
                }
            }),
        )
    } catch (error) {
        // Log error
        console.error('Error while creating watchlist...', error)
        // Redirect to error page
        return NextResponse.json({ message: 'Error while creating watchlist' }, { status: 500 })
    }

    // Return res
    return NextResponse.json({ message: 'Watchlist created' }, { status: 200 })
}
