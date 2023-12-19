import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Include {
    [key: string]: boolean | { orderBy: { [key: string]: string } }
}

export async function GET(req: NextRequest) {
    const postCommentId = req.nextUrl.searchParams.get('postCommentId')

    if (!postCommentId) {
        return NextResponse.json({ message: 'Missing postCommentId in query params' }, { status: 400 })
    }

    const fields = req.nextUrl.searchParams.get('fields')

    let include: Include = {}

    if (!fields) {
        include = {
            user: true,
            likes: true,
            dislikes: true,
            childComments: true,
        }
    } else {
        include = fields.split(',').reduce((acc: { [key: string]: boolean }, cu) => {
            acc[cu] = true
            return acc
        }, {})
    }

    if ('childComments' in include) {
        include.childComments = {
            orderBy: {
                createdAt: 'desc',
            },
        }
    }

    const postComment = await prisma.comment.findUnique({
        where: {
            id: +postCommentId,
        },
        include,
    })

    return NextResponse.json(postComment)
}
