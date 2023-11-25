import prisma from '@/lib/prisma'
import { IAnimeCommentDislikeResponse, IAnimeCommentLikeResponse, ICreateAnimeComment } from '@/types'
// Create anime comment
export const createAnimeComment = async (animeComment: ICreateAnimeComment) => {
    // Make prisma call
    const newAnimeComment = await prisma.animeComment.create({
        data: animeComment,
    })
    return newAnimeComment
}

// Create anime like / dislike
export const createAnimeLikeDislike = async (commentId: number, like: boolean) => {
    const url = `/api/anime-comment/${like ? 'like' : 'dislike'}`

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

    const responseData = (await response.json()) as IAnimeCommentLikeResponse | IAnimeCommentDislikeResponse

    return responseData
}
