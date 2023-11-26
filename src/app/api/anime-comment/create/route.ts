import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { createAnimeCommentSchema } from '@/schemas'
import { NextRequest, NextResponse } from 'next/server'

interface ICreateAnimeComment {
    animeId: number
    episode?: number
    content: string
    parentAnimeCommentId?: number
}

export async function POST(req: NextRequest) {
    // Get current user
    const user = await getCurrentUser()

    // If not logged in => unauthorized
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })

    // Get body
    const body = await req.json()

    console.log(body)
    // Init new anime comment
    let newAnimeComment: ICreateAnimeComment

    try {
        // Parse schema
        newAnimeComment = createAnimeCommentSchema.parse(body)
    } catch (error) {
        return NextResponse.json({ message: 'Invalid data' }, { status: 400 })
    }

    try {
        // Create new anime comment
        await prisma.animeComment.create({
            data: {
                ...newAnimeComment,
                userId: user.id,
            },
        })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong with the db' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Comment created' }, { status: 201 })
}
