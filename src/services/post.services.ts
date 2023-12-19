'use server'

import prisma from '@/lib/prisma'
import { getFullURL } from '@/lib/utils'
import {
    IGetSocialPagePosts,
    IPost,
    IPostCommentDislikeResponse,
    IPostCommentLikeResponse,
    IUserWithFollowing,
    Pagination,
} from '@/types'
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
export const likePost = async ({
    postId,
    userId,
    currentPath,
}: {
    postId: number
    userId?: string
    currentPath?: string
}) => {
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
        revalidatePath(currentPath ?? `/post/${postId}`)
    } catch (error) {
        console.error('Error trying to like post...', error)
        redirect('/error?message=Error while liking post')
    }
}

// Handle dislike post
export const dislikePost = async ({
    postId,
    userId,
    currentPath,
}: {
    postId: number
    userId?: string
    currentPath?: string
}) => {
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
        revalidatePath(currentPath ?? `/post/${postId}`)
    } catch (error) {
        console.error('Error trying to dislike post...', error)
        redirect('/error?message=Error while disliking post')
    }
}

// Handle delete post
export const deletePost = async (postId: number, currentPath?: string) => {
    try {
        await prisma.post.delete({
            where: {
                id: postId,
            },
        })

        if (currentPath) {
            revalidatePath(currentPath)
        } else {
            redirect('/')
        }
    } catch (error) {
        console.error('Error trying to delete post...', error)
        redirect('/error?message=Error while deleting post')
    }
}

export const getPostCommentExtraData = async (postCommentId: number) => {
    const url = getFullURL(`/api/post-comment/getExtraData?postCommentId=${postCommentId}`)

    const res = await fetch(url)

    if (!res.ok) throw new Error('Error while getting post comment extra data')

    const extraData = await res.json()

    return extraData
}

export const getPostCommentChildrenComments = async (postCommentId: number) => {
    const url = getFullURL(`/api/post-comment/getExtraData?postCommentId=${postCommentId}&fields=childComments`)
    const res = await fetch(url)

    if (!res.ok) throw new Error('Error while getting post comment extra data')

    const extraData = await res.json()

    return extraData
}

// Create post comment like / dislike
export const createPostCommentLikeDislike = async (commentId: number, like: boolean) => {
    const url = getFullURL(`/api/post-comment/${like ? 'like' : 'dislike'}`)
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

// Get posts
export const getSocialPagePosts = async ({
    currentUser,
    page = 1,
}: {
    currentUser?: IUserWithFollowing
    page?: number
}): Promise<IGetSocialPagePosts> => {
    try {
        const perPage = 5 // Adjust as needed

        const posts = await prisma.post.findMany({
            where: currentUser
                ? {
                      OR: [
                          { userId: currentUser.id }, // User's own posts
                          { userId: { in: currentUser.following.map((follow) => follow.followedUserId) } }, // Posts from users they follow
                          { user: { isProfilePublic: true } }, // Posts from users with public profiles
                      ],
                  }
                : { user: { isProfilePublic: true } },
            take: perPage,
            skip: perPage * (page - 1),
            include: {
                user: true,
                likes: true,
                dislikes: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Count total posts (without pagination) for calculating pagination information
        const totalPostsCount = await prisma.post.count({
            where: currentUser
                ? {
                      OR: [
                          { userId: currentUser.id },
                          { userId: { in: currentUser.following.map((follow) => follow.followedUserId) } },
                          { user: { isProfilePublic: true } },
                      ],
                  }
                : { user: { isProfilePublic: true } },
        })

        // Calculate pagination information
        const lastVisiblePage = Math.ceil(totalPostsCount / perPage)
        const hasNextPage = page < lastVisiblePage

        const pagination: Pagination = {
            last_visible_page: lastVisiblePage,
            has_next_page: hasNextPage,
            items: {
                count: posts.length,
                total: totalPostsCount,
                per_page: perPage,
            },
        }

        const apiResponse: IGetSocialPagePosts = {
            posts: posts as unknown as IPost[],
            pagination,
        }

        return apiResponse
    } catch (error) {
        console.error(error)
        throw new Error('Internal Server Error')
    }
}
