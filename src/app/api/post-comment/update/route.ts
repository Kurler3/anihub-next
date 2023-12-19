import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { updatePostCommentSchema } from '@/schemas'
import { IUpdatePostComment } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ message: 'Need to be logged in for this operation' })
    }

    // Get body
    const body = await req.json()

    try {
        const parsedData: IUpdatePostComment = updatePostCommentSchema.parse(body)

        // Check that the comment was created by this user
        const existingComment = await prisma.comment.findUnique({
            where: {
                id: parsedData.commentId,
            },
            select: {
                userId: true,
                id: true,
            },
        })

        // If didn't find hte comment => error
        if (!existingComment) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 400 })
        }

        // If the comment was not created by calling user => error
        if (existingComment.userId !== user.id) {
            return NextResponse.json({ message: 'Permission denied.' }, { status: 403 })
        }

        // Update the comment
        await prisma.comment.update({
            where: {
                id: parsedData.commentId,
            },
            data: {
                content: parsedData.newCommentContent,
            },
        })

        // Return to client
        return NextResponse.json({ message: 'Comment updated' })
    } catch (error) {
        console.error('Error in /post-comment/update: ', error)

        return NextResponse.json({ message: 'Error in /post-comment/update' }, { status: 400 })
    }
}
