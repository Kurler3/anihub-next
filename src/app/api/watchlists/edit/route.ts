import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { createWatchlistSchema, updateWatchlistSchema } from '@/schemas'
import { getWatchlistById } from '@/services'
import { ICreateWatchlistData, IUpdateWatchlistData } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
    // Get current user
    const user = await getCurrentUser()

    // If not logged in => unauthorized
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    // Get body
    const body = await req.json()

    // Init new watchlist
    let newWatchlist: IUpdateWatchlistData

    try {
        // Parse schema
        newWatchlist = updateWatchlistSchema.parse(body)
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    // Get the original watchlist
    const watchlist = await getWatchlistById(newWatchlist.id)

    if (!watchlist) return NextResponse.json({ message: 'Watchlist not found' }, { status: 404 })

    // Check that this user is admin in this watchlist
    const isAdmin =
        watchlist.watchlistUsers.find(
            (watchlistUser) => watchlistUser.userId === user.id && watchlistUser.role === 'admin',
        ) !== undefined

    if (!isAdmin) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    // Get the updates needed only.
    const watchlistUpdates = {}

    //TODO

    try {
        //TODO Find out which users need to be added/removed to the watchlist users.
    } catch (error) {}

    // Return res
    return NextResponse.json({ message: 'Watchlist created' }, { status: 200 })
}
