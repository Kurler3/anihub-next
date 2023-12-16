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

    console.log(body)

    // Init new watchlist
    let newWatchlist: ICreateWatchlistData

    try {
        // Parse schema
        newWatchlist = createWatchlistSchema.parse(body)
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    try {
        //TODO Create watchlist
        //TODO Create watchlist users
    } catch (error) {
        //TODO Log error
        //TODO Redirect to error page
    }

    // Return res
}
