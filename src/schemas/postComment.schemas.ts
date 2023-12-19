import { z } from 'zod'

export const createPostCommentSchema = z.object({
    postId: z.number(),
    content: z.string(),
    parentCommentId: z.number().optional(),
})

export const updatePostCommentSchema = z.object({
    newCommentContent: z.string().min(1),
    commentId: z.number(),
})
