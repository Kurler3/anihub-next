import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const resetPwdSchema = z.object({
    password: z.string().min(6),
})
