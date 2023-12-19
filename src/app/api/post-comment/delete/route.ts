import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest) {
    const user = await getCurrentUser()

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { commentId } = await req.json()

    if (!commentId) {
        return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    }

    // Get post comment
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    })

    // If doesn't exist => error
    if (!comment) {
        return NextResponse.json({ message: 'Post comment not found' }, { status: 404 })
    }

    // Check if comment is from the user
    if (comment.userId !== user.id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    try {
        // Delete the comment
        await prisma.comment.delete({
            where: {
                id: comment.id,
            },
        })
    } catch (error) {
        console.error('Error deleting comment: ', error)
        return NextResponse.json({ message: 'Error deleting comment' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Comment deleted successfully' })
}
