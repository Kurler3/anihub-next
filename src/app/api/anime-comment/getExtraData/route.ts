import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Include {
    [key: string]: boolean | { orderBy: { [key: string]: string } }
}

export async function GET(req: NextRequest) {
    const animeCommentId = req.nextUrl.searchParams.get('animeCommentId')

    if (!animeCommentId) {
        return NextResponse.json({ message: 'Missing animeCommentId in query params' }, { status: 400 })
    }

    const fields = req.nextUrl.searchParams.get('fields')

    let include: Include = {}

    if (!fields) {
        include = {
            user: true,
            likes: true,
            dislikes: true,
            childAnimeComments: true,
        }
    } else {
        include = fields.split(',').reduce((acc: { [key: string]: boolean }, cu) => {
            acc[cu] = true
            return acc
        }, {})
    }

    if ('childAnimeComments' in include) {
        include.childAnimeComments = {
            orderBy: {
                createdAt: 'desc',
            },
        }
    }

    const animeComment = await prisma.animeComment.findUnique({
        where: {
            id: +animeCommentId,
        },
        include,
    })

    return NextResponse.json(animeComment)
}
