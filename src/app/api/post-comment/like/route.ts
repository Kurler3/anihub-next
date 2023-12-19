import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    // Get user
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json(
            {
                message: 'You must be logged in to like a comment',
            },
            {
                status: 403,
            },
        )
    }

    const { commentId } = await req.json()

    if (!commentId) {
        return NextResponse.json(
            {
                message: 'Invalid request. Please provide commentId in the request body.',
            },
            {
                status: 400,
            },
        )
    }

    // Check if the comment exists
    const commentExists = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    })

    if (!commentExists) {
        return NextResponse.json(
            {
                message: 'The specified comment does not exist.',
            },
            {
                status: 404,
            },
        )
    }

    // Check if the user has already liked or disliked the comment
    const existingLike = await prisma.commentLike.findFirst({
        where: {
            userId: user.id,
            commentId,
        },
    })

    const existingDislike = await prisma.commentDislike.findFirst({
        where: {
            userId: user.id,
            commentId,
        },
    })

    let data = existingLike

    // User is trying to like the comment
    if (existingLike) {
        // Like already exists, delete it
        await prisma.commentLike.delete({
            where: {
                id: existingLike.id,
            },
        })
    } else {
        // Like doesn't exist, create a new one
        data = await prisma.commentLike.create({
            data: {
                userId: user.id,
                commentId,
            },
        })

        // If a dislike exists, delete it
        if (existingDislike) {
            await prisma.commentDislike.delete({
                where: {
                    id: existingDislike.id,
                },
            })
        }
    }

    return NextResponse.json(
        {
            message: 'Comment liked/disliked successfully',
        },
        {
            status: 200,
        },
    )
}
