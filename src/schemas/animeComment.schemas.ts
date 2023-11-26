import { z } from 'zod'

export const createAnimeCommentSchema = z.object({
    // userId: z.string(),
    animeId: z.number(),
    episode: z.number().optional(),
    content: z.string(),
    parentAnimeCommentId: z.number().optional(),
})
