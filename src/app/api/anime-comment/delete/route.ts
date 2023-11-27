import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { animeCommentId } = await req.json()

    if (!animeCommentId) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    }

    // Get anime comment
    const animeComment = await prisma.animeComment.findUnique({
        where: {
            id: animeCommentId,
        },
    })

    // If doesn't exist => error
    if (!animeComment) {
        return NextResponse.json({ message: 'Anime comment not found' }, { status: 404 })
    }

    // Check if comment is from the user
    if (animeComment.userId !== user.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    try {
        // // Delete all likes and dislikes for this comment.
        // await prisma.animeCommentDislike.deleteMany({
        //     where: {
        //         animeCommentId: animeCommentId,
        //     },
        // })

        // await prisma.animeCommentLike.deleteMany({
        //     where: {
        //         animeCommentId: animeCommentId,
        //     },
        // })

        // Delete the comment
        await prisma.animeComment.delete({
            where: {
                id: animeCommentId,
            },
        })
    } catch (error) {
        console.error('Error deleting comment: ', error)
        return NextResponse.json({ message: 'Error deleting comment' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Comment deleted successfully' })
}
