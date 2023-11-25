import { IAnimeCommentDislike, IAnimeCommentLike } from '@/types'

export const isUserLikeComment = (animeLikes: IAnimeCommentLike[], userId?: string) => {
    if (!userId) return false
    const likeFound = animeLikes.find((like) => like.userId === userId)
    return likeFound !== undefined
}
export const isUserDislikeComment = (animeLikes: IAnimeCommentDislike[], userId?: string) => {
    if (!userId) return false
    const likeFound = animeLikes.find((like) => like.userId === userId)
    return likeFound !== undefined
}
