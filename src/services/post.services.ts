import prisma from '@/lib/prisma'

export const getPostById = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(postId),
        },
        include: {
            user: true,
            comments: true,
            likes: true,
            dislikes: true,
        },
    })
    return post
}
