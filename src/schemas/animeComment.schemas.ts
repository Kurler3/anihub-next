import { z } from 'zod'

export const createAnimeCommentSchema = z.object({
    userId: z.string(),
    animeId: z.number(),
    episode: z.number().optional(),
    comment: z.string(),
    parentAnimeCommentId: z.number().optional(),
})
