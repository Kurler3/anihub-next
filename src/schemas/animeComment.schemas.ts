import { z } from 'zod'

export const createAnimeCommentSchema = z.object({
    // userId: z.string(),
    animeId: z.number(),
    episode: z.number().optional(),
    content: z.string(),
    parentAnimeCommentId: z.number().optional(),
})

export const updateAnimeCommentSchema = z.object({
    newCommentContent: z.string().min(1),
    animeCommentId: z.number(),
})
