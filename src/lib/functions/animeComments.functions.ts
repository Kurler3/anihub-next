import { IAnimeCommentDislike, IAnimeCommentLike } from '@/types'

export const isUserLikeComment = (animeLikes?: IAnimeCommentLike[], userId?: string) => {
    if (!userId || !animeLikes) return false
    const likeFound = animeLikes.find((like) => like.userId === userId)
    return likeFound !== undefined
}
export const isUserDislikeComment = (animeDislikes?: IAnimeCommentDislike[], userId?: string) => {
    if (!userId || !animeDislikes) return false
    const likeFound = animeDislikes.find((dislike) => dislike.userId === userId)
    return likeFound !== undefined
}
