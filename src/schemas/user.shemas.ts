import { z } from 'zod'

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    username: z.string(),
    avatarUrl: z.string(),
})
