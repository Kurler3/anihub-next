import prisma from '@/lib/prisma'
import { ICreateAnimeComment } from '../types/animeComments.types'
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
    return
}
