import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    // Get user
    const user = await getCurrentUser()

    // If no user => need to be logged in.
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

    // Get the comment id
    const { commentId } = await req.json()

    // If no comment id provided
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

    // If already has disliked the comment => remove the dislike
    if (existingDislike) {
        await prisma.commentDislike.delete({
            where: {
                id: existingDislike.id,
            },
        })

        // Else => dislike the comment and remove like if was liking.
    } else {
        // Add anime comment dislike
        await prisma.commentDislike.create({
            data: {
                userId: user.id,
                commentId,
            },
        })

        // If a like exists, delete it
        if (existingLike) {
            await prisma.commentLike.delete({
                where: {
                    id: existingLike.id,
                },
            })
        }
    }

    // Return to client
    return NextResponse.json(
        {
            message: 'Comment disliked successfully.',
        },
        {
            status: 200,
        },
    )
}
