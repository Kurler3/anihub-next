import prisma from '@/lib/prisma'
import { IPostCommentDislikeResponse, IPostCommentLikeResponse } from '@/types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getPostById = async (postId: string) => {
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(postId),
        },
        include: {
            user: true,
            comments: {
                orderBy: {
                    createdAt: 'desc',
                },
                where: {
                    parentCommentId: null,
                },
            },
            likes: true,
            dislikes: true,
        },
    })
    return post
}

// Handle like post
export const likePost = async ({ postId, userId }: { postId: number; userId?: string }) => {
    if (!userId) {
        redirect('/need-auth')
    }

    try {
        // Get existing like.
        const existingLike = await prisma.postLike.findFirst({
            where: {
                postId,
                userId,
            },
        })

        // Get existing dislike.
        const existingDislike = await prisma.postDislike.findFirst({
            where: {
                postId,
                userId,
            },
        })

        // If was liking => remove the like.
        if (existingLike) {
            await prisma.postLike.delete({
                where: {
                    id: existingLike.id,
                },
            })

            // Else create like.
        } else {
            await prisma.postLike.create({
                data: {
                    postId,
                    userId,
                },
            })
        }

        // If has dislike => remove dislike.
        if (existingDislike) {
            await prisma.postDislike.delete({
                where: {
                    id: existingDislike.id,
                },
            })
        }

        // Revalidate page.
        revalidatePath(`/post/${postId}`)
    } catch (error) {
        console.error('Error trying to like post...', error)
        redirect('/error?message=Error while liking post')
    }
}

// Handle dislike post
export const dislikePost = async ({ postId, userId }: { postId: number; userId?: string }) => {
    if (!userId) redirect('/need-auth')

    try {
        // Get existing like.
        const existingLike = await prisma.postLike.findFirst({
            where: {
                postId,
                userId,
            },
        })

        // Get existing dislike.
        const existingDislike = await prisma.postDislike.findFirst({
            where: {
                postId,
                userId,
            },
        })

        // If was disliking => remove the dislike.
        if (existingDislike) {
            await prisma.postDislike.delete({
                where: {
                    id: existingDislike.id,
                },
            })

            // Else create dislike.
        } else {
            await prisma.postDislike.create({
                data: {
                    postId,
                    userId,
                },
            })
        }

        // If has like => remove like.
        if (existingLike) {
            await prisma.postLike.delete({
                where: {
                    id: existingLike.id,
                },
            })
        }

        // Revalidate page.
        revalidatePath(`/post/${postId}`)
    } catch (error) {
        console.error('Error trying to dislike post...', error)
        redirect('/error?message=Error while disliking post')
    }
}

// Handle delete post
export const deletePost = async (postId: number) => {
    try {
        await prisma.post.delete({
            where: {
                id: postId,
            },
        })

        redirect('/')
    } catch (error) {
        console.error('Error trying to delete post...', error)
        redirect('/error?message=Error while deleting post')
    }
}

export const getPostCommentExtraData = async (postCommentId: number) => {
    const res = await fetch(`/api/post-comment/getExtraData?postCommentId=${postCommentId}`)

    if (!res.ok) throw new Error('Error while getting post comment extra data')

    const extraData = await res.json()

    return extraData
}

export const getPostCommentChildrenComments = async (postCommentId: number) => {
    const res = await fetch(`/api/post-comment/getExtraData?postCommentId=${postCommentId}&fields=childComments`)

    if (!res.ok) throw new Error('Error while getting post comment extra data')

    const extraData = await res.json()

    return extraData
}

// Create post comment like / dislike
export const createPostCommentLikeDislike = async (commentId: number, like: boolean) => {
    const url = `/api/post-comment/${like ? 'like' : 'dislike'}`

    // Make request to server.
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            commentId,
        }),
    })

    if (!response.ok) throw new Error("Couldn't like/dislike comment")

    const responseData = (await response.json()) as IPostCommentLikeResponse | IPostCommentDislikeResponse

    return responseData
}
