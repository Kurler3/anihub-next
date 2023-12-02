import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/supabase/supabase-server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    console.log('Like aniem: ')

    const user = await getCurrentUser()

    console.log('User: ', user)

    if (!user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get body
    const body = await req.json()

    console.log('Body: ', body)

    if (!body.animeId) {
        return NextResponse.json({ message: 'Missing animeId in body' }, { status: 400 })
    }

    const { animeId } = body

    // Check if already existing like
    const existingLike = await prisma.animeLike.findFirst({
        where: {
            userId: user.id,
            animeId,
        },
    })

    console.log('Existing like: ', existingLike)

    try {
        // If existing like, delete it
        if (existingLike) {
            await prisma.animeLike.delete({
                where: {
                    id: existingLike.id,
                },
            })

            // Else, create one
        } else {
            await prisma.animeLike.create({
                data: {
                    userId: user.id,
                    animeId,
                },
            })
        }
    } catch (error) {
        console.error('Error while liking anime: ', error)
        return NextResponse.json({ message: 'Somethin went wrong...' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Success' }, { status: 200 })
}
