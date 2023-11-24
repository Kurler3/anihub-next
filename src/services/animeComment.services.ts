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
