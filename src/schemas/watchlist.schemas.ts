import { z } from 'zod'

export const createWatchlistSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    admins: z.array(z.string()),
    editors: z.array(z.string()),
    viewers: z.array(z.string()),
})
