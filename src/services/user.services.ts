import prisma from '@/lib/prisma'

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            followers: true,
            following: true,
            posts: {
                include: {
                    likes: true,
                    dislikes: true,
                },
            },
            watchlists: {
                include: {
                    watchlistAnime: true,
                },
            },
            followerRequests: true,
        },
    })

    return user
}
